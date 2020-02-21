import Express from 'express';
import * as Helmet from 'helmet';
import Morgan from 'morgan';

import { wordCountRoute } from './components/wordcount/routes';
import setupMongo from './db';
import { indexRoute } from './routes';

import Logger from './utils/logger';

const logger = Logger(__filename);

class ServerApp {
    public readonly app: Express.Application;
    constructor() {
        logger.debug('Starting constructor');
        this.app = Express();
        
        if(true) {
            if(1===1) {
                
                if(1===1) {
                    if(1===1) {
                        if(1===1) {
                            console.log('meep');
                        }
                    }
                }
            }
        }
    }

    public initServer(): void {
        setupMongo();
        this.expressConfig();
        this.helmetConfig();
        this.morganConfig();

        this.routerConfig();
        this.errorConfig();
    }

    private expressConfig(): void {
        logger.debug('Configuring Express default modules');
        this.app.use(Express.json());
        this.app.use(Express.urlencoded({ extended: true }));
        this.enableCORS();
    }

    private routerConfig(): void {
        logger.debug('Initializing routes');
        this.app.use('/', indexRoute);
        this.app.use('/api', wordCountRoute);
    }

    private errorConfig(): void {
        logger.debug('Initializing error handlers');
        this.app.use(this.clientErrorHandler);
        this.app.use(this.defaultErrorHandler);
        this.app.use('*', this.notFoundErrorHandler);
    }

    private notFoundErrorHandler(req: Express.Request, res: Express.Response): void {
        logger.error('404 page requested');
        const response = {
            code: 404,
            message: 'This page does not exist!',
            method: req.method,
            page: req.url
        };

        res.status(404).json(response);
    }

    private clientErrorHandler(
        error: Error,
        req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction
    ): void {
        if (req.xhr) {
            res.status(500).send({ error: 'Something failed!' });
        } else {
            next(error);
        }
    }

    private defaultErrorHandler(
        error: Error,
        req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction
    ): void {
        logger.error('Default Error Handler');
        if (!error) {
            if (next) {
                return next();
            }
            return res.end();
        }

        const response = {
            code: req.statusCode || '500',
            message: error.message,
            method: req.method,
            page: req.url
        };
        res.status(500).json(response);
    }

    private helmetConfig(): void {
        logger.debug('Configuring Helmet');
        this.app.use(Helmet.noCache());
    }

    private morganConfig(): void {
        logger.debug('Configuring Morgan');
        this.app.use(Morgan('dev'));
    }

    private enableCORS(): void {
        // http://johnzhang.io/options-request-in-express
        if (process.env.NODE_ENV !== 'production') {
            logger.debug('enableCORS for dev, needed for swagger-ui');
            this.app.use((req, res, next) => {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
                res.header(
                    'Access-Control-Allow-Headers',
                    'Content-Type, Authorization, Content-Length, X-Requested-With'
                );

                if ('OPTIONS' === req.method) {
                    res.send(204);
                } else {
                    next();
                }
            });
        }
    }
}

export { ServerApp };
