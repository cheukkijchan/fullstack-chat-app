import React, { useContext, useEffect, useRef, useState } from 'react';
import { SocketContext } from '../context/socket';
import { UserContext } from '../context/user';
import useSocket from '../hooks/useSocket';
import { AiOutlineSend } from 'react-icons/ai';

import { ChatMessageType } from '../types';
import { Message, MemoizedMessage } from './Message';

export const ChatMessages: React.FC = () => {
  // const [selfMessage, setSelfMessage] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatLog, setChatLog] = useState<ChatMessageType[]>([]);
  const [message, setMessage] = useState<string>('');
  const socket = useContext(SocketContext);
  const { state } = useContext(UserContext);

  useEffect(() => {
    scrollToBottom();
  }, [chatLog]);

  // Scroll to bottom when new message
  const scrollToBottom = () => {
    console.log('scrolling');
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // use Custom hook to turn socket on and off
  useSocket('message', (data: ChatMessageType) => {
    console.log(data);
    if (data.username !== '') {
      setChatLog([...chatLog, data]);
    }
  });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('chatMessage', { message, username: state.username });
    setMessage('');
  };

  return (
    <div className='flex grow h-full mr-2'>
      <div className='flex flex-col w-full bg-custom-light rounded-md'>
        <div className='g-white h-full flex-grow-0 overflow-auto'>
          <div className='flex flex-col mb-2'></div>
          {chatLog.map((message, messageId) => (
            <MemoizedMessage key={messageId} chatMessage={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className='sticky top-full rounded-md p-2 bg-custom-bluegray text-white m-3'>
          <form className='flex' onSubmit={(e) => submitHandler(e)}>
            <input
              className='grow pl-2 bg-inherit text-inherit outline-none'
              type='text'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Message #${state.room}`}
              required
            />
            <button
              type='submit'
              className='flex items-center text-inherit pl-6 pr-6'
            >
              <AiOutlineSend />
              <span className='ml-1'>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
