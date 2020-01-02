import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ErrorInterceptor } from 'src/sdk/core/httpinterceptor.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { StreamPopoverComponent } from './stream/stream-popover/stream-popover.component';
import { MemberPopoverComponent } from './member/member-popover/member-popover.component';
import { ProfilePopoverComponent } from './profile/profile-popover/profile-popover.component';
import { AddnewmaterialComponent } from './stream/addnewmaterial/addnewmaterial.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    StreamPopoverComponent,
    MemberPopoverComponent,
    ProfilePopoverComponent,
  AddnewmaterialComponent
],
  entryComponents: [
    StreamPopoverComponent,
    MemberPopoverComponent,
    ProfilePopoverComponent,
    AddnewmaterialComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    ReactiveFormsModule,
    AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
