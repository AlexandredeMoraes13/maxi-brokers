import { Component, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-maintenance-popup',
  templateUrl: './maintenance-popup.component.html',
  styleUrls: ['./maintenance-popup.component.css']
})
export class MaintenancePopupComponent implements OnInit, OnDestroy {
  isVisible = false;
  isClosing = false;
  notificationEmail = '';
  notificationSent = false;
  notificationError = false;

  private readonly STORAGE_KEY = 'maxi_maintenance_notice_v1';

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const alreadySeen = localStorage.getItem(this.STORAGE_KEY);
    if (!alreadySeen) {
      setTimeout(() => {
        this.isVisible = true;
        document.body.style.overflow = 'hidden';
        setTimeout(() => this.focusCloseButton(), 50);
      }, 1500);
    }
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  close(): void {
    if (this.isClosing) return;
    this.isClosing = true;
    document.body.style.overflow = '';
    setTimeout(() => {
      this.isVisible = false;
      this.isClosing = false;
      localStorage.setItem(this.STORAGE_KEY, Date.now().toString());
    }, 380);
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('mp-overlay')) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isVisible && !this.isClosing) {
      this.close();
    }
  }

  submitNotification(): void {
    if (!this.notificationEmail || !this.isValidEmail(this.notificationEmail)) {
      this.notificationError = true;
      return;
    }
    this.notificationError = false;
    this.notificationSent = true;
    // TODO: integrar com serviço de e-mail/notificação
    console.log('[Maxi Brokers] Notificação solicitada para:', this.notificationEmail);
  }

  onEmailInput(): void {
    if (this.notificationError) {
      this.notificationError = false;
    }
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private focusCloseButton(): void {
    const btn = this.el.nativeElement.querySelector('.mp-close-btn') as HTMLElement;
    btn?.focus();
  }
}
