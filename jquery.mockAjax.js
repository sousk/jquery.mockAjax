(function ($) {
  /**
   * interrupt $.ajax and replace requesting url depending on url strings
   *
   * @param conds
   *   mock conditions. see example
   *
   * @version 0.2
   * @see github
   *
   * Copyright (c) 2009 KIDO Soshi <sou.phphp@gmail.com>
   * Dual licensed under the MIT and GPL licenses.
   */
  $.mockAjax = function () {
    var _ajax = $.ajax;
    var defs = arguments;
    var sniffer = $.mockAjax.sniffer || null;
    
    var run = function(args, def) {
      sniffer && sniffer({
        url: args.url,
        replace_to: def.url
      });
      if (def.url) args.url = def.url;
      if (def.method) args.method = def.method;

      return _ajax.apply($, [args]);
    };
    
    $.ajax = function() {
      var args = arguments[0];
      if (args && args.url && defs[0]) {
        $.each(defs, function(i, def) {
          if (def.cond.constructor == String && args.url.indexOf(def.cond) > -1) {
            return run(args, def);
          }
          else if (def.cond.constructor == RegExp && args.url.search(def.cond) > -1) {
            return run(args, def);
          }
        });
      }
      else {
        return _ajax.apply($, arguments);
      }
    };
  };
})(jQuery);
