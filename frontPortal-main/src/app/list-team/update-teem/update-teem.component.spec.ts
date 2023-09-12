import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTeemComponent } from './update-teem.component';

describe('UpdateTeemComponent', () => {
  let component: UpdateTeemComponent;
  let fixture: ComponentFixture<UpdateTeemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTeemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTeemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
