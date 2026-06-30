import * as lucide from 'lucide-react';
import fs from 'fs';

const keys = Object.keys(lucide).sort();
fs.writeFileSync('scratch/lucideKeys.txt', keys.join('\n'));
console.log('Successfully wrote', keys.length, 'keys to scratch/lucideKeys.txt');
