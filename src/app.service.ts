import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    constructor(private mailService: MailerService) {}
    async getHello(): Promise<string> {
        await this.mailService.sendMail({
            to: 'joseignacio4040@gmail.com', // list of receivers
            from: 'noreply@nestjs.com', // sender address
            subject: 'Testing Nest MailerModule ✔', // Subject line
            // text: 'welcome', // plaintext body
            template: 'welcome',
            context: {
                // Data to be sent to template engine.
                userName: 'Jose Gonzalez',
                companyName: 'Haciendola',
                url: 'https://haciendola.com/',
            },
        });
        return 'Hello World!';
    }
}
