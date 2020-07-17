"use strict";

/**
 * JS工具类
 */
function JSTool() {

    if (typeof this.millisecond2Date !== "function") {
        /**
         * 日期转时间戳
         * @param  {[date]} date [日期转换为毫秒数]
         */
        JSTool.prototype.date2Millisecond = function(date) {
            var millisecond = 0;
            date = date.replace(new RegExp("年|月", "gm"), "/");
            date = date.replace(new RegExp("时|分", "gm"), ":");
            date = date.replace(new RegExp("日|秒", "gm"), "");
            date = date.replace(new RegExp("-", "gm"), "/");
            millisecond = new Date(date).getTime();

            return millisecond;
        }
    }

    if (typeof this.millisecond2Date !== "function") {
        /**
         * 时间戳（毫秒）格式化为指定的日期格式
         * @param  {[all]} millisecond 毫秒值
         * @param  {[type]} format 日期格式
         */
        JSTool.prototype.millisecond2Date = function(millisecond, format) {
            var millisecondInt = parseInt(millisecond);
            if (!isNaN(millisecondInt)) {
                var millisecondLen = millisecondInt.toString().length;
                if (millisecondLen === 10) {
                    millisecondInt = millisecondInt * 1000;
                }
                if (millisecondLen !== 10 && millisecondLen !== 13) {
                    return millisecond;
                }
                var date = new Date(millisecondInt);
                var map = {
                    'M': date.getMonth() + 1, // 月份
                    'D': date.getDate(), // 日
                    'W': date.getDay(), // 星期几
                    'h': date.getHours(), // 小时
                    'm': date.getMinutes(), // 分
                    's': date.getSeconds(), // 秒
                    'q': Math.floor((date.getMonth() + 3) / 3), // 季度
                    'S': date.getMilliseconds() // 毫秒
                };
                format = format.replace(/([YMDhmsqSW])+/g, function(all, t) {
                    var v = map[t];
                    if (v !== undefined) {
                        if (all.length > 1) {
                            v = '0' + v;
                            v = v.substr(v.length - 2);
                        }
                        // 如果是星期格式
                        if (t === 'W') {
                            var weekArray = new Array("日", "一", "二", "三", "四", "五", "六"),
                                week = weekArray[date.getDay()];
                            v = week;
                        }
                        return v;
                    } else if (t === 'Y') {
                        return (date.getFullYear() + '').substr(4 - all.length);
                    }

                    return all;
                });
                return format;
            } else {
                return millisecond;
            }
        };
    }

    if (typeof this.getQueryVariable !== "function") {
        /**
         * 获取url中的参数
         * @param  {[string]} variable 参数名
         */
        JSTool.prototype.getQueryVariable = function(variable) {
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0] == variable) { return pair[1]; }
            }
            return (false);
        }
    }

    if (typeof this.isEmpty !== "function") {
        /**
         * 非空判断
         * @param  {[all]}  param 需要判断的值
         * @return {Boolean}  true/false
         */
        JSTool.prototype.isEmpty = function(param) {
            switch (typeof param) {
                case 'undefined':
                    return true;
                    break;
                case 'string':
                    if (param.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) {
                        return true;
                    }
                    break;
                case 'boolean':
                    if (!param) {
                        return true;
                    }
                    break;
                case 'number':
                    if (param === 0 || isNaN(param)) {
                        return true;
                    }
                    break;
                case 'object':
                    if (JSON.stringify(param) == '[]' || JSON.stringify(param) == '{}' || JSON.stringify(param) == 'null') {
                        return true;
                    }
                    break;
                default:
                    break;
            }
            return false;
        }
    }

    if (typeof this.isArray !== "function") {
        /**
         * 判断对象obj是否为数组
         * @param {[object]} obj
         */
        JSTool.prototype.isArray = function(obj) {
            if (Object.prototype.toString.call(obj) === '[object Array]') {
                return true;
            } else {
                return false;
            }
        }
    }

    if (typeof this.isObject !== "function") {
        /**
         * 判断对象obj是否为对象
         * @param {[object]} obj
         */
        JSTool.prototype.isObject = function(obj) {
            if (Object.prototype.toString.call(obj) === '[object Object]') {
                return true;
            } else {
                return false;
            }
        }
    }

    if (typeof this.isString !== "function") {
        /**
         * 判断对象obj是否为字符串
         * @param {[object]} obj
         */
        JSTool.prototype.isString = function(obj) {
            if (Object.prototype.toString.call(obj) === '[object String]') {
                return true;
            } else {
                return false;
            }
        }
    }

    if (typeof this.isFunction !== "function") {
        /**
         * 判断对象obj是否为函数
         * @param {[object]} obj
         */
        JSTool.prototype.isFunction = function(obj) {
            if (Object.prototype.toString.call(obj) === '[object Function]') {
                return true;
            } else {
                return false;
            }
        }
    }

    if (typeof this.objSort !== "function") {
        /**
         * 对象排序
         * @param  {[string]} prop [需要排序的字段名]
         */
        JSTool.prototype.objSort = function(prop, seq) {
            return function(obj1, obj2) {
                var val1 = obj1[prop];
                var val2 = obj2[prop];
                if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                    val1 = Number(val1);
                    val2 = Number(val2);
                }

                if (seq === 'asc') {
                    console.log('ascasc');
                    if (val1 < val2) {
                        return -1;
                    } else if (val1 > val2) {
                        return 1;
                    } else {
                        return 0;
                    }
                } else {
                    console.log('descdesc');
                    if (val1 < val2) {
                        return 1;
                    } else if (val1 > val2) {
                        return -1;
                    } else {
                        return 0;
                    }
                }

            }
        }
    }

    if (typeof this.isValidURL !== "function") {
        /**
         * 判断地址是否为有效网址
         */
        JSTool.prototype.isValidURL = function(chars) {
            var re = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(\S+\.\S+)$/;

            if (!isEmpty(chars)) {
                chars = chars.trim();
                if (chars.match(re) == null)
                    return false;
                else
                    return true;
            }

            return false;
        }
    }

    if (typeof this.getBrowserVersion !== "function") {
        /**
         * 判断访问终端
         * 调用方式 new JSTool().getBrowserVersion().trident 判断是否为ie
         */
        JSTool.prototype.getBrowserVersion = function() {
            var u = navigator.userAgent,
                app = navigator.appVersion;

            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                weixin: u.indexOf('MicroMessenger') > -1, //是否微信
                qq: u.match(/\sQQ/i) == " qq" //是否QQ
            };
        }
    }

    if (typeof this.getRandomArrayElements !== "function") {
        /**
         * 从数组中随机取出n个元素组成新数组
         * @return {[array]} 新数组
         */
        JSTool.prototype.getRandomArrayElements = function() {
            var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
            while (i-- > min) {
                index = Math.floor((i + 1) * Math.random());
                temp = shuffled[index];
                shuffled[index] = shuffled[i];
                shuffled[i] = temp;
            }
            return shuffled.slice(min);
        }
    }

}