import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesaServicioComponent } from './mesa-servicio.component';

describe('MesaServicioComponent', () => {
  let component: MesaServicioComponent;
  let fixture: ComponentFixture<MesaServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesaServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesaServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
