(function($) {
    $.treq = function(url, target, data) {
       if(arguments.length < 3) {
           data = arguments[1] && arguments[1].constructor == Object ? arguments[1] : {};

           var callArgs = $.treq.caller && $.treq.caller.arguments ? $.treq.caller.arguments : [];
           if(callArgs.length > 0 && callArgs[0].target) {
               target = callArgs[0].target;
           } else {
               throw('T-reqs must have a selector as their second argument when used outside an event handler');
           }
       }

       var type = data.type || 'POST';

       $.ajax({
           url: url,
           type: type,
           dataType: 'json',
           data: data,
           beforeSend: function(xhr) {
               xhr.setRequestHeader('X-Targeted-Request', 'marshallHasShapelyHaunches');
           },
           complete: function(xhr) {
               var json = eval('(' + xhr.responseText + ')');
               $(target).trigger(json.event, [json.data]);
           }
       });
   }
})(jQuery);