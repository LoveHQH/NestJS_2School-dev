import { IoAdapter } from '@nestjs/platform-socket.io';
import { createClient } from 'redis';
import { ServerOptions } from 'socket.io';
import { createAdapter } from 'socket.io-redis';

const pubClient = createClient({
  password: 'FSDoAC2uZGWhMrCSjK2JpASCG2mwi8GP',
  socket: {
      host: 'redis-13344.c54.ap-northeast-1-2.ec2.cloud.redislabs.com',
      port: 13344
  }
}); //new RedisClient({ host: 'localhost', port: 6379 });
const subClient = pubClient.duplicate();
const redisAdapter = createAdapter({ pubClient, subClient });

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(redisAdapter);
    return server;
  }
}
