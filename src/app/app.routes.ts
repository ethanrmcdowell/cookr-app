import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RecipeDisplayComponent } from './recipe-display/recipe-display.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'reset', component: ResetPasswordComponent},
    {path: 'user/:id', component: UserComponent},
    {path: 'recipe/:id', component: RecipeDisplayComponent},
];
