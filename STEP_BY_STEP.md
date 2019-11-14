# Step by Step guide created for GDG Dev fest Gorky 2019

1. Install CLI of nestjs `npm i -g @nestjs/cli` 

2. Generate project `nest new new-project`

3. Create modules `auth`, `user`: `nest generate module auth`

4. Setup configuration - 
```shell script
npm i app-root-path --save
npm i dotenv --save
npm i nest-winston --save
npm i winston --save
```

 - we will use dotenv, but I don't like idea to call process.NODE_ENV every time
 - setup class config.ts, use process.DOT_ENV there

```javascript
import * as dotenv from 'dotenv';
dotenv.config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env' });

export default {
  api: {
    port: process.env.PORT,
    root: process.env.ROOT,
    version: '0.1',
  },
...
```

 - use it in main.ts

5. Setup logging

```javascript
// app.module.ts
WinstonModule.forRoot(logConfig.winstonOptions),
```

```javascript
// log-config.ts
import * as winston from 'winston';
import * as appRoot from 'app-root-path';
import config from './config';

export default {
  winstonOptions: {
    transports: [
      new winston.transports.File({
        level: config.log.file.level,
        dirname: `${appRoot}/${config.log.file.dirName}`,
        filename: config.log.file.fileName,
        handleExceptions: true,
        maxsize: config.log.file.maxSize,
        maxFiles: config.log.file.maxFiles,
      }),
      new winston.transports.Console({
        level: config.log.console.level,
        handleExceptions: true,
      }),
    ],
    exitOnError: false,
  },
};
```

- from now we can simply use Logger from '@nestjs/common' - and we will have our cool Winston logger

6. Additional Settings

```shell script
npm i compression --save
```

```javascript
// main.ts
app.use(compression());
```

7. User Module and in memory data base

 - create user controller / me controller
 - create user interfaces - entities 
 - create user service
 - create abstract repository
 - `InMemoryDBModule.forRoot(),` import into User Module
 - create implementation of it with memory db
 - use `{ provide: UserRepository, useClass: UserInMemoryRepository },` in both provides and exports

```shell script
npm i @nestjs-addons/in-memory-db --save
```

8. Authentication

```shell script
npm i @nestjs/jwt --save
npm i @nestjs/passport --save
npm i passport --save
npm i passport-jwt --save
npm i passport-local --save
```

 - auth controller
 - auth module configuration
 
```javascript
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: config.auth.jwt.secret,
      privateKey: config.auth.jwt.secret,
      signOptions: {
        // expiresIn: 180, // config.auth.jwt.ttl,
      },
    }),
```

 - settings in config.ts and .env
 - add strategies for local (login) and jwt - token validation
 - auth service and interfaces
 - add UseGuards for controllers

9. Setup Swagger

```shell script
npm i @nestjs/swagger --save
npm i swagger-ui-express --save
```

 - main.ts setup

```javascript
function initSwagger(app) {
  const options = new DocumentBuilder()
    .setTitle('Nester API')
    .setDescription('description')
    .setVersion(config.api.version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
}
```

 - decorators setup for entities and for controllers
 
```javascript
@ApiUseTags('auth')
@ApiBearerAuth()
@ApiModelProperty()
```
 
 - test swagger

10. Add requests / entities validation

```shell script
npm i class-transformer --save
npm i class-validator --save
```


11. Testing

 - write test for user controller

12. Interceptors, guards

    
    
    
    
