const fs = require('fs');
const path = require('path');
function dataPath(fname){ return path.join(__dirname, '..', 'data', fname); }
function readJSON(fname){
  const p = dataPath(fname);
  if(!fs.existsSync(p)) return [];
  try { return JSON.parse(fs.readFileSync(p,'utf8')); } catch(e){ return []; }
}
function writeJSON(fname, data){
  const p = dataPath(fname);
  fs.writeFileSync(p, JSON.stringify(data, null, 2));
}
module.exports = { readJSON, writeJSON };
