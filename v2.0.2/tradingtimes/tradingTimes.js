define(["jquery","windows/windows","websockets/binary_websockets","datatables","jquery-growl"],function(a,b,c){function d(a){function b(a,b){var d=c.find(function(b){return b.name==a}),e=d&&d.submarkets.find(function(a){return a.name==b}).symbols,f=(e||[]).map(function(a){return[a.name,a.times.open[0],a.times.close[0],a.settlement||"-",a.events[0]?a.events[0].descrip+":"+a.events[0].dates:"-"]});return f}var c=a.trading_times&&a.trading_times.markets||[],d=[],e={};return c.forEach(function(a){d.push(a.name),e[a.name]=[],a.submarkets.forEach(function(b){e[a.name].push(b.name)})}),{market_names:d,submarket_names:e,getRowsFor:b}}function e(c){loadCSS("tradingtimes/tradingTimes.css"),c.click(function(){h||(h=b.createBlankWindow(a("<div/>"),{title:"Trading Times",width:700}),a.get("tradingtimes/tradingTimes.html",f)),h.dialog("open")})}function f(e){e=a(e);var f=e.filter(".trading-times-sub-header");g=e.filter("table"),e.appendTo(h),g=g.dataTable({data:[],columnDefs:[{className:"dt-body-center dt-header-center",targets:[0,1,2,3,4]}],paging:!1,ordering:!1,searching:!0,processing:!0}),g.parent().addClass("hide-search-input"),g.api().columns().every(function(){var b=this;a("input",this.header()).on("keyup change",function(){b.search()!==this.value&&b.search(this.value).draw()})});var i=null,j=null,k=function(e){var h=a("#"+g.attr("id")+"_processing").show(),k=function(a,b,c){var d=a.getRowsFor(b,c);g.api().rows().remove(),g.api().rows.add(d),g.api().draw()},l=function(c){var e=d(c);if(null==i){var g=a("<select />");g.appendTo(f),i=b.makeSelectmenu(g,{list:e.market_names,inx:0,changed:function(a){j.update_list(e.submarket_names[a]),k(e,i.val(),j.val())}})}if(null==j){var l=a("<select />");l.appendTo(f),j=b.makeSelectmenu(l,{list:e.submarket_names[i.val()],inx:0,changed:function(){k(e,i.val(),j.val())}})}k(e,i.val(),j.val()),h.hide()};c.send({trading_times:e}).then(l)["catch"](function(b){l({}),a.growl.error({message:b.message})})};k((new Date).toISOString().slice(0,10)),h.addDateToHeader({title:"Date: ",date:new Date,changed:k})}var g=null,h=null;return{init:e}});