import { Test, TestingModule } from '@nestjs/testing';
import { SancionService } from './sancion.service';

describe('SancionService', () => {
  let service: SancionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SancionService],
    }).compile();

    service = module.get<SancionService>(SancionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
