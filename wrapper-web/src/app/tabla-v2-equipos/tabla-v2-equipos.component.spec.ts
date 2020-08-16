import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaV2EquiposComponent } from './tabla-v2-equipos.component';

describe('TablaV2EquiposComponent', () => {
  let component: TablaV2EquiposComponent;
  let fixture: ComponentFixture<TablaV2EquiposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaV2EquiposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaV2EquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
