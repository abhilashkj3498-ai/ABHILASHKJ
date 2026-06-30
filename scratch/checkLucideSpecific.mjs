import * as lucide from 'lucide-react';

const keys = Object.keys(lucide);
const queries = ['chrome', 'figma', 'slack', 'gitlab', 'dribbble', 'behance'];
queries.forEach(q => {
  const matches = keys.filter(k => k.toLowerCase().includes(q));
  console.log(`Matches for "${q}":`, matches);
});
