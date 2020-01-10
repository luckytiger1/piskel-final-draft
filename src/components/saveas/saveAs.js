/* eslint-disable class-methods-use-this */
import GIF from "gif.js-upgrade/dist/gif";
import workerStr from "../utils/worker";
import { previewFrames } from "../utils/variables";
import "./saveAs.scss";

require("gif.js-upgrade");
const UPNG = require("upng-js");
const download = require("downloadjs");

export default class SaveAsGIF {
  saveAsGIF() {
    const fps = parseInt(document.querySelector(".display-fps").innerHTML, 10);

    const workerBlob = new Blob([workerStr], {
      type: "application/javascript"
    });

    const gif = new GIF({
      workers: 2,
      quality: 10,
      workerScript: URL.createObjectURL(workerBlob)
    });

    document.querySelectorAll(".preview-tile").forEach(frame => {
      const frameCanv = frame.childNodes[0].firstElementChild;
      const tempCanvas = this.setTempCanvas(frameCanv);
      gif.addFrame(tempCanvas, { delay: 1000 / fps, copy: true });
    });

    gif.on("finished", blob => {
      download(blob, "piskel-clone.gif", "gif");
    });

    gif.render();
  }

  saveAsAPNG() {
    const fps = parseInt(document.querySelector(".display-fps").innerHTML, 10);

    const arrayBuffer = [];
    const delays = new Array(previewFrames.allFrames.length).fill(1000 / fps);

    document.querySelectorAll(".preview-tile").forEach(frame => {
      const frameCanv = frame.childNodes[0].firstElementChild;
      const tempCanvas = this.setTempCanvas(frameCanv);
      const imgData = tempCanvas.getContext("2d").getImageData(0, 0, 512, 512);
      const { buffer } = imgData.data;
      arrayBuffer.push(buffer);
    });

    const file = UPNG.encode(arrayBuffer, 512, 512, 0, delays);

    download(file, "piskel-clone.apng", "apng");
  }

  setTempCanvas(canv) {
    const tempCanvas = document.createElement("canvas");
    const tempContext = tempCanvas.getContext("2d");
    tempCanvas.width = 512;
    tempCanvas.height = 512;
    tempContext.drawImage(canv, 0, 0, 512, 512);
    return tempCanvas;
  }
}
