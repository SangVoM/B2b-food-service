import dotenv from 'dotenv'
dotenv.config()

const ENV = {
  API_URL: 'http://localhost:3000',
  APP_PORT: '5000',
  DB_USER_NAME: 'b2b-user',
  DB_PASSWORD: 'brl8rMmRP2bhjfp5',
  DB_NAME: 'myFirstDatabase',
}

export const getEnv = (value) => ENV[value]

export const corsOptions = {
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'user_id'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  preflightContinue: false,
}

export const convertMongoObjectToJson = (data) => JSON.parse(JSON.stringify(data))

export const pagination = (query) => {
  let page = parseInt(query.page) - 1 || 0;
  let limit = parseInt(query.limit) || 10;

  return {
    page: page < 0 ? 0 : page,
    limit: limit < 0 ? 10 : limit > 300 ? 300 : limit
  };
}

export const generateOrderCode = (length = 6) => {
  let max = Math.pow(10, length) - 1;
  let min = Math.pow(10, length - 1);
  return Math.floor(Math.random() * (max - min) + min);
}

