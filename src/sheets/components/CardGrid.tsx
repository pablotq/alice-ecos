import React from "react";
import { CardSlot } from "../../types/cardSlot";
import styles from "../../styles/CardGrid.module.scss";

type CardEntry = {
  id: string | null;
  name?: string | null;
  slot?: CardSlot | null;
  suit?: string | null;
  category?: string | null;
  description?: string | null;
  effect?: string | null;
};

type CardGridProps = {
  cards: CardEntry[];
  slot: CardSlot;
  onRemoveCard: (cardId: string) => void;
  title?: string;
};

const SUIT_GLYPH: Record<string, string> = {
  Copas: "♥",
  Ouro: "♦",
  Paus: "♣",
  Espadas: "♠"
};

export function CardGrid({ cards, slot, onRemoveCard, title = "Assinatura" }: CardGridProps) {
  const visibleCards = cards.filter((card) => card.slot === slot);

  return (
    <div className={styles.assinatura} data-card-slot={slot}>
      <p className={styles.label}>{title}</p>
      {visibleCards.length === 0 ? (
        <p className={styles.empty}>Arraste uma carta aqui</p>
      ) : (
        visibleCards.map((card, index) => {
          const cardId = card.id ?? "";
          const itemKey = cardId || `card-${index}`;
          const glyph = SUIT_GLYPH[card.suit ?? ""] ?? "•";

          return (
            <div key={itemKey} className={styles.item} data-suit={card.suit ?? ""}>
              <span className={styles.mark} aria-hidden="true">
                {glyph}
              </span>
              <div className={styles.body}>
                <strong>{card.name ?? "Carta sem nome"}</strong>
                <small>
                  {card.suit ?? ""} · {card.category ?? ""}
                </small>
                {card.effect ? <p>{card.effect}</p> : null}
              </div>
              <button
                type="button"
                className={styles.remove}
                onClick={() => {
                  if (cardId) onRemoveCard(cardId);
                }}
                aria-label={`Excluir carta ${card.name ?? "carta"}`}
              >
                ×
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}
