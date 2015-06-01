let { search } = require("sdk/places/history");
var { setInterval } = require("sdk/timers");
var pageMod = require("sdk/page-mod");
var data = require("sdk/self").data;

pageMod.PageMod({
  include: "*",
  contentScriptFile: data.url("related.js"),
  //contentScriptWhen: "start"
  onAttach: startListening
});

function startListening(worker) {
  search({ url: worker.url }).on("end", function(results){ //sorting?
    console.log(worker.url)
    //console.log(results)
    if (results.length > 0) {
      getRelatedSites(results, 30).on("end", function(results){ //sorting?
        //console.log(worker.url)
        console.log(results)
        var selfIdx = results.map(function(x){return x.url}).indexOf(worker.url);
        results.splice(selfIdx, 1);

        
        worker.port.emit('starting', results);
      })

    }
    //worker.port.emit('starting', results);

  })
  /*
  worker.port.on('click', function(html) {
        worker.port.emit('warning', 'Do not click this again');
          
  });
  */

}

function getRelatedSites(targetSiteHistory, range){ 
  targetSiteTime = new Date(targetSiteHistory[0].time);
  console.log(targetSiteTime)
  fromTime = new Date(targetSiteTime.getTime() - range * 60 * 1000)
  toTime = new Date(targetSiteTime.getTime() + range * 60 * 1000)
  return search({ from: fromTime.getTime()  }, 
                { to: toTime.getTime() } ,
                { sort: 'visitCount' } ,
                { descending: true } 
                //count?
               )
}
/*
setInterval(function() {
  search().on("end", function(results){
    console.log(results)
  })
}, 10000)

*/
