import React from 'react';
import styles from './AboutProjectModal.module.css';

interface TeamMember {
  name: string;
}

interface AboutProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const teamMembers: TeamMember[] = [
  { name: 'Алёна Смирнова' },
  { name: 'Vacheslav Тарасов' },
  { name: 'Кристина Березина' },
  { name: 'Анна Семенюк' },
  { name: 'Константин' },
  { name: 'Дмитрий Ф.' },
  { name: 'Sam' },
  { name: 'Тимур С' },
  { name: 'Зу' },
  { name: 'Кристина' },
  { name: 'Светлана Сметана' },
  { name: 'Андрей А.' },
  { name: 'Сергей А.' },
];


export const AboutProjectModal = ({ isOpen, onClose }: AboutProjectModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="button"
      aria-label="Закрыть модальное окно"
      tabIndex={0}
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-project-title"
      >
        <div className={styles.header}>
          <h2 id="about-project-title" className={styles.title}>
            О проекте SkillSwap
          </h2>
        </div>
        <div className={styles.content}>
          <h3 className={styles.sectionTitle}>Команда</h3>
          <div className={styles.teamGrid}>
            {teamMembers.map((member, index) => {
              const initial = member.name.charAt(0).toUpperCase();
              return (
                <div key={index} className={styles.card}>
                  <div className={styles.avatarPlaceholder}>{initial}</div>
                  <div className={styles.info}>
                    <h4 className={styles.memberName}>{member.name}</h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
