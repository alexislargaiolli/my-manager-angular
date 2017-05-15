import {ClientModule} from './client/client.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from 'app/core/core.module';
import { AuthenticationModule } from 'app/auth/authentication.module';
import { MyManagerModule } from 'app/my-manager/my-manager.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppSettings } from 'app/app-settings';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule.forRoot({
      baseUrl: AppSettings.API_ENDPOINT,
      loginEndpoint: AppSettings.LOGIN_ENDPOINT,
      logoutEndpoint: AppSettings.LOGOUT_ENDPOINT
    }),
    AuthenticationModule,
    ClientModule,
    MyManagerModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
