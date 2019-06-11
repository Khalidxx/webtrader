define(["exports","jquery","../windows/windows","../websockets/binary_websockets","lodash","text!./statement.html","../viewtransaction/viewTransaction","datatables","jquery-growl","css!./statement.css"],function(t,e,a,n,i,o,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.init=void 0;var s=h(e),l=h(a),d=h(n),c=h(i),u=h(o),f=h(r);function h(t){return t&&t.__esModule?t:{default:t}}var m=null,g=null,p=null,v=t.init=function(t){t.click(function(){m?m.moveToTop():d.default.cached.authorize().then(T).catch(function(t){})})},b=!1,w=!1,_=!1,y=function(t){var i=(0,s.default)("#"+g.attr("id")+"_processing").css("top","200px").show(),e={statement:1,description:1};if("string"==typeof t){e.date_from=yearMonthDayToEpoch(t,{utc:!0});var a=Date.UTC(1970,0,1,23,59,59)/1e3;e.date_to=e.date_from+a,g.api().rows().remove(),w=!0}else e.limit=250,(w||t&&t.clear)&&(g.api().rows().remove(),w=!1),e.offset=g.api().column(0).data().length;var n=function(t){var e=t.statement&&t.statement.transactions||[],n="View".i18n(),a=e.map(function(t){var e=(0,c.default)(["buy","sell"]).includes(t.action_type)?"":"button-disabled",a='<button class="'+(e=(0,c.default)(["deposit","withdrawal"]).includes(t.action_type)?"invisible":e)+'">'+n+"</button>";t.amount;return[epochToString(t.transaction_time,{utc:!0}),t.transaction_id,c.default.capitalize(t.action_type),t.longcode,1*t.amount,"<b>"+formatPrice(t.balance_after,local_storage.get("currency"))+"</b>",a,t]});g.api().rows.add(a),g.api().draw(),b=!1,i.hide()};b||(b=!0,d.default.send(e).then(n).catch(function(t){n({}),_=!0,s.default.growl.error({message:t.message}),b=!1}))},T=function(){(m=l.default.createBlankWindow((0,s.default)("<div/>"),{title:"Statement".i18n(),dialogClass:"statement",width:800,height:400,close:function(){g&&g.DataTable().destroy(!0),m&&m.remove(),m=null},refresh:function(){p.clear(),y({clear:!0})},"data-authorized":"true"})).track({module_id:"statement",is_unique:!0,data:null}),(g=(0,s.default)(u.default).i18n()).appendTo(m),(g=g.dataTable({data:[],autoWidth:!1,columnDefs:[{targets:3,width:"35%"},{targets:4,createdCell:function(t,e){var a=e<0?"red":0<e?"green":"bold";a&&(0,s.default)(t).addClass(a),t.innerHTML=formatPrice(e,local_storage.get("currency"))}}],paging:!1,ordering:!1,searching:!0,processing:!0})).closest(".ui-dialog-content").addClass("hide-search-input").addClass("statement-dialog-content"),g.api().columns().every(function(){var t=this;(0,s.default)("input",this.header()).on("keyup change",function(){t.search()!==this.value&&t.search(this.value).draw()})}),p=m.addDateToHeader({title:"Jump to: ",date:null,changed:y,cleared:y}),m.on("click",C),m.dialog("open"),y({clear:!0}),m.scroll(function(){.75<(m.scrollTop()+m.innerHeight())/m[0].scrollHeight&&!b&&!w&&!_&&y({clear:!1})})},C=function(t){var e=t.target,a=(0,s.default)(e);if("BUTTON"===e.tagName&&!a.hasClass("button-disabled")){var n=e.parentElement.parentElement,i=g.api().row(n).data();i=c.default.last(i),a.addClass("button-disabled"),f.default.init(i.contract_id,i.transaction_id).then(function(){return a.removeClass("button-disabled")}).catch(function(t){a.removeClass("button-disabled"),s.default.growl.error({message:t.message})})}};t.default={init:v}});