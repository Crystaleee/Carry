function showSelectorModal() {
    if (tableList != undefined) {
        $("#keyName").val("");
        $("#relation").val("and");
        $("#least").val("");
        $("#most").val("");
        $("#special").val("");
        $("#fuzzy").val("");
        $("#selectors").modal('show');
        var attr_all = [];
        var meas_all = [];
        while ($("#keyName")[0].firstChild) {
            $("#keyName")[0].removeChild($("#keyName")[0].firstChild);
        }
        for (key in tableList[0].headType) {
            if (tableList[0].headType[key] == "attr") {
                attr_all.push(key);
            } else if (tableList[0].headType[key] == "measure") {
                meas_all.push(key);
            }
            var optElem = $("<option value='" + key + "'>" + key + "</option>");
            $("#keyName").append(optElem);
        }
        changeSelectorKey();
    } else {
        alert("没有数据！");
    }
}

function changeSelectorKey() {
    key = $("#keyName").val();
    if (tableList[0].headType[key] == "measure") {
        $("#numSelector").show();
        $("#strSelector").hide();
        $("#confirmSelector").on("click", confirmNumSelector);
    } else {
        $("#numSelector").hide();
        $("#strSelector").show();
        $("#confirmSelector").on("click", confirmStrSelector);
    }
}

function appendSelector() {
    var divElem = $("<div class='selector'><label>and/or</label><input class='relation' type='text'><label>数值筛选器     字段名</label><input class='keyName' type='text'><label>至少</label><input class='least' type='text'><label>至多</label><input class='most' type='text'><label>特殊值</label><input class='special' type='text'><button onclick='confirmSelector(this)'>确认</button></div>");
    divElem.appendTo($("#selectors"));
}

var selectors = {};

function confirmNumSelector() {
    if ($("#least").val() || $("#most").val()) {
        var config = {
            keyName: $("#keyName").val(),
            relation: $("#relation").val(),
            least: $("#least").val(),
            most: $("#most").val()
        };
        var selector = new numericSelector(config);
        selectors[config.keyName] = selector;
        var sqlStr = parseSqlOfSelectors();
        var result = executeSingleSql(sqlStr);
        if (result != undefined) {
            showTable(executeSingleSql(sqlStr));
        } else {
            delete selectors[config.keyName];
            alert("没有数据！");
        }
        showSelectorList();
    }
}

function confirmStrSelector() {
    if ($("#special").val() || $("#fuzzy").val()) {
        var config = {
            keyName: $("#keyName").val(),
            relation: $("#relation").val(),
            special: $("#special").val(),
            fuzzy: $("#fuzzy").val()
        };
        var selector = new stringSelector(config);
        selectors[config.keyName] = selector;
        var sqlStr = parseSqlOfSelectors();
        var result = executeSingleSql(sqlStr);
        if (result != undefined) {
            showTable(result);
        } else {
            delete selectors[config.keyName];
            alert("没有数据！");
        }
        showSelectorList();
    }
}

function parseSqlOfSelectors() {
    var sqlStr = prepareSelectStatment(tableList[0].title);
    for (key in selectors) {
        sqlStr += selectors[key].parseSqlFragment();
    }
    return sqlStr;
}

function showSelectorList() {
    var selectorList = $("#selectorList");
    while ($("#selectorList")[0].firstChild) {
        $("#selectorList")[0].removeChild($("#selectorList")[0].firstChild);
    }
    for (key in selectors) {
        var buttonElem = $("<div style='display:inline;'><label>" + key + "</lable></label><button onclick=\"deleteSelector('" + key + "')\">&times</button></div>");
        buttonElem.appendTo(selectorList);
    }
}

function deleteSelector(key) {
    delete selectors[key];
    var sqlStr = parseSqlOfSelectors();
    var result = executeSingleSql(sqlStr);
    showTable(result);
    showSelectorList();
}


function showTable(json) {
    if (json != undefined) {
        $("#file-contents").handsontable({
            data: json.values,
            // startRows: 5,
            // startCols: 3,
            stretchH: 'all',
            rowHeaders: true,
            colHeaders: parseColumnHeader(json.columns),
            columns: parseColumns(json.columns),
            width: function () {
                return $("#dashboard").width();
            },
            height: function () {
                return 600; // $("#dashboard").height();
            },
            afterGetColHeader: function (col, TH) {
                var instance = this;
                var colPolymerize = undefined;
                if ('polymerize' in tableList[0]) {
                    colPolymerize = tableList[0].polymerize[json.columns[col]];
                }
                if (colPolymerize != undefined) {
                    var instance = this;
                    var menu = buildMenu(colPolymerize);
                    var button = buildButton();
                    addButtonMenuEvent(button, menu);
                    Handsontable.Dom.addEvent(menu, 'click', function (event) {
                        if (event.target.nodeName == 'LI') {
                            setColumnType(json.columns[col], event.target.data['colType'], instance);
                        }
                    });
                    if (TH.firstChild.lastChild.nodeName === 'BUTTON') {
                        TH.firstChild.removeChild(TH.firstChild.lastChild);
                    }
                    TH.firstChild.appendChild(button);
                    TH.style['white-space'] = 'normal';
                }
            }
        });
    } else {
        alert("没有数据!");
    }

    function setColumnType(key, polymerize, instance) {
        tableList[0].polymerize[key] = polymerize;
        instance.render();
    }

    function addButtonMenuEvent(button, menu) {
        Handsontable.Dom.addEvent(button, 'click', function (event) {
            var changeTypeMenu, position, removeMenu;
            document.body.appendChild(menu);
            event.preventDefault();
            event.stopImmediatePropagation();
            changeTypeMenu = document.querySelectorAll('.changeTypeMenu');
            for (var i = 0, len = changeTypeMenu.length; i < len; i++) {
                changeTypeMenu[i].style.display = 'none';
            }
            menu.style.display = 'block';
            position = button.getBoundingClientRect();
            menu.style.top = (position.top + (window.scrollY || window.pageYOffset)) + 2 + 'px';
            menu.style.left = (position.left) + 'px';
            removeMenu = function (event) {
                if (event.target.nodeName == 'LI' && event.target.parentNode.className.indexOf('changeTypeMenu') !== -1) {
                    if (menu.parentNode) {
                        menu.parentNode.removeChild(menu);
                    }
                }
            };
            Handsontable.Dom.removeEvent(document, 'click', removeMenu);
            Handsontable.Dom.addEvent(document, 'click', removeMenu);
        });
    }

    function buildMenu(activeCellType) {
        var menu = document.createElement('UL'),
            types = ['sum', 'avg', 'min', 'max'],
            item;
        menu.className = 'changeTypeMenu';
        for (var i = 0, len = types.length; i < len; i++) {
            item = document.createElement('LI');
            if ('innerText' in item) {
                item.innerText = types[i];
            } else {
                item.textContent = types[i];
            }
            item.data = {
                'colType': types[i]
            };
            if (activeCellType == types[i]) {
                item.className = 'active';
            }
            menu.appendChild(item);
        }
        return menu;
    }

    function buildButton() {
        var button = document.createElement('BUTTON');
        button.innerHTML = '\u25BC';
        button.className = 'changeType';
        return button;
    }

    function parseColumnHeader(columns) {
        var newColumns = new Array();
        columns.forEach(function (e) {
            newColumns.push(decodeKeyFromId(e));
        });
        return newColumns;
    }

    function parseColumns(columns) {
        var newColumns = new Array();
        columns.forEach(function (e) {
            newColumns.push({
                readOnly: true
            });
        });
        return newColumns;
    }
}
/**
 * 数值筛选器类
 * @param {Object} config
 */
function numericSelector(config) {
    var that = this;
    this.relation = config.relation;
    this.keyName = config.keyName;
    this.most = config.most;
    this.least = config.least;
    this.parseSqlFragment = function () {
        var sqlFragmentStr = "";
        if (that.keyName) {
            var sqlFragmentStr = "1=1 ";
            var keyName = encodeKeyToId(that.keyName);
            if (that.least) {
                sqlFragmentStr += "and " + keyName + ">=" + that.least + " ";
            }
            if (that.most) {
                sqlFragmentStr += "and " + keyName + "<=" + that.most + " ";
            }
        }
        return that.relation + " (" + sqlFragmentStr + ") ";
    }
}
/**
 * 字符筛选器类
 */
function stringSelector(config) {
    var that = this;
    this.relation = config.relation;
    this.keyName = config.keyName;
    this.fuzzy = config.fuzzy;
    this.special = config.special;
    this.parseSqlFragment = function () {
        var sqlFragmentStr = "";
        if (that.keyName) {
            var sqlFragmentStr = "1=1 ";
            var keyName = encodeKeyToId(that.keyName);
            if (that.special) {
                sqlFragmentStr += "and " + keyName + " = '" + that.special + "' ";
            }
            if (that.fuzzy) {
                sqlFragmentStr += "and " + keyName + " like '%" + that.fuzzy + "%' ";
            }
        }
        return that.relation + " (" + sqlFragmentStr + ") ";
    }
}