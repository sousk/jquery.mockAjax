function mock_response () {
  var json = function(f) {
    return './pseudo_data/json/'+ f + '.json';
  };
  var html = function(f) {
    return './pseudo_data/html/'+ f +'.html';
  };
  
  $.mockAjax.sniffer = function(url) {
    log("replacing request url "+ url.url +":: to ::"+ url.replace_to);
  };
  $.mockAjax(
    { // search response, got no result
      cond: /\/map\/search\?.*q=no_result/,
      method: 'get',
      url: json('search_response_no_result')
    },
    { // info window
      cond: "/show",
      url: html('infowindow') 
    }
  );
}
