import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeetComponent } from './add-employeet.component';

describe('AjoutpatientComponent', () => {
  let component: AddEmployeetComponent;
  let fixture: ComponentFixture<AddEmployeetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmployeetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
