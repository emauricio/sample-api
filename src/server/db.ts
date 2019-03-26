import mongoose from 'mongoose';
import Logger from './utils/logger';

const logger = Logger(__filename);

function setUpConnection() {
    // TODO: get form config file
    const db = 'mongodb://root:rootPass@localhost:27017/sample?authSource=admin';
    const mongooseOptions = {
        useNewUrlParser: true
    };

    mongoose.connect(db, mongooseOptions).then(() => {
        logger.debug('Connected to mongodb');
    }).catch(e => {
        logger.error('Error connecting to database: ', e);
        process.exit(1);
    });
}

export default () => {
    setUpConnection();
    mongoose.connection.on('disconnected', setUpConnection);
};
