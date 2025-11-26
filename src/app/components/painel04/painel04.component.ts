import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-painel04',
  templateUrl: './painel04.component.html',
  styleUrls: ['./painel04.component.css']
})
export class Painel04Component implements OnInit, OnDestroy {
  portfolioValue: number = 0;
  yieldRate: number = 0;
  riskScore: number = 0;

  private animationInterval: any;
  particles: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.startNumberAnimations();
    this.generateParticles();
  }

  ngOnDestroy(): void {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }

  private startNumberAnimations(): void {
    // Initial values
    this.portfolioValue = 125000;
    this.yieldRate = 8.45;
    this.riskScore = 7;

    // Animate numbers every 3 seconds
    this.animationInterval = setInterval(() => {
      this.animatePortfolioValue();
      this.animateYieldRate();
      this.animateRiskScore();
    }, 3000);
  }

  private animatePortfolioValue(): void {
    const targetValue = 125000 + Math.random() * 50000;
    const duration = 1000;
    const steps = 60;
    const stepValue = (targetValue - this.portfolioValue) / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep < steps) {
        this.portfolioValue += stepValue;
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, duration / steps);
  }

  private animateYieldRate(): void {
    const targetValue = 6 + Math.random() * 5; // Between 6% and 11%
    const duration = 1000;
    const steps = 60;
    const stepValue = (targetValue - this.yieldRate) / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep < steps) {
        this.yieldRate += stepValue;
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, duration / steps);
  }

  private animateRiskScore(): void {
    const targetValue = Math.floor(Math.random() * 3) + 6; // Between 6 and 8
    const duration = 1000;
    const steps = 20;
    const stepValue = (targetValue - this.riskScore) / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep < steps) {
        this.riskScore += stepValue;
        currentStep++;
      } else {
        this.riskScore = Math.round(this.riskScore * 10) / 10;
        clearInterval(interval);
      }
    }, duration / steps);
  }

  private generateParticles(): void {
    for (let i = 0; i < 20; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        delay: Math.random() * 15
      });
    }
  }
}