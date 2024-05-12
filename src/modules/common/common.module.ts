import { Global, Module } from '@nestjs/common';
import { UniqueService } from './domain/services';

@Global()
@Module({
    providers: [UniqueService],
    exports: [UniqueService],
})
export class CommonModule {}
