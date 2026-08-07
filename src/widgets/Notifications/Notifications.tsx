import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  markNotificationAsRead,
  clearNotifications,
} from '@/entities/request/model/requestsSlice';
import { NotificationItem } from '././components/NotificationItem';
import styles from './Notifications.module.css';

export function Notifications() {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((state) => state.requests.notifications);

 

  const unread = notifications.filter((n) => !n.isRead);
  const read = notifications.filter((n) => n.isRead);

  const handleMarkAllAsRead = () => {
    unread.forEach((n) => dispatch(markNotificationAsRead(n.id)));
  };

  const handleClearRead = () => {
    dispatch(clearNotifications());
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
            />
          ))}
        </div>
      )}
    </div>
  );
}