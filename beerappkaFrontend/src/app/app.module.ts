import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { PageTopBarComponent } from './page-top-bar/page-top-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { AlcoholLevelCalculatorComponent } from './alcohol-level-calculator/alcohol-level-calculator.component';
import { UserService } from './services/user.service';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from "./auth/auth.interceptor";
import { RecipeCreatorComponent } from './recipe-creator/recipe-creator.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { DeleteAccountComponent } from './profile/delete-account/delete-account.component';
import { BrewersListComponent } from './components/brewers-list/brewers-list.component';
import { BrewerDetailsComponent } from './components/brewer-details/brewer-details.component';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';

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
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],

  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
