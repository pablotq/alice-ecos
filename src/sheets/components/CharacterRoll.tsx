import { AttributeKey } from "../../types/atributeKey";

export type CharacterRollOutcomeMeta = {
  label: string;
  color: string;
  background: string;
};

export function getCharacterRollOutcomeMeta(
  outcome: string
): CharacterRollOutcomeMeta {
  const meta: Record<string, CharacterRollOutcomeMeta> = {
    "critical-success": {
      label: "Sucesso crítico",
      color: "#0d8f5f",
      background: "#e8fff4"
    },
    success: {
      label: "Sucesso",
      color: "#0b6ec7",
      background: "#edf6ff"
    },
    "costly-success": {
      label: "Sucesso custoso",
      color: "#b7791f",
      background: "#fff7e8"
    },
    failure: {
      label: "Falha",
      color: "#b3261e",
      background: "#fff1f0"
    },
    "critical-failure": {
      label: "Falha crítica",
      color: "#7a1f1f",
      background: "#ffe7e7"
    }
  };

  return meta[outcome] ?? {
    label: "Resultado",
    color: "#333",
    background: "#f4f4f4"
  };
}

export function buildCharacterRollChatHtml({
  attributeLabel,
  outcome,
  results,
  diceCount,
  difficulty,
  cleanSuccess,
  costlySuccess,
  totalSuccess,
}: {
  attributeLabel: string;
  outcome: string;
  results: number[];
  diceCount: number;
  difficulty: number;
  cleanSuccess: number;
  costlySuccess: number;
  totalSuccess: number;
}): string {
  const meta = getCharacterRollOutcomeMeta(outcome);

  return `
    <div class="character-roll-chat">
      <div class="character-roll-chat__header" style="border-left-color: ${meta.color}; background: ${meta.background};">
        <div class="character-roll-chat__label">Teste de ${attributeLabel}</div>
        <div class="character-roll-chat__result" style="color: ${meta.color};">${meta.label}</div>
      </div>

      <details class="character-roll-chat__details">
        <summary>Ver detalhes do teste</summary>

        <div class="character-roll-chat__details-body">
          <div><strong>Dado(s):</strong> ${results.join(", ")}</div>
          <div><strong>Quantidade:</strong> ${diceCount}</div>
          <div><strong>Dificuldade:</strong> ${difficulty}</div>
          <div><strong>Sucessos limpos:</strong> ${cleanSuccess}</div>
          <div><strong>Sucessos custosos:</strong> ${costlySuccess}</div>
          <div><strong>Total de sucessos:</strong> ${totalSuccess}</div>
        </div>
      </details>
    </div>
  `;
}

export type CharacterRollAttributeKey = AttributeKey;
