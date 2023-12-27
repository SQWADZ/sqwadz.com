import { Server as NetServer } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { Server } from 'socket.io';
import { Socket } from 'net';
import { Message } from '@/types';

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: Server;
    };
  };
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  console.log(res.socket.server.io);
  if (!res.socket.server.io) {
    const path = '/api/socket/io';
    const io = new Server(res.socket.server, {
      path,
      addTrailingSlash: false,
    });
    res.socket.server.io = io;
    io.on('connection', (socket) => {
      console.log(`connected - ${socket.id}`);
      socket.on('join_room', (roomId) => {
        socket.join(roomId);
        console.log(`user with id-${socket.id} joined room - ${roomId}`);
      });

      socket.on('leave_room', (roomId) => {
        socket.leave(roomId);
        console.log(`user with id-${socket.id} left the room - ${roomId}`);
      });

      socket.on('send_message', (roomId: string, message: Message) => {
        console.log(`Message ${message.contents} sent in ${roomId}`);
        if (message.contents === '') return;

        io.to(roomId).emit('receive_message', message);
      });
    });
  }

  res.end();
};

export default ioHandler;
