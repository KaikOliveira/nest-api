import { Test, TestingModule } from '@nestjs/testing';
import { AddressesController } from '../addresses.controller';
import { AddressesService } from '../addresses.service';
import { CreateAddressDTO } from '../dto/create-address.dto';

// Switch Test
describe('AddressesController', () => {
  let controller: AddressesController;

  const mockAddressesService = {
    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),

    update: jest.fn((id, dto) => {
      return {
        id,
        dto,
      };
    }),

    remove: jest.fn((id) => {
      return {
        id,
      };
    }),

    getAll: jest.fn(() => {
      return arrAddress;
    }),

    get: jest.fn((id) => {
      return {
        id,
        ...address,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressesController],
      providers: [AddressesService],
    })
      .overrideProvider(AddressesService)
      .useValue(mockAddressesService)
      .compile();

    controller = module.get<AddressesController>(AddressesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  const dto = {
    personId: 1,
    street: 'Av. Paulsita',
    number: '1000',
    complement: 'b',
    district: 'Jardins',
    city: 'São Paulo',
    state: 'SP',
    country: 'Brasil',
    zipCode: '01311100',
  } as CreateAddressDTO;

  const address = {
    personId: 1,
    street: 'Av. Paulista',
    number: 500,
    complement: null,
    district: 'Bela Vista',
    city: 'São Paulo',
    state: 'SP',
    country: 'Brasil',
    zipCode: '01310100',
    createdAt: '2022-02-23T22:07:57.000Z',
    updatedAt: '2022-02-23T22:07:57.000Z',
  };

  const arrAddress = [
    {
      id: 1,
      personId: 1,
      street: 'Av. Paulista',
      number: 500,
      complement: null,
      district: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      country: 'Brasil',
      zipCode: '01310100',
      createdAt: '2022-02-23T22:07:57.000Z',
      updatedAt: '2022-02-23T22:07:57.000Z',
    },
  ];

  // CREATE
  it('should create address', async () => {
    expect(await controller.create(dto)).toEqual({
      id: expect.any(Number),
      ...dto,
    });
  });

  it('should create in the AddressesService', () => {
    expect(mockAddressesService.create).toHaveBeenCalled();
    expect(mockAddressesService.create).toHaveBeenCalledWith(dto);
  });

  // UPDATE
  const id = 2;
  it('should update address', async () => {
    expect(await controller.update(id, dto)).toEqual({
      id,
      dto,
    });
  });

  it('should update in the AddressesService', () => {
    expect(mockAddressesService.update).toHaveBeenCalled();
    expect(mockAddressesService.update).toHaveBeenCalledWith(id, dto);
  });

  // Delete
  it('should delete address', async () => {
    expect(await controller.remove(id)).toEqual({
      id,
    });
  });

  it('should delete in the AddressesService', () => {
    expect(mockAddressesService.remove).toHaveBeenCalled();
    expect(mockAddressesService.remove).toHaveBeenCalledWith(id);
  });

  // GET ALL
  it('should GET all address', async () => {
    expect(await controller.getAll()).toEqual(arrAddress);
  });

  it('should GET all in the AddressesService', () => {
    expect(mockAddressesService.getAll).toHaveBeenCalled();
  });

  // Get
  it('should GET address', async () => {
    expect(await controller.get(id)).toEqual({
      id,
      ...address,
    });
  });

  it('should get in the AddressesService', () => {
    expect(mockAddressesService.get).toHaveBeenCalled();
    expect(mockAddressesService.get).toHaveBeenCalledWith(id);
  });
});
