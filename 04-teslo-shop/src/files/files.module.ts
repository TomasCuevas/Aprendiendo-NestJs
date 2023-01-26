import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

//* controllers *//
import { FilesController } from './files.controller';

//* services *//
import { FilesService } from './files.service';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [ConfigModule],
})
export class FilesModule {}
