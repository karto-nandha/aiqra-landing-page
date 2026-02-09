import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolSectionComponent } from './school-section.component';

describe('SchoolSectionComponent', () => {
  let component: SchoolSectionComponent;
  let fixture: ComponentFixture<SchoolSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
