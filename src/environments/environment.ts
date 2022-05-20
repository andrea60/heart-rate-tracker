// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  fakeDevice: true,
  zonesConfig: {
    '0': {
      color:'#00B4D8',
      percFrom: 50, 
      percTo: 60,
      label: 'Rest'
    },
    '1': {
      color: '#69B34C',
      percFrom: 60, 
      percTo: 70,
      label: 'Metabolism'
    },
    '2': {
      color:'#FF8E15',
      percFrom: 70,
      percTo: 80,
      label: 'Endurance'
    }, 
    '3': {
      color: '#FF4E11',
      percFrom: 80,
      percTo: 90,
      label: 'Power'
    }, 
    '4': {
      color:'#FF0D0D',
      percFrom: 90,
      percTo: 100,
      label: 'Max Power'
    }
  } as HRZonesConfig
};

import { HRZonesConfig } from 'src/app/models/hr-zones.config';
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
