import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { WaitlistModule } from './waitlist/waitlist.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    // http logger
    LoggerModule.forRoot({
      pinoHttp: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        customProps: (req, res) => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    ConfigModule.forRoot(),
    WaitlistModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: +configService.get('REDIS_PORT'),
          password: configService.get('REDIS_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'easepay.auth.db',
      autoLoadEntities: true,
    }),
    // ProfileModule,
    // TeamsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
