import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCabinetComponent } from './list-cabinet.component';

describe('ListCabinetComponent', () => {
  let component: ListCabinetComponent;
  let fixture: ComponentFixture<ListCabinetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCabinetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
