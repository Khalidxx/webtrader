!function(t){"object"==typeof module&&module.exports?module.exports=t:t(Highcharts)}(function(t){var i,c,d,l,u,g,f,a,m,y,e,o,s,n,x,r,h,b,P,p,M,k,w,A,L,v,C,X,Y,S,T,R,z,G,I,D,W,B,H,O,N,V,q,_,E,K,U,F,$,Q,Z,j,J,tt,it,at,et,ot,st,rt,nt,ht,lt,pt,ct,dt,ut,gt,ft,mt,yt,xt,bt,Pt,Mt;!function(t){function i(t,i){this.init(t,i)}var a=t.CenteredSeriesMixin,e=t.each,o=t.extend,s=t.merge,r=t.splat;o(i.prototype,{coll:"pane",init:function(t,i){this.chart=i,this.background=[],i.pane.push(this),this.setOptions(t)},setOptions:function(t){this.options=s(this.defaultOptions,this.chart.angular?{background:{}}:void 0,t)},render:function(){var t=this.options,i=this.options.background,a=this.chart.renderer;if(this.group||(this.group=a.g("pane-group").attr({zIndex:t.zIndex||0}).add()),this.updateCenter(),i)for(i=r(i),t=Math.max(i.length,this.background.length||0),a=0;a<t;a++)i[a]&&this.axis?this.renderBackground(s(this.defaultBackgroundOptions,i[a]),a):this.background[a]&&(this.background[a]=this.background[a].destroy(),this.background.splice(a,1))},renderBackground:function(t,i){var a="animate";this.background[i]||(this.background[i]=this.chart.renderer.path().add(this.group),a="attr"),this.background[i][a]({d:this.axis.getPlotBandPath(t.from,t.to,t)}).attr({fill:t.backgroundColor,stroke:t.borderColor,"stroke-width":t.borderWidth,class:"highcharts-pane "+(t.className||"")})},defaultOptions:{center:["50%","50%"],size:"85%",startAngle:0},defaultBackgroundOptions:{shape:"circle",borderWidth:1,borderColor:"#cccccc",backgroundColor:{linearGradient:{x1:0,y1:0,x2:0,y2:1},stops:[[0,"#ffffff"],[1,"#e6e6e6"]]},from:-Number.MAX_VALUE,innerRadius:0,to:Number.MAX_VALUE,outerRadius:"105%"},updateCenter:function(t){this.center=(t||this.axis||{}).center=a.getCenter.call(this)},update:function(t,i){s(!0,this.options,t),this.setOptions(this.options),this.render(),e(this.chart.axes,function(t){t.pane===this&&(t.pane=null,t.update({},i))},this)}}),t.Pane=i}(t),l=(i=t).each,u=i.extend,g=i.map,f=i.merge,a=i.noop,m=i.pick,y=i.pInt,e=i.wrap,o=i.Axis.prototype,i=i.Tick.prototype,d={defaultRadialGaugeOptions:{labels:{align:"center",x:0,y:null},minorGridLineWidth:0,minorTickInterval:"auto",minorTickLength:10,minorTickPosition:"inside",minorTickWidth:1,tickLength:10,tickPosition:"inside",tickWidth:2,title:{rotation:0},zIndex:2},defaultRadialXOptions:{gridLineWidth:1,labels:{align:null,distance:15,x:0,y:null},maxPadding:0,minPadding:0,showLastLabel:(c={getOffset:a,redraw:function(){this.isDirty=!1},render:function(){this.isDirty=!1},setScale:a,setCategories:a,setTitle:a},!1),tickLength:0},defaultRadialYOptions:{gridLineInterpolation:"circle",labels:{align:"right",x:-3,y:-2},showLastLabel:!1,title:{x:4,text:null,rotation:90}},setOptions:function(t){(t=this.options=f(this.defaultOptions,this.defaultRadialOptions,t)).plotBands||(t.plotBands=[])},getOffset:function(){o.getOffset.call(this),this.chart.axisOffset[this.side]=0},getLinePath:function(t,i){t=this.center;var a=this.chart,e=m(i,t[2]/2-this.offset);return i=this.isCircular||void 0!==i?this.chart.renderer.symbols.arc(this.left+t[0],this.top+t[1],e,e,{start:this.startAngleRad,end:this.endAngleRad,open:!0,innerR:0}):(i=this.postTranslate(this.angleRad,e),["M",t[0]+a.plotLeft,t[1]+a.plotTop,"L",i.x,i.y])},setAxisTranslation:function(){o.setAxisTranslation.call(this),this.center&&(this.transA=this.isCircular?(this.endAngleRad-this.startAngleRad)/(this.max-this.min||1):this.center[2]/2/(this.max-this.min||1),this.minPixelPadding=this.isXAxis?this.transA*this.minPointOffset:0)},beforeSetTickPositions:function(){(this.autoConnect=this.isCircular&&void 0===m(this.userMax,this.options.max)&&this.endAngleRad-this.startAngleRad==2*Math.PI)&&(this.max+=(this.categories?1:this.pointRange)||this.closestPointRange||0)},setAxisSize:function(){o.setAxisSize.call(this),this.isRadial&&(this.pane.updateCenter(this),this.isCircular&&(this.sector=this.endAngleRad-this.startAngleRad),this.len=this.width=this.height=this.center[2]*m(this.sector,1)/2)},getPosition:function(t,i){return this.postTranslate(this.isCircular?this.translate(t):this.angleRad,m(this.isCircular?i:this.translate(t),this.center[2]/2)-this.offset)},postTranslate:function(t,i){var a=this.chart,e=this.center;return t=this.startAngleRad+t,{x:a.plotLeft+e[0]+Math.cos(t)*i,y:a.plotTop+e[1]+Math.sin(t)*i}},getPlotBandPath:function(t,i,a){var e,o=this.center,s=this.startAngleRad,r=o[2]/2,n=[m(a.outerRadius,"100%"),a.innerRadius,m(a.thickness,10)],h=Math.min(this.offset,0),l=/%$/,p=this.isCircular;return o="polygon"===this.options.gridLineInterpolation?this.getPlotLinePath(t).concat(this.getPlotLinePath(i,!0)):(t=Math.max(t,this.min),i=Math.min(i,this.max),p||(n[0]=this.translate(t),n[1]=this.translate(i)),n=g(n,function(t){return l.test(t)&&(t=y(t,10)*r/100),t}),"circle"!==a.shape&&p?(t=s+this.translate(t),i=s+this.translate(i)):(t=-Math.PI/2,i=1.5*Math.PI,e=!0),n[0]-=h,n[2]-=h,this.chart.renderer.symbols.arc(this.left+o[0],this.top+o[1],n[0],n[0],{start:Math.min(t,i),end:Math.max(t,i),innerR:m(n[1],n[0]-n[2]),open:e}))},getPlotLinePath:function(a,t){var e,o,s,i=this,r=i.center,n=i.chart,h=i.getPosition(a);return i.isCircular?s=["M",r[0]+n.plotLeft,r[1]+n.plotTop,"L",h.x,h.y]:"circle"===i.options.gridLineInterpolation?(a=i.translate(a))&&(s=i.getLinePath(0,a)):(l(n.xAxis,function(t){t.pane===i.pane&&(e=t)}),s=[],a=i.translate(a),r=e.tickPositions,e.autoConnect&&(r=r.concat([r[0]])),t&&(r=[].concat(r).reverse()),l(r,function(t,i){o=e.getPosition(t,a),s.push(i?"L":"M",o.x,o.y)})),s},getTitlePosition:function(){var t=this.center,i=this.chart,a=this.options.title;return{x:i.plotLeft+t[0]+(a.x||0),y:i.plotTop+t[1]-{high:.5,middle:.25,low:0}[a.align]*t[2]+(a.y||0)}}},e(o,"init",function(t,i,a){var e,o=i.angular,s=i.polar,r=a.isX,n=o&&r,h=i.options,l=this.pane=i.pane[a.pane||0],p=l.options;o?(u(this,n?c:d),(e=!r)&&(this.defaultRadialOptions=this.defaultRadialGaugeOptions)):s&&(u(this,d),this.defaultRadialOptions=(e=r)?this.defaultRadialXOptions:f(this.defaultYAxisOptions,this.defaultRadialYOptions)),o||s?(this.isRadial=!0,i.inverted=!1,h.chart.zoomType=null):this.isRadial=!1,e&&(l.axis=this),t.call(this,i,a),n||!o&&!s||(t=this.options,this.angleRad=(t.angle||0)*Math.PI/180,this.startAngleRad=(p.startAngle-90)*Math.PI/180,this.endAngleRad=(m(p.endAngle,p.startAngle+360)-90)*Math.PI/180,this.offset=t.offset||0,this.isCircular=e)}),e(o,"autoLabelAlign",function(t){if(!this.isRadial)return t.apply(this,[].slice.call(arguments,1))}),e(i,"getPosition",function(t,i,a,e,o){var s=this.axis;return s.getPosition?s.getPosition(a):t.call(this,i,a,e,o)}),e(i,"getLabelPosition",function(t,i,a,e,o,s,r,n,h){var l=this.axis,p=s.y,c=20,d=s.align,u=(l.translate(this.pos)+l.startAngleRad+Math.PI/2)/Math.PI*180%360;return l.isRadial?(t=l.getPosition(this.pos,l.center[2]/2+m(s.distance,-25)),"auto"===s.rotation?e.attr({rotation:u}):null===p&&(p=l.chart.renderer.fontMetrics(e.styles.fontSize).b-e.getBBox().height/2),null===d&&(d=l.isCircular?(this.label.getBBox().width>l.len*l.tickInterval/(l.max-l.min)&&(c=0),c<u&&u<180-c?"left":180+c<u&&u<360-c?"right":"center"):"center",e.attr({align:d})),t.x+=s.x,t.y+=p):t=t.call(this,i,a,e,o,s,r,n,h),t}),e(i,"getMarkPath",function(t,i,a,e,o,s,r){var n=this.axis;return i=n.isRadial?["M",i,a,"L",(t=n.getPosition(this.pos,n.center[2]/2+e)).x,t.y]:t.call(this,i,a,e,o,s,r)}),n=(s=t).each,x=s.pick,r=s.defined,h=s.seriesType,b=s.seriesTypes,P=s.Series.prototype,p=s.Point.prototype,h("arearange","area",{lineWidth:1,threshold:null,tooltip:{pointFormat:'<span style="color:{series.color}">●</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'},trackByArea:!0,dataLabels:{align:null,verticalAlign:null,xLow:0,xHigh:0,yLow:0,yHigh:0}},{pointArrayMap:["low","high"],dataLabelCollections:["dataLabel","dataLabelUpper"],toYData:function(t){return[t.low,t.high]},pointValKey:"low",deferTranslatePolar:!0,highToXY:function(t){var i=this.chart,a=this.xAxis.postTranslate(t.rectPlotX,this.yAxis.len-t.plotHigh);t.plotHighX=a.x-i.plotLeft,t.plotHigh=a.y-i.plotTop,t.plotLowX=t.plotX},translate:function(){var o=this,s=o.yAxis,r=!!o.modifyValue;b.area.prototype.translate.apply(o),n(o.points,function(t){var i=t.low,a=t.high,e=t.plotY;null===a||null===i?(t.isNull=!0,t.plotY=null):(t.plotLow=e,t.plotHigh=s.translate(r?o.modifyValue(a,t):a,0,1,0,1),r&&(t.yBottom=t.plotHigh))}),this.chart.polar&&n(this.points,function(t){o.highToXY(t),t.tooltipPos=[(t.plotHighX+t.plotLowX)/2,(t.plotHigh+t.plotLow)/2]})},getGraphPath:function(t){var i,a,e,o,s=[],r=[],n=b.area.prototype.getGraphPath;o=this.options;var h=this.chart.polar&&!1!==o.connectEnds,l=o.connectNulls,p=o.step;for(i=(t=t||this.points).length;i--;)(a=t[i]).isNull||h||l||t[i+1]&&!t[i+1].isNull||r.push({plotX:a.plotX,plotY:a.plotY,doCurve:!1}),e={polarPlotY:a.polarPlotY,rectPlotX:a.rectPlotX,yBottom:a.yBottom,plotX:x(a.plotHighX,a.plotX),plotY:a.plotHigh,isNull:a.isNull},r.push(e),s.push(e),a.isNull||h||l||t[i-1]&&!t[i-1].isNull||r.push({plotX:a.plotX,plotY:a.plotY,doCurve:!1});return t=n.call(this,t),p&&(!0===p&&(p="left"),o.step={left:"right",center:"center",right:"left"}[p]),s=n.call(this,s),r=n.call(this,r),o.step=p,o=[].concat(t,s),this.chart.polar||"M"!==r[0]||(r[0]="L"),this.graphPath=o,this.areaPath=this.areaPath.concat(t,r),o.isArea=!0,o.xMap=t.xMap,this.areaPath.xMap=t.xMap,o},drawDataLabels:function(){var t,i,a,e=this.data,o=e.length,s=[],r=this.options.dataLabels,n=r.align,h=r.verticalAlign,l=r.inside,p=this.chart.inverted;if(r.enabled||this._hasPointLabels){for(t=o;t--;)(i=e[t])&&(a=l?i.plotHigh<i.plotLow:i.plotHigh>i.plotLow,i.y=i.high,i._plotY=i.plotY,i.plotY=i.plotHigh,s[t]=i.dataLabel,i.dataLabel=i.dataLabelUpper,i.below=a,p?n||(r.align=a?"right":"left"):h||(r.verticalAlign=a?"top":"bottom"),r.x=r.xHigh,r.y=r.yHigh);for(P.drawDataLabels&&P.drawDataLabels.apply(this,arguments),t=o;t--;)(i=e[t])&&(a=l?i.plotHigh<i.plotLow:i.plotHigh>i.plotLow,i.dataLabelUpper=i.dataLabel,i.dataLabel=s[t],i.y=i.low,i.plotY=i._plotY,i.below=!a,p?n||(r.align=a?"left":"right"):h||(r.verticalAlign=a?"bottom":"top"),r.x=r.xLow,r.y=r.yLow);P.drawDataLabels&&P.drawDataLabels.apply(this,arguments)}r.align=n,r.verticalAlign=h},alignDataLabel:function(){b.column.prototype.alignDataLabel.apply(this,arguments)},drawPoints:function(){var t,i,a=this.points.length;for(P.drawPoints.apply(this,arguments),i=0;i<a;)(t=this.points[i]).lowerGraphic=t.graphic,t.graphic=t.upperGraphic,t._plotY=t.plotY,t._plotX=t.plotX,t.plotY=t.plotHigh,r(t.plotHighX)&&(t.plotX=t.plotHighX),i++;for(P.drawPoints.apply(this,arguments),i=0;i<a;)(t=this.points[i]).upperGraphic=t.graphic,t.graphic=t.lowerGraphic,t.plotY=t._plotY,t.plotX=t._plotX,i++},setStackedPoints:s.noop},{setState:function(){var t=this.state,i=this.series,a=i.chart.polar;r(this.plotHigh)||(this.plotHigh=i.yAxis.toPixels(this.high,!0)),r(this.plotLow)||(this.plotLow=this.plotY=i.yAxis.toPixels(this.low,!0)),p.setState.apply(this,arguments),this.graphic=this.upperGraphic,this.plotY=this.plotHigh,a&&(this.plotX=this.plotHighX),this.state=t,i.stateMarkerGraphic&&(i.lowerStateMarkerGraphic=i.stateMarkerGraphic,i.stateMarkerGraphic=i.upperStateMarkerGraphic),p.setState.apply(this,arguments),this.plotY=this.plotLow,this.graphic=this.lowerGraphic,a&&(this.plotX=this.plotLowX),i.stateMarkerGraphic&&(i.upperStateMarkerGraphic=i.stateMarkerGraphic,i.stateMarkerGraphic=i.lowerStateMarkerGraphic)},haloPath:function(){var t,i=this.series.chart.polar;return this.plotY=this.plotLow,i&&(this.plotX=this.plotLowX),t=p.haloPath.apply(this,arguments),this.plotY=this.plotHigh,i&&(this.plotX=this.plotHighX),t.concat(p.haloPath.apply(this,arguments))},destroy:function(){return this.upperGraphic&&(this.upperGraphic=this.upperGraphic.destroy()),p.destroy.apply(this,arguments)}}),(0,(M=t).seriesType)("areasplinerange","arearange",null,{getPointSpline:M.seriesTypes.spline.prototype.getPointSpline}),w=(k=t).defaultPlotOptions,A=k.each,L=k.merge,v=k.noop,C=k.pick,X=k.seriesType,Y=k.seriesTypes.column.prototype,X("columnrange","arearange",L(w.column,w.arearange,{lineWidth:1,pointRange:null,marker:null,states:{hover:{halo:!1}}}),{translate:function(){var s,r,n=this,h=n.yAxis,l=n.xAxis,p=l.startAngleRad,c=n.chart,d=n.xAxis.isRadial,u=Math.max(c.chartWidth,c.chartHeight)+999;Y.translate.apply(n),A(n.points,function(t){var i,a,e=t.shapeArgs,o=n.options.minPointLength;t.plotHigh=r=Math.min(Math.max(-u,h.translate(t.high,0,1,0,1)),u),t.plotLow=Math.min(Math.max(-u,t.plotY),u),a=r,i=C(t.rectPlotY,t.plotY)-r,Math.abs(i)<o?(i+=o-=i,a-=o/2):i<0&&(a-=i*=-1),d?(s=t.barX+p,t.shapeType="path",t.shapeArgs={d:n.polarArc(a+i,a,s,s+t.pointWidth)}):(e.height=i,e.y=a,t.tooltipPos=c.inverted?[h.len+h.pos-c.plotLeft-a-i/2,l.len+l.pos-c.plotTop-e.x-e.width/2,i]:[l.left-c.plotLeft+e.x+e.width/2,h.pos-c.plotTop+a+i/2,i])})},directTouch:!0,trackerGroups:["group","dataLabelsGroup"],drawGraph:v,getSymbol:v,crispCol:Y.crispCol,drawPoints:Y.drawPoints,drawTracker:Y.drawTracker,getColumnMetrics:Y.getColumnMetrics,animate:function(){return Y.animate.apply(this,arguments)},polarArc:function(){return Y.polarArc.apply(this,arguments)},pointAttribs:Y.pointAttribs},{setState:Y.pointClass.prototype.setState}),T=(S=t).each,R=S.isNumber,z=S.merge,G=S.pick,I=S.pInt,D=S.Series,W=S.seriesType,B=S.TrackerMixin,W("gauge","line",{dataLabels:{enabled:!0,defer:!1,y:15,borderRadius:3,crop:!1,verticalAlign:"top",zIndex:2,borderWidth:1,borderColor:"#cccccc"},dial:{},pivot:{},tooltip:{headerFormat:""},showInLegend:!1},{angular:!0,directTouch:!0,drawGraph:S.noop,fixedBox:!0,forceDL:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],translate:function(){var l=this.yAxis,p=this.options,c=l.center;this.generatePoints(),T(this.points,function(t){var i=z(p.dial,t.dial),a=I(G(i.radius,80))*c[2]/200,e=I(G(i.baseLength,70))*a/100,o=I(G(i.rearLength,10))*a/100,s=i.baseWidth||3,r=i.topWidth||1,n=p.overshoot,h=l.startAngleRad+l.translate(t.y,null,null,null,!0);R(n)?(n=n/180*Math.PI,h=Math.max(l.startAngleRad-n,Math.min(l.endAngleRad+n,h))):!1===p.wrap&&(h=Math.max(l.startAngleRad,Math.min(l.endAngleRad,h))),h=180*h/Math.PI,t.shapeType="path",t.shapeArgs={d:i.path||["M",-o,-s/2,"L",e,-s/2,a,-r/2,a,r/2,e,s/2,-o,s/2,"z"],translateX:c[0],translateY:c[1],rotation:h},t.plotX=c[0],t.plotY=c[1]})},drawPoints:function(){var s=this,t=s.yAxis.center,i=s.pivot,r=s.options,a=r.pivot,n=s.chart.renderer;T(s.points,function(t){var i=t.graphic,a=t.shapeArgs,e=a.d,o=z(r.dial,t.dial);i?(i.animate(a),a.d=e):(t.graphic=n[t.shapeType](a).attr({rotation:a.rotation,zIndex:1}).addClass("highcharts-dial").add(s.group),t.graphic.attr({stroke:o.borderColor||"none","stroke-width":o.borderWidth||0,fill:o.backgroundColor||"#000000"}))}),i?i.animate({translateX:t[0],translateY:t[1]}):(s.pivot=n.circle(0,0,G(a.radius,5)).attr({zIndex:2}).addClass("highcharts-pivot").translate(t[0],t[1]).add(s.group),s.pivot.attr({"stroke-width":a.borderWidth||0,stroke:a.borderColor||"#cccccc",fill:a.backgroundColor||"#000000"}))},animate:function(t){var a=this;t||(T(a.points,function(t){var i=t.graphic;i&&(i.attr({rotation:180*a.yAxis.startAngleRad/Math.PI}),i.animate({rotation:t.shapeArgs.rotation},a.options.animation))}),a.animate=null)},render:function(){this.group=this.plotGroup("group","series",this.visible?"visible":"hidden",this.options.zIndex,this.chart.seriesGroup),D.prototype.render.call(this),this.group.clip(this.chart.clipRect)},setData:function(t,i){D.prototype.setData.call(this,t,!1),this.processData(),this.generatePoints(),G(i,!0)&&this.chart.redraw()},drawTracker:B&&B.drawTrackerPoint},{setState:function(t){this.state=t}}),O=(H=t).each,N=H.noop,V=H.pick,q=H.seriesType,_=H.seriesTypes,q("boxplot","column",{threshold:null,tooltip:{pointFormat:'<span style="color:{point.color}">●</span> <b> {series.name}</b><br/>Maximum: {point.high}<br/>Upper quartile: {point.q3}<br/>Median: {point.median}<br/>Lower quartile: {point.q1}<br/>Minimum: {point.low}<br/>'},whiskerLength:"50%",fillColor:"#ffffff",lineWidth:1,medianWidth:2,states:{hover:{brightness:-.3}},whiskerWidth:2},{pointArrayMap:["low","q1","median","q3","high"],toYData:function(t){return[t.low,t.q1,t.median,t.q3,t.high]},pointValKey:"high",pointAttribs:function(t){var i=this.options,a=t&&t.color||this.color;return{fill:t.fillColor||i.fillColor||a,stroke:i.lineColor||a,"stroke-width":i.lineWidth||0}},drawDataLabels:N,translate:function(){var a=this.yAxis,t=this.pointArrayMap;_.column.prototype.translate.apply(this),O(this.points,function(i){O(t,function(t){null!==i[t]&&(i[t+"Plot"]=a.translate(i[t],0,1,0,1))})})},drawPoints:function(){var h,l,p,c,d,u,g,f,m,y,x,b=this,P=b.options,M=b.chart.renderer,k=0,w=!1!==b.doQuartiles,A=b.options.whiskerLength;O(b.points,function(t){var i=t.graphic,a=i?"animate":"attr",e=t.shapeArgs,o={},s={},r={},n=t.color||b.color;void 0!==t.plotY&&(g=e.width,f=Math.floor(e.x),m=f+g,y=Math.round(g/2),h=Math.floor(w?t.q1Plot:t.lowPlot),l=Math.floor(w?t.q3Plot:t.lowPlot),p=Math.floor(t.highPlot),c=Math.floor(t.lowPlot),i||(t.graphic=i=M.g("point").add(b.group),t.stem=M.path().addClass("highcharts-boxplot-stem").add(i),A&&(t.whiskers=M.path().addClass("highcharts-boxplot-whisker").add(i)),w&&(t.box=M.path(void 0).addClass("highcharts-boxplot-box").add(i)),t.medianShape=M.path(void 0).addClass("highcharts-boxplot-median").add(i)),o.stroke=t.stemColor||P.stemColor||n,o["stroke-width"]=V(t.stemWidth,P.stemWidth,P.lineWidth),o.dashstyle=t.stemDashStyle||P.stemDashStyle,t.stem.attr(o),A&&(s.stroke=t.whiskerColor||P.whiskerColor||n,s["stroke-width"]=V(t.whiskerWidth,P.whiskerWidth,P.lineWidth),t.whiskers.attr(s)),w&&(i=b.pointAttribs(t),t.box.attr(i)),r.stroke=t.medianColor||P.medianColor||n,r["stroke-width"]=V(t.medianWidth,P.medianWidth,P.lineWidth),t.medianShape.attr(r),u=t.stem.strokeWidth()%2/2,k=f+y+u,t.stem[a]({d:["M",k,l,"L",k,p,"M",k,h,"L",k,c]}),w&&(u=t.box.strokeWidth()%2/2,h=Math.floor(h)+u,l=Math.floor(l)+u,f+=u,m+=u,t.box[a]({d:["M",f,l,"L",f,h,"L",m,h,"L",m,l,"L",f,l,"z"]})),A&&(u=t.whiskers.strokeWidth()%2/2,p+=u,c+=u,x=/%$/.test(A)?y*parseFloat(A)/100:A/2,t.whiskers[a]({d:["M",k-x,p,"L",k+x,p,"M",k-x,c,"L",k+x,c]})),d=Math.round(t.medianPlot),u=t.medianShape.strokeWidth()%2/2,d+=u,t.medianShape[a]({d:["M",f,d,"L",m,d]}))})},setStackedPoints:N}),K=(E=t).each,U=E.noop,F=E.seriesType,$=E.seriesTypes,F("errorbar","boxplot",{color:"#000000",grouping:!1,linkedTo:":previous",tooltip:{pointFormat:'<span style="color:{point.color}">●</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'},whiskerWidth:null},{type:"errorbar",pointArrayMap:["low","high"],toYData:function(t){return[t.low,t.high]},pointValKey:"high",doQuartiles:!1,drawDataLabels:$.arearange?function(){var i=this.pointValKey;$.arearange.prototype.drawDataLabels.call(this),K(this.data,function(t){t.y=t[i]})}:U,getColumnMetrics:function(){return this.linkedParent&&this.linkedParent.columnMetrics||$.column.prototype.getColumnMetrics.call(this)}}),Z=(Q=t).correctFloat,j=Q.isNumber,J=Q.pick,tt=Q.Point,it=Q.Series,at=Q.seriesType,et=Q.seriesTypes,at("waterfall","column",{dataLabels:{inside:!0},lineWidth:1,lineColor:"#333333",dashStyle:"dot",borderColor:"#333333",states:{hover:{lineWidthPlus:0}}},{pointValKey:"y",translate:function(){var t,i,a,e,o,s,r,n,h,l,p,c=this.options,d=this.yAxis,u=J(c.minPointLength,5),g=u/2,f=c.threshold,m=c.stacking;for(et.column.prototype.translate.apply(this),n=h=f,t=0,c=(i=this.points).length;t<c;t++)a=i[t],r=this.processedYData[t],e=a.shapeArgs,o=m&&d.stacks[(this.negStacks&&r<f?"-":"")+this.stackKey],p=this.getStackIndicator(p,a.x,this.index),l=o?o[a.x].points[p.key]:[0,r],a.isSum?a.y=Z(r):a.isIntermediateSum&&(a.y=Z(r-h)),s=Math.max(n,n+a.y)+l[0],e.y=d.translate(s,0,1,0,1),a.isSum?(e.y=d.translate(l[1],0,1,0,1),e.height=Math.min(d.translate(l[0],0,1,0,1),d.len)-e.y):a.isIntermediateSum?(e.y=d.translate(l[1],0,1,0,1),e.height=Math.min(d.translate(h,0,1,0,1),d.len)-e.y,h=l[1]):(e.height=0<r?d.translate(n,0,1,0,1)-e.y:d.translate(n,0,1,0,1)-d.translate(n-r,0,1,0,1),n+=o&&o[a.x]?o[a.x].total:r),e.height<0&&(e.y+=e.height,e.height*=-1),a.plotY=e.y=Math.round(e.y)-this.borderWidth%2/2,e.height=Math.max(Math.round(e.height),.001),a.yBottom=e.y+e.height,e.height<=u&&!a.isNull?(e.height=u,e.y-=g,a.plotY=e.y,a.minPointLengthOffset=a.y<0?-g:g):a.minPointLengthOffset=0,e=a.plotY+(a.negative?e.height:0),this.chart.inverted?a.tooltipPos[0]=d.len-e:a.tooltipPos[1]=e},processData:function(t){var i,a,e,o,s,r,n,h=this.yData,l=this.options.data,p=h.length;for(e=a=o=s=this.options.threshold||0,n=0;n<p;n++)r=h[n],i=l&&l[n]?l[n]:{},"sum"===r||i.isSum?h[n]=Z(e):"intermediateSum"===r||i.isIntermediateSum?h[n]=Z(a):(e+=r,a+=r),o=Math.min(e,o),s=Math.max(e,s);it.prototype.processData.call(this,t),this.options.stacking||(this.dataMin=o,this.dataMax=s)},toYData:function(t){return t.isSum?0===t.x?null:"sum":t.isIntermediateSum?0===t.x?null:"intermediateSum":t.y},pointAttribs:function(t,i){var a=this.options.upColor;return a&&!t.options.color&&(t.color=0<t.y?a:null),delete(t=et.column.prototype.pointAttribs.call(this,t,i)).dashstyle,t},getGraphPath:function(){return["M",0,0]},getCrispPath:function(){var t,i,a,e=this.data,o=e.length,s=this.graph.strokeWidth()+this.borderWidth,r=(s=Math.round(s)%2/2,this.yAxis.reversed),n=[];for(a=1;a<o;a++)i=e[a].shapeArgs,i=["M",(t=e[a-1].shapeArgs).x+t.width,t.y+e[a-1].minPointLengthOffset+s,"L",i.x,t.y+e[a-1].minPointLengthOffset+s],(e[a-1].y<0&&!r||0<e[a-1].y&&r)&&(i[2]+=t.height,i[5]+=t.height),n=n.concat(i);return n},drawGraph:function(){it.prototype.drawGraph.call(this),this.graph.attr({d:this.getCrispPath()})},setStackedPoints:function(){var t,i,a=this.options;for(it.prototype.setStackedPoints.apply(this,arguments),t=this.stackedYData?this.stackedYData.length:0,i=1;i<t;i++)a.data[i].isSum||a.data[i].isIntermediateSum||(this.stackedYData[i]+=this.stackedYData[i-1])},getExtremes:function(){if(this.options.stacking)return it.prototype.getExtremes.apply(this,arguments)}},{getClassName:function(){var t=tt.prototype.getClassName.call(this);return this.isSum?t+=" highcharts-sum":this.isIntermediateSum&&(t+=" highcharts-intermediate-sum"),t},isValid:function(){return j(this.y,!0)||this.isSum||this.isIntermediateSum}}),st=(ot=t).Series,rt=ot.seriesType,nt=ot.seriesTypes,rt("polygon","scatter",{marker:{enabled:!1,states:{hover:{enabled:!1}}},stickyTracking:!1,tooltip:{followPointer:!0,pointFormat:""},trackByArea:!0},{type:"polygon",getGraphPath:function(){for(var t=st.prototype.getGraphPath.call(this),i=t.length+1;i--;)(i===t.length||"M"===t[i])&&0<i&&t.splice(i,0,"z");return this.areaPath=t},drawGraph:function(){this.options.fillColor=this.color,nt.area.prototype.drawGraph.call(this)},drawLegendSymbol:ot.LegendSymbolMixin.drawRectangle,drawTracker:st.prototype.drawTracker,setStackedPoints:ot.noop}),lt=(ht=t).arrayMax,pt=ht.arrayMin,ct=ht.Axis,dt=ht.color,ut=ht.each,gt=ht.isNumber,ft=ht.noop,mt=ht.pick,yt=ht.pInt,xt=ht.Point,bt=ht.Series,Pt=ht.seriesType,Mt=ht.seriesTypes,Pt("bubble","scatter",{dataLabels:{formatter:function(){return this.point.z},inside:!0,verticalAlign:"middle"},marker:{lineColor:null,lineWidth:1,radius:null,states:{hover:{radiusPlus:0}},symbol:"circle"},minSize:8,maxSize:"20%",softThreshold:!1,states:{hover:{halo:{size:5}}},tooltip:{pointFormat:"({point.x}, {point.y}), Size: {point.z}"},turboThreshold:0,zThreshold:0,zoneAxis:"z"},{pointArrayMap:["y","z"],parallelArrays:["x","y","z"],trackerGroups:["group","dataLabelsGroup"],specialGroup:"group",bubblePadding:!0,zoneAxis:"z",directTouch:!0,pointAttribs:function(t,i){var a=mt(this.options.marker.fillOpacity,.5);return t=bt.prototype.pointAttribs.call(this,t,i),1!==a&&(t.fill=dt(t.fill).setOpacity(a).get("rgba")),t},getRadii:function(t,i,a,e){var o,s,r,n=this.zData,h=[],l=this.options,p="width"!==l.sizeBy,c=l.zThreshold,d=i-t;for(s=0,o=n.length;s<o;s++)r=n[s],l.sizeByAbsoluteValue&&null!==r&&(r=Math.abs(r-c),i=Math.max(i-c,Math.abs(t-c)),t=0),r=null===r?null:r<t?a/2-1:(r=0<d?(r-t)/d:.5,p&&0<=r&&(r=Math.sqrt(r)),Math.ceil(a+r*(e-a))/2),h.push(r);this.radii=h},animate:function(t){var e=this.options.animation;t||(ut(this.points,function(t){var i,a=t.graphic;a&&a.width&&(i={x:a.x,y:a.y,width:a.width,height:a.height},a.attr({x:t.plotX,y:t.plotY,width:1,height:1}),a.animate(i,e))}),this.animate=null)},translate:function(){var t,i,a,e=this.data,o=this.radii;for(Mt.scatter.prototype.translate.call(this),t=e.length;t--;)i=e[t],a=o?o[t]:0,gt(a)&&a>=this.minPxSize/2?(i.marker=ht.extend(i.marker,{radius:a,width:2*a,height:2*a}),i.dlBox={x:i.plotX-a,y:i.plotY-a,width:2*a,height:2*a}):i.shapeArgs=i.plotY=i.dlBox=void 0},alignDataLabel:Mt.column.prototype.alignDataLabel,buildKDTree:ft,applyZones:ft},{haloPath:function(t){return xt.prototype.haloPath.call(this,0===t?0:(this.marker&&this.marker.radius||0)+t)},ttBelow:!1}),ct.prototype.beforePadding=function(){var o=this,t=this.len,i=this.chart,s=0,r=t,n=this.isXAxis,h=n?"xData":"yData",l=this.min,p={},c=Math.min(i.plotWidth,i.plotHeight),d=Number.MAX_VALUE,u=-Number.MAX_VALUE,g=this.max-l,f=t/g,a=[];ut(this.series,function(t){var e=t.options;!t.bubblePadding||!t.visible&&i.options.chart.ignoreHiddenSeries||(o.allowZoomOutside=!0,a.push(t),n&&(ut(["minSize","maxSize"],function(t){var i=e[t],a=/%$/.test(i);i=yt(i),p[t]=a?c*i/100:i}),t.minPxSize=p.minSize,t.maxPxSize=Math.max(p.maxSize,p.minSize),(t=t.zData).length&&(d=mt(e.zMin,Math.min(d,Math.max(pt(t),!1===e.displayNegative?e.zThreshold:-Number.MAX_VALUE))),u=mt(e.zMax,Math.max(u,lt(t))))))}),ut(a,function(t){var i,a=t[h],e=a.length;if(n&&t.getRadii(d,u,t.minPxSize,t.maxPxSize),0<g)for(;e--;)gt(a[e])&&o.dataMin<=a[e]&&a[e]<=o.dataMax&&(i=t.radii[e],s=Math.min((a[e]-l)*f-i,s),r=Math.max((a[e]-l)*f+i,r))}),a.length&&0<g&&!this.isLog&&(f*=(t+s-(r-=t))/t,ut([["min","userMin",s],["max","userMax",r]],function(t){void 0===mt(o.options[t[0]],o[t[1]])&&(o[t[0]]+=t[2]/f)}))},function(a){function t(t,i){var a=this.chart,e=this.options.animation,o=this.group,s=this.markerGroup,r=this.xAxis.center,n=a.plotLeft,h=a.plotTop;a.polar?a.renderer.isSVG&&(!0===e&&(e={}),i?(t={translateX:r[0]+n,translateY:r[1]+h,scaleX:.001,scaleY:.001},o.attr(t),s&&s.attr(t)):(t={translateX:n,translateY:h,scaleX:1,scaleY:1},o.animate(t,e),s&&s.animate(t,e),this.animate=null)):t.call(this,i)}var n=a.each,r=a.pick,i=a.seriesTypes,e=a.wrap,h=a.Series.prototype,o=a.Pointer.prototype;h.searchPointByAngle=function(t){var i=this.chart,a=this.xAxis.pane.center;return this.searchKDTree({clientX:180+-180/Math.PI*Math.atan2(t.chartX-a[0]-i.plotLeft,t.chartY-a[1]-i.plotTop)})},h.getConnectors=function(t,i,a,e){var o,s,r,n,h,l,p,c;return s=e?1:0,i=(o=0<=i&&i<=t.length-1?i:i<0?t.length-1+i:0)-1<0?t.length-(1+s):o-1,s=o+1>t.length-1?s:o+1,r=t[i],s=t[s],n=r.plotX,r=r.plotY,h=s.plotX,l=s.plotY,n=(1.5*(s=t[o].plotX)+n)/2.5,r=(1.5*(o=t[o].plotY)+r)/2.5,h=(1.5*s+h)/2.5,p=(1.5*o+l)/2.5,l=Math.sqrt(Math.pow(n-s,2)+Math.pow(r-o,2)),c=Math.sqrt(Math.pow(h-s,2)+Math.pow(p-o,2)),n=Math.atan2(r-o,n-s),p=Math.PI/2+(n+Math.atan2(p-o,h-s))/2,Math.abs(n-p)>Math.PI/2&&(p-=Math.PI),n=s+Math.cos(p)*l,r=o+Math.sin(p)*l,s={rightContX:h=s+Math.cos(Math.PI+p)*c,rightContY:p=o+Math.sin(Math.PI+p)*c,leftContX:n,leftContY:r,plotX:s,plotY:o},a&&(s.prevPointCont=this.getConnectors(t,i,!1,e)),s},e(h,"buildKDTree",function(t){this.chart.polar&&(this.kdByAngle?this.searchPoint=this.searchPointByAngle:this.options.findNearestPointBy="xy"),t.apply(this)}),h.toXY=function(t){var i,a=this.chart,e=t.plotX;i=t.plotY,t.rectPlotX=e,t.rectPlotY=i,i=this.xAxis.postTranslate(t.plotX,this.yAxis.len-i),t.plotX=t.polarPlotX=i.x-a.plotLeft,t.plotY=t.polarPlotY=i.y-a.plotTop,this.kdByAngle?((a=(e/Math.PI*180+this.xAxis.pane.options.startAngle)%360)<0&&(a+=360),t.clientX=a):t.clientX=t.plotX},i.spline&&(e(i.spline.prototype,"getPointSpline",function(t,i,a,e){return t=this.chart.polar?e?["C",(t=this.getConnectors(i,e,!0,this.connectEnds)).prevPointCont.rightContX,t.prevPointCont.rightContY,t.leftContX,t.leftContY,t.plotX,t.plotY]:["M",a.plotX,a.plotY]:t.call(this,i,a,e)}),i.areasplinerange&&(i.areasplinerange.prototype.getPointSpline=i.spline.prototype.getPointSpline)),e(h,"translate",function(t){var i=this.chart;if(t.call(this),i.polar&&(this.kdByAngle=i.tooltip&&i.tooltip.shared,!this.preventPostTranslate))for(i=(t=this.points).length;i--;)this.toXY(t[i])}),e(h,"getGraphPath",function(t,i){var a,e,o,s=this;if(this.chart.polar){for(i=i||this.points,a=0;a<i.length;a++)if(!i[a].isNull){e=a;break}!1!==this.options.connectEnds&&void 0!==e&&(this.connectEnds=!0,i.splice(i.length,0,i[e]),o=!0),n(i,function(t){void 0===t.polarPlotY&&s.toXY(t)})}return a=t.apply(this,[].slice.call(arguments,1)),o&&i.pop(),a}),e(h,"animate",t),i.column&&((i=i.column.prototype).polarArc=function(t,i,a,e){var o=this.xAxis.center,s=this.yAxis.len;return this.chart.renderer.symbols.arc(o[0],o[1],s-i,null,{start:a,end:e,innerR:s-r(t,s)})},e(i,"animate",t),e(i,"translate",function(t){var i,a,e,o=this.xAxis,s=o.startAngleRad;if(this.preventPostTranslate=!0,t.call(this),o.isRadial)for(e=(i=this.points).length;e--;)t=(a=i[e]).barX+s,a.shapeType="path",a.shapeArgs={d:this.polarArc(a.yBottom,a.plotY,t,t+a.pointWidth)},this.toXY(a),a.tooltipPos=[a.plotX,a.plotY],a.ttBelow=a.plotY>o.center[1]}),e(i,"alignDataLabel",function(t,i,a,e,o,s){this.chart.polar?(t=i.rectPlotX/Math.PI*180,null===e.align&&(e.align=20<t&&t<160?"left":200<t&&t<340?"right":"center"),null===e.verticalAlign&&(e.verticalAlign=t<45||315<t?"bottom":135<t&&t<225?"top":"middle"),h.alignDataLabel.call(this,i,a,e,o,s)):t.call(this,i,a,e,o,s)})),e(o,"getCoordinates",function(t,o){var s=this.chart,r={xAxis:[],yAxis:[]};return s.polar?n(s.axes,function(t){var i=t.isXAxis,a=t.center,e=o.chartX-a[0]-s.plotLeft;a=o.chartY-a[1]-s.plotTop;r[i?"xAxis":"yAxis"].push({axis:t,value:t.translate(i?Math.PI-Math.atan2(e,a):Math.sqrt(Math.pow(e,2)+Math.pow(a,2)),!0)})}):r=t.call(this,o),r}),e(a.Chart.prototype,"getAxes",function(t){this.pane||(this.pane=[]),n(a.splat(this.options.pane),function(t){new a.Pane(t,this)},this),t.call(this)}),e(a.Chart.prototype,"drawChartBox",function(t){t.call(this),n(this.pane,function(t){t.render()})}),e(a.Chart.prototype,"get",function(t,i){return a.find(this.pane,function(t){return t.options.id===i})||t.call(this,i)})}(t)});