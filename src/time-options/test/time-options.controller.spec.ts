import { Test, TestingModule } from '@nestjs/testing';
import { CreateTimeOptionDTO } from '../dto/create-time-options.dto';
import { UpdateTimeOptionDTO } from '../dto/update-time-options.dto';
import { TimeOptionsController } from '../time-options.controller';
import { TimeOptionsService } from '../time-options.service';

describe('TimeOptionsController', () => {
  let controller: TimeOptionsController;

  const mockTimeOptionsService = {
    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),

    update: jest.fn((id, dto) => {
      return dtoUpdate;
    }),

    delete: jest.fn((id) => {
      return {
        id,
      };
    }),

    getAll: jest.fn(() => {
      return arrTimeOptions;
    }),

    get: jest.fn((id) => {
      return {
        id: id,
        ...timeOptions,
      };
    }),
  };

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

  const dto = {
    day: 20,
    time: new Date(),
  } as CreateTimeOptionDTO;

  const arrTimeOptions = [
    {
      id: 3,
      day: 20,
      time: new Date(),
      createdAt: '2022-02-23T00:31:34.000Z',
      updatedAt: '2022-02-23T00:31:34.000Z',
    },
  ];

  const timeOptions = {
    day: 20,
    time: new Date(),
    createdAt: '2022-02-23T00:31:34.000Z',
    updatedAt: '2022-02-23T00:31:34.000Z',
  };

  const dtoUpdate = {
    id: 2,
    day: 20,
    time: new Date(),
  } as UpdateTimeOptionDTO;

  // Create
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create TimeOption', async () => {
    expect(await controller.create(dto)).toEqual({
      id: expect.any(Number),
      ...dto,
    });
  });

  it('should create in TimeOption', () => {
    expect(mockTimeOptionsService.create).toHaveBeenCalled();
    expect(mockTimeOptionsService.create).toHaveBeenCalledWith({ ...dto });
  });

  // UPDATE
  const id = 2;

  it('should be updated', async () => {
    expect(await controller.update(id, dto)).toEqual(dtoUpdate);
  });

  it('should updated in the mockTimeOptionsService', () => {
    expect(mockTimeOptionsService.update).toHaveBeenCalled();
    expect(mockTimeOptionsService.update).toHaveBeenCalledWith(dtoUpdate);
  });

  // Delete
  it('should delete TimeOption', async () => {
    expect(await controller.delete(id)).toEqual({
      id,
    });
  });

  it('should delete TimeOption', () => {
    expect(mockTimeOptionsService.delete).toHaveBeenCalled();
    expect(mockTimeOptionsService.delete).toHaveBeenCalledWith(id);
  });

  // GET ALL
  it('should GET all TimeOption', async () => {
    expect(await controller.getAll()).toEqual(arrTimeOptions);
  });

  it('should GET all TimeOption', () => {
    expect(mockTimeOptionsService.getAll).toHaveBeenCalled();
  });

  // Get
  it('should GET TimeOption', async () => {
    expect(await controller.getById(id)).toEqual({
      id,
      ...timeOptions,
    });
  });

  it('should get TimeOption', () => {
    expect(mockTimeOptionsService.get).toHaveBeenCalled();
    expect(mockTimeOptionsService.get).toHaveBeenCalledWith(id);
  });
});
