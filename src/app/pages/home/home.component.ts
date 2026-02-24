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
  // ng build --base-href /aiqra_website/ai_and_data_academy/

  email = 'b2bsupport@ooredoo.om';
  apiUrl = 'https://aiqra.com.om/mailer.php';

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
        Validators.pattern('^\\+[1-9]\\d{7,14}$')
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
      fullName: this.contactForm.value.fullName.trim(),
      organisation: this.contactForm.value.organisation.trim(),
      email: this.contactForm.value.email.trim(),
      mobile: this.contactForm.value.mobile,
      areaOfInterest: this.contactForm.value.areaOfInterest,
      message: this.contactForm.value.message.trim()
    };

    const formData = new FormData();
    Object.keys(payload).forEach(key => {
      formData.append(key, (payload as any)[key]);
    });

    this.http.post(this.apiUrl, formData).subscribe({
      next: (res: any) => {
        console.log("Success:", res);
        this.successMessage = res.message || 'Thank you! We will contact you soon.';
        this.contactForm.reset();
        this.isSubmitting = false;
      },
      error: (err) => {
        console.log("Error:", err);
        this.errorMessage = 'Something went wrong. Please try again later.';
        this.isSubmitting = false;
      }
    });
  }

  // allowOnlyPhone(event: KeyboardEvent) {
  //   const char = event.key;
  //   const input = event.target as HTMLInputElement;
  //   const value = input.value;
  //   const cursorPos = input.selectionStart ?? 0;

  //   // Allow control keys
  //   if (
  //     event.key === 'Backspace' ||
  //     event.key === 'Delete' ||
  //     event.key === 'ArrowLeft' ||
  //     event.key === 'ArrowRight' ||
  //     event.key === 'Tab'
  //   ) {
  //     return;
  //   }

  //   // Allow + only at first position
  //   if (char === '+' && cursorPos === 0 && !value.includes('+')) {
  //     return;
  //   }

  //   // Allow only one space
  //   if (char === ' ' && !value.includes(' ')) {
  //     return;
  //   }

  //   // Allow digits
  //   if (/[0-9]/.test(char)) {
  //     const parts = value.split(' ');

  //     // If space exists
  //     if (parts.length === 2) {
  //       const numberPartStart = value.indexOf(' ') + 1;

  //       // Restrict to 10 digits after space
  //       if (cursorPos >= numberPartStart) {
  //         if (parts[1].length >= 10) {
  //           event.preventDefault();
  //         }
  //       }
  //     }
  //     return;
  //   }

  //   event.preventDefault();
  // }

  allowOnlyPhone(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Allow control keys
    if (
      event.key === 'Backspace' ||
      event.key === 'Delete' ||
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight' ||
      event.key === 'Tab'
    ) {
      return;
    }

    // Allow + only at first position
    if (event.key === '+' && value.length === 0) {
      return;
    }

    // Allow digits only
    if (/[0-9]/.test(event.key)) {
      // Prevent more than 15 digits (excluding +)
      const digitsOnly = value.replace('+', '');
      if (digitsOnly.length >= 15) {
        event.preventDefault();
      }
      return;
    }

    event.preventDefault();
  }
}
