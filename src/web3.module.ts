import { Module, DynamicModule } from '@nestjs/common';
import { Web3CoreModule } from './web3-core.module';

@Module({})
export class Web3Module {
  static forRoot(): DynamicModule {
    return {
      module: Web3Module,
      imports: [Web3CoreModule.forRoot()],
    };
  }

  static forRootAsync(): DynamicModule {
    return {
      module: Web3Module,
      imports: [Web3CoreModule.forRootAsync()],
    };
  }
}
