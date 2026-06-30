import fs from 'fs';

function checkBraces(filepath) {
  const content = fs.readFileSync(filepath, 'utf8');
  let openCount = 0;
  let lines = content.split('\n');
  let unmatchedOpen = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let char of line) {
      if (char === '{') {
        openCount++;
        unmatchedOpen.push(i + 1);
      } else if (char === '}') {
        openCount--;
        unmatchedOpen.pop();
        if (openCount < 0) {
          console.log(`Error: Unmatched closing brace '}' on line ${i + 1} of ${filepath}`);
          return false;
        }
      }
    }
  }

  if (openCount > 0) {
    console.log(`Error: ${openCount} unmatched open brace(s) '{' in ${filepath}. Unmatched lines:`, unmatchedOpen);
    return false;
  }

  console.log(`Braces in ${filepath} are balanced.`);
  return true;
}

checkBraces('src/components/Hero.css');
checkBraces('src/index.css');
