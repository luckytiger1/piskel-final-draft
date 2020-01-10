const tools = {
  pencil: null,
  bucket: null,
  colorPicker: null,
  eraser: null,
  stroke: null,
  sameFill: null
};

const keyShortcut = {
  penKey: "KeyP",
  bucketKey: "KeyB",
  pickerKey: "KeyC",
  eraserKey: "KeyE",
  strokeKey: "KeyL",
  fillSameKey: "KeyW",
  addFrameKey: "KeyK",
  deleteFrameKey: "KeyJ",
  duplicateFrameKey: "KeyH",
  saveAsGIFKey: "KeyS",
  saveAsAPNGKey: "KeyG"
};

const colors = {
  currentColor: null
};

const sizes = {
  sizex32: null,
  sizex64: null,
  sizex128: null
};

const startPoints = {
  startX: null,
  startY: null
};

const previousCords = {
  firstCord: null,
  secondCord: null
};
const existingLines = [];

const previewFrames = {
  allFrames: []
};

const idCount = {
  count: 1
};
// eslint-disable-next-line import/no-mutable-exports
const isDrawing = { drawing: false };

const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

const currentColor = {
  value: null
};

export {
  tools,
  colors,
  sizes,
  previousCords,
  isDrawing,
  canvas,
  context,
  existingLines,
  startPoints,
  idCount,
  previewFrames,
  currentColor,
  keyShortcut
};
