export {};
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number | string;
      API_HOST: string;
      POSTGRES_HOST: string;
      POSTGRES_PORT_DB: number;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DB: string;
      CLOUD_NAME: string;
      CLOUD_API_KEY: string;
      CLOUD_API_SECRET: string;
    }
  }
}
