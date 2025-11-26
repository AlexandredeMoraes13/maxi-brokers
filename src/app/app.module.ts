// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Importações do ngx-translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

// Importe todos os componentes
import { Painel01Component } from './components/painel01/painel01.component';
import { Painel02Component } from './components/painel02/painel02.component';
import { Painel03Component } from './components/painel03/painel03.component';
import { Painel04Component } from './components/painel04/painel04.component';
import { Painel05Component } from './components/painel05/painel05.component';
import { Painel06Component } from './components/painel06/painel06.component';

// Importe todos os componentes de página
import { HomeComponent } from './pages/home/home.component';
import { NewsComponent } from './pages/news/news.component';
import { FaqComponent } from './pages/faq/faq.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AccountTypesComponent } from './pages/account-types/account-types.component';
import { StandardAccountComponent } from './pages/standard-account/standard-account.component';
import { PremiumAccountComponent } from './pages/premium-account/premium-account.component';
import { VipAccountComponent } from './pages/vip-account/vip-account.component';
import { HowItWorksComponent } from './pages/how-it-works/how-it-works.component';
import { RegisterComponent } from './pages/how-it-works/register/register.component';
import { InitialDepositComponent } from './pages/how-it-works/initial-deposit/initial-deposit.component';
import { StartComponent } from './pages/how-it-works/start/start.component';

// Importe o AppRoutingModule
import { AppRoutingModule } from './app-routing.module';
import { MarketComponent } from './pages/market/market.component';

// Factory function para o HttpLoader
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    
    // Componentes de UI
    Painel01Component,
    Painel02Component,
    Painel03Component,
    Painel04Component,
    Painel05Component,
    Painel06Component,
    
    // Componentes de Página
    HomeComponent,
    NewsComponent,
    FaqComponent,
    AboutUsComponent,
    AccountTypesComponent,
    StandardAccountComponent,
    PremiumAccountComponent,
    VipAccountComponent,
    HowItWorksComponent,
    RegisterComponent,
    InitialDepositComponent,
    StartComponent,
    MarketComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    
    // Configure o TranslateModule - CORRIGIDO
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }