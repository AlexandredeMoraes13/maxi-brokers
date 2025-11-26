import { Component, OnInit, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  isScrolled = false;
  isLanguageDropdownOpen = false;
  
  languages = [
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'zh-tw', name: '中文', flag: '🇨🇳' }
  ];
  
  currentLanguage = this.languages[0];

  constructor(
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.onWindowScroll(); // Verifica a posição do scroll inicial
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) this.switchLanguage(savedLang);

    // Configura o scroll para o topo em toda navegação
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.scrollToTop();
      });
  }

  // Método para scroll suave para o topo
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Método para links de navegação (mobile e desktop)
  onNavLinkClick() {
    this.scrollToTop();
    if (window.innerWidth <= 1199.98) {
      this.closeMenu();
    }
  }

  toggleLanguageDropdown() {
    this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
  }

  closeLanguageDropdown() {
    this.isLanguageDropdownOpen = false;
  }

  switchLanguage(languageCode: string) {
    this.translate.use(languageCode);
    const selectedLang = this.languages.find(lang => lang.code === languageCode);
    if (selectedLang) this.currentLanguage = selectedLang;
    localStorage.setItem('preferredLanguage', languageCode);
    this.closeLanguageDropdown();
    if (window.innerWidth <= 1199.98) this.closeMenu();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    if (!this.isMenuOpen) this.closeAllMobileDropdowns();
  }

  closeMenu() {
    this.isMenuOpen = false;
    document.body.style.overflow = '';
    this.closeAllMobileDropdowns();
    this.closeLanguageDropdown();
  }

  @HostListener('window:scroll') 
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 20;
  }

  @HostListener('window:resize') 
  onResize() {
    if (window.innerWidth > 1199.98 && this.isMenuOpen) this.closeMenu();
  }

  toggleMobileDropdown(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    const target = event.currentTarget as HTMLElement;
    const parentItem = target.closest('.has-children') as HTMLElement;
    if (parentItem) {
      this.closeAllMobileDropdowns();
      parentItem.classList.toggle('active');
    }
  }

  private closeAllMobileDropdowns() {
    document.querySelectorAll('.site-nav-wrap .has-children').forEach(parent => {
      parent.classList.remove('active');
    });
  }

  openLogin() {
    console.log('Abrindo login...');
    // Implementar lógica de login
  }

  openRealAccount() {
    console.log('Abrindo conta real...');
    // Implementar lógica de conta real
  }

  @HostListener('document:click', ['$event']) 
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.language-selector-right')) this.closeLanguageDropdown();
  }
}