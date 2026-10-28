import React from "react";
import styles from "./ItemSheetApp.module.scss";
import { localize } from "../../i18n";

export function ItemSheetApp({ item }: { item: Item.Implementation }) {
  const isCarta = item.type === "carta";
  const system = item.system as {
    quantity?: number;
    description?: string;
    suit?: string;
    category?: string;
    slot?: string;
    effect?: string;
    notes?: string;
  };

  const updateQuantity = (value: number) => {
    item.update({ system: { quantity: value } });
  };

  const updateField = (key: string, value: string | number) => {
    item.update({ system: { [key]: value } });
  };

  return (
    <div className={styles.sheet}>
      <h1>{item.name}</h1>

      {isCarta ? (
        <>
          <label className={styles.label}>
            Naipe
            <select
              value={system.suit ?? "Copas"}
              onChange={(e) => updateField("suit", e.target.value)}
            >
              <option value="Copas">Copas</option>
              <option value="Ouro">Ouro</option>
              <option value="Paus">Paus</option>
              <option value="Espadas">Espadas</option>
            </select>
          </label>

          <label className={styles.label}>
            Categoria
            <select
              value={system.category ?? "Forma"}
              onChange={(e) => updateField("category", e.target.value)}
            >
              <option value="Forma">Forma</option>
              <option value="Mente">Mente</option>
              <option value="Devaneio">Devaneio</option>
              <option value="Defeito">Defeito</option>
            </select>
          </label>

          <label className={styles.label}>
            Slot
            <select
              value={system.slot ?? "forma"}
              onChange={(e) => updateField("slot", e.target.value)}
            >
              <option value="forma">Forma</option>
              <option value="mente">Mente</option>
              <option value="devaneio">Devaneio</option>
              <option value="defeito">Defeito</option>
            </select>
          </label>

          <label className={styles.label}>
            Descrição
            <textarea
              value={system.description ?? ""}
              onChange={(e) => updateField("description", e.target.value)}
            />
          </label>

          <label className={styles.label}>
            Efeito
            <textarea
              value={system.effect ?? ""}
              onChange={(e) => updateField("effect", e.target.value)}
            />
          </label>

          <label className={styles.label}>
            Observações
            <textarea
              value={system.notes ?? ""}
              onChange={(e) => updateField("notes", e.target.value)}
            />
          </label>
        </>
      ) : (
        <>
          <label className={styles.label}>
            {localize("BOILERPLATE.Item.Quantity")}
            <input
              type="number"
              min={0}
              value={system.quantity ?? 0}
              onChange={(e) => updateQuantity(Number(e.target.value))}
            />
          </label>
          <label className={styles.label}>
            {localize("BOILERPLATE.Item.Description")}
            <textarea
              value={system.description ?? ""}
              onChange={(e) => updateField("description", e.target.value)}
            />
          </label>
        </>
      )}
    </div>
  );
}
