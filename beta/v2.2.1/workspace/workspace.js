define(["exports","text!./workspace.html","../common/rivetsExtra","jquery","../windows/tracker","jquery-growl","css!./workspace.css"],function(a,b,c,d,e){"use strict";function f(a){return a&&a.__esModule?a:{"default":a}}Object.defineProperty(a,"__esModule",{value:!0}),a.tileDialogs=a.events=a.addDialog=a.init=void 0;var g=f(b),h=f(c),i=f(d),j=f(e),k="my-workspace-1";!function(){var a=local_storage.get("states");a&&!a.name&&(a.name=k,local_storage.set("states",a))}();var l=function(a){return JSON.parse(JSON.stringify(a))},m={route:"all",workspaces:local_storage.get("workspaces")||[],dialogs:[],update_route:function(a){return m.route=a},tileDialogs:function(){return q()},closeAll:function(){return i["default"](".webtrader-dialog").dialog("close")},workspace:{remove:function(a){var b=m.workspaces.indexOf(a);-1!==b&&m.workspaces.splice(b,1),local_storage.set("workspaces",m.workspaces)},show:function(a){m.closeAll(),m.current_workspace.name=a.name,local_storage.set("states",a),j["default"].reopen(l(a))}},current_workspace:{name:(local_storage.get("states")||{}).name||"my-workspace-1",name_perv_value:"",save:function(){var a=m.current_workspace.name,b=_.findIndex(m.workspaces,{name:a});if(-1===b)return m.saveas.show();var c=local_storage.get("states");c.name=a,m.workspaces[b]=c,local_storage.set("workspaces",m.workspaces),i["default"].growl.notice({message:"Workspace changes saved".i18n()})}},rename:{show:function(){m.current_workspace.name_perv_value=m.current_workspace.name,m.route="rename"},apply:function(){var a=m.current_workspace,b=a.name,c=a.name_perv_value;if(!b||b===c)return m.rename.cancel();if(_.find(m.workspaces,{name:b})){var d=b.match(/\d+$/),e=d?parseInt(d[0]):0;b=b.replace(/\d+$/,"")+(e+1)}var f=_.find(m.workspaces,{name:c});f&&(f.name=b,m.workspaces=m.workspaces,local_storage.set("workspaces",m.workspaces)),m.current_workspace.name=b,m.route="active"},cancel:function(){m.current_workspace.name=m.current_workspace.name_perv_value,m.route="active"}},saveas:{show:function(){m.current_workspace.name_perv_value=m.current_workspace.name,m.route="saveas"},apply:function(){{var a=m.current_workspace,b=a.name;a.name_perv_value}if(!b)return m.saveas.cancel();if(_.find(m.workspaces,{name:b})){var c=b.match(/\d+$/),d=c?parseInt(c[0]):0;b=b.replace(/\d+$/,"")+(d+1)}var e=local_storage.get("states");e.name=b,m.workspaces.push(e),local_storage.set("workspaces",m.workspaces),m.current_workspace.name=b,m.route="active"},cancel:function(){return m.rename.cancel()}}},n=a.init=function(a){var b=i["default"](g["default"]);a.append(b),h["default"].bind(b[0],m)},o=a.addDialog=function(a,b,c){var d={name:a,click:function(){return b()},remove:function(){e(),c()}},e=function(){var a=m.dialogs.indexOf(d);-1!==a&&m.dialogs.splice(a,1)};return m.dialogs.push(d),e},p=a.events=i["default"]("<div/>"),q=function(){for(var a=function(a){for(var b=void 0,c=void 0,d=a.length;d>0;)c=Math.floor(Math.random()*d),--d,b=a[d],a[d]=a[c],a[c]=b;return a},b=i["default"](".webtrader-dialog").filter(function(a,b){var c=i["default"](b);return c.hasClass("ui-dialog-content")&&c.dialog("isOpen")&&!c.hasClass("ui-dialog-minimized")&&i["default"](window).width()>=c.dialog("option","width")}),c=function(a,b){var c=0,d=i["default"](window).width(),e=115;i["default"]("#msg-notification").is(":visible")&&(e=150);for(var f=0;f<a.length;){for(var g=f,h=0,j=0;f!=a.length;){var k=i["default"](a[f]),l=k.dialog("option","width"),m=k.dialog("option","height");if(h=Math.max(h,m),!(d>=j+l))break;j+=l,++f}var n=d>j?d-j:0,o=d>j?(d-j)/(f-g+1):0;f!=a.length&&(c+=n),0===j&&i["default"](a[f]).dialog("option","width")>d&&(++f,o=0),j=0;for(var p=g;f>p;++p){j+=o;{var q=i["default"](a[p]),r=q.dialog("option","width");q.dialog("option","height")}b&&q.dialog("widget").animate({left:j+"px",top:e+"px"},1500,q.trigger.bind(q,"animated")),q.dialog("option","position",{my:j,at:e}),j+=r}e+=h+20}return c},d=null,e=1e6,f=0;100>f;++f){a(b);var g=c(b,!1);e>g&&(d=b.slice(),e=g)}var h=i["default"](".webtrader-dialog").filter(function(a,b){var c=i["default"](b);return c.hasClass("ui-dialog-content")&&c.dialog("isOpen")&&!c.hasClass("ui-dialog-minimized")&&i["default"](window).width()<c.dialog("option","width")});_(h).forEach(function(a){d.push(a)}),c(d,!0),setTimeout(function(){return p.trigger("tile")},1600)};a.tileDialogs=q,a["default"]={init:n,addDialog:o,events:p,tileDialogs:q}});