import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import assert from 'node:assert';

describe('AppController', () => {
  let appController: AppController;
  const mockedAppService = {};
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    })
      .overrideProvider(AppService)
      .useValue(mockedAppService)
      .compile();

    appController = app.get<AppController>(AppController);
  });

  describe('HTTP service health check', () => {
    it('should return service active"', () => {
      assert.deepStrictEqual(appController.restHealthCheck(), {
        status: 'Service active!',
      });
    });
  });

  describe('gRPC Health Check', () => {
    it('should return service active', () => {
      assert.deepStrictEqual(appController.grpcHealthCheck(), {
        status: 'Service active!',
      });
    });
  });
});
