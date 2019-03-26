import { NextFunction, Request, Response, Router } from 'express';
import { checkSchema } from 'express-validator/check';
import { countWords, getHtmlFromUrl } from './controller';
import { wordCountModel } from './model';
import { schema, validateErrors } from './validator';

const wordCountRoute = Router();

wordCountRoute.post(
    '/word-count',
    checkSchema(schema),
    validateErrors,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            // TODO Refactor
            const { keyword, url } = req.body;
            const foundCount = await wordCountModel.findOne({ keyword, url }).exec();
            let count;
            if (foundCount) {
                count = foundCount.count;
            } else {
                const html = await getHtmlFromUrl(url);
                count = countWords(html, keyword);

                const model = new wordCountModel({ keyword, url, count });
                await model.save();
            }

            res.json({ data: { count } });
        } catch (e) {
            next(e);
        }
    }
);

export { wordCountRoute };
