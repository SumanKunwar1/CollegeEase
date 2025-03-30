import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Type assertion with more strict typing
const JWT_SECRET = process.env.JWT_SECRET as jwt.Secret;
const JWT_EXPIRE = process.env.JWT_EXPIRE || '30d';

interface TokenPayload {
  id: string;
}

const generateToken = (id: string): string => {
  return jwt.sign(
    { id } as object, // Explicitly type the payload as object
    JWT_SECRET,
    { expiresIn: JWT_EXPIRE } as jwt.SignOptions
  );
};

const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
};

export { generateToken, verifyToken };