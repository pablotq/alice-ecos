import type { CharacterData } from "../data/character-data";
import type { ItemData } from "../data/item-data";

declare module "fvtt-types/configuration" {
  interface DataModelConfig {
    Actor: { character: typeof CharacterData };
    Item: { item: typeof ItemData };
  }
}
