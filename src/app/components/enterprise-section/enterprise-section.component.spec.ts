import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseSectionComponent } from './enterprise-section.component';

describe('EnterpriseSectionComponent', () => {
  let component: EnterpriseSectionComponent;
  let fixture: ComponentFixture<EnterpriseSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterpriseSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterpriseSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
