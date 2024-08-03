import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActionformationComponent } from './list-actionformation.component';

describe('ListActionformationComponent', () => {
  let component: ListActionformationComponent;
  let fixture: ComponentFixture<ListActionformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListActionformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListActionformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
