export interface EncryptionInterface {
    compare(chain: string, chainHashed: string): Promise<boolean>;
    encrypt(chain: string): Promise<string>;
}
