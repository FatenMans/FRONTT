import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCabinetComponent } from './edit-cabinet.component';

describe('EditCabinetComponent', () => {
  let component: EditCabinetComponent;
  let fixture: ComponentFixture<EditCabinetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCabinetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
