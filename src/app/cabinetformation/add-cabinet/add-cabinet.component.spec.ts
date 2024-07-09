import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCabinetComponent } from './add-cabinet.component';

describe('AddCabinetComponent', () => {
  let component: AddCabinetComponent;
  let fixture: ComponentFixture<AddCabinetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCabinetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
