sql simpleSomething
    select * from something;
end

# here we have some comment

/*
  multi like comment
*/

/*
sql multilineWithquery
    select * from notExist;
end
*/

sql insertIntoSomethig
#some comment for this query
// we can also use this kind of comment
    INSERT INTO something (some, different, content)
      values (?, ?, ?);
end