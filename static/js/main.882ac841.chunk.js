(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{240:function(e){e.exports={fillerWords:[{fillerWord:"absolutely"},{fillerWord:"actually"},{fillerWord:"admittedly"},{fillerWord:"almost"},{fillerWord:"anyway"},{fillerWord:"apparently"},{fillerWord:"arguably"},{fillerWord:"basically"},{fillerWord:"certainly"},{fillerWord:"clearly"},{fillerWord:"confidentially"},{fillerWord:"cool"},{fillerWord:"definitely"},{fillerWord:"essentially"},{fillerWord:"exactly"},{fillerWord:"fine"},{fillerWord:"firstly"},{fillerWord:"fortunately"},{fillerWord:"frankly"},{fillerWord:"good"},{fillerWord:"gosh"},{fillerWord:"gotcha"},{fillerWord:"great"},{fillerWord:"honestly"},{fillerWord:"hooray"},{fillerWord:"ideally"},{fillerWord:"indeed"},{fillerWord:"just"},{fillerWord:"like"},{fillerWord:"literally"},{fillerWord:"look"},{fillerWord:"maybe"},{fillerWord:"mind"},{fillerWord:"moreover"},{fillerWord:"most"},{fillerWord:"naturally"},{fillerWord:"no"},{fillerWord:"now"},{fillerWord:"obviously"},{fillerWord:"oh"},{fillerWord:"ok"},{fillerWord:"okay"},{fillerWord:"only"},{fillerWord:"perhaps"},{fillerWord:"predictably"},{fillerWord:"presumably"},{fillerWord:"probably"},{fillerWord:"quite"},{fillerWord:"really"},{fillerWord:"right"},{fillerWord:"roughly"},{fillerWord:"sadly"},{fillerWord:"secondly"},{fillerWord:"seemed"},{fillerWord:"seriously"},{fillerWord:"simply"},{fillerWord:"slightly"},{fillerWord:"so"},{fillerWord:"somehow"},{fillerWord:"sorry"},{fillerWord:"sure"},{fillerWord:"surely"},{fillerWord:"thankfully"},{fillerWord:"that"},{fillerWord:"thirdly"},{fillerWord:"totally"},{fillerWord:"truly"},{fillerWord:"ugh"},{fillerWord:"um"},{fillerWord:"understandably"},{fillerWord:"undoubtedly"},{fillerWord:"unfortunately"},{fillerWord:"very"},{fillerWord:"well"},{fillerWord:"whatever"},{fillerWord:"wonderful"},{fillerWord:"wow"},{fillerWord:"yeah"},{fillerWord:"yes"},{fillerWord:"yippee"},{fillerWord:"yuk"}]}},317:function(e,t,r){e.exports=r(590)},587:function(e,t){},590:function(e,t,r){"use strict";r.r(t);var n=r(1),a=r.n(n),o=r(25),i=r.n(o),l=r(19),s=r(39),c=r(41),u=r(40),d=r(42),m=r(6),f=r(223),h=r(29),g=r(9),p=r.n(g),v=r(23),w=r(99),y=r.n(w),W=r(98),b=r.n(W),E=r(101),C=r.n(E),k=r(100),S=r.n(k),T=r(229),j=r.n(T),O=r(230),V=r.n(O),x=r(97),F=r.n(x),R=r(44),A=r.n(R),L=r(30),q=r.n(L),U=r(45),D=r.n(U),I=r(228),M=r.n(I),G=r(225),P=r.n(G),z=r(226),B=r.n(z),H=r(227),N=r.n(H),_=function(e){var t=e.setView;return a.a.createElement(F.a,null,a.a.createElement(A.a,{button:!0,key:"Home",onClick:function(){return t(0)}},a.a.createElement(q.a,null,a.a.createElement(P.a,{onClick:function(){return t(0)}})),a.a.createElement(q.a,null),a.a.createElement(D.a,{primary:"Home"})),a.a.createElement(A.a,{button:!0,key:"Statistics",onClick:function(){return t(1)}},a.a.createElement(q.a,null,a.a.createElement(B.a,{onClick:function(){return t(1)}})),a.a.createElement(q.a,null),a.a.createElement(D.a,{primary:"Statistics"})),a.a.createElement(A.a,{button:!0,key:"Settings",onClick:function(){return t(2)}},a.a.createElement(q.a,null,a.a.createElement(N.a,{onClick:function(){return t(2)}})),a.a.createElement(q.a,null),a.a.createElement(D.a,{primary:"Settings"})),a.a.createElement(A.a,{button:!0,key:"About",onClick:function(){return t(3)}},a.a.createElement(q.a,null,a.a.createElement(M.a,{onClick:function(){return t(3)}})),a.a.createElement(q.a,null),a.a.createElement(D.a,{primary:"About"})))},J=function(e){function t(){var e,r;Object(l.a)(this,t);for(var n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(r=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(a)))).state={open:!1},r.handleDrawerOpen=function(){r.setState({open:!0})},r.handleDrawerClose=function(){r.setState({open:!1})},r}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e,t,r=this.props,n=r.classes,o=r.setView;return a.a.createElement("div",{className:n.root},a.a.createElement(b.a,null),a.a.createElement(y.a,{variant:"permanent",className:p()(n.drawer,(e={},Object(h.a)(e,n.drawerOpen,this.state.open),Object(h.a)(e,n.drawerClose,!this.state.open),e)),classes:{paper:p()((t={},Object(h.a)(t,n.drawerOpen,this.state.open),Object(h.a)(t,n.drawerClose,!this.state.open),Object(h.a)(t,n.paper,n.paper),t))},open:this.state.open},a.a.createElement("div",{className:n.toolbar},a.a.createElement(S.a,{onClick:this.state.open?this.handleDrawerClose:this.handleDrawerOpen},this.state.open?a.a.createElement(j.a,null):a.a.createElement(V.a,null))),a.a.createElement(C.a,null),a.a.createElement(_,{setView:o})))}}]),t}(a.a.Component),X=Object(v.withStyles)(function(e){return{root:{display:"flex"},appBar:{zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{marginLeft:240,width:"calc(100% - ".concat(240,"px)"),transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},menuButton:{marginLeft:12,marginRight:36},hide:{display:"none"},drawer:{width:240,flexShrink:0,whiteSpace:"nowrap"},paper:{background:"#2196f3","& *":{color:"rgba(255, 255, 255, 1)"}},drawerOpen:{width:240,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},drawerClose:Object(h.a)({transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),overflowX:"hidden",width:7*e.spacing.unit+1},e.breakpoints.up("sm"),{width:9*e.spacing.unit+1}),toolbar:Object(f.a)({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"0 8px"},e.mixins.toolbar),content:{flexGrow:1,padding:3*e.spacing.unit}}},{withTheme:!0})(J),K=function(e){function t(){var e,r;Object(l.a)(this,t);for(var n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(r=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(a)))).state={left:!1},r.toggleDrawer=function(e,t){return function(){r.setState(Object(h.a)({},e,t))}},r}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props.setView,t=a.a.createElement("div",null,a.a.createElement(_,{setView:e}));return a.a.createElement("div",null,a.a.createElement(m.h,{open:this.state.left,onClose:this.toggleDrawer("left",!1),onOpen:this.toggleDrawer("left",!0)},a.a.createElement("div",{tabIndex:0,role:"button",onClick:this.toggleDrawer("left",!1),onKeyDown:this.toggleDrawer("left",!1)},t)))}}]),t}(a.a.Component),Q=r(233),Y=r.n(Q),Z=r(232),$=r.n(Z),ee=function(e){var t=e.interim;return a.a.createElement("div",null,a.a.createElement(m.g,{elevation:2,style:{color:"gray",height:"5vh",textAlign:"center",overflow:"auto"}},a.a.createElement(m.l,{color:"inherit"},t)))},te=r(231),re=function(e){var t=Math.round(e/1e3),r=Math.floor(t/60),n=Math.floor(t-60*r);return(r<10?"0"+r.toString():r.toString())+":"+(n<10?"0"+n.toString():n.toString())},ne=function(e){return 1e3*e},ae=function(e){return e/1e6},oe=function(e,t){var r=e.endTime,n=e.words,a=n[0],o=n[n.length-1],i=ne(a.startTime.seconds)+ae(a.startTime.nanos),l=r-(ne(parseInt(o.endTime.seconds))+ae(o.endTime.nanos)-i+t);return l=l>0?l:0},ie=a.a.forwardRef(function(e,t){var r=e.sentence,n=e.onClick,o=e.isCurrent,i=e.wordColor,l=e.isRecording,s=r.startTime,c=o&&!l?{borderColor:"#2196f3",borderStyle:"solid"}:{},u=r.words.map(function(e,t){var r={word:e.word,startTime:e.startTime,endTime:e.endTime,sentenceStartTime:s},n=i.GetColor(r);return a.a.createElement("span",{key:t,style:{color:n}},e.word," ")}),d=o?a.a.createElement("div",{ref:t}):a.a.createElement("div",null);return a.a.createElement("div",null,d,a.a.createElement("div",{onClick:l?function(){}:n,style:c},a.a.createElement(m.l,{align:"center",color:"primary"},re(r.startTime)),a.a.createElement(m.l,{paragraph:!0,align:"center"},u),a.a.createElement(m.c,{variant:"middle",light:!0})))}),le=function(e){function t(e){var r;return Object(l.a)(this,t),(r=Object(c.a)(this,Object(u.a)(t).call(this,e))).componentDidUpdate=function(){r.audio.current.paused?r.props.isRecording&&r.scrollToBottom():r.scrollToCurrentPlayback()},r.scrollToBottom=function(){r.transcriptEnd.current.scrollIntoView()},r.scrollToCurrentPlayback=function(){r.currentlyPlaying.current&&r.currentlyPlaying.current.scrollIntoView({behavior:"smooth"})},r.onSentenceClick=function(e){r.audio.current.currentTime=e/1e3,r.audio.current.play()},r.render=function(){var e=r.props,t=e.transcript,n=e.blobUrl,o=e.wordColor,i=e.isRecording,l=1e3*r.state.currentPlayback,s=t.map(function(e,t,n){var s=n[t+1]?n[t+1].startTime-1:Number.MAX_VALUE;return a.a.createElement(ie,{wordColor:o,key:t,isCurrent:e.startTime<l&&s>l&&r.state.isPlaying,sentence:e,onClick:function(){return r.onSentenceClick(e.startTime)},ref:r.currentlyPlaying,isRecording:i})});return a.a.createElement("div",null,a.a.createElement(m.g,{elevation:1,style:{maxHeight:"35vh",height:"40vh",overflow:"auto"}},a.a.createElement(te.CSSTransitionGroup,{transitionName:"example",transitionEnterTimeout:500,transitionLeaveTimeout:300},a.a.createElement("div",null,a.a.createElement("span",null,s),a.a.createElement("div",{ref:r.transcriptEnd})))),a.a.createElement("div",{style:{marginTop:"7px"}},a.a.createElement("audio",{ref:r.audio,src:n,controls:!0,type:"audio/ogg",style:{width:"100%"}})))},r.state={currentPlayback:0,isPlaying:!1},r.audio=a.a.createRef(),r.transcriptEnd=a.a.createRef(),r.currentlyPlaying=a.a.createRef(),r}return Object(d.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.audio.current.ontimeupdate=function(){e.setState({currentPlayback:e.audio.current.currentTime})},this.audio.current.onloadedmetadata=function(){e.audio.current.currentTime=1e7*Math.random()},this.audio.current.onplaying=function(){e.setState({isPlaying:!0})},this.audio.current.onpaused=function(){e.setState({isPlaying:!1})}}}]),t}(n.Component),se=function(e){var t=e.elapsed,r=re(t);return a.a.createElement("div",null,a.a.createElement(m.l,{color:"primary"},r))},ce=Object(v.withStyles)(function(e){return{button:{margin:e.spacing.unit},lightTooltip:{backgroundColor:e.palette.common.white,color:"rgba(0, 0, 0, 0.87)",boxShadow:e.shadows[1],fontSize:11},lightIndicator:{height:"4px",color:"rgba(0, 0, 0, 0.87)"}}},{withTheme:!0})(function(e){var t=e.state,r=e.toggleRecord,n=e.reset,o=e.setHighLight,i=e.classes;return a.a.createElement("div",null,a.a.createElement(m.e,{container:!0,spacing:16,direction:"column",alignItems:"center",justify:"flex-end"},a.a.createElement(m.e,{item:!0,xs:12},a.a.createElement(m.k,{title:"Start/stop recording",classes:{tooltip:i.lightTooltip}},a.a.createElement(m.d,{"aria-label":"mic",color:t.isRecording?"secondary":"primary",onClick:r},t.isRecording?a.a.createElement($.a,null):a.a.createElement(Y.a,null)))),a.a.createElement(m.e,{item:!0,xs:12},a.a.createElement(se,{elapsed:t.elapsed})),a.a.createElement(m.e,{item:!0,xs:6,md:3,style:{width:"100%",height:"100%"}},a.a.createElement(ee,{interim:t.interim})),a.a.createElement(m.e,{item:!0,xs:12,md:6,style:{width:"100%"}}),a.a.createElement(m.e,{item:!0,xs:12,md:6,style:{width:"100%",height:"100%"}},a.a.createElement(m.a,{position:"static",color:"primary",elevation:1,style:{background:"#2196f3"}},a.a.createElement(m.j,{variant:"fullWidth",value:t.highlight,classes:{indicator:i.lightIndicator}},a.a.createElement(m.i,{style:{display:"none"}}),a.a.createElement(m.k,{title:"Highlight filler words",classes:{tooltip:i.lightTooltip}},a.a.createElement(m.i,{onClick:function(){o(1)},label:"Fillers"})),a.a.createElement(m.k,{title:"Highlight commonly used words",classes:{tooltip:i.lightTooltip}},a.a.createElement(m.i,{onClick:function(){o(2)},label:"Frequencies"})),a.a.createElement(m.k,{title:"Highlight volume levels",classes:{tooltip:i.lightTooltip}},a.a.createElement(m.i,{onClick:function(){o(3)},label:"Volumes"})))),a.a.createElement(le,{transcript:t.transcript,blobUrl:t.blobUrl,wordColor:t.wordColor,isRecording:t.isRecording})),a.a.createElement(m.e,{item:!0,xs:12},a.a.createElement(m.k,{title:"Reset the app",classes:{tooltip:i.lightTooltip}},a.a.createElement(m.b,{variant:"contained",color:"secondary",onClick:function(){window.confirm("Are you sure you want to reset the app?")&&n()}},"Reset")))))}),ue=r(592),de=function(){return a.a.createElement("div",null,a.a.createElement(m.e,{container:!0,spacing:24,direction:"column",alignItems:"center",justify:"flex-end"},a.a.createElement("h1",null,"Analytics"),a.a.createElement(m.e,{item:!0,xs:12},a.a.createElement(ue.a,{innerRadius:100,colorScale:["tomato","orange","gold","red"],data:[{a:1,b:2}]}))))},me=r(239),fe=r.n(me),he=["#08306b","#08519c","#2171b5","#4292c6","#6baed6","#fc8d59","#ef6548","#d7301f","#b30000","#7f0000"];he=he.reverse();var ge,pe,ve,we,ye,We,be,Ee=function(e){return e.replace(/[^\w\s]|_/g,"").replace(/\s+/g," ")},Ce=function(e){return Ee(e).toLowerCase()},ke=function(e,t){var r=Ce(e);return!!t.has(r)},Se=function(e,t){var r=Ce(e);if(void 0===t||0===t.length)return-1;for(var n=0;n<t.length;n++)if(r===t[n][0])return n;return-1},Te=function e(){var t=this;Object(l.a)(this,e),this.GetColor=function(e){var r=e.word,n=Se(r,t.topWords);return-1===n?"black":t.topWords[n][1]<3?"black":he[n]},this.IsInMostUsedList=function(e){return Se(e,t.topWords)>-1},this.GetFrequency=function(e){var r=0,n=Ce(e);return ke(n,t.wordsAndFreqs)&&(r=t.wordsAndFreqs.get(n)),r},this.CalculateFrequencies=function(e){t.wordsAndFreqs=function(e){for(var t=new Map,r=0;r<e.length;r++)for(var n=e[r].words,a=0;a<n.length;a++){var o=n[a].word,i=Ee(o);if(o=i.toLowerCase(),t.has(o)){var l=t.get(o)+1;t.set(o,l)}else t.set(o,1)}return t}(e),t.topWords=function(e){var t,r=e.keys(),n=[];for(t=0;t<e.size;t++){var a=r.next().value;n[t]=[a,e.get(a)]}return n.sort(function(e,t){return e[1]>t[1]?1:e[1]<t[1]?-1:0})}(t.wordsAndFreqs),t.topWords=function(e,t){if(t<e.length){var r=e.length-t,n=e.slice(r);return n.reverse()}return e.reverse()}(t.topWords,10)},this.wordsAndFreqs=new Map,this.topWords=[]},je=function(e){return e<25?"blue":e>24?"green":"black"},Oe=function(e,t){var r=[];return function e(t,n,a){var o=parseInt((n+a)/2,10);if(a-n<4||o+1===a)return r[o][1];return t<=r[o][0]?e(t,n,o):e(t,o+1,a)}(e,0,(r=t).length-1)},Ve=function e(){var t=this;Object(l.a)(this,e),this.GetColor=function(e){var r=+e.sentenceStartTime,n=(1e3*+e.startTime.seconds+ +r+(1e3*+e.endTime.seconds+ +r))/2;if(!t.wordTimesAndVolumes.has(n)){var a=Oe(n,t.averageVolumes);t.wordTimesAndVolumes.set(n,a)}return je(t.wordTimesAndVolumes.get(n))},this.SetVolumes=function(e){var r=[];t.startVolume=t.startVolume+ +e.volume,t.volumeCounter=+t.volumeCounter+1,t.startTimeNotSet&&(t.startTime=e.time,t.startTimeNotSet=!1),t.volumeCounter===t.audioSampleSize&&(r[0]=(t.startTime+ +e.time)/2,r[1]=+t.startVolume/t.audioSampleSize,t.averageVolumes.push(r),t.startVolume=0,t.volumeCounter=0,t.startTime=0,t.startTimeNotSet=!0)},this.averageVolumes=[],this.wordTimesAndVolumes=new Map,this.startTime=0,this.startTimeNotSet=!0,this.startVolume=0,this.volumeCounter=0,this.audioSampleSize=10},xe=r(240),Fe=function(e){return Re(e).toLowerCase()},Re=function(e){return e.replace(/[^\w\s]|_/g,"").replace(/\s+/g," ")},Ae=function e(){var t=this;Object(l.a)(this,e),this.GetColor=function(e){var r=Fe(e.word);return t.fillerWords.has(r)?"red":"black"},this.fillerWords=new Map;for(var r=xe.fillerWords,n=0;n<r.length;n++)this.fillerWords.set(r[n].fillerWord,1)},Le=function e(){var t=this;Object(l.a)(this,e),this.CalculateFrequencies=function(e){t.WordCounter.CalculateFrequencies(e)},this.GetColor=function(e){return t.useFillerWords?t.FillerWords.GetColor(e):t.useVolumeLevel?t.AudioUtils.GetColor(e):t.useWordFrequencies?t.WordCounter.GetColor(e):"black"},this.ColorUsingFillerWords=function(){t.useFillerWords=!0,t.useWordFrequencies=!1,t.useVolumeLevel=!1},this.ColorUsingWordFrequencies=function(){t.useFillerWords=!1,t.useWordFrequencies=!0,t.useVolumeLevel=!1},this.ColorUsingVolumeLevel=function(){t.useFillerWords=!1,t.useWordFrequencies=!1,t.useVolumeLevel=!0},this.ResetColor=function(){t.useFillerWords=!1,t.useWordFrequencies=!1,t.useVolumeLevel=!1},this.SetVolumes=function(e){t.AudioUtils.SetVolumes(e)},this.WordCounter=new Te,this.AudioUtils=new Ve,this.FillerWords=new Ae,this.useFillerWords=!1,this.useWordFrequencies=!1,this.useVolumeLevel=!1},qe=function(e,t,r){if(r===t)return e;for(var n=t/r,a=Math.round(e.length/n),o=new Int16Array(a),i=0,l=0;i<o.length;){for(var s=Math.round((i+1)*n),c=0,u=0,d=l;d<s&&d<e.length;d++)c+=e[d],u++;o[i]=32767*Math.min(1,c/u),i++,l=s}return o.buffer},Ue={isRecording:!1,elapsed:0,transcript:[],volumes:[],interim:"",audioChunks:[],blobUrl:"",left:!1,view:0,wordColor:new Le,highlight:0},De=function(e){function t(e){var r;Object(l.a)(this,t),(r=Object(c.a)(this,Object(u.a)(t).call(this,e))).tick=function(){var e=1e3*pe.currentTime;r.setState({elapsed:e})},r.reset=function(){r.stopRecording(),r.setState(Ue,clearInterval(r.timer)),r.setState({wordColor:new Le})},r.setView=function(e){r.setState({view:e})},r.setHighLight=function(e){e===r.state.highlight?(r.state.wordColor.ResetColor(),r.setState({highlight:0})):1===e?(r.state.wordColor.ColorUsingFillerWords(),r.setState({highlight:1})):2===e?(r.state.wordColor.ColorUsingWordFrequencies(),r.setState({highlight:2})):3===e&&(r.state.wordColor.ColorUsingVolumeLevel(),r.setState({highlight:3}))},r.toggleRecord=function(){var e=!r.state.isRecording;r.setState({isRecording:e},e?function(){return r.timer=setInterval(r.tick,10),null==pe?r.handleListen():(be.resume(),pe.resume())}:function(){return clearInterval(r.timer),be.pause(),pe.suspend()})},r.streamAudioData=function(e){var t=e.inputBuffer.getChannelData(0),n=qe(t,44100,16e3);r.socket.emit("binaryData",n)},r.handleListen=function(){r.socket.emit("startGoogleCloudStream",""),ge=window.AudioContext||window.webkitAudioContext,(pe=new ge).suspend(),ve=pe.createScriptProcessor(r.bufferSize,1,1);navigator.mediaDevices.getUserMedia({audio:!0}).then(function(e){ye=e,be=new MediaRecorder(e),(we=pe.createMediaStreamSource(e)).connect(ve),(We=pe.createAnalyser()).smoothingTimeConstant=.8,We.fftSize=1024,we.connect(We),We.connect(ve),ve.connect(pe.destination),be.ondataavailable=function(e){var t=r.state.audioChunks.slice();t.push(e.data),r.setState({audioChunks:t});var n=new Blob(t),a=URL.createObjectURL(n);r.setState({blobUrl:a})},be.onpause=function(){be.requestData()},ve.onaudioprocess=function(e){r.streamAudioData(e);var t=new Uint8Array(We.frequencyBinCount);We.getByteFrequencyData(t);for(var n=0,a=t.length,o=0;o<a;o++)n+=t[o];var i=Math.round(n/a),l=r.state.volumes.slice(),s={time:r.state.elapsed,volume:i};r.state.wordColor.SetVolumes(s),l.push(s),r.setState({volumes:l})},be.start(),pe.resume()})},r.stopRecording=function(){if(r.socket.emit("endGoogleCloudStream",""),ye)for(var e=ye.getTracks(),t=0;t<e.length;t++)e[t].stop();be&&be.stop(),we&&we.disconnect(ve),ve&&ve.disconnect(pe.destination),pe&&pe.close().then(function(){we=null,ve=null,pe=null,ge=null,be=null})};var n=e.server_address;return r.bufferSize=2048,r.socket=fe()(n),r.state=Ue,r.socket.on("connect",function(){r.socket.emit("join","Server Connected to Client")}),r.socket.on("speechData",function(e){var t=e.results[0].isFinal,n=e.results[0].alternatives[0].words,a=e.results[0].alternatives[0].transcript;if(!1===t)r.setState({interim:a});else{var o=r.state.transcript.slice(0),i={startTime:0,endTime:r.state.elapsed,words:n},l=oe(i,1e3);i.startTime=l,o.push(i),r.setState({transcript:o}),r.state.wordColor.CalculateFrequencies(o)}}),window.onbeforeunload=function(){r.state.isRecording&&r.socket.emit("endGoogleCloudStream","")},r}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e;return e=0===this.state.view?a.a.createElement(ce,{state:this.state,toggleRecord:this.toggleRecord,reset:this.reset,setHighLight:this.setHighLight}):a.a.createElement(de,{state:this.state}),a.a.createElement("div",null,a.a.createElement("div",null,a.a.createElement(m.f,{smDown:!0},a.a.createElement(X,{setView:this.setView})),a.a.createElement(m.f,{mdUp:!0},a.a.createElement(K,{setView:this.setView}))),a.a.createElement("div",null,e))}}]),t}(n.Component),Ie="https://speech-dismantler.herokuapp.com/";"localhost"!==location.hostname&&"127.0.0.1"!==location.hostname||(Ie="http://localhost:3001"),i.a.render(a.a.createElement(De,{server_address:Ie}),document.getElementById("root"))}},[[317,1,2]]]);
//# sourceMappingURL=main.882ac841.chunk.js.map