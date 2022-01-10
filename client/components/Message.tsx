import React from 'react';
import { ChatMessageType } from '../types';
import { stringToColor } from '../utils/stringToColor';

interface messageProps {
  chatMessage: ChatMessageType;
}

export const Message: React.FC<messageProps> = ({ chatMessage }) => {
  const { username, text, time } = chatMessage;

  const color = stringToColor(username);

  return (
    <div className='ml-3 m-1 text-gray-100 p-3 rounded-xl hover:bg-custom-gray hover:shadow-lg'>
      <div className='flex items-baseline'>
        <div className='text-slate-900 text-lg' style={{ color: color }}>
          {username}
        </div>
        <div className='pl-2 text-sm text-opacity-80 font-bold text-gray-400 hover:text-opacity-100'>
          {time}
        </div>
      </div>
      <p className='text-white break-words max-w-fit'>{text}</p>
    </div>
  );
};

export const MemoizedMessage = React.memo(Message);
