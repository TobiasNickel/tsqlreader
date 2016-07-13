var fs = require('fs');
var path = require('path');

function compileTemplates(queries){
    for(var i in queries){
        var query = queries[i];
        var pos = query.indexOf("${");
        var templateCount = 0;
        while(pos >-1){

            var endPos = query.indexOf("}",pos);
            if(endPos>-1){
                name = query.slice(pos+2,endPos).trim();
                if(!name){
                    throw new Error("templateSyntaxError in the query "+i+" (name not found)");
                }
                if(!queries[name]){
                    throw new Error("didn't found template "+name+" for the query "+i+" (name not found)");
                }
                query = query.slice(0,pos)+queries[name]+query.slice(endPos+1);
            }else{
                throw new Error("templateSyntaxError in the query "+i+" ");
            }
            pos = query.indexOf("${");
            templateCount++;
            if(templateCount>10000){
                throw new Error("the template "+i+" is propable recursive");
            }
        }
        queries[i]=query;
    }
}

function parseCode(code){
    var queries = {};
    for(i =0;i < rows.length;i++){
        var row = rows[i].trim();
        if(row.toLowerCase().indexOf("sql ")===0){
            name = row.slice(4).trim();
            if(!name){
                throw Error("the query at "+path+":"+i+" has no name");
            }
            query = "";
            for(i++;i < rows.length;i++){
                row = rows[i].trim();
                if(row.toLowerCase().trim()=="end"){
                    break;
                }
                if(row[0]=="#"){
                    continue;
                }
                query += " " + row;
            }
            queries[name] = query.trim();
        }
    }
    return queries
}

var parseSQLFileSync = function(filepath){
    // load the sourcecode
    var apsFilePath = path.resolve(process.cwd(),filepath);
    var code;
    var name;
    var i;
    var query;
    try{
        code = (fs.readFileSync(apsFilePath))+"";
    }catch(e){
        code = (fs.readFileSync(apsFilePath+".sql"))+"";
    }
    code = code.replace(/(\/\*([\s\S]*?)\*\/)|(\/\/(.*)$)/gm, '');
    rows = code.split('\n');
    // parse the queries
    var queries = parseCode(code);
    // support templateStrings
    compileTemplates(queries);
    return queries;
};

module.exports = {
    parseSQLFileSync:parseSQLFileSync,
    compileTemplates: compileTemplates,
    parseCode: parseCode
};