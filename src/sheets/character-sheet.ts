import React from "react";
import { createRoot, type Root } from "react-dom/client";
import { CharacterSheetApp } from "./components/CharacterSheetApp";
import { CardSlot } from "../types/cardSlot";


export class CharacterSheet extends foundry.applications.sheets.ActorSheetV2 {
  static DEFAULT_OPTIONS = {
    classes: ["ecos-de-alice", "sheet", "actor"],
    position: { width: 700, height: 520 }
  };

  #root: Root | null = null;

  override async _renderHTML(
    ...args: Parameters<foundry.applications.sheets.ActorSheetV2["_renderHTML"]>
  ) {
    return args[0];
  }

  override _replaceHTML(
    ...args: Parameters<foundry.applications.sheets.ActorSheetV2["_replaceHTML"]>
  ) {
    const content = args[1];
    if (!this.#root) this.#root = createRoot(content);
    this.#root.render(React.createElement(CharacterSheetApp, { actor: this.document }));
  }

  override async close(...args: Parameters<foundry.applications.sheets.ActorSheetV2["close"]>) {
    this.#root?.unmount();
    this.#root = null;
    return super.close(...args);
  }

  //darg-and-drop das cartas para os slots
  override async _onDrop(event: DragEvent) {
    const data = (TextEditor as any).getDragEventData(event) as { type?: string; uuid?: string } | null;

    if (!data || data.type !== "Item") {
      return;
    }

    const item = await fromUuid(data.uuid ?? "");
    const itemAny = item as any;

    if (!itemAny || itemAny.type !== "carta") {
      return;
    }

    const target = event.target as HTMLElement | null;
    const slotElement = target?.closest("[data-card-slot]");
    const slot = (slotElement?.getAttribute("data-card-slot") as CardSlot | null) ?? "forma";

    const currentCards = ((this.actor.system.cards ?? []) as any[]);

    const alreadyAdded = currentCards.some(
      (card: any) => card.uuid === itemAny.uuid && card.slot === slot
    );

    if (alreadyAdded) {
      return;
    }

    const newCard = {
      id: foundry.utils.randomID(),
      uuid: itemAny.uuid,
      name: itemAny.name,
      suit: itemAny.system?.suit,
      category: itemAny.system?.category,
      slot,
      description: itemAny.system?.description,
      effect: itemAny.system?.effect,
      notes: itemAny.system?.notes ?? ""
    };

    await this.actor.update({
      system: {
        cards: [...currentCards, newCard]
      }
    });
  }
}
