import EventHandler from "./components/events/events";
import "./styles/style.scss";
import Canvas from "./components/canvas/canvas";
import Frame from "./components/frame/frame";
import "./components/preview/preview";
import Login from "./components/login/login";

export default class App {
  constructor() {
    this.event = new EventHandler();
    this.canvas = new Canvas();
    this.frame = new Frame();
    this.login = new Login();
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
    this.canvas.loadCanvas();
    this.frame.createFrame(0);
    this.frame.firstFrameOnFirstLoad();
    this.login.loginHandler();
  }
}

const app = new App();
app.init();
