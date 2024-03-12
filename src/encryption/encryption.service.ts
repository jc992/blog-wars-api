import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, scrypt } from 'crypto';
import { config } from 'dotenv';
import { promisify } from 'util';

config();

// TODO: check if best practice is to save to each post their own iv, or global app iv as env var
@Injectable()
export class EncryptionService {
  private readonly IV: Buffer = Buffer.from(
    process.env.ENCRYPTION_IV,
    'base64',
  );
  private readonly PASSWORD: string = process.env.ENCRYPTION_PASSWORD;
  private readonly SALT: string = process.env.ENCRYPTION_SALT;

  async encrypt(text: string): Promise<string> {
    const key = (await promisify(scrypt)(
      this.PASSWORD,
      this.SALT,
      32,
    )) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, this.IV);
    const encryptedContent = Buffer.concat([
      cipher.update(text),
      cipher.final(),
    ]);

    return encryptedContent.toString('base64');
  }
  async decrypt(text: string): Promise<string> {
    const content = Buffer.from(text, 'base64');
    const key = (await promisify(scrypt)(
      this.PASSWORD,
      this.SALT,
      32,
    )) as Buffer;
    const decipher = createDecipheriv('aes-256-ctr', key, this.IV);
    const decryptedContent = Buffer.concat([
      decipher.update(content),
      decipher.final(),
    ]);
    return decryptedContent.toString();
  }
}
