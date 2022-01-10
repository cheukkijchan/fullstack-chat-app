import React, { useContext, useState } from 'react';
import { UserContext } from '../context/user';
import useSocket from '../hooks/useSocket';
import { stringToColor } from '../utils/stringToColor';

interface RoomUserProps {}

interface User {
  id: string;
  username: string;
  room: string;
}

export const RoomUser: React.FC<RoomUserProps> = ({}) => {
  const { state } = useContext(UserContext);
  const [users, setUsers] = useState<User[]>([]);

  // get Room users
  useSocket('roomUsers', ({ room, users }) => {
    if (state.room === room) {
      setUsers(users);
    }
  });

  return (
    <div className='min-w-fit bg-custom-gray rounded-md p-2 overflow-auto text-right text-gray-200'>
      <h1 className='text-slate-400 font-bold'>Users in Room </h1>
      {users.map((user) => {
        const color = stringToColor(user.username);
        return (
          <div
            className='hover:text-slate-300'
            style={{ color: color }}
            key={user.id}
          >
            {user.username}
          </div>
        );
      })}
    </div>
  );
};
