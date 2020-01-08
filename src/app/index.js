import EventHandler from "./events/events";
import "./style.scss";
import Canvas from "./canvas/canvas";
import Frame from "./frame/frame";
import "./preview/preview";

export default class App {
  constructor() {
    this.event = new EventHandler();
    this.canvas = new Canvas();
    this.frame = new Frame();
    // this.preview = new Preview();
  }

  init() {
    this.event.canvasEvents();
    this.event.sizeBtnHandler();
    this.event.toolsHandler();
    this.event.keyShortcutHandler();
    this.event.colorHandler();
    this.event.saveData();
    this.event.frameHandler();
    this.event.fpsHandler();
    this.event.saveAsGIFHandler();
    this.event.fullscreenHandler();
    this.event.loginHandler();
    this.canvas.loadCanvas();
    this.frame.createFrame(0);
    // this.preview.previewFrame();
    this.frame.firstFrameOnFirstLoad();
    // window.requestAnimationFrame(this.preview.step);
  }
}

const app = new App();
app.init();
