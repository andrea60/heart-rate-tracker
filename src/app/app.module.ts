import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ActionReducer, ActionReducerMap, MetaReducer, StoreModule } from '@ngrx/store';

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
import archiveReducers from './state/archive/archive.reducers';
import { environment } from 'src/environments/environment';
import { FakeBTDeviceService } from './services/bluetooth/fake-bt-device.service';
import { BluetoothService } from './services/bluetooth/bluetooth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppState } from './state/app.state';
import { localStorageSync } from 'ngrx-store-localstorage';
import * as Highcharts from 'highcharts';

import HighchartsTheme from '../themes/highcharts/highcharts-default.theme';
Highcharts.setOptions(HighchartsTheme);

const reducers: ActionReducerMap<AppState> = {
  user: userReducers,
  userParams: userParamsReducers,
  activitySession: activitySessionReducers,
  bluetooth: bluetoothConfigReducers,
  device: deviceReducers,
  archive: archiveReducers
};


export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  // register here which sub-states must be persistant
  return localStorageSync({keys: ['archive', 'bluetooth'], rehydrate: true })(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
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
