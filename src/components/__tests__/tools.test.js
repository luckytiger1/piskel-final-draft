import { tools } from "../utils/variables";
import Tool from "../tools/tools";
import "jest-canvas-mock";

jest.mock("../tools/tools");

describe("Canvas module", () => {
  const tool = new Tool();

  // const canvas = document.createElement("canvas");
  // const context = canvas.getContext("2d");
  test("Expected context fillStyle to be #ff0000", () => {
    tool.setPencilToTrue();
    expect(tools.pencil).toBeTruthy();
  });
});

// describe("mock", () => {
//   const canvas = document.createElement("canvas");

//   it("context creation of type 2d returns CanvasRenderingContext2D", () => {
//     const ctx = canvas.getContext("2d");
//     expect(ctx).toBeInstanceOf(CanvasRenderingContext2D);
//   });
// });
