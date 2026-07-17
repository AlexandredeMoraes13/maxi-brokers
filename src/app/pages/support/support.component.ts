import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupportService } from './support.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  // Modelo do formulário
  form = {
    email: '',
    reason: '',
    platform: '',
    subject: '',
    description: ''
  };

  attachmentName = '';
  submitted = false;
  protocol = '';
  attemptedSubmit = false;
  sending = false;
  sendError = false;

  reasons: string[] = [
    'Conta e cadastro',
    'Depósitos e saques',
    'Trading e ordens',
    'Verificação de identidade (KYC)',
    'Segurança e acesso',
    'Tipos de conta e planos',
    'Outros assuntos'
  ];

  platforms: string[] = [
    'Plataforma Web',
    'Aplicativo Android',
    'Aplicativo iOS',
    'Plataforma Desktop'
  ];

  constructor(
    private route: ActivatedRoute,
    private support: SupportService
  ) { }

  ngOnInit(): void {
    // Pré-preenche o e-mail vindo do formulário "Fique Atualizado"
    const email = this.route.snapshot.queryParamMap.get('email');
    if (email) {
      this.form.email = email;
    }
    window.scrollTo(0, 0);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.attachmentName = input.files[0].name;
    }
  }

  isValid(): boolean {
    return !!(
      this.form.email &&
      this.isEmailValid(this.form.email) &&
      this.form.reason &&
      this.form.platform &&
      this.form.subject &&
      this.form.description
    );
  }

  isEmailValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  submit(): void {
    this.attemptedSubmit = true;
    this.sendError = false;
    if (!this.isValid() || this.sending) {
      return;
    }

    // Sem backend configurado ainda: confirma localmente (modo seguro/placeholder)
    if (!this.support.isConfigured) {
      this.finishSuccess();
      return;
    }

    // Com backend: envia de fato e só confirma após sucesso
    this.sending = true;
    this.support.send(this.form).subscribe({
      next: () => {
        this.sending = false;
        this.finishSuccess();
      },
      error: () => {
        this.sending = false;
        this.sendError = true;
      }
    });
  }

  private finishSuccess(): void {
    this.protocol = this.generateProtocol();
    this.submitted = true;
    window.scrollTo(0, 0);
  }

  private generateProtocol(): string {
    const now = new Date();
    const y = now.getFullYear();
    const rand = Math.floor(100000 + Math.random() * 900000);
    return `MB-${y}-${rand}`;
  }

  novoChamado(): void {
    this.submitted = false;
    this.attemptedSubmit = false;
    this.sendError = false;
    this.protocol = '';
    this.attachmentName = '';
    this.form = { email: '', reason: '', platform: '', subject: '', description: '' };
  }
}
