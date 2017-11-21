var db = new window.SQL.Database();
/**
 *
 * @param {Object} tableName
 * @param {Object} headType
 */
function createTable(tableName, headType) {
    tableName = encodeKeyToId(tableName);
    var sqlstr = "DROP TABLE IF EXISTS " + tableName + ";";
    sqlstr += "CREATE TABLE " + tableName + "(";
    for (var key in headType) {
        key = encodeKeyToId(key);
        if (headType[key] == 'date') {
            sqlstr += key + " " + headType[key];
        } else if (headType[key] == 'measure') {
            sqlstr += key + " " + "float";
        } else {
            sqlstr += key + " " + "char";
        }
        sqlstr += ",";
    }
    sqlstr = sqlstr.substr(0, sqlstr.length - 1);
    sqlstr += ");";
    db.run(sqlstr);
}

function encodeKeyToId(key) {
    if (/^[0-9]/.test(key)) {
        key = "_" + key;
    }
    return key.replace(new RegExp(" ", "gm"), "_");
}

function decodeKeyFromId(key) {
    if (/^_/.test(key)) {
        key = key.substr(1, key.length);
    }
    return key.replace(new RegExp("_", "gm"), " ");
}

function insertTable(tableName, content) {
	tableName = encodeKeyToId(tableName);
	db.run("BEGIN");
	var totalInsert = ""
	content.forEach(function(e) {
		var keys = "";
		var values = "";
		var insertStr = "INSERT INTO " + tableName;
		for (var key in e) {
			values += "'" + e[key] + "',";
			key = encodeKeyToId(key);
			keys += key + ",";
		}
		keys = keys.substr(0, keys.length - 1);
		values = values.substr(0, values.length - 1);
		insertStr += " (" + keys + ") VAlUES (" + values + ");";
		totalInsert += insertStr;
	});
	db.run(totalInsert);
	db.run("COMMIT");
}

/**
 *
 * @param {Object} sqlstmt
 */
function executeSingleSql(sqlstmt) {
    return db.exec(sqlstmt)[0];
}

function prepareSelectStatment(tableName) {
    return "select * from " + tableName + " where 1=1 ";
}

/**
 *
 * @param {Object} tableName
 * @param {Object} limit
 */
function selectAll(tableName, limit) {
    var sqlstr = "";
    if (limit !== undefined) {
        sqlstr = "select * from " + tableName + " LIMIT " + limit + ";";
    } else {
        sqlstr = "select * from " + tableName + ";";
    }
    return db.exec(sqlstr)[0];
}

function innerjoin(tableName1, tableName2, headType1, headType2, tableCol_1, tableCol_2) {
    var sqlstr = "";
    var innerJoin = "";
    var newHeadtype = [];
    sqlstr = " select ";
    tableName1 = encodeKeyToId(tableName1);
    tableName2 = encodeKeyToId(tableName2);

    for (var i = 0, len = tableCol_1.length; i < len; i++) {
        sqlstr += tableName1 + "." + encodeKeyToId(tableCol_1[i]) + ",";
        newHeadtype.push(decodeKeyFromId(tableName1) + "_" + tableCol_1[i]);
        innerJoin += tableName1 + "." + encodeKeyToId(tableCol_1[i]) + "=" + tableName2 + "." + encodeKeyToId(tableCol_2[i]) + " and ";
    }
    innerJoin = innerJoin.substr(0, innerJoin.length - 5);

    for (var key in headType1) {
        for (var innerTag = 0, i = 0, len = tableCol_1.length; i < len; i++) {
            console.log(key + " and " + tableCol_1[i]);
            if (key == tableCol_1[i])
                innerTag = 1;
        }
        if (innerTag == 0) {
            sqlstr += tableName1 + "." + encodeKeyToId(key) + ",";
            newHeadtype.push(decodeKeyFromId(tableName1) + "_" + key)
        }
    }

    for (var key in headType2) {
        for (var innerTag = 0, i = 0, len = tableCol_1.length; i < len; i++) {
            console.log(key + " and " + tableCol_1[i]);
            if (key == tableCol_1[i])
                innerTag = 1;
        }
        if (innerTag == 0) {
            sqlstr += tableName2 + "." + encodeKeyToId(key) + ",";
            newHeadtype.push(decodeKeyFromId(tableName2) + "_" + key)
        }
    }

    sqlstr = sqlstr.substr(0, sqlstr.length - 1);

    sqlstr += " from " + tableName1 + "," + tableName2 + " where " + innerJoin + ";";

    console.log(sqlstr);
    var innerResult = db.exec(sqlstr)[0];
    innerResult.columns = newHeadtype;
    return innerResult;
}

function leftjoin(tableName1, tableName2, headType1, headType2, tableCol_1, tableCol_2) {
    var sqlstr = "";
    var leftJoin = "";
    var newHeadtype = [];
    sqlstr = " select ";
    tableName1 = encodeKeyToId(tableName1);
    tableName2 = encodeKeyToId(tableName2);

    for (var i = 0, len = tableCol_1.length; i < len; i++) {
        sqlstr += tableName1 + "." + encodeKeyToId(tableCol_1[i]) + ",";
        newHeadtype.push(decodeKeyFromId(tableName1) + "_" + tableCol_1[i]);
        leftJoin += tableName1 + "." + encodeKeyToId(tableCol_1[i]) + "=" + tableName2 + "." + encodeKeyToId(tableCol_2[i]) + " and ";
    }
    leftJoin = leftJoin.substr(0, leftJoin.length - 5);

    for (var key in headType1) {
        for (var leftTag = 0, i = 0, len = tableCol_1.length; i < len; i++) {
            console.log(key + " and " + tableCol_1[i]);
            if (key == tableCol_1[i])
                leftTag = 1;
        }
        if (leftTag == 0) {
            sqlstr += tableName1 + "." + encodeKeyToId(key) + ",";
            newHeadtype.push(decodeKeyFromId(tableName1) + "_" + key)
        }
    }

    for (var key in headType2) {
        for (var leftTag = 0, i = 0, len = tableCol_2.length; i < len; i++) {
            console.log(key + " and " + tableCol_2[i]);
            if (key == tableCol_2[i])
                leftTag = 1;
        }
        if (leftTag == 0) {
            sqlstr += tableName2 + "." + encodeKeyToId(key) + ",";
            newHeadtype.push(decodeKeyFromId(tableName2) + "_" + key)
        }
    }

    sqlstr = sqlstr.substr(0, sqlstr.length - 1);

    sqlstr += " from " + tableName1 + " left join " + tableName2 + " on " + leftJoin + ";";

    console.log(sqlstr);

    var leftResult = db.exec(sqlstr)[0];
    leftResult.columns = newHeadtype;
    return leftResult;
}