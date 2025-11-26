import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Ticker {
  symbol: string;
  price: number;
  change: number;
}

interface Particle {
  x: number;
  y: number;
  delay: number;
  size: number;
  speed: number;
  color: string;
  type: string;
}

interface PopularItem {
  symbol: string;
  name?: string;
  price: string;
  change: string;
}

interface AssetStats {
  volume: string;
  horario: string;
  alavancagem: string;
}

interface AssetDetails {
  title: string;
  description: string;
  features: string[];
  stats: AssetStats;
  popularItems: PopularItem[];
}

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit, OnDestroy {
  totalVolume: number = 0;
  availableAssets: number = 0;
  countriesCount: number = 0;
  
  private animationInterval: any;
  particles: Particle[] = [];
  currentAsset: string = 'overview';
  mouseX: number = 0;
  mouseY: number = 0;

  // Cores específicas para cada ativo
  assetColors: any = {
    forex: { primary: '#ff6b35', secondary: '#4ecdc4', accent: '#45b7d1' },
    indices: { primary: '#96ceb4', secondary: '#ffeaa7', accent: '#dda15e' },
    acoes: { primary: '#74b9ff', secondary: '#a29bfe', accent: '#6c5ce7' },
    commodities: { primary: '#fdcb6e', secondary: '#e17055', accent: '#e84393' },
    cripto: { primary: '#00b894', secondary: '#00cec9', accent: '#81ecec' },
    overview: { primary: '#ff6b35', secondary: '#ff8c42', accent: '#ffa260' }
  };

  liveTickers: Ticker[] = [
    { symbol: 'EUR/USD', price: 1.0850, change: 0.12 },
    { symbol: 'BTC/USD', price: 43250.75, change: 2.34 },
    { symbol: 'SPX500', price: 4785.25, change: 0.45 },
    { symbol: 'AAPL', price: 185.32, change: -0.23 },
    { symbol: 'GOLD', price: 2025.80, change: 0.67 }
  ];

  // Dados específicos para cada ativo usando chaves de tradução
assetDetails: { [key: string]: AssetDetails } = {
  forex: {
    title: 'market-04',
    description: 'market-05',
    features: [
      'market-feature-01',
      'market-feature-02',
      'market-feature-03',
      'market-feature-04',
      'market-feature-05'
    ],
    stats: {
      volume: 'market-stats-01',
      horario: 'market-stats-02',
      alavancagem: 'market-stats-03'
    },
    popularItems: [
      { symbol: 'EUR/USD', price: '0.0', change: '+0.12%' },
      { symbol: 'GBP/USD', price: '0.1', change: '-0.05%' },
      { symbol: 'USD/JPY', price: '0.2', change: '+0.08%' },
      { symbol: 'AUD/USD', price: '0.1', change: '-0.03%' }
    ]
  },
  indices: {
    title: 'market-09',
    description: 'market-10',
    features: [
      'market-feature-06',
      'market-feature-07',
      'market-feature-08',
      'market-feature-09',
      'market-feature-10'
    ],
    stats: {
      volume: 'market-stats-04',
      horario: 'market-stats-05',
      alavancagem: 'market-stats-06'
    },
    popularItems: [
      { symbol: 'S&P 500', name: 'market-index-01', price: '4785.25', change: '+0.45%' },
      { symbol: 'NASDAQ', name: 'market-index-02', price: '16875.42', change: '+0.67%' },
      { symbol: 'DAX 30', name: 'market-index-03', price: '16742.35', change: '-0.12%' },
      { symbol: 'FTSE 100', name: 'market-index-04', price: '7689.21', change: '+0.23%' }
    ]
  },
  acoes: {
    title: 'market-14',
    description: 'market-15',
    features: [
      'market-feature-11',
      'market-feature-12',
      'market-feature-13',
      'market-feature-14',
      'market-feature-15'
    ],
    stats: {
      volume: 'market-stats-07',
      horario: 'market-stats-08',
      alavancagem: 'market-stats-09'
    },
    popularItems: [
      { symbol: 'AAPL', name: 'market-stock-01', price: '185.32', change: '-0.23%' },
      { symbol: 'TSLA', name: 'market-stock-02', price: '248.76', change: '+1.45%' },
      { symbol: 'AMZN', name: 'market-stock-03', price: '156.89', change: '+0.78%' },
      { symbol: 'MSFT', name: 'market-stock-04', price: '378.91', change: '+0.34%' }
    ]
  },
  commodities: {
    title: 'market-19',
    description: 'market-20',
    features: [
      'market-feature-16',
      'market-feature-17',
      'market-feature-18',
      'market-feature-19',
      'market-feature-20'
    ],
    stats: {
      volume: 'market-stats-10',
      horario: 'market-stats-11',
      alavancagem: 'market-stats-12'
    },
    popularItems: [
      { symbol: 'XAU/USD', name: 'market-commodity-01', price: '2025.80', change: '+0.67%' },
      { symbol: 'XAG/USD', name: 'market-commodity-02', price: '23.15', change: '+0.45%' },
      { symbol: 'WTI', name: 'market-commodity-03', price: '74.32', change: '-1.23%' },
      { symbol: 'NATGAS', name: 'market-commodity-04', price: '2.89', change: '+2.15%' }
    ]
  },
  cripto: {
    title: 'market-24',
    description: 'market-25',
    features: [
      'market-feature-21',
      'market-feature-22',
      'market-feature-23',
      'market-feature-24',
      'market-feature-25'
    ],
    stats: {
      volume: 'market-stats-13',
      horario: 'market-stats-14',
      alavancagem: 'market-stats-15'
    },
    popularItems: [
      { symbol: 'BTC/USD', name: 'market-crypto-01', price: '43250.75', change: '+2.34%' },
      { symbol: 'ETH/USD', name: 'market-crypto-02', price: '2580.42', change: '+1.67%' },
      { symbol: 'ADA/USD', name: 'market-crypto-03', price: '0.5123', change: '-0.45%' },
      { symbol: 'SOL/USD', name: 'market-crypto-04', price: '98.76', change: '+5.23%' }
    ]
  }
};

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  ngOnInit(): void {
    this.startNumberAnimations();
    this.generateParticles();
    this.startTickerUpdates();
    
    // Monitora mudanças na rota para detectar qual ativo está ativo
    this.route.params.subscribe(params => {
      this.currentAsset = params['asset'] || 'overview';
      // Regenera partículas quando o ativo muda
      this.generateParticles();
    });
  }

  ngOnDestroy(): void {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }

  // ========== MÉTODOS AUXILIARES PARA O TEMPLATE ==========

  // Obtém o título do ativo atual (garante string)
  getCurrentAssetTitle(): string {
    const details = this.getCurrentAssetDetails();
    return details.title;
  }

  // Obtém a descrição do ativo atual (garante string)
  getCurrentAssetDescription(): string {
    const details = this.getCurrentAssetDetails();
    return details.description;
  }

  // Obtém as features do ativo atual (garante array)
  getCurrentAssetFeatures(): string[] {
    const details = this.getCurrentAssetDetails();
    return details.features;
  }

  // Obtém os itens populares do ativo atual (garante array)
  getCurrentAssetPopularItems(): PopularItem[] {
    const details = this.getCurrentAssetDetails();
    return details.popularItems;
  }

  // Obtém as estatísticas do ativo atual (garante objeto)
  getCurrentAssetStats(): AssetStats {
    const details = this.getCurrentAssetDetails();
    return details.stats;
  }

  // Obtém os detalhes do ativo atual com fallback seguro
  getCurrentAssetDetails(): AssetDetails {
    const details = this.assetDetails[this.currentAsset];
    if (!details) {
      // Retorna um objeto de fallback seguro
      return {
        title: 'market-01',
        description: 'market-02',
        features: [],
        stats: { 
          volume: 'market-stats-default-01', 
          horario: 'market-stats-default-02', 
          alavancagem: 'market-stats-default-03' 
        },
        popularItems: []
      };
    }
    return details;
  }

  // ========== MÉTODOS DE NAVEGAÇÃO ==========

  // Navega para um ativo específico
  navigateToAsset(asset: string): void {
    this.router.navigate(['/market', asset]);
  }

  // Volta para a visão geral
  backToOverview(): void {
    this.router.navigate(['/market']);
  }

  // Verifica se está na visão geral
  isOverview(): boolean {
    return this.currentAsset === 'overview' || !this.currentAsset;
  }

  // Verifica se é um ativo válido
  isValidAsset(): boolean {
    return this.assetDetails.hasOwnProperty(this.currentAsset);
  }

  // ========== MÉTODOS DE BACKGROUND E ANIMAÇÃO ==========

  // Obtém as cores do ativo atual
  getCurrentColors() {
    return this.assetColors[this.currentAsset] || this.assetColors.overview;
  }

  // Obtém o estilo do background baseado no ativo atual
  getBackgroundStyle(): any {
    const colors = this.getCurrentColors();
    return {
      'background': `radial-gradient(circle at 30% 20%, ${colors.primary}15 0%, transparent 50%),
                    radial-gradient(circle at 80% 80%, ${colors.secondary}10 0%, transparent 50%),
                    radial-gradient(circle at 40% 40%, ${colors.accent}05 0%, transparent 50%)`
    };
  }

  // Obtém o estilo individual de cada partícula
  getParticleStyle(particle: Particle, index: number): any {
    return {
      'left.px': particle.x,
      'top.px': particle.y,
      'width.px': particle.size,
      'height.px': particle.type === 'line' ? 1 : particle.size,
      'background-color': particle.color,
      'border-color': particle.color,
      'animation-delay.s': particle.delay,
      'animation-duration.s': particle.speed * 10 + 10,
      'opacity': particle.type === 'line' ? 0.6 : 0.8
    };
  }

  // Gradiente para as ondas
  getWaveGradient(opacity: number): string {
    const colors = this.getCurrentColors();
    return `linear-gradient(90deg, 
      ${colors.primary}${Math.round(opacity * 100)} 0%, 
      ${colors.secondary}${Math.round(opacity * 70)} 50%, 
      ${colors.accent}${Math.round(opacity * 30)} 100%)`;
  }

  // Gradiente para o orb de respiração
  getOrbGradient(): string {
    const colors = this.getCurrentColors();
    return `radial-gradient(circle, 
      ${colors.primary}20 0%, 
      ${colors.secondary}15 40%, 
      ${colors.accent}10 70%, 
      transparent 100%)`;
  }

  // ========== MÉTODOS PRIVADOS ==========

  private startNumberAnimations(): void {
    this.totalVolume = 1250000000;
    this.availableAssets = 2250;
    this.countriesCount = 85;

    this.animationInterval = setInterval(() => {
      this.animateTotalVolume();
      this.animateAvailableAssets();
    }, 5000);
  }

  private animateTotalVolume(): void {
    const targetValue = 1250000000 + Math.random() * 500000000;
    const duration = 1500;
    const steps = 60;
    const stepValue = (targetValue - this.totalVolume) / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep < steps) {
        this.totalVolume += stepValue;
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, duration / steps);
  }

  private animateAvailableAssets(): void {
    const targetValue = 2250 + Math.random() * 100;
    const duration = 1500;
    const steps = 60;
    const stepValue = (targetValue - this.availableAssets) / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep < steps) {
        this.availableAssets += stepValue;
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, duration / steps);
  }

  private startTickerUpdates(): void {
    setInterval(() => {
      this.liveTickers = this.liveTickers.map(ticker => ({
        ...ticker,
        price: ticker.price * (1 + (Math.random() - 0.5) * 0.002),
        change: (Math.random() - 0.5) * 2
      }));
    }, 3000);
  }

  private generateParticles(): void {
    this.particles = [];
    const colors = this.getCurrentColors();
    const particleCount = this.isOverview() ? 40 : 30;
    
    for (let i = 0; i < particleCount; i++) {
      const types = ['dot', 'line', 'circle', 'triangle'];
      const type = types[Math.floor(Math.random() * types.length)];
      
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        delay: Math.random() * 20,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 2 + 0.5,
        color: Math.random() > 0.7 ? colors.secondary : Math.random() > 0.5 ? colors.accent : colors.primary,
        type: type
      });
    }
  }
}