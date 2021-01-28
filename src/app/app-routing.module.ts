import { AuthGuard } from './shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { MainPageComponent } from './pages/main-page/main-page.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { MainContentComponent } from './layout/layout-component/main-content/main-content.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileGuard } from './shared/guards/profile.guard';
const routes: Routes = [
  { path: 'profile', component: ProfileComponent,canActivate:[ProfileGuard] },
  {
    path: 'main', component: MainContentComponent, children: [
      { path: 'main-page', component: MainPageComponent, canActivate:[ProfileGuard] },
      { path: 'create-user', component: CreateUserComponent },
      { path: 'user-info', component: UserInfoComponent, canActivate:[ProfileGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
