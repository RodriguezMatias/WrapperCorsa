import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaV2Component } from './tabla-v2.component';

describe('TablaV2Component', () => {
  let component: TablaV2Component;
  let fixture: ComponentFixture<TablaV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
