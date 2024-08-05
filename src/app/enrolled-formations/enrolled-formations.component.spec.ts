import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolledFormationsComponent } from './enrolled-formations.component';

describe('EnrolledFormationsComponent', () => {
  let component: EnrolledFormationsComponent;
  let fixture: ComponentFixture<EnrolledFormationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrolledFormationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrolledFormationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
