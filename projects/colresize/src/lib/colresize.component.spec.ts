import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColresizeComponent } from './colresize.component';

describe('ColresizeComponent', () => {
  let component: ColresizeComponent;
  let fixture: ComponentFixture<ColresizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColresizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColresizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
