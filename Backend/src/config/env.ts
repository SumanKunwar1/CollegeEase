import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4001;
const JWT_SECRET = process.env.JWT_SECRET as string;
const MONGO_URI = process.env.MONGO_URI as string;
const JWT_EXPIRE = process.env.JWT_EXPIRE || '30d';
const NODE_ENV = process.env.NODE_ENV || 'development';

export { PORT, JWT_SECRET, MONGO_URI, JWT_EXPIRE, NODE_ENV };