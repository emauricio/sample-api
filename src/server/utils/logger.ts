import { LoggingWinston } from '@google-cloud/logging-winston';
import { basename } from 'path';
import { createLogger, format, transports } from 'winston';

/**
 * Recommended from
 * https://github.com/winstonjs/winston#usage
 */

const Logger = (name: string) => {
    const logger = createLogger({
        level: 'info'
    });

    /**
     * console transport and format
     * note: splat string format doc
     * https://nodejs.org/dist/latest/docs/api/util.html#util_util_format_format_args
     */

    const cliFormat = format.combine(
        format.errors({ stack: true }),
        format.splat(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.label({ label: basename(name) }),
        format.colorize({ all: true }),
        format.align(),
        format.printf(({ level, message, label, timestamp }) => {
            return `${timestamp} [${label}] ${level}: ${message}`;
        })
    );

    const consoleTransport = new transports.Console({
        format: cliFormat,
        handleExceptions: true,
        level: 'silly'
    });

    const stackDriverTransport = new LoggingWinston();

    if (process.env.NODE_ENV !== 'production') {
        logger.add(consoleTransport);
    } else {
        logger.add(stackDriverTransport);
    }

    return logger;
};

export default function(name: string) {
    return Logger(name);
}
