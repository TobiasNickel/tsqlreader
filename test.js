var sqlreader = require('./index');

var queries = sqlreader.parseSQLFileSync('./test/test')

console.log('ok');