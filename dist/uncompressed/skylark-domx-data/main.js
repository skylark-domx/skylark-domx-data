define([
	"./data",
	"skylark-domx-velm",
	"skylark-domx-query"	
],function(data,velm,$){
    // from ./datax
    velm.delegate([
        "attr",
        "data",
        "prop",
        "removeAttr",
        "removeData",
        "text",
        "val"
    ], datax);

    $.fn.text = $.wraps.wrapper_value(datax.text, datax, datax.text);

    $.fn.attr = $.wraps.wrapper_name_value(datax.attr, datax, datax.attr);

    $.fn.removeAttr = $.wraps.wrapper_every_act(datax.removeAttr, datax);

    $.fn.prop = $.wraps.wrapper_name_value(datax.prop, datax, datax.prop);

    $.fn.removeProp = $.wraps.wrapper_every_act(datax.removeProp, datax);

    $.fn.data = $.wraps.wrapper_name_value(datax.data, datax, datax.data);

    $.fn.removeData = $.wraps.wrapper_every_act(datax.removeData, datax);

    $.fn.val = $.wraps.wrapper_value(datax.val, datax, datax.val);


	return data;
});