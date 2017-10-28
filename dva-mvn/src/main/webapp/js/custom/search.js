/**
 * Created by Cherry on 2017/5/5.
 */
function searchtext() {
    console.log("11111");
    var searchText = $("#searchText").val();
    $
        .ajax({
            type : "get",
            url : '/dva-mvn/file/search.do',
            dataType : "text",
            data : {
                searchText : searchText
            },
            beforeSend : function(XMLHttpRequest) {

            },
            success : function(data) {
                var list = $("#content");
                list.empty();

                console.log("here");

                console.log(data);
                console.log("here1");
                var resultMap = $.parseJSON(data);
                console.log("here2");
                console.log(resultMap);
                if (resultMap.resultMessage.resultCode == 1) {

                    var fileList = resultMap.fileList;
                    if (fileList.length == 0) {
                        list.append("<p>无相关内容</p>");
                    } else {
                        for (var i = 0; i < fileList.length; i++) {
                            var filename = fileList[i].fileName;
                            var fileId = fileList[i].fileId;

                            console.log(filename);
                            console.log("111111111144444");

                            // var liString = "<a href='#'
                            // class='list-group-item center'
                            // onClick=\"getData('" + fileId + "')\">" +
                            // filename + "</a>";
                            list.append("<div class='archive-list-item'><div class='post-intro' style='width: 100%'>"
                                + "<h2 ><a href='#' target='_blank'  rel='bookmark' onclick=\"openPanel('"
                                + fileId
                                + "')\">"
                                + filename
                                + "</h2>");
                            // <div class="archive-list-item">
                            // <div class="post-intro" style="width: 100%">
                            // <h2><a target="_blank"
                            // href="http://www.runoob.com/redis/strings-append.html"
                            // rel="bookmark" title=" Redis <em>Append</em>
                            // 命令"> Redis <em>Append</em> 命令</a> <i
                            // class="fa fa-external-link"></i></h2>
                            // <p>
                            // Redis Append 命令 Redis 字符串(string) Redis
                            // Append 命令用于为指定的 key 追加值。 如果 key
                            // 已经存在并且是一个字符串， APPEND 命令将 value 追加到 key 原来的...
                            // </p>
                            // </div>
                            // </div>
                        }
                    }
                } else {
                    list.append("<p>请输入内容！<p>");
                }

            },
            complete : function(XMLHttpRequest, textStatus) {
                // 隐藏正在查询图片
            },
            error : function(error) {
                console.log(error);
            }
        });
}
function openPanel(fileId){
	
   window.location.href='/dva-mvn/html/upload.html?flag=true&A='+fileId;
}