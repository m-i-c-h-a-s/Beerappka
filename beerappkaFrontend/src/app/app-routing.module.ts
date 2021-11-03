import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AlcoholLevelCalculatorComponent } from './components/alcohol-level-calculator/alcohol-level-calculator.component';
import { GravityCalculatorComponent } from './components/gravity-calculator/gravity-calculator.component';
import { CarbonationCalculatorComponent } from './components/carbonation-calculator/carbonation-calculator.component';
import { GravityCorrectionCalculatorComponent } from './components/gravity-correction-calculator/gravity-correction-calculator.component';
import { AuthGuard } from './guards/auth.guard';
import {AlreadyLoggedInGuard} from './guards/already-logged-in-guard.service';
import {ProfileComponent} from './components/profile/profile.component';
import {UpdateProfileComponent} from './components/update-profile/update-profile.component';
import {ChangePasswordComponent} from './components/profile/change-password/change-password.component';
import {DeleteAccountComponent} from './components/profile/delete-account/delete-account.component';
import {BrewersListComponent} from './components/brewers-list/brewers-list.component';
import {BrewerDetailsComponent} from './components/brewer-details/brewer-details.component';
import {ArticlesListComponent} from './components/articles-list/articles-list.component';
import {ArticleDetailsComponent} from './components/article-details/article-details.component';
import {ArticleCreateComponent} from './components/article-create/article-create.component';
import {ArticleUpdateComponent} from './components/article-update/article-update.component';
import { RecipeCreatorComponent } from './components/recipe-creator/recipe-creator.component';
import { PublicRecipesListComponent } from './components/public-recipes-list/public-recipes-list.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import {PasswordResetComponent} from './components/password-reset/password-reset.component';
import {PasswordResetFinishComponent} from "./components/password-reset-finish/password-reset-finish.component";
import { MyRecipesListComponent } from './components/my-recipes-list/my-recipes-list.component';
import { MyBatchesListComponent } from './components/my-batches-list/my-batches-list.component';
import { RecipeUpdateComponent } from './components/recipe-update/recipe-update.component';
import { BatchCreatorComponent } from './components/batch-creator/batch-creator.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent, canActivate: [AlreadyLoggedInGuard] },
  { path: 'logowanie', component: LoginPageComponent, canActivate: [AlreadyLoggedInGuard] },
  { path: 'rejestracja', component: RegisterPageComponent, canActivate: [AlreadyLoggedInGuard] },
  { path: 'resetuj-haslo', component: PasswordResetComponent, canActivate: [AlreadyLoggedInGuard] },
  { path: 'resetuj-haslo-potwierdz/:uid/:token', component: PasswordResetFinishComponent, canActivate: [AlreadyLoggedInGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'profil', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'edytuj-profil', component: UpdateProfileComponent, canActivate: [AuthGuard]},
  { path: 'edytuj-profil/zmien-haslo', component: ChangePasswordComponent, canActivate: [AuthGuard]},
  { path: 'edytuj-profil/usun-konto', component: DeleteAccountComponent, canActivate: [AuthGuard]},
  { path: 'kalkulatory/poziom-alkoholu', component: AlcoholLevelCalculatorComponent, canActivate: [AuthGuard] },
  { path: 'kalkulatory/przeliczanie-gestosci', component: GravityCalculatorComponent, canActivate: [AuthGuard] },
  { path: 'kalkulatory/nagazowanie', component: CarbonationCalculatorComponent, canActivate: [AuthGuard] },
  { path: 'kalkulatory/korekta-gestosci', component: GravityCorrectionCalculatorComponent, canActivate: [AuthGuard] },
  { path: 'piwowarzy', component: BrewersListComponent, canActivate: [AuthGuard]},
  { path: 'piwowarzy/:username', component: BrewerDetailsComponent, canActivate: [AuthGuard]},
  { path: 'artykuly', component: ArticlesListComponent, canActivate: [AuthGuard]},
  { path: 'dodaj-artykul', component: ArticleCreateComponent, canActivate: [AuthGuard]},
  { path: 'artykuly/:id', component: ArticleDetailsComponent, canActivate: [AuthGuard]},
  { path: 'edytuj-artykul/:id', component: ArticleUpdateComponent, canActivate: [AuthGuard]},
  { path: 'dodaj-recepture', component: RecipeCreatorComponent, canActivate: [AuthGuard]},
  { path: 'edytuj-recepture/:id', component: RecipeUpdateComponent, canActivate: [AuthGuard]},
  { path: 'receptury-publiczne', component: PublicRecipesListComponent, canActivate: [AuthGuard]},
  { path: 'moje-receptury', component: MyRecipesListComponent, canActivate: [AuthGuard]},
  { path: 'moje-warki', component: MyBatchesListComponent, canActivate: [AuthGuard]},
  { path: 'stworz-warke', component: BatchCreatorComponent, canActivate: [AuthGuard]},
  { path: 'receptury/:id', component: RecipeDetailsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
