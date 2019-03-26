import { NextFunction, Request, Response } from 'express';
import { validationResult, ValidationSchema } from 'express-validator/check';
import Logger from '../../utils/logger';
const logger = Logger(__filename);

const schema: ValidationSchema = {
    keyword: {
        errorMessage: 'There is a problem with the keyword',
        in: ['body', 'params'],
        isString: true,
        trim: true
    },
    url: {
        errorMessage: 'Invalid url',
        in: ['body', 'params'],
        isURL: true,
        trim: true
    }
};

function validateErrors(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error(errors.mapped());
        res.status(422).json({ errors: errors.mapped() });
    } else {
        next();
    }
}

export { validateErrors, schema };
