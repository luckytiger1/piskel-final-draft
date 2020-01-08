import Canvas from "../canvas/canvas";
import { canvas, context, previewFrames } from "../utils/variables";

/* eslint-disable class-methods-use-this */

export default class Frame {
  constructor() {
    this.canvas = new Canvas();
  }

  createFrame(id) {
    const listItem = document.createElement("li");
    listItem.classList.add("preview-tile");
    const canvasEl = document.createElement("canvas");
    canvasEl.id = "preview-canvas";
    canvasEl.width = 128;
    canvasEl.height = 128;
    const canvasContainer = document.createElement("div");
    const canvasBg = document.createElement("div");
    canvasBg.className = "canvas-background";
    canvasContainer.className = "canvas-container";
    const listContainer = document.querySelector("#preview-list");
    const deleteBtn = this.addDeleteFrameBtn();
    const duplicateBtn = this.addDuplicateFrameBtn();
    const DragNDropBtn = this.addDnDBtn();
    listItem.append(deleteBtn, duplicateBtn, DragNDropBtn);
    listContainer.append(listItem);
    listItem.prepend(canvasContainer);
    listItem.setAttribute("data-tile-number", parseInt(id, 10));
    canvasContainer.append(canvasEl, canvasBg);
    this.changeBtnStyle();
    context.clearRect(0, 0, canvas.width, canvas.height);
    // listItem.setAttribute("draggable", true);
    const previewTile = document.querySelectorAll(".preview-tile");
    [].forEach.call(previewTile, el => {
      el.classList.remove("selected");
    });
    listItem.classList.add("selected");
  }

  firstFrameOnFirstLoad() {
    const firstFrameCanvas = document.querySelector(".preview-tile")
      .childNodes[0].firstElementChild;
    const prevCanvas = localStorage.getItem("prev-canvas");
    const img = new Image();
    img.src = prevCanvas;
    firstFrameCanvas.getContext("2d").imageSmoothingEnabled = false;

    img.onload = () => {
      document
        .querySelector(".preview-tile")
        .childNodes[0].firstElementChild.getContext("2d")
        .drawImage(
          img,
          0,
          0,
          canvas.width,
          canvas.height,
          0,
          0,
          firstFrameCanvas.width,
          firstFrameCanvas.height
        );
    };
  }

  showPreviewFrame() {
    const previewCanv = document.querySelector(".preview-tile.selected")
      .childNodes[0].firstElementChild;
    const previewCtx = previewCanv.getContext("2d");
    const img = new Image();
    img.src = localStorage.getItem("prev-canvas");
    previewCtx.imageSmoothingEnabled = false;
    previewCtx.clearRect(0, 0, previewCanv.width, previewCanv.height);

    img.onload = () => {
      previewCtx.drawImage(
        img,
        0,
        0,
        canvas.width,
        canvas.height,
        0,
        0,
        previewCanv.width,
        previewCanv.height
      );
    };
  }

  addDnDBtn() {
    const DnDBtn = document.createElement("div");
    DnDBtn.classList.add("tile-overlay", "dnd-frame", "dnd-frame-icon");

    return DnDBtn;
  }

  addDeleteFrameBtn() {
    const deleteFrameBtn = document.createElement("button");

    deleteFrameBtn.classList.add(
      "delete-frame",
      "delete-frame-icon",
      "tile-overlay"
    );
    return deleteFrameBtn;
  }

  addDuplicateFrameBtn() {
    const duplicateFrameBtn = document.createElement("button");
    duplicateFrameBtn.classList.add(
      "duplicate-frame",
      "duplicate-frame-icon",
      "tile-overlay"
    );
    return duplicateFrameBtn;
  }

  deleteFrame(e) {
    const tile = e.target.parentNode;
    this.changeSelectedTile(e);

    document.querySelector("#preview-list").removeChild(tile);
    const item = e.target.parentElement.childNodes[0].firstElementChild.toDataURL();
    const index = previewFrames.allFrames.indexOf(item);
    if (index !== -1) {
      previewFrames.allFrames.splice(index, 1);
    }
    this.changeBtnStyle();
  }

  duplicateFrame(e) {
    if (e.target.parentElement.classList.contains("selected")) {
      e.target.parentElement.classList.remove("selected");
      // e.target.parentElement.nextElementSibling.classList.add("selected");
    }
    document.querySelector(".delete-frame").style.display = "block";
    document.querySelector(".dnd-frame").style.display = "block";
    // const parentNode = document.querySelector("#preview-list");
    const currentTile = e.target.parentElement;
    const tileCopy = currentTile.cloneNode(true);
    const canvasToCopy = currentTile.childNodes[0].firstElementChild;
    const duplicateCtx = tileCopy.childNodes[0].firstElementChild.getContext(
      "2d"
    );
    duplicateCtx.drawImage(canvasToCopy, 0, 0);
    const previewTile = document.querySelectorAll(".preview-tile");
    [].forEach.call(previewTile, el => {
      el.classList.remove("selected");
    });
    tileCopy.classList.add("selected");

    this.updateCurrentCanvas(canvasToCopy);
    currentTile.after(tileCopy);
    console.log();
    // parentNode.insertBefore(tileCopy, currentTile);
    // currentTile = tileCopy;
    // this.changeBtnStyle();
  }

  dropFrame(item) {
    const selectedTile = item;

    selectedTile.style.position = "relative";
    // e.target.parentNode.style.position = "absolute";
    selectedTile.style.zIndex = 1000;
    selectedTile.style.left = "";
  }

  dragFrame(e, item) {
    const selectedTile = item;
    selectedTile.style.left = `${e.pageX - selectedTile.offsetWidth / 2}px`;
  }

  updateCurrentCanvas(canvasToCopy) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(
      canvasToCopy,
      0,
      0,
      canvasToCopy.width,
      canvasToCopy.height,
      0,
      0,
      canvas.width,
      canvas.height
    );
  }

  // async saveFrames() {
  //   await
  //   console.log(previewFrames);
  // }

  changeSelectedTile(e) {
    if (e.target.parentElement.classList.contains("selected")) {
      if (e.target.parentElement.previousElementSibling) {
        e.target.parentElement.previousElementSibling.classList.add("selected");

        this.updateCanvasAfterDeletion(
          e.target.parentElement.previousElementSibling
        );
      } else {
        e.target.parentElement.nextElementSibling.classList.add("selected");
        this.updateCanvasAfterDeletion(
          e.target.parentElement.nextElementSibling
        );
      }
    }
  }

  updateCanvasAfterDeletion(elem) {
    const newCanvas = elem.childNodes[0].firstElementChild;

    const img = new Image();
    img.src = newCanvas.toDataURL();
    newCanvas.getContext("2d").imageSmoothingEnabled = false;
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.drawImage(
      img,
      0,
      0,
      newCanvas.width,
      newCanvas.height,
      0,
      0,
      canvas.width,
      canvas.height
    );
  }

  changeBtnStyle() {
    if (document.querySelectorAll(".preview-tile").length === 1) {
      document.querySelector(".delete-frame").style.display = "none";
      document.querySelector(".dnd-frame").style.display = "none";
      console.log(document.querySelector(".dnd-frame").style.display);
    } else {
      document.querySelector(".delete-frame").style.display = "block";
      document.querySelector(".dnd-frame").style.display = "block";
    }
  }
}
