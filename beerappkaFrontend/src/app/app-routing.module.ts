import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlcoholLevelCalculatorComponent } from './alcohol-level-calculator/alcohol-level-calculator.component';
import { AuthGuard } from './guards/auth.guard';
import {AlreadyLoggedInGuard} from './guards/already-logged-in-guard.service';
import {ProfileComponent} from './profile/profile.component';
import {UpdateProfileComponent} from './update-profile/update-profile.component';
import {ChangePasswordComponent} from './profile/change-password/change-password.component';
import {DeleteAccountComponent} from './profile/delete-account/delete-account.component';
import {BrewersListComponent} from './components/brewers-list/brewers-list.component';
import {BrewerDetailsComponent} from './components/brewer-details/brewer-details.component';
import {ArticlesListComponent} from './components/articles-list/articles-list.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent, canActivate: [AlreadyLoggedInGuard] },
  { path: 'logowanie', component: LoginPageComponent, canActivate: [AlreadyLoggedInGuard] },
  { path: 'rejestracja', component: RegisterPageComponent, canActivate: [AlreadyLoggedInGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'profil', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'edytuj-profil', component: UpdateProfileComponent, canActivate: [AuthGuard]},
  { path: 'edytuj-profil/zmien-haslo', component: ChangePasswordComponent, canActivate: [AuthGuard]},
  { path: 'edytuj-profil/usun-konto', component: DeleteAccountComponent, canActivate: [AuthGuard]},
  { path: 'kalkulatory/poziom-alkoholu', component: AlcoholLevelCalculatorComponent, canActivate: [AuthGuard] },
  { path: 'piwowarzy', component: BrewersListComponent, canActivate: [AuthGuard]},
  { path: 'piwowarzy/:username', component: BrewerDetailsComponent, canActivate: [AuthGuard]},
  { path: 'artykuly', component: ArticlesListComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
