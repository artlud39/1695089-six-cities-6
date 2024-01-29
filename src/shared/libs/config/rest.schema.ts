import convict from 'convict';

export type RestSchema = {
  PORT: number;
}

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'port for incoming connection',
    format: 'port',
    env: 'PORT',
    default: 4000
  }
});
