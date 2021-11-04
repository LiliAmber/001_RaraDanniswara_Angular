import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AddCardFormComponent } from './add-card-form/add-card-form.component';
import { CardTableComponent } from './card-table/card-table.component';
import { EditCardFormComponent } from './edit-card-form/edit-card-form.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: '', redirectTo: '/signin', pathMatch: 'full'}, 
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'home', component: CardTableComponent, canActivate: [AuthGuard]},
  {path: 'addCard', component: AddCardFormComponent},
  {path: 'card/:id', component: EditCardFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
