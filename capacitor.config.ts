import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.attendance.app',
  appName: 'attendance_app',
  webDir: 'www',
  server:{
    androidScheme:'http',
    cleartext:true,
    allowNavigation:[
      'http://103.74.54.207:8092/api/*'
    ]
  }
};

export default config;
