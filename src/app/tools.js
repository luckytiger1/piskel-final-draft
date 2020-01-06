/* eslint-disable class-methods-use-this */
import { tools } from "./variables";

export default class Tool {
  showTool(tool) {
    switch (tool) {
      case "pencil": {
        tools.pencil = true;
        this.changeActiveState("pencil");
        break;
      }
      case "bucket": {
        tools.bucket = true;
        this.changeActiveState("bucketBtn");
        break;
      }
      case "colorPicker": {
        tools.colorPicker = true;
        this.changeActiveState("chooseColorBtn");
        break;
      }
      case "eraser": {
        tools.eraser = true;
        this.changeActiveState("eraserBtn");
        break;
      }
      case "stroke": {
        tools.stroke = true;
        this.changeActiveState("strokeBtn");
        break;
      }
      case "sameFill": {
        tools.sameFill = true;
        this.changeActiveState("sameColorFillBtn");
        break;
      }
      default:
        tools.pencil = true;
        this.changeActiveState("pencil");
    }
  }

  saveTool() {
    if (tools.pencil) {
      localStorage.setItem("currTool", "pencil");
    }
    if (tools.bucket) {
      localStorage.setItem("currTool", "bucket");
    }
    if (tools.colorPicker) {
      localStorage.setItem("currTool", "colorPicker");
    }
    if (tools.eraser) {
      localStorage.setItem("currTool", "eraser");
    }
    if (tools.stroke) {
      localStorage.setItem("currTool", "stroke");
    }
    if (tools.sameFill) {
      localStorage.setItem("currTool", "sameFill");
    }
  }

  setToolFlagToTrue(tool) {
    if (tool === "pencil") {
      this.setPencilToTrue();
    }
    if (tool === "bucket") {
      this.setBucketToTrue();
    }
    if (tool === "colorPicker") {
      this.setColorPickerToTrue();
    }
    if (tool === "eraser") {
      this.setEraserToTrue();
    }
    if (tool === "stroke") {
      this.setStrokeToTrue();
    }
    if (tool === "sameFill") {
      this.setsameFillToTrue();
    }
  }

  setPencilToTrue() {
    tools.pencil = true;
    tools.bucket = false;
    tools.colorPicker = false;
    tools.eraser = false;
    tools.stroke = false;
    tools.sameFill = false;
  }

  setBucketToTrue() {
    tools.pencil = false;
    tools.bucket = true;
    tools.colorPicker = false;
    tools.eraser = false;
    tools.stroke = false;
    tools.sameFill = false;
  }

  setColorPickerToTrue() {
    tools.pencil = false;
    tools.bucket = false;
    tools.colorPicker = true;
    tools.eraser = false;
    tools.stroke = false;
    tools.sameFill = false;
  }

  setEraserToTrue() {
    tools.pencil = false;
    tools.bucket = false;
    tools.colorPicker = false;
    tools.eraser = true;
    tools.stroke = false;
    tools.sameFill = false;
  }

  setStrokeToTrue() {
    tools.pencil = false;
    tools.bucket = false;
    tools.colorPicker = false;
    tools.eraser = false;
    tools.stroke = true;
    tools.sameFill = false;
  }

  setsameFillToTrue() {
    tools.pencil = false;
    tools.bucket = false;
    tools.colorPicker = false;
    tools.eraser = false;
    tools.stroke = false;
    tools.sameFill = true;
  }

  changeActiveState(id) {
    const listItems = document.querySelectorAll(".list-item");
    [].forEach.call(listItems, el => {
      el.classList.remove("active");
    });
    document.querySelector(`.list-item.${id}`).classList.add("active");
  }
}
