import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLieuHebComponent } from './edit-lieu-heb.component';

describe('EditLieuHebComponent', () => {
  let component: EditLieuHebComponent;
  let fixture: ComponentFixture<EditLieuHebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLieuHebComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLieuHebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
