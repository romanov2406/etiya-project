import { AuthGuard } from './shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { MainPageComponent } from './pages/main-page/main-page.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { MainContentComponent } from './layout/layout-component/main-content/main-content.component';

const routes: Routes = [
  {path: 'main', component: MainContentComponent, children: [
      {path: 'main-page', component: MainPageComponent,canActivate:[AuthGuard]},
      {path: 'create-user', component: CreateUserComponent},
      {path: 'user-info', component: UserInfoComponent,canActivate:[AuthGuard]}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
