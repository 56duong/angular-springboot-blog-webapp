import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.duong.postshare',
  appName: 'PostShare',
  webDir: 'dist/frontend',
  server: {
    androidScheme: "https",
    cleartext: true,
    url: "https://postshare.victoriousmeadow-63b25505.australiaeast.azurecontainerapps.io",
    allowNavigation: [
      "https://postshare.victoriousmeadow-63b25505.australiaeast.azurecontainerapps.io"
    ]
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
