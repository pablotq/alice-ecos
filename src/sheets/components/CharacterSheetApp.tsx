import React, { useEffect, useState } from "react";
import styles from "../../styles/CharacterSheetApp.module.scss";
import { validateAliceAttributeSpread } from "./CharacterSheetApp.logic";
import { AttributeKey } from "../../types/atributeKey";
import { localize } from "../../i18n";
import { resolveRoll } from "../../logic/roll-rules";
import { ModalRoll } from "./ModalRoll";
import { buildCharacterRollChatHtml } from "./CharacterRoll";
import { CardGrid } from "./CardGrid";
import { WonderlandDecor } from "./WonderlandDecor";

const SUIT_GLYPH: Record<string, string> = {
  Copas: "♥",
  Ouro: "♦",
  Paus: "♣",
  Espadas: "♠"
};

const ATTRIBUTE_KEYS = ["form", "logic", "dream"] as const;
const DEFAULT_SUITS: Record<string, string> = {
  form: "Copas",
  logic: "Ouro",
  dream: "Paus",
  defect: "Espadas"
};

export function CharacterSheetApp({ actor }: { actor: Actor.Implementation }) {
  const system = actor.system;
  const attrs = system.attributes;
  const suits = system.suits;
  const integrity = system.integrity;
  const cards = (system.cards ?? []) as any[];

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    try {
      return localStorage.getItem("ecos-alice-theme") === "dark" ? "dark" : "light";
    } catch {
      return "light";
    }
  });
  const [activeRollKey, setActiveRollKey] = useState<AttributeKey | null>(null);
  const [chatMessage, setChatMessage] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("ecos-alice-theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

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
  };

  const updateIntegrity = (key: "form" | "logic" | "dream", value: number) => {
    actor.update({
      system: {
        integrity: {
          [key]: value
        }
      }
    });
  };

  const removeCard = (cardId: string) => {
    const filteredCards = cards.filter((card: any) => card.id !== cardId);
    actor.update({ system: { cards: filteredCards } });
  };

  const validSpread = validateAliceAttributeSpread({
    form: attrs.form,
    logic: attrs.logic,
    dream: attrs.dream
  });
  const resolveSuit = (key: string) => String(suits?.[key] ?? DEFAULT_SUITS[key] ?? "Copas");
  const defectSuit = String(cards.find((card) => card?.slot === "defect")?.suit ?? resolveSuit("defect"));
  const defectGlyph = SUIT_GLYPH[defectSuit] ?? "♠";

  const attributeLabels: Record<AttributeKey, string> = {
    form: "Forma",
    logic: "Lógica",
    dream: "Devaneio"
  };

  const openRollModal = (key: AttributeKey) => {
    setActiveRollKey(key);
  };

  const handleRollConfirm = async (key: AttributeKey, bonus: number, difficulty: number) => {
    const attributeValue = attrs[key];
    const integrityValue = integrity[key];

    const result = await resolveRoll({
      attributeValue,
      bonus,
      integrity: integrityValue,
      difficulty
    });

    const label = attributeLabels[key];
    const resultText = buildCharacterRollChatHtml({
      attributeLabel: label,
      attributeKey: key,
      suit: suits[key],
      outcome: result.outcome,
      results: result.results,
      diceCount: result.diceCount,
      difficulty: result.difficulty,
      cleanSuccess: result.cleanSuccess,
      costlySuccess: result.costlySuccess,
      totalSuccess: result.totalSuccess
    });

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content: resultText,
      rolls: [result.roll],
      sound: CONFIG.sounds.dice
    });

    setActiveRollKey(null);
  };

  const sendChatMessage = () => {
    if (!chatMessage.trim()) return;
    ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content: chatMessage
    });
    setChatMessage("");
  };

  return (
    <div className={styles.sheet} data-theme={theme}>
      <WonderlandDecor />

      <header className={styles.banner}>
        <div className={styles.bannerTitle}>
          <h1>Alice: E.C.O.S</h1>
        </div>
        <button
          type="button"
          className={`${styles.themePill} ${theme === "dark" ? styles.themePillActive : ""}`}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </header>

      <div className={styles.identity}>
        <label className={styles.fieldLabel}>
          Alice
          <input
            type="text"
            value={system.alice ?? ""}
            onChange={(e) => updateField("alice", e.target.value)}
          />
        </label>
        <label className={styles.fieldLabel}>
          Vivência
          <input
            type="text"
            value={system.vivencia ?? ""}
            onChange={(e) => updateField("vivencia", e.target.value)}
          />
        </label>
      </div>

      <div className={styles.table}>
        {ATTRIBUTE_KEYS.map((key) => {
          const suit = resolveSuit(key);
          const glyph = SUIT_GLYPH[suit] ?? "♥";
          const rank = String(attrs[key] ?? 1);

          return (
            <div key={key} className={`${styles.cardSlot} ${styles[`cardSlot--${key}`]}`}>
              <article className={styles.playingCard} data-suit={suit} data-attr={key}>
                <span className={`${styles.corner} ${styles.cornerTop}`}>
                  {rank}
                  <i>{glyph}</i>
                </span>

                <div className={styles.cardFace}>
                  <p className={styles.heroSuit}>{glyph}</p>
                  <h3>
                    {attributeLabels[key]}
                  </h3>

                  <label className={styles.points}>
                    Pontos
                    <input
                      type="number"
                      min={1}
                      max={4}
                      value={attrs[key]}
                      onChange={(e) => updateAttribute(key, Number(e.target.value))}
                    />
                  </label>

                  <label className={styles.naipeField}>
                    Naipe
                    <select value={suit} onChange={(e) => updateSuit(key, e.target.value)}>
                      <option value="Copas">Copas ♥</option>
                      <option value="Ouro">Ouro ♦</option>
                      <option value="Paus">Paus ♣</option>
                      <option value="Espadas">Espadas ♠</option>
                    </select>
                  </label>

                  <CardGrid cards={cards} slot={key} onRemoveCard={removeCard} title="Assinatura" />

                  <div className={styles.integrity}>
                    <span>Integridade</span>
                    <div className={styles.pips}>
                      {[1, 2, 3].map((pip) => (
                        <button
                          key={pip}
                          type="button"
                          className={pip <= integrity[key] ? styles.pipOn : styles.pipOff}
                          onClick={() => updateIntegrity(key, pip === integrity[key] ? pip - 1 : pip)}
                          aria-label={`Integridade ${pip}`}
                        />
                      ))}
                    </div>
                  </div>

                  <button type="button" className={styles.rollButton} onClick={() => openRollModal(key)}>
                    Rolar {attributeLabels[key]}
                  </button>
                </div>
              </article>
            </div>
          );
        })}
      </div>

      <div className={`${styles.cardSlot} ${styles["cardSlot--defect"]}`}>
        <article className={styles.playingCard} data-suit={defectSuit} data-attr="defect">
          <span className={`${styles.corner} ${styles.cornerTop}`}>
            <i>{defectGlyph}</i>
          </span>
          <div className={styles.cardFace}>
            <p className={styles.heroSuit}>{defectGlyph}</p>
            <h3>
              <span>{defectGlyph}</span> O Custo do Sonho
            </h3>
            <p className={styles.defectHint}>Defeito · Ruptura</p>
            <CardGrid cards={cards} slot="defect" onRemoveCard={removeCard} title="Conceitos" />
          </div>
        </article>
      </div>

      <div className={styles.summary}>
        <span>
          Distribuição: {attrs.form} / {attrs.logic} / {attrs.dream}
        </span>
        <span className={validSpread ? styles.summaryOk : styles.summaryBad}>
          {validSpread ? "Distribuição válida (6 pontos)" : "Distribuição inválida (total deve ser 6)"}
        </span>
      </div>

      <label className={styles.notesField}>
        <span>Notas</span>
        <textarea value={system.notes ?? ""} onChange={(e) => updateField("notes", e.target.value)} />
      </label>

      <div className={styles.chatRow}>
        <input
          type="text"
          placeholder={localize("BOILERPLATE.Sheet.ChatPlaceholder")}
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
        />
        <button type="button" className={styles.sendButton} onClick={sendChatMessage}>
          {localize("BOILERPLATE.Sheet.SendToChat")}
        </button>
      </div>

      {activeRollKey && (
        <ModalRoll
          isOpen={activeRollKey !== null}
          attributeKey={activeRollKey}
          attributeLabel={attributeLabels[activeRollKey]}
          suit={suits[activeRollKey]}
          onConfirm={async (bonus, difficulty) => {
            await handleRollConfirm(activeRollKey, bonus, difficulty);
          }}
          onClose={() => setActiveRollKey(null)}
        />
      )}
    </div>
  );
}
