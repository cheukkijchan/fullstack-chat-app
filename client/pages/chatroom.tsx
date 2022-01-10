import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/user';
import { SocketContext } from '../context/socket';
import { ChatMessages } from '../components/ChatMessages';
import { Navbar } from '../components/Navbar';
import { RoomUser } from '../components/RoomUser';

// const socket = io('http://localhost:4000/', { transports: ['websocket'] });
const Chatroom: React.FC = () => {
  const { state } = useContext(UserContext);
  const socket = useContext(SocketContext);

  const room = state.room;
  const router = useRouter();
  // const { room } = router.query;

  // check username on client instance, not pre-rendered page
  useEffect(() => {
    if (state.username !== '') {
      setTimeout(() => {
        socket.emit('joinRoom', { username: state.username, room });
      }, 100);
    } else {
      router.push('/');
    }
  }, []);

  return (
    <div className='h-screen flex flex-col'>
      <div className='h-90v flex flex-col w-4/5 max-w-6xl mx-auto py-4 my-10 px-3 shadow-2xl shadow-gray-600 rounded-2xl bg-custom-dark'>
        <Navbar />
        <div className='flex h-90v overflow-auto'>
          <ChatMessages />
          <RoomUser />
        </div>
      </div>
    </div>
  );
};

export default Chatroom;
