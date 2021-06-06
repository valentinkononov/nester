import { pbkdf2Sync, randomBytes } from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoService {
  public hashPassword(password: string): { salt: string; hash: string } {
    const salt = randomBytes(32).toString('hex');
    const hash = CryptoService.getHash(password, salt);
    return { salt, hash };
  }

  public checkPassword(
    originalHash: string,
    salt: string,
    candidatePassword: string,
  ): boolean {
    const hash = CryptoService.getHash(candidatePassword, salt);
    return hash === originalHash;
  }

  private static getHash(password: string, salt: string): string {
    return pbkdf2Sync(password, salt, 1024, 32, 'sha512').toString('hex');
  }
}
