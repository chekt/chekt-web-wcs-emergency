(self.webpackChunkchekt_web_wcs=self.webpackChunkchekt_web_wcs||[]).push([[8719],{23683:(b,x,c)=>{var t=x,{Buffer:P}=c(16853),f=c(65049);t.toBuffer=function(n,i,o){var r;if(o=~~o,this.isV4Format(n))r=i||new P(o+4),n.split(/\./g).map(m=>{r[o++]=255&parseInt(m,10)});else if(this.isV6Format(n)){var g,l=n.split(":",8);for(g=0;g<l.length;g++){var h;this.isV4Format(l[g])&&(h=this.toBuffer(l[g]),l[g]=h.slice(0,2).toString("hex")),h&&++g<8&&l.splice(g,0,h.slice(2,4).toString("hex"))}if(""===l[0])for(;l.length<8;)l.unshift("0");else if(""===l[l.length-1])for(;l.length<8;)l.push("0");else if(l.length<8){for(g=0;g<l.length&&""!==l[g];g++);var u=[g,1];for(g=9-l.length;g>0;g--)u.push("0");l.splice.apply(l,u)}for(r=i||new P(o+16),g=0;g<l.length;g++){var M=parseInt(l[g],16);r[o++]=M>>8&255,r[o++]=255&M}}if(!r)throw Error(`Invalid ip address: ${n}`);return r},t.toString=function(n,i,o){i=~~i;var l,r=[];if(4===(o=o||n.length-i)){for(l=0;l<o;l++)r.push(n[i+l]);r=r.join(".")}else if(16===o){for(l=0;l<o;l+=2)r.push(n.readUInt16BE(i+l).toString(16));r=(r=(r=r.join(":")).replace(/(^|:)0(:0)*:0(:|$)/,"$1::$3")).replace(/:{3,4}/,"::")}return r};var a=/^(\d{1,3}\.){3,3}\d{1,3}$/,v=/^(::)?(((\d{1,3}\.){3}(\d{1,3}){1})?([0-9a-f]){0,4}:{0,2}){1,8}(::)?$/i;function d(n){return 4===n?"ipv4":6===n?"ipv6":n?n.toLowerCase():"ipv4"}t.isV4Format=function(n){return a.test(n)},t.isV6Format=function(n){return v.test(n)},t.fromPrefixLen=function(n,i){var o=4;"ipv6"===(i=n>32?"ipv6":d(i))&&(o=16);for(var r=new P(o),l=0,g=r.length;l<g;++l){var O=8;n<8&&(O=n),n-=O,r[l]=255&~(255>>O)}return t.toString(r)},t.mask=function(n,i){n=t.toBuffer(n),i=t.toBuffer(i);var r,o=new P(Math.max(n.length,i.length));if(n.length===i.length)for(r=0;r<n.length;r++)o[r]=n[r]&i[r];else if(4===i.length)for(r=0;r<i.length;r++)o[r]=n[n.length-4+r]&i[r];else{for(r=0;r<o.length-6;r++)o[r]=0;for(o[10]=255,o[11]=255,r=0;r<n.length;r++)o[r+12]=n[r]&i[r+12];r+=12}for(;r<o.length;r++)o[r]=0;return t.toString(o)},t.cidr=function(n){var i=n.split("/"),o=i[0];if(2!==i.length)throw new Error(`invalid CIDR subnet: ${o}`);var r=t.fromPrefixLen(parseInt(i[1],10));return t.mask(o,r)},t.subnet=function(n,i){for(var o=t.toLong(t.mask(n,i)),r=t.toBuffer(i),l=0,g=0;g<r.length;g++)if(255===r[g])l+=8;else for(var O=255&r[g];O;)O=O<<1&255,l++;var h=Math.pow(2,32-l);return{networkAddress:t.fromLong(o),firstAddress:t.fromLong(h<=2?o:o+1),lastAddress:t.fromLong(h<=2?o+h-1:o+h-2),broadcastAddress:t.fromLong(o+h-1),subnetMask:i,subnetMaskLength:l,numHosts:h<=2?h:h-2,length:h,contains:u=>o===t.toLong(t.mask(u,i))}},t.cidrSubnet=function(n){var i=n.split("/"),o=i[0];if(2!==i.length)throw new Error(`invalid CIDR subnet: ${o}`);var r=t.fromPrefixLen(parseInt(i[1],10));return t.subnet(o,r)},t.not=function(n){for(var i=t.toBuffer(n),o=0;o<i.length;o++)i[o]=255^i[o];return t.toString(i)},t.or=function(n,i){var o;if(n=t.toBuffer(n),i=t.toBuffer(i),n.length===i.length){for(o=0;o<n.length;++o)n[o]|=i[o];return t.toString(n)}var r=n,l=i;i.length>n.length&&(r=i,l=n);var g=r.length-l.length;for(o=g;o<r.length;++o)r[o]|=l[o-g];return t.toString(r)},t.isEqual=function(n,i){var o;if(n=t.toBuffer(n),i=t.toBuffer(i),n.length===i.length){for(o=0;o<n.length;o++)if(n[o]!==i[o])return!1;return!0}if(4===i.length){var r=i;i=n,n=r}for(o=0;o<10;o++)if(0!==i[o])return!1;var l=i.readUInt16BE(10);if(0!==l&&65535!==l)return!1;for(o=0;o<4;o++)if(n[o]!==i[o+12])return!1;return!0},t.isPrivate=function(n){return/^(::f{4}:)?10\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(n)||/^(::f{4}:)?192\.168\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(n)||/^(::f{4}:)?172\.(1[6-9]|2\d|30|31)\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(n)||/^(::f{4}:)?127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(n)||/^(::f{4}:)?169\.254\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(n)||/^f[cd][0-9a-f]{2}:/i.test(n)||/^fe80:/i.test(n)||/^::1$/.test(n)||/^::$/.test(n)},t.isPublic=function(n){return!t.isPrivate(n)},t.isLoopback=function(n){return/^(::f{4}:)?127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})/.test(n)||/^fe80::1$/.test(n)||/^::1$/.test(n)||/^::$/.test(n)},t.loopback=function(n){if("ipv4"!==(n=d(n))&&"ipv6"!==n)throw new Error("family must be ipv4 or ipv6");return"ipv4"===n?"127.0.0.1":"fe80::1"},t.address=function(n,i){var o=f.networkInterfaces();if(i=d(i),n&&"private"!==n&&"public"!==n){var r=o[n].filter(g=>d(g.family)===i);return 0===r.length?void 0:r[0].address}var l=Object.keys(o).map(g=>{var O=o[g].filter(h=>(h.family=d(h.family),h.family===i&&!t.isLoopback(h.address)&&(!n||("public"===n?t.isPrivate(h.address):t.isPublic(h.address)))));return O.length?O[0].address:void 0}).filter(Boolean);return l.length?l[0]:t.loopback(i)},t.toLong=function(n){var i=0;return n.split(".").forEach(o=>{i<<=8,i+=parseInt(o)}),i>>>0},t.fromLong=function(n){return`${n>>>24}.${n>>16&255}.${n>>8&255}.${255&n}`}},65049:(b,x,c)=>{b.exports=c(65049)},41515:(b,x,c)=>{"use strict";c.d(x,{K:()=>S});var t=c(42741),P=c(29026),f=c(90818),a=c(56880),v=c(78806),d=c(93220),n=c(16274),i=c(95974);const o=["snapshotbox"];function r(p,C){1&p&&(t.TgZ(0,"div",9),t._uU(1,"View Live Snapshot"),t._UZ(2,"br"),t._uU(3,"Permission Denied"),t.qZA())}function l(p,C){1&p&&(t.TgZ(0,"div",9),t._uU(1,"This camera is offline"),t.qZA())}function g(p,C){if(1&p&&(t.TgZ(0,"div",9),t.TgZ(1,"div",10),t._uU(2,"This camera is privacy Mode"),t.qZA(),t._UZ(3,"img",11),t.qZA()),2&p){const e=t.oxw();t.xp6(3),t.Q6J("src",e.camera.privacy_background_image_url,t.LSH)}}function O(p,C){if(1&p&&t._UZ(0,"img",12),2&p){const e=t.oxw();t.Q6J("src",e.snapshot,t.LSH)("@imgShow",void 0)}}function h(p,C){1&p&&(t.TgZ(0,"div",13),t.TgZ(1,"div",14),t.O4$(),t.TgZ(2,"svg",15),t._UZ(3,"circle",16),t.qZA(),t.qZA(),t.qZA()),2&p&&t.Q6J("@imgShow",void 0)}function u(p,C){if(1&p){const e=t.EpF();t.O4$(),t.TgZ(0,"circle",20),t.NdJ("mousedown",function(_){const D=t.CHM(e).$implicit;return t.oxw(2).startAdjustPoint(D,_)})("mouseup",function(){return t.CHM(e),t.oxw(2).endAdjustPoint()}),t.qZA()}if(2&p){const e=C.$implicit;t.uIk("cx",e[0])("cy",e[1])}}const M=function(p){return{selected:p}},m=function(p,C){return{selected:p,moveArea:C}};function E(p,C){if(1&p){const e=t.EpF();t.O4$(),t.TgZ(0,"svg",17),t.TgZ(1,"polygon",18),t.NdJ("mousedown",function(_){const D=t.CHM(e).$implicit;return t.oxw().dragStart(D,_)})("mousemove",function(_){const D=t.CHM(e).$implicit;return t.oxw().drag(D,_)})("mouseup",function(){return t.CHM(e),t.oxw().dragOver()}),t.qZA(),t.YNc(2,u,1,2,"circle",19),t.qZA()}if(2&p){const e=C.$implicit,s=t.oxw();t.Q6J("ngClass",t.VKq(4,M,e.selected)),t.xp6(1),t.Q6J("ngClass",t.WLB(6,m,e.selected,e.selected)),t.uIk("points",s.getPoints(e)),t.xp6(1),t.Q6J("ngForOf",s.adj_points)}}function w(p,C){if(1&p){const e=t.EpF();t.TgZ(0,"div",24),t.NdJ("mouseenter",function(){const A=t.CHM(e).$implicit;return t.oxw(2).hoverArea(A)})("mouseleave",function(){const A=t.CHM(e).$implicit;return t.oxw(2).unhoverArea(A)}),t.TgZ(1,"div",25),t.NdJ("click",function(){const A=t.CHM(e).$implicit;return t.oxw(2).selectArea(A)}),t._uU(2),t.qZA(),t.TgZ(3,"comp-icon",26),t.NdJ("click",function(_){const D=t.CHM(e).$implicit,T=t.oxw(2);return _.stopPropagation(),T.deleteArea(D)}),t.qZA(),t.qZA()}if(2&p){const e=C.$implicit;t.xp6(2),t.Oqu(e.name),t.xp6(1),t.Q6J("icon","close")("size",14)("color","")}}function Z(p,C){if(1&p){const e=t.EpF();t.TgZ(0,"div",27),t.NdJ("click",function(){return t.CHM(e),t.oxw(2).addArea()}),t._uU(1,"+ AI Alarm Detection Area"),t.qZA()}if(2&p){const e=t.oxw(2);t.ekj("disabled",e.areas.length>=15)}}function y(p,C){if(1&p&&(t.TgZ(0,"div",21),t.YNc(1,w,4,4,"div",22),t.YNc(2,Z,2,2,"div",23),t.qZA()),2&p){const e=t.oxw();t.xp6(1),t.Q6J("ngForOf",e.areas),t.xp6(1),t.Q6J("ngIf",!e.sel_area&&!e.areas.length&&e.isCameraSupportingSnapshot())}}function I(p,C){if(1&p){const e=t.EpF();t.TgZ(0,"div",21),t.TgZ(1,"div",28),t.TgZ(2,"div",29),t.TgZ(3,"input",30),t.NdJ("change",function(_){return t.CHM(e),t.oxw().changeAreaName(_)}),t.qZA(),t.qZA(),t.TgZ(4,"div",31),t.TgZ(5,"div",32),t.NdJ("click",function(){return t.CHM(e),t.oxw().applyArea()}),t.TgZ(6,"div",33),t._uU(7),t.qZA(),t.qZA(),t.TgZ(8,"div",34),t.NdJ("click",function(){return t.CHM(e),t.oxw().cancelArea()}),t.TgZ(9,"div",33),t._uU(10,"Cancel"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()}if(2&p){const e=t.oxw();t.xp6(3),t.Q6J("value",e.sel_area.name),t.xp6(4),t.Oqu(e.sel_area.isAdded?"Save":"Add")}}let S=(()=>{class p{constructor(e,s,_){this.commonService=e,this.devicesService=s,this._DomSanitizer=_,this.isPrivacy=!1,this.enableExclusionZone=!1,this.metaChange=new t.vpe,this.point=null,this.scaleWidth=1,this.scaleHeight=1,this.str="",this.areas=[],this.sel_area=null,this.shapeDefault=[[4.8,2.7],[4.8,4.5],[4.8,6.3],[8,6.3],[11.2,6.3],[11.2,4.5],[11.2,2.7],[8,2.7]],this.is_adjust=!1,this.prev_point=[],this.isDrag=!1}ngOnInit(){this.parseMeta()}ngAfterViewInit(){this.setSvgScale()}ngOnChanges(e){this.snapshot||this.getSnapshot(),e.meta&&(this.initData(),this.setSvgScale(),this.parseMeta())}onMouseUp(e){this.is_adjust=!1,this.adj_point=null,this.isDrag=!1}setSvgScale(){setTimeout(()=>{this.scaleWidth=16/this.snapshotbox.nativeElement.clientWidth,this.scaleHeight=9/this.snapshotbox.nativeElement.clientHeight},10)}initData(){this.areas.forEach(e=>e.isSelected=!1),this.sel_area=null,this.adj_points=null}isCameraHasLiveVideoPrem(){var e;return null===(e=this.camera)||void 0===e?void 0:e.has_live_video_permission}isCameraOffline(){var e;return!this.camera.is_online&&(null===(e=this.camera)||void 0===e?void 0:e.has_live_video_permission)}isCameraSupportingSnapshot(){var e;return this.snapshot&&this.camera.is_online&&(null===(e=this.camera)||void 0===e?void 0:e.has_live_video_permission)&&!this.camera.is_privacy}isLoadingCameraSupportingSnapshot(){return!this.snapshot&&this.camera.is_online&&!this.camera.is_privacy}isCameraPrivacyMode(){var e;return this.camera.is_privacy&&(null===(e=this.camera)||void 0===e?void 0:e.has_live_video_permission)}parseFirmwareVersion(e){let s="";if(e.firmware_version)try{s=JSON.parse(e.firmware_version).bridge.replace("V","").split(".").slice(0,4).join(".")}catch(_){s=e.firmware_version.replace("V","").split(".").slice(0,4).join(".")}return s}checkFirmwareVersionForSnapshot(e){const s=this.parseFirmwareVersion(e);return f.Z.tool.firmware_version_greater_than_or_equal_to(s,"1.2.5.2")}getSnapshot(){const e=this.camera;if(this.checkFirmwareVersionForSnapshot(e.bridge)){if(!e.snapshot_url||!e||!e.is_registered||!e.is_online||e.is_privacy)return;this.devicesService.getSnapshotV2(e.snapshot_url).subscribe(_=>{"no image"!==_&&e&&(this.snapshot=this._DomSanitizer.bypassSecurityTrustUrl("data:image/jpeg;base64,"+_.data))},_=>{console.debug(_)})}else{if(!e||!e.is_registered||!e.is_online||e.is_privacy)return;this.devicesService.getSnapshot(e).subscribe(_=>{"no image"!==_&&e&&(this.snapshot=this._DomSanitizer.bypassSecurityTrustUrl("data:image/jpeg;base64,"+_.data))},_=>{console.debug(_)})}}parseMeta(){this.meta?(this.areas=JSON.parse(this.meta),this.areas.forEach(e=>e.points=this.parseUpScalePointPoints(e.points))):this.areas=[]}parseUpScalePointPoints(e){return e.map(s=>[16*s[0],9*s[1]])}parseDownScalePointPoints(e){return e.map(s=>[parseFloat((s[0]/16).toFixed(5)),parseFloat((s[1]/9).toFixed(5))])}addArea(){if(this.areas.length>=15)return;let e={name:""};e.points=f.Z._.cloneDeep(this.shapeDefault),this.adj_points=e.points,this.selectArea(e),this.areas.push(e)}deleteArea(e){this.areas=this.areas.filter(s=>s!=e),this.metaChange.next(this.areas.length?[JSON.stringify(this.areas),"delete"]:[null,"delete"])}selectArea(e){e.selected=!0,e.isAdded=!0,this.sel_area=e,this.sel_area.points=e.points,e.points?(this.area_origin={name:e.name,points:f.Z._.cloneDeep(e.points),type:e.type,isAdded:e.isAdded},this.adj_points=e.points):this.area_origin=null}changeAreaName(e){this.sel_area.name=e.target.value?e.target.value:"No Name"}applyArea(){this.sel_area.name||(this.sel_area.name="No Name"),this.sel_area.selected=null,this.sel_area.isAdded=!0,this.sel_area=null,this.adj_points=null,this.areas.forEach(e=>{e.points=this.parseDownScalePointPoints(e.points),null==e||delete e.selected,null==e||delete e.isAdded}),this.metaChange.next([JSON.stringify(this.areas),"add"])}cancelArea(){this.area_origin&&this.sel_area.isAdded?(this.sel_area.name=this.area_origin.name,this.sel_area.points=f.Z._.cloneDeep(this.area_origin.points),this.sel_area.type=this.area_origin.type,this.sel_area.selected=null):this.areas=this.areas.filter(e=>e!=this.sel_area),this.sel_area=null,this.adj_points=null}getPoints(e){let s="";return e.points.forEach(_=>{s+=_[0]+","+_[1]+","}),s=s.slice(0,s.length-1),s}startAdjustPoint(e,s){this.adj_point=e,this.is_adjust=!0,this.prev_point=[s.clientX,s.clientY]}movePoint(e,s){this.is_adjust&&(this.adj_point[0]+=(s.clientX-this.prev_point[0])*this.scaleWidth,this.adj_point[1]+=(s.clientY-this.prev_point[1])*this.scaleHeight,this.prev_point=[s.clientX,s.clientY])}endAdjustPoint(){this.is_adjust=!1,this.adj_point=null}hoverArea(e){e.selected=!0}unhoverArea(e){e.selected=null}dragStart(e,s){e.selected&&(this.isDrag=!0,this.prev_point=[s.clientX,s.clientY])}drag(e,s){this.isDrag&&e.selected&&(this.sel_area.points.forEach(_=>{_[0]+=(s.clientX-this.prev_point[0])*this.scaleWidth,_[1]+=(s.clientY-this.prev_point[1])*this.scaleHeight}),this.prev_point=[s.clientX,s.clientY])}dragOver(){this.isDrag=!1}}return p.\u0275fac=function(e){return new(e||p)(t.Y36(a.v),t.Y36(v.I),t.Y36(d.H7))},p.\u0275cmp=t.Xpm({type:p,selectors:[["ai-detected-area"]],viewQuery:function(e,s){if(1&e&&t.Gf(o,5),2&e){let _;t.iGM(_=t.CRH())&&(s.snapshotbox=_.first)}},hostBindings:function(e,s){1&e&&t.NdJ("mouseup",function(A){return s.onMouseUp(A)},!1,t.Jf7)},inputs:{camera:"camera",snapshot:"snapshot",meta:"meta",isPrivacy:"isPrivacy",enableExclusionZone:"enableExclusionZone"},outputs:{metaChange:"metaChange"},features:[t.TTD],decls:12,vars:8,consts:[[1,"mb-20",3,"mousemove"],[1,"snapshot-container","relative"],["snapshotbox",""],[1,"background"],["class","offline-snapshot",4,"ngIf"],["class","img-area",3,"src",4,"ngIf"],["class","snapshot-loader-box",4,"ngIf"],["width","100%","height","100%","viewBox","0 0 16 9","preserveAspectRatio","none","class","area",3,"ngClass",4,"ngFor","ngForOf"],["class","chips-container",4,"ngIf"],[1,"offline-snapshot"],[2,"position","absolute","z-index","1"],["alt","",2,"width","100%","opacity","0.6",3,"src"],[1,"img-area",3,"src"],[1,"snapshot-loader-box"],[1,"loader","snapshot-loader"],["viewBox","25 25 50 50",1,"circular"],["cx","50","cy","50","r","15","fill","none","stroke-width","4","stroke-miterlimit","10",1,"path"],["width","100%","height","100%","viewBox","0 0 16 9","preserveAspectRatio","none",1,"area",3,"ngClass"],[1,"area-polygon",3,"ngClass","mousedown","mousemove","mouseup"],["r","0.2","stroke","red","stroke-width","0.05","fill","white","class","point",3,"mousedown","mouseup",4,"ngFor","ngForOf"],["r","0.2","stroke","red","stroke-width","0.05","fill","white",1,"point",3,"mousedown","mouseup"],[1,"chips-container"],["class","chip",3,"mouseenter","mouseleave",4,"ngFor","ngForOf"],["class","txt-btn",3,"disabled","click",4,"ngIf"],[1,"chip",3,"mouseenter","mouseleave"],[1,"name",3,"click"],[1,"pointer","chip-close",3,"icon","size","color","click"],[1,"txt-btn",3,"click"],[1,"contents"],[1,"mr-10"],["autocomplete","off","type","text","placeholder","No Name",1,"w-200",3,"value","change"],[1,"btn-area"],[1,"button","button-primary","mr-10",3,"click"],[1,"btn-inner"],[1,"button","button-white",3,"click"]],template:function(e,s){1&e&&(t.TgZ(0,"div",0),t.NdJ("mousemove",function(A){return s.movePoint(null,A)}),t.TgZ(1,"div",1,2),t._UZ(3,"div",3),t.YNc(4,r,4,0,"div",4),t.YNc(5,l,2,0,"div",4),t.YNc(6,g,4,1,"div",4),t.YNc(7,O,1,2,"img",5),t.YNc(8,h,4,1,"div",6),t.YNc(9,E,3,9,"svg",7),t.qZA(),t.qZA(),t.YNc(10,y,3,2,"div",8),t.YNc(11,I,11,2,"div",8)),2&e&&(t.xp6(4),t.Q6J("ngIf",!s.isCameraHasLiveVideoPrem()),t.xp6(1),t.Q6J("ngIf",s.isCameraOffline()),t.xp6(1),t.Q6J("ngIf",s.isCameraPrivacyMode()&&!s.isCameraOffline()),t.xp6(1),t.Q6J("ngIf",s.isCameraSupportingSnapshot()),t.xp6(1),t.Q6J("ngIf",s.isLoadingCameraSupportingSnapshot()),t.xp6(1),t.Q6J("ngForOf",s.areas),t.xp6(1),t.Q6J("ngIf",!s.sel_area),t.xp6(1),t.Q6J("ngIf",s.sel_area))},directives:[n.O5,n.sg,n.mk,i.U],styles:['.thumbnail[_ngcontent-%COMP%]{width:100%}input[type=text][_ngcontent-%COMP%], input[type=number][_ngcontent-%COMP%], input[type=password][_ngcontent-%COMP%]{width:100%;max-width:420px;box-sizing:border-box;padding:7px 10px;background-color:#fff;border:1px solid rgba(0,0,0,.2);border-radius:5px;font-size:14px;transition:.2s;text-indent:0px;font-weight:400}input[type=text].err-input[_ngcontent-%COMP%], input[type=number].err-input[_ngcontent-%COMP%], input[type=password].err-input[_ngcontent-%COMP%]{border:solid 1px #f1556c;outline-color:#f1556c}input[type=text].list-search-input[_ngcontent-%COMP%], input[type=number].list-search-input[_ngcontent-%COMP%], input[type=password].list-search-input[_ngcontent-%COMP%]{width:100%;max-width:100%;outline:none;border:0;border-bottom:1px solid rgba(0,0,0,.1);padding:10px;border-radius:0}input[type=text].disabled[_ngcontent-%COMP%], input[type=number].disabled[_ngcontent-%COMP%], input[type=password].disabled[_ngcontent-%COMP%]{background-color:#e0e0e0!important;opacity:1}input[type=text].err[_ngcontent-%COMP%], input[type=number].err[_ngcontent-%COMP%], input[type=password].err[_ngcontent-%COMP%]{outline:none;border:1px solid #f1556c!important;background-color:#fff!important}input[type=text].correct[_ngcontent-%COMP%], input[type=number].correct[_ngcontent-%COMP%], input[type=password].correct[_ngcontent-%COMP%]{border:solid 1px #e0e0e0;background-color:#e5f2ff}input[type=text][_ngcontent-%COMP%]::placeholder, input[type=number][_ngcontent-%COMP%]::placeholder, input[type=password][_ngcontent-%COMP%]::placeholder{color:#0000004d}svg[_ngcontent-%COMP%]{position:absolute;top:0;left:0}path[_ngcontent-%COMP%]{stroke:#d6940b;stroke-width:10px;stroke-linejoin:round;stroke-linecap:round;stroke-dasharray:1px,15px;fill:#f4af20}.chip[_ngcontent-%COMP%]{display:flex;align-items:center;margin-right:5px;margin-bottom:5px;padding:5px 8px 5px 10px;color:#56657b;font-size:14px;font-weight:400;background:#E3E8EE;border-radius:20px;cursor:pointer}.chip[_ngcontent-%COMP%]:last-child{margin-right:10px}.chip[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]{margin-right:6px;font-size:14px;font-weight:400}.chip[_ngcontent-%COMP%]   .chip-close[_ngcontent-%COMP%]{color:#55647b}.chip[_ngcontent-%COMP%]   .chip-close[_ngcontent-%COMP%]:hover{color:#1e1e1f}.chips-container[_ngcontent-%COMP%]{margin-bottom:20px;display:flex;flex-direction:row;flex-wrap:wrap}.chips-container[_ngcontent-%COMP%]   .contents[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;margin:0 8px 0 0}.chips-container[_ngcontent-%COMP%]:last-child{margin-bottom:0}.delete[_ngcontent-%COMP%]{min-width:24px;height:24px;border-radius:12px;background:rgba(0,0,0,.46);color:#fff;font-size:16px;display:flex;align-items:center;justify-content:center;transition:.2s;cursor:pointer;position:relative;margin:0 4px}.point[_ngcontent-%COMP%]{cursor:pointer;opacity:1}.point[_ngcontent-%COMP%]:hover{opacity:1}.area[_ngcontent-%COMP%]{opacity:.4}.area-polygon[_ngcontent-%COMP%]{fill:transparent;stroke:red;stroke-width:.1;stroke-dasharray:none}.selected[_ngcontent-%COMP%]{fill:#ff00001a;opacity:1;z-index:1}.moveArea[_ngcontent-%COMP%]{cursor:move}.disabled[_ngcontent-%COMP%]{opacity:.6;cursor:default;pointer-events:none}.snapshot-container[_ngcontent-%COMP%]{width:653px;height:calc(653px / 16 * 9);box-sizing:border-box;background-color:#222}.snapshot-container[_ngcontent-%COMP%]   .background[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%;z-index:-1;background-color:#222}.snapshot-container[_ngcontent-%COMP%]   .img-area[_ngcontent-%COMP%]{width:100%;height:100%}.tooltip-content[_ngcontent-%COMP%]{position:relative}.tooltip-content[_ngcontent-%COMP%]   .tooltip-icon[_ngcontent-%COMP%]{cursor:pointer;margin-left:7px;font-size:18px;color:#0009}.tooltip-content[_ngcontent-%COMP%]:hover   .tooltip[_ngcontent-%COMP%]{visibility:visible;opacity:1}.tooltip-content[_ngcontent-%COMP%]   .tooltip[_ngcontent-%COMP%]{position:fixed;min-width:310px;max-width:400px;height:-moz-fit-content;height:fit-content;visibility:hidden;background-color:#fff;padding:20px;box-sizing:border-box;border-radius:5px;font-size:14px;box-shadow:0 0 30px #0000004d;z-index:100;opacity:0;transition:opacity .3s;color:#000000de;word-spacing:1px}.tooltip-content[_ngcontent-%COMP%]   .tooltip[_ngcontent-%COMP%]:after{content:"";position:absolute;bottom:-24px;left:calc(50% - 2px);margin-left:-19px;border-width:12px;border-style:solid;border-color:#fff transparent transparent transparent;cursor:pointer}.tooltip-content[_ngcontent-%COMP%]   .tooltip.under[_ngcontent-%COMP%]{bottom:initial;top:30px}.tooltip-content[_ngcontent-%COMP%]   .tooltip.under[_ngcontent-%COMP%]:after{bottom:initial;top:-24px;border-color:transparent transparent #fff transparent}.tooltip-content[_ngcontent-%COMP%]   .tooltip.w-400[_ngcontent-%COMP%]{width:400px}.tooltip-content[_ngcontent-%COMP%]   .tooltip[_ngcontent-%COMP%]   .font-10[_ngcontent-%COMP%]{font-size:10px}.tooltip-content[_ngcontent-%COMP%]   .tooltip[_ngcontent-%COMP%]   .font-12[_ngcontent-%COMP%]{font-size:12px}.tooltip-content[_ngcontent-%COMP%]   .tooltip[_ngcontent-%COMP%]   .tooltip-item[_ngcontent-%COMP%]{margin-bottom:10px}.tooltip-content[_ngcontent-%COMP%]   .tooltip[_ngcontent-%COMP%]   .tooltip-item[_ngcontent-%COMP%]   .tooltip-title[_ngcontent-%COMP%]{margin-bottom:5px}.tooltip-content[_ngcontent-%COMP%]   .tooltip[_ngcontent-%COMP%]   .tooltip-item[_ngcontent-%COMP%]   .tooltip-info[_ngcontent-%COMP%]{color:#0009}.tooltip-content[_ngcontent-%COMP%]   .tooltip[_ngcontent-%COMP%]   .tooltip-link[_ngcontent-%COMP%]{color:#2383e2}.tooltip-content[_ngcontent-%COMP%]   .tooltip.test[_ngcontent-%COMP%]{visibility:visible;opacity:1}.tooltip-content[_ngcontent-%COMP%]   .pointer[_ngcontent-%COMP%]{padding-left:5px;cursor:pointer}.txt-btn[_ngcontent-%COMP%]{display:flex;align-items:center;padding-bottom:5px;font-size:14px;color:#1f89e5;cursor:pointer}.item-label[_ngcontent-%COMP%]{font-size:13px;color:#000000de;margin-bottom:10px}.w-120[_ngcontent-%COMP%]{width:120px}.w-200[_ngcontent-%COMP%]{width:200px}.offline-snapshot[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;height:100%;width:100%;color:#fff}.snapshot-loader-box[_ngcontent-%COMP%]{position:absolute;top:calc(50% - 25px);left:calc(50% - 25px);display:flex;text-align:right;align-items:center;width:50px;height:50px}.snapshot-loader-box[_ngcontent-%COMP%]   .snapshot-loader[_ngcontent-%COMP%]{position:relative;margin:0 auto;width:50px}.snapshot-loader-box[_ngcontent-%COMP%]   .snapshot-loader.absolute[_ngcontent-%COMP%]{margin:auto;position:absolute;top:calc(50% - 25px);left:calc(50% - 25px)}.snapshot-loader-box[_ngcontent-%COMP%]   .snapshot-loader[_ngcontent-%COMP%]:before{content:"";display:block;padding-top:100%}.snapshot-loader-box[_ngcontent-%COMP%]   .snapshot-loader[_ngcontent-%COMP%]   .circular[_ngcontent-%COMP%]{animation:rotate 2s linear infinite;height:100%;transform-origin:center center;width:100%;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto}.snapshot-loader-box[_ngcontent-%COMP%]   .snapshot-loader[_ngcontent-%COMP%]   .circular[_ngcontent-%COMP%]   .path[_ngcontent-%COMP%]{stroke-dasharray:1,200;stroke-dashoffset:0;animation:dash 1.5s ease-in-out infinite;stroke:#fff;stroke-linecap:round}'],data:{animation:[P.OP]}}),p})()},31100:(b,x,c)=>{"use strict";c.d(x,{W:()=>a});var t=c(16274),P=c(688),f=c(42741);let a=(()=>{class v{}return v.\u0275fac=function(n){return new(n||v)},v.\u0275mod=f.oAB({type:v}),v.\u0275inj=f.cJS({imports:[[t.ez,P.m]]}),v})()},28739:(b,x,c)=>{"use strict";c.d(x,{S:()=>v});var t=c(16274),P=c(93324),f=c(6517),a=c(42741);let v=(()=>{class d{}return d.\u0275fac=function(i){return new(i||d)},d.\u0275mod=a.oAB({type:d}),d.\u0275inj=a.cJS({imports:[[t.ez,f.m9],P.u5]}),d})()},90818:(b,x,c)=>{"use strict";c.d(x,{Z:()=>i});var t=c(46243),f=c(76052),a=c.n(f),v=c(23683),d=c.n(v),n=c(49951);const i={_:t,moment:a(),ip:d(),tool:n.Z}},39014:(b,x,c)=>{"use strict";c.d(x,{a:()=>h});var t=c(42741),P=c(98753),f=c(16274);const a=["sortable-column",""];function v(u,M){1&u&&(t.O4$(),t.TgZ(0,"svg",2),t.TgZ(1,"g",3),t.TgZ(2,"g",4),t._UZ(3,"polygon",5),t.qZA(),t.qZA(),t.qZA())}function d(u,M){1&u&&(t.O4$(),t.TgZ(0,"svg",2),t.TgZ(1,"g"),t.TgZ(2,"g",6),t._UZ(3,"polygon",7),t.qZA(),t.TgZ(4,"g",6),t._UZ(5,"polygon",5),t.qZA(),t.qZA(),t.qZA())}function n(u,M){1&u&&(t.O4$(),t.TgZ(0,"svg",2),t.TgZ(1,"g",3),t.TgZ(2,"g",4),t._UZ(3,"polygon",7),t.qZA(),t.qZA(),t.qZA())}function i(u,M){if(1&u&&(t.YNc(0,v,4,0,"svg",1),t.YNc(1,d,6,0,"svg",1),t.YNc(2,n,4,0,"svg",1)),2&u){const m=t.oxw();t.Q6J("ngIf","asc"===m.sortDirection),t.xp6(1),t.Q6J("ngIf",""===m.sortDirection),t.xp6(1),t.Q6J("ngIf","desc"===m.sortDirection)}}function o(u,M){1&u&&(t.O4$(),t.TgZ(0,"svg",2),t.TgZ(1,"g",3),t.TgZ(2,"g",4),t._UZ(3,"polygon",5),t.qZA(),t.qZA(),t.qZA())}function r(u,M){1&u&&(t.O4$(),t.TgZ(0,"svg",2),t.TgZ(1,"g"),t.TgZ(2,"g",6),t._UZ(3,"polygon",7),t.qZA(),t.TgZ(4,"g",6),t._UZ(5,"polygon",5),t.qZA(),t.qZA(),t.qZA())}function l(u,M){1&u&&(t.O4$(),t.TgZ(0,"svg",2),t.TgZ(1,"g",3),t.TgZ(2,"g",4),t._UZ(3,"polygon",7),t.qZA(),t.qZA(),t.qZA())}function g(u,M){if(1&u&&(t.YNc(0,o,4,0,"svg",1),t.YNc(1,r,6,0,"svg",1),t.YNc(2,l,4,0,"svg",1)),2&u){const m=t.oxw();t.Q6J("ngIf","asc"===m.sortDirection),t.xp6(1),t.Q6J("ngIf",""===m.sortDirection),t.xp6(1),t.Q6J("ngIf","desc"===m.sortDirection)}}const O=["*"];let h=(()=>{class u{constructor(m){this.sortService=m,this.sortDirection="",this.iconPosition="right"}sort(){this.sortDirection="asc"===this.sortDirection?"desc":"asc",this.sortService.columnSorted({sortColumn:this.columnName,sortDirection:this.sortDirection})}ngOnInit(){this.columnSortedSubscription=this.sortService.columnSorted$.subscribe(m=>{this.columnName!=m.sortColumn&&(this.sortDirection="")})}ngOnDestroy(){this.columnSortedSubscription.unsubscribe()}}return u.\u0275fac=function(m){return new(m||u)(t.Y36(P.K))},u.\u0275cmp=t.Xpm({type:u,selectors:[["","sortable-column",""]],hostBindings:function(m,E){1&m&&t.NdJ("click",function(){return E.sort()})},inputs:{columnName:["sortable-column","columnName"],sortDirection:["sort-direction","sortDirection"],iconPosition:["sort-icon","iconPosition"]},attrs:a,ngContentSelectors:O,decls:3,vars:2,consts:[[3,"ngIf"],["width","12","height","8px","viewBox","0 0 200 200",4,"ngIf"],["width","12","height","8px","viewBox","0 0 200 200"],["fill","#5A6574"],["id","arrow-drop-down"],["points","0,120 100,200 200,120"],["id","arrow-drop-down","fill","#5A6574"],["points","0,80 100,0 200,80"]],template:function(m,E){1&m&&(t.F$t(),t.YNc(0,i,3,3,"ng-template",0),t.Hsn(1),t.YNc(2,g,3,3,"ng-template",0)),2&m&&(t.Q6J("ngIf","left"===E.iconPosition&&E.columnName),t.xp6(2),t.Q6J("ngIf","right"===E.iconPosition&&E.columnName))},directives:[f.O5],encapsulation:2}),u})()},28522:(b,x,c)=>{"use strict";c.d(x,{Q:()=>f});var t=c(42741),P=c(98753);let f=(()=>{class a{constructor(d){this.sortService=d,this.sorted=new t.vpe}ngOnInit(){this.columnSortedSubscription=this.sortService.columnSorted$.subscribe(d=>{this.sorted.emit(d)})}ngOnDestroy(){this.columnSortedSubscription.unsubscribe()}}return a.\u0275fac=function(d){return new(d||a)(t.Y36(P.K))},a.\u0275dir=t.lG2({type:a,selectors:[["","sortable-table",""]],outputs:{sorted:"sorted"}}),a})()},98053:(b,x,c)=>{"use strict";c.d(x,{Z:()=>d});var t=c(46243),f=c(76052),a=c.n(f),v=c(49951);const d={_:t,moment:a(),tool:v.Z}},97799:(b,x,c)=>{"use strict";c.d(x,{u:()=>P});class P{constructor(a){this.label_class={},this.updateDatas(a)}updateDatas(a){null!=a&&(this.dealer_id=a.dealer_id,this.device_id=a.device_id,this.mac=a.mac,this.usn=a.usn,this.channel=a.channel,this.type=a.type,this.name=a.name,this.model=a.model,this.site_id=a.site_id,this.is_online=a.is_online,this.is_online_update_time=a.is_online_update_time,this.is_registered=a.is_registered,this.is_activated=a.is_activated,this.is_cont_recording=a.is_cont_recording,this.is_thermal_image=a.is_thermal_image,this.created=a.created,this.firmware_version=a.firmware_version,this.firmware_update_status=a.firmware_update_status,this.alarm_zone=a.alarm_zone,this.trouble_zone=a.trouble_zone,this.customer_account_number=a.customer_account_number,this.public_ip=a.public_ip,this.is_privacy=a.is_privacy,this.privacy_background_image_url=a.privacy_background_image_url,this.sensors_meta=a.sensors_meta)}getConnectionStatus(){return this.is_registered?this.is_registered?this.is_online?(this.label_class={"label-primary":!0},"Online"):(this.label_class={"label-danger":!0},"Offline"):void 0:"Not Registered"}}}}]);