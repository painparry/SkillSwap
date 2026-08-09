import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';
import { markNotificationAsRead } from '@/entities/request/model/requestsSlice';
import { LampIcon } from './LampIcon';
import styles from './NotificationItem.module.css';

interface NotificationItemProps {
  notification: {
    id: string;
    message: string;
    isRead: boolean;
    createdAt: string;
  };
  type?: 'new' | 'read';
  userId: string;
}

export function NotificationItem({ notification, type = 'new', userId }: NotificationItemProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAction = () => {
    dispatch(markNotificationAsRead({ userId, notificationId: notification.id }));
    navigate('/exchanges');
  };

  const timeAgo = (dateString: string) => {
  const now = new Date();
  const date = new Date(dateString);
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));

  if (hours < 24) return 'сегодня';
  if (hours < 48) return 'вчера';

  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  return `${day} ${month}`;
};

  return (
    <div className={styles.item}>
      <div className={styles.content}>
        <div className={styles.topRow}>
          <div className={styles.iconWrapper}>
            <LampIcon />
          </div>
          <div className={styles.textWrapper}>
            <p className={styles.message}>{notification.message}</p>
            <p className={styles.subMessage}>
              Перейдите в профиль, чтобы обсудить детали
            </p>
          </div>
          <span className={styles.time}>{timeAgo(notification.createdAt)}</span>
        </div>

        {type === 'new' && (
          <button className={styles.actionButton} onClick={handleAction}>
            Перейти
          </button>
        )}
      </div>
    </div>
  );
}