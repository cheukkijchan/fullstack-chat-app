import React, { useContext, useState } from 'react';
import { UserContext } from '../context/user';
import useSocket from '../hooks/useSocket';

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
    <div>
      <p>Users in Room</p>
      {users.map((user) => {
        return <div key={user.id}>{user.username}</div>;
      })}
    </div>
  );
};
