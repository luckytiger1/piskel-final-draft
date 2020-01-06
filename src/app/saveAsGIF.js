import GIF from "gif.js-upgrade/dist/gif";
// import "./gif.worker";
import { canvas } from "./variables";

export default class SaveAsGIF {
  // eslint-disable-next-line class-methods-use-this
  saveAsGIF() {
    const gif = new GIF({
      workers: 2,
      workerScript: "/gif.js-upgrade/dist/gif.worker.js",
      width: canvas.width,
      height: canvas.height,
      quality: 10,
      repeat: 0
    });

    // add an image element

    // or a canvas element
    // gif.addFrame(canvas.toDataURL(), { delay: 200 });

    // gif.addFrame(context, { copy: true });

    // or copy the pixels from a canvas context

    gif.on("finished", blob => {
      console.log("ready to download");
      window.open(URL.createObjectURL(blob), "rendered");
    });

    // this.encoder.setRepeat(0);
    // this.encoder.setDelay(500);
    // this.encoder.writeHeader();
    // this.encoder.addFrame(context);
    // this.encoder.finish();
    // this.encoder.download("download.gif");
  }
}
