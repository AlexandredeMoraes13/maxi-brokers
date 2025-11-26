import { Component, OnInit } from '@angular/core';

interface Asset {
  symbol: string;
  change: number;
  position: { x: number; y: number };
  animationDelay: number;
  pulseDelay: number;
  duration: number;
}

@Component({
  selector: 'app-painel01',
  templateUrl: './painel01.component.html',
  styleUrls: ['./painel01.component.css']
})
export class Painel01Component implements OnInit {
  
  assets: Asset[] = [];

  constructor() { }

  ngOnInit(): void {
    this.initializeAssets();
  }

  initializeAssets(): void {
    // 20 ativos mais importantes do mercado financeiro
    const importantAssets = [
      { symbol: 'SPX', name: 'S&P 500' },
      { symbol: 'DJI', name: 'Dow Jones' },
      { symbol: 'IXIC', name: 'NASDAQ' },
      { symbol: 'BTC', name: 'Bitcoin' },
      { symbol: 'ETH', name: 'Ethereum' },
      { symbol: 'GC', name: 'Gold' },
      { symbol: 'SI', name: 'Silver' },
      { symbol: 'CL', name: 'Crude Oil' },
      { symbol: 'EURUSD', name: 'Euro/Dollar' },
      { symbol: 'GBPUSD', name: 'Pound/Dollar' },
      { symbol: 'USDJPY', name: 'Dollar/Yen' },
      { symbol: 'AAPL', name: 'Apple' },
      { symbol: 'MSFT', name: 'Microsoft' },
      { symbol: 'GOOGL', name: 'Alphabet' },
      { symbol: 'AMZN', name: 'Amazon' },
      { symbol: 'TSLA', name: 'Tesla' },
      { symbol: 'META', name: 'Meta' },
      { symbol: 'NVDA', name: 'NVIDIA' },
      { symbol: 'BRK.B', name: 'Berkshire' },
      { symbol: 'V', name: 'Visa' }
    ];

    this.assets = importantAssets.map(asset => {
      // Variação aleatória entre -5% e +5%
      const change = +(Math.random() * 10 - 5).toFixed(2);
      
      // Posição aleatória na tela (evitando as bordas)
      const position = {
        x: 5 + Math.random() * 85, // 5% a 90%
        y: 10 + Math.random() * 75 // 10% a 85%
      };
      
      // Delay de animação aleatório para o float
      const animationDelay = Math.random() * 20;
      
      // Delay de pulso aleatório para aparecer/desaparecer
      const pulseDelay = Math.random() * 15;
      
      // Duração aleatória da animação de pulso
      const duration = 6 + Math.random() * 8; // 6-14 segundos
      
      return {
        symbol: asset.symbol,
        change: change,
        position: position,
        animationDelay: animationDelay,
        pulseDelay: pulseDelay,
        duration: duration
      };
    });
  }

  getAssetStyle(asset: Asset): any {
    return {
      'left': asset.position.x + '%',
      'top': asset.position.y + '%',
      'animation-delay': asset.animationDelay + 's, ' + asset.pulseDelay + 's',
      'animation-duration': '25s, ' + asset.duration + 's'
    };
  }

  startInvesting(): void {
    console.log('Start Investing clicked');
    // Adicione aqui a lógica para navegação ou ação do botão
    // Exemplo: this.router.navigate(['/investing']);
  }

  discoverWeb3(): void {
    console.log('Discover Web3 clicked');
    // Adicione aqui a lógica para navegação ou ação do botão
    // Exemplo: this.router.navigate(['/web3']);
  }
}