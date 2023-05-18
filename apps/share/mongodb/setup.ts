import { ConfigModule } from '../configService.module';
import { ConfigService } from '../services/config.service';

export function setupMongoDb(mongoUri: string) {
  return {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      uri: "mongodb+srv://voiconit19:QYJgTHoRB9Af5BPI@2school.nbk4x6u.mongodb.net/?retryWrites=true&w=majority",
      useUnifiedTopology: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true,
    }),
  };
}
