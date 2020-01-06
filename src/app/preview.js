/* eslint-disable class-methods-use-this */
import GIF from "gif.js-upgrade/dist/gif";

import { previewFrames, canvas } from "./variables";

const previewFrameContainer = document.querySelector(
  ".background-image-frame-container"
);

const stop = false;
let fpsInterval;
let now;
let then;
let elapsed;
const framePerSecond = parseInt(
  document.querySelector(".display-fps").innerHTML,
  10
);
let j = 0;

function animate(newtime) {
  // stop
  if (stop) {
    return;
  }

  // request another frame

  requestAnimationFrame(animate);

  // calc elapsed time since last loop

  now = newtime;
  elapsed = now - then;

  // if enough time has elapsed, draw the next frame
  if (parseInt(document.querySelector(".display-fps").innerHTML, 10) === 0) {
    previewFrameContainer.style.backgroundImage = `url('${document
      .querySelector(".preview-tile.selected")
      .childNodes[0].firstElementChild.toDataURL()}')`;
  }

  if (elapsed > fpsInterval) {
    // Get ready for next frame by setting then=now, but...
    // Also, adjust for fpsInterval not being multiple of 16.67
    then = now - (elapsed % fpsInterval);

    // draw stuff here

    // TESTING...Report #seconds since start and achieved fps.
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

    // gif.addFrame(context, { copy: true });
    document.querySelectorAll(".preview-tile").forEach((el, index) => {
      previewFrames.allFrames[
        index
      ] = el.childNodes[0].firstElementChild.toDataURL();

      gif.addFrame(el.childNodes[0].firstElementChild, {
        delay: 200
      });
    });

    previewFrameContainer.style.backgroundImage = `url('${previewFrames.allFrames[j]}')`;
    j += 1;
    if (j >= previewFrames.allFrames.length) {
      j = 0;
    }
  }
}

function startAnimating(framePerSec) {
  fpsInterval = 1000 / framePerSec;
  then = window.performance.now();
  animate();
}

startAnimating(framePerSecond);

export { animate, startAnimating };
