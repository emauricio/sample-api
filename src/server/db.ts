import mongoose from 'mongoose';
import Logger from './utils/logger';

const logger = Logger(__filename);

function setUpConnection() {
    // TODO: get form config file or env
    const mongoPath = process.env.MONGO_PATH || 'localhost:27017/sample';
    const mongoUri = `mongodb://${mongoPath}?authSource=admin`;
    const mongooseOptions = {
        dbName: 'sample',
        keepAlive: true,
        keepAliveInitialDelay: 300000,
        pass: 'rootPass',
        useNewUrlParser: true,
        user: 'root'
    };

    mongoose
        .connect(mongoUri, mongooseOptions)
        .then(() => {
            logger.debug('Connected to mongodb');
        })
        .catch(e => {
            logger.error('Error connecting to database: ', e);
            process.exit(1);
        });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            logger.error('App terminated, closing mongo connections');
            process.exit(0);
        });
    });
}

export default () => {
    setUpConnection();
    mongoose.connection.on('disconnected', setUpConnection);
};
