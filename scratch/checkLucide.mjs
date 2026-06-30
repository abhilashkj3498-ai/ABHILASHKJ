import * as lucide from 'lucide-react';

console.log('Available Lucide exports:');
const keys = Object.keys(lucide);
console.log(`Total exports: ${keys.length}`);
console.log('Sample exports:', keys.slice(0, 100));

// Look for anything containing instagram or linkedin (case-insensitive)
const matched = keys.filter(k => k.toLowerCase().includes('insta') || k.toLowerCase().includes('link') || k.toLowerCase().includes('mail') || k.toLowerCase().includes('phone'));
console.log('\nMatched icons:', matched);
