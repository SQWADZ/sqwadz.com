import { Server as NetServer } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { Server } from 'socket.io';
import { Socket } from 'net';
import { worker } from '@/lib/bullmq';

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
  if (!res.socket.server.io) {
    const path = '/api/socket/io';
    const io = new Server(res.socket.server, {
      path,
      addTrailingSlash: false,
    });
    res.socket.server.io = io;

    worker.on('completed', (job) => {
      console.log(`completed - ${job.data.roomId}`);
      io.emit(`${job.data.roomId}:room-delete`);
    });
  }

  res.end();
};

export default ioHandler;
