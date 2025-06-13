import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.AttendanceApps',
  appName: 'Mercury-Att',
  webDir: 'www',
  server:{
    androidScheme:'http',
    cleartext:true,
    allowNavigation:[
      'http://103.74.54.207:8032/api/*'
    ]
  }
  
};

export default config;
