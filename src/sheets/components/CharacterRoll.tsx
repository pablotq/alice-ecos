import { AttributeKey } from "../../types/atributeKey";
import "../../styles/CharacterRoll.scss";

export type CharacterRollOutcomeMeta = {
  label: string;
};

const SUIT_GLYPH: Record<string, string> = {
  Copas: "♥",
  Ouro: "♦",
  Paus: "♣",
  Espadas: "♠"
};

const OUTCOME_META: Record<string, CharacterRollOutcomeMeta> = {
  "critical-success": { label: "SUCESSO CRÍTICO" },
  success: { label: "SUCESSO" },
  "costly-success": { label: "SUCESSO CUSTOSO" },
  failure: { label: "FALHA" },
  "critical-failure": { label: "FALHA CRÍTICA" }
};

export function getCharacterRollOutcomeMeta(outcome: string): CharacterRollOutcomeMeta {
  return OUTCOME_META[outcome] ?? { label: "RESULTADO" };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function dieBadgeHtml(value: number): string {
  const tone = value >= 5 ? "clean" : value === 4 ? "costly" : "miss";
  return `<span class="alice-die alice-die--${tone}">${value}</span>`;
}

export function buildCharacterRollChatHtml({
  attributeLabel,
  attributeKey,
  outcome,
  results,
  difficulty,
  cleanSuccess,
  costlySuccess,
  totalSuccess,
  suit
}: {
  attributeLabel: string;
  attributeKey?: AttributeKey;
  outcome: string;
  results: number[];
  diceCount: number;
  difficulty: number;
  cleanSuccess: number;
  costlySuccess: number;
  totalSuccess: number;
  suit?: string;
}): string {
  const meta = getCharacterRollOutcomeMeta(outcome);
  const attr = escapeHtml(attributeLabel);
  const attrKey = attributeKey ?? "logic";
  const suitGlyph = SUIT_GLYPH[suit ?? ""] ?? "♠";
  const badges = results.map(dieBadgeHtml).join(" ");

  return `
    <div
      class="character-roll-card"
      data-attr="${attrKey}"
      data-suit="${escapeHtml(suit ?? "Copas")}"
      data-outcome="${escapeHtml(outcome)}"
    >
      <div class="roll-card-header">
        <span class="suit-icon-corner">${suitGlyph}</span>
        <div class="roll-title-group">
          <span class="roll-attribute">TESTE DE ${attr}</span>
        </div>
        <span class="suit-icon-corner">${suitGlyph}</span>
      </div>

      <div class="roll-card-body">
        <div class="roll-dice-container">
          <div class="roll-dice-label">Dados rolados (${results.length}d6):</div>
          <div class="roll-dice-list">${badges}</div>
          <div class="alice-roll__row">
          <span>Dificuldade</span>
          <strong>${difficulty}</strong>
        </div>
        </div>

        <details class="alice-roll__details">
          <summary>Detalhes</summary>
          <div class="alice-roll__details-body">
            <div class="alice-roll__row">
              <span>Sucessos limpos</span>
              <strong>${cleanSuccess}</strong>
            </div>
            <div class="alice-roll__row">
              <span>Sucessos custosos</span>
              <strong>${costlySuccess}</strong>
            </div>
            <div class="alice-roll__row alice-roll__row--highlight">
              <span>Total</span>
              <strong>${totalSuccess}</strong>
            </div>
          </div>
        </details>
        <div class="roll-result">
          <span class="roll-outcome-tag">${escapeHtml(meta.label)}</span>
        </div>
      </div>
    </div>
  `;
}

export type CharacterRollAttributeKey = AttributeKey;
