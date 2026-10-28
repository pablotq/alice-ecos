import { CardData } from "./data/card-data";
import { CharacterData } from "./data/character-data";
import { ItemData } from "./data/item-data";
import { CharacterSheet } from "./sheets/character-sheet";
import { ItemSheet } from "./sheets/item-sheet";

Hooks.once("init", () => {
  CONFIG.Actor.dataModels.character = CharacterData;
  CONFIG.Item.dataModels.item = ItemData;
  CONFIG.Item.dataModels.carta = CardData;

  foundry.applications.apps.DocumentSheetConfig.registerSheet(
    Actor,
    "ecos-de-alice",
    CharacterSheet,
    {
      types: ["character"],
      makeDefault: true
    }
  );
  foundry.applications.apps.DocumentSheetConfig.registerSheet(
    Item,
    "ecos-de-alice",
    ItemSheet,
    {
      types: ["item", "carta"],
      makeDefault: false
    }
  );
});
