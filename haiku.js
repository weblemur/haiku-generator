var fs = require('fs');
var cmudictFile = readCmudictFile('./cmudict.txt');
var dict = formatData(cmudictFile);

function readCmudictFile(file){
  return fs.readFileSync(file).toString();
}

function formatData(data){
    var lines = data.toString().split('\n'),
        lineSplit, syllables, result = [];
    lines.forEach(function(line) {
      lineSplit = line.split('  ');
      if (lineSplit.length === 1) return;
      syllables = lineSplit[1].match(/\d/g);
      syllables === null ? syllables = 0 : syllables = syllables.length;
      if (result[syllables] === undefined) result[syllables] = [];
      result[syllables].push(lineSplit[0]);
    });
  return result;
}

function createHaiku(structure) {
  var words = [], word = '', haiku = '';
  structure.forEach(function(syllable) {
    words = dict[syllable];
    word = words[Math.floor(words.length * Math.random())];
    word = word.charAt(0) + word.slice(1).toLowerCase();
    haiku += word + '\n';
  });
  console.log(haiku);
}

module.exports.createHaiku = createHaiku;
