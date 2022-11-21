import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VerPedido } from './ver-pedido.component';

describe('ver-pedido', () => {
  let component: VerPedido;
  let fixture: ComponentFixture<VerPedido>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerPedido ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPedido);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
