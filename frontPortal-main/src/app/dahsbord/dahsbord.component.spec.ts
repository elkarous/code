import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DahsbordComponent } from './dahsbord.component';

describe('DahsbordComponent', () => {
  let component: DahsbordComponent;
  let fixture: ComponentFixture<DahsbordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DahsbordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DahsbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
