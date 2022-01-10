import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useRef } from 'react';
import { SocketContext } from '../context/socket';
import { UserContext } from '../context/user';
import { FiActivity } from 'react-icons/fi';
import { BsFillDoorOpenFill } from 'react-icons/bs';

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
    <div className='flex items-center justify-between rounded-md p-2 mb-1'>
      <div className='flex items-center flex-shrink-0 text-white mr-6'>
        <FiActivity />
        <span className='font-bold text-xl ml-2 flex items-center'>
          Studyroom
        </span>
      </div>
      <div className='text-gray-300 w-full block flex-grow sm:flex sm:items-center sm:w-auto'>
        Welcome to #{state.room}, {state.username}
      </div>
      <button
        className='flex items-center text-sm text-white hover:bg-custom-gray p-2 rounded-xl'
        onClick={onClickHandler}
      >
        <span className='mr-1'>LeaveRoom</span>
        <BsFillDoorOpenFill />
      </button>
    </div>
  );
};
