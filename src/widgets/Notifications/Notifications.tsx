import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  markNotificationAsRead,
  clearReadNotificationsForUser,
} from '@/entities/request/model/requestsSlice';
import { NotificationItem } from './components/NotificationItem';
import styles from './Notifications.module.css';

export function Notifications() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);
  const allNotifications = useAppSelector((state) => state.requests.notifications);

  const userId = currentUser?.id;
  const notifications = userId ? allNotifications[userId] || [] : [];

  const unread = notifications.filter((n) => !n.isRead);
  const read = notifications.filter((n) => n.isRead);

  if (!userId) {
    return (
      <div className={styles.empty}>
        <p>Пожалуйста, войдите в аккаунт</p>
      </div>
    );
  }

  const handleMarkAllAsRead = () => {
    unread.forEach((n) => {
      dispatch(markNotificationAsRead({ userId, notificationId: n.id }));
    });
  };

  const handleClearRead = () => {
    dispatch(clearReadNotificationsForUser(userId));
  };

  if (notifications.length === 0) {
    return (
      <div className={styles.empty}>
        <p>У вас нет уведомлений</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Новые уведомления</h2>
        {unread.length > 0 && (
          <button className={styles.markAllRead} onClick={handleMarkAllAsRead}>
            Прочитать все
          </button>
        )}
      </div>

      {unread.length > 0 && (
        <div className={styles.section}>
          {unread.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              type="new"
              userId={userId}
            />
          ))}
        </div>
      )}

      {read.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Просмотренные</span>
            <button className={styles.clearAll} onClick={handleClearRead}>
              Очистить
            </button>
          </div>
          {read.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              type="read"
              userId={userId}
            />
          ))}
        </div>
      )}
    </div>
  );
}