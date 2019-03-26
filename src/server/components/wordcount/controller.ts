import * as requestp from 'request-promise-native';

export function countWords(text: string, keyword: string ): number {
    const regex = `\\b${keyword}\\b`;
    const matches = text.match(new RegExp(regex, 'gim'));

    if (matches) {
        // save to DB
        return matches.length;
    }

    return 0;
}

export async function getHtmlFromUrl(url: string): Promise<string> {
    const options = {
        headers: {
            'User-Agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) ' +
                'Chrome/73.0.3683.75 Safari/537.36'
        }
    };

    try {
        return await requestp.get(url, options);
    } catch (e) {
        throw new Error(`Unable to load content for: ${url}`);
    }
}