// jwt.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor(private configService: ConfigService) { }

    use(req: Request, res: Response, next: NextFunction) {
        const accessTokenSecret = this.configService.get<string>('ACCESS_TOKEN_SECRET');

        // Extract token from request headers
        const token = req.headers['authorization']?.split(' ')[1];

        if (token) {
            try {
                // Verify token
                const decoded = jwt.verify(token, accessTokenSecret);
                req['user'] = decoded; // Attach decoded user to request object
            } catch (error) {
                // Token verification failed
                console.log('Token verification failed:', error);
            }
        }

        next();
    }
}
