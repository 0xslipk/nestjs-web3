import { NestFactory } from '@nestjs/core';
import { Module, Controller, Get } from '@nestjs/common';
import * as request from 'supertest';
import * as nock from 'nock';
import { Web3Module } from '../src';
import { platforms } from './utils/platforms';
import { extraWait } from './utils/extraWait';

describe('Web3 Module Initialization', () => {
  beforeEach(() => nock.cleanAll());

  beforeAll(() => {
    if (!nock.isActive()) {
      nock.activate();
    }

    // nock.recorder.rec();
    nock.disableNetConnect();
    nock.enableNetConnect('127.0.0.1');
  });

  afterAll(() => {
    nock.restore();
  });

  for (const PlatformAdapter of platforms) {
    describe(PlatformAdapter.name, () => {
      describe('forRoot', () => {
        it('should work', async () => {
          @Controller('/')
          class TestController {
            @Get()
            async get(): Promise<string> {
              return 'test';
            }
          }

          @Module({
            imports: [Web3Module.forRoot()],
            controllers: [TestController],
          })
          class TestModule {}

          const app = await NestFactory.create(
            TestModule,
            new PlatformAdapter(),
            { logger: false },
          );
          const server = app.getHttpServer();

          await app.init();
          await extraWait(PlatformAdapter, app);

          await request(server)
            .get('/')
            .expect(200)
            .expect((res) => {
              expect(res.text).toBe('test');
            });

          await app.close();
        });
      });
    });
  }
});
