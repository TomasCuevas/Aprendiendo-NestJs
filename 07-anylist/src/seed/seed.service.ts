import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeedService {
  private isProd: boolean;

  constructor(private readonly configService: ConfigService) {
    this.isProd = configService.get('STATE') === 'prod';
  }

  //! execute seed
  async executeSeed() {
    if (this.isProd) {
      throw new UnauthorizedException('We cannot run SEED on production.');
    }

    return true;
  }
}
