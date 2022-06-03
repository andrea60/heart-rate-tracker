import { HRZonesConfig } from "src/app/models/hr-zones.config";

export const environment = {
  production: true,
  fakeDevice: false,
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
