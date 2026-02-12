import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ImageSliderComponent } from "../../components/image-slider/image-slider.component";
import { SchoolSectionComponent } from "../../components/school-section/school-section.component";
import { UniversitySectionComponent } from "../../components/university-section/university-section.component";
import { EnterpriseSectionComponent } from "../../components/enterprise-section/enterprise-section.component";
import { InfoSectionComponent } from "../../components/info-section/info-section.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, ImageSliderComponent, SchoolSectionComponent, UniversitySectionComponent, EnterpriseSectionComponent, InfoSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
// ng build --base-href /aiqra_website/landing_page/

  email = 'contact@aiqra.com';
  apiUrl = 'https://devapi.rcmhire.com';

  contactForm: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.contactForm = this.fb.group({
      fullName: ['', Validators.required],
      organisation: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]],
      areaOfInterest: ['', Validators.required],
      message: ['', [
        Validators.required,
        Validators.maxLength(250)
      ]]
    });
  }

  // ✔ Safe for Angular strict templates
  get f() {
    return this.contactForm.controls;
  }

  submitForm() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    const payload = {
      ...this.contactForm.value,
      fullName: this.contactForm.value.fullName.trim(),
      organisation: this.contactForm.value.organisation.trim(),
      email: this.contactForm.value.email.trim(),
      message: this.contactForm.value.message.trim()
    };

    this.http.post(`${this.apiUrl}/contact/form_submit`, payload)
      .subscribe({
        next: () => {
          this.successMessage =
            'Thank you! We will contact you within 1–2 business days.';
          this.contactForm.reset();
          this.isSubmitting = false;
        },
        error: () => {
          this.errorMessage =
            'Something went wrong. Please try again later.';
          this.isSubmitting = false;
        }
      });
  }

  // ✔ Allow numbers only for mobile
  allowOnlyPhone(event: KeyboardEvent) {
    const char = event.key;
    if (!/[0-9]/.test(char)) {
      event.preventDefault();
    }
  }
}
