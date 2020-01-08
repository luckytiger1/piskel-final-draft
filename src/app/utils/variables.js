const tools = {
  pencil: null,
  bucket: null,
  colorPicker: null,
  eraser: null,
  stroke: null,
  sameFill: null
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
const isDrawing = { drawing: false, mouseIsDown: null };

const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
const fps = parseInt(document.querySelector(".display-fps").innerHTML, 10);

const ctxImageData = {
  data: null
};

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
  ctxImageData,
  fps
};
