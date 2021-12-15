import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { SocketContext } from '../context/socket';
import { UserContext } from '../context/user';

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const { state, setRoom, setUsername } = useContext(UserContext);
  const socket = useContext(SocketContext);
  const router = useRouter();
  const onClickHandler = () => {
    setRoom('');
    setUsername('');
    router.push('/');
    socket.emit('leaveRoom', { username: state.username, room: state.room });
  };
  return (
    <div>
      <div>{state.room}</div>
      <div>{state.username}</div>
      <button onClick={onClickHandler}>Leave Room</button>
    </div>
  );
};
