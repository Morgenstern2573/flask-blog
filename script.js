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
  content: `<p>The start of something beautiful...</p>`,

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

//-----------------------------------------------------------------------------
//                 END
// ----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
//                 SCRIPTING FOR PAGE INTERACTIONS
//-----------------------------------------------------------------------------

document
  .getElementById("category-collapse-trigger")
  .addEventListener("click", (e) => {
    let collapse = document.querySelector("#category-collapse");
    if (collapse.classList.contains("hidden")) {
      collapse.classList.remove("hidden");
    } else {
      collapse.classList.add("hidden");
    }
  });

document.getElementById("save-category").addEventListener("click", (e) => {
  let parent = e.target.parentElement;
  let value = parent.querySelector("input").value.trim().toLowerCase();

  if (value.length === 0) {
    return;
  }

  let categoryCont = document.getElementById("category-cont");

  let tag = document.createElement("p");
  tag.classList = "post-category badge badge-outline mr-2";
  let delBtn = document.createElement("span");
  delBtn.classList = "cursor-pointer";
  delBtn.title = `delete ${value}`;
  delBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-3 h-3 stroke-current">   
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>                       
                      </svg>`;
  delBtn.addEventListener("click", (e) => {
    tag.remove();
  });
  tag.innerHTML = `<span class="mr-2">${value}</span>`;
  tag.appendChild(delBtn);
  categoryCont.appendChild(tag);

  parent.querySelector("input").value = "";
});
