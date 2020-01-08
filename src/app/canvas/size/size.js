/* eslint-disable class-methods-use-this */
import { sizes, canvas, context } from "../../utils/variables";

export default class Size {
  reSize(w, h) {
    const tempCanvas = document.createElement("canvas");
    const tempContext = tempCanvas.getContext("2d");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    tempContext.drawImage(canvas, 0, 0);
    canvas.width = w;
    canvas.height = h;
    context.imageSmoothingEnabled = false;
    context.drawImage(
      tempCanvas,
      0,
      0,
      tempCanvas.width,
      tempCanvas.height,
      0,
      0,
      canvas.width,
      canvas.height
    );
  }

  showSize(s) {
    switch (s) {
      case "sizex128": {
        sizes.sizex128 = true;
        this.changeActiveState("large-canvas");

        break;
      }
      case "sizex64": {
        sizes.sizex64 = true;
        this.changeActiveState("medium-canvas");

        break;
      }
      case "sizex32": {
        sizes.sizex32 = true;
        this.changeActiveState("small-canvas");

        break;
      }
      default:
        sizes.sizex128 = true;
        this.changeActiveState("large-canvas");
    }
  }

  changeActiveState(id) {
    const sizeBtn = document.querySelectorAll(".size-btn");
    [].forEach.call(sizeBtn, el => {
      el.classList.remove("active");
    });
    document.querySelector(`#${id}`).classList.add("active");
  }

  saveSize() {
    if (sizes.sizex32) {
      localStorage.setItem("currSize", "sizex32");
    }
    if (sizes.sizex64) {
      localStorage.setItem("currSize", "sizex64");
    }
    if (sizes.sizex128) {
      localStorage.setItem("currSize", "sizex128");
    }
  }

  setSizeFlagToTrue(size) {
    if (size === "size32") {
      sizes.sizex32 = true;
      sizes.sizex64 = false;
      sizes.sizex128 = false;
    }
    if (size === "size64") {
      sizes.sizex32 = false;
      sizes.sizex64 = true;
      sizes.sizex128 = false;
    }
    if (size === "size128") {
      sizes.sizex32 = false;
      sizes.sizex64 = false;
      sizes.sizex128 = true;
    }
  }

  setSize() {
    if (
      localStorage.getItem("canvasW") === "128" &&
      localStorage.getItem("canvasH") === "128"
    ) {
      canvas.width = 128;
      canvas.height = 128;
    } else if (
      localStorage.getItem("canvasW") === "64" &&
      localStorage.getItem("canvasH") === "64"
    ) {
      canvas.width = 64;
      canvas.height = 64;
    } else if (
      localStorage.getItem("canvasW") === "32" &&
      localStorage.getItem("canvasH") === "32"
    ) {
      canvas.width = 32;
      canvas.height = 32;
    } else {
      canvas.width = 128;
      canvas.height = 128;
    }
  }
}
