# Additional NestJS facts for better understanding


## Pipeline sequence

1. Middlewares

 - has request and responce, and handler for the next() aciton
 - next() should be called! this is important

```javascript
// app.module.ts
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(CustomMiddleware)
      .forRoutes('user');
  }
}
```

```javascript
// middlware.ts
@Injectable()
export class CustomMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    Logger.debug('Middleware');
    next();
  }
}
```

2. Guards

 - has context
 - goal - prevent request from execution if needed

```javascript
// guard.ts
@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    Logger.debug('Guard')
    return true;
  }
}
```

```javascript
// controller.ts
@UseGuards(RoleGuard)
// main.ts
app.useGlobalGuards()
```

3. Interceptors - part 1

 - has context and next handler
 - can specify some code before and after request execution

```javascript
// interceptor.ts
@Injectable()
export class PerformanceInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    Logger.debug('Interceptor started')
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => {
          Logger.debug('Interceptor completed')
        }),
      );
  }
}
```

```javascript
// controller.ts
@UseInterceptors(new PerformanceInterceptor())
// main.ts
app.useGlobalInterceptors()
```

4. Pipes

 - has value
 - can transform value - request arguments
 - can validate and stop execution by throwing exception 

```javascript
// pipe.ts
@Injectable()
export class LogPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    Logger.debug('Pipe');
    return value;
  }
}
```

```javascript
// controller.ts
@UsePipes(new LogPipe())
// main.ts
app.useGlobalPipes(new ValidationPipe());
```

5. Controller

6. Interceptors - part 2

7. Exception Filters

 - handle specific exception
 - correct Response

```javascript
// filter.ts
@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    Logger.debug('Exception');
  }
}
```

```javascript
// controller.ts
@UseFilters(new CustomExceptionFilter())
// main.ts
app.useGlobalFilters()
```
