import { ServerApp } from '../index';
import Logger from '../utils/logger';

const logger = Logger(__filename);

const PORT = normalizePort(process.env.PORT || '3000');

startServer().catch(error => {
    logger.error(error);
    process.exit(-1);
});

async function startServer(): Promise<void> {
    const serverApp = new ServerApp();
    await serverApp.initServer();

    const server = serverApp.app.listen(PORT);

    server.on('error', (error: NodeJS.ErrnoException) => {
        if (error.syscall !== 'listen') {
            throw error;
        }
        const bind = typeof PORT === 'string' ? `pipe ${PORT}` : `port ${PORT}`;
        switch (error.code) {
            case 'EACCES':
                logger.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                logger.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    });

    server.on('listening', () => {
        const addr = server.address();
        if (addr) {
            const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
            logger.debug(`Listening on ${bind}`);
        }
    });
}

function normalizePort(val: string): string | boolean | number {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
