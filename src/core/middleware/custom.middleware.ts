import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class CustomMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void): any {
        Logger.debug('Middleware');
        next();
    }
}
