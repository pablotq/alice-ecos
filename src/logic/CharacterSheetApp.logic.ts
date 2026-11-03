// Pure game-logic helpers, deliberately kept free of any Foundry global.
// Code that touches `actor`/`ChatMessage`/etc. needs a running Foundry instance
// and isn't realistically unit-testable — this is the boundary to keep that out.
export type AliceAttributeKey = "form" | "logic" | "dream";

export type AliceAttributes = Record<AliceAttributeKey, number>;

export const validateAliceAttributeSpread = (
  values: Partial<AliceAttributes>
): boolean => {
  const form = values.form ?? 0;
  const logic = values.logic ?? 0;
  const dream = values.dream ?? 0;

  const total = form + logic + dream;

  return (
    [form, logic, dream].every(
      (value) => Number.isInteger(value) && value >= 1 && value <= 4
    ) &&
    total === 6
  );
};
