# Smells like and Angular Spirit - NestJS Backend Framework
## Step by Step workshop plan

**What's needed form a venue:**
 - internet and ability for audience to work with laptops
 - flip chart or whiteboard
 - TV screen or projector, can be small
 
**For trainer:**
 - create telegram channel for audience of particular event, add QR code to slides, post there all needed links
 - review sample repository
 - create initial repository in some branch of nester (starting point)

**For audience:**
 - prepare laptop to take with you for the event (mac, windows, linux)
 - install node 10+
 - install npm 6+
 - install VS Code or any other IDE to work with Typescript code
 - install docker
 - install telegram to have access to links and Q&A (including some support after the event)
 - 4 time slots, 1.5 hours each with breaks for coffee and lunch

**During the event:**

 - Before we start (to save some time) - Clone repository from github, checkout branch `step_0_intro`, run npm install 

## Part 1 - basic API Structure of NestJS

### Interactivity and warm up (15 min)

 - Meet audience, interact about their background, aims, why have they come (10 min)
 - Interact about 'what is good backend API for you' ? gather ideas and how to achieve them on the whiteboard or flip chart (10 min)
 - Split into the teams and draw the good backend in any form, share results, present to everyone (20 min)
 
### Part 1 - Intro into NestJS Parts (15 min)

 - Slides sharing, sample of code
 - Modules and controllers setup, HTTP verbs, settings, logging, routing
 - Dependency injection concepts

### Questions and discussion (15 min)

### Practical part #1 - create simple CRUD API together (45min)

 - We are doing code together, trainer shows things, create code, makes pauses. 
 - Audience either do coding by own pace, or follow trainer

### Coffee Break #1

## Part 2 - Request Handling Pipeline in NestJS

### Interactivity and warm up (15 min)

 - what we do with requests? gather necessary features of backend framework to handle requests
 - other important parts of REST API
 
### Theory and slides about requests API pipeline

 - show Nest capabilities in requests handling
 - differences between pipe, middleware, interceptor
 - practical samples of what can be achieved with it 

### Practical part #2 - work on API handlers pipeline (pipes, widdlewar ...) together (45min)

 - We are doing code together, trainer shows things, create code, makes pauses. 
 - Audience either do coding by own pace, or follow trainer

### Lunch Break

## Part 3 - Additional API Settings

### Interactivity and warm up (15 min)

 - discuss about what kind of settings API could have
 - how we store them, what's the best practices
 - testing

### Theory and slides about requests API pipeline

 - config
 - details about logging setup
 - swagger setup
 - tests samples, including setup

### Practical part #3 - work on API configuration and tests

 - Trainer will show a couple of basic things right in code
 - audience work on their own for 30-40 minutes
 - results sharing

### Coffee Break #2

## Part 4 - Authentication and deployment details

### Interactivity and warm up (15 min)

 - discuss authentication options, tokens, storage, ...
 - discuss deployment options

### Theory and slides about requests API pipeline

 - slides about JWT auth - principal aspects
 - how to setup JWT auth in NestJS
 - Deployment ideas for NestJS

### Practical part #4 - auth and docker

 - implement main setup for JWT Auth
 - Create Docker container together, test it

## Final conclusion and Sharing



 - in prepared branch create:
 - modules `user`, `auth`, `nest generate module auth`
 - controllers for API actions
 - services to load data
 - test from browser
 - tests for services and controllers

### Intro into NestJS



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

    
    
    
    - Install NestJS CLI `npm i -g @nestjs/cli`
        - In some folder Generate project `nest new new-project`
        - Navigate to the folder and Run `npm install`

    
    
    
