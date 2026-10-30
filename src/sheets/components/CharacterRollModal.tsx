import React, { useEffect, useState } from "react";
import styles from "./CharacterRollModal.module.scss";
import { AttributeKey } from "../../types/atributeKey";

type CharacterRollModalProps = {
  isOpen: boolean;
  attributeKey: AttributeKey;
  attributeLabel: string;
  onConfirm: (bonus: number, difficulty: number) => void | Promise<void>;
  onClose: () => void;
};

export function CharacterRollModal({
  isOpen,
  attributeKey,
  attributeLabel,
  onConfirm,
  onClose,
}: CharacterRollModalProps) {
  const [bonusInput, setBonusInput] = useState("0");
  const [difficultyInput, setDifficultyInput] = useState("1");

  useEffect(() => {
    if (isOpen) {
      setBonusInput("0");
      setDifficultyInput("1");
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleConfirm = async () => {
    const bonus = Number.parseInt(bonusInput, 10) || 0;
    const difficulty = Number.parseInt(difficultyInput, 10) || 1;

    await onConfirm(bonus, difficulty);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Rolar {attributeLabel}</h3>

        <label className={styles.field}>
          Bônus
          <input
            type="number"
            value={bonusInput}
            onChange={(e) => setBonusInput(e.target.value)}
          />
        </label>

        <label className={styles.field}>
          Dificuldade
          <input
            type="number"
            min={1}
            value={difficultyInput}
            onChange={(e) => setDifficultyInput(e.target.value)}
          />
        </label>

        <div className={styles.actions}>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" onClick={handleConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
