// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AccountTypesComponent } from './pages/account-types/account-types.component';
import { StandardAccountComponent } from './pages/standard-account/standard-account.component';
import { PremiumAccountComponent } from './pages/premium-account/premium-account.component';
import { VipAccountComponent } from './pages/vip-account/vip-account.component';
import { HowItWorksComponent } from './pages/how-it-works/how-it-works.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { RegisterComponent } from './pages/how-it-works/register/register.component';
import { InitialDepositComponent } from './pages/how-it-works/initial-deposit/initial-deposit.component';
import { StartComponent } from './pages/how-it-works/start/start.component';
import { NewsComponent } from './pages/news/news.component';
import { FaqComponent } from './pages/faq/faq.component';
import { MarketComponent } from './pages/market/market.component';
import { SupportComponent } from './pages/support/support.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "account-types", component: AccountTypesComponent },
  { path: "account-types/standard-account", component: StandardAccountComponent },
  { path: "account-types/premium-account", component: PremiumAccountComponent },
  { path: "account-types/vip-account", component: VipAccountComponent },
  { path: "how-it-works", component: HowItWorksComponent },
  { path: "about-us", component: AboutUsComponent },
  { path: "how-it-works/register", component: RegisterComponent },
  { path: "how-it-works/initial-deposit", component: InitialDepositComponent },
  { path: "how-it-works/start", component: StartComponent },
  { path: "news", component: NewsComponent },
  { path: "faq", component: FaqComponent },
  { path: "market", component: MarketComponent },
  { path: "market/:asset", component: MarketComponent }, // Nova rota para ativos específicos
  { path: "atendimento", component: SupportComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }