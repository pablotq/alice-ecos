import React, { useState } from "react";
import styles from "./CharacterSheetApp.module.scss";
import { validateAliceAttributeSpread } from "./CharacterSheetApp.logic";
import { CardSlot } from "../../types/cardSlot";
import { localize } from "../../i18n";


export function CharacterSheetApp({ actor }: { actor: Actor.Implementation }) {
  const system = actor.system;
  const attrs = system.attributes;
  const suits = system.suits;
  const integrity = system.integrity;
  const cards = system.cards ?? [];

  const updateField = (path: string, value: string | number) => {
    actor.update({ system: { [path]: value } });
  };

  const updateAttribute = (key: "form" | "logic" | "dream", value: number) => {
    actor.update({
      system: {
        attributes: {
          [key]: value
        }
      }
    });
  };

  const updateSuit = (key: "form" | "logic" | "dream", value: string) => {
    actor.update({
      system: {
        suits: {
          [key]: value
        }
      }
    });
  }

  const cardsBySlot: Record<CardSlot, any[]> = {
    forma: cards.filter((card) => card.slot === "forma"),
    mente: cards.filter((card) => card.slot === "mente"),
    devaneio: cards.filter((card) => card.slot === "devaneio"),
    defeito: cards.filter((card) => card.slot === "defeito")
  };

  const slotTitles: Record<CardSlot, string> = {
    forma: "Forma",
    mente: "Mente",
    devaneio: "Devaneio",
    defeito: "Defeito"
  };

  const validSpread = validateAliceAttributeSpread({
    form: attrs.form,
    logic: attrs.logic,
    dream: attrs.dream
  });

  // chat que é do boilerplate, mas não é usado no momento. Mantido para referência futura.
  const [chatMessage, setChatMessage] = useState("");
  const sendChatMessage = () => {
    if (!chatMessage.trim()) return;
    ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content: chatMessage
    });
    setChatMessage("");
  };

  return (
    <div className={styles.sheet}>
      <h1>{actor.name}</h1>

      <div className={styles.fieldGroup}>
        <label>
          Alice
          <input
            type="text"
            value={system.alice ?? ""}
            onChange={(e) => updateField("alice", e.target.value)}
          />
        </label>
        <label>
          Vivência
          <input
            type="text"
            value={system.vivencia ?? ""}
            onChange={(e) => updateField("vivencia", e.target.value)}
          />
        </label>
      </div>

      <div className={styles.attributes}>
        {(["form", "logic", "dream"] as const).map((key) => (
          <div key={key} className={styles.attributeBlock}>
            <h3>{key}</h3>

            <label>
              Valor
              <input
                type="number"
                min={1}
                max={4}
                value={attrs[key]}
                onChange={(e) => updateAttribute(key, Number(e.target.value))}
              />
            </label>

            <label>
              Naipe
              <select
                value={suits[key]}
                onChange={(e) => updateSuit(key, e.target.value)}
              >
                <option value="Copas">Copas</option>
                <option value="Ouro">Ouro</option>
                <option value="Paus">Paus</option>
                <option value="Espadas">Espadas</option>
              </select>
            </label>

            <label>
              Integridade
              <input
                type="number"
                min={0}
                max={3}
                value={integrity[key]}
                onChange={(e) =>
                  actor.update({
                    system: {
                      integrity: {
                        [key]: Number(e.target.value)
                      }
                    }
                  })
                }
              />
            </label>
          </div>
        ))}
      </div>

      <div className={styles.cardGrid}>
        {(Object.keys(cardsBySlot) as CardSlot[]).map((slot) => (
          <div key={slot}
            className={styles.cardColumn}
            data-card-slot={slot}
            onDragOver={(event) => event.preventDefault()}
          >
            <h3>{slotTitles[slot]}</h3>

            {cardsBySlot[slot].length === 0 ? (
              <p> Arraste uma carta aqui</p>
            ) : (
              cardsBySlot[slot].map((card: any) => (
                <div key={card.id} className={styles.cardItem}>
                  <strong>{card.name}</strong>
                  <small>{card.suit} · {card.category}</small>
                  <p>{card.description}</p>
                  <p>{card.effect}</p>
                </div>
              ))
            )}
          </div>
        ))}
      </div>

      <div className={styles.summary}>
        <span>
          Distribuição: {attrs.form} / {attrs.logic} / {attrs.dream}
        </span>
        <span>{validSpread ? "Distribuição válida (6 pontos)" : "Distribuição inválida (total deve ser 6)"}</span>
      </div>

      <label>
        Notas
        <textarea
          value={system.notes ?? ""}
          onChange={(e) => updateField("notes", e.target.value)}
        />
      </label>

      <div className={styles.chatRow}>
        <input
          type="text"
          placeholder={localize("BOILERPLATE.Sheet.ChatPlaceholder")}
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
        />
        <button type="button" onClick={sendChatMessage}>
          {localize("BOILERPLATE.Sheet.SendToChat")}
        </button>
      </div>
    </div>
  );
}
