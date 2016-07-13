#tsqlreader

after working with bearcat-dao I enjoyed the automatic parsing of .sql-files, but its implementation has some significant drawbacks. My mean issue is that all queries drop into a single namespace. means: if you use the same name for two queries, you don't get an error, so that the bug is hidden under a surface.

this loader for now, is made to load a single file and provide the containing queries in a simple object.

```js
var sqlreader = require('tsqlreader');
var queries = sqlreader.parseSQLFileSync('queries/domain.sql');

mysql.query(queries.myQuery,params,callback);
```
