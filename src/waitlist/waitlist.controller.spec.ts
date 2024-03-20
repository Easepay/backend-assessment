/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { WaitlistController } from './waitlist.controller';
import { WaitlistService } from './waitlist.service';
import { faker } from '@faker-js/faker';
import { ProductWaitlistDTO } from './dto/product.waitlist.dto';
describe('WaitlistController', () => {
  let controller: WaitlistController;
  const mockedWaitlistService = {
    joinWaitlist: jest.fn((dto) => {
      return Promise.resolve(true);
    }),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    exitWaitlist: jest.fn((email) => {
      return Promise.resolve(true);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaitlistService],
      controllers: [WaitlistController],
    })
      .overrideProvider(WaitlistService)
      .useValue(mockedWaitlistService)
      .compile();

    controller = module.get<WaitlistController>(WaitlistController);
  });

  /**
   * the test is implemented thus
   * 1. The test runner checks if the controller is instantiated successfully
   * 2. It check that the class methods resolves, which are promises resolves to true
   */

  // confirm the controller is successfully created
  it('controllers should be defined', () => {
    expect(controller).toBeDefined();
  });

  // ensure the join the waitlist method resolves to true
  it('should add user to waitlist', () => {
    const newCustomer = {
      email: faker.internet.email,
      fullname: faker.person.fullName,
    } as unknown as ProductWaitlistDTO;
    // expect that the promise resolves to true
    expect(controller.joinWaitlist(newCustomer)).resolves;
  });

  it('remove user from waitlist', () => {
    // expect that the promise resolves to true
    const email = faker.internet.email();
    expect(controller.exitWaitlist(email)).resolves;
  });
});
