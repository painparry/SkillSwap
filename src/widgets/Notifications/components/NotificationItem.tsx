import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';
import { markNotificationAsRead } from '@/entities/request/model/requestsSlice';
import { LampIcon } from '././LampIcon';
import styles from './NotificationItem.module.css';

interface NotificationItemProps {
  notification: {
    id: string;
    message: string;
    isRead: boolean;
    createdAt: string;
  };
  type?: 'new' | 'read';
}

export function NotificationItem({ notification, type = 'new' }: NotificationItemProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAction = () => {
    dispatch(markNotificationAsRead(notification.id));
    navigate('/exchanges');
  };

  const timeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 24) return 'сегодня';
    if (hours < 48) return 'вчера';
    return `${Math.floor(hours / 24)} дня назад`;
  };

  return (
    <div className={styles.item}>
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <LampIcon />
        </div>
        <div className={styles.textWrapper}>
          <p className={styles.message}>{notification.message}</p>
          <span className={styles.time}>{timeAgo(notification.createdAt)}</span>
        </div>
      </div>

      {type === 'new' && (
        <button className={styles.actionButton} onClick={handleAction}>
          Перейти
        </button>
      )}

      {type === 'read' && (
        <span className={styles.readTime}>{timeAgo(notification.createdAt)}</span>
      )}
    </div>
  );
}