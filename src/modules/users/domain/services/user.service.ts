import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repositories';
import { User } from '../entities';
import { UniqueService } from 'src/modules/common/domain/services';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {
    constructor(
        private readonly repository: UserRepository,
        private readonly uniqueService: UniqueService,
        private readonly jwtService: JwtService,
        private configService: ConfigService,
        private mailerService: MailerService,
    ) {}

    async validate(entity: User): Promise<void> {
        void (await this.uniqueService.validate<User>({
            repository: UserRepository,
            validate: {
                email: entity.email,
                userName: entity.userName,
            },
            refValue: entity.id,
        }));
    }

    async findUserByEmailOrUserName(value: string): Promise<User> {
        return this.repository.findByEmailOrUserName(value);
    }

    generateReverToken(user: User): string {
        return this.jwtService.sign({ id: user.id }, { expiresIn: '1h' });
    }

    async sendRecoverEmail(user: User): Promise<void> {
        const token = this.generateReverToken(user);
        await this.mailerService.sendMail({
            to: 'joseignacio4040@gmail.com', // Hardcode for testing and smtp server limtations
            from: 'noreply@haciendola.com', // sender address
            subject: 'Recovery password',
            template: 'welcome',
            context: {
                // Data to be sent to template engine.
                userName: 'Jose Gonzalez',
                companyName: 'Haciendola',
                url: `${this.configService.getOrThrow<string>('server.url.web')}/new-password?token=${token}`,
            },
        });
    }
}
