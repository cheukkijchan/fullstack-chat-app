import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/user';
import { SocketContext } from '../context/socket';
import { ChatMessages } from '../component/chatMessage';
import { Navbar } from '../component/Navbar';
import { RoomUser } from '../component/RoomUser';

// const socket = io('http://localhost:4000/', { transports: ['websocket'] });
const Chatroom: React.FC = () => {
  const { state } = useContext(UserContext);
  const socket = useContext(SocketContext);
  const [message, setMessage] = useState<string>('');

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

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('chatMessage', { message, username: state.username });
  };

  const messageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      <Navbar />
      <RoomUser />
      <ChatMessages />
      <div>
        <form onSubmit={(e) => submitHandler(e)}>
          <input
            type='text'
            placeholder='Message'
            onChange={(e) => messageHandler(e)}
          />
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chatroom;
