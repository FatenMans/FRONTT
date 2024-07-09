import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LieuHebergementComponent } from './lieu-hebergement.component';

describe('LieuHebergementComponent', () => {
  let component: LieuHebergementComponent;
  let fixture: ComponentFixture<LieuHebergementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LieuHebergementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LieuHebergementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
