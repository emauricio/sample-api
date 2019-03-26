import { countWords } from './controller';

it('Expect to find 2', () => {
    const html = '<p>fit, <a href="#test">fit</a>, fitting, <b>fitttt</b>, fatt</p>';
    const total = countWords(html, 'fit');
    expect(total).toBe(2);
});

it('Expect to find 0', () => {
    const html = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non ante dictum, molestie massa';
    const total = countWords(html, 'fit');
    expect(total).toBe(0);
});