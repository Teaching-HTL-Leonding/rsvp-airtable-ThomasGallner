import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestListComponent } from './guest-list/guest-list.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'register'},
  {path: 'register', component: RegisterComponent},
  {path: 'guest-list', component: GuestListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
