import "@testing-library/jest-dom/extend-expect";
import "jest-canvas-mock";

// eslint-disable-next-line no-unused-vars
const jsdom = require("jsdom");

global.fetch = require("jest-fetch-mock");
