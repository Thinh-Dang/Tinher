import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { io, Socket } from 'socket.io-client';
import { useEffect, useState, useCallback, useRef } from 'react';

import { RootState, useAppSelector } from '@/redux';

import { ChatContent } from '@/containers';
import chatApi from '../../services/chat.api';

const ChatContentPage: NextPage = () => {
  const router = useRouter();
  const socketRef = useRef<Socket>();

  const { friendId } = router.query;
  const url = process.env.NEXT_PUBLIC_SOCKET_URL ?? '';
  const userId = useAppSelector(
    (state: RootState) => state.userSlice.inforUser.id,
  );

  const [conversationId, setConversationId] = useState<string>('');
  const [infoFriend, setInfoFriend] = useState<IUserFriend>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [contentChat, setContentChat] = useState<string>('');

  // Init Socket
  useEffect(() => {
    socketRef.current = io(url, {
      query: {
        userId,
        friendId,
      },
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  // Received Message
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on('message-received', (data: IMessage) => {
        setMessages([data, ...messages]);
      });
    }
  }, [messages]);

  // Handle Click Chat
  const handleClick = (e: any) => {
    e.preventDefault();

    if (contentChat && socketRef.current) {
      const messageRequest: IMessageSend = {
        socketId: socketRef.current.id,
        senderId: userId,
        conversationId: conversationId,
        content: contentChat,
      };

      setContentChat('');
      socketRef.current.emit('send-message', messageRequest);
    }
  };

  // Get List Conversation
  const getConversation = useCallback(() => {
    if (friendId) {
      chatApi.getFriendByUserIdAndFriendId(friendId as string).then((data) => {
        if (data.status) {
          setInfoFriend({ ...{}, ...data.data });
        } else {
          router.push('/chat');
        }
      });

      chatApi
        .getConversationsByUserIdAndFriendId(friendId as string)
        .then((data) => {
          if (data.status) {
            setConversationId(data.data.id);
            setMessages([...[], ...data.data.messages]);
          }
        });
    }
  }, [friendId, router]);

  useEffect(() => {
    getConversation();
  }, [getConversation]);

  useEffect(() => {
    if (conversationId && socketRef.current) {
      const socketDevice: ISocketDevice = {
        conversationId: conversationId,
        socketId: socketRef.current.id,
        userId: userId,
      };

      socketRef.current.emit('create-socket-device', socketDevice);
    }
  }, [conversationId, userId]);

  return infoFriend ? (
    <ChatContent
      infoFriend={infoFriend}
      messages={messages}
      contentChat={contentChat}
      setContentChat={setContentChat}
      handleClick={handleClick}
      userId={userId}
    />
  ) : (
    <></>
  );
};

export default ChatContentPage;
