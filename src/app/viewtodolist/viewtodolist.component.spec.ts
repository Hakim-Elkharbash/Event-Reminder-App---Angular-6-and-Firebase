import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtodolistComponent } from './viewtodolist.component';

describe('ViewtodolistComponent', () => {
  let component: ViewtodolistComponent;
  let fixture: ComponentFixture<ViewtodolistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewtodolistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewtodolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
