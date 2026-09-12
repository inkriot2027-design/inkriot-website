'use client';

import { CREATIVE_WORLDS } from '@/data/services';
import { ICONS } from '@/components/ui/icons';
import { Reveal } from '@/components/ui/primitives';
import styles from './CreativeWorlds.module.css';

export default function CreativeWorlds() {
  return (
    <div className={styles.worlds}>
      {CREATIVE_WORLDS.map((w, i) => {
        const Icon = ICONS[w.icon] || ICONS.design;
        return (
          <Reveal key={w.key} delay={i * 60}>
            <article className={styles.world} style={{ '--wc': w.color }}>
              <div className={styles.top}>
                <span className={styles.no}>{w.no}</span>
                <span className={styles.icon}><Icon /></span>
              </div>
              <h3 className={styles.title}>{w.title}</h3>
              <ul className={styles.items}>
                {w.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
