import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ToastrModule } from 'ngx-toastr';



import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';


import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/layout-component/header/header.component';
import { SidebarComponent } from './layout/layout-component/sidebar/sidebar.component';
import { MainContentComponent } from './layout/layout-component/main-content/main-content.component';
import { FooterComponent } from './layout/layout-component/footer/footer.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SearchPipe } from './shared/pipes/search.pipe';
import { NgxsModule, State } from '@ngxs/store';
import { UsersState } from './shared/store/state/users.state';
import { NgxsFirestoreModule } from '@ngxs-labs/firestore-plugin';
import { ProfileComponent } from './pages/profile/profile.component';
import { NgxUiLoaderModule } from "ngx-ui-loader";




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    MainContentComponent,
    MainPageComponent,
    FooterComponent,
    UserInfoComponent,
    CreateUserComponent,
    SearchPipe,
    ProfileComponent
  ],
  imports: [
    NgxsModule.forRoot([UsersState]),

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    MatTableModule,
    MatSidenavModule,
    ModalModule,
    NgxsModule.forRoot([UsersState]),
    NgxsFirestoreModule.forRoot(),
    NgxUiLoaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
