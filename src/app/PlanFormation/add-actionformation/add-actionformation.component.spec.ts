import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActionformationComponent } from './add-actionformation.component';

describe('AddActionformationComponent', () => {
  let component: AddActionformationComponent;
  let fixture: ComponentFixture<AddActionformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddActionformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddActionformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
