import { describe, expect, it } from "vitest";
import { validateAliceAttributeSpread } from "./CharacterSheetApp.logic";

describe("validateAliceAttributeSpread", () => {
  it("accepts valid six-point spread", () => {
    expect(
      validateAliceAttributeSpread({
        form: 2,
        logic: 2,
        dream: 2
      })
    ).toBe(true);
  })

  it("rejects invalid total or out-of-range values", () => {
    expect(
      validateAliceAttributeSpread({
        form: 4,
        logic: 4,
        dream: 1
      })
    ).toBe(false);

    expect(
      validateAliceAttributeSpread({
        form: 5,
        logic: 1,
        dream: 1
      })
    ).toBe(false);
  });
});

