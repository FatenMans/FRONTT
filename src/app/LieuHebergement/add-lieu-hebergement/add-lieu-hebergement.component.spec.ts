import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLieuHebergementComponent } from './add-lieu-hebergement.component';

describe('AddLieuHebergementComponent', () => {
  let component: AddLieuHebergementComponent;
  let fixture: ComponentFixture<AddLieuHebergementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLieuHebergementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLieuHebergementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
