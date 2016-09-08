define(["jquery","windows/windows","websockets/binary_websockets","navigation/menu","moment","lodash","jquery-growl","common/util","highstock","highcharts-exporting"],function(a,b,c,d,e,f){function g(b,d,f){var g=a(".downloadChart");g.highcharts()&&g.highcharts().destroy(),g.highcharts("StockChart",{chart:{events:{load:function(){this.credits.element.onclick=function(){window.open("http://www.binary.com","_blank")}}},spacingLeft:0,marginLeft:45},navigator:{enabled:!0,series:{id:"navigator"}},plotOptions:{candlestick:{lineColor:"black",color:"red",upColor:"green",upLineColor:"black",shadow:!1}},title:{text:b.display_name+" ("+d+")"},credits:{href:"http://www.binary.com",text:"Binary.com"},xAxis:{labels:{formatter:function(){var a=this.axis.defaultLabelFormatter.call(this);return a.replace(".","")}}},yAxis:[{opposite:!1,labels:{formatter:function(){return this.value},align:"center"}}],tooltip:{crosshairs:[{width:2,color:"red",dashStyle:"dash"},{width:2,color:"red",dashStyle:"dash"}],enabled:!0,enabledIndicators:!0,xDateFormat:"%A, %b %e, %Y %H:%M:%S"},exporting:{enabled:!1,url:"https://export.highcharts.com",filename:b.display_name.split(" ").join("_")+"("+d+")"},rangeSelector:{enabled:!1}});var h=g.highcharts();h.showLoading(),a(".download_show").prop("disabled",!0);var i=e.utc(f,"DD/MM/YYYY HH:mm").unix(),k=i+1800,m={ticks_history:b.symbol,start:i};isTick(d)||(m.granularity=convertToTimeperiodObject(d).timeInSeconds(),m.style="candles",k=i+1e3*m.granularity),e.utc().unix()<k&&(k=e.utc().unix()),m.end=k,c.send(m).then(function(c){var e=[];isTick(d)?c.history.times.forEach(function(a,b){e.push([1e3*parseInt(a),parseFloat(c.history.prices[b])])}):c.candles.forEach(function(a){e.push([1e3*a.epoch,parseFloat(a.open),parseFloat(a.high),parseFloat(a.low),parseFloat(a.close)])});var f=e.length;if(0===f)return a.growl.error({message:"There is no historical data available!"}),h.hideLoading(),void a(".download_show").prop("disabled",!1);var g=f>100?100:f-1;h.xAxis[0].setExtremes(e[0][0],e[g][0]);var i=b.display_name,j={id:"_"+Date.now(),name:i,data:e,type:isTick(d)?"line":"candlestick",dataGrouping:{enabled:!1},states:{hover:{enabled:!1}}};isTick(d)&&(j.marker={enabled:!0,radius:4}),h.addSeries(j),h.hideLoading(),a(".download_show").prop("disabled",!1),t()})["catch"](function(b){a.growl.error({message:b.message}),h.hideLoading(),a(".download_show").prop("disabled",!1)}),l=d,j(b,d)}function h(h){require(["css!download/download.css"]),h.click(function(){m?m.moveToTop():(m=b.createBlankWindow(a('<div class="download_window"/>'),{title:"View Historical Data".i18n(),width:p,minWidth:p,minHeight:q,height:q,resize:t}),m.track({module_id:"download",is_unique:!0,data:null}),m.dialog("open"),m.closest("div.ui-dialog").css("overflow","visible"),require(["text!download/download.html"],function(b){b=a(b).i18n(),b.find(".download_fromDate").datepicker({changeMonth:!0,changeYear:!0,dateFormat:"dd/mm/yy",showButtonPanel:!0,minDate:e.utc().subtract(1,"years").toDate(),maxDate:e.utc().toDate()}).click(function(){a(this).datepicker("show")}),b.find(".download_fromTime").timepicker({showCloseButton:!0}).click(function(){a(this).timepicker("show")}),b.appendTo(m),c.cached.send({trading_times:(new Date).toISOString().slice(0,10)}).then(function(c){n=d.extractChartableMarkets(c),n=d.sortMenu(n);var e=a("<ul>"),g=void 0;n.forEach(function(c){var d=a("<ul>");c.submarkets.forEach(function(c){var e=a("<ul>");c.instruments.forEach(function(c){var d=a("<li>");d.append(c.display_name),d.data("instrumentObject",c),d.click(function(){var c=a(this).data("instrumentObject");a(".download_instruments").data("instrumentObject",c).html(c.display_name),a(".download_instruments_container > ul").toggle(),i(60*a(this).data("instrumentObject").delay_amount,b)}),f.isUndefined(g)&&(g=c),e.append(d)}),d.append(a("<li>").append(c.name).append(e))}),e.append(a("<li>").append(c.name).append(d))}),a(".download_instruments_container").append(e),e.menu().toggle();var h=a(".download_instruments");h.click(function(){a(".download_instruments_container > ul").toggle()}).blur(function(){a(".download_instruments_container > ul").hide()}),h.data("instrumentObject",g),h.html(g.display_name),i(60*h.data("instrumentObject").delay_amount,b),a(".download_show").click()})["catch"](function(b){a.growl.error({message:b.message})});var h=a(".download_timePeriod");h.click(function(){a(".download_timePeriod_container > ul").toggle()}).blur(function(){a(".download_timePeriod_container > ul").hide()}),h.data("timePeriodObject",{name:"1 day",code:"1d"}),h.html("1 day"),a(".download_fromTime").hide(),b.find(".download_show").click(function(){var b=a(".download_instruments"),c=a(".download_timePeriod"),d=b.data("instrumentObject"),e=c.data("timePeriodObject");g(d,e.code,a(".download_fromDate").val()+" "+a(".download_fromTime").val())}),b.find(".download_fromDate").val(e.utc().subtract(1,"years").format("DD/MM/YYYY")),b.find(".share-button").click(function(){b.find(".overlay").toggle()}),k()}))})}function i(b,c){var d,e=a(".download_timePeriod"),g=!1;e.find("ul").length>0&&e.find("ul")[0].remove();var h=a("<ul>");o.forEach(function(i){var j=a("<ul>");i.timePeriods.forEach(function(h){var i=a("<li>");if(d=convertToTimeperiodObject(h.code).timeInSeconds(),i.append(h.name),b>d)i.addClass("ui-button-disabled ui-state-disabled");else if(i.data("timePeriodObject",h),i.click(function(){var b=a(this).data("timePeriodObject");a(".download_timePeriod").data("timePeriodObject",b).html(a(this).data("timePeriodObject").name),a(".download_timePeriod_container > ul").toggle();var d="1d"===b.code,e=c.find(".download_fromTime");d?(e.val("00:00"),e.hide()):e.show()}),!f.isUndefined(e.data("timePeriodObject"))&&!g){var k=e.data("timePeriodObject"),l=convertToTimeperiodObject(k.code).timeInSeconds();b>l&&(i.click(),a(".download_timePeriod_container > ul").toggle()),g=!0}j.append(i)}),h.append(a("<li>").append(i.name).append(j))}),a(".download_timePeriod_container").append(h),h.menu().toggle()}function j(b,c){var d=a(".download_table .fbShareLink"),e=a(".download_table .twitterShareLink"),f=a(".download_table .bloggerShareLink"),g=a(".download_table .gPlusShareLink"),h=a(".download_table .vkShareLink"),i=a(".download_table .exportChartURLShare"),j=a(".download_table .exportChartIframeShare");d.attr("href",fbShareTemplate.format(encodeURIComponent(urlShareTemplate.format(b.symbol,c)))),e.attr("href",twitterShareTemplate.format(encodeURIComponent(urlShareTemplate.format(b.symbol,c)),b.display_name+"("+c+")")),g.attr("href",gPlusShareTemplate.format(encodeURIComponent(urlShareTemplate.format(b.symbol,c)))),f.attr("href",bloggerShareTemplate.format(urlShareTemplate.format(b.symbol,c),b.display_name+"("+c+")")),h.attr("href",vkShareTemplate.format(urlShareTemplate.format(b.symbol,c),b.display_name+"("+c+")")),i.val(urlShareTemplate.format(b.symbol,c)),j.val(iframeShareTemplate.format(b.symbol,c))}function k(){var b=a(".download_table #png"),c=a(".download_table #pdf"),d=a(".download_table #csv"),f=a(".download_table #svg");b.click(function(){var b=a(".downloadChart").highcharts();b.exportChartLocal()}),c.click(function(){var b=a(".downloadChart").highcharts();b.exportChart({type:"application/pdf"})}),f.click(function(){var b=a(".downloadChart").highcharts();b.exportChart({type:"image/svg+xml"})}),d.click(function(){var b=a(".downloadChart").highcharts(),c=b.series[0],d=isTick(l),f=c.options.name+" ("+l+").csv",g=c.options.data.map(function(a){var b=a[0],c=a[1];if(d)return'"'+e.utc(b).format("YYYY-MM-DD HH:mm:ss")+'",'+ +c;var f=a[2],g=a[3],h=a[4];return'"'+e.utc(b).format("YYYY-MM-DD HH:mm")+'",'+c+","+f+","+g+","+h}),h=(d?"Date,Tick\n":"Date,Open,High,Low,Close\n")+g.join("\n"),i=new Blob([h],{type:"text/csv;charset=utf-8;"});if(navigator.msSaveBlob)navigator.msSaveBlob(i,f);else{var j=document.createElement("a");if(void 0!==j.download){var k=URL.createObjectURL(i);j.setAttribute("href",k),j.setAttribute("download",f),j.style.visibility="hidden",document.body.appendChild(j),j.click(),document.body.removeChild(j)}}})}var l,m=null,n=[],o=[{name:"Ticks".i18n(),timePeriods:[{name:"1 Tick",code:"1t"}]},{name:"Minutes".i18n(),timePeriods:[{name:"1 min",code:"1m"},{name:"2 mins",code:"2m"},{name:"3 mins",code:"3m"},{name:"5 mins",code:"5m"},{name:"10 mins",code:"10m"},{name:"15 mins",code:"15m"},{name:"30 mins",code:"30m"}]},{name:"Hours".i18n(),timePeriods:[{name:"1 hour",code:"1h"},{name:"2 hours",code:"2h"},{name:"4 hours",code:"4h"},{name:"8 hours",code:"8h"}]},{name:"Days".i18n(),timePeriods:[{name:"1 day",code:"1d"}]}],p=900,q=500,r=(local_storage.get("i18n")||{value:"en"}).value,s=getAppURL();urlShareTemplate=s+"?affiliates=true&instrument={0}&timePeriod={1}&lang="+r,iframeShareTemplate='<iframe src="'+urlShareTemplate+'" width="350" height="400" style="overflow-y : hidden;" scrolling="no" />',twitterShareTemplate="https://twitter.com/share?url={0}&text={1}",fbShareTemplate="https://facebook.com/sharer/sharer.php?u={0}",gPlusShareTemplate="https://plus.google.com/share?url={0}",bloggerShareTemplate="https://www.blogger.com/blog-this.g?u={0}&n={1}",vkShareTemplate="http://vk.com/share.php?url={0}&title={1}";var t=function(){if(m){var b=m.dialog("widget"),c=a(".downloadChart").height(b.height()-100).highcharts();c&&c.reflow();var d=a(".download_window .share-button"),e=a(".download_window .exportOverlay"),f=b.width()-(d.offset().left+d.outerWidth()-b.offset().left)+1;e.css("right",f+"px")}};return{init:h}});