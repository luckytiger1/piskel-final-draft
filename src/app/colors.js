/* eslint-disable class-methods-use-this */
import { context, currentColor } from "./variables";

export default class Color {
  pickColor(event, size) {
    const x = event.offsetX;
    const y = event.offsetY;
    const pixel = context.getImageData(x / size, y / size, size, size);
    const { data } = pixel;
    const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;

    document.querySelector(".curr-color").style.background = rgba;
    context.fillStyle = rgba;
  }

  showColors() {
    document.querySelector(
      ".curr-color"
    ).style.background = localStorage.getItem("currColorOld");
    document.querySelector(
      ".prev-color-btn"
    ).style.background = localStorage.getItem("prevColorOld");
  }

  setColor() {}

  saveColors() {
    const prevColorOldValue = document.querySelector(".prev-color-btn").style
      .background;
    const currColorOldValue = document.querySelector(".curr-color").style
      .background;
    localStorage.setItem("currColorOld", currColorOldValue);
    localStorage.setItem("prevColorOld", prevColorOldValue);
  }

  changeColor(name) {
    context.fillStyle = name === ".red-btn" ? "#ff0000" : "#0000ff";

    document.querySelector(".curr-color").style.background =
      name === ".red-btn" ? "#ff0000" : "#0000ff";
  }

  checkMouseBtn(e) {
    if (e.button === 2) {
      context.strokeStyle = document.querySelector(
        ".prev-color-btn"
      ).style.background;
      context.fillStyle = document.querySelector(
        ".prev-color-btn"
      ).style.background;
      currentColor.value = document.querySelector(
        ".prev-color-btn"
      ).style.background;
    } else if (e.button === 0) {
      context.strokeStyle = document.querySelector(
        ".curr-color"
      ).style.background;
      context.fillStyle = document.querySelector(
        ".curr-color"
      ).style.background;
      currentColor.value = document.querySelector(
        ".curr-color"
      ).style.background;
    }
  }
}
