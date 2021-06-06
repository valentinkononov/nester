import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserInMemoryRepository } from './user-inmemory.repository';
import { UserRepository } from './user.repository';
import { MeController } from './me.controller';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';

@Module({
  imports: [InMemoryDBModule.forRoot()],
  controllers: [UserController, MeController],
  providers: [
    UserService,
    // use particular implementation of repository interface
    { provide: UserRepository, useClass: UserInMemoryRepository },
  ],
  exports: [
    UserService,
    // needs to enable correct usage of UserService outside of UserModule
    { provide: UserRepository, useClass: UserInMemoryRepository },
  ],
})
export class UserModule {}
