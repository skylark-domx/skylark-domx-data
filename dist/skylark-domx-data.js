/**
 * skylark-domx-data - The skylark data library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
(function(factory,globals,define,require) {
  var isAmd = (typeof define === 'function' && define.amd),
      isCmd = (!isAmd && typeof exports !== 'undefined');

  if (!isAmd && !define) {
    var map = {};
    function absolute(relative, base) {
        if (relative[0]!==".") {
          return relative;
        }
        var stack = base.split("/"),
            parts = relative.split("/");
        stack.pop(); 
        for (var i=0; i<parts.length; i++) {
            if (parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    }
    define = globals.define = function(id, deps, factory) {
        if (typeof factory == 'function') {
            map[id] = {
                factory: factory,
                deps: deps.map(function(dep){
                  return absolute(dep,id);
                }),
                resolved: false,
                exports: null
            };
            require(id);
        } else {
            map[id] = {
                factory : null,
                resolved : true,
                exports : factory
            };
        }
    };
    require = globals.require = function(id) {
        if (!map.hasOwnProperty(id)) {
            throw new Error('Module ' + id + ' has not been defined');
        }
        var module = map[id];
        if (!module.resolved) {
            var args = [];

            module.deps.forEach(function(dep){
                args.push(require(dep));
            })

            module.exports = module.factory.apply(globals, args) || null;
            module.resolved = true;
        }
        return module.exports;
    };
  }
  
  if (!define) {
     throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");
  }

  factory(define,require);

  if (!isAmd) {
    var skylarkjs = require("skylark-langx-ns");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define("skylark-domx-data/data",["skylark-langx/skylark","skylark-langx/langx","skylark-domx-finder","skylark-domx-noder"],function(e,l,t,u){var r=Array.prototype.map,s=(Array.prototype.filter,l.camelCase),n=l.deserializeValue,d=/([A-Z])/g,o={tabindex:"tabIndex",readonly:"readOnly",for:"htmlFor",class:"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"};var p={option:{get:function(e){var t=e.getAttribute("value");return null!=t?t:(m(e).match(/[^\x20\t\r\n\f]+/g)||[]).join(" ")}},select:{get:function(e){for(var t,r=e.options,a=e.selectedIndex,n="select-one"===e.type,o=n?null:[],i=n?a+1:r.length,l=a<0?i:n?a:0;l<i;l++)if((t=r[l]).selected&&!t.disabled&&(!t.parentNode.disabled||!u.nodeName(t.parentNode,"optgroup"))){if(t=x(t),n)return t;o.push(t)}return o},set:function(e,t){for(var r,a,n=e.options,o=l.makeArray(t),i=n.length;i--;)((a=n[i]).selected=-1<l.inArray(p.option.get(a),o))&&(r=!0);return r||(e.selectedIndex=-1),o}}};function f(e,t,r){if(void 0===r){if("object"!=typeof t)return e.getAttribute?e.getAttribute(t):e[t];for(var a in t)f(e,a,t[a])}else e.setAttribute?e.setAttribute(t,r):e[t]=r;return this}function c(e,t){var r,a=e._$_store;return a=!a&&t?e._$_store=(r={},l.each(e.attributes||[],function(e,t){0==t.name.indexOf("data-")&&(r[s(t.name.replace("data-",""))]=n(t.value))}),r):a}function v(e,t,r){c(e,!0)[s(t)]=r}function i(e,t,r){if(void 0!==r)return v(e,t,r),this;if("object"==typeof t){for(var a in t)v(e,a,t[a]);return this}var r=e,n=t;if(void 0===n)return c(r,!0);var o=c(r);if(o){if(n in o)return o[n];var i=s(n);if(i in o)return o[i]}return o=f(r,"data-"+n.replace(d,"-$1").toLowerCase()),o=l.isString(o)?o:void 0}function a(e){e._$_store&&delete e._$_store}function m(e,t){return void 0===t?void 0!==e.textContent?e.textContent:e.innerText:(t=null==t?"":""+t,void 0!==e.textContent?e.textContent=t:e.innerText=t,this)}function x(e,t){var r=p[e.type]||p[e.nodeName.toLowerCase()];if(void 0===t)return r&&"get"in r&&void 0!==(ret=r.get(e,"value"))?ret:"string"==typeof(ret=e.value)?ret.replace(/\r/g,""):null==ret?"":ret;null==t?t="":"number"==typeof t?t+="":l.isArray(t)&&(t=l.map(t,function(e){return null==e?"":e+""})),r&&"set"in r&&void 0!==r.set(e,t,"value")||(e.value=t)}function y(){return y}return l.each(["radio","checkbox"],function(){p[this]={set:function(e,t){if(l.isArray(t))return e.checked=-1<l.inArray(x(e),t)}}}),t.pseudos.data=function(e,t,r,a){return!!i(e,a||r[3])},l.mixin(y,{aria:function(e,t,r){return this.attr(e,"aria-"+t,r)},attr:f,cleanData:a,data:i,pluck:function(e,t){return r.call(e,function(e){return e[t]})},prop:function e(t,r,a){if(void 0!==a||"object"!=typeof r)return r=o[r]||r,void 0===a?t[r]:(t[r]=a,this);for(var n in r)e(t,n,r[n]);return this},removeAttr:function(a,e){return e.split(" ").forEach(function(e){var t,r;t=a,e=e,null==r?t.removeAttribute(e):t.setAttribute(e,r)}),this},removeData:function(e,t){var r;return t?(l.isString(t)&&(t=t.split(/\s+/)),r=c(e,!0),t.forEach(function(e){delete r[e],delete r[s(e)]})):a(e),this},removeProp:function(t,e){return e.split(" ").forEach(function(e){delete t[e]}),this},text:m,val:x,valHooks:p}),e.attach("domx.data",y)}),define("skylark-domx-data/main",["./data","skylark-domx-velm","skylark-domx-query"],function(e,t,r){return t.delegate(["attr","data","prop","removeAttr","removeData","text","val"],e),r.fn.text=r.wraps.wrapper_value(e.text,e,e.text),r.fn.attr=r.wraps.wrapper_name_value(e.attr,e,e.attr),r.fn.removeAttr=r.wraps.wrapper_every_act(e.removeAttr,e),r.fn.prop=r.wraps.wrapper_name_value(e.prop,e,e.prop),r.fn.removeProp=r.wraps.wrapper_every_act(e.removeProp,e),r.fn.data=r.wraps.wrapper_name_value(e.data,e),r.fn.removeData=r.wraps.wrapper_every_act(e.removeData),r.fn.val=r.wraps.wrapper_value(e.val,e,e.val),e}),define("skylark-domx-data",["skylark-domx-data/main"],function(e){return e});
},this,define,require);
//# sourceMappingURL=sourcemaps/skylark-domx-data.js.map
