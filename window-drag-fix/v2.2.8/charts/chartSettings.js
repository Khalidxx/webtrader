define(["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t="margin-left: 10px; border: 0; display: inline-block;",r=t+" margin-bottom: -3px; height: 15px; width: 5px; border-left: 2px; border-color: #e98024;",i=t+" margin-bottom: 3px; height: 2; width: 20px; border-bottom: 2px; border-color: green;",n="margin: 3px 5px 0 10px; display: inline-block; border-radius: 6px;",l={purchase_time:'<span style="'+r+' border-color: #7cb5ec; border-style: solid;"></span>'+"Purchase Time".i18n(),start_time:'<span style="'+r+' border-style: solid;"></span> '+"Start Time".i18n(),barrier:'<span style="'+i+' border-style: solid;"></span> '+"Barrier".i18n(),barrier_dotted:'<span style="'+i+' border-style: dotted;"></span> '+"Barrier".i18n(),end_time:'<span style="'+r+' border-style: dashed;"></span> '+"End Time".i18n(),entry_spot:'<span style="'+n+' border: 3px solid orange; width: 4px; height: 4px;"></span>'+"Entry Spot".i18n(),exit_spot:'<span style="'+n+' background-color: orange; width:10px; height: 10px;"></span>'+"Exit Spot".i18n(),entry_spot_tick:'<span style="'+r+' border-style: solid;"></span> '+"Entry Spot".i18n(),exit_spot_tick:'<span style="'+r+' border-style: dashed;"></span> '+"Exit Spot".i18n()},d=function(e){var t=["entry_spot_tick","barrier","exit_spot_tick"];return e.includes("DIGIT")&&(t=t.filter(function(e){return"barrier"!==e})),t};e.getLabelEl=function(e){var t="",r=!0,i=!1,n=void 0;try{for(var o,s=e[Symbol.iterator]();!(r=(o=s.next()).done);r=!0){var a=o.value;a&&l[a]&&(t+=l[a])}}catch(e){i=!0,n=e}finally{try{!r&&s.return&&s.return()}finally{if(i)throw n}}return"<div>"+t+"</div>"},e.getMarkerSettings=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"white";return{enabled:!0,fillColor:e,lineColor:"orange",lineWidth:3,radius:4,states:{hover:{fillColor:e,lineColor:"orange",lineWidth:3,radius:4}}}},e.getChartLabels=function(e){var t=e.tick_count,r=e.date_start,i=e.purchase_time,n=e.is_sold_before_expiry,o=e.is_path_dependent,s=e.contract_type,a=["start_time","entry_spot","barrier_dotted","exit_spot","end_time"];return t?d(s):(n&&!o&&(a=a.filter(function(e){return"exit_spot"!==e})),i<r&&a.unshift("purchase_time"),a)}});