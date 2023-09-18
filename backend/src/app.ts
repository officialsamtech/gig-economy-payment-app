import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { useExpressServer, getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import db, { init as dbInit } from './database';
import authRoutes from './controllers/authController';
import profileRoutes from './controllers/profileController';
import { verifyToken } from './middlewares/authMiddleware';
import errorMiddleware from './middlewares/error.middleware';
import { logger, stream } from './utils/logger';
import swaggerUi from 'swagger-ui-express';
const { defaultMetadataStorage } = require('class-transformer/cjs/storage');

// Initialize database
dbInit();

class App {
    public app: express.Application;
    public port: string | number;
    public env: string;

    constructor(Controllers: Function[]) {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.env = process.env.NODE_ENV || 'development';

        this.initializeMiddlewares();
        this.initializeSwagger(Controllers);
        this.initializeRoutes(Controllers);
        this.initializeErrorHandling();
    }

    public listen() {
        this.app.listen(this.port, () => {
            logger.info(`🚀 App listening on the port ${this.port}`);
        });
    }

    private initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(morgan('dev', { stream }));
    }

    private initializeRoutes(controllers: Function[]) {
        // Auth and Profile routes
        this.app.use('/api/auth', authRoutes);
        this.app.use('/api/profile', verifyToken, profileRoutes);

        // Additional routes from real app.ts
        useExpressServer(this.app, {
            cors: {
                origin: '*',
                credentials: true,
            },
            controllers: controllers,
            defaultErrorHandler: false,
        });
    }

    private initializeSwagger(controllers: Function[]) {
        const schemas = validationMetadatasToSchemas({
            classTransformerMetadataStorage: defaultMetadataStorage,
            refPointerPrefix: '#/components/schemas/',
        });

        const routingControllersOptions = {
            controllers: controllers,
        };

        const storage = getMetadataArgsStorage();
        const spec = routingControllersToSpec(storage, routingControllersOptions, {
            components: {
                schemas: schemas as any,
                securitySchemes: {
                    basicAuth: {
                        scheme: 'basic',
                        type: 'http',
                    },
                },
            },
            info: {
                description: 'Generated with `routing-controllers-openapi`',
                title: 'A sample-rapyd app API',
                version: '1.0.0',
            },
        });

        this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(spec));
    }


    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }
}

export default App;
