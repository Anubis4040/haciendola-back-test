import { Injectable } from '@nestjs/common';
import { BcryptEncryptionStrategy } from 'src/shared/app/strategies';

@Injectable()
export class EncodeService {
    async encryptPassword(password: string): Promise<string> {
        return await new BcryptEncryptionStrategy().encrypt(password);
    }

    async comparePassword(password: string, passwordHashed: string): Promise<boolean> {
        return await new BcryptEncryptionStrategy().compare(password, passwordHashed);
    }
}
