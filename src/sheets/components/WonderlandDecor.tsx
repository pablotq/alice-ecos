import React from "react";
import styles from "../../styles/CharacterSheetApp.module.scss";

export function WonderlandDecor() {
  return (
    <div className={styles.decor} aria-hidden="true">
      <svg className={`${styles.doodle} ${styles.doodleClock}`} viewBox="0 0 120 140">
        <path d="M40 18 C28 4 18 8 18 22 C18 32 28 34 36 28" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M80 18 C92 4 102 8 102 22 C102 32 92 34 84 28" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="60" cy="78" r="38" fill="none" stroke="currentColor" strokeWidth="4" />
        <circle cx="60" cy="78" r="32" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <path d="M60 78 L60 52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M60 78 L82 86" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="60" cy="78" r="4" fill="currentColor" />
      </svg>

      <svg className={`${styles.doodle} ${styles.doodleCup}`} viewBox="0 0 140 120">
        <path d="M28 48 C28 88 48 104 70 104 C92 104 112 88 112 48 Z" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <path d="M32 48 H108" stroke="currentColor" strokeWidth="3" />
        <path d="M112 58 C132 58 132 88 108 88" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M48 28 C52 12 62 18 58 32" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M68 22 C74 6 86 12 78 30" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M88 28 C94 14 104 18 98 34" fill="none" stroke="currentColor" strokeWidth="2.5" />
      </svg>

      <svg className={`${styles.doodle} ${styles.doodleHat}`} viewBox="0 0 140 90">
        <ellipse cx="70" cy="70" rx="58" ry="12" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M42 68 C42 28 98 28 98 68" fill="none" stroke="currentColor" strokeWidth="3.5" />
        <path d="M40 40 H100" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      </svg>

      <svg className={`${styles.doodle} ${styles.doodleGrin}`} viewBox="0 0 220 90">
        <path d="M12 28 C52 78 168 78 208 28" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <path d="M36 40 L36 62 M60 48 L60 72 M86 52 L86 76 M110 54 L110 78 M134 52 L134 76 M160 46 L160 70 M184 38 L184 60" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>

      <svg className={`${styles.doodle} ${styles.doodleBeast}`} viewBox="0 0 180 200">
        <path
          d="M160 20 C150 70 168 110 140 150 C120 178 70 190 30 170 C70 160 90 140 86 110 C60 130 28 120 18 90 C48 104 78 86 90 60 C78 40 88 18 120 22 C128 8 150 6 160 20 Z"
          fill="currentColor"
        />
      </svg>

      <svg className={`${styles.doodle} ${styles.doodlePotions}`} viewBox="0 0 160 120">
        <path d="M18 40 H42 V52 C58 64 58 92 30 104 C2 92 2 64 18 52 Z" fill="currentColor" opacity="0.85" />
        <rect x="24" y="28" width="12" height="14" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M70 36 H98 V50 C118 64 114 96 84 110 C54 96 50 64 70 50 Z" fill="currentColor" opacity="0.7" />
        <rect x="78" y="22" width="12" height="16" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M118 48 H140 V58 C152 70 150 94 128 104 C106 94 104 70 118 58 Z" fill="currentColor" opacity="0.8" />
      </svg>

      <svg className={`${styles.doodle} ${styles.doodleGears}`} viewBox="0 0 140 140">
        <circle cx="48" cy="86" r="22" fill="none" stroke="currentColor" strokeWidth="8" />
        <circle cx="96" cy="48" r="16" fill="none" stroke="currentColor" strokeWidth="7" />
      </svg>

      <svg className={`${styles.doodle} ${styles.doodleKey}`} viewBox="0 0 90 40">
        <circle cx="16" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M26 20 H82 M70 20 V30 M82 20 V28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>

      <svg className={`${styles.doodle} ${styles.doodleCrystal}`} viewBox="0 0 80 90">
        <path d="M40 6 L70 34 L40 84 L10 34 Z" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M40 6 L40 84 M10 34 H70" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      </svg>

      <svg className={`${styles.doodle} ${styles.doodleDice}`} viewBox="0 0 70 70">
        <rect x="8" y="12" width="48" height="48" rx="8" transform="rotate(-12 32 36)" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="24" cy="28" r="3.5" fill="currentColor" />
        <circle cx="40" cy="44" r="3.5" fill="currentColor" />
        <circle cx="32" cy="36" r="3.5" fill="currentColor" />
      </svg>

      <svg className={`${styles.doodle} ${styles.doodleMushroom}`} viewBox="0 0 80 80">
        <path d="M12 36 C12 16 68 16 68 36 C50 30 30 30 12 36 Z" fill="currentColor" />
        <path d="M32 36 V64 H48 V36" fill="none" stroke="currentColor" strokeWidth="4" />
      </svg>
    </div>
  );
}
