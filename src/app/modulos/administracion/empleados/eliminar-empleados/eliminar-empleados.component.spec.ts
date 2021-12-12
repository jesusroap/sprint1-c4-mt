import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarEmpleadosComponent } from './eliminar-empleados.component';

describe('EliminarEmpleadosComponent', () => {
  let component: EliminarEmpleadosComponent;
  let fixture: ComponentFixture<EliminarEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarEmpleadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
