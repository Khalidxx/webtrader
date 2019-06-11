define(["exports","babel-runtime/regenerator","jquery","../windows/windows","../common/rivetsExtra","lodash","text!./copytrade.html","../common/common","websockets/binary_websockets","websockets/validateToken","../instruments/instruments","css!./copytrade.css","../common/util"],function(e,t,a,n,r,o,s,i,d,l,c){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.init=void 0;var u=y(t),f=y(a),_=y(n),p=y(r),g=y(o),k=y(s),m=y(d),h=y(l);function y(e){return e&&e.__esModule?e:{default:e}}var T=i.trade_types,v={INVALID_STAKE_LIMIT:"Min trade stake should be lower than max trade stake.".i18n(),TOKEN_ALREADY_ADDED:"Token already added".i18n(),ENTER_VALID_TOKEN:"Enter a valid trader token".i18n(),REFRESH_FAILED:"Refresh failed".i18n()},w=function(){return"copyTrade_"+local_storage.get("oauth")[0].id},b=T.slice(0,2).map(function(e){return e.api_code}),C=function(e,t){return{open:!1,started:!1,disableStart:!1,loginid:t,yourCopySettings:(a=e,{copy_start:a,min_trade_stake:10,max_trade_stake:100,assets:g.default.cloneDeep(x),trade_types:g.default.cloneDeep(b)})};var a},S=g.default.debounce(function(e){var t=g.default.cloneDeep(e);delete t.searchToken.disable,local_storage.set(w(),t)},50),E=null,x=null;(0,c.init)().then(function(e){E=g.default.flatten(e.map(function(e){var t=e.display_name;return e.submarkets.map(function(e){return{displayName:t+" - "+e.display_name,instruments:e.instruments}})}));var n=[];e.forEach(function(e){e.submarkets.forEach(function(e){e.instruments.forEach(function(e){var t=e.symbol,a=e.display_name;n.push({code:t,name:a})})})}),I.masterAssetList=n,I.groupedAssets=E,x=n.filter(function(e){return"R_10"===e.code}).map(function(e){return e.code})});var A=function(n,r,o){return new Promise(function(a,t){m.default.send({copytrading_statistics:1,trader_id:n}).then(function(e){if(e.copytrading_statistics){var t=g.default.find(o.traderTokens,function(e){return e.yourCopySettings&&e.yourCopySettings.copy_start===r});t?g.default.merge(t.traderStatistics,e.copytrading_statistics):o.traderTokens.push(g.default.merge({traderStatistics:e.copytrading_statistics},C(r,n)))}S(o),a()}).catch(function(e){t(e)})})},D=null,R=null,I={masterAssetList:[],masterTradeTypeList:g.default.cloneDeep(T),groupedAssets:[],is_loading:!0,is_virtual:!0,allowCopy:{allow_copiers:0,onAllowCopyChangeCopierCellClick:function(){return I.onChangeCopytradeSettings(0)},onAllowCopyChangeTraderCellClick:function(){return I.onChangeCopytradeSettings(1)}},onChangeCopytradeSettings:g.default.debounce(function(t){I.is_virtual||I.allowCopy.allow_copiers!==t&&(I.is_loading=!0,m.default.send({set_settings:1,allow_copiers:t}).then(function(e){I.is_loading=!1,I.allowCopy.allow_copiers=t}).catch(function(e){I.is_loading=!1,f.default.growl.error({message:e.message})}))},250),onOpenChange:function(e){I.traderTokens[e].open=!I.traderTokens[e].open},onStartedChange:function(t){if(I.traderTokens[t].disableStart=!0,!I.traderTokens[t].started){var e=local_storage.get(w());if(e){var a=e.traderTokens[t];if(a){var n={};g.default.merge(n,I.traderTokens[t],a),I.traderTokens.splice(t,1),g.default.defer(function(){I.traderTokens.splice(t,0,n);var e=g.default.cloneDeep(n.yourCopySettings);e.min_trade_stake||delete e.min_trade_stake,e.max_trade_stake||delete e.max_trade_stake,(!e.assets||e.assets.length<=0)&&delete e.assets,(!e.trade_types||e.trade_types.length<=0)&&delete e.trade_types,m.default.send(e).then(function(){n.disableStart=!1,n.started=!0,N("#max_trade_stake","#min_trade_stake"),S(I)}).catch(function(e){f.default.growl.error({message:e.message}),n.disableStart=!1,N("#max_trade_stake","#min_trade_stake"),S(I)})})}}}else m.default.send({copy_stop:I.traderTokens[t].yourCopySettings.copy_start}).then(function(){I.traderTokens[t].disableStart=!1,I.traderTokens[t].started=!1,S(I)}).catch(function(e){f.default.growl.error({message:e.message}),I.traderTokens[t].disableStart=!1,S(I)})},onRemove:function(e){var t=I.traderTokens[e];I.traderTokens.splice(e,1),S(I),m.default.send({copy_stop:t.yourCopySettings.copy_start}).catch(function(e){})},onRefresh:function(e){var t=I.traderTokens[e],a=t.loginid,n=t.yourCopySettings.copy_start;a&&n&&(t.disableRefresh=!0,A(a,n,I).then(function(){t.disableRefresh=!1}).catch(function(e){f.default.growl.error({message:v.REFRESH_FAILED}),t.disableRefresh=!1}))},onMinTradeChange:function(e,t){I.formatAndSetTradeStake(e,t,"min_trade_stake")},onMaxTradeChange:function(e,t){I.formatAndSetTradeStake(e,t,"max_trade_stake")},formatAndSetTradeStake:function(e,t,a){var n=(0,f.default)(e.target).data("index"),r=e.target.value,o=!g.default.isNil(r)&&r.match(/0*(\d+\.?\d{0,2})/);t.traderTokens[n].yourCopySettings[a]=o?o[1]:""},onUpdateYourSettings:function(e){var t,a;t=I.traderTokens[e].yourCopySettings,a=t.min_trade_stake,+t.max_trade_stake<+a?f.default.growl.error({message:v.INVALID_STAKE_LIMIT}):(S(I),f.default.growl.notice({message:"Updated successfully"}))},searchToken:{token:"",onTokenChange:function(e,t){return t.searchToken.token=e.target.value},disable:!1,onKeyDown:function(e,t){13===e.keyCode&&t.searchToken.addToken(e,t)},addToken:function(e,t){t.searchToken.token?g.default.some(I.traderTokens,function(e){return e.yourCopySettings.copy_start===t.searchToken.token})?f.default.growl.error({message:v.TOKEN_ALREADY_ADDED}):(t.searchToken.disable=!0,(0,h.default)(t.searchToken.token).then(function(e){if(!e)throw new Error("Invalid token");A(e.loginid,t.searchToken.token,t).then(function(){t.searchToken.token="",t.searchToken.disable=!1}).catch(function(e){t.searchToken.disable=!1,f.default.growl.error({message:e.message})})}).catch(function(e){f.default.growl.error({message:e.message}),t.searchToken.disable=!1})):f.default.growl.error({message:v.ENTER_VALID_TOKEN})}},traderTokens:[],openTokenMgmt:function(){return(0,f.default)("li.account ul a.token-management").click()}},L=function(){var e=(0,f.default)(k.default).i18n();R=p.default.bind(e[0],I),(D=_.default.createBlankWindow(e,{title:"Copy Trading".i18n(),resizable:!1,collapsable:!1,minimizable:!0,maximizable:!1,modal:!1,width:600,open:function(){var e,l=local_storage.get(w());l&&(g.default.merge(I,l),I.traderTokens=g.default.cloneDeep(I.traderTokens)),I.is_loading=!0,I.is_virtual=isVirtual(),I.is_virtual?(I.is_loading=!1,I.allowCopy.allow_copiers=0):m.default.cached.send({get_settings:1}).then(function(e){I.is_loading=!1,I.allowCopy.allow_copiers=e.get_settings.allow_copiers}).catch(function(e){I.is_loading=!1,f.default.growl.error({message:e.message})}),l&&(e=u.default.mark(function e(){var t,a,n,r,o,s,i,d;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a=!(t=!0),n=void 0,e.prev=3,r=l.traderTokens[Symbol.iterator]();case 5:if(t=(o=r.next()).done){e.next=21;break}return s=o.value,e.prev=7,i=s.loginid,d=s.yourCopySettings.copy_start,e.next=12,A(i,d,I);case 12:e.next=18;break;case 14:e.prev=14,e.t0=e.catch(7),f.default.growl.error({message:v.REFRESH_FAILED});case 18:t=!0,e.next=5;break;case 21:e.next=27;break;case 23:e.prev=23,e.t1=e.catch(3),a=!0,n=e.t1;case 27:e.prev=27,e.prev=28,!t&&r.return&&r.return();case 30:if(e.prev=30,a)throw n;e.next=33;break;case 33:return e.finish(30);case 34:return e.finish(27);case 35:case"end":return e.stop()}},e,this,[[3,23,27,35],[7,14],[28,,30,34]])}),function(){var i=e.apply(this,arguments);new Promise(function(o,s){return function t(e,a){try{var n=i[e](a),r=n.value}catch(e){return void s(e)}if(!n.done)return Promise.resolve(r).then(function(e){t("next",e)},function(e){t("throw",e)});o(r)}("next")})}())},close:function(){R&&R.unbind(),D&&D.dialog("destroy").remove(),R=D=null,I.traderTokens=[]},"data-authorized":"true"})).track({module_id:"copyTrade",is_unique:!0,data:null}),D.dialog("open")},N=function(){for(var e=arguments.length,t=Array(e),a=0;a<e;a++)t[a]=arguments[a];if(0<t.length){var n=t.join(", ");(0,f.default)(n).keypress(function(e){(e.which<48||57<e.which)&&8!==e.which&&46!==e.which&&e.preventDefault()})}},M=e.init=function(e){e.click(function(){D?D.moveToTop():(L(),N("#max_trade_stake","#min_trade_stake"))})};e.default={init:M}});