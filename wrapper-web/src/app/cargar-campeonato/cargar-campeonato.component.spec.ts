import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarCampeonatoComponent } from './cargar-campeonato.component';

describe('CargarCampeonatoComponent', () => {
  let component: CargarCampeonatoComponent;
  let fixture: ComponentFixture<CargarCampeonatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarCampeonatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarCampeonatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
