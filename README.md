#tsqlreader

Load SQL-queries from a file. Inside the file you write multiple queries like that in a file:


```sql
sql someName
    SELECT * from something;
end
#some comment
/* 
multiline
comment
*/
// rest of line comment
sql queryUsingFragment
    SELECT ${fragment} from ${prefix}something
end

sql fragment
    fieldOne as f, fieldtwo as fieldtwo
end

```

As you see, this small lib supports commets and fragments in a simple format. 

```js
var sqlreader = require('tsqlreader');
var initialFragments = {
    prefix: 'wp_'
};
var queries = sqlreader.parseSQLFileSync('queries/domain.sql',initialFragments);

mysql.query(queries.myQuery,params,callback);
```

for now this is all you need. the path, provided can be absolute, or relative to the current file or relative to process.cwd(). 

InitialFragments is an optional parameter, to predefine fragmets. In this case, it is used to provide a prefix for the table.

[Motivation](http://tnickel.de/2016/07/14/loading-sql-queries-from-a-file/)


## Developer
[Tobias Nickel](http://tnickel.de/) German software developer in Shanghai. 
![alt text](https://avatars1.githubusercontent.com/u/4189801?s=150) 


