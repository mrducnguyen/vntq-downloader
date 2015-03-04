'use strict';

var helpers = {
    getBaseUrl: function () {
        if (require) {
            if (require.showplannerAppBaseUrl) {
                return require.showplannerAppBaseUrl;
            }

            require.showplannerAppBaseUrl = require.toUrl('');
            var idx;
            if ((idx = require.showplannerAppBaseUrl.indexOf('?')) >= 0) {
                require.showplannerAppBaseUrl = require.showplannerAppBaseUrl.slice(0, idx);
            }
            return require.showplannerAppBaseUrl;
        }
        return null;
    },

    toQueryString: function (json) {
        var queryString = '';
        for (var key in json) {
            queryString += key + '=' + json[key] + '&';
        }
        return queryString.slice(0, -1);
    },

    extend: function (target, source) {
        target = target || {};
        for (var prop in source) {
            if (typeof source[prop] === 'object') {
                target[prop] = helpers.extend(target[prop], source[prop]);
            } else {
                target[prop] = source[prop];
            }
        }
        return target;
    },

    heapSize: function () {
        if (!performance.memory) {
            return('!!! performance.memory not supported !!!');
        }
        if (!performance.memory.usedJSHeapSize) {
            return('!!! performance.memory.usedJSHeapSize not supported !!!');
        }
        return Math.round(performance.memory.usedJSHeapSize / 10000, 2) / 100 + ' MB';
    },

    saveToDisk: function (blobURL, fileName) {
        var reader = new FileReader();
        reader.readAsDataURL(blobURL);
        reader.onload = function (event) {
            var save = document.createElement('a');
            save.href = event.target.result;
            save.target = '_blank';
            save.download = fileName || 'unknown file';

            var event = document.createEvent('Event');
            event.initEvent('click', true, true);
            save.dispatchEvent(event);
            (window.URL || window.webkitURL).revokeObjectURL(save.href);
        };
    },

    dateFromIso: function (dateString) {
        // test if browser support ISO date string or not
        // method from here: http://stackoverflow.com/questions/11020658/javascript-json-date-parse-in-ie7-ie8-returns-nan
        var dateFunction;
        var D= new Date('2011-06-02T09:34:29+02:00');
        if(!D || +D!== 1307000069000){
            dateFunction = function(s){
                var day, tz,
                rx=/^(\d{4}\-\d\d\-\d\d([tT ][\d:\.]*)?)([zZ]|([+\-])(\d\d):(\d\d))?$/,
                p= rx.exec(s) || [];
                if(p[1]){
                    day= p[1].split(/\D/);
                    for(var i= 0, L= day.length; i<L; i++){
                        day[i]= parseInt(day[i], 10) || 0;
                    }
                    day[1] -= 1;
                    day = new Date(Date.UTC.apply(Date, day));
                    if(!day.getDate()) return NaN;
                    if(p[5]){
                        tz = (parseInt(p[5], 10)*60);
                        if(p[6]) tz+= parseInt(p[6], 10);
                        if(p[4]== '+') tz*= -1;
                        if(tz) day.setUTCMinutes(day.getUTCMinutes()+ tz);
                    }
                    return day;
                }
                return NaN;
            };
        }
        else{
            dateFunction = function(s) {
                return new Date(s);
            };
        }

        return dateFunction(dateString);
    },

    numberEncode: function (base, num) {
        //TODO: implement fail-safe codes
        var result = '',
            sNum = num + '',
            i = 0,
            j = sNum.length;
        for (; i < j; i++) {
            result += base[parseInt(sNum.charAt(i))];
        }
        return result;
    },

    numberDecode: function (base, encode) {
        //TODO: implement fail-safe codes
        var result = '',
            val,
            i = 0,
            j = encode.length;
        for (; i < j; i+=2) {
            val = encode.substring(i, 2);
            result += base.indexOf(val);
        }

        return parseInt(result);
    }
};
