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

import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["content", "trigger"];

  toggleVisibility() {
    if (!this.hasContentTarget) {
      return;
    }

    if (this.contentTarget.classList.contains("hidden")) {
      this.contentTarget.classList.remove("hidden");
    } else {
      this.contentTarget.classList.add("hidden");
    }
  }

  hide() {
    if (!this.hasContentTarget) {
      return;
    }

    this.contentTarget.classList.add("hidden");
  }

  saveCategory() {
    if (!this.hasContentTarget || !this.hasTriggerTarget) {
      return;
    }

    let parent = this.triggerTarget.parentElement;

    //get value of select, trim and set to lowercase
    let inputField = parent.querySelector(".category-input");
    let value = inputField.value.trim().toLowerCase();
    let text = inputField.options[inputField.selectedIndex].text;

    addCategoryTag(value, text);

    //hide container
    this.contentTarget.classList.add("hidden");
  }
}
