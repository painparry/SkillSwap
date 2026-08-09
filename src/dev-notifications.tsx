import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import { Notifications } from '@/widgets/Notifications';
import { addRequest, acceptRequest } from '@/entities/request/model/requestsSlice';
import { setUser } from '@/features/auth/model/authSlice';
import type { RequestStatus } from '@/shared/types';


const mockUser = {
  id: 'user-1',
  name: 'Анна Иванова',
  email: 'anna@example.com',
  token: 'mock_token_123',
  avatarUrl: null,
};
store.dispatch(setUser(mockUser));


const myRequest = {
  id: 'req-1',
  skillId: 'skill-1',
  fromUserId: 'user-1',   
  toUserId: 'user-2',     
  fromUserName: 'Анна',
  toUserName: 'Дима',
  skillTitle: 'React',
  status: 'pending' as RequestStatus,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const myRequest2 = {
  id: 'req-2',
  skillId: 'skill-1',
  fromUserId: 'user-1',   
  toUserId: 'user-3',     
  fromUserName: 'Анна',
  toUserName: 'Cаша',
  skillTitle: 'React',
  status: 'pending' as RequestStatus,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};


const myRequest3 = {
  id: 'req-3',
  skillId: 'skill-1',
  fromUserId: 'user-3',   
  toUserId: 'user-1',     
  fromUserName: 'Михаил',
  toUserName: 'Анна',
  skillTitle: 'React',
  status: 'pending' as RequestStatus,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const myRequest4 = {
  id: 'req-4',
  skillId: 'skill-1',
  fromUserId: 'user-4',   
  toUserId: 'user-1',     
  fromUserName: 'Иннокентий',
  toUserName: 'Анна',
  skillTitle: 'React',
  status: 'pending' as RequestStatus,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

store.dispatch(addRequest(myRequest4));
store.dispatch(addRequest(myRequest3));
store.dispatch(addRequest(myRequest));
store.dispatch(addRequest(myRequest2));

store.dispatch(acceptRequest('req-1'));
store.dispatch(acceptRequest('req-2'));
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