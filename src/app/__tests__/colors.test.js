import Color from "../canvas/colors/colors";

jest.mock("../canvas/colors/colors.js");

describe("Canvas module", () => {
  const color = new Color();
  // const currColor = document.querySelector(".curr-color");
  // const ctx = canvas.getContext("2d");

  test("Expected context fillStyle to be #ff0000", () => {
    const canv = document.querySelector("#canvas");
    const context = canv.getContext("2d");
    const mockCallback = jest.fn();
    color.changeColor(".red-btn", context, mockCallback);
    expect(mockCallback).toHaveBeenCalledWith(3);
    expect(context.fillStyle).toBe("#ff0000");
  });
});
