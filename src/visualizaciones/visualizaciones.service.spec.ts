import { Test, TestingModule } from '@nestjs/testing';
import { VisualizacionesService } from './visualizaciones.service';

describe('VisualizacionesService', () => {
  let service: VisualizacionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisualizacionesService],
    }).compile();

    service = module.get<VisualizacionesService>(VisualizacionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
