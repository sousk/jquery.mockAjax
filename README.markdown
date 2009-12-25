jQuery mockAjax.js
------------------------------------------------

Trap $.ajax request and replace request-url as the rule you defined.

It's convinient for JavaScript development.
You can use local HTML fragment or JSON file 
instead of server response without rewriting HTML or JavaScript code.

How to use
------------------------------------------------

    // set logger if you want
    $.mockAjax.sniffer = function(url) {
      log("replacing url "+ url.url +":: to ::"+ url.replace_to);
    };
    
    // define rule
    $.mockAjax(
      { // search response with no result
        cond: /\/search\?.*q=no_result/,
        method: 'get',
        url: '/pseudo_data/search_response_no_result.json'
      },
      { // regular search response
        cond: '/map/search?q',
        method: 'get',
        url: '/pseudo_data/search_response.json'
      }
    );

$.mockAjax trap ther $.ajax request 
when request-url is matched against *cond* and *method (optional)*,
and swap the request-url with *url*.
