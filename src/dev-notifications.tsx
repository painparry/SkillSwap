import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import { Notifications } from '@/widgets/Notifications';
import { addRequest } from '@/entities/request/model/requestsSlice';
import type { RequestStatus } from '@/shared/types';

const testNotifications = [
  {
    id: 'notif-1',
    skillId: 'skill-1',
    fromUserId: 'user-1',
    toUserId: 'user-2',
    fromUserName: 'Николай',
    toUserName: 'Анна',
    skillTitle: 'React разработка',
    status: 'pending' as RequestStatus, 
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'notif-2',
    skillId: 'skill-2',
    fromUserId: 'user-3',
    toUserId: 'user-1',
    fromUserName: 'Татьяна',
    toUserName: 'Анна',
    skillTitle: 'Дизайн',
    status: 'pending' as RequestStatus, 
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 'notif-3',
    skillId: 'skill-3',
    fromUserId: 'user-2',
    toUserId: 'user-1',
    fromUserName: 'Сергей',
    toUserName: 'Анна',
    skillTitle: 'Python',
    status: 'rejected' as RequestStatus, 
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
];


testNotifications.forEach((n) => {
  store.dispatch(addRequest(n));
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: '#f0f0f0',
          padding: '40px',
        }}>
          <Notifications />
        </div>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);