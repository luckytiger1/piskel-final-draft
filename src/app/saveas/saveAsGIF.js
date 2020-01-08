/* eslint-disable class-methods-use-this */
import GIF from "gif.js-upgrade/dist/gif";
// import "./gif.worker";
// import UPNG from "upng-js";
// import GIFEncoder from "gif.js-upgrade";
import workerStr from "./worker";
import GIFEncoder from "../utils/gif-files/GIFEncoder";
import { canvas, previewFrames, fps, context } from "../utils/variables";

require("gif.js-upgrade");
const UPNG = require("upng-js");
const download = require("downloadjs");

export default class SaveAsGIF {
  saveAsGIF() {
    const workerBlob = new Blob([workerStr], {
      type: "application/javascript"
    });

    const gif = new GIF({
      workers: 2,
      quality: 10,
      workerScript: URL.createObjectURL(workerBlob)
    });

    // add an image element

    // or a canvas element
    // gif.addFrame(canvas, { delay: 200 });

    // gif.addFrame(context, { copy: true });

    // or copy the pixels from a canvas context
    // const encoder = new GIFEncoder();
    // encoder.setRepeat(0);
    // encoder.setDelay(1000 / fps);
    // encoder.start();

    document.querySelectorAll(".preview-tile").forEach(frame => {
      const frameCanv = frame.childNodes[0].firstElementChild;
      // gif.addFrame(frameCtx, { copy: true });
      gif.addFrame(frameCanv, { delay: 200 });
    });

    gif.on("finished", function(blob) {
      download(blob, "piskel-clone.gif", "gif");
    });

    gif.render();
    // encoder.finish();
    // encoder.download("piskel-clone.gif");
  }

  saveAsAPNG() {
    const arrayBuffer = [];
    const delays = new Array(previewFrames.allFrames.length).fill(1000 / fps);

    document.querySelectorAll(".preview-tile").forEach(frame => {
      const frameCtx = frame.childNodes[0].firstElementChild.getContext("2d");
      const imgData = frameCtx.getImageData(0, 0, 512, 512);
      const { buffer } = imgData.data;
      arrayBuffer.push(buffer);
    });

    const file = UPNG.encode(arrayBuffer, 512, 512, 0, delays);

    download(file, "piskel-clone.apng", "apng");
  }
}
