import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.AttendanceApps',
  appName: 'Mercury-Att',
  webDir: 'www',
  server:{
    androidScheme:'http',
    cleartext:true,
    allowNavigation:[
      'http://194.233.95.37:8032/api/*'
    ]
  }
  
};

export default config;
