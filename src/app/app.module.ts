import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './modules/core/core.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClientModule } from './modules/client/client.module';
import { LayoutModule } from './modules/layout/layout.module';
import { UserProfileModule } from './modules/user-profile/user-profile.module';
import { MyManagerModule } from './my-manager/my-manager.module';
import { AppRoutingModule } from './app-routing.module';
import { AppSettings } from './app-settings';
import { AppComponent } from './root-component/app.component';


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
    LayoutModule,
    AuthModule,
    ClientModule,
    UserProfileModule,
    MyManagerModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
