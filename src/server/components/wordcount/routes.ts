import * as Express from 'express';
import { countWords, getHtmlFromUrl, validateUrl } from './controller';
const wordcountRoute = Express.Router();

wordcountRoute.post('/', async (req, res, next) => {
    try {
        const { keyword, url } = req.body;

        if (!validateUrl(url)) {
            throw new Error('Invalid url');
        }

        const html = await getHtmlFromUrl(url);
        const count = countWords(html, keyword);

        res.json({data: { count }});
    } catch (e) {
        next(e);
    }
});

export { wordcountRoute };
