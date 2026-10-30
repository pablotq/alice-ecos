import { describe, expect, it } from "vitest";
import { buildCharacterRollChatHtml, getCharacterRollOutcomeMeta } from "./CharacterRoll";

describe("buildCharacterRollChatHtml", () => {
  it("shows attribute, dice and outcome, with successes inside the expandable block", () => {
    const html = buildCharacterRollChatHtml({
      attributeLabel: "Lógica",
      attributeKey: "logic",
      outcome: "costly-success",
      results: [6, 4, 2],
      diceCount: 3,
      difficulty: 2,
      cleanSuccess: 1,
      costlySuccess: 1,
      totalSuccess: 2
    });

    expect(html).toContain("Lógica");
    expect(html).toContain('data-attr="logic"');
    expect(html).toContain(getCharacterRollOutcomeMeta("costly-success").label);
    expect(html).toContain("alice-die--clean");
    expect(html).toContain("alice-die--costly");
    expect(html).toContain("alice-die--miss");
    expect(html).toContain("alice-roll__details");
    expect(html).toContain("Sucessos limpos");
    expect(html).toContain("Sucessos custosos");
    expect(html).toMatch(/Sucessos limpos[\s\S]*<strong>1<\/strong>/);
    expect(html).toMatch(/Sucessos custosos[\s\S]*<strong>1<\/strong>/);
  });
});
