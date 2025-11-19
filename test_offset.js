const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf-8');
const match = html.match(/<section class="pain"[\s\S]*?<\/section>/);
console.log((html.split('<section class="pain"')[0].match(/\n/g)||[]).length + 1);
