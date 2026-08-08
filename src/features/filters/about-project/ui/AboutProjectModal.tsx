
import styles from './AboutProjectModal.module.css'

import { Modal } from '@/shared/ui/modal' 
interface TeamMember {
  name: string
}

interface AboutProjectModalProps {
  isOpen: boolean
  onClose: () => void
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
]

export const AboutProjectModal = ({ isOpen, onClose }: AboutProjectModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <h2 id="about-project-title" className={styles.title}>
            О проекте SkillSwap
          </h2>

          <p className={styles.sectionTitle}>Команда</p>

          <div className={styles.teamGrid}>
            {teamMembers.map((member) => {
              const initial = member.name.charAt(0).toUpperCase()
              return (
                <div key={member.name} className={styles.card}>
                  <div className={styles.avatarPlaceholder}>{initial}</div>
                  <div className={styles.info}>
                    <h4 className={styles.memberName}>{member.name}</h4>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Modal>
  )
}
