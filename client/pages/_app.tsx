import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserContext } from '../context/user';
import { useState } from 'react';
import { socket, SocketContext } from '../context/socket';

function MyApp({ Component, pageProps }: AppProps) {
  const [username, setUsername] = useState<string>('');
  const [room, setRoom] = useState<string>('General');

  return (
    <UserContext.Provider
      value={{
        state: {
          username,
          room,
        },
        setUsername,

        setRoom,
      }}
    >
      <SocketContext.Provider value={socket}>
        <Component {...pageProps} />
      </SocketContext.Provider>
    </UserContext.Provider>
  );
}

export default MyApp;
