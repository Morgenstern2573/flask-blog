//-----------------------------------------------------------------------------
//                GLOBAL VARIABLES
//-----------------------------------------------------------------------------
const QUERY_PARAMS = new URLSearchParams(window.location.search);

// ----------------------------------------------------------------------------
//                 END
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
//                 SCRIPTING RELATED TO THE EDITOR
// ----------------------------------------------------------------------------

import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";

const boldBtn = document.getElementById("bold-button");
const italBtn = document.getElementById("italics-button");
const underBtn = document.getElementById("underline-button");
const lHeaderBtn = document.getElementById("h1-button");
const sHeaderBtn = document.getElementById("h2-button");
const linkBtn = document.getElementById("link-button");
const imgBtn = document.getElementById("image-button");

const editor = new Editor({
  element: document.querySelector("#mount-element"),
  extensions: [
    StarterKit.configure({
      heading: {
        levels: [1, 2],
      },
    }),
    Link,
    Image,
    Underline,
  ],

  onTransaction({ editor, transaction }) {
    function updateBtnState(prop, btn, options) {
      if (editor.isActive(prop, options)) {
        btn.classList.remove("btn-outline");
      } else {
        btn.classList.add("btn-outline");
      }
    }

    updateBtnState("bold", boldBtn);
    updateBtnState("italic", italBtn);
    updateBtnState("underline", underBtn);
    updateBtnState("link", linkBtn);
    updateBtnState("heading", lHeaderBtn, { level: 1 });
    updateBtnState("heading", sHeaderBtn, { level: 2 });
  },
});

boldBtn.addEventListener("click", (e) => {
  editor.chain().toggleBold().focus().run();
});

italBtn.addEventListener("click", (e) => {
  editor.chain().toggleItalic().focus().run();
});

underBtn.addEventListener("click", (e) => {
  editor.chain().toggleUnderline().focus().run();
});

lHeaderBtn.addEventListener("click", (e) => {
  editor.chain().toggleHeading({ level: 1 }).focus().run();
});

sHeaderBtn.addEventListener("click", (e) => {
  editor.chain().toggleHeading({ level: 2 }).focus().run();
});

linkBtn.addEventListener("click", (e) => {
  //get href of link elected in editor
  const previousUrl = editor.getAttributes("link").href;
  const url = window.prompt("URL", previousUrl);

  // cancelled
  if (url === null) {
    return;
  }

  // empty
  if (url === "") {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();

    return;
  }

  editor.chain().toggleLink({ href: url }).focus().run();
});

imgBtn.addEventListener("click", (e) => {
  document.getElementById("img-upload-input").click();
});

document.getElementById("img-upload-input").addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    function () {
      // convert image file to base64 string
      editor.chain().focus().setImage({ src: reader.result }).run();
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
});
//-----------------------------------------------------------------------------
//                 END
// ----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
//                 SCRIPTING FOR PAGE INTERACTIONS
//-----------------------------------------------------------------------------
import { Application } from "@hotwired/stimulus";
import collapseController from "./controllers/collapse_controller";
window.Stimulus = Application.start();
Stimulus.register("collapse", collapseController);

function createCategoryTag(value, text) {
  let tag = document.createElement("p");
  tag.classList = "post-category badge badge-outline mr-2";

  let delBtn = document.createElement("span");
  delBtn.classList = "cursor-pointer";
  delBtn.title = `remove ${text}`;
  //"X" svg icon
  delBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-3 h-3 stroke-current">   
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>                       
                      </svg>`;
  delBtn.addEventListener("click", (e) => {
    tag.remove();
  });
  let val = document.createElement("span");
  val.classList = "hidden cat-value";
  val.innerText = value;
  tag.innerHTML = `<span class="mr-2 category-name">${text}</span>`;
  tag.appendChild(delBtn);
  tag.appendChild(val);
  return tag;
}

function addCategoryTag(value, text) {
  //validate
  if (value.length === 0) {
    return;
  }

  for (const node of document.getElementsByClassName("category-name")) {
    if (node.innerHTML === text) {
      return;
    }
  }

  // container element
  let categoryCont = document.getElementById("category-cont");
  let tag = createCategoryTag(value, text);
  categoryCont.appendChild(tag);
}

// document.querySelector(".save-category-btn").addEventListener("click", (e) => {
//   let parent = e.target.parentElement;
//   //get value of select or input, trim and set to lowercase
//   let inputField = parent.querySelector(".category-input");
//   let value = inputField.value.trim().toLowerCase();
//   let text = inputField.options[inputField.selectedIndex].text;

//   addCategoryTag(value, text);

//   //reset value
//   parent.querySelector(".category-input").value = "";
// });

// ----------------------------------------------------------------------------
//                 END
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
//                 SUBMIT POST DATA
// ----------------------------------------------------------------------------
function submit(publish) {
  let titleField = document.getElementById("title-field");
  let postTitle = titleField.value.trim().toLowerCase();
  let postContent = editor.getHTML();
  let errorMsg = document.getElementById("error-msg");
  let postCategories = "";

  //validation
  if (postTitle === "") {
    errorMsg.innerText = "Post must have a title!";
    errorMsg.classList.remove("hidden");
    return;
  } else if (editor.isEmpty) {
    errorMsg.innerText = "Post Content Cannot be empty!";
    errorMsg.classList.remove("hidden");
    return;
  } else {
    errorMsg.classList.add("hidden");
  }

  //get categories from DOM
  for (const element of document.getElementsByClassName("cat-value")) {
    postCategories += element.innerText.toLowerCase() + ",";
  }
  //remove trailing comma
  postCategories = postCategories.slice(0, -1);

  const form = new FormData();
  form.set("title", postTitle);
  form.set("categories", postCategories);
  form.set("body", postContent);

  if (QUERY_PARAMS.get("edit") === "true") {
    form.set("edit", "true");
    form.set("id", QUERY_PARAMS.get("id"));
  }

  if (!publish || publish === false) {
    publish = false;
  } else {
    publish = true;
  }
  form.set("publish", publish);

  fetch("/admin/post", {
    credentials: "include",
    method: "POST",
    body: form,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      // window.location.pathname = "/";
      return response.json();
    })
    .then((data) => {
      if (data.status !== "ok") {
        errorMsg.innerText = data.message;
        errorMsg.classList.remove("hidden");
        return;
      }

      location.assign("/admin/dashboard");
    })
    .catch((e) => console.log(e));
}

for (const element of document.getElementsByClassName("submit-btn")) {
  element.addEventListener("click", (e) => {
    if (e.target.classList.contains("publish-btn")) {
      submit(true);
    } else {
      submit(false);
    }
  });
}
// ----------------------------------------------------------------------------
//                 END
// ----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//                PRE-FILL WIDGETS IF EDITING POST
//-----------------------------------------------------------------------------
function preFillPage() {
  let titleField = document.getElementById("title-field");
  titleField.value = document.getElementById("prev-title").innerHTML.trim();
  let prevCategories = JSON.parse(
    document.getElementById("prev-cat").innerHTML
  );
  let prevContent = document.getElementById("prev-content").innerHTML.trim();
  if (prevContent.length !== 0) {
    // change the content of the editor instance
    editor.commands.setContent(prevContent);
  }

  for (let cat of prevCategories) {
    if (cat.length !== 0) {
      addCategoryTag(cat[0], cat[1]);
    }
  }
}

if (QUERY_PARAMS.get("edit") === "true") {
  preFillPage();
}
// ----------------------------------------------------------------------------
//                 END
// ----------------------------------------------------------------------------
