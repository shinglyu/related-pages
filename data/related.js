/*
window.addEventListener('starting', function(event) {
    self.port.emit('click', event.target.toString());
      event.stopPropagation();
        event.preventDefault();

}, false);
*/
var floatWindow = document.createElement('div')
floatWindow.setAttribute('style', 'position:fixed; bottom:0; width:100%; background-color:rgba(255,255,0,0.5)')
floatWindow.innerHTML = "You might be interested in: "

/*
  "\
<div style='position:absolute; bottom:0; width:100% background-color:rgba(255,255,0,0.5)'>\
</div>\
"
*/

self.port.on('starting', function(message) {
    console.log(message);
    var maxCount = 5;
    for (var item of message.slice(0,maxCount)){
      var link = document.createElement('a');
      link.setAttribute('href', item.url);
      link.setAttribute('target', "_blank");
      link.innerHTML= item.title
      floatWindow.appendChild(link);

      var separator= document.createElement('span');
      separator.innerHTML= " | ";
      floatWindow.appendChild(separator);

    }
    //window.document.body.innerHTML += floatWindow;
    window.document.body.appendChild(floatWindow);
});
