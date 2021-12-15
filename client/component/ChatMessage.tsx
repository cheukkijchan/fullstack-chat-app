import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/user';
import useSocket from '../hooks/useSocket';

import { ChatMessageType } from '../types';
import { Chat } from './chat';

export const ChatMessages: React.FC = () => {
  // const [selfMessage, setSelfMessage] = useState<boolean>(false);
  const [chatLog, setChatLog] = useState<ChatMessageType[]>([]);
  const { state } = useContext(UserContext);

  // use Custom hook to turn socket on and off
  useSocket('message', (data: ChatMessageType) => {
    console.log(data);
    if (data.username !== '') {
      setChatLog([...chatLog, data]);
    }
  });

  return (
    <div>
      <div>{state.room}</div>
      {chatLog.map((message, messageId) => (
        <Chat key={messageId} chatMessage={message} />
      ))}
    </div>
  );
};
