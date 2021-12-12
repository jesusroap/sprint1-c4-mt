import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarEmpleadosComponent } from './buscar-empleados.component';

describe('BuscarEmpleadosComponent', () => {
  let component: BuscarEmpleadosComponent;
  let fixture: ComponentFixture<BuscarEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarEmpleadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
