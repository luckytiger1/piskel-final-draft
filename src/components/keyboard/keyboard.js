/* eslint-disable class-methods-use-this */
import { keyShortcut } from "../utils/variables";
import "./keyboard.scss";

export default class Keyboard {
  updateShortcuts(e) {
    const key = e.key.toUpperCase();
    document
      .querySelectorAll(".modal-item--container:not(.shortcut-editing)")
      .forEach(el => {
        const elem = el;
        if (elem.firstElementChild.innerHTML === key) {
          elem.firstElementChild.innerHTML = "???";
          elem.classList.add("shortcut-undefined");
        }
      });
  }

  setKeyShortcut(elem, key) {
    switch (elem) {
      case "Delete frame":
        keyShortcut.deleteFrameKey = key;
        break;
      case "Duplicate frame":
        keyShortcut.duplicateFrameKey = key;
        break;
      case "Add frame":
        keyShortcut.addFrameKey = key;
        break;
      case "Save as GIF":
        keyShortcut.saveAsGIFKey = key;
        break;
      case "Save as APNG":
        keyShortcut.saveAsAPNGKey = key;
        break;
      case "Fill same colors tool":
        keyShortcut.fillSameKey = key;
        break;
      case "Stroke tool":
        keyShortcut.strokeKey = key;
        break;
      case "Eraser tool":
        keyShortcut.eraserKey = key;
        break;
      case "Choose color":
        keyShortcut.pickerKey = key;
        break;
      case "Paint bucket":
        keyShortcut.bucketKey = key;
        break;
      case "Pen tool":
        keyShortcut.penKey = key;
        break;
      default:
    }
  }

  removeKeyShortcut(elem) {
    switch (elem) {
      case "Delete frame":
        keyShortcut.deleteFrameKey = null;
        break;
      case "Duplicate frame":
        keyShortcut.duplicateFrameKey = null;
        break;
      case "Add frame":
        keyShortcut.addFrameKey = null;
        break;
      case "Save as GIF":
        keyShortcut.saveAsGIFKey = null;
        break;
      case "Save as APNG":
        keyShortcut.saveAsAPNGKey = null;
        break;
      case "Fill same colors tool":
        keyShortcut.fillSameKey = null;
        break;
      case "Stroke tool":
        keyShortcut.strokeKey = null;
        break;
      case "Eraser tool":
        keyShortcut.eraserKey = null;
        break;
      case "Choose color":
        keyShortcut.pickerKey = null;
        break;
      case "Paint bucket":
        keyShortcut.bucketKey = null;
        break;
      case "Pen tool":
        keyShortcut.penKey = null;
        break;
      default:
    }
  }

  changeShortcutKey() {
    const shortcuts = document.querySelectorAll(".modal-item--container");

    if (document.querySelector(".shortcut-editing")) {
      document.addEventListener("keypress", e => {
        if (document.querySelector(".shortcut-editing")) {
          document.querySelector(
            ".shortcut-editing"
          ).firstElementChild.innerHTML = e.key.toUpperCase();
          this.updateShortcuts(e);
          this.setKeyShortcut(
            document.querySelector(".shortcut-editing").children[1].innerHTML,
            e.code
          );
          this.updateToolTip();
          shortcuts.forEach(el => {
            if (el.firstElementChild.innerHTML === "???") {
              this.removeKeyShortcut(el.children[1].innerHTML);
            }
          });

          [].forEach.call(shortcuts, el => {
            el.classList.remove("shortcut-editing");
            if (el.firstElementChild.innerHTML !== "???") {
              el.classList.remove("shortcut-undefined");
            }
          });
        }
      });
    }
  }

  changeShortcutState(event) {
    const shortcuts = document.querySelectorAll(".modal-item--container");

    [].forEach.call(shortcuts, el => {
      el.classList.remove("shortcut-editing");
    });
    event.target.parentElement.classList.add("shortcut-editing");
  }

  keyPressAction(event) {
    if (event.target.nodeName.toLowerCase() !== "input") {
      switch (event.code) {
        case keyShortcut.penKey:
          document.querySelector(".pencil-btn").click();
          break;
        case keyShortcut.bucketKey:
          document.querySelector(".bucketBtn").click();
          break;
        case keyShortcut.pickerKey:
          document.querySelector(".choose-color-btn").click();
          break;
        case keyShortcut.eraserKey:
          document.querySelector(".eraser-btn").click();
          break;
        case keyShortcut.strokeKey:
          document.querySelector(".stroke-btn").click();
          break;
        case keyShortcut.fillSameKey:
          document.querySelector(".same-color-fill-btn").click();
          break;
        case keyShortcut.saveAsGIFKey:
          document.querySelector(".save-as-gif").click();
          break;
        case keyShortcut.saveAsAPNGKey:
          document.querySelector(".save-as-apng").click();
          break;
        case keyShortcut.addFrameKey:
          document.querySelector(".add__frame__btn").click();
          break;
        case keyShortcut.duplicateFrameKey:
          document.querySelector(".preview-tile.selected").children[2].click();
          break;
        case keyShortcut.deleteFrameKey:
          if (document.querySelectorAll(".preview-tile").length > 1) {
            document
              .querySelector(".preview-tile.selected")
              .children[1].click();
          }
          break;
        default:
      }
    }
  }

  updateToolTip() {
    const toolsWithTooltip = [
      document.querySelector(".pencil-btn"),
      document.querySelector(".bucket-btn"),
      document.querySelector(".choose-color-btn"),
      document.querySelector(".eraser-btn"),
      document.querySelector(".stroke-btn"),
      document.querySelector(".same-color-fill-btn"),
      document.querySelector(".add__frame__btn"),
      document.querySelector(".delete-frame"),
      document.querySelector(".duplicate-frame"),
      document.querySelector(".save-as-gif"),
      document.querySelector(".save-as-apng")
    ];
    toolsWithTooltip.forEach((elem, i) => {
      elem.setAttribute(
        "title",
        `${
          document.querySelectorAll(".modal-item--container")[i].children[1]
            .innerHTML
        } (${
          document.querySelectorAll(".modal-item--container")[i].children[0]
            .innerHTML
        })`
      );
    });
  }
}
