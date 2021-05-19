import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlcoholLevelCalculatorComponent } from './alcohol-level-calculator/alcohol-level-calculator.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'logowanie', component: LoginPageComponent },
  { path: 'rejestracja', component: RegisterPageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'kalkulatory/poziom-alkoholu', component: AlcoholLevelCalculatorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
