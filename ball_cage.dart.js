(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
if(!(y.__proto__&&y.__proto__.p===z.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var x=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(x))return true}}catch(w){}return false}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b){"use strict"
function generateAccessor(a9,b0,b1){var g=a9.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var c
if(g.length>1)c=true
else c=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a0=d&3
var a1=d>>2
var a2=f=f.substring(0,e-1)
var a3=f.indexOf(":")
if(a3>0){a2=f.substring(0,a3)
f=f.substring(a3+1)}if(a0){var a4=a0&2?"r":""
var a5=a0&1?"this":"r"
var a6="return "+a5+"."+f
var a7=b1+".prototype.g"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}if(a1){var a4=a1&2?"r,v":"v"
var a5=a1&1?"this":"r"
var a6=a5+"."+f+"=v"
var a7=b1+".prototype.s"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}}return f}function defineClass(a2,a3){var g=[]
var f="function "+a2+"("
var e=""
var d=""
for(var c=0;c<a3.length;c++){if(c!=0)f+=", "
var a0=generateAccessor(a3[c],g,a2)
d+="'"+a0+"',"
var a1="p_"+a0
f+=a1
e+="this."+a0+" = "+a1+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a2+".builtin$cls=\""+a2+"\";\n"
f+="$desc=$collectedClasses."+a2+"[1];\n"
f+=a2+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a2+".name=\""+a2+"\";\n"
f+=a2+"."+"$__fields__"+"=["+d+"];\n"
f+=g.join("")
return f}init.createNewIsolate=function(){return new I()}
init.classIdExtractor=function(c){return c.constructor.name}
init.classFieldsExtractor=function(c){var g=c.constructor.$__fields__
if(!g)return[]
var f=[]
f.length=g.length
for(var e=0;e<g.length;e++)f[e]=c[g[e]]
return f}
init.instanceFromClassId=function(c){return new init.allClasses[c]()}
init.initializeEmptyInstance=function(c,d,e){init.allClasses[c].apply(d,e)
return d}
var z=supportsDirectProtoAccess?function(c,d){var g=c.prototype
g.__proto__=d.prototype
g.constructor=c
g["$is"+c.name]=c
return convertToFastObject(g)}:function(){function tmp(){}return function(a0,a1){tmp.prototype=a1.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a0.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var c=e[d]
g[c]=f[c]}g["$is"+a0.name]=a0
g.constructor=a0
a0.prototype=g
return g}}()
function finishClasses(a4){var g=init.allClasses
a4.combinedConstructorFunction+="return [\n"+a4.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a4.combinedConstructorFunction)(a4.collected)
a4.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.name
var a0=a4.collected[c]
var a1=a0[0]
a0=a0[1]
g[c]=d
a1[c]=d}f=null
var a2=init.finishedClasses
function finishClass(c1){if(a2[c1])return
a2[c1]=true
var a5=a4.pending[c1]
if(a5&&a5.indexOf("+")>0){var a6=a5.split("+")
a5=a6[0]
var a7=a6[1]
finishClass(a7)
var a8=g[a7]
var a9=a8.prototype
var b0=g[c1].prototype
var b1=Object.keys(a9)
for(var b2=0;b2<b1.length;b2++){var b3=b1[b2]
if(!u.call(b0,b3))b0[b3]=a9[b3]}}if(!a5||typeof a5!="string"){var b4=g[c1]
var b5=b4.prototype
b5.constructor=b4
b5.$isc=b4
b5.$deferredAction=function(){}
return}finishClass(a5)
var b6=g[a5]
if(!b6)b6=existingIsolateProperties[a5]
var b4=g[c1]
var b5=z(b4,b6)
if(a9)b5.$deferredAction=mixinDeferredActionHelper(a9,b5)
if(Object.prototype.hasOwnProperty.call(b5,"%")){var b7=b5["%"].split(";")
if(b7[0]){var b8=b7[0].split("|")
for(var b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=true}}if(b7[1]){b8=b7[1].split("|")
if(b7[2]){var b9=b7[2].split("|")
for(var b2=0;b2<b9.length;b2++){var c0=g[b9[b2]]
c0.$nativeSuperclassTag=b8[0]}}for(b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$ish)b5.$deferredAction()}var a3=Object.keys(a4.pending)
for(var e=0;e<a3.length;e++)finishClass(a3[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.charCodeAt(0)
var a0
if(d!=="^"&&d!=="$reflectable"&&c!==43&&c!==42&&(a0=g[d])!=null&&a0.constructor===Array&&d!=="<>")addStubs(g,a0,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(c,d){var g
if(d.hasOwnProperty("$deferredAction"))g=d.$deferredAction
return function foo(){if(!supportsDirectProtoAccess)return
var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="c"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="q"){processStatics(init.statics[b1]=b2.q,b3)
delete b2.q}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$D=b2[a0]
var a3=b2.$methodsWithOptionalArguments
if(!a3)b2.$methodsWithOptionalArguments=a3={}
a3[a0]=g}else{var a4=b2[a0]
if(a0!=="^"&&a4!=null&&a4.constructor===Array&&a0!=="<>")if(d)e=true
else addStubs(b2,a4,a0,false,[])
else g=a0}}if(e)b2.$deferredAction=finishAddStubsHelper
var a5=b2["^"],a6,a7,a8=a5
var a9=a8.split(";")
a8=a9[1]?a9[1].split(","):[]
a7=a9[0]
a6=a7.split(":")
if(a6.length==2){a7=a6[0]
var b0=a6[1]
if(b0)b2.$S=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
b3.combinedConstructorFunction+=defineClass(b1,a8)
b3.constructorsList.push(b1)
b3.collected[b1]=[m,b2]
i.push(b1)}function processStatics(a3,a4){var g=Object.keys(a3)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a3[e]
var c=e.charCodeAt(0)
var a0
if(c===43){v[a0]=e.substring(1)
var a1=a3[e]
if(a1>0)a3[a0].$reflectable=a1
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$D=d
var a2=a3.$methodsWithOptionalArguments
if(!a2)a3.$methodsWithOptionalArguments=a2={}
a2[e]=a0}else if(typeof d==="function"){m[a0=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a0=e
processClassData(e,d,a4)}}}function addStubs(b2,b3,b4,b5,b6){var g=0,f=b3[g],e
if(typeof f=="string")e=b3[++g]
else{e=f
f=b4}var d=[b2[b4]=b2[f]=e]
e.$stubName=b4
b6.push(b4)
for(g++;g<b3.length;g++){e=b3[g]
if(typeof e!="function")break
if(!b5)e.$stubName=b3[++g]
d.push(e)
if(e.$stubName){b2[e.$stubName]=e
b6.push(e.$stubName)}}for(var c=0;c<d.length;g++,c++)d[c].$callName=b3[g]
var a0=b3[g]
b3=b3.slice(++g)
var a1=b3[0]
var a2=a1>>1
var a3=(a1&1)===1
var a4=a1===3
var a5=a1===1
var a6=b3[1]
var a7=a6>>1
var a8=(a6&1)===1
var a9=a2+a7!=d[0].length
var b0=b3[2]
if(typeof b0=="number")b3[2]=b0+b
var b1=2*a7+a2+3
if(a0){e=tearOff(d,b3,b5,b4,a9)
b2[b4].$getter=e
e.$getterStub=true
if(b5){init.globalFunctions[b4]=e
b6.push(a0)}b2[a0]=e
d.push(e)
e.$stubName=a0
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.ct"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.ct"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.ct(this,c,d,true,[],f).prototype
return g}:tearOffGetter(c,d,f,a0)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.G=function(){}
var dart=[["","",,H,{"^":"",k4:{"^":"c;a"}}],["","",,J,{"^":"",
p:function(a){return void 0},
bD:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bA:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.cx==null){H.jd()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.e(new P.e2("Return interceptor for "+H.d(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$bW()]
if(v!=null)return v
v=H.jl(a)
if(v!=null)return v
if(typeof a=="function")return C.U
y=Object.getPrototypeOf(a)
if(y==null)return C.I
if(y===Object.prototype)return C.I
if(typeof w=="function"){Object.defineProperty(w,$.$get$bW(),{value:C.B,enumerable:false,writable:true,configurable:true})
return C.B}return C.B},
h:{"^":"c;",
L:function(a,b){return a===b},
gI:function(a){return H.aa(a)},
k:["dQ",function(a){return H.bp(a)}],
"%":"AnimationEvent|AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|Blob|BlobEvent|CanvasGradient|CanvasPattern|CanvasRenderingContext2D|ClipboardEvent|CloseEvent|CompositionEvent|CustomEvent|DOMError|DOMImplementation|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|DragEvent|ErrorEvent|Event|ExtendableEvent|ExtendableMessageEvent|FetchEvent|File|FileError|FocusEvent|FontFaceSetLoadEvent|GamepadEvent|GeofencingEvent|HashChangeEvent|IDBVersionChangeEvent|InputEvent|InstallEvent|KeyboardEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaError|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MouseEvent|NavigatorUserMediaError|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PointerEvent|PopStateEvent|PositionError|PresentationConnectionAvailableEvent|PresentationConnectionCloseEvent|ProgressEvent|PromiseRejectionEvent|PushEvent|PushMessageData|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|Range|RelatedEvent|ResourceProgressEvent|SQLError|SVGAnimatedEnumeration|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|SVGAnimatedTransformList|SVGZoomEvent|SecurityPolicyViolationEvent|ServicePortConnectEvent|ServiceWorkerMessageEvent|SpeechRecognitionError|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|StorageManager|SyncEvent|TextEvent|TouchEvent|TrackEvent|TransitionEvent|UIEvent|USBConnectionEvent|WebGLContextEvent|WebKitTransitionEvent|WheelEvent"},
fK:{"^":"h;",
k:function(a){return String(a)},
gI:function(a){return a?519018:218159},
$iscr:1},
da:{"^":"h;",
L:function(a,b){return null==b},
k:function(a){return"null"},
gI:function(a){return 0}},
bX:{"^":"h;",
gI:function(a){return 0},
k:["dS",function(a){return String(a)}],
$isfL:1},
ho:{"^":"bX;"},
b1:{"^":"bX;"},
aT:{"^":"bX;",
k:function(a){var z=a[$.$get$cQ()]
return z==null?this.dS(a):J.a2(z)},
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}}},
aQ:{"^":"h;$ti",
bF:function(a,b){if(!!a.immutable$list)throw H.e(new P.H(b))},
eJ:function(a,b){if(!!a.fixed$length)throw H.e(new P.H(b))},
cW:function(a,b){return new H.c2(a,b,[H.ac(a,0),null])},
a_:function(a,b){return a[b]},
gfd:function(a){if(a.length>0)return a[0]
throw H.e(H.bV())},
W:function(a,b,c,d,e){var z,y,x,w
this.bF(a,"setRange")
P.ca(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.t(P.Z(e,0,null,"skipCount",null))
if(!!J.p(d).$isj){y=e
x=d}else{d.toString
x=H.dC(d,e,null,H.ac(d,0)).bU(0,!1)
y=0}if(y+z>x.length)throw H.e(H.fH())
if(y<b)for(w=z-1;w>=0;--w)a[b+w]=x[y+w]
else for(w=0;w<z;++w)a[b+w]=x[y+w]},
dm:function(a,b,c,d){return this.W(a,b,c,d,0)},
cF:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y]))return!0
if(a.length!==z)throw H.e(new P.V(a))}return!1},
R:function(a,b){var z
for(z=0;z<a.length;++z)if(J.a5(a[z],b))return!0
return!1},
k:function(a){return P.bk(a,"[","]")},
gP:function(a){return new J.eO(a,a.length,0,null)},
gI:function(a){return H.aa(a)},
gt:function(a){return a.length},
st:function(a,b){this.eJ(a,"set length")
if(b<0)throw H.e(P.Z(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.y(a,b))
if(b>=a.length||b<0)throw H.e(H.y(a,b))
return a[b]},
l:function(a,b,c){this.bF(a,"indexed set")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.y(a,b))
if(b>=a.length||b<0)throw H.e(H.y(a,b))
a[b]=c},
$isD:1,
$asD:I.G,
$isj:1,
$asj:null,
$isi:1,
$asi:null,
q:{
fJ:function(a,b){var z
if(typeof a!=="number"||Math.floor(a)!==a)throw H.e(P.cH(a,"length","is not an integer"))
if(a<0||a>4294967295)throw H.e(P.Z(a,0,4294967295,"length",null))
z=H.f(new Array(a),[b])
z.fixed$length=Array
return z}}},
k3:{"^":"aQ;$ti"},
eO:{"^":"c;a,b,c,d",
gG:function(){return this.d},
D:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.e(H.eA(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aR:{"^":"h;",
aF:function(a,b){var z
if(typeof b!=="number")throw H.e(H.a0(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gbR(b)
if(this.gbR(a)===z)return 0
if(this.gbR(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gbR:function(a){return a===0?1/a<0:a<0},
V:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.e(new P.H(""+a+".toInt()"))},
am:function(a){var z,y
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){z=a|0
return a===z?z:z-1}y=Math.floor(a)
if(isFinite(y))return y
throw H.e(new P.H(""+a+".floor()"))},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gI:function(a){return a&0x1FFFFFFF},
p:function(a,b){return a+b},
u:function(a,b){if(typeof b!=="number")throw H.e(H.a0(b))
return a-b},
d6:function(a,b){return a/b},
j:function(a,b){return a*b},
ae:function(a,b){if(typeof b!=="number")throw H.e(H.a0(b))
if((a|0)===a)if(b>=1||!1)return a/b|0
return this.cC(a,b)},
ai:function(a,b){return(a|0)===a?a/b|0:this.cC(a,b)},
cC:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.e(new P.H("Result of truncating division is "+H.d(z)+": "+H.d(a)+" ~/ "+b))},
aC:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
bm:function(a,b){return(a|b)>>>0},
C:function(a,b){if(typeof b!=="number")throw H.e(H.a0(b))
return a<b},
a0:function(a,b){if(typeof b!=="number")throw H.e(H.a0(b))
return a>b},
dc:function(a,b){if(typeof b!=="number")throw H.e(H.a0(b))
return a<=b},
$isP:1},
d9:{"^":"aR;",$isP:1,$isl:1},
d8:{"^":"aR;",$isP:1},
aS:{"^":"h;",
ei:function(a,b){if(b>=a.length)throw H.e(H.y(a,b))
return a.charCodeAt(b)},
p:function(a,b){return a+b},
dM:function(a,b,c){var z
if(c>a.length)throw H.e(P.Z(c,0,a.length,null,null))
z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)},
dL:function(a,b){return this.dM(a,b,0)},
cb:function(a,b,c){if(c==null)c=a.length
if(b<0)throw H.e(P.bq(b,null,null))
if(b>c)throw H.e(P.bq(b,null,null))
if(c>a.length)throw H.e(P.bq(c,null,null))
return a.substring(b,c)},
dP:function(a,b){return this.cb(a,b,null)},
fS:function(a){return a.toLowerCase()},
aF:function(a,b){var z
if(typeof b!=="string")throw H.e(H.a0(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
k:function(a){return a},
gI:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gt:function(a){return a.length},
h:function(a,b){if(b>=a.length||!1)throw H.e(H.y(a,b))
return a[b]},
$isD:1,
$asD:I.G,
$isw:1}}],["","",,H,{"^":"",
bV:function(){return new P.b_("No element")},
fI:function(){return new P.b_("Too many elements")},
fH:function(){return new P.b_("Too few elements")},
aZ:function(a,b,c,d){if(c-b<=32)H.hC(a,b,c,d)
else H.hB(a,b,c,d)},
hC:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.A(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.T(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.l(a,w,y.h(a,v))
w=v}y.l(a,w,x)}},
hB:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.b.ai(c-b+1,6)
y=b+z
x=c-z
w=C.b.ai(b+c,2)
v=w-z
u=w+z
t=J.A(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.T(d.$2(s,r),0)){n=r
r=s
s=n}if(J.T(d.$2(p,o),0)){n=o
o=p
p=n}if(J.T(d.$2(s,q),0)){n=q
q=s
s=n}if(J.T(d.$2(r,q),0)){n=q
q=r
r=n}if(J.T(d.$2(s,p),0)){n=p
p=s
s=n}if(J.T(d.$2(q,p),0)){n=p
p=q
q=n}if(J.T(d.$2(r,o),0)){n=o
o=r
r=n}if(J.T(d.$2(r,q),0)){n=q
q=r
r=n}if(J.T(d.$2(p,o),0)){n=o
o=p
p=n}t.l(a,y,s)
t.l(a,w,q)
t.l(a,x,o)
t.l(a,v,t.h(a,b))
t.l(a,u,t.h(a,c))
m=b+1
l=c-1
if(J.a5(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.h(a,k)
i=d.$2(j,r)
if(i===0)continue
if(i<0){if(k!==m){t.l(a,k,t.h(a,m))
t.l(a,m,j)}++m}else for(;!0;){i=d.$2(t.h(a,l),r)
if(i>0){--l
continue}else{h=l-1
if(i<0){t.l(a,k,t.h(a,m))
g=m+1
t.l(a,m,t.h(a,l))
t.l(a,l,j)
l=h
m=g
break}else{t.l(a,k,t.h(a,l))
t.l(a,l,j)
l=h
break}}}}f=!0}else{for(k=m;k<=l;++k){j=t.h(a,k)
if(d.$2(j,r)<0){if(k!==m){t.l(a,k,t.h(a,m))
t.l(a,m,j)}++m}else if(d.$2(j,p)>0)for(;!0;)if(d.$2(t.h(a,l),p)>0){--l
if(l<k)break
continue}else{h=l-1
if(d.$2(t.h(a,l),r)<0){t.l(a,k,t.h(a,m))
g=m+1
t.l(a,m,t.h(a,l))
t.l(a,l,j)
m=g}else{t.l(a,k,t.h(a,l))
t.l(a,l,j)}l=h
break}}f=!1}e=m-1
t.l(a,b,t.h(a,e))
t.l(a,e,r)
e=l+1
t.l(a,c,t.h(a,e))
t.l(a,e,p)
H.aZ(a,b,m-2,d)
H.aZ(a,l+2,c,d)
if(f)return
if(m<y&&l>x){for(;J.a5(d.$2(t.h(a,m),r),0);)++m
for(;J.a5(d.$2(t.h(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.h(a,k)
if(d.$2(j,r)===0){if(k!==m){t.l(a,k,t.h(a,m))
t.l(a,m,j)}++m}else if(d.$2(j,p)===0)for(;!0;)if(d.$2(t.h(a,l),p)===0){--l
if(l<k)break
continue}else{h=l-1
if(d.$2(t.h(a,l),r)<0){t.l(a,k,t.h(a,m))
g=m+1
t.l(a,m,t.h(a,l))
t.l(a,l,j)
m=g}else{t.l(a,k,t.h(a,l))
t.l(a,l,j)}l=h
break}}H.aZ(a,m,l,d)}else H.aZ(a,m,l,d)},
i:{"^":"W;$ti",$asi:null},
aV:{"^":"i;$ti",
gP:function(a){return new H.de(this,this.gt(this),0,null)},
bX:function(a,b){return this.dR(0,b)},
bU:function(a,b){var z,y
z=H.f([],[H.ab(this,"aV",0)])
C.d.st(z,this.gt(this))
for(y=0;y<this.gt(this);++y)z[y]=this.a_(0,y)
return z},
fR:function(a){return this.bU(a,!0)}},
hE:{"^":"aV;a,b,c,$ti",
gep:function(){var z,y
z=J.ad(this.a)
y=this.c
if(y==null||y>z)return z
return y},
geA:function(){var z,y
z=J.ad(this.a)
y=this.b
if(y>z)return z
return y},
gt:function(a){var z,y,x
z=J.ad(this.a)
y=this.b
if(y>=z)return 0
x=this.c
if(x==null||x>=z)return z-y
return x-y},
a_:function(a,b){var z=this.geA()+b
if(b<0||z>=this.gep())throw H.e(P.aA(b,this,"index",null,null))
return J.cC(this.a,z)},
bU:function(a,b){var z,y,x,w,v,u,t,s
z=this.b
y=this.a
x=J.A(y)
w=x.gt(y)
v=this.c
if(v!=null&&v<w)w=v
u=w-z
if(u<0)u=0
t=H.f(new Array(u),this.$ti)
for(s=0;s<u;++s){t[s]=x.a_(y,z+s)
if(x.gt(y)<w)throw H.e(new P.V(this))}return t},
e8:function(a,b,c,d){var z,y
z=this.b
if(z<0)H.t(P.Z(z,0,null,"start",null))
y=this.c
if(y!=null){if(y<0)H.t(P.Z(y,0,null,"end",null))
if(z>y)throw H.e(P.Z(z,0,y,"start",null))}},
q:{
dC:function(a,b,c,d){var z=new H.hE(a,b,c,[d])
z.e8(a,b,c,d)
return z}}},
de:{"^":"c;a,b,c,d",
gG:function(){return this.d},
D:function(){var z,y,x,w
z=this.a
y=J.A(z)
x=y.gt(z)
if(this.b!==x)throw H.e(new P.V(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.a_(z,w);++this.c
return!0}},
dg:{"^":"W;a,b,$ti",
gP:function(a){return new H.fU(null,J.aL(this.a),this.b,this.$ti)},
gt:function(a){return J.ad(this.a)},
$asW:function(a,b){return[b]},
q:{
c1:function(a,b,c,d){if(!!a.$isi)return new H.fm(a,b,[c,d])
return new H.dg(a,b,[c,d])}}},
fm:{"^":"dg;a,b,$ti",$isi:1,
$asi:function(a,b){return[b]}},
fU:{"^":"d7;a,b,c,$ti",
D:function(){var z=this.b
if(z.D()){this.a=this.c.$1(z.gG())
return!0}this.a=null
return!1},
gG:function(){return this.a}},
c2:{"^":"aV;a,b,$ti",
gt:function(a){return J.ad(this.a)},
a_:function(a,b){return this.b.$1(J.cC(this.a,b))},
$asaV:function(a,b){return[b]},
$asi:function(a,b){return[b]},
$asW:function(a,b){return[b]}},
e6:{"^":"W;a,b,$ti",
gP:function(a){return new H.hX(J.aL(this.a),this.b,this.$ti)}},
hX:{"^":"d7;a,b,$ti",
D:function(){var z,y
for(z=this.a,y=this.b;z.D();)if(y.$1(z.gG()))return!0
return!1},
gG:function(){return this.a.gG()}},
d1:{"^":"c;$ti"}}],["","",,H,{"^":"",
b3:function(a,b){var z=a.aR(b)
if(!init.globalState.d.cy)init.globalState.f.b_()
return z},
ey:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.p(y).$isj)throw H.e(P.cG("Arguments to main must be a List: "+H.d(y)))
init.globalState=new H.iq(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$d5()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.id(P.bZ(null,H.b2),0)
x=P.l
y.z=new H.ai(0,null,null,null,null,null,0,[x,H.cn])
y.ch=new H.ai(0,null,null,null,null,null,0,[x,null])
if(y.x){w=new H.ip()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.fA,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.ir)}if(init.globalState.x)return
y=init.globalState.a++
w=P.X(null,null,null,x)
v=new H.br(0,null,!1)
u=new H.cn(y,new H.ai(0,null,null,null,null,null,0,[x,H.br]),w,init.createNewIsolate(),v,new H.ae(H.bE()),new H.ae(H.bE()),!1,!1,[],P.X(null,null,null,null),null,null,!1,!0,P.X(null,null,null,null))
w.F(0,0)
u.ce(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.bz(a,{func:1,args:[,]}))u.aR(new H.jq(z,a))
else if(H.bz(a,{func:1,args:[,,]}))u.aR(new H.jr(z,a))
else u.aR(a)
init.globalState.f.b_()},
fE:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x)return H.fF()
return},
fF:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.e(new P.H("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.e(new P.H('Cannot extract URI from "'+z+'"'))},
fA:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.bv(!0,[]).au(b.data)
y=J.A(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.bv(!0,[]).au(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.bv(!0,[]).au(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.l
p=P.X(null,null,null,q)
o=new H.br(0,null,!1)
n=new H.cn(y,new H.ai(0,null,null,null,null,null,0,[q,H.br]),p,init.createNewIsolate(),o,new H.ae(H.bE()),new H.ae(H.bE()),!1,!1,[],P.X(null,null,null,null),null,null,!1,!0,P.X(null,null,null,null))
p.F(0,0)
n.ce(0,o)
init.globalState.f.a.af(new H.b2(n,new H.fB(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.b_()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)J.eL(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.b_()
break
case"close":init.globalState.ch.aZ(0,$.$get$d6().h(0,a))
a.terminate()
init.globalState.f.b_()
break
case"log":H.fz(y.h(z,"msg"))
break
case"print":if(init.globalState.x){y=init.globalState.Q
q=P.aB(["command","print","msg",z])
q=new H.ao(!0,P.aG(null,P.l)).a1(q)
y.toString
self.postMessage(q)}else P.cz(y.h(z,"msg"))
break
case"error":throw H.e(y.h(z,"msg"))}},
fz:function(a){var z,y,x,w
if(init.globalState.x){y=init.globalState.Q
x=P.aB(["command","log","msg",a])
x=new H.ao(!0,P.aG(null,P.l)).a1(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.S(w)
z=H.b5(w)
y=P.bh(z)
throw H.e(y)}},
fC:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.dr=$.dr+("_"+y)
$.ds=$.ds+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.ad(0,["spawned",new H.bw(y,x),w,z.r])
x=new H.fD(a,b,c,d,z)
if(e){z.cE(w,w)
init.globalState.f.a.af(new H.b2(z,x,"start isolate"))}else x.$0()},
iI:function(a){return new H.bv(!0,[]).au(new H.ao(!1,P.aG(null,P.l)).a1(a))},
jq:{"^":"k:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
jr:{"^":"k:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
iq:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",q:{
ir:function(a){var z=P.aB(["command","print","msg",a])
return new H.ao(!0,P.aG(null,P.l)).a1(z)}}},
cn:{"^":"c;a,b,c,fs:d<,eR:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
cE:function(a,b){if(!this.f.L(0,a))return
if(this.Q.F(0,b)&&!this.y)this.y=!0
this.bC()},
fI:function(a){var z,y,x,w,v
if(!this.y)return
z=this.Q
z.aZ(0,a)
if(z.a===0){for(z=this.z;z.length!==0;){y=z.pop()
x=init.globalState.f.a
w=x.b
v=x.a
w=(w-1&v.length-1)>>>0
x.b=w
v[w]=y
if(w===x.c)x.cs();++x.d}this.y=!1}this.bC()},
eE:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.p(a),y=0;x=this.ch,y<x.length;y+=2)if(z.L(a,x[y])){this.ch[y+1]=b
return}x.push(a)
this.ch.push(b)},
fH:function(a){var z,y,x
if(this.ch==null)return
for(z=J.p(a),y=0;x=this.ch,y<x.length;y+=2)if(z.L(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.t(new P.H("removeRange"))
P.ca(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
dl:function(a,b){if(!this.r.L(0,a))return
this.db=b},
fh:function(a,b,c){var z
if(b!==0)z=b===1&&!this.cy
else z=!0
if(z){a.ad(0,c)
return}z=this.cx
if(z==null){z=P.bZ(null,null)
this.cx=z}z.af(new H.ij(a,c))},
fg:function(a,b){var z
if(!this.r.L(0,a))return
if(b!==0)z=b===1&&!this.cy
else z=!0
if(z){this.bS()
return}z=this.cx
if(z==null){z=P.bZ(null,null)
this.cx=z}z.af(this.gft())},
fi:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.cz(a)
if(b!=null)P.cz(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.a2(a)
y[1]=b==null?null:b.k(0)
for(x=new P.ed(z,z.r,null,null),x.c=z.e;x.D();)x.d.ad(0,y)},
aR:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.S(u)
v=H.b5(u)
this.fi(w,v)
if(this.db){this.bS()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gfs()
if(this.cx!=null)for(;t=this.cx,!t.gaW(t);)this.cx.d_().$0()}return y},
cV:function(a){return this.b.h(0,a)},
ce:function(a,b){var z=this.b
if(z.aM(a))throw H.e(P.bh("Registry: ports must be registered only once."))
z.l(0,a,b)},
bC:function(){var z=this.b
if(z.gt(z)-this.c.a>0||this.y||!this.x)init.globalState.z.l(0,this.a,this)
else this.bS()},
bS:[function(){var z,y,x
z=this.cx
if(z!=null)z.aE(0)
for(z=this.b,y=z.gd4(z),y=y.gP(y);y.D();)y.gG().eh()
z.aE(0)
this.c.aE(0)
init.globalState.z.aZ(0,this.a)
this.dx.aE(0)
if(this.ch!=null){for(x=0;z=this.ch,x<z.length;x+=2)z[x].ad(0,z[x+1])
this.ch=null}},"$0","gft",0,0,2]},
ij:{"^":"k:2;a,b",
$0:function(){this.a.ad(0,this.b)}},
id:{"^":"c;a,b",
eV:function(){var z=this.a
if(z.b===z.c)return
return z.d_()},
d1:function(){var z,y,x
z=this.eV()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.aM(init.globalState.e.a))if(init.globalState.r){y=init.globalState.e.b
y=y.gaW(y)}else y=!1
else y=!1
else y=!1
if(y)H.t(P.bh("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x){x=y.z
x=x.gaW(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.aB(["command","close"])
x=new H.ao(!0,new P.ee(0,null,null,null,null,null,0,[null,P.l])).a1(x)
y.toString
self.postMessage(x)}return!1}z.fB()
return!0},
cA:function(){if(self.window!=null)new H.ie(this).$0()
else for(;this.d1(););},
b_:function(){var z,y,x,w,v
if(!init.globalState.x)this.cA()
else try{this.cA()}catch(x){z=H.S(x)
y=H.b5(x)
w=init.globalState.Q
v=P.aB(["command","error","msg",H.d(z)+"\n"+H.d(y)])
v=new H.ao(!0,P.aG(null,P.l)).a1(v)
w.toString
self.postMessage(v)}}},
ie:{"^":"k:2;a",
$0:function(){if(!this.a.d1())return
P.hQ(C.E,this)}},
b2:{"^":"c;a,b,c",
fB:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.aR(this.b)}},
ip:{"^":"c;"},
fB:{"^":"k:0;a,b,c,d,e,f",
$0:function(){H.fC(this.a,this.b,this.c,this.d,this.e,this.f)}},
fD:{"^":"k:2;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(!this.d)this.a.$1(this.c)
else{y=this.a
if(H.bz(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.bz(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.bC()}},
e8:{"^":"c;"},
bw:{"^":"e8;b,a",
ad:function(a,b){var z,y,x
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.c)return
x=H.iI(b)
if(z.geR()===y){y=J.A(x)
switch(y.h(x,0)){case"pause":z.cE(y.h(x,1),y.h(x,2))
break
case"resume":z.fI(y.h(x,1))
break
case"add-ondone":z.eE(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.fH(y.h(x,1))
break
case"set-errors-fatal":z.dl(y.h(x,1),y.h(x,2))
break
case"ping":z.fh(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.fg(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.F(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.aZ(0,y)
break}return}init.globalState.f.a.af(new H.b2(z,new H.is(this,x),"receive"))},
L:function(a,b){var z,y
if(b==null)return!1
if(b instanceof H.bw){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gI:function(a){return this.b.a}},
is:{"^":"k:0;a,b",
$0:function(){var z=this.a.b
if(!z.c)z.ef(this.b)}},
co:{"^":"e8;b,c,a",
ad:function(a,b){var z,y,x
z=P.aB(["command","message","port",this,"msg",b])
y=new H.ao(!0,P.aG(null,P.l)).a1(z)
if(init.globalState.x){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
L:function(a,b){var z,y
if(b==null)return!1
if(b instanceof H.co){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.c
y=b.c
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gI:function(a){return(this.b<<16^this.a<<8^this.c)>>>0}},
br:{"^":"c;a,b,c",
eh:function(){this.c=!0
this.b=null},
ef:function(a){if(this.c)return
this.b.$1(a)},
$ishs:1},
dN:{"^":"c;a,b,c",
eb:function(a,b){if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setInterval(H.aK(new H.hN(this,b),0),a)}else throw H.e(new P.H("Periodic timer."))},
ea:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.af(new H.b2(y,new H.hO(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.aK(new H.hP(this,b),0),a)}else throw H.e(new P.H("Timer greater than 0."))},
q:{
hL:function(a,b){var z=new H.dN(!0,!1,null)
z.ea(a,b)
return z},
hM:function(a,b){var z=new H.dN(!1,!1,null)
z.eb(a,b)
return z}}},
hO:{"^":"k:2;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
hP:{"^":"k:2;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
hN:{"^":"k:0;a,b",
$0:function(){this.b.$1(this.a)}},
ae:{"^":"c;a",
gI:function(a){var z=this.a
z=C.b.aC(z,0)^C.b.ai(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
L:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.ae){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
ao:{"^":"c;a,b",
a1:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.l(0,a,z.gt(z))
z=J.p(a)
if(!!z.$isdh)return["buffer",a]
if(!!z.$isc5)return["typed",a]
if(!!z.$isD)return this.dh(a)
if(!!z.$isfy){x=this.gde()
w=a.gaH()
w=H.c1(w,x,H.ab(w,"W",0),null)
w=P.c_(w,!0,H.ab(w,"W",0))
z=z.gd4(a)
z=H.c1(z,x,H.ab(z,"W",0),null)
return["map",w,P.c_(z,!0,H.ab(z,"W",0))]}if(!!z.$isfL)return this.di(a)
if(!!z.$ish)this.d3(a)
if(!!z.$ishs)this.b0(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbw)return this.dj(a)
if(!!z.$isco)return this.dk(a)
if(!!z.$isk){v=a.$static_name
if(v==null)this.b0(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isae)return["capability",a.a]
if(!(a instanceof P.c))this.d3(a)
return["dart",init.classIdExtractor(a),this.dg(init.classFieldsExtractor(a))]},"$1","gde",2,0,1],
b0:function(a,b){throw H.e(new P.H((b==null?"Can't transmit:":b)+" "+H.d(a)))},
d3:function(a){return this.b0(a,null)},
dh:function(a){var z=this.df(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.b0(a,"Can't serialize indexable: ")},
df:function(a){var z,y
z=[]
C.d.st(z,a.length)
for(y=0;y<a.length;++y)z[y]=this.a1(a[y])
return z},
dg:function(a){var z
for(z=0;z<a.length;++z)C.d.l(a,z,this.a1(a[z]))
return a},
di:function(a){var z,y,x
if(!!a.constructor&&a.constructor!==Object)this.b0(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.d.st(y,z.length)
for(x=0;x<z.length;++x)y[x]=this.a1(a[z[x]])
return["js-object",z,y]},
dk:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
dj:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.a]
return["raw sendport",a]}},
bv:{"^":"c;a,b",
au:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.e(P.cG("Bad serialized message: "+H.d(a)))
switch(C.d.gfd(a)){case"ref":return this.b[a[1]]
case"buffer":z=a[1]
this.b.push(z)
return z
case"typed":z=a[1]
this.b.push(z)
return z
case"fixed":z=a[1]
this.b.push(z)
y=H.f(this.aP(z),[null])
y.fixed$length=Array
return y
case"extendable":z=a[1]
this.b.push(z)
return H.f(this.aP(z),[null])
case"mutable":z=a[1]
this.b.push(z)
return this.aP(z)
case"const":z=a[1]
this.b.push(z)
y=H.f(this.aP(z),[null])
y.fixed$length=Array
return y
case"map":return this.eY(a)
case"sendport":return this.eZ(a)
case"raw sendport":z=a[1]
this.b.push(z)
return z
case"js-object":return this.eX(a)
case"function":z=init.globalFunctions[a[1]]()
this.b.push(z)
return z
case"capability":return new H.ae(a[1])
case"dart":x=a[1]
w=a[2]
v=init.instanceFromClassId(x)
this.b.push(v)
this.aP(w)
return init.initializeEmptyInstance(x,v,w)
default:throw H.e("couldn't deserialize: "+H.d(a))}},"$1","geW",2,0,1],
aP:function(a){var z
for(z=0;z<a.length;++z)C.d.l(a,z,this.au(a[z]))
return a},
eY:function(a){var z,y,x,w,v
z=a[1]
y=a[2]
x=P.db()
this.b.push(x)
z=J.eJ(z,this.geW()).fR(0)
for(w=J.A(y),v=0;v<z.length;++v)x.l(0,z[v],this.au(w.h(y,v)))
return x},
eZ:function(a){var z,y,x,w,v,u,t
z=a[1]
y=a[2]
x=a[3]
w=init.globalState.b
if(z==null?w==null:z===w){v=init.globalState.z.h(0,y)
if(v==null)return
u=v.cV(x)
if(u==null)return
t=new H.bw(u,y)}else t=new H.co(z,x,y)
this.b.push(t)
return t},
eX:function(a){var z,y,x,w,v,u
z=a[1]
y=a[2]
x={}
this.b.push(x)
for(w=J.A(z),v=J.A(y),u=0;u<w.gt(z);++u)x[w.h(z,u)]=this.au(v.h(y,u))
return x}}}],["","",,H,{"^":"",
j5:function(a){return init.types[a]},
et:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.p(a).$isL},
d:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.a2(a)
if(typeof z!=="string")throw H.e(H.a0(a))
return z},
aa:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
c9:function(a){var z,y,x,w,v,u,t,s
z=J.p(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.N||!!J.p(a).$isb1){v=C.H(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.u.ei(w,0)===36)w=C.u.dP(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.eu(H.cv(a),0,null),init.mangledGlobalNames)},
bp:function(a){return"Instance of '"+H.c9(a)+"'"},
kp:[function(){return Date.now()},"$0","iM",0,0,14],
bo:function(){var z,y
if($.al!=null)return
$.al=1000
$.r=H.iM()
if(typeof window=="undefined")return
z=window
if(z==null)return
y=z.performance
if(y==null)return
if(typeof y.now!="function")return
$.al=1e6
$.r=new H.hq(y)},
c8:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.a0(a))
return a[b]},
dt:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.a0(a))
a[b]=c},
y:function(a,b){var z
if(typeof b!=="number"||Math.floor(b)!==b)return new P.a7(!0,b,"index",null)
z=J.ad(a)
if(b<0||b>=z)return P.aA(b,a,"index",null,z)
return P.bq(b,"index",null)},
a0:function(a){return new P.a7(!0,a,null,null)},
iY:function(a){return a},
e:function(a){var z
if(a==null)a=new P.dq()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.eB})
z.name=""}else z.toString=H.eB
return z},
eB:function(){return J.a2(this.dartException)},
t:function(a){throw H.e(a)},
eA:function(a){throw H.e(new P.V(a))},
S:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.jt(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.b.aC(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bY(H.d(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.d(y)+" (Error "+w+")"
return z.$1(new H.dp(v,null))}}if(a instanceof TypeError){u=$.$get$dS()
t=$.$get$dT()
s=$.$get$dU()
r=$.$get$dV()
q=$.$get$dZ()
p=$.$get$e_()
o=$.$get$dX()
$.$get$dW()
n=$.$get$e1()
m=$.$get$e0()
l=u.a4(y)
if(l!=null)return z.$1(H.bY(y,l))
else{l=t.a4(y)
if(l!=null){l.method="call"
return z.$1(H.bY(y,l))}else{l=s.a4(y)
if(l==null){l=r.a4(y)
if(l==null){l=q.a4(y)
if(l==null){l=p.a4(y)
if(l==null){l=o.a4(y)
if(l==null){l=r.a4(y)
if(l==null){l=n.a4(y)
if(l==null){l=m.a4(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.dp(y,l==null?null:l.method))}}return z.$1(new H.hT(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.dA()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.a7(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.dA()
return a},
b5:function(a){var z
if(a==null)return new H.ef(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.ef(a,null)},
jn:function(a){if(a==null||typeof a!='object')return J.at(a)
else return H.aa(a)},
j2:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.l(0,a[y],a[x])}return b},
jf:function(a,b,c,d,e,f,g){switch(c){case 0:return H.b3(b,new H.jg(a))
case 1:return H.b3(b,new H.jh(a,d))
case 2:return H.b3(b,new H.ji(a,d,e))
case 3:return H.b3(b,new H.jj(a,d,e,f))
case 4:return H.b3(b,new H.jk(a,d,e,f,g))}throw H.e(P.bh("Unsupported number of arguments for wrapped closure"))},
aK:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.jf)
a.$identity=z
return z},
eY:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.p(c).$isj){z.$reflectionInfo=c
x=H.hu(z).r}else x=c
w=d?Object.create(new H.hD().constructor.prototype):Object.create(new H.bK(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.U
$.U=u+1
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.cM(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.j5,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.cK:H.bL
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.e("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.cM(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
eV:function(a,b,c,d){var z=H.bL
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
cM:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.eX(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.eV(y,!w,z,b)
if(y===0){w=$.U
$.U=w+1
u="self"+H.d(w)
w="return function(){var "+u+" = this."
v=$.av
if(v==null){v=H.b7("self")
$.av=v}return new Function(w+H.d(v)+";return "+u+"."+H.d(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.U
$.U=w+1
t+=H.d(w)
w="return function("+t+"){return this."
v=$.av
if(v==null){v=H.b7("self")
$.av=v}return new Function(w+H.d(v)+"."+H.d(z)+"("+t+");}")()},
eW:function(a,b,c,d){var z,y
z=H.bL
y=H.cK
switch(b?-1:a){case 0:throw H.e(new H.hv("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
eX:function(a,b){var z,y,x,w,v,u,t,s
z=H.eQ()
y=$.cJ
if(y==null){y=H.b7("receiver")
$.cJ=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.eW(w,!u,x,b)
if(w===1){y="return function(){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+");"
u=$.U
$.U=u+1
return new Function(y+H.d(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+", "+s+");"
u=$.U
$.U=u+1
return new Function(y+H.d(u)+"}")()},
ct:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.p(c).$isj){c.fixed$length=Array
z=c}else z=c
return H.eY(a,b,z,!!d,e,f)},
jp:function(a,b){var z=J.A(b)
throw H.e(H.eU(H.c9(a),z.cb(b,3,z.gt(b))))},
z:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.p(a)[b]
else z=!0
if(z)return a
H.jp(a,b)},
j0:function(a){var z=J.p(a)
return"$S" in z?z.$S():null},
bz:function(a,b){var z
if(a==null)return!1
z=H.j0(a)
return z==null?!1:H.es(z,b)},
js:function(a){throw H.e(new P.f4(a))},
bE:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
er:function(a){return init.getIsolateTag(a)},
f:function(a,b){a.$ti=b
return a},
cv:function(a){if(a==null)return
return a.$ti},
j4:function(a,b){return H.ez(a["$as"+H.d(b)],H.cv(a))},
ab:function(a,b,c){var z=H.j4(a,b)
return z==null?null:z[c]},
ac:function(a,b){var z=H.cv(a)
return z==null?null:z[b]},
as:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.eu(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.d(a)
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.as(z,b)
return H.iK(a,b)}return"unknown-reified-type"},
iK:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.as(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.as(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.as(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.j1(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.as(r[p],b)+(" "+H.d(p))}w+="}"}return"("+w+") => "+z},
eu:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.cd("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.J=v+", "
u=a[y]
if(u!=null)w=!1
v=z.J+=H.as(u,c)}return w?"":"<"+z.k(0)+">"},
ez:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
iT:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.J(a[y],b[y]))return!1
return!0},
J:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="ha")return!0
if('func' in b)return H.es(a,b)
if('func' in a)return b.builtin$cls==="jZ"||b.builtin$cls==="c"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.as(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+v]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.iT(H.ez(u,z),x)},
em:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.J(z,v)||H.J(v,z)))return!1}return!0},
iS:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.J(v,u)||H.J(u,v)))return!1}return!0},
es:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.J(z,y)||H.J(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.em(x,w,!1))return!1
if(!H.em(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.J(o,n)||H.J(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.J(o,n)||H.J(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.J(o,n)||H.J(n,o)))return!1}}return H.iS(a.named,b.named)},
kS:function(a){var z=$.cw
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
kQ:function(a){return H.aa(a)},
kP:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
jl:function(a){var z,y,x,w,v,u
z=$.cw.$1(a)
y=$.by[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bC[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.el.$2(a,z)
if(z!=null){y=$.by[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bC[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.cy(x)
$.by[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bC[z]=x
return x}if(v==="-"){u=H.cy(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.ev(a,x)
if(v==="*")throw H.e(new P.e2(z))
if(init.leafTags[z]===true){u=H.cy(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.ev(a,x)},
ev:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bD(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
cy:function(a){return J.bD(a,!1,null,!!a.$isL)},
jm:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bD(z,!1,null,!!z.$isL)
else return J.bD(z,c,null,null)},
jd:function(){if(!0===$.cx)return
$.cx=!0
H.je()},
je:function(){var z,y,x,w,v,u,t,s
$.by=Object.create(null)
$.bC=Object.create(null)
H.j9()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.ew.$1(v)
if(u!=null){t=H.jm(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
j9:function(){var z,y,x,w,v,u,t
z=C.R()
z=H.aq(C.O,H.aq(C.T,H.aq(C.G,H.aq(C.G,H.aq(C.S,H.aq(C.P,H.aq(C.Q(C.H),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.cw=new H.ja(v)
$.el=new H.jb(u)
$.ew=new H.jc(t)},
aq:function(a,b){return a(b)||b},
ht:{"^":"c;a,b,c,d,e,f,r,x",q:{
hu:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.ht(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
hq:{"^":"k:0;a",
$0:function(){return C.a.am(1000*this.a.now())}},
hS:{"^":"c;a,b,c,d,e,f",
a4:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
q:{
a_:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.hS(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
bu:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
dY:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
dp:{"^":"C;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.d(this.a)
return"NullError: method not found: '"+z+"' on null"}},
fO:{"^":"C;a,b,c",
k:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.d(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.d(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.d(this.a)+")"},
q:{
bY:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.fO(a,y,z?null:b.receiver)}}},
hT:{"^":"C;a",
k:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
jt:{"^":"k:1;a",
$1:function(a){if(!!J.p(a).$isC)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
ef:{"^":"c;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
jg:{"^":"k:0;a",
$0:function(){return this.a.$0()}},
jh:{"^":"k:0;a,b",
$0:function(){return this.a.$1(this.b)}},
ji:{"^":"k:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
jj:{"^":"k:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
jk:{"^":"k:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
k:{"^":"c;",
k:function(a){return"Closure '"+H.c9(this).trim()+"'"},
gd5:function(){return this},
gd5:function(){return this}},
dD:{"^":"k;"},
hD:{"^":"dD;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bK:{"^":"dD;a,b,c,d",
L:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bK))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gI:function(a){var z,y
z=this.c
if(z==null)y=H.aa(this.a)
else y=typeof z!=="object"?J.at(z):H.aa(z)
return(y^H.aa(this.b))>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.d(this.d)+"' of "+H.bp(z)},
q:{
bL:function(a){return a.a},
cK:function(a){return a.c},
eQ:function(){var z=$.av
if(z==null){z=H.b7("self")
$.av=z}return z},
b7:function(a){var z,y,x,w,v
z=new H.bK("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
eT:{"^":"C;a",
k:function(a){return this.a},
q:{
eU:function(a,b){return new H.eT("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
hv:{"^":"C;a",
k:function(a){return"RuntimeError: "+H.d(this.a)}},
ai:{"^":"c;a,b,c,d,e,f,r,$ti",
gt:function(a){return this.a},
gaW:function(a){return this.a===0},
gaH:function(){return new H.fQ(this,[H.ac(this,0)])},
gd4:function(a){return H.c1(this.gaH(),new H.fN(this),H.ac(this,0),H.ac(this,1))},
aM:function(a){var z
if((a&0x3ffffff)===a){z=this.c
if(z==null)return!1
return this.em(z,a)}else return this.fn(a)},
fn:function(a){var z=this.d
if(z==null)return!1
return this.aV(this.b8(z,this.aU(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.aK(z,b)
return y==null?null:y.b}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.aK(x,b)
return y==null?null:y.b}else return this.fo(b)},
fo:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.b8(z,this.aU(a))
x=this.aV(y,a)
if(x<0)return
return y[x].b},
l:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.bw()
this.b=z}this.cd(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.bw()
this.c=y}this.cd(y,b,c)}else{x=this.d
if(x==null){x=this.bw()
this.d=x}w=this.aU(b)
v=this.b8(x,w)
if(v==null)this.bz(x,w,[this.bx(b,c)])
else{u=this.aV(v,b)
if(u>=0)v[u].b=c
else v.push(this.bx(b,c))}}},
aZ:function(a,b){if(typeof b==="string")return this.cw(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cw(this.c,b)
else return this.fp(b)},
fp:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.b8(z,this.aU(a))
x=this.aV(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.cD(w)
return w.b},
aE:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
cP:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.e(new P.V(this))
z=z.c}},
cd:function(a,b,c){var z=this.aK(a,b)
if(z==null)this.bz(a,b,this.bx(b,c))
else z.b=c},
cw:function(a,b){var z
if(a==null)return
z=this.aK(a,b)
if(z==null)return
this.cD(z)
this.cm(a,b)
return z.b},
bx:function(a,b){var z,y
z=new H.fP(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
cD:function(a){var z,y
z=a.d
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
aU:function(a){return J.at(a)&0x3ffffff},
aV:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a5(a[y].a,b))return y
return-1},
k:function(a){return P.fV(this)},
aK:function(a,b){return a[b]},
b8:function(a,b){return a[b]},
bz:function(a,b,c){a[b]=c},
cm:function(a,b){delete a[b]},
em:function(a,b){return this.aK(a,b)!=null},
bw:function(){var z=Object.create(null)
this.bz(z,"<non-identifier-key>",z)
this.cm(z,"<non-identifier-key>")
return z},
$isfy:1},
fN:{"^":"k:1;a",
$1:function(a){return this.a.h(0,a)}},
fP:{"^":"c;a,b,c,d"},
fQ:{"^":"i;a,$ti",
gt:function(a){return this.a.a},
gP:function(a){var z,y
z=this.a
y=new H.fR(z,z.r,null,null)
y.c=z.e
return y}},
fR:{"^":"c;a,b,c,d",
gG:function(){return this.d},
D:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.V(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
ja:{"^":"k:1;a",
$1:function(a){return this.a(a)}},
jb:{"^":"k:7;a",
$2:function(a,b){return this.a(a,b)}},
jc:{"^":"k:8;a",
$1:function(a){return this.a(a)}}}],["","",,H,{"^":"",
j1:function(a){var z=H.f(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
jo:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",
b:function(a){return a},
dh:{"^":"h;",$isdh:1,"%":"ArrayBuffer"},
c5:{"^":"h;",$isc5:1,"%":"DataView;ArrayBufferView;c3|di|dk|c4|dj|dl|a9"},
c3:{"^":"c5;",
gt:function(a){return a.length},
$isL:1,
$asL:I.G,
$isD:1,
$asD:I.G},
c4:{"^":"dk;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.t(H.y(a,b))
return a[b]},
l:function(a,b,c){if(b>>>0!==b||b>=a.length)H.t(H.y(a,b))
a[b]=c}},
di:{"^":"c3+aC;",$asL:I.G,$asD:I.G,
$asj:function(){return[P.a1]},
$asi:function(){return[P.a1]},
$isj:1,
$isi:1},
dk:{"^":"di+d1;",$asL:I.G,$asD:I.G,
$asj:function(){return[P.a1]},
$asi:function(){return[P.a1]}},
a9:{"^":"dl;",
l:function(a,b,c){if(b>>>0!==b||b>=a.length)H.t(H.y(a,b))
a[b]=c},
$isj:1,
$asj:function(){return[P.l]},
$isi:1,
$asi:function(){return[P.l]}},
dj:{"^":"c3+aC;",$asL:I.G,$asD:I.G,
$asj:function(){return[P.l]},
$asi:function(){return[P.l]},
$isj:1,
$isi:1},
dl:{"^":"dj+d1;",$asL:I.G,$asD:I.G,
$asj:function(){return[P.l]},
$asi:function(){return[P.l]}},
k9:{"^":"c4;",$isj:1,
$asj:function(){return[P.a1]},
$isi:1,
$asi:function(){return[P.a1]},
"%":"Float32Array"},
h6:{"^":"c4;",$isj:1,
$asj:function(){return[P.a1]},
$isi:1,
$asi:function(){return[P.a1]},
"%":"Float64Array"},
ka:{"^":"a9;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.t(H.y(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.l]},
$isi:1,
$asi:function(){return[P.l]},
"%":"Int16Array"},
kb:{"^":"a9;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.t(H.y(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.l]},
$isi:1,
$asi:function(){return[P.l]},
"%":"Int32Array"},
kc:{"^":"a9;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.t(H.y(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.l]},
$isi:1,
$asi:function(){return[P.l]},
"%":"Int8Array"},
kd:{"^":"a9;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.t(H.y(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.l]},
$isi:1,
$asi:function(){return[P.l]},
"%":"Uint16Array"},
ke:{"^":"a9;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.t(H.y(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.l]},
$isi:1,
$asi:function(){return[P.l]},
"%":"Uint32Array"},
kf:{"^":"a9;",
gt:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.t(H.y(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.l]},
$isi:1,
$asi:function(){return[P.l]},
"%":"CanvasPixelArray|Uint8ClampedArray"},
kg:{"^":"a9;",
gt:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.t(H.y(a,b))
return a[b]},
$isj:1,
$asj:function(){return[P.l]},
$isi:1,
$asi:function(){return[P.l]},
"%":";Uint8Array"}}],["","",,P,{"^":"",
i4:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.iU()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.aK(new P.i6(z),1)).observe(y,{childList:true})
return new P.i5(z,y,x)}else if(self.setImmediate!=null)return P.iV()
return P.iW()},
kC:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.aK(new P.i7(a),0))},"$1","iU",2,0,3],
kD:[function(a){++init.globalState.f.b
self.setImmediate(H.aK(new P.i8(a),0))},"$1","iV",2,0,3],
kE:[function(a){P.cf(C.E,a)},"$1","iW",2,0,3],
iN:function(){var z,y
for(;z=$.ap,z!=null;){$.aI=null
y=z.b
$.ap=y
if(y==null)$.aH=null
z.a.$0()}},
kO:[function(){$.cp=!0
try{P.iN()}finally{$.aI=null
$.cp=!1
if($.ap!=null)$.$get$ci().$1(P.en())}},"$0","en",0,0,2],
iQ:function(a){var z=new P.e7(a,null)
if($.ap==null){$.aH=z
$.ap=z
if(!$.cp)$.$get$ci().$1(P.en())}else{$.aH.b=z
$.aH=z}},
iR:function(a){var z,y,x
z=$.ap
if(z==null){P.iQ(a)
$.aI=$.aH
return}y=new P.e7(a,null)
x=$.aI
if(x==null){y.b=z
$.aI=y
$.ap=y}else{y.b=x.b
x.b=y
$.aI=y
if(y.b==null)$.aH=y}},
hQ:function(a,b){var z=$.I
if(z===C.j){z.toString
return P.cf(a,b)}return P.cf(a,z.eI(b,!0))},
dO:function(a,b){var z,y
z=$.I
if(z===C.j){z.toString
return P.dP(a,b)}y=z.cG(b,!0)
$.I.toString
return P.dP(a,y)},
cf:function(a,b){var z=C.b.ai(a.a,1000)
return H.hL(z<0?0:z,b)},
dP:function(a,b){var z=C.b.ai(a.a,1000)
return H.hM(z<0?0:z,b)},
ei:function(a,b,c,d,e){var z={}
z.a=d
P.iR(new P.iO(z,e))},
ej:function(a,b,c,d){var z,y
y=$.I
if(y===c)return d.$0()
$.I=c
z=y
try{y=d.$0()
return y}finally{$.I=z}},
iP:function(a,b,c,d,e){var z,y
y=$.I
if(y===c)return d.$1(e)
$.I=c
z=y
try{y=d.$1(e)
return y}finally{$.I=z}},
i6:{"^":"k:1;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
i5:{"^":"k:9;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
i7:{"^":"k:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
i8:{"^":"k:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
e7:{"^":"c;a,b"},
dM:{"^":"c;"},
iH:{"^":"c;"},
iO:{"^":"k:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.dq()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.e(z)
x=H.e(z)
x.stack=y.k(0)
throw x}},
iu:{"^":"iH;",
gaI:function(a){return},
fL:function(a){var z,y,x,w
try{if(C.j===$.I){x=a.$0()
return x}x=P.ej(null,null,this,a)
return x}catch(w){z=H.S(w)
y=H.b5(w)
return P.ei(null,null,this,z,y)}},
fM:function(a,b){var z,y,x,w
try{if(C.j===$.I){x=a.$1(b)
return x}x=P.iP(null,null,this,a,b)
return x}catch(w){z=H.S(w)
y=H.b5(w)
return P.ei(null,null,this,z,y)}},
eI:function(a,b){if(b)return new P.iv(this,a)
else return new P.iw(this,a)},
cG:function(a,b){return new P.ix(this,a)},
h:function(a,b){return},
fK:function(a){if($.I===C.j)return a.$0()
return P.ej(null,null,this,a)}},
iv:{"^":"k:0;a,b",
$0:function(){return this.a.fL(this.b)}},
iw:{"^":"k:0;a,b",
$0:function(){return this.a.fK(this.b)}},
ix:{"^":"k:1;a,b",
$1:function(a){return this.a.fM(this.b,a)}}}],["","",,P,{"^":"",
db:function(){return new H.ai(0,null,null,null,null,null,0,[null,null])},
aB:function(a){return H.j2(a,new H.ai(0,null,null,null,null,null,0,[null,null]))},
aP:function(a,b,c,d,e){return new P.ih(0,null,null,null,null,[d,e])},
fG:function(a,b,c){var z,y
if(P.cq(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$aJ()
y.push(a)
try{P.iL(a,z)}finally{y.pop()}y=P.dB(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bk:function(a,b,c){var z,y,x
if(P.cq(a))return b+"..."+c
z=new P.cd(b)
y=$.$get$aJ()
y.push(a)
try{x=z
x.J=P.dB(x.gJ(),a,", ")}finally{y.pop()}y=z
y.J=y.gJ()+c
y=z.gJ()
return y.charCodeAt(0)==0?y:y},
cq:function(a){var z,y
for(z=0;y=$.$get$aJ(),z<y.length;++z)if(a===y[z])return!0
return!1},
iL:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gP(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.D())return
w=H.d(z.gG())
b.push(w)
y+=w.length+2;++x}if(!z.D()){if(x<=5)return
v=b.pop()
u=b.pop()}else{t=z.gG();++x
if(!z.D()){if(x<=4){b.push(H.d(t))
return}v=H.d(t)
u=b.pop()
y+=v.length+2}else{s=z.gG();++x
for(;z.D();t=s,s=r){r=z.gG();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.d(t)
v=H.d(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
X:function(a,b,c,d){return new P.ik(0,null,null,null,null,null,0,[d])},
dc:function(a,b){var z,y,x
z=P.X(null,null,null,b)
for(y=a.length,x=0;x<a.length;a.length===y||(0,H.eA)(a),++x)z.F(0,a[x])
return z},
fV:function(a){var z,y,x
z={}
if(P.cq(a))return"{...}"
y=new P.cd("")
try{$.$get$aJ().push(a)
x=y
x.J=x.gJ()+"{"
z.a=!0
a.cP(0,new P.fW(z,y))
z=y
z.J=z.gJ()+"}"}finally{$.$get$aJ().pop()}z=y.gJ()
return z.charCodeAt(0)==0?z:z},
ih:{"^":"c;a,b,c,d,e,$ti",
gt:function(a){return this.a},
aM:function(a){var z
if((a&0x3ffffff)===a){z=this.c
return z==null?!1:z[a]!=null}else return this.el(a)},
el:function(a){var z=this.d
if(z==null)return!1
return this.ah(z[this.ag(a)],a)>=0},
h:function(a,b){var z,y,x,w
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)y=null
else{x=z[b]
y=x===z?null:x}return y}else if(typeof b==="number"&&(b&0x3ffffff)===b){w=this.c
if(w==null)y=null
else{x=w[b]
y=x===w?null:x}return y}else return this.eq(b)},
eq:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.ag(a)]
x=this.ah(y,a)
return x<0?null:y[x+1]},
l:function(a,b,c){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.cj()
this.b=z}this.cj(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.cj()
this.c=y}this.cj(y,b,c)}else this.ez(b,c)},
ez:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=P.cj()
this.d=z}y=this.ag(a)
x=z[y]
if(x==null){P.ck(z,y,[a,b]);++this.a
this.e=null}else{w=this.ah(x,a)
if(w>=0)x[w+1]=b
else{x.push(a,b);++this.a
this.e=null}}},
cP:function(a,b){var z,y,x,w
z=this.ej()
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.h(0,w))
if(z!==this.e)throw H.e(new P.V(this))}},
ej:function(){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.e
if(z!=null)return z
y=new Array(this.a)
y.fixed$length=Array
x=this.b
if(x!=null){w=Object.getOwnPropertyNames(x)
v=w.length
for(u=0,t=0;t<v;++t){y[u]=w[t];++u}}else u=0
s=this.c
if(s!=null){w=Object.getOwnPropertyNames(s)
v=w.length
for(t=0;t<v;++t){y[u]=+w[t];++u}}r=this.d
if(r!=null){w=Object.getOwnPropertyNames(r)
v=w.length
for(t=0;t<v;++t){q=r[w[t]]
p=q.length
for(o=0;o<p;o+=2){y[u]=q[o];++u}}}this.e=y
return y},
cj:function(a,b,c){if(a[b]==null){++this.a
this.e=null}P.ck(a,b,c)},
ag:function(a){return J.at(a)&0x3ffffff},
ah:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;y+=2)if(J.a5(a[y],b))return y
return-1},
q:{
ck:function(a,b,c){if(c==null)a[b]=a
else a[b]=c},
cj:function(){var z=Object.create(null)
P.ck(z,"<non-identifier-key>",z)
delete z["<non-identifier-key>"]
return z}}},
ee:{"^":"ai;a,b,c,d,e,f,r,$ti",
aU:function(a){return H.jn(a)&0x3ffffff},
aV:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].a
if(x==null?b==null:x===b)return y}return-1},
q:{
aG:function(a,b){return new P.ee(0,null,null,null,null,null,0,[a,b])}}},
ik:{"^":"ii;a,b,c,d,e,f,r,$ti",
gP:function(a){var z=new P.ed(this,this.r,null,null)
z.c=this.e
return z},
gt:function(a){return this.a},
R:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.ek(b)},
ek:function(a){var z=this.d
if(z==null)return!1
return this.ah(z[this.ag(a)],a)>=0},
cV:function(a){var z=typeof a==="number"&&(a&0x3ffffff)===a
if(z)return this.R(0,a)?a:null
else return this.eu(a)},
eu:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.ag(a)]
x=this.ah(y,a)
if(x<0)return
return J.cB(y,x).geo()},
F:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.ci(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.ci(x,b)}else return this.af(b)},
af:function(a){var z,y,x
z=this.d
if(z==null){z=P.im()
this.d=z}y=this.ag(a)
x=z[y]
if(x==null)z[y]=[this.bs(a)]
else{if(this.ah(x,a)>=0)return!1
x.push(this.bs(a))}return!0},
aZ:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.ck(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.ck(this.c,b)
else return this.ev(b)},
ev:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.ag(a)]
x=this.ah(y,a)
if(x<0)return!1
this.cl(y.splice(x,1)[0])
return!0},
aE:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
ci:function(a,b){if(a[b]!=null)return!1
a[b]=this.bs(b)
return!0},
ck:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.cl(z)
delete a[b]
return!0},
bs:function(a){var z,y
z=new P.il(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
cl:function(a){var z,y
z=a.c
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
ag:function(a){return J.at(a)&0x3ffffff},
ah:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a5(a[y].a,b))return y
return-1},
$isi:1,
$asi:null,
q:{
im:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
il:{"^":"c;eo:a<,b,c"},
ed:{"^":"c;a,b,c,d",
gG:function(){return this.d},
D:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.V(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
ii:{"^":"hx;$ti"},
dd:{"^":"hb;$ti"},
hb:{"^":"c+aC;",$asj:null,$asi:null,$isj:1,$isi:1},
aC:{"^":"c;$ti",
gP:function(a){return new H.de(a,this.gt(a),0,null)},
a_:function(a,b){return this.h(a,b)},
cW:function(a,b){return new H.c2(a,b,[H.ab(a,"aC",0),null])},
ff:function(a,b,c){var z,y,x
z=this.gt(a)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.h(a,x))
if(z!==this.gt(a))throw H.e(new P.V(a))}return y},
k:function(a){return P.bk(a,"[","]")},
$isj:1,
$asj:null,
$isi:1,
$asi:null},
fW:{"^":"k:10;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.J+=", "
z.a=!1
z=this.b
y=z.J+=H.d(a)
z.J=y+": "
z.J+=H.d(b)}},
fS:{"^":"aV;a,b,c,d,$ti",
gP:function(a){return new P.io(this,this.c,this.d,this.b,null)},
gaW:function(a){return this.b===this.c},
gt:function(a){return(this.c-this.b&this.a.length-1)>>>0},
a_:function(a,b){var z,y
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.t(P.aA(b,this,"index",null,z))
y=this.a
return y[(this.b+b&y.length-1)>>>0]},
aE:function(a){var z,y,x,w
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length-1;z!==y;z=(z+1&w)>>>0)x[z]=null
this.c=0
this.b=0;++this.d}},
k:function(a){return P.bk(this,"{","}")},
d_:function(){var z,y,x
z=this.b
if(z===this.c)throw H.e(H.bV());++this.d
y=this.a
x=y[z]
y[z]=null
this.b=(z+1&y.length-1)>>>0
return x},
af:function(a){var z,y
z=this.a
y=this.c
z[y]=a
z=(y+1&z.length-1)>>>0
this.c=z
if(this.b===z)this.cs();++this.d},
cs:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.f(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.d.W(y,0,w,z,x)
C.d.W(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
e4:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.f(z,[b])},
$asi:null,
q:{
bZ:function(a,b){var z=new P.fS(null,0,0,0,[b])
z.e4(a,b)
return z}}},
io:{"^":"c;a,b,c,d,e",
gG:function(){return this.e},
D:function(){var z,y
z=this.a
if(this.c!==z.d)H.t(new P.V(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
this.e=z[y]
this.d=(y+1&z.length-1)>>>0
return!0}},
hy:{"^":"c;$ti",
aj:function(a,b){var z
for(z=J.aL(b);z.D();)this.F(0,z.gG())},
k:function(a){return P.bk(this,"{","}")},
$isi:1,
$asi:null},
hx:{"^":"hy;$ti"}}],["","",,P,{"^":"",
jA:[function(a,b){return J.eE(a,b)},"$2","j_",4,0,15],
d_:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.a2(a)
if(typeof a==="string")return JSON.stringify(a)
return P.fo(a)},
fo:function(a){var z=J.p(a)
if(!!z.$isk)return z.k(a)
return H.bp(a)},
bh:function(a){return new P.ig(a)},
aj:function(a,b,c,d){var z,y,x
z=J.fJ(a,d)
if(a!==0&&!0)for(y=z.length,x=0;x<y;++x)z[x]=b
return z},
c_:function(a,b,c){var z,y
z=H.f([],[c])
for(y=J.aL(a);y.D();)z.push(y.gG())
return z},
cz:function(a){H.jo(H.d(a))},
cr:{"^":"c;"},
"+bool":0,
u:{"^":"c;"},
a1:{"^":"P;",$isu:1,
$asu:function(){return[P.P]}},
"+double":0,
ax:{"^":"c;a",
p:function(a,b){return new P.ax(C.b.p(this.a,b.gcn()))},
C:function(a,b){return C.b.C(this.a,b.gcn())},
a0:function(a,b){return C.b.a0(this.a,b.gcn())},
L:function(a,b){if(b==null)return!1
if(!(b instanceof P.ax))return!1
return this.a===b.a},
gI:function(a){return this.a&0x1FFFFFFF},
aF:function(a,b){return C.b.aF(this.a,b.a)},
k:function(a){var z,y,x,w,v
z=new P.fh()
y=this.a
if(y<0)return"-"+new P.ax(0-y).k(0)
x=z.$1(C.b.ai(y,6e7)%60)
w=z.$1(C.b.ai(y,1e6)%60)
v=new P.fg().$1(y%1e6)
return""+C.b.ai(y,36e8)+":"+H.d(x)+":"+H.d(w)+"."+H.d(v)},
$isu:1,
$asu:function(){return[P.ax]},
q:{
cW:function(a,b,c,d,e,f){return new P.ax(864e8*a+36e8*b+6e7*e+1e6*f+1000*d+c)}}},
fg:{"^":"k:4;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
fh:{"^":"k:4;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
C:{"^":"c;"},
dq:{"^":"C;",
k:function(a){return"Throw of null."}},
a7:{"^":"C;a,b,c,d",
gbv:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gbu:function(){return""},
k:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.d(z)
w=this.gbv()+y+x
if(!this.a)return w
v=this.gbu()
u=P.d_(this.b)
return w+v+": "+H.d(u)},
q:{
cG:function(a){return new P.a7(!1,null,null,a)},
cH:function(a,b,c){return new P.a7(!0,a,b,c)}}},
du:{"^":"a7;e,f,a,b,c,d",
gbv:function(){return"RangeError"},
gbu:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.d(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.d(z)
else if(x>z)y=": Not in range "+H.d(z)+".."+H.d(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.d(z)}return y},
q:{
bq:function(a,b,c){return new P.du(null,null,!0,a,b,"Value not in range")},
Z:function(a,b,c,d,e){return new P.du(b,c,!0,a,d,"Invalid value")},
ca:function(a,b,c,d,e,f){if(0>a||a>c)throw H.e(P.Z(a,0,c,"start",f))
if(a>b||b>c)throw H.e(P.Z(b,a,c,"end",f))
return b}}},
ft:{"^":"a7;e,t:f>,a,b,c,d",
gbv:function(){return"RangeError"},
gbu:function(){if(J.cA(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.d(z)},
q:{
aA:function(a,b,c,d,e){var z=e!=null?e:J.ad(b)
return new P.ft(b,z,!0,a,c,"Index out of range")}}},
H:{"^":"C;a",
k:function(a){return"Unsupported operation: "+this.a}},
e2:{"^":"C;a",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"}},
b_:{"^":"C;a",
k:function(a){return"Bad state: "+this.a}},
V:{"^":"C;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.d(P.d_(z))+"."}},
dA:{"^":"c;",
k:function(a){return"Stack Overflow"},
$isC:1},
f4:{"^":"C;a",
k:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+z+"' during its initialization"}},
ig:{"^":"c;a",
k:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.d(z)}},
fp:{"^":"c;a,cv",
k:function(a){return"Expando:"+H.d(this.a)},
h:function(a,b){var z,y
z=this.cv
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.t(P.cH(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.c8(b,"expando$values")
return y==null?null:H.c8(y,z)},
l:function(a,b,c){var z,y
z=this.cv
if(typeof z!=="string")z.set(b,c)
else{y=H.c8(b,"expando$values")
if(y==null){y=new P.c()
H.dt(b,"expando$values",y)}H.dt(y,z,c)}}},
l:{"^":"P;",$isu:1,
$asu:function(){return[P.P]}},
"+int":0,
W:{"^":"c;$ti",
bX:["dR",function(a,b){return new H.e6(this,b,[H.ab(this,"W",0)])}],
gt:function(a){var z,y
z=this.gP(this)
for(y=0;z.D();)++y
return y},
gaz:function(a){var z,y
z=this.gP(this)
if(!z.D())throw H.e(H.bV())
y=z.gG()
if(z.D())throw H.e(H.fI())
return y},
a_:function(a,b){var z,y,x
if(b<0)H.t(P.Z(b,0,null,"index",null))
for(z=this.gP(this),y=0;z.D();){x=z.gG()
if(b===y)return x;++y}throw H.e(P.aA(b,this,"index",null,y))},
k:function(a){return P.fG(this,"(",")")}},
d7:{"^":"c;"},
j:{"^":"c;$ti",$asj:null,$isi:1,$asi:null},
"+List":0,
ha:{"^":"c;",
gI:function(a){return P.c.prototype.gI.call(this,this)},
k:function(a){return"null"}},
"+Null":0,
P:{"^":"c;",$isu:1,
$asu:function(){return[P.P]}},
"+num":0,
c:{"^":";",
L:function(a,b){return this===b},
gI:function(a){return H.aa(this)},
k:function(a){return H.bp(this)},
toString:function(){return this.k(this)}},
bt:{"^":"c;a,b",
b4:function(a){if(this.b!=null){this.a=this.a+($.r.$0()-this.b)
this.b=null}}},
w:{"^":"c;",$isu:1,
$asu:function(){return[P.w]}},
"+String":0,
cd:{"^":"c;J<",
gt:function(a){return this.J.length},
k:function(a){var z=this.J
return z.charCodeAt(0)==0?z:z},
q:{
dB:function(a,b,c){var z=J.aL(b)
if(!z.D())return a
if(c.length===0){do a+=H.d(z.gG())
while(z.D())}else{a+=H.d(z.gG())
for(;z.D();)a=a+c+H.d(z.gG())}return a}}}}],["","",,W,{"^":"",
fn:function(a,b,c){var z,y
z=document.body
y=(z&&C.C).a2(z,a,b,c)
y.toString
z=new H.e6(new W.R(y),new W.iZ(),[W.o])
return z.gaz(z)},
az:function(a){var z,y,x
z="element tag unavailable"
try{y=J.eI(a)
if(typeof y==="string")z=a.tagName}catch(x){H.S(x)}return z},
ic:function(a,b){return document.createElement(a)},
iJ:function(a){if(a==null)return
return W.e9(a)},
ek:function(a){var z=$.I
if(z===C.j)return a
return z.cG(a,!0)},
v:{"^":"ag;","%":"HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSlotElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableHeaderCellElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement;HTMLElement"},
jw:{"^":"v;",
k:function(a){return String(a)},
$ish:1,
"%":"HTMLAnchorElement"},
jy:{"^":"v;",
k:function(a){return String(a)},
$ish:1,
"%":"HTMLAreaElement"},
bI:{"^":"v;",$isbI:1,$ish:1,"%":"HTMLBodyElement"},
cL:{"^":"v;a9:height}",$iscL:1,"%":"HTMLCanvasElement"},
jz:{"^":"o;t:length=",$ish:1,"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
jB:{"^":"o;",$ish:1,"%":"DocumentFragment|ShadowRoot"},
jC:{"^":"h;",
k:function(a){return String(a)},
"%":"DOMException"},
ag:{"^":"o;fO:tagName=",
geH:function(a){return new W.ib(a)},
k:function(a){return a.localName},
a2:["br",function(a,b,c,d){var z,y,x,w,v
if(c==null){z=$.cZ
if(z==null){z=H.f([],[W.dm])
y=new W.dn(z)
z.push(W.eb(null))
z.push(W.eg())
$.cZ=y
d=y}else d=z
z=$.cY
if(z==null){z=new W.eh(d)
$.cY=z
c=z}else{z.a=d
c=z}}if($.a3==null){z=document
y=z.implementation.createHTMLDocument("")
$.a3=y
$.bS=y.createRange()
y=$.a3
y.toString
x=y.createElement("base")
x.href=z.baseURI
$.a3.head.appendChild(x)}z=$.a3
if(z.body==null){z.toString
y=z.createElement("body")
z.body=y}z=$.a3
if(!!this.$isbI)w=z.body
else{y=a.tagName
z.toString
w=z.createElement(y)
$.a3.body.appendChild(w)}if("createContextualFragment" in window.Range.prototype&&!C.d.R(C.a0,a.tagName)){$.bS.selectNodeContents(w)
v=$.bS.createContextualFragment(b)}else{w.innerHTML=b
v=$.a3.createDocumentFragment()
for(;z=w.firstChild,z!=null;)v.appendChild(z)}z=$.a3.body
if(w==null?z!=null:w!==z)J.eK(w)
c.c5(v)
document.adoptNode(v)
return v},function(a,b,c){return this.a2(a,b,c,null)},"eT",null,null,"ghe",2,5,null,0,0],
scT:function(a,b){this.bo(a,b)},
bp:function(a,b,c,d){a.textContent=null
a.appendChild(this.a2(a,b,c,d))},
bo:function(a,b){return this.bp(a,b,null,null)},
$isag:1,
$iso:1,
$isc:1,
$ish:1,
"%":";Element"},
iZ:{"^":"k:1;",
$1:function(a){return!!J.p(a).$isag}},
jD:{"^":"v;a9:height}","%":"HTMLEmbedElement"},
bT:{"^":"h;","%":"MediaStream;EventTarget"},
jY:{"^":"v;t:length=","%":"HTMLFormElement"},
k_:{"^":"v;a9:height}","%":"HTMLIFrameElement"},
k0:{"^":"v;a9:height}","%":"HTMLImageElement"},
k2:{"^":"v;a9:height}",$isag:1,$ish:1,"%":"HTMLInputElement"},
k5:{"^":"h;",
k:function(a){return String(a)},
"%":"Location"},
fY:{"^":"v;","%":"HTMLAudioElement;HTMLMediaElement"},
k8:{"^":"fZ;",
h5:function(a,b,c){return a.send(b,c)},
ad:function(a,b){return a.send(b)},
"%":"MIDIOutput"},
fZ:{"^":"bT;","%":"MIDIInput;MIDIPort"},
kh:{"^":"h;",$ish:1,"%":"Navigator"},
R:{"^":"dd;a",
gaz:function(a){var z,y
z=this.a
y=z.childNodes.length
if(y===0)throw H.e(new P.b_("No elements"))
if(y>1)throw H.e(new P.b_("More than one element"))
return z.firstChild},
aj:function(a,b){var z,y,x,w
z=b.a
y=this.a
if(z!==y)for(x=z.childNodes.length,w=0;w<x;++w)y.appendChild(z.firstChild)
return},
l:function(a,b,c){var z=this.a
z.replaceChild(c,z.childNodes[b])},
gP:function(a){var z=this.a.childNodes
return new W.d2(z,z.length,-1,null)},
gt:function(a){return this.a.childNodes.length},
h:function(a,b){return this.a.childNodes[b]},
$asdd:function(){return[W.o]},
$asj:function(){return[W.o]},
$asi:function(){return[W.o]}},
o:{"^":"bT;aI:parentElement=,fA:previousSibling=",
fG:function(a){var z=a.parentNode
if(z!=null)z.removeChild(a)},
k:function(a){var z=a.nodeValue
return z==null?this.dQ(a):z},
$iso:1,
$isc:1,
"%":"Attr|Document|HTMLDocument|XMLDocument;Node"},
ki:{"^":"fw;",
gt:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.e(P.aA(b,a,null,null,null))
return a[b]},
l:function(a,b,c){throw H.e(new P.H("Cannot assign element of immutable List."))},
a_:function(a,b){return a[b]},
$isj:1,
$asj:function(){return[W.o]},
$isi:1,
$asi:function(){return[W.o]},
$isL:1,
$asL:function(){return[W.o]},
$isD:1,
$asD:function(){return[W.o]},
"%":"NodeList|RadioNodeList"},
fu:{"^":"h+aC;",
$asj:function(){return[W.o]},
$asi:function(){return[W.o]},
$isj:1,
$isi:1},
fw:{"^":"fu+d3;",
$asj:function(){return[W.o]},
$asi:function(){return[W.o]},
$isj:1,
$isi:1},
kj:{"^":"v;a9:height}","%":"HTMLObjectElement"},
ks:{"^":"v;t:length=","%":"HTMLSelectElement"},
hH:{"^":"v;",
a2:function(a,b,c,d){var z,y
if("createContextualFragment" in window.Range.prototype)return this.br(a,b,c,d)
z=W.fn("<table>"+b+"</table>",c,d)
y=document.createDocumentFragment()
y.toString
z.toString
new W.R(y).aj(0,new W.R(z))
return y},
"%":"HTMLTableElement"},
kv:{"^":"v;",
a2:function(a,b,c,d){var z,y,x,w
if("createContextualFragment" in window.Range.prototype)return this.br(a,b,c,d)
z=document
y=z.createDocumentFragment()
z=C.L.a2(z.createElement("table"),b,c,d)
z.toString
z=new W.R(z)
x=z.gaz(z)
x.toString
z=new W.R(x)
w=z.gaz(z)
y.toString
w.toString
new W.R(y).aj(0,new W.R(w))
return y},
"%":"HTMLTableRowElement"},
kw:{"^":"v;",
a2:function(a,b,c,d){var z,y,x
if("createContextualFragment" in window.Range.prototype)return this.br(a,b,c,d)
z=document
y=z.createDocumentFragment()
z=C.L.a2(z.createElement("table"),b,c,d)
z.toString
z=new W.R(z)
x=z.gaz(z)
y.toString
x.toString
new W.R(y).aj(0,new W.R(x))
return y},
"%":"HTMLTableSectionElement"},
dE:{"^":"v;",
bp:function(a,b,c,d){var z
a.textContent=null
z=this.a2(a,b,c,d)
a.content.appendChild(z)},
bo:function(a,b){return this.bp(a,b,null,null)},
$isdE:1,
"%":"HTMLTemplateElement"},
kA:{"^":"fY;a9:height}","%":"HTMLVideoElement"},
hY:{"^":"bT;",
cz:function(a,b){return a.requestAnimationFrame(H.aK(b,1))},
co:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
gaI:function(a){return W.iJ(a.parent)},
$ish:1,
"%":"DOMWindow|Window"},
kF:{"^":"o;",$ish:1,"%":"DocumentType"},
kH:{"^":"v;",$ish:1,"%":"HTMLFrameSetElement"},
kK:{"^":"fx;",
gt:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.e(P.aA(b,a,null,null,null))
return a[b]},
l:function(a,b,c){throw H.e(new P.H("Cannot assign element of immutable List."))},
a_:function(a,b){return a[b]},
$isj:1,
$asj:function(){return[W.o]},
$isi:1,
$asi:function(){return[W.o]},
$isL:1,
$asL:function(){return[W.o]},
$isD:1,
$asD:function(){return[W.o]},
"%":"MozNamedAttrMap|NamedNodeMap"},
fv:{"^":"h+aC;",
$asj:function(){return[W.o]},
$asi:function(){return[W.o]},
$isj:1,
$isi:1},
fx:{"^":"fv+d3;",
$asj:function(){return[W.o]},
$asi:function(){return[W.o]},
$isj:1,
$isi:1},
i9:{"^":"c;er:a<",
gaH:function(){var z,y,x,w,v
z=this.a.attributes
y=H.f([],[P.w])
for(x=z.length,w=0;w<x;++w){v=z[w]
if(v.namespaceURI==null)y.push(v.name)}return y}},
ib:{"^":"i9;a",
h:function(a,b){return this.a.getAttribute(b)},
l:function(a,b,c){this.a.setAttribute(b,c)},
gt:function(a){return this.gaH().length}},
cl:{"^":"c;a",
aD:function(a){return $.$get$ec().R(0,W.az(a))},
at:function(a,b,c){var z,y,x
z=W.az(a)
y=$.$get$cm()
x=y.h(0,H.d(z)+"::"+b)
if(x==null)x=y.h(0,"*::"+b)
if(x==null)return!1
return x.$4(a,b,c,this)},
ed:function(a){var z,y
z=$.$get$cm()
if(z.gaW(z)){for(y=0;y<262;++y)z.l(0,C.a_[y],W.j7())
for(y=0;y<12;++y)z.l(0,C.w[y],W.j8())}},
q:{
eb:function(a){var z,y
z=document.createElement("a")
y=new W.iy(z,window.location)
y=new W.cl(y)
y.ed(a)
return y},
kI:[function(a,b,c,d){return!0},"$4","j7",8,0,6],
kJ:[function(a,b,c,d){var z,y,x,w,v
z=d.a
y=z.a
y.href=c
x=y.hostname
z=z.b
w=z.hostname
if(x==null?w==null:x===w){w=y.port
v=z.port
if(w==null?v==null:w===v){w=y.protocol
z=z.protocol
z=w==null?z==null:w===z}else z=!1}else z=!1
if(!z)if(x==="")if(y.port===""){z=y.protocol
z=z===":"||z===""}else z=!1
else z=!1
else z=!0
return z},"$4","j8",8,0,6]}},
d3:{"^":"c;$ti",
gP:function(a){return new W.d2(a,this.gt(a),-1,null)},
$isj:1,
$asj:null,
$isi:1,
$asi:null},
dn:{"^":"c;a",
aD:function(a){return C.d.cF(this.a,new W.h9(a))},
at:function(a,b,c){return C.d.cF(this.a,new W.h8(a,b,c))}},
h9:{"^":"k:1;a",
$1:function(a){return a.aD(this.a)}},
h8:{"^":"k:1;a,b,c",
$1:function(a){return a.at(this.a,this.b,this.c)}},
iz:{"^":"c;",
aD:function(a){return this.a.R(0,W.az(a))},
at:["dT",function(a,b,c){var z,y
z=W.az(a)
y=this.c
if(y.R(0,H.d(z)+"::"+b))return this.d.eG(c)
else if(y.R(0,"*::"+b))return this.d.eG(c)
else{y=this.b
if(y.R(0,H.d(z)+"::"+b))return!0
else if(y.R(0,"*::"+b))return!0
else if(y.R(0,H.d(z)+"::*"))return!0
else if(y.R(0,"*::*"))return!0}return!1}],
ee:function(a,b,c,d){var z,y,x
this.a.aj(0,c)
z=b.bX(0,new W.iA())
y=b.bX(0,new W.iB())
this.b.aj(0,z)
x=this.c
x.aj(0,C.a1)
x.aj(0,y)}},
iA:{"^":"k:1;",
$1:function(a){return!C.d.R(C.w,a)}},
iB:{"^":"k:1;",
$1:function(a){return C.d.R(C.w,a)}},
iE:{"^":"iz;e,a,b,c,d",
at:function(a,b,c){if(this.dT(a,b,c))return!0
if(b==="template"&&c==="")return!0
if(a.getAttribute("template")==="")return this.e.R(0,b)
return!1},
q:{
eg:function(){var z=P.w
z=new W.iE(P.dc(C.v,z),P.X(null,null,null,z),P.X(null,null,null,z),P.X(null,null,null,z),null)
z.ee(null,new H.c2(C.v,new W.iF(),[H.ac(C.v,0),null]),["TEMPLATE"],null)
return z}}},
iF:{"^":"k:1;",
$1:function(a){return"TEMPLATE::"+H.d(a)}},
iD:{"^":"c;",
aD:function(a){var z=J.p(a)
if(!!z.$isdw)return!1
z=!!z.$isn
if(z&&W.az(a)==="foreignObject")return!1
if(z)return!0
return!1},
at:function(a,b,c){if(b==="is"||C.u.dL(b,"on"))return!1
return this.aD(a)}},
d2:{"^":"c;a,b,c,d",
D:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.cB(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gG:function(){return this.d}},
ia:{"^":"c;a",
gaI:function(a){return W.e9(this.a.parent)},
$ish:1,
q:{
e9:function(a){if(a===window)return a
else return new W.ia(a)}}},
dm:{"^":"c;"},
iy:{"^":"c;a,b"},
eh:{"^":"c;a",
c5:function(a){new W.iG(this).$2(a,null)},
aL:function(a,b){var z
if(b==null){z=a.parentNode
if(z!=null)z.removeChild(a)}else b.removeChild(a)},
ey:function(a,b){var z,y,x,w,v,u,t,s
z=!0
y=null
x=null
try{y=J.eF(a)
x=y.ger().getAttribute("is")
w=function(c){if(!(c.attributes instanceof NamedNodeMap))return true
var r=c.childNodes
if(c.lastChild&&c.lastChild!==r[r.length-1])return true
if(c.children)if(!(c.children instanceof HTMLCollection||c.children instanceof NodeList))return true
var q=0
if(c.children)q=c.children.length
for(var p=0;p<q;p++){var o=c.children[p]
if(o.id=='attributes'||o.name=='attributes'||o.id=='lastChild'||o.name=='lastChild'||o.id=='children'||o.name=='children')return true}return false}(a)
z=w?!0:!(a.attributes instanceof NamedNodeMap)}catch(t){H.S(t)}v="element unprintable"
try{v=J.a2(a)}catch(t){H.S(t)}try{u=W.az(a)
this.ex(a,b,z,v,u,y,x)}catch(t){if(H.S(t) instanceof P.a7)throw t
else{this.aL(a,b)
window
s="Removing corrupted element "+H.d(v)
if(typeof console!="undefined")console.warn(s)}}},
ex:function(a,b,c,d,e,f,g){var z,y,x,w,v
if(c){this.aL(a,b)
window
z="Removing element due to corrupted attributes on <"+d+">"
if(typeof console!="undefined")console.warn(z)
return}if(!this.a.aD(a)){this.aL(a,b)
window
z="Removing disallowed element <"+H.d(e)+"> from "+J.a2(b)
if(typeof console!="undefined")console.warn(z)
return}if(g!=null)if(!this.a.at(a,"is",g)){this.aL(a,b)
window
z="Removing disallowed type extension <"+H.d(e)+' is="'+g+'">'
if(typeof console!="undefined")console.warn(z)
return}z=f.gaH()
y=H.f(z.slice(0),[H.ac(z,0)])
for(x=f.gaH().length-1,z=f.a;x>=0;--x){w=y[x]
if(!this.a.at(a,J.eM(w),z.getAttribute(w))){window
v="Removing disallowed attribute <"+H.d(e)+" "+w+'="'+H.d(z.getAttribute(w))+'">'
if(typeof console!="undefined")console.warn(v)
z.getAttribute(w)
z.removeAttribute(w)}}if(!!J.p(a).$isdE)this.c5(a.content)}},
iG:{"^":"k:11;a",
$2:function(a,b){var z,y,x,w
x=this.a
switch(a.nodeType){case 1:x.ey(a,b)
break
case 8:case 11:case 3:case 4:break
default:x.aL(a,b)}z=a.lastChild
for(;null!=z;){y=null
try{y=J.eH(z)}catch(w){H.S(w)
x=z
a.removeChild(x)
z=null
y=a.lastChild}if(z!=null)this.$2(z,a)
z=y}}}}],["","",,P,{"^":""}],["","",,P,{"^":"",jv:{"^":"ah;",$ish:1,"%":"SVGAElement"},jx:{"^":"n;",$ish:1,"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},jE:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEBlendElement"},jF:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEColorMatrixElement"},jG:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEComponentTransferElement"},jH:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFECompositeElement"},jI:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEConvolveMatrixElement"},jJ:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEDiffuseLightingElement"},jK:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEDisplacementMapElement"},jL:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEFloodElement"},jM:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEGaussianBlurElement"},jN:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEImageElement"},jO:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEMergeElement"},jP:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEMorphologyElement"},jQ:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEOffsetElement"},jR:{"^":"n;m:x=,n:y=","%":"SVGFEPointLightElement"},jS:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFESpecularLightingElement"},jT:{"^":"n;m:x=,n:y=","%":"SVGFESpotLightElement"},jU:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFETileElement"},jV:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFETurbulenceElement"},jW:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFilterElement"},jX:{"^":"ah;m:x=,n:y=","%":"SVGForeignObjectElement"},fs:{"^":"ah;","%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},ah:{"^":"n;",$ish:1,"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},k1:{"^":"ah;m:x=,n:y=",$ish:1,"%":"SVGImageElement"},k6:{"^":"n;",$ish:1,"%":"SVGMarkerElement"},k7:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGMaskElement"},kn:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGPatternElement"},ko:{"^":"h;t:length=","%":"SVGPointList"},kq:{"^":"h;a9:height},m:x=,n:y=","%":"SVGRect"},kr:{"^":"fs;m:x=,n:y=","%":"SVGRectElement"},dw:{"^":"n;",$isdw:1,$ish:1,"%":"SVGScriptElement"},n:{"^":"ag;",
scT:function(a,b){this.bo(a,b)},
a2:function(a,b,c,d){var z,y,x,w,v,u
z=H.f([],[W.dm])
z.push(W.eb(null))
z.push(W.eg())
z.push(new W.iD())
c=new W.eh(new W.dn(z))
y='<svg version="1.1">'+b+"</svg>"
z=document
x=z.body
w=(x&&C.C).eT(x,y,c)
v=z.createDocumentFragment()
w.toString
z=new W.R(w)
u=z.gaz(z)
for(;z=u.firstChild,z!=null;)v.appendChild(z)
return v},
$isn:1,
$ish:1,
"%":"SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGMetadataElement|SVGStopElement|SVGStyleElement|SVGTitleElement;SVGElement"},kt:{"^":"ah;m:x=,n:y=",$ish:1,"%":"SVGSVGElement"},ku:{"^":"n;",$ish:1,"%":"SVGSymbolElement"},dF:{"^":"ah;","%":";SVGTextContentElement"},kx:{"^":"dF;",$ish:1,"%":"SVGTextPathElement"},ky:{"^":"dF;m:x=,n:y=","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement"},kz:{"^":"ah;m:x=,n:y=",$ish:1,"%":"SVGUseElement"},kB:{"^":"n;",$ish:1,"%":"SVGViewElement"},kG:{"^":"n;",$ish:1,"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},kL:{"^":"n;",$ish:1,"%":"SVGCursorElement"},kM:{"^":"n;",$ish:1,"%":"SVGFEDropShadowElement"},kN:{"^":"n;",$ish:1,"%":"SVGMPathElement"}}],["","",,P,{"^":"",fr:{"^":"c;",$isj:1,
$asj:function(){return[P.a1]},
$isi:1,
$asi:function(){return[P.a1]}}}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,V,{"^":"",
hm:function(a){return a.gbP(a).C(0,0)},
f_:{"^":"c;",
c8:function(a,b){var z,y,x
z=a.y
y=b.y
x=z.c
if(x===y.c&&x!==0)return x>0
return(z.b&y.a)!==0&&(z.a&y.b)!==0}},
cN:{"^":"c;a,b,c"},
f5:{"^":"c;"},
a6:{"^":"c;a,b",
bY:function(a){var z,y,x
z=this.a.a
y=this.b.a
x=a.a
x[0]=(z[0]+y[0])*0.5
x[1]=(z[1]+y[1])*0.5},
O:function(a,b){var z,y,x,w
z=a.a.a
y=z[0]
x=b.a.a
w=x[0]
y=y<w?y:w
w=this.a.a
w[0]=y
z=z[1]
x=x[1]
w[1]=z<x?z:x
z=a.b.a
y=z[0]
x=b.b.a
w=x[0]
y=y>w?y:w
w=this.b.a
w[0]=y
z=z[1]
x=x[1]
w[1]=z>x?z:x},
k:function(a){return"AABB["+this.a.k(0)+" . "+this.b.k(0)+"]"},
q:{
au:function(){return new V.a6(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))))},
eN:function(a,b){var z,y
z=b.a.a
y=a.b.a
if(z[0]-y[0]>0||z[1]-y[1]>0)return!1
z=a.a.a
y=b.b.a
if(z[0]-y[0]>0||z[1]-y[1]>0)return!1
return!0}}},
f6:{"^":"c;a,b,c,d,e,f,r,x,y",
fP:function(a,b){var z,y,x,w
z=this.a
y=z.b[a].gar()
x=z.b[b].gar()
z=x.a.a
w=y.b.a
if(z[0]-w[0]>0||z[1]-w[1]>0)return!1
z=y.a.a
w=x.b.a
if(z[0]-w[0]>0||z[1]-w[1]>0)return!1
return!0},
bW:function(a){var z,y,x,w,v,u,t,s,r
this.x=0
for(z=this.a,y=0;y<this.e;++y){x=this.c[y]
this.y=x
if(x===-1)continue
z.fD(0,this,z.b[x].gar())}this.e=0
F.ex(this.f,0,this.x)
for(y=0;y<this.x;){w=this.f[y]
x=w.a
v=z.b[x].gan()
x=w.b
a.eF(v,z.b[x].gan());++y
for(x=this.x,u=this.f;y<x;){t=u[y]
s=t.a
r=w.a
if(s==null?r==null:s===r){s=t.b
r=w.b
r=s==null?r!=null:s!==r
s=r}else s=!0
if(s)break;++y}}},
cH:function(a){var z,y,x
z=this.e
y=this.d
if(z===y){x=this.c
z=y*2
this.d=z
z=new Array(z)
z.fixed$length=Array
z=H.f(z,[P.l])
this.c=z
C.d.W(z,0,x.length,x,0)}z=this.c
y=this.e
z[y]=a
this.e=y+1},
d2:function(a){var z,y,x,w,v
if(a===this.y)return!0
z=this.x
y=this.r
if(z===y){x=this.f
z=y*2
this.r=z
z=new Array(z)
z.fixed$length=Array
z=H.f(z,[V.aX])
this.f=z
w=x.length
C.d.W(z,0,w,x,0)
for(z=this.r,y=this.f;w<z;++w)y[w]=new V.aX(0,0)}z=this.y
y=this.f
v=this.x
if(a<z){y[v].scY(a)
this.f[this.x].scZ(this.y)}else{y[v].scY(z)
this.f[this.x].scZ(a)}++this.x
return!0},
dZ:function(a){var z,y,x
z=new Array(this.r)
z.fixed$length=Array
z=H.f(z,[V.aX])
this.f=z
for(y=this.r,x=0;x<y;++x)z[x]=new V.aX(0,0)
this.c=P.aj(this.d,0,!1,P.l)},
q:{
f7:function(a){var z=new V.f6(a,0,null,16,0,null,16,0,-1)
z.dZ(a)
return z}}},
fi:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy",
fu:function(a,b,c){var z,y,x,w,v,u,t,s
z=this.b[a]
y=z.a
x=y.a.a
w=b.a.a
if(x[0]<=w[0])if(x[1]<=w[1]){v=b.b.a
u=y.b.a
v=v[0]<=u[0]&&v[1]<=u[1]}else v=!1
else v=!1
if(v)return!1
this.ew(z)
x[0]=w[0]-0.1
x[1]=w[1]-0.1
w=b.b.a
v=y.b.a
v[0]=w[0]+0.1
v[1]=w[1]+0.1
w=c.a
t=w[0]*2
s=w[1]*2
if(t<0)x[0]=x[0]+t
else v[0]=v[0]+t
if(s<0)x[1]=x[1]+s
else v[1]=v[1]+s
this.ct(a)
return!0},
fD:function(a,b,c){var z,y,x,w,v,u
this.x=0
z=this.r
this.x=1
z[0]=this.a
for(z=[V.aO];y=this.x,y>0;){x=this.r;--y
this.x=y
w=x[y]
if(w==null)continue
if(V.eN(w.a,c))if(w.d==null)b.d2(w.f)
else{y=this.r
x=y.length
if(x-this.x-2<=0){y=new Array(x*2)
y.fixed$length=Array
v=H.f(y,z)
y=this.r
C.d.W(v,0,y.length,y,0)
this.r=v
y=v}x=this.x
u=x+1
this.x=u
y[x]=w.d
this.x=u+1
y[u]=w.e}}},
bt:function(a){var z=a.d
if(z==null)return 0
return 1+Math.max(this.bt(z),this.bt(a.e))},
cf:function(){var z,y,x,w,v
z=this.e
if(z===-1){y=this.b
z=this.d*=2
z=new Array(z)
z.fixed$length=Array
z=H.f(z,[V.aO])
this.b=z
C.d.W(z,0,y.length,y,0)
for(x=this.d-1;z=this.c,x>=z;--x){z=this.b
w=new Float64Array(2)
z[x]=new V.aO(new V.a6(new E.a(w),new E.a(new Float64Array(2))),null,null,null,null,x,0)
z=this.b
w=z[x]
J.cE(w,x===this.d-1?null:z[x+1])
J.cD(this.b[x],-1)}this.e=z}v=this.b[z]
z=v.c
this.e=z!=null?z.f:-1
v.c=null
v.d=null
v.e=null
v.r=0
v.b=null;++this.c
return v},
cq:function(a){var z=this.e
a.c=z!==-1?this.b[z]:null
a.r=-1
this.e=a.f;--this.c},
ct:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=this.b[a]
y=this.a
if(y==null){this.a=z
z.c=null
return}x=z.a
for(w=this.ch,v=w.b.a,u=w.a.a;t=y.d,t!=null;){s=y.e
r=y.a
q=r.b.a
p=q[0]
o=r.a.a
n=o[0]
q=q[1]
o=o[1]
w.O(r,x)
r=2*(v[0]-u[0]+v[1]-u[1])
m=2*r
l=2*(r-2*(p-n+q-o))
if(t.d==null){w.O(x,t.a)
k=2*(v[0]-u[0]+v[1]-u[1])+l}else{r=t.a
w.O(x,r)
q=r.b.a
p=q[0]
r=r.a.a
o=r[0]
q=q[1]
r=r[1]
k=2*(v[0]-u[0]+v[1]-u[1])-2*(p-o+q-r)+l}if(s.d==null){w.O(x,s.a)
j=2*(v[0]-u[0]+v[1]-u[1])+l}else{r=s.a
w.O(x,r)
q=r.b.a
p=q[0]
r=r.a.a
o=r[0]
q=q[1]
r=r[1]
j=2*(v[0]-u[0]+v[1]-u[1])-2*(p-o+q-r)+l}if(m<k&&m<j)break
y=k<j?t:s}i=J.eG(this.b[y.f])
h=this.cf()
h.c=i
h.b=null
h.a.O(x,y.a)
h.r=y.r+1
if(i!=null){if(i.d===y)i.d=h
else i.e=h
h.d=y
h.e=z
y.c=h
z.c=h}else{h.d=y
h.e=z
y.c=h
z.c=h
this.a=h}for(y=h;y!=null;){y=this.cg(y)
g=y.d
s=y.e
y.r=1+Math.max(g.r,s.r)
y.a.O(g.a,s.a)
y=y.c}},
ew:function(a){var z,y,x,w,v,u,t
if(a===this.a){this.a=null
return}z=a.c
y=z.c
x=z.d
if(x===a)x=z.e
if(y!=null){w=y.d
if(w==null?z==null:w===z)y.d=x
else y.e=x
x.c=y
this.cq(z)
for(v=y;v!=null;){v=this.cg(v)
u=v.d
t=v.e
v.a.O(u.a,t.a)
v.r=1+Math.max(u.r,t.r)
v=v.c}}else{this.a=x
x.c=null
this.cq(z)}},
cg:function(a){var z,y,x,w,v,u,t,s
z=a.d
if(z==null||a.r<2)return a
y=a.e
x=y.r-z.r
if(x>1){w=y.d
v=y.e
y.d=a
y.c=a.c
a.c=y
u=y.c
if(u!=null)if(u.d===a)u.d=y
else u.e=y
else this.a=y
u=a.a
if(w.r>v.r){y.e=w
a.e=v
v.c=a
u.O(z.a,v.a)
y.a.O(u,w.a)
z=1+Math.max(z.r,v.r)
a.r=z
y.r=1+Math.max(z,w.r)}else{y.e=v
a.e=w
w.c=a
u.O(z.a,w.a)
y.a.O(u,v.a)
z=1+Math.max(z.r,w.r)
a.r=z
y.r=1+Math.max(z,v.r)}return y}if(x<-1){t=z.d
s=z.e
z.d=a
z.c=a.c
a.c=z
u=z.c
if(u!=null)if(u.d===a)u.d=z
else u.e=z
else this.a=z
u=a.a
if(t.r>s.r){z.e=t
a.d=s
s.c=a
u.O(y.a,s.a)
z.a.O(u,t.a)
u=1+Math.max(y.r,s.r)
a.r=u
z.r=1+Math.max(u,t.r)}else{z.e=s
a.d=t
t.c=a
u.O(y.a,t.a)
z.a.O(u,s.a)
u=1+Math.max(y.r,t.r)
a.r=u
z.r=1+Math.max(u,s.r)}return z}return a},
f4:function(a){var z,y
z=this.a
if(z==null)return
y=this.bt(z)
this.bJ(a,this.a,0,y)},
bJ:function(a,b,c,d){var z,y,x,w,v,u
z=b.a
y=this.f
x=z.a
y[0].i(x)
y[1].i(x)
w=y[1].a
z=z.b
v=z.a
x=x.a
w[0]=w[0]+(v[0]-x[0])
y[2].i(z)
y[3].i(z)
w=y[3].a
w[0]=w[0]-(v[0]-x[0])
x=this.cx
v=(d-c)/d
x.a6(1,v,v)
a.bc(y,4,x)
y=a.c
y.stroke()
v=this.cy
a.b.ac(z,v)
v=v.a
z=v[0]
v=v[1]
w=c+1
u=J.a2(b)+".id-"+w+"/"+d
a.cB(x)
y.strokeText(u,z,v)
z=b.d
if(z!=null)this.bJ(a,z,w,d)
z=b.e
if(z!=null)this.bJ(a,z,w,d)},
e2:function(){var z,y,x
for(z=this.d-1;z>=0;--z){y=this.b
x=new Float64Array(2)
y[z]=new V.aO(new V.a6(new E.a(x),new E.a(new Float64Array(2))),null,null,null,null,z,0)
y=this.b
x=y[z]
J.cE(x,z===this.d-1?null:y[z+1])
J.cD(this.b[z],-1)}for(y=this.f,z=0;z<4;++z)y[z]=new E.a(new Float64Array(2))},
q:{
fj:function(){var z,y
z=new Array(16)
z.fixed$length=Array
y=[V.aO]
y=new V.fi(null,H.f(z,y),0,16,0,H.f(new Array(4),[E.a]),H.f(new Array(20),y),0,new E.a(new Float64Array(H.b(2))),V.au(),new V.cb(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0),V.au(),new G.bO(0,0,0),new E.a(new Float64Array(H.b(2))))
y.e2()
return y}}},
aO:{"^":"c;ar:a<,an:b<,aI:c*,d,e,f,a9:r'"},
aX:{"^":"c;cY:a?,cZ:b?",
aF:function(a,b){var z,y
z=this.a
y=b.a
if(z<y)return-1
if(z===y){z=this.b
y=b.b
if(z<y)z=-1
else z=z===y?0:1
return z}return 1},
$isu:1,
$asu:function(){return[V.aX]}},
ea:{"^":"c;a,b"},
Q:{"^":"c;N:a<,b",
B:function(a){var z,y
z=a.a.a
y=this.a.a
y[0]=z[0]
y[1]=z[1]
z=a.b.a
y=this.b.a
y[0]=z[0]
y[1]=z[1]
y[2]=z[2]
y[3]=z[3]}},
bR:{"^":"c;a,b",
k:function(a){return this.b}},
cX:{"^":"c;a,b,c"},
hI:{"^":"c;a,b,c",
e9:function(){var z,y,x
for(z=this.b,y=this.a,x=0;x<8;++x){y[x]=new E.a(new Float64Array(2))
z[x]=new E.a(new Float64Array(2))}},
q:{
hJ:function(){var z=[E.a]
z=new V.hI(H.f(new Array(8),z),H.f(new Array(8),z),0)
z.e9()
return z}}},
it:{"^":"c;a,b,c,d,e,f,r,x,y"},
eZ:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3",
eM:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
a.e=0
z=b.c
y=d.c
x=c.b
w=x.b
v=z.a
u=v[0]
x=x.a
v=v[1]
t=c.a.a
s=t[0]
t=t[1]
r=e.b
q=r.b
p=y.a
o=p[0]
r=r.a
p=p[1]
n=e.a.a
m=q*o-r*p+n[0]-(w*u-x*v+s)
l=r*o+q*p+n[1]-(x*u+w*v+t)
k=b.b+d.b
if(m*m+l*l>k*k)return
a.d=C.m
a.c.i(z)
a.b.M()
a.e=1
x=a.a
x[0].a.i(y)
x[0].d.b1()},
eN:function(b9,c0,c1,c2,c3){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8
b9.e=0
z=c2.c
y=c3.b
x=c1.b
w=y.b
v=z.a
u=v[0]
t=y.a
s=v[1]
r=c3.a.a
q=r[0]
r=r[1]
p=c1.a.a
o=w*u-t*s+q-p[0]
n=t*u+w*s+r-p[1]
p=x.b
r=x.a
m=p*o+r*n
l=-r*o+p*n
k=c0.gbl().p(0,c2.b)
j=c0.ga7()
i=c0.gao()
h=c0.gaY()
for(g=0,f=-17976931348623157e292,e=0;C.b.C(e,j);++e){d=i.h(0,e)
c=C.a.u(m,d.gm(d))
b=C.a.u(l,d.gn(d))
w=h.h(0,e)
w=w.gm(w).j(0,c)
u=h.h(0,e)
a=w.p(0,u.gn(u).j(0,b))
if(a.a0(0,k))return
if(a.a0(0,f)){f=a
g=e}}a0=g+1
a0=C.b.C(a0,j)?a0:0
a1=i.h(0,g)
a2=i.h(0,a0)
if(f<11920928955078125e-23){b9.e=1
b9.d=C.i
a3=h.h(0,g)
w=b9.b.a
w[0]=a3.gm(a3)
w[1]=a3.gn(a3)
w=b9.c.a
w[0]=a1.gm(a1).p(0,a2.gm(a2)).j(0,0.5)
w[1]=a1.gn(a1).p(0,a2.gn(a2)).j(0,0.5)
a4=b9.a[0]
w=a4.a.a
w[0]=v[0]
w[1]=v[1]
a4.d.b1()
return}a5=C.a.u(m,a1.gm(a1))
a6=C.a.u(l,a1.gn(a1))
a7=a2.gm(a2).u(0,a1.gm(a1))
a8=a2.gn(a2).u(0,a1.gn(a1))
w=C.a.j(a5,a7)
v=C.a.j(a6,a8)
a9=C.a.u(m,a2.gm(a2))
b0=C.a.u(l,a2.gn(a2))
b1=a1.gm(a1).u(0,a2.gm(a2))
b2=a1.gn(a1).u(0,a2.gn(a2))
u=C.a.j(a9,b1)
t=C.a.j(b0,b2)
if(w+v<=0){b3=C.a.u(m,a1.gm(a1))
b4=C.a.u(l,a1.gn(a1))
if(C.a.a0(b3*b3+b4*b4,k.j(0,k)))return
b9.e=1
b9.d=C.i
w=b9.b
v=w.a
v[0]=C.a.u(m,a1.gm(a1))
v[1]=C.a.u(l,a1.gn(a1))
w.U()
b9.c.i(a1)
w=b9.a
w[0].a.i(z)
w[0].d.b1()}else if(u+t<=0){b3=C.a.u(m,a2.gm(a2))
b4=C.a.u(l,a2.gn(a2))
if(C.a.a0(b3*b3+b4*b4,k.j(0,k)))return
b9.e=1
b9.d=C.i
w=b9.b
v=w.a
v[0]=C.a.u(m,a2.gm(a2))
v[1]=C.a.u(l,a2.gn(a2))
w.U()
b9.c.i(a2)
w=b9.a
w[0].a.i(z)
w[0].d.b1()}else{b5=a1.gm(a1).p(0,a2.gm(a2)).j(0,0.5)
b6=a1.gn(a1).p(0,a2.gn(a2)).j(0,0.5)
b7=C.a.u(m,b5)
b8=C.a.u(l,b6)
a3=h.h(0,g)
if(C.a.a0(C.a.j(b7,a3.gm(a3))+C.a.j(b8,a3.gn(a3)),k))return
b9.e=1
b9.d=C.i
b9.b.i(h.h(0,g))
w=b9.c.a
w[0]=b5
w[1]=b6
w=b9.a
w[0].a.i(z)
w[0].d.b1()}},
cN:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=b.ga7()
y=d.ga7()
x=b.gaY()
w=b.gao()
v=d.gao()
u=this.f
G.dQ(e,c,u)
t=u.b
for(s=this.r,r=s.a,q=this.x,p=q.a,o=0,n=-17976931348623157e292,m=0;C.b.C(m,z);++m){G.N(t,x.h(0,m),s)
G.m(u,w.h(0,m),q)
for(l=17976931348623157e292,k=0;C.b.C(k,y);++k){j=v.h(0,k)
i=C.a.j(r[0],j.gm(j).u(0,p[0]))+C.a.j(r[1],j.gn(j).u(0,p[1]))
if(i<l)l=i}if(l>n){n=l
o=m}}a.b=o
a.a=n},
fb:function(a,b,a0,a1,a2,a3){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
b.ga7()
z=b.gaY()
y=a2.ga7()
x=a2.gao()
w=a2.gaY()
v=a[0]
u=a[1]
t=a0.b
s=a3.b
r=z.h(0,a1)
q=C.a.j(t.b,r.gm(r))-C.a.j(t.a,r.gn(r))
p=C.a.j(t.a,r.gm(r))+C.a.j(t.b,r.gn(r))
o=s.b
n=s.a
m=o*q+n*p
l=-n*q+o*p
for(k=0,j=17976931348623157e292,i=0;C.b.C(i,y);++i){h=w.h(0,i)
g=C.a.j(m,h.gm(h))+C.a.j(l,h.gn(h))
if(g<j){j=g
k=i}}f=k+1
f=C.b.C(f,y)?f:0
e=x.h(0,k)
o=a3.a.a
n=v.a.a
n[0]=C.a.j(s.b,e.gm(e))-C.a.j(s.a,e.gn(e))+o[0]
n[1]=C.a.j(s.a,e.gm(e))+C.a.j(s.b,e.gn(e))+o[1]
n=a1&255
d=v.b.a
d[0]=n
d[1]=k&255
d[2]=1
d[3]=0
c=x.h(0,f)
d=u.a.a
d[0]=C.a.j(s.b,c.gm(c))-C.a.j(s.a,c.gn(c))+o[0]
d[1]=C.a.j(s.a,c.gm(c))+C.a.j(s.b,c.gn(c))+o[1]
o=u.b.a
o[0]=n
o[1]=f&255
o[2]=1
o[3]=0},
eO:function(b0,b1,b2,b3,b4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9
b0.e=0
z=b1.gbl().p(0,b3.gbl())
y=this.y
this.cN(y,b1,b2,b3,b4)
if(C.a.a0(y.a,z))return
x=this.z
this.cN(x,b3,b4,b1,b2)
if(C.a.a0(x.a,z))return
if(x.a>y.a+0.0005){w=x.b
b0.d=C.q
v=b2
u=b4
t=b1
s=b3
r=!0}else{w=y.b
b0.d=C.i
v=b4
u=b2
t=b3
s=b1
r=!1}q=u.b
y=this.Q
this.fb(y,s,u,w,t,v)
p=s.ga7()
o=s.gao()
n=w+1
n=C.b.C(n,p)?n:0
x=this.dx
x.i(o.h(0,w))
m=this.dy
m.i(o.h(0,n))
l=this.ch
k=m.a
j=x.a
i=l.a
i[0]=k[0]-j[0]
i[1]=k[1]-j[1]
l.U()
l=this.cx
h=l.a
h[0]=i[1]
h[1]=-1*i[0]
h=this.cy
g=h.a
g[0]=(j[0]+k[0])*0.5
g[1]=(j[1]+k[1])*0.5
g=this.db
f=q.b
e=i[0]
d=q.a
c=g.a
c[0]=f*e-d*i[1]
c[1]=d*i[0]+f*i[1]
i=c[1]
b=-1*c[0]
G.aE(u,x,x)
G.aE(u,m,m)
m=j[0]
j=j[1]
a=i*m+b*j
a0=C.a.p(-(c[0]*m+c[1]*j),z)
a1=C.a.p(c[0]*k[0]+c[1]*k[1],z)
g.S()
k=this.fr
a2=V.bb(k,y,g,a0,w)
g.S()
if(a2<2)return
y=this.fx
if(V.bb(y,k,g,a1,n)<2)return
b0.b.i(l)
b0.c.i(h)
for(x=b0.a,m=v.a.a,l=v.b,a3=0,a4=0;a4<2;++a4){k=y[a4].a.a
if(C.a.dc(i*k[0]+b*k[1]-a,z)){a5=x[a3]
a6=a5.a
k=y[a4]
j=k.a.a
a7=j[0]-m[0]
a8=j[1]-m[1]
j=l.b
h=l.a
g=a6.a
g[0]=j*a7+h*a8
g[1]=-h*a7+j*a8
j=a5.d
k=k.b.a
j=j.a
j[0]=k[0]
j[1]=k[1]
j[2]=k[2]
j[3]=k[3]
if(r){a9=j[0]
j[0]=j[1]
j[1]=a9
a9=j[2]
j[2]=j[3]
j[3]=a9}++a3}}b0.e=a3},
cJ:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
a.e=0
z=d.c
y=this.e
G.m(e,z,y)
x=this.fy
G.dR(c,y,x)
w=b.c
v=b.d
u=this.go
u.i(v)
u.w(w)
y.i(v)
y.w(x)
t=u.v(y)
y.i(x)
y.w(w)
s=u.v(y)
r=b.b+d.b
q=this.id
p=q.a
p[1]=0
p[3]=0
if(s<=0){y=$.$get$af()
y.i(x)
y.w(w)
y=$.$get$af()
if(y.v(y)>r*r)return
b.r
p[0]=0
p[2]=0
a.e=1
a.d=C.m
a.b.M()
a.c.i(w)
y=a.a
y[0].d.B(q)
y[0].a.i(z)
return}if(t<=0){y=$.$get$af()
y.i(x)
y.w(v)
y=$.$get$af()
if(y.v(y)>r*r)return
b.x
p[0]=1
p[2]=0
a.e=1
a.d=C.m
a.b.M()
a.c.i(v)
y=a.a
y[0].d.B(q)
y[0].a.i(z)
return}o=u.v(u)
n=this.k2
n.i(w)
n.H(0,t)
y.i(v)
y.H(0,s)
n.F(0,y)
n.H(0,1/o)
m=$.$get$af()
m.i(x)
m.w(n)
n=$.$get$af()
if(n.v(n)>r*r)return
n=this.r
u=u.a
m=n.a
m[0]=-u[1]
m[1]=u[0]
y.i(x)
y.w(w)
if(n.v(y)<0){y=m[0]
x=m[1]
m[0]=-y
m[1]=-x}n.U()
p[0]=0
p[2]=1
a.e=1
a.d=C.i
a.b.i(n)
a.c.i(w)
y=a.a
y[0].d.B(q)
y[0].a.i(z)},
q:{
bb:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=b[1]
x=z.a
w=y.a
v=c.v(x)-d
u=c.v(w)-d
if(v<=0){a[0].B(z)
t=1}else t=0
if(u<=0){s=t+1
a[t].B(y)
t=s}if(v*u<0){r=v/(v-u)
q=a[t]
p=q.a
o=x.a
n=o[0]
m=w.a
p=p.a
p[0]=n+r*(m[0]-n)
o=o[1]
p[1]=o+r*(m[1]-o)
o=q.b.a
o[0]=e&255
o[1]=z.b.a[1]
o[2]=0
o[3]=1;++t}return t}}},
hV:{"^":"c;a,b",
k:function(a){return this.b}},
fk:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx",
cI:function(a,b,c,d,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=this.b
G.dQ(c,a0,z)
y=this.c
G.m(z,d.ghd(),y)
this.d=b.e
this.e=b.c
x=b.d
this.f=x
this.r=b.f
b.x
w=this.fr
w.i(x)
w.w(this.e)
w.U()
x=this.y
w=w.a
v=w[1]
w=w[0]
u=x.a
u[0]=v
u[1]=-w
w=this.fx
w.i(y)
w.w(this.e)
t=x.v(w)
y=t>=0
this.dy=y
v=this.cy.a
s=this.Q.a
r=this.db.a
if(y){s[0]=u[0]
s[1]=u[1]
v[0]=-u[0]
v[1]=-u[1]
r[0]=-u[0]
r[1]=-u[1]}else{s[0]=-u[0]
s[1]=-u[1]
v[0]=u[0]
v[1]=u[1]
r[0]=u[0]
r[1]=u[1]}y=this.a
y.c=d.ga7()
for(v=y.a,u=z.b,s=y.b,q=0;C.b.C(q,d.ga7());++q){G.m(z,d.gao().h(0,q),v[q])
G.N(u,d.gaY().h(0,q),s[q])}this.dx=0.02
a.e=0
p=this.k4
this.eP(p)
if(p.a===C.o)return
if(p.c>this.dx)return
o=this.r1
this.eQ(o)
u=o.a===C.o
if(!u&&o.c>this.dx)return
if(!u)if(o.c>0.98*p.c+0.001)p=o
u=this.id
n=u[0]
m=u[1]
if(p.a===C.p){a.d=C.i
r=this.Q
l=r.v(s[0])
for(k=0,q=1;j=y.c,q<j;++q){i=r.v(s[q])
if(i<l){l=i
k=q}}h=k+1
h=h<j?h:0
n.a.i(v[k])
y=n.b.a
y[0]=0
y[1]=k&255
y[2]=1
y[3]=0
m.a.i(v[h])
v=m.b.a
v[0]=0
v[1]=h&255
v[2]=1
v[3]=0
y=this.k3
v=y.c
s=y.d
r=y.e
if(this.dy){y.a=0
y.b=1
v.i(this.e)
s.i(this.f)
r.i(x)}else{y.a=1
y.b=0
v.i(this.f)
s.i(this.e)
r.i(x)
r.S()}}else{a.d=C.q
n.a.i(this.e)
x=n.b.a
x[0]=0
x[1]=p.b&255
x[2]=0
x[3]=1
m.a.i(this.f)
x=m.b.a
x[0]=0
r=p.b
x[1]=r&255
x[2]=0
x[3]=1
x=this.k3
x.a=r
j=r+1
x.b=j<y.c?j:0
x.c.i(v[r])
x.d.i(v[x.b])
x.e.i(s[x.a])
y=x}x=y.f
v=y.e
s=v.a
r=s[1]
s=s[0]
j=x.a
j[0]=r
j[1]=-s
s=y.x
s.i(x)
s.S()
j=y.c
y.r=x.v(j)
y.y=s.v(y.d)
r=this.k1
if(V.bb(r,u,x,y.r,y.a)<2)return
x=this.k2
if(V.bb(x,r,s,y.y,y.b)<2)return
u=a.b
s=a.c
if(p.a===C.p){u.i(v)
s.i(j)}else{u.i(d.gaY().h(0,y.a))
s.i(d.gao().h(0,y.a))}for(y=w.a,u=a.a,g=0,q=0;q<2;++q){f=x[q].a.a
y[1]=f[1]
y[0]=f[0]
w.w(j)
if(v.v(w)<=this.dx){e=u[g]
if(p.a===C.p){G.dR(z,x[q].a,e.a)
s=e.d
r=x[q].b.a
s=s.a
s[0]=r[0]
s[1]=r[1]
s[2]=r[2]
s[3]=r[3]}else{s=e.a
r=x[q]
f=r.a.a
s=s.a
s[1]=f[1]
s[0]=f[0]
s=e.d
r=r.b.a
s=s.a
s[2]=r[3]
s[3]=r[2]
s[0]=r[1]
s[1]=r[0]}++g}}a.e=g},
eP:function(a){var z,y,x,w,v,u,t,s,r,q
a.a=C.p
a.b=this.dy?0:1
a.c=17976931348623157e292
z=this.Q.a
y=z[0]
z=z[1]
for(x=this.a,w=x.a,v=0,u=17976931348623157e292;v<x.c;++v){t=w[v].a
s=t[0]
r=this.e.a
q=y*(s-r[0])+z*(t[1]-r[1])
if(q<u){a.c=q
u=q}}},
eQ:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
a.a=C.o
a.b=-1
a.c=-17976931348623157e292
z=this.Q
y=z.a
x=this.r2.a
x[0]=-y[1]
x[1]=y[0]
for(y=this.a,w=this.fx,v=this.rx.a,u=w.a,t=this.cy,s=y.b,r=y.a,q=this.db,p=0;p<y.c;++p){o=s[p]
n=r[p]
m=o.a
v[0]=-m[0]
v[1]=-m[1]
m=n.a
l=m[0]
k=this.e.a
j=k[0]
m=m[1]
k=k[1]
i=v[0]
h=v[1]
g=this.f.a
f=Math.min(i*(l-j)+h*(m-k),i*(l-g[0])+h*(m-g[1]))
if(f>this.dx){a.a=C.F
a.b=p
a.c=f
return}if(i*x[0]+h*x[1]>=0){u[1]=h
u[0]=v[0]
w.w(q)
if(w.v(z)<-0.03490658503988659)continue}else{u[1]=h
u[0]=v[0]
w.w(t)
if(w.v(z)<-0.03490658503988659)continue}if(f>a.c){a.a=C.F
a.b=p
a.c=f}}},
e3:function(){var z,y,x,w,v
for(z=this.k2,y=this.k1,x=this.id,w=0;w<2;++w){v=new Float64Array(2)
x[w]=new V.Q(new E.a(v),new V.K(new Int8Array(4)))
v=new Float64Array(2)
y[w]=new V.Q(new E.a(v),new V.K(new Int8Array(4)))
v=new Float64Array(2)
z[w]=new V.Q(new E.a(v),new V.K(new Int8Array(4)))}},
q:{
fl:function(){var z=[V.Q]
z=new V.fk(V.hJ(),G.q(),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),C.M,C.M,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,!1,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),H.f(new Array(2),z),H.f(new Array(2),z),H.f(new Array(2),z),new V.it(0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,new E.a(new Float64Array(H.b(2))),0),new V.cX(C.o,0,0),new V.cX(C.o,0,0),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))))
z.e3()
return z}}},
K:{"^":"c;a",
c1:function(){var z=this.a
return(z[0]<<24|z[1]<<16|z[2]<<8|z[3])>>>0},
B:function(a){var z,y
z=a.a
y=this.a
y[0]=z[0]
y[1]=z[1]
y[2]=z[2]
y[3]=z[3]},
b1:function(){var z=this.a
z[0]=0
z[1]=0
z[2]=0
z[3]=0},
aF:function(a,b){return this.c1()-b.c1()},
$isu:1,
$asu:function(){return[V.K]}},
bx:{"^":"c;a,b,K:c<,E:d@,e,f",
B:function(a){this.a.i(a.a)
this.b.i(a.b)
this.c.i(a.c)
this.d=a.d
this.e=a.e
this.f=a.f}},
hz:{"^":"c;a,b,c,d",
e7:function(){var z=this.c
z[0]=1073741823
z[1]=1073741823
z[2]=1073741823
z=this.d
z[0]=1073741823
z[1]=1073741823
z[2]=1073741823},
q:{
dy:function(){var z=P.l
z=new V.hz(0,0,P.aj(3,0,!1,z),P.aj(3,0,!1,z))
z.e7()
return z}}},
iC:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
fF:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
this.e=a.b
for(z=this.d,y=a.c,x=a.d,w=b.a,v=d.a,u=0;t=this.e,u<t;++u){s=z[u]
t=y[u]
s.e=t
r=x[u]
s.f=r
q=w[t]
p=v[r]
r=s.a
G.m(c,q,r)
t=s.b
G.m(e,p,t)
o=s.c
n=t.a
t=o.a
t[1]=n[1]
t[0]=n[0]
o.w(r)
s.d=0}if(t>1){m=a.a
l=this.c2()
if(l<0.5*m||2*m<l||l<11920928955078125e-23)this.e=0}if(this.e===0){s=z[0]
s.e=0
s.f=0
q=w[0]
p=v[0]
z=s.a
G.m(c,q,z)
y=s.b
G.m(e,p,y)
x=s.c
x.i(y)
x.w(z)
this.e=1}},
fW:function(a){var z,y,x,w
a.a=this.c2()
a.b=this.e
for(z=a.c,y=this.d,x=a.d,w=0;w<this.e;++w){z[w]=J.cF(y[w].e)
x[w]=J.cF(y[w].f)}},
da:function(a){var z,y
switch(this.e){case 1:a.i(this.a.c)
a.S()
return
case 2:z=this.f
z.i(this.b.c)
y=this.a.c
z.w(y)
a.i(y)
a.S()
if(z.a8(a)>0)z.aJ(1,a)
else z.aJ(-1,a)
return
default:a.M()
return}},
bZ:function(a){var z,y,x
switch(this.e){case 0:a.M()
return
case 1:a.i(this.a.c)
return
case 2:z=this.x
y=this.b
z.i(y.c)
z.H(0,y.d)
y=this.r
x=this.a
y.i(x.c)
y.H(0,x.d)
y.F(0,z)
a.i(y)
return
case 3:a.M()
return
default:a.M()
return}},
c2:function(){var z,y,x
switch(this.e){case 0:return 0
case 1:return 0
case 2:return Math.sqrt(this.a.c.bI(this.b.c))
case 3:z=this.y
z.i(this.b.c)
y=this.a.c
z.w(y)
x=this.z
x.i(this.c.c)
x.w(y)
return z.a8(x)
default:return 0}},
dq:function(){var z,y,x,w,v,u,t,s
z=this.a
y=z.c
x=this.b
w=x.c
v=this.f
v.i(w)
v.w(y)
u=-y.v(v)
if(u<=0){z.d=1
this.e=1
return}t=w.v(v)
if(t<=0){x.d=1
this.e=1
z.B(x)
return}s=1/(t+u)
z.d=t*s
x.d=u*s
this.e=2},
dr:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
z=this.cx
y=this.a
z.i(y.c)
x=this.cy
w=this.b
x.i(w.c)
v=this.db
u=this.c
v.i(u.c)
t=this.f
t.i(x)
t.w(z)
s=z.v(t)
r=x.v(t)
q=-s
p=this.Q
p.i(v)
p.w(z)
o=z.v(p)
n=v.v(p)
m=-o
l=this.ch
l.i(v)
l.w(x)
k=x.v(l)
j=v.v(l)
i=-k
h=t.a8(p)
g=h*x.a8(v)
f=h*v.a8(z)
e=h*z.a8(x)
if(q<=0&&m<=0){y.d=1
this.e=1
return}if(r>0&&q>0&&e<=0){d=1/(r+q)
y.d=r*d
w.d=q*d
this.e=2
return}if(n>0&&m>0&&f<=0){c=1/(n+m)
y.d=n*c
u.d=m*c
this.e=2
w.B(u)
return}if(r<=0&&i<=0){w.d=1
this.e=1
y.B(w)
return}if(n<=0&&j<=0){u.d=1
this.e=1
y.B(u)
return}if(j>0&&i>0&&g<=0){b=1/(j+i)
w.d=j*b
u.d=i*b
this.e=2
y.B(u)
return}a=1/(g+f+e)
y.d=g*a
w.d=f*a
u.d=e*a
this.e=3}},
ff:{"^":"c;a,b,c,d",
c6:function(a,b){var z,y,x,w,v
switch(a.a){case C.h:this.a[0].i(a.c)
this.b=1
this.c=a.b
break
case C.l:H.z(a,"$isaD")
this.b=a.ga7()
this.c=a.gbl()
for(z=this.a,y=0;y<this.b;++y){x=z[y]
w=a.gao().h(0,y)
x.toString
v=w.geD()
x=x.a
x[1]=v[1]
x[0]=v[0]}break
case C.r:H.z(a,"$isbM")
z=this.d
z[0]=a.gbD().h(0,b)
x=b+1
if(C.b.C(x,a.gen()))z[1]=a.gbD().h(0,x)
else z[1]=a.gbD().h(0,0)
x=this.a
x[0].i(z[0])
x[1].i(z[1])
this.b=2
this.c=a.gbl()
break
case C.n:H.z(a,"$isay")
z=this.a
z[0].i(a.c)
z[1].i(a.d)
this.b=2
this.c=a.b
break}},
ay:function(a){var z,y,x,w,v
z=this.a
y=z[0].v(a)
for(x=0,w=1;w<this.b;++w){v=z[w].v(a)
if(v>y){y=v
x=w}}return x},
e1:function(){var z,y
for(z=this.a,y=0;y<8;++y)z[y]=new E.a(new Float64Array(2))
this.b=0
this.c=0},
q:{
aw:function(){var z=[E.a]
z=new V.ff(H.f(new Array(8),z),null,null,H.f(new Array(2),z))
z.e1()
return z}}},
fe:{"^":"c;a,b,c,d,e,f,r",
f0:function(a3,a4,a5){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
$.cT=$.cT+1
z=a5.a
y=a5.b
x=a5.c
w=a5.d
v=this.a
v.fF(a4,z,x,y,w)
u=v.d
t=this.d
v.bZ(t)
t.gaX()
for(s=this.b,r=this.c,q=x.b,p=this.e,o=p.a,n=this.f,m=z.a,l=w.b,k=y.a,j=0;j<20;){i=v.e
for(h=0;h<i;++h){s[h]=u[h].e
r[h]=u[h].f}switch(i){case 1:break
case 2:v.dq()
break
case 3:v.dr()
break}if(v.e===3)break
v.bZ(t)
t.gaX()
v.da(p)
if(p.gaX()<14210854715202004e-30)break
g=u[v.e]
o[1]=-o[1]
o[0]=-o[0]
G.am(q,p,n)
f=z.ay(n)
g.e=f
f=m[f]
e=g.a
G.m(x,f,e)
o[1]=-o[1]
o[0]=-o[0]
G.am(l,p,n)
f=y.ay(n)
g.f=f
f=k[f]
d=g.b
G.m(w,f,d)
f=g.c
c=d.a
d=f.a
d[1]=c[1]
d[0]=c[0]
f.w(e);++j
$.cU=$.cU+1
h=0
while(!0){if(!(h<i)){b=!1
break}f=g.e
e=s[h]
if(f==null?e==null:f===e){f=g.f
e=r[h]
e=f==null?e==null:f===e
f=e}else f=!1
if(f){b=!0
break}++h}if(b)break;++v.e}$.cV=Math.max($.cV,j)
a=a3.a
a0=a3.b
switch(v.e){case 0:break
case 1:t=v.a
a.i(t.a)
a0.i(t.b)
break
case 2:t=v.r
s=v.a
t.i(s.a)
t.H(0,s.d)
r=v.b
a.i(r.a)
a.H(0,r.d)
a.F(0,t)
t.i(s.b)
t.H(0,s.d)
a0.i(r.b)
a0.H(0,r.d)
a0.F(0,t)
break
case 3:t=v.a
a.i(t.a)
a.H(0,t.d)
t=v.y
s=v.b
t.i(s.a)
t.H(0,s.d)
s=v.z
r=v.c
s.i(r.a)
s.H(0,r.d)
a.F(0,t)
a.F(0,s)
a0.i(a)
break
default:break}a3.c=Math.sqrt(a.bI(a0))
a3.d=j
v.fW(a4)
if(a5.e){a1=z.c
a2=y.c
v=a3.c
t=a1+a2
if(v>t&&v>11920928955078125e-23){a3.c=v-t
v=this.r
v.i(a0)
v.w(a)
v.U()
n.i(v)
n.H(0,a1)
a.F(0,n)
n.i(v)
n.H(0,a2)
a0.w(n)}else{a.F(0,a0)
a.H(0,0.5)
a0.i(a)
a3.c=0}}}},
cR:{"^":"c;a,b,c,d,e"},
cS:{"^":"c;a,b,c,d"},
c0:{"^":"c;a,b",
k:function(a){return this.b}},
fT:{"^":"c;a,b,c,d,e",
B:function(a){var z,y,x,w,v,u,t
for(z=this.a,y=a.a,x=0;x<a.e;++x){w=z[x]
v=y[x]
u=w.a
t=v.a.a
u=u.a
u[1]=t[1]
u[0]=t[0]
w.b=v.b
w.c=v.c
w=w.d
v=v.d.a
w=w.a
w[0]=v[0]
w[1]=v[1]
w[2]=v[2]
w[3]=v[3]}this.d=a.d
this.b.i(a.b)
this.c.i(a.c)
this.e=a.e},
e5:function(){var z,y,x
for(z=this.a,y=0;y<2;++y){x=new Float64Array(2)
z[y]=new V.df(new E.a(x),0,0,new V.K(new Int8Array(4)))}},
q:{
E:function(){var z=new V.fT(H.f(new Array(2),[V.df]),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),C.m,0)
z.e5()
return z}}},
df:{"^":"c;a,b,c,d"},
cb:{"^":"c;a,b,c"},
dv:{"^":"c;a,b"},
bN:{"^":"dx;c,a,b",
bG:function(a,b,c){var z,y,x,w,v,u,t,s
z=b.b
y=z.b
x=this.c.a
w=x[0]
v=z.a
x=x[1]
u=b.a.a
t=y*w-v*x+u[0]
s=v*w+y*x+u[1]
u=this.b
x=a.a.a
x[0]=t-u
x[1]=s-u
x=a.b.a
x[0]=t+u
x[1]=s+u}},
ay:{"^":"dx;c,d,e,f,r,x,y,a,b"},
fX:{"^":"c;a,b,c"},
dx:{"^":"c;"},
bs:{"^":"c;a,b",
k:function(a){return this.b}},
hF:{"^":"c;a,b,c,d,e"},
b0:{"^":"c;a,b",
k:function(a){return this.b}},
hG:{"^":"c;a,b"},
hK:{"^":"c;a,b,c,d,e,f,r,x,y,z",
fQ:function(a3,a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
$.dG=$.dG+1
a3.a=C.J
a3.b=a4.e
z=a4.a
y=a4.b
x=this.x
x.B(a4.c)
w=this.y
w.B(a4.d)
x.U()
w.U()
v=a4.e
u=Math.max(0.005,z.c+y.c-0.015)
t=this.a
t.b=0
s=this.b
s.a=z
s.b=y
s.e=!1
for(r=this.f,q=this.r,p=u+0.00125,o=u-0.00125,n=this.e,m=this.c,l=this.d,k=this.z.fy,j=0,i=0;!0;){x.ab(m,j)
w.ab(l,j)
s.c=m
s.d=l
k.f0(n,t,s)
h=n.c
if(h<=0){a3.a=C.a3
a3.b=0
break}if(h<p){a3.a=C.A
a3.b=j
break}r.fl(0,t,z,x,y,w,j)
f=v
e=0
while(!0){if(!!0){g=!1
break}d=r.fc(q,f)
if(d>p){a3.a=C.a4
a3.b=v
g=!0
break}if(d>o){j=f
g=!1
break}c=r.a3(q[0],q[1],j)
if(c<o){a3.a=C.K
a3.b=j
g=!0
break}if(c<=p){a3.a=C.A
a3.b=j
g=!0
break}for(b=f,a=j,a0=0;!0;){a1=(a0&1)===1?a+(u-c)*(b-a)/(d-c):0.5*(a+b);++a0
$.dK=$.dK+1
a2=r.a3(q[0],q[1],a1)
if(Math.abs(a2-u)<0.00125){f=a1
break}if(a2>u){a=a1
c=a2}else{b=a1
d=a2}if(a0===50)break}$.dJ=Math.max($.dJ,a0);++e
if(e===8||a0===50){g=!1
break}}++i
$.dH=$.dH+1
if(g)break
if(i===20){a3.a=C.K
a3.b=j
break}}$.dI=Math.max($.dI,i)}},
cc:{"^":"c;a,b",
k:function(a){return this.b}},
hw:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go",
fl:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
this.a=c
this.b=e
z=b.b
this.f=d
this.r=f
y=this.fr
d.ab(y,g)
x=this.fx
this.r.ab(x,g)
if(z===1){this.c=C.x
g=this.x
w=this.a
v=b.c[0]
g.i(w.a[v])
v=this.y
w=this.b
u=b.d[0]
v.i(w.a[u])
u=this.z
G.m(y,g,u)
g=this.Q
G.m(x,v,g)
v=this.e
v.i(g)
v.w(u)
return v.U()}else{g=b.c
w=b.d
v=this.z
u=this.d
t=this.cy
s=this.e
r=this.Q
q=this.dy
if(J.a5(g[0],g[1])){this.c=C.z
p=this.db
o=this.b
n=w[0]
p.i(o.a[n])
n=this.dx
o=this.b
w=w[1]
n.i(o.a[w])
q.i(n)
q.w(p)
q.aJ(-1,s)
s.U()
G.N(x.b,s,t)
u.i(p)
u.F(0,n)
u.H(0,0.5)
G.m(x,u,r)
u=this.x
x=this.a
g=g[0]
u.i(x.a[g])
G.m(y,u,v)
q.i(v)
q.w(r)
m=q.v(t)
if(m<0){s.S()
m=-m}return m}else{this.c=C.y
p=this.ch
o=this.a
n=g[0]
p.i(o.a[n])
n=this.cx
o=this.a
g=g[1]
n.i(o.a[g])
q.i(n)
q.w(p)
q.aJ(-1,s)
s.U()
G.N(y.b,s,t)
u.i(p)
u.F(0,n)
u.H(0,0.5)
G.m(y,u,v)
u=this.y
y=this.b
w=w[0]
u.i(y.a[w])
G.m(x,u,r)
q.i(r)
q.w(v)
m=q.v(t)
if(m<0){s.S()
m=-m}return m}}},
fc:function(a,b){var z,y,x,w,v,u,t
z=this.fr
this.f.ab(z,b)
y=this.fx
this.r.ab(y,b)
switch(this.c){case C.x:x=this.e
w=this.fy
G.am(z.b,x,w)
x.S()
v=this.go
G.am(y.b,x,v)
x.S()
a[0]=this.a.ay(w)
a[1]=this.b.ay(v)
v=this.x
w=this.a
u=a[0]
v.i(w.a[u])
u=this.y
w=this.b
t=a[1]
u.i(w.a[t])
t=this.z
G.m(z,v,t)
v=this.Q
G.m(y,u,v)
v.w(t)
return v.v(x)
case C.y:x=this.cy
G.N(z.b,this.e,x)
w=this.z
G.m(z,this.d,w)
x.S()
z=this.go
G.am(y.b,x,z)
x.S()
a[0]=-1
z=this.b.ay(z)
a[1]=z
v=this.y
v.i(this.b.a[z])
z=this.Q
G.m(y,v,z)
z.w(w)
return z.v(x)
case C.z:x=this.cy
G.N(y.b,this.e,x)
w=this.Q
G.m(y,this.d,w)
x.S()
y=this.fy
G.am(z.b,x,y)
x.S()
a[1]=-1
y=this.a.ay(y)
a[0]=y
v=this.x
v.i(this.a.a[y])
y=this.z
G.m(z,v,y)
y.w(w)
return y.v(x)
default:a[0]=-1
a[1]=-1
return 0}},
a3:function(a,b,c){var z,y,x,w,v
z=this.fr
this.f.ab(z,c)
y=this.fx
this.r.ab(y,c)
switch(this.c){case C.x:x=this.x
x.i(this.a.a[a])
w=this.y
w.i(this.b.a[b])
v=this.z
G.m(z,x,v)
x=this.Q
G.m(y,w,x)
x.w(v)
return x.v(this.e)
case C.y:x=this.cy
G.N(z.b,this.e,x)
w=this.z
G.m(z,this.d,w)
z=this.y
z.i(this.b.a[b])
v=this.Q
G.m(y,z,v)
v.w(w)
return v.v(x)
case C.z:x=this.cy
G.N(y.b,this.e,x)
w=this.Q
G.m(y,this.d,w)
y=this.x
y.i(this.a.a[a])
v=this.z
G.m(z,y,v)
v.w(w)
return v.v(x)
default:return 0}}},
i_:{"^":"c;a,b,c,d,e",
fk:function(a,b,c,a0,a1,a2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
if(b.e===0)return
switch(b.d){case C.m:z=this.d
y=this.e
x=this.a
w=x.a
w[0]=1
w[1]=0
v=c.b
u=v.b
t=b.c.a
s=t[0]
v=v.a
r=c.a.a
q=z.a
q[0]=u*s-v*t[1]+r[0]
q[1]=v*t[0]+u*t[1]+r[1]
p=b.a[0].a
r=a1.b
t=r.b
u=p.a
v=u[0]
r=r.a
s=a1.a.a
o=y.a
o[0]=t*v-r*u[1]+s[0]
o[1]=r*u[0]+t*u[1]+s[1]
if(z.bI(y)>14210854715202004e-30){w[0]=o[0]-q[0]
w[1]=o[1]-q[1]
x.U()}x=w[0]
n=x*a0+q[0]
v=w[1]
m=v*a0+q[1]
l=-x*a2+o[0]
k=-v*a2+o[1]
o=this.b[0].a
o[0]=(n+l)*0.5
o[1]=(m+k)*0.5
this.c[0]=(l-n)*w[0]+(k-m)*w[1]
break
case C.i:j=this.d
x=this.a
G.N(c.b,b.b,x)
G.aE(c,b.c,j)
i=this.e
for(w=b.a,v=i.a,u=j.a,x=x.a,t=this.b,s=this.c,h=0;h<b.e;++h){G.aE(a1,w[h].a,i)
r=v[0]
q=u[0]
o=x[0]
g=v[1]
f=u[1]
e=x[1]
d=a0-((r-q)*o+(g-f)*e)
n=o*d+r
m=e*d+g
l=-o*a2+r
k=-e*a2+g
g=t[h].a
g[0]=(n+l)*0.5
g[1]=(m+k)*0.5
s[h]=(l-n)*x[0]+(k-m)*x[1]}break
case C.q:j=this.d
x=this.a
G.N(a1.b,b.b,x)
G.aE(a1,b.c,j)
i=this.e
for(w=b.a,v=i.a,u=j.a,x=x.a,t=this.b,s=this.c,h=0;h<b.e;++h){G.aE(c,w[h].a,i)
r=v[0]
q=u[0]
o=x[0]
g=v[1]
f=u[1]
e=x[1]
d=a2-((r-q)*o+(g-f)*e)
l=o*d+r
k=e*d+g
n=-o*a0+r
m=-e*a0+g
g=t[h].a
g[0]=(n+l)*0.5
g[1]=(m+k)*0.5
s[h]=(n-l)*x[0]+(m-k)*x[1]}x[0]=-x[0]
x[1]=-x[1]
break}},
ec:function(){var z,y
for(z=this.b,y=0;y<2;++y)z[y]=new E.a(new Float64Array(2))},
q:{
i0:function(){var z=new V.i_(new E.a(new Float64Array(H.b(2))),H.f(new Array(2),[E.a]),new Float64Array(H.b(2)),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))))
z.ec()
return z}}},
b6:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,an:k4<,r1,r2,rx",
aO:function(a){var z,y
z=this.Q
if((z.a&2)===2)return
y=new V.fq(0,null,null,null,0,0,null,0,new V.bi(1,65535,0),!1,null,V.au(),V.au(),new E.a(new Float64Array(H.b(2))))
y.eS(this,a)
if((this.b&32)===32)y.eU(z.b.a,this.d)
y.b=this.cy
this.cy=y;++this.db
y.c=this
if(y.a>0)this.fJ()
z.a|=1
return y},
fJ:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n
this.fr=0
this.fx=0
this.fy=0
this.go=0
z=this.f
y=z.a
y.M()
x=this.a
if(x===C.e||x===C.D){y=this.d.a
z.b.i(y)
z.c.i(y)
z.d=z.e
return}x=this.Q.ch.a
w=x.a
v=w[x.b++]
v.M()
u=w[x.b++]
t=this.r2
for(s=this.cy,r=t.b.a;s!=null;s=s.b){q=s.a
if(q===0)continue
p=s.d
o=p.b
q=q*3.141592653589793*o*o
t.a=q
p=p.c.a
r[0]=p[0]
r[1]=p[1]
n=p[0]
p=p[1]
t.c=q*(0.5*o*o+(n*n+p*p))
this.fr+=q
p=u.a
p[1]=r[1]
p[0]=r[0]
p[1]=p[1]*q
p[0]=p[0]*q
v.F(0,u)
this.fy=this.fy+t.c}r=this.fr
if(r>0){r=1/r
this.fx=r
v.H(0,r)}else{this.fr=1
this.fx=1}r=this.fy
if(r>0&&(this.b&16)===0){r-=this.fr*v.v(v)
this.fy=r
this.go=1/r}else{this.fy=0
this.go=0}w=w[x.b++]
r=z.c
w.i(r)
y.i(v)
z=z.b
G.m(this.d,y,z)
r.i(z)
u.i(r)
u.w(w)
u.aJ(this.x,w)
this.r.F(0,w)
x.b-=3},
Y:function(a){var z
if(a){z=this.b
if((z&2)===0){this.b=z|2
this.k3=0}}else{this.b&=4294967293
this.k3=0
this.r.M()
this.x=0
this.y.M()
this.z=0}},
cc:function(){var z,y,x,w,v,u,t,s,r
z=this.rx
y=z.b
x=this.f
y.a=Math.sin(x.d)
w=Math.cos(x.d)
y.b=w
v=x.b.a
u=v[0]
x=x.a.a
t=x[0]
y=y.a
s=z.a.a
s[0]=u-w*t+y*x[1]
s[1]=v[1]-y*x[0]-w*x[1]
for(r=this.cy,y=this.Q,x=this.d;r!=null;r=r.b)r.dU(y.b.a,z,x)},
aA:function(){var z,y,x,w,v,u,t
z=this.d
y=z.b
x=this.f
y.a=Math.sin(x.e)
w=Math.cos(x.e)
y.b=w
v=x.c.a
u=v[0]
x=x.a.a
t=x[0]
y=y.a
z=z.a.a
z[0]=u-w*t+y*x[1]
z[1]=v[1]-y*x[0]-w*x[1]},
c7:function(a){var z
if(this.a!==C.f&&a.a!==C.f)return!1
for(z=this.dx;!1;z=z.gfv())z.gfw()
return!0},
as:function(a){var z,y,x,w,v
z=this.f
z.as(a)
y=z.c
y.i(z.b)
x=z.d
z.e=x
w=this.d
v=w.b
v.bn(x)
w=w.a
G.N(v,z.a,w)
w.H(0,-1)
w.F(0,y)},
k:function(a){return"Body[pos: "+this.d.a.k(0)+" linVel: "+this.r.k(0)+" angVel: "+H.d(this.x)+"]"}},
cI:{"^":"c;a,an:b<,c,d,e,f,r,x,y,z,Q,ch,cx,cy"},
bJ:{"^":"c;a,b",
k:function(a){return this.b}},
f0:{"^":"c;a,b,c,d,e,f",
eF:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=a.b
y=b.b
x=a.c
w=b.c
v=z.c
u=y.c
if(v==null?u==null:v===u)return
t=u.dy
for(;t!=null;){s=t.a
if(s==null?v==null:s===v){s=t.b
r=s.f
q=s.r
p=s.x
o=s.y
if((r==null?z==null:r===z)&&p===x&&(q==null?y==null:q===y)&&o===w)return
if((r==null?y==null:r===y)&&p===w&&(q==null?z==null:q===z)&&o===x)return}t=t.d}if(!u.c7(v))return
s=this.d.c8(z,y)
if(!s)return
n=this.f.fz(z,x,y,w)
if(n==null)return
z=n.f
y=n.r
v=z.c
u=y.c
n.b=null
s=this.b
n.c=s
if(s!=null)s.b=n
this.b=n
s=n.d
s.b=n
s.a=u
s.c=null
m=v.dy
s.d=m
if(m!=null)m.c=s
v.dy=s
s=n.e
s.b=n
s.a=v
s.c=null
m=u.dy
s.d=m
if(m!=null)m.c=s
u.dy=s
z.z
y.z
v.Y(!0)
u.Y(!0);++this.c},
bH:function(a){var z,y,x,w,v,u,t,s,r,q
z=a.f
y=a.r
x=z.c
w=y.c
v=a.b
if(v!=null)v.c=a.c
u=a.c
if(u!=null)u.b=v
if(a===this.b)this.b=u
v=a.d
u=v.c
if(u!=null)u.d=v.d
t=v.d
if(t!=null)t.c=u
if(v===x.dy)x.dy=t
v=a.e
u=v.c
if(u!=null)u.d=v.d
t=v.d
if(t!=null)t.c=u
if(v===w.dy)w.dy=t
z=a.f
y=a.r
if(a.z.e>0){z.z
y.z
v=!0}else v=!1
if(v){z.c.Y(!0)
y.c.Y(!0)}s=z.d.a
r=y.d.a
q=this.f.fy[s.a][r.a].a
q.a[--q.b]=a;--this.c},
eL:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.b
for(;z!=null;){y=z.f
x=z.r
w=z.x
v=z.y
u=y.c
t=x.c
if((z.a&8)===8){if(!t.c7(u)){s=z.c
this.bH(z)
z=s
continue}r=this.d.c8(y,x)
if(!r){s=z.c
this.bH(z)
z=s
continue}z.a&=4294967287}q=(u.b&2)===2&&u.a!==C.e
p=(t.b&2)===2&&t.a!==C.e
if(!q&&!p){z=z.c
continue}o=y.r[w].gbk()
n=x.r[v].gbk()
if(!this.a.fP(o,n)){s=z.c
this.bH(z)
z=s
continue}z.bV(this.e)
z=z.c}},
dV:function(a,b){this.b=null
this.d=new V.f_()
this.e=null
this.a=b},
q:{
f1:function(a,b){var z=new V.f0(null,null,0,null,null,a)
z.dV(a,b)
return z}}},
b8:{"^":"a8;fr,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
aa:function(a,b,c,d){this.b5(a,b,c,d)},
a3:function(a,b,c){var z=this.fr
H.z(this.f.d,"$isbM").d7(z,this.x)
this.dx.fr.cJ(a,z,b,this.r.d,c)}},
b9:{"^":"a8;fr,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
aa:function(a,b,c,d){this.b5(a,b,c,d)},
a3:function(a,b,c){var z,y,x
z=this.fr
H.z(this.f.d,"$isbM").d7(z,this.x)
y=this.dx.fr
x=H.z(this.r.d,"$isaD")
y.k3.cI(a,z,b,x,c)}},
ba:{"^":"a8;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
a3:function(a,b,c){this.dx.fr.eM(a,this.f.d,b,this.r.d,c)}},
a8:{"^":"c;",
aa:["b5",function(a,b,c,d){var z,y
this.a=4
this.f=a
this.r=c
this.x=b
this.y=d
this.z.e=0
this.b=null
this.c=null
z=this.d
z.b=null
z.c=null
z.d=null
z.a=null
z=this.e
z.b=null
z.c=null
z.d=null
z.a=null
this.Q=0
this.cx=Math.sqrt(a.e*c.e)
z=a.f
y=c.f
this.cy=z>y?z:y
this.db=0}],
bV:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=this.dy
y=this.z
z.B(y)
x=this.a|=4
w=this.f
w.z
v=this.r
v.z
u=w.c
t=v.c
this.a3(y,u.d,t.d)
s=y.e>0
for(w=z.a,v=y.a,r=0;r<y.e;++r){q=v[r]
q.b=0
q.c=0
p=q.d
for(o=z.e,n=p.a,m=0;m<o;++m){l=w[m]
k=l.d.a
if((k[0]<<24|k[1]<<16|k[2]<<8|k[3])>>>0===(n[0]<<24|n[1]<<16|n[2]<<8|n[3])>>>0){q.b=l.b
q.c=l.c
break}}}if(s!==((x&2)===2)){u.Y(!0)
t.Y(!0)}z=this.a
if(s)this.a=z|2
else this.a=z&4294967293
return}},
B:{"^":"c;a,b,c,d"},
bP:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
dW:function(){var z,y
for(z=this.a,y=0;y<2;++y)z[y]=new E.a(new Float64Array(2))},
q:{
cO:function(){var z=new V.bP(H.f(new Array(2),[E.a]),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,null,0,0,0)
z.dW()
return z}}},
bc:{"^":"c;a,b"},
be:{"^":"c;a,b,c,d,e"},
f2:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q",
cQ:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
this.a=a.a
z=a.c
this.r=z
y=this.d
x=y.length
if(x<z){z=new Array(Math.max(x*2,z))
z.fixed$length=Array
z=H.f(z,[V.bP])
this.d=z
C.d.W(z,0,x,y,0)
for(;z=this.d,x<z.length;++x)z[x]=V.cO()}z=this.e
x=z.length
y=this.r
if(x<y){y=new Array(Math.max(x*2,y))
y.fixed$length=Array
y=H.f(y,[V.bQ])
this.e=y
C.d.W(y,0,x,z,0)
for(;z=this.e,x<z.length;++x)z[x]=V.cP()}this.b=a.d
this.c=a.e
this.f=a.b
for(x=0;x<this.r;++x){w=this.f[x]
v=w.f
u=w.r
t=v.d
s=u.d
r=t.b
q=s.b
p=v.c
o=u.c
n=w.z
m=n.e
l=this.e[x]
l.Q=w.cx
l.ch=w.cy
l.cx=w.db
z=p.c
l.e=z
y=o.c
l.f=y
k=p.fx
l.r=k
j=o.fx
l.x=j
i=p.go
l.y=i
h=o.go
l.z=h
l.db=x
l.cy=m
g=l.d.a
g[0]=0
g[1]=0
g[2]=0
g[3]=0
g=l.c.a
g[0]=0
g[1]=0
g[2]=0
g[3]=0
f=this.d[x]
f.d=z
f.e=y
f.f=k
f.r=j
j=f.x
e=p.f.a.a
j=j.a
j[1]=e[1]
j[0]=e[0]
j=f.y
e=o.f.a.a
j=j.a
j[1]=e[1]
j[0]=e[0]
f.z=i
f.Q=h
e=n.b.a
h=f.b.a
h[1]=e[1]
h[0]=e[0]
e=n.c.a
h=f.c.a
h[1]=e[1]
h[0]=e[0]
f.db=m
f.cx=r
f.cy=q
f.ch=n.d
for(z=n.a,d=0;d<m;++d){c=z[d]
b=l.a[d]
y=this.a
if(y.f){y=y.c
b.c=y*c.b
b.d=y*c.c}else{b.c=0
b.d=0}y=b.a.a
y[0]=0
y[1]=0
y=b.b.a
y[0]=0
y[1]=0
b.e=0
b.f=0
b.r=0
y=f.a[d]
k=c.a.a
j=k[0]
y=y.a
y[0]=j
y[1]=k[1]}}},
fV:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
for(z=0;z<this.r;++z){y=this.e[z]
x=y.e
w=y.f
v=y.r
u=y.y
t=y.x
s=y.z
r=y.cy
q=this.c[x].gN()
p=this.c[x].gK()
o=this.c[w].gN()
n=this.c[w].gK()
m=y.b.a
l=m[1]
k=-1*m[0]
for(j=q.a,i=o.a,h=0;h<r;++h){g=y.a[h]
f=g.d
e=m[0]
d=g.c
c=l*f+e*d
b=k*f+m[1]*d
d=g.a.a
p-=u*(d[0]*b-d[1]*c)
j[0]=j[0]-c*v
j[1]=j[1]-b*v
d=g.b.a
n+=s*(d[0]*b-d[1]*c)
i[0]=i[0]+c*t
i[1]=i[1]+b*t}this.c[x].sK(p)
this.c[w].sK(n)}},
cS:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2
for(z=this.z,y=z.b,x=this.x,w=x.b,v=this.y,u=v.b,t=x.a.a,s=v.a.a,r=z.a.a,q=0;q<this.r;++q){p=this.e[q]
o=this.d[q]
n=o.cx
m=o.cy
l=this.f[p.db].z
k=p.e
j=p.f
i=p.r
h=p.x
g=p.y
f=p.z
e=o.x
d=o.y
c=this.b[k].gA()
b=this.b[k].gE()
a=this.c[k].gN()
a0=this.c[k].gK()
a1=this.b[j].gA()
a2=this.b[j].gE()
a3=this.c[j].gN()
a4=this.c[j].gK()
w.a=Math.sin(b)
w.b=Math.cos(b)
u.a=Math.sin(a2)
a5=Math.cos(a2)
u.b=a5
a6=c.a
a7=a6[0]
a8=w.b
a9=e.a
b0=a9[0]
b1=w.a
t[0]=a7-(a8*b0-b1*a9[1])
t[1]=a6[1]-(b1*a9[0]+a8*a9[1])
a9=a1.a
a8=a9[0]
b1=d.a
b0=b1[0]
a7=u.a
s[0]=a8-(a5*b0-a7*b1[1])
s[1]=a9[1]-(a7*b1[0]+a5*b1[1])
z.fk(0,l,x,n,v,m)
b1=p.b.a
b1[0]=r[0]
b1[1]=r[1]
b2=p.cy
for(a5=-$.ju,a7=a3.a,a8=-a4,b0=a.a,b3=-a0,b4=i+h,b5=0;b5<b2;++b5){b6=p.a[b5]
b7=y[b5]
b8=b6.a
b9=b6.b
c0=b7.a
c1=b8.a
c1[0]=c0[0]-a6[0]
c1[1]=c0[1]-a6[1]
c2=b9.a
c2[0]=c0[0]-a9[0]
c2[1]=c0[1]-a9[1]
c0=c1[0]
c3=b1[1]
c1=c1[1]
c4=b1[0]
c5=c0*c3-c1*c4
c6=c2[0]
c2=c2[1]
c7=c6*c3-c2*c4
c8=b4+g*c5*c5+f*c7*c7
b6.e=c8>0?1/c8:0
c9=-1*c4
d0=c0*c9-c1*c3
d1=c6*c9-c2*c3
d2=b4+g*d0*d0+f*d1*d1
b6.f=d2>0?1/d2:0
b6.r=0
d3=c4*(a7[0]+a8*c2-b0[0]-b3*c1)+c3*(a7[1]+a4*c6-b0[1]-a0*c0)
if(d3<a5)b6.r=-p.ch*d3}if(p.cy===2){a5=p.a
d4=a5[0]
d5=a5[1]
a5=d4.a.a
a6=a5[0]
a7=b1[1]
a5=a5[1]
b1=b1[0]
d6=a6*a7-a5*b1
a5=d4.b.a
d7=a5[0]*a7-a5[1]*b1
a5=d5.a.a
d8=a5[0]*a7-a5[1]*b1
a5=d5.b.a
d9=a5[0]*a7-a5[1]*b1
b1=g*d6
a5=f*d7
e0=b4+b1*d6+a5*d7
e1=b4+g*d8*d8+f*d9*d9
e2=b4+b1*d8+a5*d9
if(e0*e0<100*(e0*e1-e2*e2)){a5=p.d
a6=a5.a
a6[3]=e1
a6[2]=e2
a6[1]=e2
a6[0]=e0
a6=p.c
a6.i(a5)
a6.fq()}else p.cy=1}}},
c9:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0
for(z=0;z<this.r;++z){y=this.e[z]
x=y.e
w=y.f
v=y.r
u=y.x
t=y.y
s=y.z
r=y.cy
q=this.c[x].gN()
p=this.c[x].gK()
o=this.c[w].gN()
n=this.c[w].gK()
m=y.b.a
l=m[0]
m=m[1]
k=-1*l
j=y.Q
for(i=o.a,h=q.a,g=0;g<r;++g){f=y.a[g]
e=f.a
d=f.b.a
c=d[1]
b=i[0]
a=h[0]
a0=e.a
a1=a0[1]
a2=d[0]
a3=i[1]
a4=h[1]
a5=a0[0]
a6=y.cx
a7=f.f
a8=j*f.c
a9=f.d
a6=Math.max(-a8,Math.min(a9+a7*-((-n*c+b-a+p*a1)*m+(n*a2+a3-a4-p*a5)*k-a6),a8))
b0=a6-a9
f.d=a6
b1=m*b0
b2=k*b0
h[0]=a-b1*v
h[1]=a4-b2*v
p-=t*(a0[0]*b2-a0[1]*b1)
i[0]=i[0]+b1*u
i[1]=i[1]+b2*u
n+=s*(d[0]*b2-d[1]*b1)}d=y.cy
c=-n
b=y.a
if(d===1){f=b[0]
d=f.b.a
b=d[1]
a=i[0]
a0=h[0]
a1=f.a.a
a2=a1[1]
a3=d[0]
a4=i[1]
a5=h[1]
a6=a1[0]
a7=f.e
a9=f.r
b3=f.c
e=b3+-a7*((c*b+a-a0+p*a2)*l+(n*a3+a4-a5-p*a6)*m-a9)
b4=e>0?e:0
b0=b4-b3
f.c=b4
b1=l*b0
b2=m*b0
h[0]=a0-b1*v
h[1]=a5-b2*v
p-=t*(a1[0]*b2-a1[1]*b1)
i[0]=i[0]+b1*u
i[1]=i[1]+b2*u
n+=s*(d[0]*b2-d[1]*b1)}else{b5=b[0]
b6=b[1]
b7=b5.a
b8=b5.b
b9=b6.a
c0=b6.b
c1=b5.c
c2=b6.c
d=b8.a
b=d[1]
a=i[0]
a0=h[0]
a1=b7.a
a2=a1[1]
a3=d[0]
a4=i[1]
a5=h[1]
a6=a1[0]
a7=c0.a
a9=a7[1]
b3=b9.a
c3=b3[1]
c4=a7[0]
c5=b3[0]
c6=b5.r
c7=b6.r
c8=y.d.a
c9=c8[0]
d0=c8[2]
d1=(c*b+a-a0+p*a2)*l+(n*a3+a4-a5-p*a6)*m-c6-(c9*c1+d0*c2)
c9=c8[1]
d2=(c*a9+a-a0+p*c3)*l+(n*c4+a4-a5-p*c5)*m-c7-(c9*c1+c8[3]*c2)
$loop$1:{c=y.c.a
b=c[0]
d3=(b*d1+c[2]*d2)*-1
d4=(c[1]*d1+c[3]*d2)*-1
if(d3>=0&&d4>=0){d5=d3-c1
d6=d4-c2
d7=d5*l
d8=d5*m
d9=d6*l
e0=d6*m
m=d7+d9
h[0]=a0-v*m
a0=d8+e0
h[1]=a5-v*a0
i[0]=i[0]+u*m
i[1]=i[1]+u*a0
p-=t*(a1[0]*d8-a1[1]*d7+(b3[0]*e0-b3[1]*d9))
n+=s*(d[0]*d8-d[1]*d7+(a7[0]*e0-a7[1]*d9))
b5.c=d3
b6.c=d4
break $loop$1}d3=-b5.e*d1
if(d3>=0&&c9*d3+d2>=0){d5=d3-c1
d6=0-c2
d7=l*d5
d8=m*d5
d9=l*d6
e0=m*d6
m=d7+d9
h[0]=a0-v*m
a0=d8+e0
h[1]=a5-v*a0
i[0]=i[0]+u*m
i[1]=i[1]+u*a0
p-=t*(a1[0]*d8-a1[1]*d7+(b3[0]*e0-b3[1]*d9))
n+=s*(d[0]*d8-d[1]*d7+(a7[0]*e0-a7[1]*d9))
b5.c=d3
b6.c=0
break $loop$1}d4=-b6.e*d2
if(d4>=0&&d0*d4+d1>=0){d5=0-c1
d6=d4-c2
d7=l*d5
d8=m*d5
d9=l*d6
e0=m*d6
m=d7+d9
h[0]=a0-v*m
a0=d8+e0
h[1]=a5-v*a0
i[0]=i[0]+u*m
i[1]=i[1]+u*a0
p-=t*(a1[0]*d8-a1[1]*d7+(b3[0]*e0-b3[1]*d9))
n+=s*(d[0]*d8-d[1]*d7+(a7[0]*e0-a7[1]*d9))
b5.c=0
b6.c=d4
break $loop$1}if(d1>=0&&d2>=0){d5=0-c1
d6=0-c2
d7=l*d5
d8=m*d5
d9=l*d6
e0=m*d6
m=d7+d9
h[0]=a0-v*m
a0=d8+e0
h[1]=a5-v*a0
i[0]=i[0]+u*m
i[1]=i[1]+u*a0
p-=t*(a1[0]*d8-a1[1]*d7+(b3[0]*e0-b3[1]*d9))
n+=s*(d[0]*d8-d[1]*d7+(a7[0]*e0-a7[1]*d9))
b5.c=0
b6.c=0
break $loop$1}break $loop$1}}this.c[x].sK(p)
this.c[w].sK(n)}},
dN:function(){var z,y,x,w,v,u
for(z=0;z<this.r;++z){y=this.e[z]
for(x=this.f[y.db].z.a,w=0;w<y.cy;++w){v=x[w]
u=y.a[w]
v.b=u.c
v.c=u.d}}},
dw:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0
for(z=this.x,y=z.b,x=this.y,w=x.b,v=z.a.a,u=x.a.a,t=this.Q,s=t.b.a,r=t.a.a,q=0,p=0;p<this.r;++p){o=this.d[p]
n=o.d
m=o.e
l=o.f
k=o.z
j=o.x.a
i=j[0]
j=j[1]
h=o.r
g=o.Q
f=o.y.a
e=f[0]
f=f[1]
d=o.db
c=this.b[n].gA()
b=this.b[n].gE()
a=this.b[m].gA()
a0=this.b[m].gE()
for(a1=c.a,a2=a.a,a3=l+h,a4=0;a4<d;++a4){y.a=Math.sin(b)
y.b=Math.cos(b)
w.a=Math.sin(a0)
a5=Math.cos(a0)
w.b=a5
a6=a1[0]
a7=y.b
a8=y.a
v[0]=a6-a7*i+a8*j
v[1]=a1[1]-a8*i-a7*j
a7=a2[0]
a8=w.a
u[0]=a7-a5*e+a8*f
u[1]=a2[1]-a8*e-a5*f
t.cR(0,o,z,x,a4)
a9=t.c
a5=s[0]
a8=a1[0]
b0=a5-a8
a7=s[1]
a6=a1[1]
b1=a7-a6
b2=a5-a2[0]
b3=a7-a2[1]
q=Math.min(q,a9)
a7=Math.max(-0.2,Math.min(0.2*(a9+0.005),0))
a5=r[1]
b4=r[0]
b5=b0*a5-b1*b4
b6=b2*a5-b3*b4
b7=a3+k*b5*b5+g*b6*b6
b8=b7>0?-a7/b7:0
b9=b4*b8
c0=a5*b8
a1[0]=a8-b9*l
a1[1]=a6-c0*l
b-=k*(b0*c0-b1*b9)
a2[0]=a2[0]+b9*h
a2[1]=a2[1]+c0*h
a0+=g*(b2*c0-b3*b9)}this.b[n].sE(b)
this.b[m].sE(a0)}return q>=-0.015},
dG:function(c3,c4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2
for(z=this.x,y=z.b,x=this.y,w=x.b,v=z.a.a,u=x.a.a,t=this.Q,s=t.b.a,r=t.a.a,q=0,p=0;p<this.r;++p){o=this.d[p]
n=o.d
m=o.e
l=o.x
k=o.y
j=l.a
i=j[0]
j=j[1]
h=k.a
g=h[0]
h=h[1]
f=o.db
if(n===c3||n===c4){e=o.f
d=o.z}else{e=0
d=0}if(m===c3||m===c4){c=o.r
b=o.Q}else{c=0
b=0}a=this.b[n].gA()
a0=this.b[n].gE()
a1=this.b[m].gA()
a2=this.b[m].gE()
for(a3=a.a,a4=a1.a,a5=e+c,a6=0;a6<f;++a6){y.a=Math.sin(a0)
y.b=Math.cos(a0)
w.a=Math.sin(a2)
a7=Math.cos(a2)
w.b=a7
a8=a3[0]
a9=y.b
b0=y.a
v[0]=a8-a9*i+b0*j
v[1]=a3[1]-b0*i-a9*j
a9=a4[0]
b0=w.a
u[0]=a9-a7*g+b0*h
u[1]=a4[1]-b0*g-a7*h
t.cR(0,o,z,x,a6)
b1=t.c
a7=s[0]
b0=a3[0]
b2=a7-b0
a9=s[1]
a8=a3[1]
b3=a9-a8
b4=a7-a4[0]
b5=a9-a4[1]
q=Math.min(q,b1)
a9=Math.max(-0.2,Math.min(0.75*(b1+0.005),0))
a7=r[1]
b6=r[0]
b7=b2*a7-b3*b6
b8=b4*a7-b5*b6
b9=a5+d*b7*b7+b*b8*b8
c0=b9>0?-a9/b9:0
c1=b6*c0
c2=a7*c0
a3[0]=b0-c1*e
a3[1]=a8-c2*e
a0-=d*(b2*c2-b3*c1)
a4[0]=a4[0]+c1*c
a4[1]=a4[1]+c2*c
a2+=b*(b4*c2-b5*c1)}this.b[n].sE(a0)
this.b[m].sE(a2)}return q>=-0.0075},
dX:function(){var z,y
z=new Array(256)
z.fixed$length=Array
this.d=H.f(z,[V.bP])
z=new Array(256)
z.fixed$length=Array
this.e=H.f(z,[V.bQ])
for(y=0;y<256;++y){this.d[y]=V.cO()
this.e[y]=V.cP()}},
q:{
bd:function(){var z=new V.f2(null,null,null,null,null,null,0,G.q(),G.q(),V.i0(),new V.hp(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0))
z.dX()
return z}}},
hp:{"^":"c;a,b,c",
cR:function(a,b,c,d,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=c.b
y=d.b
x=b.a
w=x[a0]
switch(b.ch){case C.m:v=x[0]
x=z.b
u=b.c.a
t=u[0]
s=z.a
u=u[1]
r=c.a.a
q=x*t-s*u+r[0]
p=s*t+x*u+r[1]
r=y.b
u=v.a
x=u[0]
t=y.a
u=u[1]
s=d.a.a
o=r*x-t*u+s[0]
n=t*x+r*u+s[1]
s=this.a
u=o-q
r=s.a
r[0]=u
x=n-p
r[1]=x
s.U()
s=this.b.a
s[0]=(q+o)*0.5
s[1]=(p+n)*0.5
this.c=u*r[0]+x*r[1]-b.cx-b.cy
break
case C.i:x=z.b
u=b.b.a
t=u[0]
s=z.a
r=this.a.a
r[0]=x*t-s*u[1]
r[1]=s*u[0]+x*u[1]
u=b.c.a
t=u[0]
u=u[1]
m=c.a.a
l=m[0]
m=m[1]
k=y.b
j=w.a
i=j[0]
h=y.a
j=j[1]
g=d.a.a
f=k*i-h*j+g[0]
e=h*i+k*j+g[1]
this.c=(f-(x*t-s*u+l))*r[0]+(e-(s*t+x*u+m))*r[1]-b.cx-b.cy
r=this.b.a
r[0]=f
r[1]=e
break
case C.q:x=y.b
u=b.b.a
t=u[0]
s=y.a
r=this.a.a
r[0]=x*t-s*u[1]
r[1]=s*u[0]+x*u[1]
u=b.c.a
t=u[0]
u=u[1]
m=d.a.a
l=m[0]
m=m[1]
k=z.b
j=w.a
i=j[0]
h=z.a
j=j[1]
g=c.a.a
f=k*i-h*j+g[0]
e=h*i+k*j+g[1]
this.c=(f-(x*t-s*u+l))*r[0]+(e-(s*t+x*u+m))*r[1]-b.cx-b.cy
m=this.b.a
m[0]=f
m[1]=e
r[0]=r[0]*-1
r[1]=r[1]*-1
break}}},
e5:{"^":"c;a,b,c,d,e,f,r"},
bQ:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
dY:function(){var z,y,x
for(z=this.a,y=0;y<2;++y){x=new Float64Array(2)
z[y]=new V.e5(new E.a(x),new E.a(new Float64Array(2)),0,0,0,0,0)}},
q:{
cP:function(){var z=new V.bQ(H.f(new Array(2),[V.e5]),new E.a(new Float64Array(H.b(2))),new E.ak(new Float64Array(H.b(4))),new E.ak(new Float64Array(H.b(4))),0,0,0,0,0,0,0,0,0,0,0)
z.dY()
return z}}},
bf:{"^":"a8;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
aa:function(a,b,c,d){this.b5(a,b,c,d)},
a3:function(a,b,c){this.dx.fr.cJ(a,H.z(this.f.d,"$isay"),b,this.r.d,c)}},
bg:{"^":"a8;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
aa:function(a,b,c,d){this.b5(a,b,c,d)},
a3:function(a,b,c){var z,y,x
z=this.dx.fr
y=H.z(this.f.d,"$isay")
x=H.z(this.r.d,"$isaD")
z.k3.cI(a,y,b,x,c)}},
bm:{"^":"a8;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
a3:function(a,b,c){this.dx.fr.eN(a,H.z(this.f.d,"$isaD"),b,this.r.d,c)}},
bn:{"^":"a8;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
a3:function(a,b,c){this.dx.fr.eO(a,H.z(this.f.d,"$isaD"),b,H.z(this.r.d,"$isaD"),c)}},
c7:{"^":"c;A:a<,E:b@"},
ch:{"^":"c;N:a<,K:b@"},
bi:{"^":"c;a,b,c"},
fq:{"^":"c;a,b,c,d,e,f,r,x,y,z,an:Q<,ch,cx,cy",
eS:function(a,b){var z,y,x,w,v,u
this.Q=b.b
this.e=b.c
this.f=b.d
this.c=a
this.b=null
z=this.y
y=b.r
z.a=y.a
z.b=y.b
z.c=y.c
this.z=!1
y=b.a
y.toString
z=new Float64Array(H.b(2))
x=new V.bN(new E.a(z),C.h,0)
w=y.c.a
z[0]=w[0]
z[1]=w[1]
x.b=y.b
this.d=x
if(this.r==null){z=new Array(1)
z.fixed$length=Array
this.r=H.f(z,[V.bj])
for(v=0;v<1;++v){z=this.r
y=new Float64Array(2)
z[v]=new V.bj(new V.a6(new E.a(y),new E.a(new Float64Array(2))),null,0,0)
this.r[v].scO(null)
this.r[v].sbk(-1)}}z=this.r
y=z.length
if(y<1){u=Math.max(y*2,1)
w=new Array(u)
w.fixed$length=Array
w=H.f(w,[V.bj])
this.r=w
C.d.W(w,0,y,z,0)
for(v=0;v<u;++v){z=this.r
y=new Float64Array(2)
z[v]=new V.bj(new V.a6(new E.a(y),new E.a(new Float64Array(2))),null,0,0)
this.r[v].scO(null)
this.r[v].sbk(-1)}}this.x=0
this.a=b.e},
eU:function(a,b){var z,y,x,w,v,u,t,s,r
this.d.toString
this.x=1
for(z=a.a,y=0;y<this.x;++y){x=this.r[y]
w=this.d
v=x.a
w.bG(v,b,y)
u=z.cf()
t=u.f
s=u.a
w=v.a.a
r=s.a.a
r[0]=w[0]-0.1
r[1]=w[1]-0.1
v=v.b.a
w=s.b.a
w[0]=v[0]+0.1
w[1]=v[1]+0.1
u.b=x
z.ct(t);++a.b
a.cH(t)
x.d=t
x.b=this
x.c=y}},
dU:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(this.x===0)return
for(z=this.cy,y=c.a.a,x=b.a.a,w=z.a,v=a.a,u=this.ch,t=this.cx,s=u.a.a,r=u.b.a,q=0;q<this.x;++q){p=this.r[q]
this.d.bG(u,b,p.c)
this.d.bG(t,c,p.c)
o=p.a
n=s[0]
m=t.a.a
l=m[0]
n=n<l?n:l
l=o.a.a
l[0]=n
n=s[1]
m=m[1]
l[1]=n<m?n:m
n=r[0]
m=t.b.a
l=m[0]
n=n>l?n:l
l=o.b.a
l[0]=n
n=r[1]
m=m[1]
l[1]=n>m?n:m
w[0]=y[0]-x[0]
w[1]=y[1]-x[1]
n=p.d
if(v.fu(n,o,z))a.cH(n)}}},
bU:{"^":"c;a,an:b<,c,d,e,f,r"},
bj:{"^":"c;ar:a<,cO:b?,c,bk:d@"},
d4:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr",
aa:function(a,b,c,d){var z,y,x
this.z=a
this.Q=b
this.ch=c
this.r=0
this.y=0
this.x=0
this.a=d
z=this.b
if(z==null||a>z.length)this.b=H.f(new Array(a),[V.b6])
z=this.d
if(z==null||this.ch>z.length)this.d=H.f(new Array(this.ch),[V.fM])
z=this.c
if(z==null||this.Q>z.length)this.c=H.f(new Array(this.Q),[V.a8])
y=this.f
z=y==null
if(z||this.z>y.length){if(z)y=H.f(new Array(0),[V.ch])
z=new Array(this.z)
z.fixed$length=Array
z=H.f(z,[V.ch])
this.f=z
x=y.length
C.d.W(z,0,x,y,0)
for(;z=this.f,x<z.length;++x)z[x]=new V.ch(new E.a(new Float64Array(2)),0)}y=this.e
z=y==null
if(z||this.z>y.length){if(z)y=H.f(new Array(0),[V.c7])
z=new Array(this.z)
z.fixed$length=Array
z=H.f(z,[V.c7])
this.e=z
x=y.length
C.d.W(z,0,x,y,0)
for(;z=this.e,x<z.length;++x)z[x]=new V.c7(new E.a(new Float64Array(2)),0)}},
dn:function(a1,a2,a3,a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
z=a2.a
for(y=a3.a,x=0;x<this.r;++x){w=this.b[x]
v=w.f
u=v.e
t=w.r
s=w.x
r=v.c.a
q=v.b.a
q[1]=r[1]
q[0]=r[0]
v.d=u
if(w.a===C.f){q=t.a
p=q[0]
o=w.k2
n=y[0]
m=w.fx
l=w.y.a
q[0]=p+z*(o*n+m*l[0])
q[1]=q[1]+z*(o*y[1]+m*l[1])
l=w.go
m=w.z
o=q[0]
n=1/(1+z*w.id)
q[0]=o*n
q[1]=q[1]*n
s=(s+z*l*m)*(1/(1+z*w.k1))}J.bG(this.e[x].gA(),r[0])
J.bH(this.e[x].gA(),r[1])
this.e[x].sE(u)
q=t.a
this.f[x].gN().a[0]=q[0]
this.f[x].gN().a[1]=q[1]
this.f[x].sK(s)}y=this.cy
y.a=a2
q=this.e
y.b=q
p=this.f
y.c=p
o=this.db
o.a=a2
o.b=this.c
o.c=this.y
o.d=q
o.e=p
p=this.cx
p.cQ(o)
p.cS()
if(a2.f)p.fV()
for(x=0;x<this.x;++x)this.d[x].hm(y)
for(x=0;x<a2.d;++x){for(k=0;k<this.x;++k)this.d[k].h7(y)
p.c9()}p.dN()
for(x=0;x<this.r;++x){j=this.e[x].gA()
u=this.e[x].gE()
t=this.f[x].gN()
s=this.f[x].gK()
q=t.a
i=q[0]*z
h=q[1]*z
o=i*i+h*h
if(o>4){g=2/Math.sqrt(o)
q[0]=q[0]*g
q[1]=q[1]*g}f=z*s
if(f*f>2.4674011002723395)s*=1.5707963267948966/Math.abs(f)
o=j.a
o[0]=o[0]+z*q[0]
o[1]=o[1]+z*q[1]
this.e[x].sE(u+z*s)
this.f[x].sK(s)}x=0
while(!0){if(!(x<a2.e)){e=!1
break}d=p.dw()
for(c=!0,k=0;k<this.x;++k){b=this.d[k].h6(y)
c=c&&b}if(d&&c){e=!0
break}++x}for(x=0;x<this.r;++x){a=this.b[x]
y=a.f
q=y.c.a
q[0]=J.aM(this.e[x].gA())
q[1]=J.aN(this.e[x].gA())
y.e=this.e[x].gE()
y=a.r.a
y[0]=this.f[x].gN().a[0]
y[1]=this.f[x].gN().a[1]
a.x=this.f[x].gK()
a.aA()}this.d0(p.e)
if(a4){for(a0=17976931348623157e292,x=0;x<this.r;++x){w=this.b[x]
if(w.a===C.e)continue
if((w.b&4)!==0){y=w.x
if(!(y*y>0.0012184696791468343)){y=w.r
y=y.v(y)>0.0001}else y=!0}else y=!0
if(y){w.k3=0
a0=0}else{y=w.k3+=z
a0=Math.min(a0,y)}}if(a0>=0.5&&e)for(x=0;x<this.r;++x)this.b[x].Y(!1)}},
dF:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
for(z=0;z<this.r;++z){J.bG(this.e[z].gA(),this.b[z].f.c.a[0])
J.bH(this.e[z].gA(),this.b[z].f.c.a[1])
this.e[z].sE(this.b[z].f.e)
this.f[z].gN().a[0]=this.b[z].r.a[0]
y=this.f[z].gN()
x=this.b
y.a[1]=x[z].r.a[1]
this.f[z].sK(x[z].x)}y=this.dy
y.b=this.c
y.c=this.y
y.a=a
y.d=this.e
y.e=this.f
x=this.dx
x.cQ(y)
for(z=0;z<a.e;++z)if(x.dG(b,c))break
this.b[b].f.b.a[0]=J.aM(this.e[b].gA())
this.b[b].f.b.a[1]=J.aN(this.e[b].gA())
this.b[b].f.d=this.e[b].gE()
this.b[c].f.b.i(this.e[c].gA())
this.b[c].f.d=this.e[c].gE()
x.cS()
for(z=0;z<a.d;++z)x.c9()
w=a.a
for(z=0;z<this.r;++z){v=this.e[z].gA()
u=this.e[z].gE()
t=this.f[z].gN()
s=this.f[z].gK()
y=t.a
r=y[0]*w
q=y[1]*w
p=r*r+q*q
if(p>4){o=2/Math.sqrt(p)
y[1]=y[1]*o
y[0]=y[0]*o}n=w*s
if(n*n>2.4674011002723395)s*=1.5707963267948966/Math.abs(n)
p=v.a
p[0]=p[0]+y[0]*w
p[1]=p[1]+y[1]*w
u+=w*s
J.bG(this.e[z].gA(),p[0])
J.bH(this.e[z].gA(),p[1])
this.e[z].sE(u)
this.f[z].gN().a[0]=y[0]
this.f[z].gN().a[1]=y[1]
this.f[z].sK(s)
m=this.b[z]
l=m.f
k=l.c.a
k[0]=p[0]
k[1]=p[1]
l.e=u
l=m.r.a
l[0]=y[0]
l[1]=y[1]
m.x=s
m.aA()}this.d0(x.e)},
d0:function(a){return}},
fM:{"^":"c;"},
aU:{"^":"c;a,b",
k:function(a){return this.b}},
Y:{"^":"c;a,b,c,d,e",
a5:function(a){this.a=this.a*0.95+a*0.05
this.b=this.b*0.8+a*0.2
this.c=Math.min(a,this.c)
this.d=Math.max(a,this.d)},
k:function(a){return H.d(this.b)+" ("+H.d(this.a)+") ["+H.d(this.c)+","+H.d(this.d)+"]"}},
hr:{"^":"c;a,b,c,d,e,f,r,x,y,z"},
dz:{"^":"c;a,b,c"},
dL:{"^":"c;a,b,c,d,e,f"},
hZ:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,cL,ak,bK,aG,bd,be,bf,bL,bM,bN,bO,bg,bh,bi,al,aS,cM",
aq:function(a,b,c){var z,y,x,w,v
z=new V.bc(null,!1)
z.a=a
z.b=!0
y=this.fy
x=b.a
w=c.a
y[x][w]=z
if(b!==c){v=new V.bc(null,!1)
v.a=a
y[w][x]=v}},
es:function(){var z=this.ch
this.aq(z.ch,C.h,C.h)
this.aq(z.cx,C.l,C.h)
this.aq(z.Q,C.l,C.l)
this.aq(z.cy,C.n,C.h)
this.aq(z.db,C.n,C.l)
this.aq(z.dx,C.r,C.h)
this.aq(z.dy,C.r,C.l)},
fz:function(a,b,c,d){var z,y,x,w,v,u
z=a.d.a
y=c.d.a
x=this.fy[z.a][y.a]
if(x!=null){w=x.b
v=x.a
if(w){u=v.cX()
u.aa(a,b,c,d)
return u}else{u=v.cX()
u.aa(c,d,a,b)
return u}}else return},
aN:function(a){var z,y,x,w,v,u,t,s,r
if((this.a&2)===2)return
z=G.q()
y=G.q()
x=new E.a(new Float64Array(H.b(2)))
w=new E.a(new Float64Array(H.b(2)))
v=new E.a(new Float64Array(H.b(2)))
u=new G.an(x,w,v,0,0,0)
t=new E.a(new Float64Array(H.b(2)))
s=new E.a(new Float64Array(H.b(2)))
r=new V.b6(C.e,0,0,z,y,u,t,0,s,0,this,null,null,null,0,null,null,0,0,0,0,0,0,0,0,null,new V.bU(null,null,0.2,0,0,!1,new V.bi(1,65535,0)),new V.fX(0,new E.a(new Float64Array(H.b(2))),0),G.q())
if(a.ch){r.b=8
y=8}else y=0
y|=4
r.b=y
y|=2
r.b=y
r.b=y|32
y=z.a
y.i(a.c)
z.b.bn(a.d)
x.M()
w.i(y)
v.i(y)
y=a.d
u.d=y
u.e=y
u.f=0
t.i(a.e)
r.x=a.f
r.id=a.r
r.k1=a.x
r.k2=a.cy
s.M()
s=a.a
r.a=s
if(s===C.f){r.fr=1
r.fx=1}r.k4=a.b
z=this.c
r.cx=z
if(z!=null)z.ch=r
this.c=r;++this.e
return r},
eK:function(){var z,y
for(z=this.c;z!=null;z=z.cx){y=z.y.a
y[0]=0
y[1]=0
z.z=0}},
f1:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
z=this.Q
if(z==null)return
y=z.a
x=(y&128)!==0
if((y&2)!==0){for(w=this.c,z=this.k2,v=this.k3,u=v.a.a,t=v.b;w!=null;w=w.cx){s=w.d
r=s.a.a
u[1]=r[1]
u[0]=r[0]
s=s.b
t.a=s.a
t.b=s.b
for(q=w.cy;q!=null;q=q.b){s=w.b
if((s&32)!==32){z.a6(0.5,0.5,0.3)
this.aQ(q,v,z,x)}else{p=w.a
if(p===C.e){z.a6(0.5,0.9,0.3)
this.aQ(q,v,z,x)}else if(p===C.D){z.a6(0.5,0.5,0.9)
this.aQ(q,v,z,x)}else if((s&2)!==2){z.a6(0.5,0.5,0.5)
this.aQ(q,v,z,x)}else{z.a6(0.9,0.7,0.7)
this.aQ(q,v,z,x)}}}}z=this.fx
v=this.Q.a
o=z.z
if(o!==0){n=z.r/2
m=z.cy.a
l=z.fx.a!=null?z.d9():null
z=this.Q
if((v&128)!==0)z.f3(m,n,l,o)
else z.f2(m,n,l,o)}}if((y&4)!==0)for(k=this.d,z=this.ch.a,v=this.k2,u=z.a;!1;k=k.b2()){j=k.fZ()
i=k.h_()
h=j.gbB()
g=i.gbB()
f=h.gbj()
e=g.gbj()
t=z.b
s=t+1
z.b=s
t=u[t]
z.b=s+1
s=u[s]
k.fX(t)
k.fY(s)
v.a6(0.5,0.8,0.8)
switch(k.h2()){case C.W:this.Q.Z(t,s,v)
break
case C.X:d=k.h0()
c=k.h1()
this.Q.Z(d,t,v)
this.Q.Z(c,s,v)
this.Q.Z(d,c,v)
break
case C.Z:this.Q.Z(f,e,v)
break
case C.V:case C.Y:break
default:this.Q.Z(f,t,v)
this.Q.Z(t,s,v)
this.Q.Z(e,s,v)}z.b-=2}if((y&16)!==0){z=this.k2
z.a6(0.3,0.9,0.9)
for(b=this.b.b,v=this.k4,u=this.r1;b!=null;b=b.c){a=b.f
a0=b.r
t=b.x
a.r[t].gar().bY(v)
t=b.y
a0.r[t].gar().bY(u)
this.Q.Z(v,u,z)}}if((y&8)!==0){z=this.k2
z.a6(0.9,0.3,0.9)
for(w=this.c,v=this.r2,u=v.a;w!=null;w=w.cx){if((w.b&32)!==32)continue
for(q=w.cy;q!=null;q=q.b)for(a1=0;a1<q.x;++a1){a2=q.r[a1]
t=this.b.a
s=a2.d
a3=t.a.b[s].gar()
if(!u.aM(4))u.l(0,4,v.c0(4))
t=u.h(0,4)
s=J.A(t)
p=a3.a.a
s.h(t,0).b3(p[0],p[1])
a4=a3.b.a
s.h(t,1).b3(a4[0],p[1])
s.h(t,2).b3(a4[0],a4[1])
s.h(t,3).b3(p[0],a4[1])
a4=this.Q
a4.bc(t,4,z)
a4.c.stroke()}}}if((y&32)!==0)for(w=this.c,z=this.k3,v=z.a,u=v.a,z=z.b;w!=null;w=w.cx){t=w.d
r=t.a.a
u[1]=r[1]
u[0]=r[0]
t=t.b
z.a=t.a
z.b=t.b
r=w.f.c.a
u[1]=r[1]
u[0]=r[0]
t=this.Q
s=t.b
p=s.c
t=t.c
t.strokeStyle="rgba(255, 0, 0, 0.9)"
t.fillStyle="rgba(255, 0, 0, 0.8)"
s.ac(v,v)
t.beginPath()
t.arc(u[0],u[1],0.1*p,0,6.283185307179586,!0)
t.closePath()
t.stroke()}if((y&64)!==0)this.b.a.a.f4(this.Q)
this.Q.toString},
bq:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=this.fr
z.f.e=0
z.r.e=0
z.x.e=0
for(y=this.c;y!=null;y=y.cx){z=y.e
x=y.d
w=x.a.a
v=z.a.a
v[1]=w[1]
v[0]=w[0]
z=z.b
x=x.b
z.a=x.a
z.b=x.b}z=this.x2
x=this.e
v=this.b
z.aa(x,v.c,this.f,v.e)
for(y=this.c;y!=null;y=y.cx)y.b&=4294967294
for(u=this.b.b;u!=null;u=u.c)u.a&=4294967294
for(t=this.d;!1;t=t.gbb())t.scu(!1)
s=this.e
if(this.y1.length<s)this.y1=H.f(new Array(s),[V.b6])
for(r=this.c,x=this.r;r!=null;r=r.cx){v=r.b
if((v&1)===1)continue
if((v&2)!==2||(v&32)!==32)continue
if(r.a===C.e)continue
z.r=0
z.y=0
z.x=0
this.y1[0]=r
r.b=v|1
for(q=1;q>0;){--q
y=this.y1[q]
v=z.r
y.c=v
z.b[v]=y
z.r=v+1
y.Y(!0)
if(y.a===C.e)continue
for(p=y.dy;p!=null;p=p.d){o=p.b
v=o.a
if((v&1)===1)continue
if((v&4)!==4||(v&2)!==2)continue
o.f.z
o.r.z
z.c[z.y++]=o
o.a=v|1
n=p.a
v=n.b
if((v&1)===1)continue
m=q+1
this.y1[q]=n
n.b=v|1
q=m}for(l=y.dx;!1;l=l.gfv()){l.gcU().gcu()
n=l.gfw()
n.hn()
v=l.gcU()
z.d[z.x++]=v
l.gcU().scu(!0)
n.gcp().X(0,1)
m=q+1
this.y1[q]=n
n.scp(n.gcp().bm(0,1))
q=m}}z.dn(this.fr,a,x,this.x)
for(k=0;k<z.r;++k){y=z.b[k]
if(y.a===C.e)y.b&=4294967294}}z=this.fr.f
z.a5(z.e)
z=this.fr.r
z.a5(z.e)
z=this.fr.x
z.a5(z.e)
z=this.y2.a
x=z.b
z.a=x==null?$.r.$0():x
for(y=this.c;y!=null;y=y.cx){if((y.b&1)===0)continue
if(y.a===C.e)continue
y.cc()}x=this.b
x.a.bW(x)
x=this.fr.y
v=z.b
if(v==null)v=$.r.$0()
x.a5(C.b.ae((v-z.a)*1000,$.x))},
dE:function(b4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3
z=this.cL
z.aa(64,32,0,this.b.e)
if(this.dy){for(y=this.c;y!=null;y=y.cx){y.b&=4294967294
y.f.f=0}for(x=this.b.b;x!=null;x=x.c){x.a&=4294967262
x.Q=0
x.ch=1}}for(w=this.aG,v=this.bd,u=this.be,t=this.bf,s=this.bK,r=this.ak,q=r.a,p=r.b,o=r.c,n=r.d,m=this.ch;!0;){for(x=this.b.b,l=null,k=1;x!=null;x=x.c){j=x.a
if((j&4)!==4)continue
if(x.Q>8)continue
if((j&32)!==0)i=x.ch
else{h=x.f
g=x.r
h.z
g.z
f=h.c
e=g.c
d=f.a
c=e.a
j=f.b
b=(j&2)===2&&d!==C.e
a=e.b
a0=(a&2)===2&&c!==C.e
if(!b&&!a0)continue
a1=(j&8)===8||d!==C.f
a2=(a&8)===8||c!==C.f
if(!a1&&!a2)continue
j=f.f
a3=j.f
a=e.f
a4=a.f
if(a3<a4){j.as(a4)
a3=a4}else if(a4<a3)a.as(a3)
a5=x.x
a6=x.y
q.c6(h.d,a5)
p.c6(g.d,a6)
o.B(j)
n.B(a)
r.e=1
m.fx.fQ(s,r)
a7=s.b
i=s.a===C.A?Math.min(a3+(1-a3)*a7,1):1
x.ch=i
x.a|=32}if(i<k){k=i
l=x}}if(l==null||0.9999988079071045<k){this.dy=!0
break}h=l.f
g=l.r
f=h.c
e=g.c
j=f.f
u.B(j)
a=e.f
t.B(a)
f.as(k)
e.as(k)
l.bV(this.b.e)
a8=l.a&=4294967263;++l.Q
if((a8&4)!==4||(a8&2)!==2){l.a=a8&4294967291
j.B(u)
a.B(t)
f.aA()
e.aA()
continue}f.Y(!0)
e.Y(!0)
z.r=0
z.y=0
z.x=0
f.c=0
j=z.b
j[0]=f
z.r=1
e.c=1
j[1]=e
z.r=2
j=z.c
z.y=1
j[0]=l
f.b|=1
e.b|=1
l.a|=1
v[0]=f
v[1]=e
for(a9=0;a9<2;++a9){b0=v[a9]
if(b0.a===C.f)for(b1=b0.dy;b1!=null;b1=b1.d){if(z.r===z.z)break
if(z.y===z.Q)break
b2=b1.b
if((b2.a&1)!==0)continue
b3=b1.a
if(b3.a===C.f&&(b0.b&8)!==8&&(b3.b&8)!==8)continue
b2.f.z
b2.r.z
j=b3.f
u.B(j)
if((b3.b&1)===0)b3.as(k)
b2.bV(this.b.e)
a=b2.a
if((a&4)!==4){j.B(u)
b3.aA()
continue}if((a&2)!==2){j.B(u)
b3.aA()
continue}b2.a=a|1
z.c[z.y++]=b2
j=b3.b
if((j&1)!==0)continue
b3.b=j|1
if(b3.a!==C.e)b3.Y(!0)
j=z.r
b3.c=j
z.b[j]=b3
z.r=j+1}}j=(1-k)*b4.a
w.a=j
w.b=1/j
w.c=1
w.e=20
w.d=b4.d
w.f=!1
z.dF(w,f.c,e.c)
for(a9=0;a9<z.r;++a9){b0=z.b[a9]
b0.b&=4294967294
if(b0.a!==C.f)continue
b0.cc()
for(b1=b0.dy;b1!=null;b1=b1.d)b1.b.a&=4294967262}j=this.b
j.a.bW(j)}},
aQ:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=a.d
switch(z.a){case C.h:y=this.bh
G.m(b,z.c,y)
x=z.b
z=b.b
w=z.b
z=z.a
v=this.bi.a
v[0]=w
v[1]=z
z=c.a
w=this.Q
v=y.a
u=c.c
t=c.b
if(d){s=w.b
r=s.c
w=w.c
w.toString
w.strokeStyle="rgba("+z+", "+t+", "+u+", 0.9)"
u=c.a
t=c.b
z=c.c
w.fillStyle="rgba("+u+", "+t+", "+z+", 0.8)"
s.ac(y,y)
w.beginPath()
w.arc(v[0],v[1],x*r,0,6.283185307179586,!0)
w.closePath()
w.stroke()}else{s=w.b
r=s.c
w=w.c
w.toString
w.strokeStyle="rgba("+z+", "+t+", "+u+", 0.9)"
u=c.a
t=c.b
z=c.c
w.fillStyle="rgba("+u+", "+t+", "+z+", 0.8)"
s.ac(y,y)
w.beginPath()
w.arc(v[0],v[1],x*r,0,6.283185307179586,!0)
w.closePath()
w.fill("nonzero")}break
case C.l:H.z(z,"$isaD")
q=z.ga7()
y=this.cM
w=y.a
if(!w.aM(8))w.l(0,8,y.c0(8))
y=w.h(0,8)
for(w=J.A(y),p=0;C.b.C(p,q);++p)G.m(b,z.gao().h(0,p),w.h(y,p))
z=this.Q
if(d){z.bc(y,q,c)
z.c.stroke()}else{z.bc(y,q,c)
z=z.c
z.toString
z.fill("nonzero")}break
case C.n:H.z(z,"$isay")
y=this.al
G.m(b,z.c,y)
w=this.aS
G.m(b,z.d,w)
this.Q.Z(y,w,c)
break
case C.r:H.z(z,"$isbM")
o=z.gen()
n=z.gbD()
z=this.al
G.m(b,n.h(0,0),z)
for(y=this.aS,w=z.a,m=y.a,p=1;C.b.C(p,o);++p){G.m(b,n.h(0,p),y)
this.Q.Z(z,y,c)
v=this.Q
u=v.b
t=u.c
v=v.c
s=c.a
r=c.b
l=c.c
v.toString
v.strokeStyle="rgba("+s+", "+r+", "+l+", 0.9)"
l=c.a
r=c.b
s=c.c
v.fillStyle="rgba("+l+", "+r+", "+s+", 0.8)"
u.ac(z,z)
v.beginPath()
v.arc(w[0],w[1],0.05*t,0,6.283185307179586,!0)
v.closePath()
v.stroke()
w[1]=m[1]
w[0]=m[0]}break
default:break}},
q:{
i3:function(a,b){var z,y,x
z=H.f(new Array(a),[[P.j,V.bc]])
for(y=[V.bc],x=0;x<a;++x)z[x]=H.f(new Array(b),y)
return z}}},
i1:{"^":"c;a,b",
d2:function(a){var z=this.a.a.b[a].gan()
return this.b.hr(z.b)}},
i2:{"^":"c;a,b,c,d,e"},
c6:{"^":"c;a",
sE:function(a){this.a[3]=a},
gE:function(){return this.a[3]}},
hj:{"^":"c;a,b,c,d,an:e<"},
bl:{"^":"c;a,b,c"},
hi:{"^":"c;a,b"},
h7:{"^":"c;a,b,c"},
fd:{"^":"c;a,b,c,d,e"},
hU:{"^":"c;a,b"},
f3:{"^":"c;a,b,c"},
hA:{"^":"c;a,b,c,d,e,f"},
hk:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,cL,ak,bK,aG,bd,be,bf,bL,bM,bN,bO,bg,bh,bi,al,aS,cM,hg,aT,hh,hi,hj,hk,f5,f6,f7,f8,f9,fa,hl",
bT:function(a,b){var z,y,x,w,v
if(a==null){x=this.Q
w=new Array(x)
w.fixed$length=Array
a=w
for(z=0;J.cA(z,x);z=J.eC(z,1))try{J.eD(a,z,b.$0())}catch(v){y=H.S(v)
x="Exception "+H.d(y)
throw H.e(x)}}return a},
f_:function(a){var z,y
z=this.al
z.c3()
z.c3().h4(a)
for(y=a.gb7(),z=this.fy;y.C(0,a.gb9());y=y.p(0,1))C.c.l(z,y,null)
a.gby()
a.gby().sbb(a.gbb())
a.gbb()
a.gbb().sby(a.gby());--this.bK},
fU:function(a){var z,y,x,w,v,u,t,s
for(z=this.k2,y=this.x,x=0;w=this.id,x<w;++x){v=C.c.h(z,x)
u=v.gbP(v)
w=this.cy.a[u].a
t=w[0]
v.sfN(0,(C.a.V(y*w[1]+2048)<<19>>>0)+(C.a.V(128*(y*t))+262144))}F.ex(z,0,w)
this.k3=0
for(u=0;u<this.id;++u){s=C.c.h(z,u)
V.hn(s.gfN(s),1,0)}},
fT:function(){var z,y,x,w,v,u,t,s,r
z=this.aS
y=z.a.a
y[0]=17976931348623157e292
y[1]=17976931348623157e292
x=z.b.a
x[0]=-17976931348623157e292
x[1]=-17976931348623157e292
for(w=this.z,v=this.cy.a,u=0;u<w;++u){t=v[u]
s=y[0]
r=t.a
y[0]=Math.min(s,r[0])
y[1]=Math.min(y[1],r[1])
x[0]=Math.max(x[0],r[0])
x[1]=Math.max(x[1],r[1])}w=this.r
y[0]=y[0]-w
y[1]=y[1]-w
x[0]=x[0]+w
x[1]=x[1]+w
this.r2=0
w=this.f5
w.a=this
this.al.fE(w,z)},
ds:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=this.aS
y=z.a.a
y[0]=17976931348623157e292
y[1]=17976931348623157e292
x=z.b.a
x[0]=-17976931348623157e292
x[1]=-17976931348623157e292
for(w=this.z,v=this.db.a,u=this.cy.a,t=a.a,s=0;s<w;++s){r=v[s]
q=u[s].a
p=q[0]
o=q[1]
q=r.a
n=p+t*q[0]
m=o+t*q[1]
l=p<n?p:n
k=o<m?o:m
q=y[0]
y[0]=q<l?q:l
q=y[1]
y[1]=q<k?q:k
p=p>n?p:n
o=o>m?o:m
q=x[0]
x[0]=q>p?q:p
q=x[1]
x[1]=q>o?q:o}y=this.f6
y.b=a
y.a=this
this.al.fE(y,z)},
bq:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k;++this.a
if(this.z===0)return
this.b=0
for(z=0,y=0;z<this.z;++z){y=C.b.bm(y,C.c.h(this.cx.a,z))
this.b=y}if((y&2)!==0)this.dK()
if(this.z===0)return
this.c=0
for(x=this.aG;!1;x=x.b2())this.c=C.b.bm(this.c,x.gcr())
y=a.a
w=this.f
v=this.al
u=v.d8()
t=C.a.j(y*w,u.gm(u))
u=a.a
v=v.d8()
s=C.a.j(u*w,v.gn(v))
r=this.c_(a)
for(z=0;z<this.z;++z){y=this.db.a[z].a
y[0]=y[0]+t
y[1]=y[1]+s
w=y[0]
v=y[1]
q=w*w+v*v
if(q>r){p=q===0?17976931348623157e292:Math.sqrt(r/q)
y[0]=y[0]*p
y[1]=y[1]*p}}this.ds(a)
if((this.c&2)!==0)this.dB(a)
if((this.b&4)!==0)this.dJ(a)
for(y=this.z,w=this.cy.a,v=this.db.a,u=a.a,z=0;z<y;++z){o=w[z]
n=v[z]
m=o.a
l=m[0]
k=n.a
m[0]=l+u*k[0]
m[1]=m[1]+u*k[1]}this.fT()
this.fU(!1)
if((this.b&32)!==0)this.dI(a)
if((this.b&64)!==0)this.dz(a)
if((this.b&128)!==0)this.dH(a)
if((this.b&16)!==0)this.dv(a)
if((this.b&8)!==0)this.dD(a)
if((this.c&1)!==0)this.dC(a)
if((this.b&256)!==0)this.dt(a)
this.dA(a)
this.du(a)},
dA:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
for(z=this.dx,y=0;y<this.z;++y)C.c.l(z,y,0)
for(x=0;x<this.r2;++x){w=this.ry[x]
v=w.a
u=w.c
C.c.l(z,v,C.c.h(z,v).p(0,u))}for(x=0;x<this.k3;++x){w=this.r1[x]
v=w.a
t=w.b
u=w.d
C.c.l(z,v,C.c.h(z,v).p(0,u))
C.c.l(z,t,C.c.h(z,t).p(0,u))}if((this.b&64)!==0)for(y=0;y<this.z;++y){C.c.h(this.cx.a,y).X(0,64)
C.c.l(z,y,0)}s=this.bd*(this.d*this.c_(a))
for(y=0;y<this.z;++y)C.c.l(z,y,s*Math.max(0,Math.min(H.iY(C.c.h(z,y)),5)-1))
r=a.a/(this.d*this.r)
for(q=this.aT,p=q.a,o=this.x,n=1.777777*this.e*o*o,x=0;x<this.r2;++x){w=this.ry[x]
v=w.a
t=w.b
u=w.c
m=w.e
l=w.d
k=this.cy.a[v]
j=C.k.j(r*u*m,C.c.h(z,v).p(0,s*u))
o=l.a
p[0]=j*o[0]
p[1]=j*o[1]
o=this.db.a[v].a
o[0]=o[0]-n*p[0]
o[1]=o[1]-n*p[1]
t.bE(q,k,!0)}for(x=0;x<this.k3;++x){w=this.r1[x]
v=w.a
t=w.b
u=w.d
l=w.e
i=C.c.h(z,v).p(0,C.c.h(z,t))
p=r*u
o=l.a
h=C.k.j(p,i)*o[0]
g=C.k.j(p,i)*o[1]
o=this.db.a
f=o[v]
e=o[t]
o=f.a
o[0]=o[0]-h
o[1]=o[1]-g
o=e.a
o[0]=o[0]+h
o[1]=o[1]+g}},
du:function(a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
z=this.be
for(y=this.aT,x=y.a,w=this.x,v=1.777777*this.e*w*w,u=0;u<this.r2;++u){t=this.ry[u]
s=t.a
r=t.b
q=t.c
p=t.e
o=t.d
n=this.cy.a[s]
w=n.a
m=w[0]
l=r.gbA().gA()
k=C.a.u(m,l.gm(l))
w=w[1]
l=r.gbA().gA()
j=C.a.u(w,l.gn(l))
i=this.db.a[s]
l=r.gb6().dd(0).j(0,j)
w=r.gba()
w=l.p(0,w.gm(w))
l=i.a
h=w.u(0,l[0])
w=r.gb6().j(0,k)
m=r.gba()
g=w.p(0,m.gn(m)).u(0,l[1])
m=o.a
f=h.j(0,m[0]).p(0,g.j(0,m[1]))
if(f.C(0,0)){w=z*q*p
x[0]=C.a.j(w,f)*m[0]
x[1]=C.a.j(w,f)*m[1]
l[0]=l[0]+v*x[0]
l[1]=l[1]+v*x[1]
x[0]=-x[0]
x[1]=-x[1]
r.bE(y,n,!0)}}for(x=this.k3,w=this.r1,m=this.db.a,u=0;u<x;++u){t=w[u]
s=t.a
r=t.b
q=t.d
o=t.e
i=m[s]
l=m[r].a
e=l[0]
d=i.a
c=d[0]
b=l[1]
a=d[1]
a0=o.a
a1=a0[0]
a0=a0[1]
f=(e-c)*a1+(b-a)*a0
if(f<0){e=z*q*f
a2=e*a1
a3=e*a0
d[0]=c+a2
d[1]=a+a3
l[0]=l[0]-a2
l[1]=l[1]-a3}}},
dJ:function(a){var z,y,x
for(z=0;z<this.z;++z){C.c.h(this.cx.a,z).X(0,4)
y=this.db.a[z]
x=y.a
x[0]=0
x[1]=0}},
dB:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
for(z=this.aG,y=this.aT,x=this.f7,w=this.f8,v=y.a,u=this.f9,t=u.a,s=t.a,u=u.b,r=this.fa,q=r.a.a,p=r.b;!1;z=z.b2()){z.gcr().X(0,2)
z.hs()
o=C.a.j(a.a,z.gb6())
w.a=Math.sin(o)
w.b=Math.cos(o)
G.N(w,z.geg(),x)
n=z.gba().geD()
v[1]=n[1]
v[0]=n[0]
o=a.a
v[1]=v[1]*o
v[0]=v[0]*o
y.F(0,z.geg())
y.w(x)
s[1]=v[1]
s[0]=v[0]
u.a=w.a
u.b=w.b
o=z.gbB()
m=z.gbB()
l=o.gfC()
k=m.gfC()
j=C.a.j(u.b,l.gA())
i=C.a.j(u.a,l.gc4())
k.sc4(C.a.j(u.a,l.gA())+C.a.j(u.b,l.gc4()))
k.sA(j-i)
o=o.gbj()
i=m.gbj()
j=C.a.j(u.a,o.gm(o))
k=C.a.j(u.b,o.gn(o))
i.sm(0,C.a.j(u.b,o.gm(o))-C.a.j(u.a,o.gn(o)))
i.sn(0,j+k)
m.gbj().F(0,t)
m=a.b
q[0]=m*s[0]
q[1]=m*s[1]
p.a=m*u.a
p.b=m*(u.b-1)
for(h=z.gb7();h.C(0,z.gb9());h=h.p(0,1))G.m(r,this.cy.a[h],this.db.a[h])}},
dv:function(a6){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5
z=a6.b*this.bf
for(y=0;y<this.y2;++y){x=C.c.h(this.ak,y)
x.gfe().X(0,16)
w=x.gav()
v=x.gaw()
u=x.gbQ()
t=x.gho()
s=x.ghp()
r=x.ghq()
q=this.cy.a
p=q[w]
o=q[v]
n=q[u]
q=p.a
m=q[0]
l=o.a
k=l[0]
j=n.a
i=0.3333333333333333*(m+k+j[0])
h=0.3333333333333333*(q[1]+l[1]+j[1])
g=t.a8(p).p(0,s.a8(o)).p(0,r.a8(n))
f=t.v(p).p(0,s.v(o)).p(0,r.v(n))
e=Math.sqrt(C.b.d6(1,g.j(0,g).p(0,f.j(0,f))))
g=g.j(0,e)
f=f.j(0,e)
d=C.a.j(z,x.gdO())
c=f.j(0,t.gm(t)).u(0,g.j(0,t.gn(t)))
b=g.j(0,t.gm(t)).p(0,f.j(0,t.gn(t)))
a=f.j(0,s.gm(s)).u(0,g.j(0,s.gn(s)))
a0=g.j(0,s.gm(s)).p(0,f.j(0,s.gn(s)))
a1=f.j(0,r.gm(r)).u(0,g.j(0,r.gn(r)))
a2=g.j(0,r.gm(r)).p(0,f.j(0,r.gn(r)))
m=this.db.a
a3=m[w]
a4=m[v]
a5=m[u]
m=a3.a
m[0]=m[0]+C.a.j(d,c.u(0,q[0]-i))
m[1]=m[1]+C.a.j(d,b.u(0,q[1]-h))
q=a4.a
q[0]=q[0]+C.a.j(d,a.u(0,l[0]-i))
q[1]=q[1]+C.a.j(d,a0.u(0,l[1]-h))
l=a5.a
l[0]=l[0]+C.a.j(d,a1.u(0,j[0]-i))
l[1]=l[1]+C.a.j(d,a2.u(0,j[1]-h))}},
dD:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=a.b*this.bL
for(y=this.y1,x=0;x<this.x1;++x){w=C.c.h(y,x)
w.gfe().X(0,8)
v=w.gav()
u=w.gaw()
t=this.cy.a
s=t[v]
t=t[u].a
r=t[0]
q=s.a
p=r-q[0]
o=t[1]-q[1]
n=w.ghf()
m=Math.sqrt(p*p+o*o)
if(m===0)m=17976931348623157e292
l=C.a.j(z,w.gdO())
k=C.a.j(l,n.u(0,m))/m*p
j=C.a.j(l,n.u(0,m))/m*o
t=this.db.a
i=t[v]
h=t[u]
t=i.a
t[0]=t[0]-k
t[1]=t[1]-j
t=h.a
t[0]=t[0]+k
t[1]=t[1]+j}},
dH:function(a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
this.dy=this.bT(this.dy,V.cs())
for(z=this.dx,y=0;y<this.z;++y){C.c.l(z,y,0)
this.dy[y].M()}for(x=0;x<this.k3;++x){w=this.r1[x]
if((w.c&128)!==0){v=w.a
u=w.b
t=w.d
s=w.e
C.c.l(z,v,C.c.h(z,v).p(0,t))
C.c.l(z,u,C.c.h(z,u).p(0,t))
r=this.dy
q=r[v]
p=r[u]
o=(1-t)*t
r=q.a
n=s.a
r[0]=r[0]-o*n[0]
r[1]=r[1]-o*n[1]
r=p.a
r[0]=r[0]+o*n[0]
r[1]=r[1]+o*n[1]}}r=this.bN
n=this.r*a0.b
m=r*n
l=this.bO*n
for(x=0;x<this.k3;++x){w=this.r1[x]
if((w.c&128)!==0){v=w.a
u=w.b
t=w.d
s=w.e
r=this.dy
q=r[v]
p=r[u]
k=C.c.h(z,v).p(0,C.c.h(z,u))
r=p.a
n=r[0]
j=q.a
i=j[0]
r=r[1]
j=j[1]
h=C.k.j(m,k.u(0,2))
g=s.a
f=g[0]
g=g[1]
e=(h+l*((n-i)*f+(r-j)*g))*t
d=e*f
c=e*g
g=this.db.a
b=g[v]
a=g[u]
g=b.a
g[0]=g[0]-d
g[1]=g[1]-c
g=a.a
g[0]=g[0]+d
g[1]=g[1]+c}}},
dI:function(a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
z=this.bM
for(y=this.aT,x=this.x,w=1.777777*this.e*x*x,x=y.a,v=0;v<this.r2;++v){u=this.ry[v]
t=u.a
C.c.h(this.cx.a,t).X(0,32)
s=u.b
r=u.c
q=u.e
p=this.cy.a[t]
o=this.db.a[t]
n=p.a
m=n[0]
l=s.gbA().gA()
k=C.a.u(m,l.gm(l))
n=n[1]
l=s.gbA().gA()
j=C.a.u(n,l.gn(l))
l=s.gb6().dd(0).j(0,j)
n=s.gba()
n=l.p(0,n.gm(n))
l=o.a
i=n.u(0,l[0])
n=s.gb6().j(0,k)
m=s.gba()
h=n.p(0,m.gn(m)).u(0,l[1])
m=z*q*r
x[0]=C.k.j(m,i)
x[1]=C.k.j(m,h)
l[0]=l[0]+w*x[0]
l[1]=l[1]+w*x[1]
x[0]=-x[0]
x[1]=-x[1]
s.bE(y,p,!0)}for(x=this.k3,n=this.r1,m=this.db.a,v=0;v<x;++v){u=n[v]
if((u.c&32)!==0){t=u.a
s=u.b
r=u.d
o=m[t]
l=m[s].a
g=l[0]
f=o.a
e=f[0]
d=l[1]
c=f[1]
b=z*r
a=b*(g-e)
a0=b*(d-c)
f[0]=e+a
f[1]=c+a0
l[0]=l[0]-a
l[1]=l[1]-a0}}},
dz:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=this.bg*(this.r*a.b)
for(y=this.aT,x=this.x,w=1.777777*this.e*x*x,x=y.a,v=0;v<this.r2;++v){u=this.ry[v]
t=u.a
C.c.h(this.cx.a,t).X(0,64)
s=u.c
if(s>0.25){r=u.b
q=u.e
p=this.cy.a[t]
o=u.d
n=this.db.a[t]
m=z*q*(s-0.25)
l=o.a
x[0]=m*l[0]
x[1]=m*l[1]
l=n.a
l[0]=l[0]-w*x[0]
l[1]=l[1]-w*x[1]
r.bE(y,p,!0)}}for(x=this.k3,l=this.r1,k=this.db.a,j=this.bg,v=0;v<x;++v){u=l[v]
if((u.c&64)!==0){s=u.d
if(s>0.25){t=u.a
r=u.b
o=u.e
n=k[t]
i=k[r]
m=j*(s-0.25)
h=o.a
g=m*h[0]
f=m*h[1]
h=n.a
h[0]=h[0]-g
h[1]=h[1]-f
h=i.a
h[0]=h[0]+g
h[1]=h[1]+f}}}},
dC:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=this.fr
this.fr=z==null?new Float64Array(H.b(this.Q)):z
y=a.b*this.bh
for(x=this.fy,w=0;w<this.k3;++w){v=this.r1[w]
u=v.a
t=v.b
C.c.h(x,u)
C.c.h(x,t)
s=v.d
r=v.e
q=this.fr
p=q[u]
q=q[t]
o=this.db.a
n=o[u]
m=o[t]
l=y*(p+q)*s
q=r.a
k=l*q[0]
j=l*q[1]
q=n.a
q[0]=q[0]-k
q[1]=q[1]-j
q=m.a
q[0]=q[0]+k
q[1]=q[1]+j}},
dt:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.fx
z.a=this.bT(z.a,V.ep())
y=C.a.V(256*this.bi)
for(x=0;x<this.k3;++x){w=this.r1[x]
v=w.a
u=w.b
C.c.h(this.cx.a,v).X(0,C.c.h(this.cx.a,u)).X(0,256)
z=this.fx.a
t=z[v]
z=z[u].a
s=z[0]
r=t.a
q=C.b.aC(C.b.V(y*(s-r[0])),8)
p=C.b.aC(C.b.V(y*(z[1]-r[1])),8)
o=C.b.aC(C.b.V(y*(z[2]-r[2])),8)
n=C.b.aC(C.b.V(y*(z[3]-r[3])),8)
r[0]=r[0]+q
r[1]=r[1]+p
r[2]=r[2]+o
r[3]=r[3]+n
z[0]=z[0]-q
z[1]=z[1]-p
z[2]=z[2]-o
z[3]=z[3]-n}},
dK:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=P.aj(this.z,0,!1,P.l)
for(y=this.al,x=0;x<this.z;++x){w=C.c.h(this.cx.a,x)
w.X(0,2)
v=y.c3()
w.X(0,512)
v.h3(x)
z[x]=-1}for(y=this.k2,u=0;t=this.id,u<t;++u){s=C.c.h(y,u)
s.sbP(0,z[s.gbP(s)])}for(x=0;x<t;++x)if(V.hm(C.c.h(y,x))){--t
r=C.c.h(y,t)
C.c.l(y,t,C.c.h(y,x))
C.c.l(y,x,r);--x}this.id=t
for(u=0;t=this.k3,u<t;++u){q=this.r1[u]
q.a=z[q.a]
q.b=z[q.b]}for(y=this.r1,x=0;x<t;++x){p=y[x]
if(p.a<0||p.b<0){--t
r=y[t]
y[t]=p
y[x]=r;--x}}this.k3=t
for(u=0;t=this.r2,u<t;++u){q=this.ry[u]
q.a=z[q.a]}for(y=this.ry,x=0;x<t;++x){p=y[x]
if(p.a<0){--t
r=y[t]
y[t]=p
y[x]=r;--x}}this.r2=t
for(y=this.y1,u=0;t=this.x1,u<t;++u){o=C.c.h(y,u)
o.sav(z[o.gav()])
o.saw(z[o.gaw()])}for(x=0;x<t;++x){p=C.c.h(y,x)
if(p.gav().C(0,0)||p.gaw().C(0,0)){--t
r=C.c.h(y,t)
C.c.l(y,t,C.c.h(y,x))
C.c.l(y,x,r);--x}}this.x1=t
for(u=0;t=this.y2,u<t;++u){n=C.c.h(this.ak,u)
n.sav(z[n.gav()])
n.saw(z[n.gaw()])
n.sbQ(z[n.gbQ()])}for(x=0;x<t;++x){y=C.c.h(this.ak,x)
if(y.gav().C(0,0)||y.gaw().C(0,0)||y.gbQ().C(0,0)){--t
r=C.c.h(this.ak,t)
y=this.ak
C.c.l(y,t,C.c.h(y,x))
C.c.l(this.ak,x,r);--x}}this.y2=t
for(m=this.aG;!1;m=m.b2()){for(x=m.gb7(),l=0,k=0,j=!1;x.C(0,m.gb9());x=x.p(0,1)){t=z[x]
if(t>=0){l=Math.min(l,t)
k=Math.max(k,t+1)}else j=!0}if(l<k){m.sb7(l)
m.sb9(k)
if(j){m.gcr().X(0,2)
m.seC(!0)}}else{m.sb7(0)
m.sb9(0)
if(m.gh9())m.seB(!0)}}this.z=0
for(m=this.aG;!1;m=i){i=m.b2()
if(m.geB())this.f_(m)
else m.geC()}},
c_:function(a){var z=this.r*a.b
return z*z},
d9:function(){var z=this.fx
z.a=this.bT(z.a,z.b)
return this.fx.a},
e6:function(a){this.bd=0.05
this.be=1
this.bf=0.25
this.bL=0.25
this.bM=0.25
this.bN=0.1
this.bO=0.2
this.bg=0.5
this.bh=0.5
this.bi=0.5
this.cx=new V.hi(null,null)
this.cy=new V.bl(null,V.cs(),0)
this.db=new V.bl(null,V.cs(),0)
this.fx=new V.bl(null,V.ep(),0)
this.go=new V.bl(null,V.iX(),0)},
q:{
hn:function(a,b,c){return a.p(0,c<<19>>>0).p(0,b<<7>>>0)},
km:[function(){return new E.a(new Float64Array(H.b(2)))},"$0","cs",0,0,16],
kk:[function(){return new P.c()},"$0","iX",0,0,17],
kl:[function(){var z=new Int8Array(H.b(4))
z[0]=127
z[1]=127
z[2]=127
z[3]=50
return new V.c6(z)},"$0","ep",0,0,18],
hl:function(a){var z=new V.hk(0,0,0,1,1,1,1,1,1,0,0,0,null,null,null,null,null,null,null,null,null,0,0,null,0,0,null,0,0,null,0,0,null,0,0,null,0,null,null,null,null,null,null,null,null,null,null,null,null,V.au(),new V.fd(null,null,null,!1,0),V.au(),new E.a(new Float64Array(H.b(2))),G.q(),G.q(),new V.f3(null,null,null),new V.hj(0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),null,null),new V.hU(null,new E.a(new Float64Array(H.b(2)))),new V.hA(null,null,new V.cb(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0),new V.dv(new E.a(new Float64Array(H.b(2))),0),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2)))),new E.a(new Float64Array(H.b(2))),new G.aY(0,1),G.q(),G.q(),new V.h7(0,0,0))
z.e6(a)
return z}}},
e3:{"^":"c;a",
c0:function(a){var z,y,x
z=new Array(a)
z.fixed$length=Array
y=H.f(z,[E.a])
for(z=y.length,x=0;x<z;++x)y[x]=new E.a(new Float64Array(2))
return y}},
hg:{"^":"M;a,b,c,d",
T:function(){return new E.a(new Float64Array(2))},
$asM:function(){return[E.a]}},
hh:{"^":"M;a,b,c,d",
T:function(){return new E.aF(new Float64Array(3))},
$asM:function(){return[E.aF]}},
hd:{"^":"M;a,b,c,d",
T:function(){return new E.ak(new Float64Array(4))},
$asM:function(){return[E.ak]}},
he:{"^":"M;a,b,c,d",
T:function(){return new E.aW(new Float64Array(9))},
$asM:function(){return[E.aW]}},
hc:{"^":"M;a,b,c,d",
T:function(){var z=new Float64Array(2)
return new V.a6(new E.a(z),new E.a(new Float64Array(2)))},
$asM:function(){return[V.a6]}},
hf:{"^":"M;a,b,c,d",
T:function(){return new G.aY(0,1)},
$asM:function(){return[G.aY]}},
F:{"^":"a4;$ti"},
h5:{"^":"F;d,a,b,c",
T:function(){return new V.bn(0,null,null,new V.B(null,null,null,null),new V.B(null,null,null,null),null,null,0,0,V.E(),0,0,0,0,0,this.d,V.E())},
$asF:function(){return[V.bn]},
$asa4:function(){return[V.bn]}},
h1:{"^":"F;d,a,b,c",
T:function(){return new V.ba(0,null,null,new V.B(null,null,null,null),new V.B(null,null,null,null),null,null,0,0,V.E(),0,0,0,0,0,this.d,V.E())},
$asF:function(){return[V.ba]},
$asa4:function(){return[V.ba]}},
h4:{"^":"F;d,a,b,c",
T:function(){return new V.bm(0,null,null,new V.B(null,null,null,null),new V.B(null,null,null,null),null,null,0,0,V.E(),0,0,0,0,0,this.d,V.E())},
$asF:function(){return[V.bm]},
$asa4:function(){return[V.bm]}},
h2:{"^":"F;d,a,b,c",
T:function(){return new V.bf(0,null,null,new V.B(null,null,null,null),new V.B(null,null,null,null),null,null,0,0,V.E(),0,0,0,0,0,this.d,V.E())},
$asF:function(){return[V.bf]},
$asa4:function(){return[V.bf]}},
h3:{"^":"F;d,a,b,c",
T:function(){return new V.bg(0,null,null,new V.B(null,null,null,null),new V.B(null,null,null,null),null,null,0,0,V.E(),0,0,0,0,0,this.d,V.E())},
$asF:function(){return[V.bg]},
$asa4:function(){return[V.bg]}},
h_:{"^":"F;d,a,b,c",
T:function(){var z,y,x,w
z=new Float64Array(2)
y=new Float64Array(2)
x=new Float64Array(2)
w=new Float64Array(2)
z=new V.ay(new E.a(z),new E.a(y),new E.a(x),new E.a(w),!1,!1,new E.a(new Float64Array(2)),C.n,0)
z.b=0.01
return new V.b8(z,0,null,null,new V.B(null,null,null,null),new V.B(null,null,null,null),null,null,0,0,V.E(),0,0,0,0,0,this.d,V.E())},
$asF:function(){return[V.b8]},
$asa4:function(){return[V.b8]}},
h0:{"^":"F;d,a,b,c",
T:function(){var z,y,x,w
z=new Float64Array(2)
y=new Float64Array(2)
x=new Float64Array(2)
w=new Float64Array(2)
z=new V.ay(new E.a(z),new E.a(y),new E.a(x),new E.a(w),!1,!1,new E.a(new Float64Array(2)),C.n,0)
z.b=0.01
return new V.b9(z,0,null,null,new V.B(null,null,null,null),new V.B(null,null,null,null),null,null,0,0,V.E(),0,0,0,0,0,this.d,V.E())},
$asF:function(){return[V.b9]},
$asa4:function(){return[V.b9]}},
f8:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy",
e_:function(a0,a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
z=new V.h5(this,null,null,null)
z.ap(10,V.bn)
this.Q=z
z=new V.h1(this,null,null,null)
z.ap(10,V.ba)
this.ch=z
z=new V.h4(this,null,null,null)
z.ap(10,V.bm)
this.cx=z
z=new V.h2(this,null,null,null)
z.ap(10,V.bf)
this.cy=z
z=new V.h3(this,null,null,null)
z.ap(10,V.bg)
this.db=z
z=new V.h_(this,null,null,null)
z.ap(10,V.b8)
this.dx=z
z=new V.h0(this,null,null,null)
z.ap(10,V.b9)
this.dy=z
z=V.aw()
y=V.aw()
x=G.q()
w=G.q()
v=V.dy()
u=new Float64Array(H.b(2))
t=new Float64Array(H.b(2))
s=new Float64Array(H.b(2))
r=G.q()
q=new Float64Array(H.b(2))
p=new Float64Array(H.b(2))
o=[V.Q]
n=H.f(new Array(2),o)
m=new Float64Array(H.b(2))
l=new Float64Array(H.b(2))
k=new Float64Array(H.b(2))
j=new Float64Array(H.b(2))
i=new Float64Array(H.b(2))
h=new Float64Array(H.b(2))
g=H.f(new Array(2),o)
o=H.f(new Array(2),o)
f=new Float64Array(H.b(2))
e=new Float64Array(H.b(2))
d=new Int8Array(H.b(4))
c=new Float64Array(H.b(2))
b=new Float64Array(H.b(2))
a=V.fl()
n[0]=new V.Q(new E.a(new Float64Array(H.b(2))),new V.K(new Int8Array(H.b(4))))
n[1]=new V.Q(new E.a(new Float64Array(H.b(2))),new V.K(new Int8Array(H.b(4))))
g[0]=new V.Q(new E.a(new Float64Array(H.b(2))),new V.K(new Int8Array(H.b(4))))
g[1]=new V.Q(new E.a(new Float64Array(H.b(2))),new V.K(new Int8Array(H.b(4))))
o[0]=new V.Q(new E.a(new Float64Array(H.b(2))),new V.K(new Int8Array(H.b(4))))
o[1]=new V.Q(new E.a(new Float64Array(H.b(2))),new V.K(new Int8Array(H.b(4))))
this.fr=new V.eZ(this,new V.cR(z,y,x,w,!1),v,new V.cS(new E.a(u),new E.a(t),0,0),new E.a(s),r,new E.a(q),new E.a(p),new V.ea(0,0),new V.ea(0,0),n,new E.a(m),new E.a(l),new E.a(k),new E.a(j),new E.a(i),new E.a(h),g,o,new E.a(f),new E.a(e),new V.K(d),new E.a(c),new E.a(b),a)
this.fx=new V.hK(V.dy(),new V.cR(V.aw(),V.aw(),G.q(),G.q(),!1),G.q(),G.q(),new V.cS(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0),new V.hw(null,null,null,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),null,null,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),G.q(),G.q(),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2)))),P.aj(2,0,!1,P.l),new G.an(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0),new G.an(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0),this)
this.z=this},
q:{
f9:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=P.l
y=P.aP(null,null,null,z,P.fr)
x=P.aP(null,null,null,z,[P.j,P.l])
w=P.aP(null,null,null,z,[P.j,E.a])
v=E.a
u=[v]
u=new V.hg(H.f(new Array(a),u),0,a,H.f(new Array(b),u))
u.aB(a,b,v)
v=E.aF
t=[v]
t=new V.hh(H.f(new Array(a),t),0,a,H.f(new Array(b),t))
t.aB(a,b,v)
v=E.ak
s=[v]
s=new V.hd(H.f(new Array(a),s),0,a,H.f(new Array(b),s))
s.aB(a,b,v)
v=V.a6
r=[v]
r=new V.hc(H.f(new Array(a),r),0,a,H.f(new Array(b),r))
r.aB(a,b,v)
v=G.aY
q=[v]
q=new V.hf(H.f(new Array(a),q),0,a,H.f(new Array(b),q))
q.aB(a,b,v)
v=E.aW
p=[v]
p=new V.he(H.f(new Array(a),p),0,a,H.f(new Array(b),p))
p.aB(a,b,v)
v=new V.bx(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0)
o=new V.bx(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0)
n=new V.bx(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0)
m=H.f(new Array(3),[V.bx])
l=new Float64Array(H.b(2))
k=new Float64Array(H.b(2))
j=new Float64Array(H.b(2))
i=new Float64Array(H.b(2))
h=new Float64Array(H.b(2))
g=new Float64Array(H.b(2))
f=new Float64Array(H.b(2))
e=new Float64Array(H.b(2))
d=new Float64Array(H.b(2))
c=new Float64Array(H.b(2))
m[0]=v
m[1]=o
m[2]=n
z=new V.f8(u,t,s,p,r,q,y,x,w,null,null,null,null,null,null,null,null,null,null,new V.fe(new V.iC(v,o,n,m,0,new E.a(l),new E.a(k),new E.a(j),new E.a(i),new E.a(h),new E.a(g),new E.a(f),new E.a(e),new E.a(d),new E.a(c)),P.aj(3,0,!1,z),P.aj(3,0,!1,z),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2)))))
z.e_(a,b)
return z}}},
a4:{"^":"c;$ti",
cK:function(a){var z,y,x
z=new Array(a)
z.fixed$length=Array
y=H.f(z,[H.ab(this,"a4",0)])
z=this.a
if(z!=null)C.d.W(y,0,this.c,z,0)
for(z=y.length,x=0;x<z;++x)y[x]=this.T()
this.a=y
this.c=z},
cX:function(){var z,y
z=this.b
y=this.c
if(z>=y)this.cK(y*2)
return this.a[this.b++]},
ap:function(a,b){this.b=0
this.a=null
this.c=0
this.cK(a)}},
M:{"^":"c;$ti",
aB:function(a,b,c){var z,y
for(z=this.a,y=0;y<a;++y)z[y]=this.T()}}}],["","",,F,{"^":"",
ex:function(a,b,c){var z
P.ca(b,c,a.length,null,null,null)
z=P.c_(H.dC(a,b,c,H.ac(a,0)),!0,null)
C.d.bF(z,"sort")
H.aZ(z,0,z.length-1,P.j_());(a&&C.d).dm(a,b,c,z)}}],["","",,N,{"^":"",eR:{"^":"f5;c,a,b",
bc:function(a,b,c){var z,y,x
this.cB(c)
for(z=J.A(a),y=this.b,x=0;x<b;++x)y.ac(z.h(a,x),z.h(a,x))
y=this.c
y.beginPath()
y.moveTo(J.aM(z.h(a,0)),J.aN(z.h(a,0)))
for(x=1;x<b;++x)y.lineTo(J.aM(z.h(a,x)),J.aN(z.h(a,x)))
y.lineTo(J.aM(z.h(a,0)),J.aN(z.h(a,0)))
y.closePath()},
Z:function(a,b,c){var z,y,x,w
z=this.c
y=c.a
x=c.b
w=c.c
z.toString
z.strokeStyle="rgba("+y+", "+x+", "+w+", 0.9)"
w=c.a
x=c.b
y=c.c
z.fillStyle="rgba("+w+", "+x+", "+y+", 0.8)"
y=this.b
y.ac(a,a)
y.ac(b,b)
z.beginPath()
y=a.a
z.moveTo(y[0],y[1])
y=b.a
z.lineTo(y[0],y[1])
z.closePath()
z.stroke()},
cB:function(a){var z,y,x,w
z=this.c
y=a.a
x=a.b
w=a.c
z.toString
z.strokeStyle="rgba("+y+", "+x+", "+w+", 0.9)"
w=a.a
x=a.b
y=a.c
z.fillStyle="rgba("+w+", "+x+", "+y+", 0.8)"},
f2:function(a,b,c,d){throw H.e("Unimplemented")},
f3:function(a,b,c,d){throw H.e("Unimplemented")}}}],["","",,G,{"^":"",bO:{"^":"c;m:a>,n:b>,c",
a6:function(a,b,c){this.a=C.b.V(C.a.am(a*255))
this.b=C.b.V(C.a.am(b*255))
this.c=C.b.V(C.a.am(c*255))}},aY:{"^":"c;a,A:b<",
bn:function(a){this.a=Math.sin(a)
this.b=Math.cos(a)
return this},
k:function(a){return"Rot(s:"+H.d(this.a)+", c:"+H.d(this.b)+")"},
q:{
N:function(a,b,c){var z,y,x,w,v,u
z=a.b
y=b.a
x=y[0]
w=a.a
v=y[1]
u=c.a
u[0]=z*x-w*v
u[1]=w*y[0]+z*y[1]},
am:function(a,b,c){var z,y,x,w,v
z=a.b
y=b.a
x=y[0]
w=a.a
v=c.a
v[0]=z*x+w*y[1]
v[1]=-w*y[0]+z*y[1]}}},an:{"^":"c;a,b,A:c<,d,E:e@,f",
k:function(a){return"Sweep:\nlocalCenter: "+this.a.k(0)+"\n"+("c0: "+this.b.k(0)+", c: "+this.c.k(0)+"\n")+("a0: "+H.d(this.d)+", a: "+H.d(this.e)+"\n")+("alpha0: "+H.d(this.f))},
U:function(){var z=6.283185307179586*C.k.am(this.d/6.283185307179586)
this.d-=z
this.e-=z},
B:function(a){this.a.i(a.a)
this.b.i(a.b)
this.c.i(a.c)
this.d=a.d
this.e=a.e
this.f=a.f
return this},
ab:function(a,b){var z,y,x,w,v,u
z=1-b
y=this.b.a
x=this.c.a
w=a.a.a
w[0]=z*y[0]+b*x[0]
w[1]=z*y[1]+b*x[1]
x=a.b
x.bn(z*this.d+b*this.e)
z=w[0]
y=x.b
v=this.a.a
u=v[0]
x=x.a
w[0]=z-(y*u-x*v[1])
w[1]=w[1]-(x*v[0]+y*v[1])},
as:function(a){var z,y,x,w
z=this.f
y=(a-z)/(1-z)
z=this.b.a
x=z[0]
w=this.c.a
z[0]=x+y*(w[0]-x)
x=z[1]
z[1]=x+y*(w[1]-x)
x=this.d
this.d=x+y*(this.e-x)
this.f=a}},ce:{"^":"c;a"},hR:{"^":"c;a,b",
k:function(a){var z=this.b
return"XForm:\n"+("Position: "+this.a.k(0)+"\n")+("R: \t"+("Rot(s:"+H.d(z.a)+", c:"+H.d(z.b)+")")+"\n")},
q:{
q:function(){return new G.hR(new E.a(new Float64Array(H.b(2))),new G.aY(0,1))},
aE:function(a,b,c){var z,y,x,w,v,u,t
z=a.b
y=z.a
x=b.a
w=x[0]
z=z.b
x=x[1]
v=a.a.a
u=v[1]
t=c.a
t[0]=z*w-y*x+v[0]
t[1]=y*w+z*x+u},
m:function(a,b,c){var z,y,x,w,v,u,t,s
z=a.b
y=z.b
x=b.a
w=x[0]
z=z.a
v=x[1]
u=a.a.a
t=u[0]
s=c.a
s[0]=y*w-z*v+t
s[1]=z*x[0]+y*x[1]+u[1]},
dR:function(a,b,c){var z,y,x,w,v
z=b.a
y=a.a.a
x=z[0]-y[0]
w=z[1]-y[1]
y=a.b
z=y.b
y=y.a
v=c.a
v[0]=z*x+y*w
v[1]=-y*x+z*w},
dQ:function(a,b,c){var z,y,x,w,v,u,t
z=a.b
y=b.b
x=c.b
w=z.b
v=y.a
u=z.a
t=y.b
x.a=w*v-u*t
x.b=w*t+z.a*y.a
y=$.$get$cg()
y.i(b.a)
y.w(a.a)
G.am(z,$.$get$cg(),c.a)}}},hW:{"^":"c;",
ac:function(a,b){var z,y,x,w,v,u,t,s,r
z=a.a
y=z[0]
x=this.c
w=this.b
v=w.a
u=v[0]
v=v[1]
z=z[1]
t=new Float64Array(H.b(2))
s=new E.a(t)
s.i(w)
s.w(this.d)
w=t[0]
t=t[1]
r=b.a
r[0]=y*x+u+w
r[1]=v-z*x+-t}}}],["","",,X,{"^":"",eS:{"^":"hW;a,b,c,d"}}],["","",,A,{"^":"",
bB:function(a){var z,y
z=C.a2.ff(a,0,new A.j6())
y=536870911&z+((67108863&z)<<3)
y^=y>>>11
return 536870911&y+((16383&y)<<15)},
j6:{"^":"k:12;",
$2:function(a,b){var z=536870911&a+J.at(b)
z=536870911&z+((524287&z)<<10)
return z^z>>>6}}}],["","",,E,{"^":"",ak:{"^":"c;a",
i:function(a){var z,y
z=a.a
y=this.a
y[3]=z[3]
y[2]=z[2]
y[1]=z[1]
y[0]=z[0]},
k:function(a){return"[0] "+this.ax(0).k(0)+"\n[1] "+this.ax(1).k(0)+"\n"},
h:function(a,b){return this.a[b]},
l:function(a,b,c){this.a[b]=c},
L:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof E.ak){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]}else z=!1
return z},
gI:function(a){return A.bB(this.a)},
ax:function(a){var z,y
z=new Float64Array(H.b(2))
y=this.a
z[0]=y[a]
z[1]=y[2+a]
return new E.a(z)},
p:function(a,b){var z,y,x
z=new Float64Array(H.b(4))
y=new E.ak(z)
y.i(this)
x=b.gha()
z[0]=C.a.p(z[0],x.h(0,0))
z[1]=C.a.p(z[1],x.h(0,1))
z[2]=C.a.p(z[2],x.h(0,2))
z[3]=C.a.p(z[3],x.h(0,3))
return y},
M:function(){var z=this.a
z[0]=0
z[1]=0
z[2]=0
z[3]=0},
fq:function(){var z,y,x,w,v,u,t
z=this.a
y=z[0]
x=z[3]
w=z[1]
v=z[2]
u=y*x-w*v
if(u===0)return 0
t=1/u
z[0]=x*t
z[1]=-w*t
z[2]=-v*t
z[3]=y*t
return u}},aW:{"^":"c;a",
i:function(a){var z,y
z=a.a
y=this.a
y[8]=z[8]
y[7]=z[7]
y[6]=z[6]
y[5]=z[5]
y[4]=z[4]
y[3]=z[3]
y[2]=z[2]
y[1]=z[1]
y[0]=z[0]},
k:function(a){return"[0] "+this.ax(0).k(0)+"\n[1] "+this.ax(1).k(0)+"\n[2] "+this.ax(2).k(0)+"\n"},
h:function(a,b){return this.a[b]},
l:function(a,b,c){this.a[b]=c},
L:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof E.aW){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]&&z[4]===x[4]&&z[5]===x[5]&&z[6]===x[6]&&z[7]===x[7]&&z[8]===x[8]}else z=!1
return z},
gI:function(a){return A.bB(this.a)},
ax:function(a){var z,y
z=new Float64Array(H.b(3))
y=this.a
z[0]=y[a]
z[1]=y[3+a]
z[2]=y[6+a]
return new E.aF(z)},
p:function(a,b){var z,y,x
z=new Float64Array(H.b(9))
y=new E.aW(z)
y.i(this)
x=b.ghb()
z[0]=C.a.p(z[0],x.h(0,0))
z[1]=C.a.p(z[1],x.h(0,1))
z[2]=C.a.p(z[2],x.h(0,2))
z[3]=C.a.p(z[3],x.h(0,3))
z[4]=C.a.p(z[4],x.h(0,4))
z[5]=C.a.p(z[5],x.h(0,5))
z[6]=C.a.p(z[6],x.h(0,6))
z[7]=C.a.p(z[7],x.h(0,7))
z[8]=C.a.p(z[8],x.h(0,8))
return y},
M:function(){var z=this.a
z[0]=0
z[1]=0
z[2]=0
z[3]=0
z[4]=0
z[5]=0
z[6]=0
z[7]=0
z[8]=0}},a:{"^":"c;a",
b3:function(a,b){var z=this.a
z[0]=a
z[1]=b},
M:function(){var z=this.a
z[0]=0
z[1]=0},
i:function(a){var z,y
z=a.a
y=this.a
y[1]=z[1]
y[0]=z[0]},
k:function(a){var z=this.a
return"["+H.d(z[0])+","+H.d(z[1])+"]"},
L:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof E.a){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]}else z=!1
return z},
gI:function(a){return A.bB(this.a)},
p:function(a,b){var z=new E.a(new Float64Array(H.b(2)))
z.i(this)
z.F(0,b)
return z},
h:function(a,b){return this.a[b]},
l:function(a,b,c){this.a[b]=c},
gt:function(a){return Math.sqrt(this.gaX())},
gaX:function(){var z,y
z=this.a
y=z[0]
z=z[1]
return y*y+z*z},
U:function(){var z,y,x
z=Math.sqrt(this.gaX())
if(z===0)return 0
y=1/z
x=this.a
x[0]=x[0]*y
x[1]=x[1]*y
return z},
bI:function(a){var z,y,x,w
z=this.a
y=a.a
x=z[0]-y[0]
w=z[1]-y[1]
return x*x+w*w},
v:function(a){var z,y
z=a.a
y=this.a
return y[0]*z[0]+y[1]*z[1]},
a8:function(a){var z,y
z=a.a
y=this.a
return y[0]*z[1]-y[1]*z[0]},
aJ:function(a,b){var z,y,x
z=this.a
y=z[1]
z=z[0]
x=b.a
x[0]=-a*y
x[1]=a*z
return b},
F:function(a,b){var z,y
z=b.a
y=this.a
y[0]=y[0]+z[0]
y[1]=y[1]+z[1]},
w:function(a){var z,y
z=a.a
y=this.a
y[0]=y[0]-z[0]
y[1]=y[1]-z[1]},
H:function(a,b){var z=this.a
z[1]=z[1]*b
z[0]=z[0]*b},
S:function(){var z=this.a
z[1]=-z[1]
z[0]=-z[0]},
sm:function(a,b){this.a[0]=b
return b},
sn:function(a,b){this.a[1]=b
return b},
gm:function(a){return this.a[0]},
gn:function(a){return this.a[1]},
q:{
e4:function(){return new E.a(new Float64Array(H.b(2)))}}},aF:{"^":"c;a",
M:function(){var z=this.a
z[2]=0
z[1]=0
z[0]=0},
i:function(a){var z,y
z=a.a
y=this.a
y[0]=z[0]
y[1]=z[1]
y[2]=z[2]},
k:function(a){var z=this.a
return"["+H.d(z[0])+","+H.d(z[1])+","+H.d(z[2])+"]"},
L:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof E.aF){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]}else z=!1
return z},
gI:function(a){return A.bB(this.a)},
p:function(a,b){var z,y,x
z=new Float64Array(H.b(3))
y=new E.aF(z)
y.i(this)
x=b.ghc()
z[0]=C.a.p(z[0],x.h(0,0))
z[1]=C.a.p(z[1],x.h(0,1))
z[2]=C.a.p(z[2],x.h(0,2))
return y},
h:function(a,b){return this.a[b]},
l:function(a,b,c){this.a[b]=c},
gt:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(y*y+x*x+z*z)},
gm:function(a){return this.a[0]},
gn:function(a){return this.a[1]}}}],["","",,D,{"^":"",
kR:[function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7
z=[V.b6]
y=H.f([],z)
x=new Float64Array(H.b(2))
x[0]=0
x[1]=-10
w=V.f9(100,10)
v=V.f7(V.fj())
u=V.i3(4,4)
t=new P.bt(0,0)
if($.x==null){H.bo()
$.x=$.al}t.b4(0)
s=new P.bt(0,0)
if($.x==null){H.bo()
$.x=$.al}s.b4(0)
r=G.q()
q=new Float64Array(H.b(2))
p=new Float64Array(H.b(2))
o=P.l
n=[P.j,E.a]
m=P.aP(null,null,null,o,n)
l=new Float64Array(H.b(2))
k=new Float64Array(H.b(2))
j=new Float64Array(H.b(2))
i=new Float64Array(H.b(2))
h=new Float64Array(H.b(2))
g=V.bd()
f=V.bd()
e=new Float64Array(H.b(2))
d=new Float64Array(H.b(2))
c=H.f(new Array(10),z)
b=new P.bt(0,0)
if($.x==null){H.bo()
$.x=$.al}b.b4(0)
a=V.bd()
a0=V.bd()
a1=new Float64Array(H.b(2))
a2=new Float64Array(H.b(2))
a3=V.aw()
a4=V.aw()
a5=new Float64Array(H.b(2))
a6=new Float64Array(H.b(2))
a7=new Float64Array(H.b(2))
a8=new Float64Array(H.b(2))
a9=new Float64Array(H.b(2))
b0=new Float64Array(H.b(2))
z=H.f(new Array(2),z)
b1=new Float64Array(H.b(2))
b2=new Float64Array(H.b(2))
b3=new Float64Array(H.b(2))
b4=new Float64Array(H.b(2))
b5=new Float64Array(H.b(2))
b6=new Float64Array(H.b(2))
b7=new Float64Array(H.b(2))
b8=new Float64Array(H.b(2))
b9=C.b.V(C.b.am(102))
c0=C.b.V(C.b.am(102))
c1=C.b.V(C.b.am(255))
c2=new Float64Array(H.b(2))
c3=new Float64Array(H.b(2))
c4=new Float64Array(H.b(2))
c5=new Float64Array(H.b(2))
n=P.aP(null,null,null,o,n)
o=new E.a(new Float64Array(H.b(2)))
o.i(new E.a(x))
c6=new V.hZ(0,null,null,null,0,0,o,!1,null,null,null,w,0,!1,!1,!1,!1,null,null,u,new V.dL(0,0,0,0,0,!1),new G.ce(t),new G.ce(s),new G.bO(0,0,0),r,new E.a(q),new E.a(p),new V.e3(m),new V.i1(null,null),new V.i2(new V.dv(new E.a(l),0),new E.a(k),new E.a(j),null,null),new V.cb(new E.a(i),new E.a(h),0),new V.d4(null,null,null,null,null,null,0,0,0,0,0,0,g,new V.dz(null,null,null),new V.be(null,null,0,null,null),f,new V.be(null,null,0,null,null),new V.cN(e,d,0)),c,new G.ce(b),new V.d4(null,null,null,null,null,null,0,0,0,0,0,0,a,new V.dz(null,null,null),new V.be(null,null,0,null,null),a0,new V.be(null,null,0,null,null),new V.cN(a1,a2,0)),new V.hF(a3,a4,new G.an(new E.a(a5),new E.a(a6),new E.a(a7),0,0,0),new G.an(new E.a(a8),new E.a(a9),new E.a(b0),0,0,0),0),new V.hG(C.J,0),new V.dL(0,0,0,0,0,!1),z,new G.an(new E.a(b1),new E.a(b2),new E.a(b3),0,0,0),new G.an(new E.a(b4),new E.a(b5),new E.a(b6),0,0,0),0.12,-1,new E.a(b7),new E.a(b8),new G.bO(b9,c0,c1),new E.a(c2),new E.a(c3),new E.a(c4),new E.a(c5),new V.e3(n))
c6.cy=!0
c6.db=!0
c6.dy=!0
c6.x=!0
c6.a=4
c6.b=V.f1(c6,v)
c6.fr=new V.hr(new V.Y(0,0,17976931348623157e292,-17976931348623157e292,0),new V.Y(0,0,17976931348623157e292,-17976931348623157e292,0),new V.Y(0,0,17976931348623157e292,-17976931348623157e292,0),new V.Y(0,0,17976931348623157e292,-17976931348623157e292,0),new V.Y(0,0,17976931348623157e292,-17976931348623157e292,0),new V.Y(0,0,17976931348623157e292,-17976931348623157e292,0),new V.Y(0,0,17976931348623157e292,-17976931348623157e292,0),new V.Y(0,0,17976931348623157e292,-17976931348623157e292,0),new V.Y(0,0,17976931348623157e292,-17976931348623157e292,0),new V.Y(0,0,17976931348623157e292,-17976931348623157e292,0))
c6.fx=V.hl(c6)
c6.es()
v=new P.bt(0,0)
if($.x==null){H.bo()
$.x=$.al}v.b4(0)
c7=new D.eP(y,c6,v,10,null,null,null,null,null,null,null,null)
c7.e0("Ball cage",null,10)
c7.fj(0)
c7.fm()
z=window
C.t.co(z)
C.t.cz(z,W.ek(c7.gca(c7)))},"$0","eo",0,0,2],
eP:{"^":"fa;a,b,c,d,e,f,r,x,y,z,Q,ch",
fj:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=new V.bN(new E.a(new Float64Array(H.b(2))),C.h,0)
z.b=2
y=new V.bU(null,null,0.2,0,0,!1,new V.bi(1,65535,0))
y.a=z
y.c=0.9
y.d=1
x=new V.cI(C.e,null,new E.a(new Float64Array(H.b(2))),0,new E.a(new Float64Array(H.b(2))),0,0,0,!0,!0,!1,!1,!0,1)
w=-20+20*z.b
for(v=this.b,u=this.a,t=0;t<10;++t){s=-20+z.b*2*t
r=new Float64Array(2)
r[0]=s
r[1]=-20
x.c=new E.a(r)
q=v.aN(x)
u.push(q)
q.aO(y)
r=new Float64Array(2)
r[0]=s
r[1]=w
x.c=new E.a(r)
q=v.aN(x)
u.push(q)
q.aO(y)
r=new Float64Array(2)
r[0]=-20
r[1]=s
x.c=new E.a(r)
q=v.aN(x)
u.push(q)
q.aO(y)
r=new Float64Array(2)
r[0]=w
r[1]=s
x.c=new E.a(r)
q=v.aN(x)
u.push(q)
q.aO(y)}p=new V.bN(new E.a(new Float64Array(H.b(2))),C.h,0)
p.b=1
o=new V.bU(null,null,0.2,0,0,!1,new V.bi(1,65535,0))
o.d=1
o.e=0.05
o.a=p
n=new V.cI(C.e,null,new E.a(new Float64Array(H.b(2))),0,new E.a(new Float64Array(H.b(2))),0,0,0,!0,!0,!1,!1,!0,1)
r=new Float64Array(H.b(2))
r[0]=0
r[1]=-20
n.e=new E.a(r)
r=new Float64Array(H.b(2))
r[0]=15
r[1]=15
n.c=new E.a(r)
n.a=C.f
n.ch=!0
m=v.aN(n)
u.push(m)
m.aO(o)}}},1],["","",,Q,{"^":"",fa:{"^":"c;",
h8:[function(a,b){var z,y,x,w,v,u,t
z=this.c
y=z.b
z.a=y==null?$.r.$0():y
y=this.b
x=y.id.a
w=x.b
x.a=w==null?$.r.$0():w
w=y.k1.a
v=w.b
w.a=v==null?$.r.$0():v
v=y.a
if((v&1)===1){v=y.b
v.a.bW(v)
v=y.a&=4294967294}y.a=v|2
v=y.go
v.a=0.016666666666666666
v.d=10
v.e=10
v.b=60
v.c=y.cx*0.016666666666666666
v.f=y.cy
u=y.fr.b
t=w.b
if(t==null)t=$.r.$0()
u.a5(C.b.ae((t-w.a)*1000,$.x))
u=w.b
w.a=u==null?$.r.$0():u
y.b.eL()
u=y.fr.c
t=w.b
if(t==null)t=$.r.$0()
u.a5(C.b.ae((t-w.a)*1000,$.x))
if(y.dy&&v.a>0){u=w.b
w.a=u==null?$.r.$0():u
y.fx.bq(v)
u=y.fr.d
t=w.b
if(t==null)t=$.r.$0()
u.a5(C.b.ae((t-w.a)*1000,$.x))
u=w.b
w.a=u==null?$.r.$0():u
y.bq(v)
u=y.fr.e
t=w.b
if(t==null)t=$.r.$0()
u.a5(C.b.ae((t-w.a)*1000,$.x))}if(y.db&&v.a>0){u=w.b
w.a=u==null?$.r.$0():u
y.dE(v)
u=y.fr.z
t=w.b
if(t==null)t=$.r.$0()
u.a5(C.b.ae((t-w.a)*1000,$.x))}if(v.a>0)y.cx=v.b
if((y.a&4)===4)y.eK()
y.a&=4294967293
w=y.fr.a
v=x.b
if(v==null)v=$.r.$0()
w.a5(C.b.ae((v-x.a)*1000,$.x))
x=z.b
if(x==null)x=$.r.$0()
this.Q=C.b.ae((x-z.a)*1e6,$.x)
this.f.clearRect(0,0,900,600)
y.f1()
this.y=this.y+1
y=window
C.t.co(y)
C.t.cz(y,W.ek(this.gca(this)))},"$1","gca",2,0,13],
fm:function(){var z,y,x,w
z=H.z(W.ic("canvas",null),"$iscL")
z.width=900
z.height=600
this.e=z
y=document
y.body.appendChild(z)
z=this.e
z.toString
this.f=z.getContext("2d")
z=new Float64Array(H.b(2))
x=new E.a(z)
z[0]=450
z[1]=300
z=new E.a(new Float64Array(H.b(2)))
z.i(x)
w=new E.a(new Float64Array(H.b(2)))
w.i(x)
w=new X.eS(null,z,20,w)
w.a=!0
w.c=this.d
this.r=w
w=new N.eR(this.f,2,w)
this.x=w
this.b.Q=w
this.y=0
this.z=y.querySelector("#fps-counter")
this.ch=y.querySelector("#world-step-time")
P.dO(P.cW(0,0,0,0,0,1),new Q.fb(this))
P.dO(P.cW(0,0,0,200,0,0),new Q.fc(this))},
e0:function(a,b,c){J.bF(document.querySelector("#title"),a)}},fb:{"^":"k:5;a",
$1:function(a){var z=this.a
J.bF(z.z,J.a2(z.y))
z.y=0}},fc:{"^":"k:5;a",
$1:function(a){var z,y
z=this.a
y=z.Q
if(y==null)return
J.bF(z.ch,H.d(y/1000)+" ms")}}}],["","",,O,{"^":""}]]
setupProgram(dart,0)
J.p=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.d9.prototype
return J.d8.prototype}if(typeof a=="string")return J.aS.prototype
if(a==null)return J.da.prototype
if(typeof a=="boolean")return J.fK.prototype
if(a.constructor==Array)return J.aQ.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aT.prototype
return a}if(a instanceof P.c)return a
return J.bA(a)}
J.A=function(a){if(typeof a=="string")return J.aS.prototype
if(a==null)return a
if(a.constructor==Array)return J.aQ.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aT.prototype
return a}if(a instanceof P.c)return a
return J.bA(a)}
J.b4=function(a){if(a==null)return a
if(a.constructor==Array)return J.aQ.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aT.prototype
return a}if(a instanceof P.c)return a
return J.bA(a)}
J.cu=function(a){if(typeof a=="number")return J.aR.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.b1.prototype
return a}
J.eq=function(a){if(typeof a=="number")return J.aR.prototype
if(typeof a=="string")return J.aS.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.b1.prototype
return a}
J.j3=function(a){if(typeof a=="string")return J.aS.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.b1.prototype
return a}
J.O=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.aT.prototype
return a}if(a instanceof P.c)return a
return J.bA(a)}
J.eC=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.eq(a).p(a,b)}
J.a5=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.p(a).L(a,b)}
J.T=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.cu(a).a0(a,b)}
J.cA=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.cu(a).C(a,b)}
J.cB=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.et(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.A(a).h(a,b)}
J.eD=function(a,b,c){if(typeof b==="number")if((a.constructor==Array||H.et(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.b4(a).l(a,b,c)}
J.eE=function(a,b){return J.eq(a).aF(a,b)}
J.cC=function(a,b){return J.b4(a).a_(a,b)}
J.eF=function(a){return J.O(a).geH(a)}
J.at=function(a){return J.p(a).gI(a)}
J.aL=function(a){return J.b4(a).gP(a)}
J.ad=function(a){return J.A(a).gt(a)}
J.eG=function(a){return J.O(a).gaI(a)}
J.eH=function(a){return J.O(a).gfA(a)}
J.eI=function(a){return J.O(a).gfO(a)}
J.aM=function(a){return J.O(a).gm(a)}
J.aN=function(a){return J.O(a).gn(a)}
J.eJ=function(a,b){return J.b4(a).cW(a,b)}
J.eK=function(a){return J.b4(a).fG(a)}
J.eL=function(a,b){return J.O(a).ad(a,b)}
J.cD=function(a,b){return J.O(a).sa9(a,b)}
J.bF=function(a,b){return J.O(a).scT(a,b)}
J.cE=function(a,b){return J.O(a).saI(a,b)}
J.bG=function(a,b){return J.O(a).sm(a,b)}
J.bH=function(a,b){return J.O(a).sn(a,b)}
J.cF=function(a){return J.cu(a).V(a)}
J.eM=function(a){return J.j3(a).fS(a)}
J.a2=function(a){return J.p(a).k(a)}
I.ar=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.C=W.bI.prototype
C.N=J.h.prototype
C.d=J.aQ.prototype
C.k=J.d8.prototype
C.b=J.d9.prototype
C.c=J.da.prototype
C.a=J.aR.prototype
C.u=J.aS.prototype
C.U=J.aT.prototype
C.a2=H.h6.prototype
C.I=J.ho.prototype
C.L=W.hH.prototype
C.B=J.b1.prototype
C.t=W.hY.prototype
C.e=new V.bJ(0,"BodyType.STATIC")
C.D=new V.bJ(1,"BodyType.KINEMATIC")
C.f=new V.bJ(2,"BodyType.DYNAMIC")
C.j=new P.iu()
C.E=new P.ax(0)
C.o=new V.bR(0,"EPAxisType.UNKNOWN")
C.p=new V.bR(1,"EPAxisType.EDGE_A")
C.F=new V.bR(2,"EPAxisType.EDGE_B")
C.O=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.P=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
C.G=function(hooks) { return hooks; }

C.Q=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
C.R=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
C.S=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
C.T=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
C.H=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.V=new V.aU(11,"JointType.CONSTANT_VOLUME")
C.W=new V.aU(3,"JointType.DISTANCE")
C.X=new V.aU(4,"JointType.PULLEY")
C.Y=new V.aU(5,"JointType.MOUSE")
C.Z=new V.aU(9,"JointType.FRICTION")
C.a_=H.f(I.ar(["*::class","*::dir","*::draggable","*::hidden","*::id","*::inert","*::itemprop","*::itemref","*::itemscope","*::lang","*::spellcheck","*::title","*::translate","A::accesskey","A::coords","A::hreflang","A::name","A::shape","A::tabindex","A::target","A::type","AREA::accesskey","AREA::alt","AREA::coords","AREA::nohref","AREA::shape","AREA::tabindex","AREA::target","AUDIO::controls","AUDIO::loop","AUDIO::mediagroup","AUDIO::muted","AUDIO::preload","BDO::dir","BODY::alink","BODY::bgcolor","BODY::link","BODY::text","BODY::vlink","BR::clear","BUTTON::accesskey","BUTTON::disabled","BUTTON::name","BUTTON::tabindex","BUTTON::type","BUTTON::value","CANVAS::height","CANVAS::width","CAPTION::align","COL::align","COL::char","COL::charoff","COL::span","COL::valign","COL::width","COLGROUP::align","COLGROUP::char","COLGROUP::charoff","COLGROUP::span","COLGROUP::valign","COLGROUP::width","COMMAND::checked","COMMAND::command","COMMAND::disabled","COMMAND::label","COMMAND::radiogroup","COMMAND::type","DATA::value","DEL::datetime","DETAILS::open","DIR::compact","DIV::align","DL::compact","FIELDSET::disabled","FONT::color","FONT::face","FONT::size","FORM::accept","FORM::autocomplete","FORM::enctype","FORM::method","FORM::name","FORM::novalidate","FORM::target","FRAME::name","H1::align","H2::align","H3::align","H4::align","H5::align","H6::align","HR::align","HR::noshade","HR::size","HR::width","HTML::version","IFRAME::align","IFRAME::frameborder","IFRAME::height","IFRAME::marginheight","IFRAME::marginwidth","IFRAME::width","IMG::align","IMG::alt","IMG::border","IMG::height","IMG::hspace","IMG::ismap","IMG::name","IMG::usemap","IMG::vspace","IMG::width","INPUT::accept","INPUT::accesskey","INPUT::align","INPUT::alt","INPUT::autocomplete","INPUT::autofocus","INPUT::checked","INPUT::disabled","INPUT::inputmode","INPUT::ismap","INPUT::list","INPUT::max","INPUT::maxlength","INPUT::min","INPUT::multiple","INPUT::name","INPUT::placeholder","INPUT::readonly","INPUT::required","INPUT::size","INPUT::step","INPUT::tabindex","INPUT::type","INPUT::usemap","INPUT::value","INS::datetime","KEYGEN::disabled","KEYGEN::keytype","KEYGEN::name","LABEL::accesskey","LABEL::for","LEGEND::accesskey","LEGEND::align","LI::type","LI::value","LINK::sizes","MAP::name","MENU::compact","MENU::label","MENU::type","METER::high","METER::low","METER::max","METER::min","METER::value","OBJECT::typemustmatch","OL::compact","OL::reversed","OL::start","OL::type","OPTGROUP::disabled","OPTGROUP::label","OPTION::disabled","OPTION::label","OPTION::selected","OPTION::value","OUTPUT::for","OUTPUT::name","P::align","PRE::width","PROGRESS::max","PROGRESS::min","PROGRESS::value","SELECT::autocomplete","SELECT::disabled","SELECT::multiple","SELECT::name","SELECT::required","SELECT::size","SELECT::tabindex","SOURCE::type","TABLE::align","TABLE::bgcolor","TABLE::border","TABLE::cellpadding","TABLE::cellspacing","TABLE::frame","TABLE::rules","TABLE::summary","TABLE::width","TBODY::align","TBODY::char","TBODY::charoff","TBODY::valign","TD::abbr","TD::align","TD::axis","TD::bgcolor","TD::char","TD::charoff","TD::colspan","TD::headers","TD::height","TD::nowrap","TD::rowspan","TD::scope","TD::valign","TD::width","TEXTAREA::accesskey","TEXTAREA::autocomplete","TEXTAREA::cols","TEXTAREA::disabled","TEXTAREA::inputmode","TEXTAREA::name","TEXTAREA::placeholder","TEXTAREA::readonly","TEXTAREA::required","TEXTAREA::rows","TEXTAREA::tabindex","TEXTAREA::wrap","TFOOT::align","TFOOT::char","TFOOT::charoff","TFOOT::valign","TH::abbr","TH::align","TH::axis","TH::bgcolor","TH::char","TH::charoff","TH::colspan","TH::headers","TH::height","TH::nowrap","TH::rowspan","TH::scope","TH::valign","TH::width","THEAD::align","THEAD::char","THEAD::charoff","THEAD::valign","TR::align","TR::bgcolor","TR::char","TR::charoff","TR::valign","TRACK::default","TRACK::kind","TRACK::label","TRACK::srclang","UL::compact","UL::type","VIDEO::controls","VIDEO::height","VIDEO::loop","VIDEO::mediagroup","VIDEO::muted","VIDEO::preload","VIDEO::width"]),[P.w])
C.a0=I.ar(["HEAD","AREA","BASE","BASEFONT","BR","COL","COLGROUP","EMBED","FRAME","FRAMESET","HR","IMAGE","IMG","INPUT","ISINDEX","LINK","META","PARAM","SOURCE","STYLE","TITLE","WBR"])
C.a1=I.ar([])
C.v=H.f(I.ar(["bind","if","ref","repeat","syntax"]),[P.w])
C.w=H.f(I.ar(["A::href","AREA::href","BLOCKQUOTE::cite","BODY::background","COMMAND::icon","DEL::cite","FORM::action","IMG::src","INPUT::src","INS::cite","Q::cite","VIDEO::poster"]),[P.w])
C.m=new V.c0(0,"ManifoldType.CIRCLES")
C.i=new V.c0(1,"ManifoldType.FACE_A")
C.q=new V.c0(2,"ManifoldType.FACE_B")
C.x=new V.cc(0,"SeparationFunctionType.POINTS")
C.y=new V.cc(1,"SeparationFunctionType.FACE_A")
C.z=new V.cc(2,"SeparationFunctionType.FACE_B")
C.h=new V.bs(0,"ShapeType.CIRCLE")
C.n=new V.bs(1,"ShapeType.EDGE")
C.l=new V.bs(2,"ShapeType.POLYGON")
C.r=new V.bs(3,"ShapeType.CHAIN")
C.J=new V.b0(0,"TOIOutputState.UNKNOWN")
C.K=new V.b0(1,"TOIOutputState.FAILED")
C.a3=new V.b0(2,"TOIOutputState.OVERLAPPED")
C.A=new V.b0(3,"TOIOutputState.TOUCHING")
C.a4=new V.b0(4,"TOIOutputState.SEPARATED")
C.M=new V.hV(0,"VertexType.ISOLATED")
$.dr="$cachedFunction"
$.ds="$cachedInvocation"
$.al=null
$.r=null
$.U=0
$.av=null
$.cJ=null
$.cw=null
$.el=null
$.ew=null
$.by=null
$.bC=null
$.cx=null
$.ap=null
$.aH=null
$.aI=null
$.cp=!1
$.I=C.j
$.d0=0
$.x=null
$.a3=null
$.bS=null
$.cZ=null
$.cY=null
$.cT=0
$.cU=0
$.cV=20
$.dG=0
$.dH=0
$.dI=0
$.dK=0
$.dJ=0
$.ju=1
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){$dart_deferred_initializers$[a]($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryUris={}
init.deferredLibraryHashes={};(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["cQ","$get$cQ",function(){return H.er("_$dart_dartClosure")},"bW","$get$bW",function(){return H.er("_$dart_js")},"d5","$get$d5",function(){return H.fE()},"d6","$get$d6",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.d0
$.d0=z+1
z="expando$key$"+z}return new P.fp(null,z)},"dS","$get$dS",function(){return H.a_(H.bu({
toString:function(){return"$receiver$"}}))},"dT","$get$dT",function(){return H.a_(H.bu({$method$:null,
toString:function(){return"$receiver$"}}))},"dU","$get$dU",function(){return H.a_(H.bu(null))},"dV","$get$dV",function(){return H.a_(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"dZ","$get$dZ",function(){return H.a_(H.bu(void 0))},"e_","$get$e_",function(){return H.a_(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"dX","$get$dX",function(){return H.a_(H.dY(null))},"dW","$get$dW",function(){return H.a_(function(){try{null.$method$}catch(z){return z.message}}())},"e1","$get$e1",function(){return H.a_(H.dY(void 0))},"e0","$get$e0",function(){return H.a_(function(){try{(void 0).$method$}catch(z){return z.message}}())},"ci","$get$ci",function(){return P.i4()},"aJ","$get$aJ",function(){return[]},"ec","$get$ec",function(){return P.dc(["A","ABBR","ACRONYM","ADDRESS","AREA","ARTICLE","ASIDE","AUDIO","B","BDI","BDO","BIG","BLOCKQUOTE","BR","BUTTON","CANVAS","CAPTION","CENTER","CITE","CODE","COL","COLGROUP","COMMAND","DATA","DATALIST","DD","DEL","DETAILS","DFN","DIR","DIV","DL","DT","EM","FIELDSET","FIGCAPTION","FIGURE","FONT","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","I","IFRAME","IMG","INPUT","INS","KBD","LABEL","LEGEND","LI","MAP","MARK","MENU","METER","NAV","NOBR","OL","OPTGROUP","OPTION","OUTPUT","P","PRE","PROGRESS","Q","S","SAMP","SECTION","SELECT","SMALL","SOURCE","SPAN","STRIKE","STRONG","SUB","SUMMARY","SUP","TABLE","TBODY","TD","TEXTAREA","TFOOT","TH","THEAD","TIME","TR","TRACK","TT","U","UL","VAR","VIDEO","WBR"],null)},"cm","$get$cm",function(){return P.db()},"af","$get$af",function(){return E.e4()},"cg","$get$cg",function(){return E.e4()}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,args:[,]},{func:1,v:true},{func:1,v:true,args:[{func:1,v:true}]},{func:1,ret:P.w,args:[P.l]},{func:1,args:[P.dM]},{func:1,ret:P.cr,args:[W.ag,P.w,P.w,W.cl]},{func:1,args:[,P.w]},{func:1,args:[P.w]},{func:1,args:[{func:1,v:true}]},{func:1,args:[,,]},{func:1,v:true,args:[W.o,W.o]},{func:1,args:[P.l,P.c]},{func:1,v:true,args:[P.P]},{func:1,ret:P.P},{func:1,ret:P.l,args:[P.u,P.u]},{func:1,ret:E.a},{func:1,ret:P.c},{func:1,ret:V.c6}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
if(x==y)H.js(d||a)
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.ar=a.ar
Isolate.G=a.G
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.ey(D.eo(),b)},[])
else (function(b){H.ey(D.eo(),b)})([])})})()