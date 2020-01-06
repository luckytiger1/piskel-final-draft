/* eslint-disable class-methods-use-this */
import {
  sizes,
  tools,
  context,
  canvas,
  isDrawing,
  previousCords,
  startPoints,
  idCount,
  previewFrames
} from "./variables";
import setLogin from "./login";
import { startAnimating } from "./preview";
import Canvas from "./canvas";
import Size from "./size";
import Tool from "./tools";
import Color from "./colors";
import Frame from "./frame";
import SaveAsGIF from "./saveAsGIF";
// import Preview from "./preview";

export default class EventHandler {
  constructor() {
    this.canvas = new Canvas();
    this.size = new Size();
    this.tool = new Tool();
    this.color = new Color();
    this.frame = new Frame();
    this.saveGIF = new SaveAsGIF();
    // this.preview = new Preview();
  }

  loadItems() {
    window.addEventListener("DOMContentLoaded", () => {
      if (localStorage.getItem("currSize") === null) {
        sizes.sizex32 = true;
      }
      if (localStorage.getItem("currTool") === null) {
        tools.pencil = true;
      }
      if (localStorage.getItem("currColorOld") === null) {
        context.fillStyle = "#ff0000";
      }
    });
  }

  canvasEvents() {
    canvas.addEventListener("mousedown", e => {
      isDrawing.drawing = true;
      this.color.checkMouseBtn(e);

      if (sizes.sizex128) {
        this.setToolForDrawing(e, 4);
      }
      if (sizes.sizex64) {
        this.setToolForDrawing(e, 8);
      }
      if (sizes.sizex32) {
        this.setToolForDrawing(e, 16);
      }
    });
    canvas.oncontextmenu = e => {
      e.preventDefault();
    };

    canvas.addEventListener("mouseup", () => {
      isDrawing.drawing = false;

      this.canvas.saveCanvas();
      this.frame.showPreviewFrame();
      console.log(previewFrames);
    });

    canvas.addEventListener("mousemove", e => {
      // isDrawing.drawing = true;

      // this.checkMouseBtn(e);

      if (sizes.sizex128) {
        this.onMouseMove(e, 4);
      }
      if (sizes.sizex64) {
        this.onMouseMove(e, 8);
      }
      if (sizes.sizex32) {
        this.onMouseMove(e, 16);
      }
    });

    canvas.addEventListener("mouseout", () => {
      isDrawing.drawing = false;
    });
  }

  sizeBtnHandler() {
    document.querySelector("#small-canvas").addEventListener("click", () => {
      this.handleSize(32, "size32", "small-canvas");
    });
    document.querySelector("#medium-canvas").addEventListener("click", () => {
      this.handleSize(64, "size64", "medium-canvas");
    });

    document.querySelector("#large-canvas").addEventListener("click", () => {
      this.handleSize(128, "size128", "large-canvas");
    });
  }

  toolsHandler() {
    document.querySelector(".bucketBtn").addEventListener("click", e => {
      this.tool.setToolFlagToTrue("bucket");
      this.tool.changeActiveState("bucketBtn");
      this.color.checkMouseBtn(e);
    });

    document
      .querySelector(".choose-color-btn")
      .addEventListener("click", () => {
        this.tool.setToolFlagToTrue("colorPicker");
        this.tool.changeActiveState("chooseColorBtn");
      });

    document.querySelector(".pencil-btn").addEventListener("click", () => {
      this.tool.setToolFlagToTrue("pencil");
      this.tool.changeActiveState("pencil");
    });

    document.querySelector(".eraser-btn").addEventListener("click", () => {
      this.tool.setToolFlagToTrue("eraser");
      this.tool.changeActiveState("eraserBtn");
    });

    document.querySelector(".stroke-btn").addEventListener("click", () => {
      this.tool.setToolFlagToTrue("stroke");
      this.tool.changeActiveState("strokeBtn");
    });

    document
      .querySelector(".same-color-fill-btn")
      .addEventListener("click", () => {
        this.tool.setToolFlagToTrue("sameFill");
        this.tool.changeActiveState("sameColorFillBtn");
      });
  }

  keyShortcutHandler() {
    document.addEventListener("keydown", event => {
      if (event.target.nodeName.toLowerCase() !== "input") {
        switch (event.code) {
          case "KeyP":
            document.querySelector(".pencil-btn").click();
            break;
          case "KeyB":
            document.querySelector(".bucketBtn").click();
            break;
          case "KeyC":
            document.querySelector(".choose-color-btn").click();
            break;
          default:
        }
      }
    });
  }

  fullscreenHandler() {
    document
      .querySelector(".background-image-frame-container")
      .addEventListener("click", e => {
        if ("fullscreenEnabled" in document) {
          if (document.fullscreenEnabled) {
            console.log("User allows fullscreen");

            if ("requestFullscreen" in e.target) {
              e.target.requestFullscreen();
            }
          }
        } else {
          console.log("User doesn't allow full screen");
        }
      });
  }

  loginHandler() {
    // eslint-disable-next-line no-undef
    netlifyIdentity.on("login", () => {
      // setLogin();
      const outputText = document.querySelector(".login-text");

      outputText.style.display = "block";
      // eslint-disable-next-line no-undef
      outputText.innerText = ` Welcome, ${netlifyIdentity.currentUser()}!`;
    });

    // eslint-disable-next-line no-undef
    netlifyIdentity.on("logout", () => {
      const outputText = document.querySelector(".login-text");
      outputText.style.display = "none";
      // eslint-disable-next-line no-undef
      // netlifyIdentity.logout();
    });
  }

  colorHandler() {
    document.querySelector(".currentColor").addEventListener("click", () => {
      this.changeState(".current-btn");
      document.querySelector("#primary-color-picker").click();
    });

    document.querySelector(".prevColor").addEventListener("click", () => {
      this.changeState(".prev-btn");
      document.querySelector("#secondary-color-picker").click();
    });

    document.querySelector(".blue-btn").addEventListener("click", () => {
      this.color.changeColor(".blue-btn");
      this.changeState(".blue-btn");
    });

    document.querySelector(".red-btn").addEventListener("click", () => {
      this.color.changeColor(".red-btn");
      this.changeState(".red-btn");
    });

    document
      .querySelector("#primary-color-picker")
      .addEventListener("input", e => {
        context.fillStyle = e.target.value;
        document.querySelector(".curr-color").style.background = e.target.value;
      });
    document
      .querySelector("#secondary-color-picker")
      .addEventListener("input", e => {
        context.fillStyle = e.target.value;
        document.querySelector(".prev-color-btn").style.background =
          e.target.value;
      });
  }

  frameHandler() {
    document.querySelector(".preview-list").addEventListener("click", e => {
      if (e.target.classList.contains("delete-frame")) {
        this.frame.deleteFrame(e);
        idCount.count -= 1;
      } else if (e.target.classList.contains("duplicate-frame")) {
        this.frame.duplicateFrame(e);
      } else if (e.target.closest(".preview-tile")) {
        const previewTile = document.querySelectorAll(".preview-tile");
        [].forEach.call(previewTile, el => {
          el.classList.remove("selected");
        });
        e.target.closest(".preview-tile").classList.add("selected");
        this.canvas.updateCanvas();
      }
    });

    document.querySelector(".add__frame__btn").addEventListener("click", () => {
      this.frame.createFrame(idCount.count);
      idCount.count += 1;
    });
  }

  fpsHandler() {
    document.querySelector(".range-fps").addEventListener("input", () => {
      document.querySelector(".display-fps").innerHTML = `${
        document.querySelector(".range-fps").value
      } FPS`;
      startAnimating(document.querySelector(".range-fps").value);
    });
  }

  saveAsGIFHandler() {
    document.querySelector(".save-as-gif").addEventListener("click", () => {
      console.log("save as GIF");
      this.saveGIF.saveAsGIF();
    });
  }
  // frameDnDHandler() {
  //   // document.addEventListener("dragstart", e => {
  //   //   dragged = e.target;
  //   //   console.log(dragged);
  //   //   if(e.target.classList)
  //   // });
  //   document.querySelector(".dnd-frame").addEventListener("mousedown", e => {
  //     console.log(e.target.parentElement);
  //   });
  //   // document.querySelector(".preview-list").addEventListener("dragstart", e => {
  //   //   // e.preventDefault();
  //   //   dragged = e.target;
  //   // });
  //   // document.querySelector(".preview-list").addEventListener("dragover", e => {
  //   //   // if()
  //   //   e.preventDefault();
  //   // });
  // }

  saveData() {
    window.addEventListener("beforeunload", () => {
      this.canvas.saveCanvas();
      this.size.saveSize();
      this.tool.saveTool();
      this.color.saveColors();
    });
  }

  onMouseMove(e, size) {
    const [lastX, lastY] = [
      Math.floor(e.offsetX / size),
      Math.floor(e.offsetY / size)
    ];

    if (tools.eraser) {
      context.globalCompositeOperation = "destination-out";
    } else {
      context.globalCompositeOperation = "source-over";
    }
    if (!isDrawing.drawing) return;
    const penSize = this.checkPenSize();
    // this.checkMouseBtn();
    if (tools.pencil) {
      this.canvas.drawLine(
        previousCords.firstCord,
        lastX,
        previousCords.secondCord,
        lastY,
        penSize
      );
    }
    if (tools.stroke) {
      this.canvas.strokeLine(
        startPoints.startX,
        lastX,
        startPoints.startY,
        lastY,
        penSize
      );
    }
    if (tools.eraser) {
      this.canvas.drawLine(
        previousCords.firstCord,
        lastX,
        previousCords.secondCord,
        lastY,
        penSize
      );
    }
    [previousCords.firstCord, previousCords.secondCord] = [lastX, lastY];
  }

  checkPenSize() {
    let penSize;
    if (document.querySelector("#penx1").checked) {
      penSize = 1;
    } else if (document.querySelector("#penx2").checked) {
      penSize = 2;
    } else if (document.querySelector("#penx3").checked) {
      penSize = 3;
    } else if (document.querySelector("#penx4").checked) {
      penSize = 4;
    }
    return penSize;
  }

  setToolForDrawing(e, size) {
    const firstX = Math.floor(e.offsetX / size);
    const firstY = Math.floor(e.offsetY / size);
    previousCords.firstCord = firstX;
    previousCords.secondCord = firstY;
    [startPoints.startX, startPoints.startY] = [firstX, firstY];
    if (tools.eraser) {
      context.globalCompositeOperation = "destination-out";
    } else {
      context.globalCompositeOperation = "source-over";
    }
    if (tools.pencil) {
      const pensize = this.checkPenSize();
      this.canvas.draw(e, size, pensize);
    } else if (tools.bucket) {
      this.canvas.fillCanvas(firstX, firstY);
    } else if (tools.colorPicker) {
      this.canvas.pickColor(firstX, firstY, e);
    } else if (tools.eraser) {
      this.canvas.eraserTool(e);
    } else if (tools.sameFill) {
      this.canvas.fillSameColors(firstX, firstY);
    }
    //  else if (tools.stroke) {
    //   this.canvas.strokeLine(e, size);
    // }
  }

  handleSize(size, sizeFlag, id) {
    localStorage.setItem("canvasW", size);
    localStorage.setItem("canvasH", size);
    this.size.setSizeFlagToTrue(sizeFlag);
    this.size.changeActiveState(id);
    this.size.reSize(size, size);
  }

  changeState(name) {
    const buttons = document.querySelectorAll(".button");
    [].forEach.call(buttons, el => {
      el.classList.remove("active");
    });
    document.querySelector(name).classList.add("active");
  }
}
