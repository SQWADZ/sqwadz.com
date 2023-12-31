import { Server as NetServer } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { Server } from 'socket.io';
import { Socket } from 'net';
import { Message, RoomMember } from '@/types';

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

type Member = RoomMember & { socketId: string };

const roomMembers: Record<string, Member[]> = {};

const filterRoomMembers = (io: Server, socketId: string) => {
  Object.keys(roomMembers).forEach((roomId) => {
    let length = roomMembers[roomId].length;
    roomMembers[roomId] = roomMembers[roomId].filter((member) => member.socketId !== socketId);

    if (roomMembers[roomId].length !== length) {
      io.to(roomId).emit('members_changed', roomMembers[roomId]);
      return;
    }
  });
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
      socket.on('join_room', (roomId: string, member: RoomMember) => {
        socket.join(roomId);

        if (!roomMembers[roomId]) roomMembers[roomId] = [];
        if (!roomMembers[roomId].find((member) => member.socketId === socket.id))
          roomMembers[roomId].push({ ...member, socketId: socket.id });

        io.to(roomId).emit('members_changed', roomMembers[roomId]);
        console.log(`user with id-${socket.id} joined room - ${roomId}`);
      });

      socket.on('leave_room', (roomId) => {
        socket.leave(roomId);
        filterRoomMembers(io, socket.id);
        console.log(`user with id-${socket.id} left the room - ${roomId}`);
      });

      socket.on('send_message', (roomId: string, message: Message) => {
        console.log(`Message ${message.contents} sent in ${roomId}`);
        if (message.contents === '') return;

        io.to(roomId).emit('receive_message', message);
      });

      socket.on('disconnect', () => {
        filterRoomMembers(io, socket.id);
      });
    });
  }

  res.end();
};

export default ioHandler;
