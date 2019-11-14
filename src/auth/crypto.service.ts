import { pbkdf2Sync, randomBytes } from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoService {
  public hashPassword(password: string) {
    const salt = randomBytes(32).toString('hex');
    const hash = this.getHash(password, salt);
    return { salt, hash };
  }

  public checkPassword(originalHash: string, salt: string, candidatePassword: string) {
    const hash = this.getHash(candidatePassword, salt);
    return (hash === originalHash);
  }

  private getHash(password: string, salt: string) {
    return pbkdf2Sync(password, salt, 1024, 32, 'sha512').toString('hex');
  }
}
