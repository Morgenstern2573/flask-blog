import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["newContent", "exContent"];

  hideAll() {
    if (this.hasNewContentTarget) {
      this.newContentTarget.classList.add("hidden");
    }

    if (this.hasExContentTarget) {
      this.exContentTarget.classList.add("hidden");
    }
  }

  showNew() {
    let collapse;
    if (this.hasNewContentTarget) {
      collapse = this.newContentTarget;
    }

    if (collapse.classList.contains("hidden")) {
      collapse.classList.remove("hidden");
    } else {
      collapse.classList.add("hidden");
    }

    if (this.hasExContentTarget) {
      this.exContentTarget.classList.add("hidden");
    }
  }

  showEx() {
    let collapse;
    if (this.hasExContentTarget) {
      collapse = this.exContentTarget;
    }

    if (collapse.classList.contains("hidden")) {
      collapse.classList.remove("hidden");
    } else {
      collapse.classList.add("hidden");
    }

    if (this.hasNewContentTarget) {
      this.newContentTarget.classList.add("hidden");
    }
  }
}
