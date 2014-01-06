//     ObjectMatcher
//     (c) simonfan
//     ObjectMatcher is licensed under the MIT terms.

define("object-query-sub/operators/match",["require","exports","module","lodash"],function(e,n){var r=e("lodash");n.$matchSingle=function(e,n){return r.isRegExp(e)?e.test(n):e===n},n.$match=function(e,t){return r.isArray(t)?r.any(t,function(r){return n.$matchSingle(e,r)}):n.$matchSingle(e,t)}}),define("object-query-sub/operators/range",["require","exports","module"],function(e,n){n.$lt=function(e,n){return e>n},n.$lte=function(e,n){return e>=n},n.$gt=function(e,n){return n>e},n.$gte=function(e,n){return n>=e}}),define("object-query-sub/operators/set",["require","exports","module","lodash","containers"],function(e,n){var r=e("lodash"),t=e("containers");n.$in=function(e,n){return r.isArray(n)?t.containsAny(e,n):r.contains(e,n)},n.$nin=function(e,n){return r.isArray(n)?!t.containsAny(e,n):!r.contains(e,n)},n.$all=function(e,n){return t.containsAll(n,e)}}),define("object-query-sub/operators/boolean",["require","exports","module"],function(e,n){n.$e=function(){},n.$ne=function(){},n.$not=function(){},n.$or=function(){},n.$and=function(){},n.$exists=function(){}}),define("object-query-sub/operators/index",["require","exports","module","lodash","deep","containers","./match","./range","./set","./boolean"],function(e,n){var r=e("lodash");e("deep"),e("containers"),r.extend(n,e("./match"),e("./range"),e("./set"),e("./boolean")),n.evaluateValue=function(e,t){return r.isObject(e)&&!r.isRegExp(e)?r.every(e,function(e,r){return n[r](e,t)}):n.$match(e,t)}}),define("object-query-sub/match",["require","exports","module","lodash","deep","./operators/index"],function(e,n,r){var t=e("lodash"),o=e("deep"),u=e("./operators/index"),i=/[0-9]+/,a=function(e,n,r){return t.any(n,function(n){return s(e,n,r)})},s=r.exports=function(e,n,r){for(var s,c=o.walker(n,r);c.hasNext();){var f=c.next();{if(!c.hasNext()){s=u.evaluateValue(e,f);break}if(t.isArray(f)&&!i.test(c.nextStep())){s=a(e,f,c.remainingSteps());break}}}return s}}),define("object-query-sub/find",["require","exports","module","lodash","deep","./operators/index"],function(e,n,r){var t=e("lodash"),o=e("deep"),u=e("./operators/index"),i=/[0-9]+/,a=function(e,n,r){return t.any(n,function(n){return s(e,n,r)})},s=r.exports=function(e,n,r){for(var s,c=o.walker(n,r);c.hasNext();){var f=c.next();{if(!c.hasNext()){s=u.evaluateValue(e,f);break}if(t.isArray(f)&&!i.test(c.nextStep())){s=a(e,f,c.remainingSteps());break}}}return s}}),define("object-query",["require","exports","module","lodash","./object-query-sub/match","./object-query-sub/find"],function(e){function n(e,n){return r.every(e,function(e,r){return t(e,n,r)})}var r=e("lodash"),t=e("./object-query-sub/match");e("./object-query-sub/find");var o=function(e){e=e||{};var t=r.partial(n,e);return t.filter=function(e){r.filter(e,t)},t};return o.find=function(e,n){return r.find(e,o(n))},o.filter=function(e,n){return r.filter(e,o(n))},o});