import { Module } from '@nestjs/common';

//* adapters *//
import { AxiosAdapter } from './adapters/axios.adapter';

@Module({
  providers: [AxiosAdapter],
  exports: [AxiosAdapter],
})
export class CommonModule {}
