import pino from 'pino';

const level = process.env.LOGGER_LEVEL;
let prettyPrint;
const env = process.env.NODE_ENV;

const envs = {
  local: 'local',
  dev: 'development',
  stage: 'staging',
  prod: 'production',
};

if (env === envs.local) {
  prettyPrint = {
    colorize: true,
    translateTime: false,
    ignore: 'pid,hostname',
  };
} else {
  prettyPrint = undefined;
}

export default pino({
  name: 'ecommerce-api',
  level,
  prettyPrint,
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
});
