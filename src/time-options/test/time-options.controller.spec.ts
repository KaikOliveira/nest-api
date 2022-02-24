import { Test, TestingModule } from '@nestjs/testing';
import { TimeOptionsController } from '../time-options.controller';
import { TimeOptionsService } from '../time-options.service';

describe('TimeOptionsController', () => {
  let controller: TimeOptionsController;

  const mockTimeOptionsService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeOptionsController],
      providers: [TimeOptionsService],
    })
      .overrideProvider(TimeOptionsService)
      .useValue(mockTimeOptionsService)
      .compile();

    controller = module.get<TimeOptionsController>(TimeOptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
