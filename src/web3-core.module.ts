import { DynamicModule, Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [],
  exports: [],
})
export class Web3CoreModule {
  static forRoot(): DynamicModule {
    return {
      module: Web3CoreModule,
      providers: [],
      exports: [],
    };
  }

  static forRootAsync(): DynamicModule {
    return {
      module: Web3CoreModule,
      imports: [],
      providers: [],
      exports: [],
    };
  }
}
