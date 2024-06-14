import { Test, TestingModule } from '@nestjs/testing';
import { SancionController } from './sancion.controller';
import { SancionService } from './sancion.service';

describe('SancionController', () => {
  let controller: SancionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SancionController],
      providers: [SancionService],
    }).compile();

    controller = module.get<SancionController>(SancionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
