import { NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  standalone: true, // Assuming standalone based on your imports
  imports: [NgFor],
  templateUrl: './image-slider.component.html',
  styleUrl: './image-slider.component.scss'
})
export class ImageSliderComponent implements OnInit, OnDestroy {

  images: string[] = [
    'assets/images/slider_1.webp',
    'assets/images/slider_2.webp',
    'assets/images/slider_3.webp',
    'assets/images/slider_4.webp',
    'assets/images/slider_5.webp',
    'assets/images/slider_6.webp'
  ];

  currentIndex = 1;
  disableTransition = false;
  private interval: any;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  startAutoSlide(): void {
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  nextSlide(): void {
    if (this.disableTransition) return;
    this.currentIndex++;
    this.handleInfiniteLoop();
  }

  prevSlide(): void {
    if (this.disableTransition) return;
    this.currentIndex--;
    this.handleInfiniteLoop();
  }

  private handleInfiniteLoop(): void {
  const totalImages = this.images.length;

  if (this.currentIndex === totalImages + 1) {
    setTimeout(() => {
      this.disableTransition = true;
      this.currentIndex = 1;
      
      requestAnimationFrame(() => {
        setTimeout(() => {
          this.disableTransition = false;
        }, 20); 
      });
    }, 800);
  }

  if (this.currentIndex === 0) {
    setTimeout(() => {
      this.disableTransition = true;
      this.currentIndex = totalImages;

      requestAnimationFrame(() => {
        setTimeout(() => {
          this.disableTransition = false;
        }, 20);
      });
    }, 800);
  }
}

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}