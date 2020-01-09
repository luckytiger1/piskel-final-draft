import { sizes } from "../utils/variables";
import Size from "../canvas/size/size";

describe("Canvas module", () => {
  const size = new Size();

  test("Expected context fillStyle to be #ff0000", () => {
    size.setSizeFlagToTrue("size32");
    expect(sizes.sizex32).toBe(true);
  });
});
