import bcrypt from 'bcrypt';
import configuration from 'src/config/configuration';
import { EncryptionInterface } from '../interfaces';

export class BcryptEncryptionStrategy implements EncryptionInterface {
    async compare(chain: string, chainHashed: string): Promise<boolean> {
        return await bcrypt.compare(chain, chainHashed);
    }

    async encrypt(chain: string): Promise<string> {
        const saltRounds: number = configuration().encryption.bcrypt.saltRounds;
        return await bcrypt.hash(chain, saltRounds);
    }
}
