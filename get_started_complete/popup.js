var parent='parent';

function dumpBookmarks() {
  console.log('hello');
  var bookmarkTreeNodes = chrome.bookmarks.getTree(
    function(bookmarkTreeNodes) {
      dumpTreeNodes(bookmarkTreeNodes);
    });
}
function dumpTreeNodes(bookmarkNodes) {
  var i;
  for (i = 0; i < bookmarkNodes.length; i++) {
      dumpNode(bookmarkNodes[i]);
  }
}
function dumpNode(bookmarkNode) {
  if (bookmarkNode.title) {
    if (!bookmarkNode.children) {
      var sub='';
      if(parent.localeCompare('Bookmarks bar'))
      {
        sub=parent;
      }
      else{
        sub='bookmarks';
      }
      var descr=bookmarkNode.title;
      var burl=bookmarkNode.url;
      var title='chrome';
      var url='https://sharethat-mirrorme.herokuapp.com/add.php?url='+burl+'&category='+title+'&sub='+
      sub+'&desc='+descr;
      // console.log('loop->'+url);
      if(1){
        console.log('loop->'+url);
        console.log('reached the if');
        $.ajax({
          data:{url:burl,category:title,sub:sub,desc:descr},
          type:'post',
          url:"https://sharethat-mirrorme.herokuapp.com/addpost.php",
          success:function(data){
                //  alert(data.success);
                console.log(data.success);
             },
             error: function(data) {
              var errors = data.responseJSON;
              console.log(errors);
          }
        });
      }
     
    }
  }
  if (bookmarkNode.children && bookmarkNode.children.length > 0) {
    parent=bookmarkNode.title;
    dumpTreeNodes(bookmarkNode.children);
  };
}
document.addEventListener('DOMContentLoaded', function () {
  var div=document.getElementById('bookmarks');
  div.innerHTML='hello';
  div.innerHTML+='jui';
  div.innerHTML+="<br>";
  dumpBookmarks();
});