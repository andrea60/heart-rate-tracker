import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { UserEffect } from './state/user/user.effects';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import userReducers from './state/user/user.reducers';
import userParamsReducers from './state/user-params/user-params.reducers';
import activitySessionReducers from './state/activity-session/activity-session.reducers';
import { ActivitySessionEffects } from './state/activity-session/activity-session.effects';
import bluetoothConfigReducers from './state/bluetooth/bluetooth-config.reducers';
import { DeviceEffect } from './state/device/device.effect';
import deviceReducers from './state/device/device.reducers';
import { environment } from 'src/environments/environment';
import { FakeBTDeviceService } from './services/bluetooth/fake-bt-device.service';
import { BluetoothService } from './services/bluetooth/bluetooth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      user: userReducers,
      'user-params': userParamsReducers,
      'activity-session': activitySessionReducers,
      bluetooth: bluetoothConfigReducers,
      device: deviceReducers
    }),
    EffectsModule.forRoot([UserEffect, ActivitySessionEffects, DeviceEffect]),
    StoreDevtoolsModule.instrument({}),
    FontAwesomeModule,
  ],
  providers: [
    { provide: 'IBluetoothService', useClass: environment.fakeDevice ? FakeBTDeviceService : BluetoothService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
