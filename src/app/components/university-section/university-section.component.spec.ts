import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversitySectionComponent } from './university-section.component';

describe('UniversitySectionComponent', () => {
  let component: UniversitySectionComponent;
  let fixture: ComponentFixture<UniversitySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniversitySectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversitySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
