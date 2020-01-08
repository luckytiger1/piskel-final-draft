/* eslint-disable class-methods-use-this */
import {
  context,
  canvas,
  currentColor,
  tools,
  sizes
} from "../utils/variables";
import Size from "./size/size";
import Tool from "./tools/tools";
import Color from "./colors/colors";
// import Preview from "./preview";

export default class Canvas {
  constructor() {
    this.size = new Size();
    this.tool = new Tool();
    this.color = new Color();
  }

  loadCanvas() {
    this.size.setSize();
    document.querySelector("#penx1").checked = true;
    const currSize = localStorage.getItem("currSize");
    const currTool = localStorage.getItem("currTool");
    this.size.showSize(currSize);
    this.tool.showTool(currTool);
    this.color.showColors();
    const prevCanvas = localStorage.getItem("prev-canvas");
    const img = new Image();
    img.src = prevCanvas;

    img.onload = () => {
      context.drawImage(img, 0, 0);
    };
    console.log(tools);
    console.log(sizes);
    document.querySelector(".range-fps").value = 0;
    document.querySelector(".display-fps").innerHTML = `${
      document.querySelector(".range-fps").value
    } FPS`;
  }

  drawLine(x0, x1, y0, y1, size) {
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;
    context.imageSmoothingEnabled = false;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      context.fillRect(x0, y0, size, size);
      context.fill();

      if (x0 === x1 && y0 === y1) break;
      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        // eslint-disable-next-line no-param-reassign
        x0 += sx;
      }
      if (e2 < dx) {
        err += dx;
        // eslint-disable-next-line no-param-reassign
        y0 += sy;
      }
    }
  }

  draw(e, size, pensize) {
    const lastX = Math.floor(e.offsetX / size);
    const lastY = Math.floor(e.offsetY / size);
    context.fillRect(lastX, lastY, pensize, pensize);
    context.fill();
  }

  eraserTool() {
    context.globalCompositeOperation = "destination-out";
  }

  updateCanvas() {
    const previewCanv = document.querySelector(".preview-tile.selected")
      .childNodes[0].firstElementChild;
    const prevCanvData = previewCanv.toDataURL();
    const img = new Image();
    img.src = prevCanvData;

    context.clearRect(0, 0, canvas.width, canvas.height);

    img.onload = () => {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }

  strokeLine(x0, x1, y0, y1, size) {
    context.imageSmoothingEnabled = false;
    context.clearRect(0, 0, canvas.width, canvas.height);
    const img = new Image();
    img.src = localStorage.getItem("prev-canvas");

    context.drawImage(img, 0, 0, canvas.width, canvas.height);

    context.lineWidth = size;
    context.beginPath();
    console.log(
      `x0 is ${x0},y0 is ${y0 + 0.5} and x1 is ${x1},y1 is ${y1 + 0.5}`
    );
    context.moveTo(x1, y1 + 0.5);
    context.lineTo(x0, y0 + 0.5);
    context.stroke();
  }

  getPixel(pixelData, x, y) {
    if (x < 0 || y < 0 || x >= pixelData.width || y >= pixelData.height) {
      return -1; // impossible color
    }
    return pixelData.data[y * pixelData.width + x];
  }

  fillCanvas(x, y) {
    const pixel = context.getImageData(x, y, 1, 1).data;
    const targetColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    const fillColor = currentColor.value;

    if (targetColor === fillColor) return;

    context.fillRect(x, y, 1, 1);
    let queue = [];

    queue.push([x, y]);

    while (queue.length) {
      if (
        x + 1 > 0 &&
        x + 1 < canvas.width &&
        targetColor ===
          this.getColorFromPixel(context.getImageData(x + 1, y, 1, 1).data)
      ) {
        queue.push([x + 1, y]);
        context.fillRect(x + 1, y, 1, 1);
      }

      if (
        x - 1 >= 0 &&
        x - 1 < canvas.width &&
        targetColor ===
          this.getColorFromPixel(context.getImageData(x - 1, y, 1, 1).data)
      ) {
        queue.push([x - 1, y]);
        context.fillRect(x - 1, y, 1, 1);
      }

      if (
        y + 1 > 0 &&
        y + 1 < canvas.width &&
        targetColor ===
          this.getColorFromPixel(context.getImageData(x, y + 1, 1, 1).data)
      ) {
        queue.push([x, y + 1]);
        context.fillRect(x, y + 1, 1, 1);
      }

      if (
        y - 1 >= 0 &&
        y - 1 < canvas.width &&
        targetColor ===
          this.getColorFromPixel(context.getImageData(x, y - 1, 1, 1).data)
      ) {
        queue.push([x, y - 1]);
        context.fillRect(x, y - 1, 1, 1);
      }

      queue.shift(0);

      if (queue.length > 0) {
        // eslint-disable-next-line no-param-reassign
        [x, y] = [queue[0][0], queue[0][1]];
      }
    }
    queue = [];
  }

  fillSameColors(x, y) {
    const pixel = context.getImageData(x, y, 1, 1).data;
    const prevColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    for (let i = 0; i < canvas.width; i += 1) {
      for (let j = 0; j < canvas.height; j += 1) {
        const point = context.getImageData(i, j, 1, 1).data;
        const currColor = `rgb(${point[0]}, ${point[1]}, ${point[2]})`;

        if (currColor === prevColor) {
          context.fillRect(i, j, 1, 1);
        }
      }
    }
  }

  getColorFromPixel(arr) {
    return `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
  }

  isCanvasBlank() {
    const pixelBuffer = new Uint32Array(
      context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
    );
    return !pixelBuffer.some(color => color !== 0);
  }

  pickColor(x, y, event) {
    const pixel = context.getImageData(x, y, 1, 1);
    const { data } = pixel;
    const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
    if (event.button === 0) {
      document.querySelector(".curr-color").style.background = rgba;
    } else if (event.button === 2) {
      document.querySelector(".prev-color-btn").style.background = rgba;
    }
  }

  saveCanvas() {
    const imageData = canvas.toDataURL();

    localStorage.setItem("prev-canvas", imageData);
  }
}
