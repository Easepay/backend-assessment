import { Test, TestingModule } from '@nestjs/testing';
import { WaitlistService } from './waitlist.service';
import { ProductWaitlist } from '../entities/product.waitlist.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { ResponseStatus } from '../common';

describe('WaitlistService', () => {
  let service: WaitlistService;
  const userOnWaitList = {
    message: 'user successfully added to wait list',
    status: ResponseStatus.SUCCESS,

    data: {},
  };
  const userExitWaitlist = {
    message: 'user successfully removed from wait list',
    status: ResponseStatus.SUCCESS,
    data: {},
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WaitlistService,
        {
          provide: getRepositoryToken(ProductWaitlist),
          useValue: {
            joinWaitlist: jest.fn().mockResolvedValue(userOnWaitList),
            exitWaitlist: jest.fn().mockResolvedValue(userExitWaitlist),
          },
        },
      ],
      imports: [
        BullModule.registerQueueAsync({
          name: process.env.AUTH_EMAIL_QUEUE_NAME,
        }),
      ],
    }).compile();

    service = module.get<WaitlistService>(WaitlistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
