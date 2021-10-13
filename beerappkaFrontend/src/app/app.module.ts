import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';

import {NgxPaginationModule} from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { PageTopBarComponent } from './components/page-top-bar/page-top-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { AlcoholLevelCalculatorComponent } from './components/alcohol-level-calculator/alcohol-level-calculator.component';
import { UserService } from './services/user.service';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from "./auth/auth.interceptor";
import { RecipeCreatorComponent } from './components/recipe-creator/recipe-creator.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { ChangePasswordComponent } from './components/profile/change-password/change-password.component';
import { DeleteAccountComponent } from './components/profile/delete-account/delete-account.component';
import { BrewersListComponent } from './components/brewers-list/brewers-list.component';
import { BrewerDetailsComponent } from './components/brewer-details/brewer-details.component';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { ArticleCreateComponent } from './components/article-create/article-create.component';
import { ArticleUpdateComponent } from './components/article-update/article-update.component';
import { GravityCalculatorComponent } from './components/gravity-calculator/gravity-calculator.component';
import { CarbonationCalculatorComponent } from './components/carbonation-calculator/carbonation-calculator.component';
import { PublicRecipesListComponent } from './components/public-recipes-list/public-recipes-list.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { PasswordResetFinishComponent } from './components/password-reset-finish/password-reset-finish.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { MyRecipesListComponent } from './components/my-recipes-list/my-recipes-list.component';
import { GravityCorrectionCalculatorComponent } from './components/gravity-correction-calculator/gravity-correction-calculator.component';
import { MyBatchesListComponent } from './components/my-batches-list/my-batches-list.component';
import { BatchCreatorComponent } from './components/batch-creator/batch-creator.component';

registerLocaleData(localePl);

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    PageTopBarComponent,
    SidebarComponent,
    TopbarComponent,
    FooterComponent,
    DashboardComponent,
    AlcoholLevelCalculatorComponent,
    RecipeCreatorComponent,
    ProfileComponent,
    UpdateProfileComponent,
    ChangePasswordComponent,
    DeleteAccountComponent,
    BrewersListComponent,
    BrewerDetailsComponent,
    ArticlesListComponent,
    ArticleDetailsComponent,
    ArticleCreateComponent,
    ArticleUpdateComponent,
    GravityCalculatorComponent,
    CarbonationCalculatorComponent,
    PublicRecipesListComponent,
    PasswordResetComponent,
    PasswordResetFinishComponent,
    RecipeDetailsComponent,
    MyRecipesListComponent,
    GravityCorrectionCalculatorComponent,
    MyBatchesListComponent,
    BatchCreatorComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],

  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: LOCALE_ID, useValue: 'pl-PL',
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
