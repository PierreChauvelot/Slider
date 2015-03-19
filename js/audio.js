!function(t,e){var i=t.document;!function(){var t=!1,e=/xyz/.test(function(){})?/\b_super\b/:/.*/;this.JRClass=function(){},JRClass.extend=function(i){function s(){!t&&this.init&&this.init.apply(this,arguments)}var n=this.prototype;t=!0;var o=new this;t=!1;for(var r in i)o[r]="function"==typeof i[r]&&"function"==typeof n[r]&&e.test(i[r])?function(t,e){return function(){var i=this._super;this._super=n[t];var s=e.apply(this,arguments);return this._super=i,s}}(r,i[r]):i[r];return s.prototype=o,s.constructor=s,s.extend=arguments.callee,s}}();var s=JRClass.extend({init:function(t,n){this.audio="string"==typeof t?i.getElementById(t):t,this.audio.player=this,this.values={},this.elements={},this.options={autoplay:!1,preload:!0,useBuiltInControls:!1,controlsAtStart:!0,controlsHiding:!1,defaultVolume:.85,volumeBars:6,playerFallbackOrder:["html5","links"]},"object"==typeof s.options&&s.merge(this.options,s.options),"object"==typeof n&&s.merge(this.options,n),this.getPreloadAttribute()!==e&&(this.options.preload=this.getPreloadAttribute()),this.getAutoplayAttribute()!==e&&(this.options.autoplay=this.getAutoplayAttribute()),this.box=this.audio.parentNode,this.linksFallback=this.getLinksFallback(),this.hideLinksFallback(),this.each(this.options.playerFallbackOrder,function(t){return this[t+"Supported"]()?(this[t+"Init"](),!0):void 0}),this.activateElement(this,"player"),this.activateElement(this.box,"box")},behaviors:{},newBehavior:function(t,e,i){this.behaviors[t]=e,this.extend(i)},activateElement:function(t,e){"string"==typeof t&&(t=i.getElementById(t)),this.behaviors[e].call(this,t)},errors:[],warnings:[],warning:function(t){this.warnings.push(t),this.log(t)},history:[],log:function(t){if(t){"string"==typeof t&&(t={type:t}),t.type&&this.history.push(t.type),this.history.length>=50&&this.history.shift();try{console.log(t.type)}catch(e){try{opera.postError(t.type)}catch(e){}}}},setLocalStorage:function(t,e){if(localStorage)try{localStorage[t]=e}catch(i){(22==i.code||1014==i.code)&&this.warning(s.warnings.localStorageFull)}},getPreloadAttribute:function(){if("function"==typeof this.audio.hasAttribute&&this.audio.hasAttribute("preload")){var t=this.audio.getAttribute("preload");return""===t||"true"===t?"auto":"false"===t?"none":t}},getAutoplayAttribute:function(){if("function"==typeof this.audio.hasAttribute&&this.audio.hasAttribute("autoplay")){var t=this.audio.getAttribute("autoplay");return"false"===t?!1:!0}},bufferedPercent:function(){return this.duration()?this.buffered()[1]/this.duration():0},each:function(t,e){if(t&&0!==t.length)for(var i=0,s=t.length;s>i&&!e.call(this,t[i],i);i++);},extend:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e])}});s.player=s.prototype,s.player.extend({linksSupported:function(){return!0},linksInit:function(){this.showLinksFallback(),this.element=this.audio},getLinksFallback:function(){return this.box.getElementsByTagName("P")[0]},hideLinksFallback:function(){this.linksFallback&&(this.linksFallback.style.display="none")},showLinksFallback:function(){this.linksFallback&&(this.linksFallback.style.display="block")}}),s.merge=function(t,e,i){for(var s in e)!e.hasOwnProperty(s)||i&&t.hasOwnProperty(s)||(t[s]=e[s]);return t},s.extend=function(t){this.merge(this,t,!0)},s.extend({setupAllWhenReady:function(t){s.options=t,s.DOMReady(s.setup)},DOMReady:function(t){s.addToDOMReady(t)},setup:function(t,e){var n,o=!1,r=[];t&&"All"!=t?("object"!=typeof t||1==t.nodeType)&&(t=[t],o=!0):t=s.getAudioJSTags();for(var a=0;a<t.length;a++)n="string"==typeof t[a]?i.getElementById(t[a]):t[a],r.push(new s(n,e));return o?r[0]:r},getAudioJSTags:function(){for(var t,e=i.getElementsByTagName("audio"),s=[],n=0,o=e.length;o>n;n++)t=e[n],-1!=t.className.indexOf("audio-js")&&s.push(t);return s},browserSupportsAudio:function(){return"undefined"!=typeof s.audioSupport?s.audioSupport:(s.audioSupport=!!i.createElement("audio").canPlayType,s.audioSupport)},isIE:function(){return!1},isIPad:function(){return null!==navigator.userAgent.match(/iPad/i)},isIPhone:function(){return null!==navigator.userAgent.match(/iPhone/i)},isIOS:function(){return s.isIPhone()||s.isIPad()},iOSVersion:function(){var t=navigator.userAgent.match(/OS (\d+)_/i);return t&&t[1]?t[1]:void 0},isAndroid:function(){return null!==navigator.userAgent.match(/Android/i)},androidVersion:function(){var t=navigator.userAgent.match(/Android (\d+)\./i);return t&&t[1]?t[1]:void 0},warnings:{audioNotReady:"Audio is not ready yet (try playing the audio first).",localStorageFull:"Local Storage is Full"}}),s.isIE()&&i.createElement("audio"),t.AudioJS=t._A_=s,s.player.extend({html5Supported:function(){return s.browserSupportsAudio()?!0:!1},html5Init:function(){this.element=this.audio,this.fixPreloading(),this.supportProgressEvents(),this.volume(localStorage&&localStorage.volume||this.options.defaultVolume),s.isIOS()?(_A_.addClass(this.box,"ajs-ios"),this.options.useBuiltInControls=!0,this.iOSInterface()):s.isAndroid()&&(this.options.useBuiltInControls=!0,this.androidInterface()),this.options.useBuiltInControls||(this.audio.controls=!1,this.activateElement(this.audio,"playToggle"),this.buildAndActivateSpinner(),this.buildAndActivateControlBar(),this.loadInterface())},canPlaySource:function(){if(this.canPlaySourceResult)return this.canPlaySourceResult;for(var t=this.audio.children,e=0,i=t.length;i>e;e++)if("SOURCE"==t[e].tagName.toUpperCase()){var s=this.audio.canPlayType(t[e].type)||this.canPlayExt(t[e].src);if("probably"==s||"maybe"==s)return this.firstPlayableSource=t[e],this.canPlaySourceResult=!0,!0}return this.canPlaySourceResult=!1,!1},canPlayExt:function(t){if(!t)return"";var e=t.match(/\.([^\.]+)$/);if(e&&e[1]){var i=e[1].toLowerCase();if(s.isAndroid()){if("mp4"==i||"m4v"==i)return"maybe"}else if(s.isIOS()&&"m3u8"==i)return"maybe"}return""},forceTheSource:function(){this.audio.src=this.firstPlayableSource.src,this.audio.load()},fixPreloading:function(){"function"==typeof this.audio.hasAttribute&&this.audio.hasAttribute("preload")&&"none"!=this.audio.preload?this.audio.autobuffer=!0:(this.audio.autobuffer=!1,this.audio.preload="none")},supportProgressEvents:function(){_A_.addListener(this.audio,"progress",this.playerOnAudioProgress.context(this))},playerOnAudioProgress:function(t){this.setBufferedFromProgress(t)},setBufferedFromProgress:function(t){if(t.total>0){var e=t.loaded/t.total*this.duration();e>this.values.bufferEnd&&(this.values.bufferEnd=e)}},iOSInterface:function(){s.iOSVersion()<4&&this.forceTheSource(),s.isIPad()&&this.buildAndActivateSpinner()},androidInterface:function(){this.forceTheSource(),_A_.addListener(this.audio,"click",function(){this.play()})},loadInterface:function(){this.options.controlsAtStart&&this.showControlBars(),this.positionControlBars()},buildAndActivateControlBar:function(){this.controls=_A_.createElement("div",{className:"ajs-controls"}),this.box.appendChild(this.controls),this.activateElement(this.controls,"controlBar"),this.activateElement(this.controls,"mouseOverAudioReporter"),this.playControl=_A_.createElement("div",{className:"ajs-play-control",innerHTML:"<span></span>"}),this.controls.appendChild(this.playControl),this.activateElement(this.playControl,"playToggle"),this.progressControl=_A_.createElement("div",{className:"ajs-progress-control"}),this.controls.appendChild(this.progressControl),this.progressHolder=_A_.createElement("div",{className:"ajs-progress-holder"}),this.progressControl.appendChild(this.progressHolder),this.activateElement(this.progressHolder,"currentTimeScrubber"),this.loadProgressBar=_A_.createElement("div",{className:"ajs-load-progress"}),this.progressHolder.appendChild(this.loadProgressBar),this.activateElement(this.loadProgressBar,"loadProgressBar"),this.playProgressBar=_A_.createElement("div",{className:"ajs-play-progress"}),this.progressHolder.appendChild(this.playProgressBar),this.activateElement(this.playProgressBar,"playProgressBar"),this.timeControl=_A_.createElement("div",{className:"ajs-time-control"}),this.controls.appendChild(this.timeControl),this.currentTimeDisplay=_A_.createElement("span",{className:"ajs-current-time-display",innerHTML:"00:00"}),this.timeControl.appendChild(this.currentTimeDisplay),this.activateElement(this.currentTimeDisplay,"currentTimeDisplay"),this.timeSeparator=_A_.createElement("span",{innerHTML:" / "}),this.timeControl.appendChild(this.timeSeparator),this.durationDisplay=_A_.createElement("span",{className:"ajs-duration-display",innerHTML:"00:00"}),this.timeControl.appendChild(this.durationDisplay),this.activateElement(this.durationDisplay,"durationDisplay");for(var t=[];t.length<this.options.volumeBars;)t.push("<span></span>");this.volumeControl=_A_.createElement("div",{className:"ajs-volume-control",innerHTML:"<div>"+t.join("")+"</div>"}),this.controls.appendChild(this.volumeControl),this.activateElement(this.volumeControl,"volumeScrubber"),this.descriptionMeta=_A_.createElement("div",{className:"description",innerHTML:this.audio.getAttribute("data-description")}),this.controls.appendChild(this.descriptionMeta),this.volumeDisplay=this.volumeControl.children[0],this.activateElement(this.volumeDisplay,"volumeDisplay")},buildAndActivateSpinner:function(){this.spinner=_A_.createElement("div",{className:"ajs-spinner"}),this.box.appendChild(this.spinner),this.activateElement(this.spinner,"spinner")},addAudioListener:function(t,e){_A_.addListener(this.audio,t,e.rEvtContext(this))},play:function(){return this.each(_A_.getAudioJSTags(),function(t){t.pause()}),this.audio.play(),this},onPlay:function(t){return this.addAudioListener("play",t),this},pause:function(){return this.audio.pause(),this},onPause:function(t){return this.addAudioListener("pause",t),this},paused:function(){return this.audio.paused},currentTime:function(t){if(t!==e){try{this.audio.currentTime=t}catch(i){this.warning(s.warnings.audioNotReady)}return this.values.currentTime=t,this}return this.audio.currentTime},onCurrentTimeUpdate:function(t){this.currentTimeListeners.push(t)},duration:function(){return this.audio.duration},buffered:function(){if(this.values.bufferStart===e&&(this.values.bufferStart=0,this.values.bufferEnd=0),this.audio.buffered&&this.audio.buffered.length>0){var t=this.audio.buffered.end(0);t>this.values.bufferEnd&&(this.values.bufferEnd=t)}return[this.values.bufferStart,this.values.bufferEnd]},volume:function(t){return t!==e?(this.values.volume=Math.max(0,Math.min(1,parseFloat(t))),this.audio.volume=this.values.volume,this.setLocalStorage("volume",this.values.volume),this):this.values.volume?this.values.volume:this.audio.volume},onVolumeChange:function(t){_A_.addListener(this.audio,"volumechange",t.rEvtContext(this))},width:function(t){return t!==e?(this.audio.width=t,this.box.style.width=t+"px",this.triggerResizeListeners(),this):this.audio.offsetWidth||this.audio.style.width||400},height:function(t){return t!==e?(this.audio.height=t,this.box.style.height=t+"px",this.triggerResizeListeners(),this):this.audio.offsetHeight},onError:function(t){return this.addAudioListener("error",t),this},onEnded:function(t){return this.addAudioListener("ended",t),this}}),s.player.newBehavior("player",function(){this.onError(this.playerOnAudioError),this.onPlay(this.playerOnAudioPlay),this.onPlay(this.trackCurrentTime),this.onPause(this.playerOnAudioPause),this.onPause(this.stopTrackingCurrentTime),this.onEnded(this.playerOnAudioEnded),this.trackBuffered(),this.onBufferedUpdate(this.isBufferFull)},{playerOnAudioError:function(t){this.log(t),this.log(this.audio.error)},playerOnAudioPlay:function(){this.hasPlayed=!0},playerOnAudioPause:function(){},playerOnAudioEnded:function(){this.currentTime(0),this.pause()},trackBuffered:function(){this.bufferedInterval=setInterval(this.triggerBufferedListeners.context(this),500)},stopTrackingBuffered:function(){clearInterval(this.bufferedInterval)},bufferedListeners:[],onBufferedUpdate:function(t){this.bufferedListeners.push(t)},triggerBufferedListeners:function(){this.isBufferFull(),this.each(this.bufferedListeners,function(t){t.context(this)()})},isBufferFull:function(){1==this.bufferedPercent()&&this.stopTrackingBuffered()},trackCurrentTime:function(){this.currentTimeInterval&&clearInterval(this.currentTimeInterval),this.currentTimeInterval=setInterval(this.triggerCurrentTimeListeners.context(this),100),this.trackingCurrentTime=!0},stopTrackingCurrentTime:function(){clearInterval(this.currentTimeInterval),this.trackingCurrentTime=!1},currentTimeListeners:[],triggerCurrentTimeListeners:function(t,e){this.each(this.currentTimeListeners,function(t){t.context(this)(e||this.currentTime())})},resizeListeners:[],onResize:function(t){this.resizeListeners.push(t)},triggerResizeListeners:function(){this.each(this.resizeListeners,function(t){t.context(this)()})}}),s.player.newBehavior("mouseOverAudioReporter",function(t){_A_.addListener(t,"mousemove",this.mouseOverAudioReporterOnMouseMove.context(this)),_A_.addListener(t,"mouseout",this.mouseOverAudioReporterOnMouseOut.context(this))},{mouseOverAudioReporterOnMouseMove:function(){this.showControlBars(),clearInterval(this.mouseMoveTimeout),this.mouseMoveTimeout=setTimeout(this.hideControlBars.context(this),4e3)},mouseOverAudioReporterOnMouseOut:function(t){for(var e=t.relatedTarget;e&&e!==this.box;)e=e.parentNode;e!==this.box&&this.hideControlBars()}}),s.player.newBehavior("box",function(t){_A_.addClass(t,"ajs-paused"),this.activateElement(t,"mouseOverAudioReporter"),this.onPlay(this.boxOnAudioPlay),this.onPause(this.boxOnAudioPause)},{boxOnAudioPlay:function(){_A_.removeClass(this.box,"ajs-paused"),_A_.addClass(this.box,"ajs-playing")},boxOnAudioPause:function(){_A_.removeClass(this.box,"ajs-playing"),_A_.addClass(this.box,"ajs-paused")}}),s.player.newBehavior("controlBar",function(t){this.controlBars||(this.controlBars=[],this.onResize(this.positionControlBars)),this.controlBars.push(t),_A_.addListener(t,"mousemove",this.onControlBarsMouseMove.context(this)),_A_.addListener(t,"mouseout",this.onControlBarsMouseOut.context(this))},{showControlBars:function(){(this.options.controlsAtStart||this.hasPlayed)&&this.each(this.controlBars,function(t){t.style.display="block"})},positionControlBars:function(){this.updatePlayProgressBars(),this.updateLoadProgressBars()},hideControlBars:function(){this.options.controlsHiding&&!this.mouseIsOverControls&&this.each(this.controlBars,function(t){t.style.display="none"})},onControlBarsMouseMove:function(){this.mouseIsOverControls=!0},onControlBarsMouseOut:function(){this.mouseIsOverControls=!1}}),s.player.newBehavior("playToggle",function(t){this.elements.playToggles||(this.elements.playToggles=[],this.onPlay(this.playTogglesOnPlay),this.onPause(this.playTogglesOnPause)),this.elements.playToggles.push(t),_A_.addListener(t,"click",this.onPlayToggleClick.context(this))},{onPlayToggleClick:function(){this.paused()?this.play():this.pause()},playTogglesOnPlay:function(){this.each(this.elements.playToggles,function(t){_A_.removeClass(t,"ajs-paused"),_A_.addClass(t,"ajs-playing")})},playTogglesOnPause:function(){this.each(this.elements.playToggles,function(t){_A_.removeClass(t,"ajs-playing"),_A_.addClass(t,"ajs-paused")})}}),s.player.newBehavior("playButton",function(t){_A_.addListener(t,"click",this.onPlayButtonClick.context(this))},{onPlayButtonClick:function(){this.play()}}),s.player.newBehavior("pauseButton",function(t){_A_.addListener(t,"click",this.onPauseButtonClick.context(this))},{onPauseButtonClick:function(){this.pause()}}),s.player.newBehavior("playProgressBar",function(t){this.playProgressBars||(this.playProgressBars=[],this.onCurrentTimeUpdate(this.updatePlayProgressBars)),this.playProgressBars.push(t)},{updatePlayProgressBars:function(t){var i=t!==e?t/this.duration():this.currentTime()/this.duration();isNaN(i)&&(i=0),this.each(this.playProgressBars,function(t){t.style&&(t.style.width=_A_.round(100*i,2)+"%")})}}),s.player.newBehavior("loadProgressBar",function(t){this.loadProgressBars||(this.loadProgressBars=[]),this.loadProgressBars.push(t),this.onBufferedUpdate(this.updateLoadProgressBars)},{updateLoadProgressBars:function(){this.each(this.loadProgressBars,function(t){t.style&&(t.style.width=_A_.round(100*this.bufferedPercent(),2)+"%")})}}),s.player.newBehavior("currentTimeDisplay",function(t){this.currentTimeDisplays||(this.currentTimeDisplays=[],this.onCurrentTimeUpdate(this.updateCurrentTimeDisplays)),this.currentTimeDisplays.push(t)},{updateCurrentTimeDisplays:function(t){if(this.currentTimeDisplays){var e=t?t:this.currentTime();this.each(this.currentTimeDisplays,function(t){t.innerHTML=_A_.formatTime(e)})}}}),s.player.newBehavior("durationDisplay",function(t){this.durationDisplays||(this.durationDisplays=[],this.onCurrentTimeUpdate(this.updateDurationDisplays)),this.durationDisplays.push(t)},{updateDurationDisplays:function(){this.durationDisplays&&this.each(this.durationDisplays,function(t){this.duration()&&(t.innerHTML=_A_.formatTime(this.duration()))})}}),s.player.newBehavior("currentTimeScrubber",function(t){_A_.addListener(t,"mousedown",this.onCurrentTimeScrubberMouseDown.rEvtContext(this))},{onCurrentTimeScrubberMouseDown:function(t,e){t.preventDefault(),this.currentScrubber=e,this.stopTrackingCurrentTime(),this.audioWasPlaying=!this.paused(),this.pause(),_A_.blockTextSelection(),this.setCurrentTimeWithScrubber(t),_A_.addListener(i,"mousemove",this.onCurrentTimeScrubberMouseMove.rEvtContext(this)),_A_.addListener(i,"mouseup",this.onCurrentTimeScrubberMouseUp.rEvtContext(this))},onCurrentTimeScrubberMouseMove:function(t){this.setCurrentTimeWithScrubber(t)},onCurrentTimeScrubberMouseUp:function(){_A_.unblockTextSelection(),i.removeEventListener("mousemove",this.onCurrentTimeScrubberMouseMove,!1),i.removeEventListener("mouseup",this.onCurrentTimeScrubberMouseUp,!1),this.audioWasPlaying&&(this.play(),this.trackCurrentTime())},setCurrentTimeWithScrubber:function(t){var e=_A_.getRelativePosition(t.pageX,this.currentScrubber),i=e*this.duration();this.triggerCurrentTimeListeners(0,i),i==this.duration()&&(i-=.1),this.currentTime(i)}}),s.player.newBehavior("volumeDisplay",function(t){this.volumeDisplays||(this.volumeDisplays=[],this.onVolumeChange(this.updateVolumeDisplays)),this.volumeDisplays.push(t),this.updateVolumeDisplay(t)},{updateVolumeDisplays:function(){this.volumeDisplays&&this.each(this.volumeDisplays,function(t){this.updateVolumeDisplay(t)})},updateVolumeDisplay:function(t){var e=Math.ceil(this.volume()*this.options.volumeBars);this.each(t.children,function(t,i){e>i?_A_.addClass(t,"ajs-volume-level-on"):_A_.removeClass(t,"ajs-volume-level-on")})}}),s.player.newBehavior("volumeScrubber",function(t){_A_.addListener(t,"mousedown",this.onVolumeScrubberMouseDown.rEvtContext(this))},{onVolumeScrubberMouseDown:function(t,e){_A_.blockTextSelection(),this.currentScrubber=e,this.setVolumeWithScrubber(t),_A_.addListener(i,"mousemove",this.onVolumeScrubberMouseMove.rEvtContext(this)),_A_.addListener(i,"mouseup",this.onVolumeScrubberMouseUp.rEvtContext(this))},onVolumeScrubberMouseMove:function(t){this.setVolumeWithScrubber(t)},onVolumeScrubberMouseUp:function(t){this.setVolumeWithScrubber(t),_A_.unblockTextSelection(),i.removeEventListener("mousemove",this.onVolumeScrubberMouseMove,!1),i.removeEventListener("mouseup",this.onVolumeScrubberMouseUp,!1)},setVolumeWithScrubber:function(t){var e=_A_.getRelativePosition(t.pageX,this.currentScrubber);this.volume(e)}}),s.player.newBehavior("spinner",function(t){this.spinners||(this.spinners=[],_A_.addListener(this.audio,"loadeddata",this.spinnersOnAudioLoadedData.context(this)),_A_.addListener(this.audio,"loadstart",this.spinnersOnAudioLoadStart.context(this)),_A_.addListener(this.audio,"seeking",this.spinnersOnAudioSeeking.context(this)),_A_.addListener(this.audio,"seeked",this.spinnersOnAudioSeeked.context(this)),_A_.addListener(this.audio,"canplay",this.spinnersOnAudioCanPlay.context(this)),_A_.addListener(this.audio,"canplaythrough",this.spinnersOnAudioCanPlayThrough.context(this)),_A_.addListener(this.audio,"waiting",this.spinnersOnAudioWaiting.context(this)),_A_.addListener(this.audio,"stalled",this.spinnersOnAudioStalled.context(this)),_A_.addListener(this.audio,"suspend",this.spinnersOnAudioSuspend.context(this)),_A_.addListener(this.audio,"playing",this.spinnersOnAudioPlaying.context(this)),_A_.addListener(this.audio,"timeupdate",this.spinnersOnAudioTimeUpdate.context(this))),this.spinners.push(t)},{showSpinners:function(){this.each(this.spinners,function(t){t.style.display="block"}),clearInterval(this.spinnerInterval),this.spinnerInterval=setInterval(this.rotateSpinners.context(this),100)},hideSpinners:function(){this.each(this.spinners,function(t){t.style.display="none"}),clearInterval(this.spinnerInterval)},spinnersRotated:0,rotateSpinners:function(){},spinnersOnAudioLoadedData:function(){this.hideSpinners()},spinnersOnAudioLoadStart:function(){this.showSpinners()},spinnersOnAudioSeeking:function(){},spinnersOnAudioSeeked:function(){},spinnersOnAudioCanPlay:function(){},spinnersOnAudioCanPlayThrough:function(){this.hideSpinners()},spinnersOnAudioWaiting:function(){this.showSpinners()},spinnersOnAudioStalled:function(){},spinnersOnAudioSuspend:function(){},spinnersOnAudioPlaying:function(){this.hideSpinners()},spinnersOnAudioTimeUpdate:function(){"block"==this.spinner.style.display&&this.hideSpinners()}}),s.extend({addClass:function(t,e){-1==(" "+t.className+" ").indexOf(" "+e+" ")&&(t.className=""===t.className?e:t.className+" "+e)},removeClass:function(t,e){if(-1!=t.className.indexOf(e)){var i=t.className.split(/\s+/);i.splice(i.lastIndexOf(e),1),t.className=i.join(" ")}},createElement:function(t,e){return this.merge(i.createElement(t),e)},blockTextSelection:function(){i.body.focus(),i.onselectstart=function(){return!1}},unblockTextSelection:function(){i.onselectstart=function(){return!0}},formatTime:function(t){var e=Math.round(t),i=Math.floor(e/60);return i=i>=10?i:"0"+i,e=Math.floor(e%60),e=e>=10?e:"0"+e,i+":"+e},getRelativePosition:function(t,e){return Math.max(0,Math.min(1,(t-this.findPosX(e))/e.offsetWidth))},findPosX:function(t){for(var e=t.offsetLeft;t=t.offsetParent;)e+=t.offsetLeft;return e},getComputedStyleValue:function(e,i){return t.getComputedStyle(e,null).getPropertyValue(i)},round:function(t,e){return e||(e=0),Math.round(t*Math.pow(10,e))/Math.pow(10,e)},addListener:function(t,e,i){t.addEventListener?t.addEventListener(e,i,!1):t.attachEvent&&t.attachEvent("on"+e,i)},removeListener:function(t,e,i){t.removeEventListener?t.removeEventListener(e,i,!1):t.attachEvent&&t.detachEvent("on"+e,i)},get:function(t,e){"undefined"==typeof XMLHttpRequest&&(XMLHttpRequest=function(){try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(i){}throw new Error("This browser does not support XMLHttpRequest.")});var i=new XMLHttpRequest;i.open("GET",t),i.onreadystatechange=function(){4==i.readyState&&200==i.status&&e(i.responseText)}.context(this),i.send()},trim:function(t){return t.toString().replace(/^\s+/,"").replace(/\s+$/,"")},bindDOMReady:function(){return"complete"===i.readyState?s.onDOMReady():void(i.addEventListener?(i.addEventListener("DOMContentLoaded",s.DOMContentLoaded,!1),t.addEventListener("load",s.onDOMReady,!1)):i.attachEvent&&(i.attachEvent("onreadystatechange",s.DOMContentLoaded),t.attachEvent("onload",s.onDOMReady)))},DOMContentLoaded:function(){i.addEventListener?(i.removeEventListener("DOMContentLoaded",s.DOMContentLoaded,!1),s.onDOMReady()):i.attachEvent&&"complete"===i.readyState&&(i.detachEvent("onreadystatechange",s.DOMContentLoaded),s.onDOMReady())},DOMReadyList:[],addToDOMReady:function(t){s.DOMIsReady?t.call(i):s.DOMReadyList.push(t)},DOMIsReady:!1,onDOMReady:function(){if(!s.DOMIsReady){if(!i.body)return setTimeout(s.onDOMReady,13);if(s.DOMIsReady=!0,s.DOMReadyList){for(var t=0;t<s.DOMReadyList.length;t++)s.DOMReadyList[t].call(i);s.DOMReadyList=null}}}}),s.bindDOMReady(),Function.prototype.context=function(t){var e=this,i=function(){return e.apply(t,arguments)};return i},Function.prototype.evtContext=function(t){var e=this,i=function(){var i=this;return e.call(t,arguments[0],i)};return i},Function.prototype.rEvtContext=function(t,e){if(this.hasContext===!0)return this;e||(e=t);for(var i in e)if(e[i]==this)return e[i]=this.evtContext(t),e[i].hasContext=!0,e[i];return this.evtContext(t)},t.AudioJS=t._A_=s}(window);