import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-painel05',
  templateUrl: './painel05.component.html',
  styleUrls: ['./painel05.component.css']
})
export class Painel05Component implements OnInit, OnDestroy {
  activeTraders: number = 0;
  dailyVolume: number = 0;
  executionSpeed: number = 0;
  successRate: number = 0;
  
  private animationInterval: any;
  floatingElements: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.startNumberAnimations();
    this.generateFloatingElements();
  }

  ngOnDestroy(): void {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }

  private startNumberAnimations(): void {
    // Initial values
    this.activeTraders = 12500;
    this.dailyVolume = 2.5;
    this.executionSpeed = 45;
    this.successRate = 98.7;

    // Animate numbers every 4 seconds
    this.animationInterval = setInterval(() => {
      this.animateActiveTraders();
      this.animateDailyVolume();
      this.animateExecutionSpeed();
      this.animateSuccessRate();
    }, 4000);
  }

  private animateActiveTraders(): void {
    const targetValue = 12000 + Math.random() * 10000;
    const duration = 1500;
    const steps = 60;
    const stepValue = (targetValue - this.activeTraders) / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep < steps) {
        this.activeTraders += stepValue;
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, duration / steps);
  }

  private animateDailyVolume(): void {
    const targetValue = 2 + Math.random() * 3;
    const duration = 1500;
    const steps = 60;
    const stepValue = (targetValue - this.dailyVolume) / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep < steps) {
        this.dailyVolume += stepValue;
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, duration / steps);
  }

  private animateExecutionSpeed(): void {
    const targetValue = 40 + Math.random() * 20;
    const duration = 1500;
    const steps = 30;
    const stepValue = (targetValue - this.executionSpeed) / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep < steps) {
        this.executionSpeed += stepValue;
        currentStep++;
      } else {
        this.executionSpeed = Math.round(this.executionSpeed);
        clearInterval(interval);
      }
    }, duration / steps);
  }

  private animateSuccessRate(): void {
    const targetValue = 97 + Math.random() * 2;
    const duration = 1500;
    const steps = 60;
    const stepValue = (targetValue - this.successRate) / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep < steps) {
        this.successRate += stepValue;
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, duration / steps);
  }

  private generateFloatingElements(): void {
    for (let i = 0; i < 15; i++) {
      this.floatingElements.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        delay: Math.random() * 20
      });
    }
  }
}