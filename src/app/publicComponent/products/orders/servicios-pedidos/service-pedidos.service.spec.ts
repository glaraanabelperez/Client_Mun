import { TestBed } from '@angular/core/testing';
import { ServicePedidos } from './service-pedidos.service';

describe('ServicePedidos', () => {
  let service: ServicePedidos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicePedidos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
