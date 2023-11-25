declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT: string;
      DATABASE_URI: string;
      SECRET_ACCESS_TOKEN: string;
      REFRESH_ACCESS_TOKEN: string;
    }
  }
}
export {}