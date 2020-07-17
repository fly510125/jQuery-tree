/*
 * @Author: omtech.cn 
 * @Date: 2020-07-17 16:55:41 
 * @Last Modified by: OMT.Xu
 * @Last Modified time: 2020-07-17 17:21:40
 */

'use strict'


/**
 *
 * 检测数据是不是除了symbol外的原始数据
 * @param {*} value
 * @returns
 */
function isStatic(value) {
	return (
		typeof value === 'string' ||
		typeof value === 'number' ||
		typeof value === 'boolean' ||
		typeof value === 'undefined' ||
		value === null
	)
}

/**
 *
 * 检测数据是不是原始数据
 * @param {*} value
 * @returns
 */
function isPrimitive(value) {
	return isStatic(value) || typeof value === 'symbol'
}

/**
 *
 * 判断数据是不是引用类型的数据（例如：array,function,object,regexe,new Number(),new String())
 * @param {*} value
 * @returns
 */
function isObject(value) {
	let type = typeof value;
	return value != null && (type == 'object' || type == 'function');
}

/**
 *
 * 获取数据类型，返回结果为Number、String、Object、Array等
 * @param {*} value
 * @returns
 */
function getRawType(value) {
	return Object.prototype.toString.call(value).slice(8, -1)
}


/**
 * 检查数据是否是非数字值
 *
 * @param {*} v
 * @returns
 */
function _isNaN(v){
    return !(typeof v === 'string' || typeof v === 'number') || isNaN(v)
}

/**
 * 求取数组中非NaN数据中的最大值
 *
 * @param {*} arr
 * @returns
 */
function max(arr){
    arr = arr.filter(item => !_isNaN(item))
    return arr.length ? Math.max.apply(null, arr) : undefined
}
//max([1, 2, '11', null, 'fdf', []]) ==> 11


/**
 * 求取数组中非NaN数据中的最小值
 *
 * @param {*} arr
 * @returns
 */
function min(arr){
    arr = arr.filter(item => !_isNaN(item))
    return arr.length ? Math.min.apply(null, arr) : undefined
}
//min([1, 2, '11', null, 'fdf', []]) ==> 1

/**
 *
 * 判断数据是不是Object类型的数据
 * @param {*} obj
 * @returns
 */
function isPlainObject(obj) {
	return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * 判断数据是不是数组类型的数据
 *
 * @param {*} arr
 * @returns
 */
function isArray(arr) {
	return Object.prototype.toString.call(arr) === '[object Array]'
}

/**
 * 判断数据是不是正则对象
 *
 * @param {*} value
 * @returns
 */
function isRegExp(value) {
	return Object.prototype.toString.call(value) === '[object RegExp]'
}

/**
 * 判断数据是不是时间对象
 *
 * @param {*} value
 * @returns
 */
function isDate(value) {
    return Object.prototype.toString.call(value) === '[object Date]'
}

/**
 * 判断value是不是浏览器内置函数
   内置函数toString后的主体代码块为[native code] ，而非内置函数则为相关代码，所以非内置函数可以进行拷贝（toString后掐头去尾再由Function转）
 *
 * @param {*} value
 * @returns
 */
function isNative(value) {
	return typeof value === 'function' && /native code/.test(value.toString())
}


/**
 * 检查value是不是函数
 *
 * @param {*} value
 * @returns
 */
function isFunction(value) {
	return Object.prototype.toString.call(value) === '[object Function]'
}

/**
 * 检查value是否为有效的类数组长度
 *
 * @param {*} value
 * @returns
 */
function isLength(value) {
	return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= Number.MAX_SAFE_INTEGER;
}


/**
 * 检查value是否是类数组
   如果一个值被认为是类数组，那么它不是一个函数，并且value.length是个整数，大于等于0，小于或等于Number.MAX_SAFE_INTEGER。这里字符串也被当作类数组。
 *
 * @param {*} value
 * @returns
 */
function isArrayLike(value) {
	return value != null && isLength(value.length) && !isFunction(value);
}


/**
 * 检查value是否为空
   如果是null，直接返回true；如果是类数组，判断数据长度；如果是Object对象，判断是否具有属性；如果是其他数据，直接返回false（也可以改为返回true）
 *
 * @param {*} value
 * @returns
 */
function isEmpty(value) {
	if (value == null) {
		return true;
	}
	if (isArrayLike(value)) {
		return !value.length;
	} else if (isPlainObject(value)) {
		for (let key in value) {
			if (hasOwnProperty.call(value, key)) {
				return false;
			}
		}
	}
	return false;
}

/**
 * 记忆函数：缓存函数的运算结果
 *
 * @param {*} fn
 * @returns
 */
function cached(fn) {
	let cache = Object.create(null);
	return function cachedFn(str) {
		let hit = cache[str];
		return hit || (cache[str] = fn(str))
	}
}

// 对象属性复制，浅拷贝
Object.assign = Object.assign || function() {
	if (arguments.length == 0) throw new TypeError('Cannot convert undefined or null to object');
	let target = arguments[0],
		args = Array.prototype.slice.call(arguments, 1),
		key;
	args.forEach(function(item) {
		for (key in item) {
			item.hasOwnProperty(key) && (target[key] = item[key])
		}
	})
	return target
}

// 使用Object.assign可以浅克隆一个对象：
let clone = Object.assign({}, target);

// 简单的深克隆可以使用JSON.parse()和JSON.stringify()，这两个api是解析json数据的，所以只能解析除symbol外的原始类型及数组和对象。
let clone = JSON.parse( JSON.stringify(target) )


/**
 * 克隆数据，可深度克隆
   这里列出了原始类型，时间、正则、错误、数组、对象的克隆规则，其他的可自行补充
 *
 * @param {*} value
 * @param {*} deep
 * @returns
 */
function clone(value, deep) {
	if (isPrimitive(value)) {
		return value
	}
	if (isArrayLike(value)) {  //是类数组
		value = Array.prototype.slice.call(vall)
		return value.map(item => deep ? clone(item, deep) : item)
	} else if (isPlainObject(value)) {  //是对象
		let target = {}, key;
		for (key in value) {
			value.hasOwnProperty(key) && ( target[key] = deep ? clone(value[key], value[key]))
		}
	}
	let type = getRawType(value);
	switch(type) {
		case 'Date':
		case 'RegExp':
		case 'Error': value = new window[type](value); break;
	}
	return value
}

/******************************************************************* */
// 识别各种浏览器及平台

//运行环境是浏览器
let inBrowser = typeof window !== 'undefined';
//运行环境是微信
let inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
let weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
//浏览器 UA 判断
let UA = inBrowser && window.navigator.userAgent.toLowerCase();
let isIE = UA && /msie|trident/.test(UA);
let isIE9 = UA && UA.indexOf('msie 9.0') > 0;
let isEdge = UA && UA.indexOf('edge/') > 0;
let isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
let isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
let isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
/******************************************************************* */


/**
 * 获取浏览器信息
 *
 * @returns
 */
function getExplorerInfo() {
    let t = navigator.userAgent.toLowerCase();
    return 0 <= t.indexOf("msie") ? { //ie < 11
        type: "IE",
        version: Number(t.match(/msie ([\d]+)/)[1])
    } : !!t.match(/trident\/.+?rv:(([\d.]+))/) ? { // ie 11
        type: "IE",
        version: 11
    } : 0 <= t.indexOf("edge") ? {
        type: "Edge",
        version: Number(t.match(/edge\/([\d]+)/)[1])
    } : 0 <= t.indexOf("firefox") ? {
        type: "Firefox",
        version: Number(t.match(/firefox\/([\d]+)/)[1])
    } : 0 <= t.indexOf("chrome") ? {
        type: "Chrome",
        version: Number(t.match(/chrome\/([\d]+)/)[1])
    } : 0 <= t.indexOf("opera") ? {
        type: "Opera",
        version: Number(t.match(/opera.([\d]+)/)[1])
    } : 0 <= t.indexOf("Safari") ? {
        type: "Safari",
        version: Number(t.match(/version\/([\d]+)/)[1])
    } : {
        type: t,
        version: -1
    }
}


/**
 * 检测是否为PC端浏览器模式
 *
 * @returns
 */
function isPCBroswer() {
    let e = navigator.userAgent.toLowerCase()
        , t = "ipad" == e.match(/ipad/i)
        , i = "iphone" == e.match(/iphone/i)
        , r = "midp" == e.match(/midp/i)
        , n = "rv:1.2.3.4" == e.match(/rv:1.2.3.4/i)
        , a = "ucweb" == e.match(/ucweb/i)
        , o = "android" == e.match(/android/i)
        , s = "windows ce" == e.match(/windows ce/i)
        , l = "windows mobile" == e.match(/windows mobile/i);
    return !(t || i || r || n || a || o || s || l)
}


/**
 * 数组去重，返回一个新数组
 *
 * @param {*} arr
 * @returns
 */
function unique(arr){
    if(!isArrayLink(arr)){ //不是类数组对象
        return arr
    }
    let result = []
    let objarr = []
    let obj = Object.create(null)
    
    arr.forEach(item => {
        if(isStatic(item)){//是除了symbol外的原始数据
            let key = item + '_' + getRawType(item);
            if(!obj[key]){
                obj[key] = true
                result.push(item)
            }
        }else{//引用类型及symbol
            if(!objarr.includes(item)){
                objarr.push(item)
                result.push(item)
            }
        }
    })
    
    return resulte
}


/**
 * 格式化时间
 *
 * @param {*} formater
 * @param {*} t
 * @returns
 */
function dateFormater(formater, t){
    let date = t ? new Date(t) : new Date(),
        Y = date.getFullYear() + '',
        M = date.getMonth() + 1,
        D = date.getDate(),
        H = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds();
    return formater.replace(/YYYY|yyyy/g,Y)
        .replace(/YY|yy/g,Y.substr(2,2))
        .replace(/MM/g,(M<10?'0':'') + M)
        .replace(/DD/g,(D<10?'0':'') + D)
        .replace(/HH|hh/g,(H<10?'0':'') + H)
        .replace(/mm/g,(m<10?'0':'') + m)
        .replace(/ss/g,(s<10?'0':'') + s)
}
// dateFormater('YYYY-MM-DD HH:mm', t) ==> 2019-06-26 18:30
// dateFormater('YYYYMMDDHHmm', t) ==> 201906261830

/**
 * 将指定字符串由一种时间格式转化为另一种。From的格式应对应str的位置
 *
 * @param {*} str
 * @param {*} from
 * @param {*} to
 * @returns
 */
function dateStrForma(str, from, to){
    //'20190626' 'YYYYMMDD' 'YYYY年MM月DD日'
    str += ''
    let Y = ''
    if(~(Y = from.indexOf('YYYY'))){
        Y = str.substr(Y, 4)
        to = to.replace(/YYYY|yyyy/g,Y)
    }else if(~(Y = from.indexOf('YY'))){
        Y = str.substr(Y, 2)
        to = to.replace(/YY|yy/g,Y)
    }

    let k,i
    ['M','D','H','h','m','s'].forEach(s =>{
        i = from.indexOf(s+s)
        k = ~i ? str.substr(i, 2) : ''
        to = to.replace(s+s, k)
    })
    return to
}
// dateStrForma('20190626', 'YYYYMMDD', 'YYYY年MM月DD日') ==> 2019年06月26日
// dateStrForma('121220190626', '----YYYYMMDD', 'YYYY年MM月DD日') ==> 2019年06月26日
// dateStrForma('2019年06月26日', 'YYYY年MM月DD日', 'YYYYMMDD') ==> 20190626

// 一般的也可以使用正则来实现
//'2019年06月26日'.replace(/(\d{4})年(\d{2})月(\d{2})日/, '$1-$2-$3') ==> 2019-06-26



/**
 * 全屏
 *
 */
function toFullScreen() {
	let elem = document.body;
    elem.webkitRequestFullScreen
    ? elem.webkitRequestFullScreen()
    : elem.mozRequestFullScreen
    ? elem.mozRequestFullScreen()
    : elem.msRequestFullscreen
    ? elem.msRequestFullscreen()
    : elem.requestFullScreen
    ? elem.requestFullScreen()
    : alert("浏览器不支持全屏");
}


/**
 * 退出全屏
 *
 */
function exitFullscreen() {
	let elem = parent.document;
	elem.webkitCancelFullScreen
	? elem.webkitCancelFullScreen()
	: elem.mozCancelFullScreen
	? elem.mozCancelFullScreen()
    : elem.cancelFullScreen
    ? elem.cancelFullScreen()
    : elem.msExitFullscreen
    ? elem.msExitFullscreen()
    : elem.exitFullscreen
    ? elem.exitFullscreen()
    : alert("切换失败,可尝试Esc退出");
}


/**
 * 返回一个lower-upper直接的随机数。（lower、upper无论正负与大小，但必须是非NaN的数据）
 * 
 * @param {*} lower
 * @param {*} upper
 * @returns
 */
function random(lower, upper) {
	lower = +lower || 0
	upper = +upper || 0
	return Math.random() * (upper - lower) + lower;
}

// performance.timing:利用performance.timing进行性能分析
window.onload = function() {
	setTimeout(function() {
		let t = performance.timing;
		console.log('DNS查询耗时 ：' + (t.domainLookupEnd - t.domainLookupStart).toFixed(0))
        console.log('TCP链接耗时 ：' + (t.connectEnd - t.connectStart).toFixed(0))
        console.log('request请求耗时 ：' + (t.responseEnd - t.responseStart).toFixed(0))
        console.log('解析dom树耗时 ：' + (t.domComplete - t.domInteractive).toFixed(0))
        console.log('白屏时间 ：' + (t.responseStart - t.navigationStart).toFixed(0))
        console.log('domready时间 ：' + (t.domContentLoadedEventEnd - t.navigationStart).toFixed(0))
        console.log('onload时间 ：' + (t.loadEventEnd - t.navigationStart).toFixed(0))
        if (t = performance.memory) {
			console.log('js内存使用占比：' +  (t.usedJSHeapSize / t.totalJSHeapSize * 100).toFixed(2) + '%')
		}
	})
}


// 禁止某些键盘事件
document.addEventListener('keydown', function(event) {
	return !(
		112 == event.keyCode ||		//禁止F1
		123 == event.keyCode ||		//禁止F12
		event.ctrlKey && 82 == event.keyCode ||		//禁止ctrl+R
		event.ctrlKey && 18 == event.keyCode ||		//禁止ctrl+N
		event.shiftKey && 121 == event.keyCode ||  		//禁止shift+F10
		event.altKey && 115 == event.keyCode ||		//禁止alt+F4
		"A" == event.srcElement.tagName && event.shiftKey		//禁止shift+点击a标签
	) || (event.returnValue = false)
});


// 禁止右键、选择、复制
['contextmenu', 'selectstart', 'copy'].forEach(function(ev) {
	document.addEventListener(ev, function(event) {
		return event.returnValue = false;
	})
});