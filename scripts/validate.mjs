import { assertValid, loadContent } from './content.mjs';

const data = loadContent();
assertValid(data);
console.log(`Validated ${data.entries.length} entries.`);
