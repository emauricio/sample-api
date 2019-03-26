import * as Express from 'express';
const indexRoute = Express.Router();

indexRoute.get('/', (req, res, next) => {
    try {
        res.json({
            message: 'Hello Express'
        });
    } catch (e) {
        next(e);
    }
});

indexRoute.get('/callback', (req, res) => {
    res.json({
        message: 'OK'
    });
});

indexRoute.get('/error', () => {
    throw new Error('yo error');
});

export { indexRoute };
