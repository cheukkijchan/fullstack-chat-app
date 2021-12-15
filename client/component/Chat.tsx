import React from 'react';
import { ChatMessageType } from '../types';

interface chatProps {
  chatMessage: ChatMessageType;
}

export const Chat: React.FC<chatProps> = ({ chatMessage }) => {
  const { username, text, time } = chatMessage;

  return (
    <div>
      <div>{username}:</div>
      <div>{text}</div>
      <div>{time}</div>
    </div>
  );
};
