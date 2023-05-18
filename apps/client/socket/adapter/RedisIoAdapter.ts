import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

// const pubClient = createClient({
//   password: 'FSDoAC2uZGWhMrCSjK2JpASCG2mwi8GP',
//   socket: {
//       host: 'redis-13344.c54.ap-northeast-1-2.ec2.cloud.redislabs.com',
//       port: 13344
//   }
// }); // new RedisClient({ host: 'rediss://red-chio73jhp8ufsbk7e890:ieO2tccrLHvn0seTKL3HrLpcot5n1fu9@singapore-redis.render.com', port: 6379 });
// const subClient = pubClient.duplicate();
// const redisAdapter = createAdapter( pubClient, subClient );

// export class RedisIoAdapter extends IoAdapter {
//   createIOServer(port: number, options?: ServerOptions): any {
//     const server = super.createIOServer(port, options);
//     server.adapter(redisAdapter);
//     return server;
//   }
// }

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  async connectToRedis(): Promise<void> {
    const pubClient = createClient({
        password: 'FSDoAC2uZGWhMrCSjK2JpASCG2mwi8GP',
        socket: {
            host: 'redis-13344.c54.ap-northeast-1-2.ec2.cloud.redislabs.com',
            port: 13344
        }
      });
    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]);

    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);
    return server;
  }
}
