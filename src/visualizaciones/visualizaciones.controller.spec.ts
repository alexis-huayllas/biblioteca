import { Test, TestingModule } from '@nestjs/testing';
import { VisualizacionesController } from './visualizaciones.controller';
import { VisualizacionesService } from './visualizaciones.service';

describe('VisualizacionesController', () => {
  let controller: VisualizacionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisualizacionesController],
      providers: [VisualizacionesService],
    }).compile();

    controller = module.get<VisualizacionesController>(VisualizacionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
