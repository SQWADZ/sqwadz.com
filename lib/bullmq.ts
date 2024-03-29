import redis from '@/lib/redis';
import { Queue, Worker, Job } from 'bullmq';
import prisma from '@/lib/prisma';
import { NextApiResponseServerIo } from '@/pages/api/socket/io';

export const roomRemovalQueue = new Queue('roomRemovalQueue', {
  connection: redis,
});

export const worker = new Worker(
  'roomRemovalQueue',
  async (job: Job<{ roomId: number }>) => {
    console.log(`job - ${job.data.roomId}`);

    try {
      await redis.del(`roomId:${job.data.roomId}:messages`);

      await prisma.room.delete({
        where: {
          id: job.data.roomId,
        },
      });
    } catch (e) {
      console.log(e);
    }

    return;
  },
  {
    connection: redis,
  }
);
