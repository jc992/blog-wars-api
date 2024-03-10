import { config } from 'dotenv';

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};

config();
