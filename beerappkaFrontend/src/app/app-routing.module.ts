import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlcoholLevelCalculatorComponent } from './alcohol-level-calculator/alcohol-level-calculator.component';
import { AuthGuard } from './guards/auth.guard';
import {AlreadyLoggedInGuard} from './guards/already-logged-in-guard.service';

const routes: Routes = [
  { path: '', component: LandingPageComponent, canActivate: [AlreadyLoggedInGuard] },
  { path: 'logowanie', component: LoginPageComponent, canActivate: [AlreadyLoggedInGuard] },
  { path: 'rejestracja', component: RegisterPageComponent, canActivate: [AlreadyLoggedInGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'kalkulatory/poziom-alkoholu', component: AlcoholLevelCalculatorComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
