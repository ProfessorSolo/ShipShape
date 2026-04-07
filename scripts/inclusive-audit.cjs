const fs = require('fs');
const path = require('path');

const dirs = [
  '/Users/pjsolo/Dev/ProfessorSolo/shipshape/ShipShape-Site/src/content/docs/04-shipping-the-stack',
  '/Users/pjsolo/Dev/ProfessorSolo/shipshape/ShipShape-Site/src/content/docs/05-over-the-horizon'
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;

  // straightforward replacements
  newContent = newContent.replace(/\bYour\b/g, 'Our');
  newContent = newContent.replace(/\byour\b/g, 'our');
  newContent = newContent.replace(/\bYours\b/g, 'Ours');
  newContent = newContent.replace(/\byours\b/g, 'ours');
  newContent = newContent.replace(/\bYourself\b/g, 'Ourselves');
  newContent = newContent.replace(/\byourself\b/g, 'ourselves');
  newContent = newContent.replace(/\bYourselves\b/g, 'Ourselves');
  newContent = newContent.replace(/\byourselves\b/g, 'ourselves');

  // you -> us (objects)
  const objectYou = [
    'for', 'with', 'to', 'hands', 'gives', 'tells', 'helps', 'takes', 'allows', 'reminds', 'requires', 
    'spoil', 'spoils', 'let', 'lets', 'makes', 'make', 'give', 'keep', 'keeps', 'guide', 'guides',
    'teaching', 'show', 'shows', 'protect', 'protects', 'warn', 'warns', 'prevent', 'prevents', 'save', 'saves',
    'support', 'supports', 'assist', 'assists', 'help', 'ask', 'asks', 'instruct', 'instructs', 'tell',
    'remind', 'require', 'allow', 'of', 'from', 'about', 'on', 'at', 'toward', 'towards', 'against', 'by',
    'behind', 'beyond', 'inside', 'outside', 'without', 'within', 'under', 'over', 'into', 'intercepts', 'spoil'
  ];

  for (const verb of objectYou) {
    newContent = newContent.replace(new RegExp(`\\b${verb} you\\b`, 'gi'), (match) => {
      const isCapitalized = match[0] === match[0].toUpperCase();
      let replacementVerb = isCapitalized ? verb.charAt(0).toUpperCase() + verb.slice(1) : verb.toLowerCase();
      if (match === match.toUpperCase()) {
         return verb.toUpperCase() + ' US';
      }
      return replacementVerb + ' us';
    });
  }
  
  // you are -> we are
  newContent = newContent.replace(/\b[Yy]ou are\b/g, (match) => match[0] === 'Y' ? 'We are' : 'we are');
  newContent = newContent.replace(/\b[Yy]ou have\b/g, (match) => match[0] === 'Y' ? 'We have' : 'we have');
  newContent = newContent.replace(/\b[Yy]ou will\b/g, (match) => match[0] === 'Y' ? 'We will' : 'we will');

  // Default You/you
  newContent = newContent.replace(/\bYou\b/g, 'We');
  newContent = newContent.replace(/\byou\b/g, 'we');

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.mdx')) {
      processFile(fullPath);
    }
  }
}

dirs.forEach(walkDir);
