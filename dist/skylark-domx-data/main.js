/**
 * skylark-domx-data - The skylark data library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./data","skylark-domx-velm","skylark-domx-query"],function(a,t,r){return t.delegate(["attr","data","prop","removeAttr","removeData","text","val"],datax),r.fn.text=r.wraps.wrapper_value(datax.text,datax,datax.text),r.fn.attr=r.wraps.wrapper_name_value(datax.attr,datax,datax.attr),r.fn.removeAttr=r.wraps.wrapper_every_act(datax.removeAttr,datax),r.fn.prop=r.wraps.wrapper_name_value(datax.prop,datax,datax.prop),r.fn.removeProp=r.wraps.wrapper_every_act(datax.removeProp,datax),r.fn.data=r.wraps.wrapper_name_value(datax.data,datax,datax.data),r.fn.removeData=r.wraps.wrapper_every_act(datax.removeData,datax),r.fn.val=r.wraps.wrapper_value(datax.val,datax,datax.val),a});
//# sourceMappingURL=sourcemaps/main.js.map
