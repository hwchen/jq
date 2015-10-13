var section_names = function(q, cb) {
  var matches = [];
  q = q.toLowerCase();
  $.each(section_map, function(k, v) {
    if (k.toLowerCase().indexOf(q) != -1) {
      matches.push(k);
    }
  });
  matches.sort(function(a, b) {
    // shortest to longest
    return a.length - b.length;
  });
  cb(matches);
}
var go_to_section = function(section) {
  if (section in section_map) {
    location.hash = '#' + section_map[section];
  }
}
$(function(){
  $('#searchbox').typeahead(
    {hint: false, highlight: true, minLength: 1},
    {name: "contents", source: section_names, limit: 6}
  ).on('typeahead:selected', function(e, data) {
    go_to_section($(this).val());
  });
  $('#searchbox').change(function() {
    go_to_section($(this).val());
  });
});
// add "Run" button to execute examples on jqplay.org
$(function() {
  $.each($('.manual-example table'), function(index, value) {
    $value = $(value)
    var j = $value.find('tr:nth-child(2) td:first').text();
    var q = $value.find('.jqprogram').text().replace(/^jq /, '').replace(/^'(.+)'$/, '$1');
    var url = 'https://jqplay.org/jq?q=' + encodeURIComponent(q) +'&j=' + encodeURIComponent(j)
    var $last_tr = $value.find('tr:last');
    $last_tr.after('<tr class="jqplay-btn"><th><a href="' + url + '" class="btn btn-primary btn-sm">Run</a></th><th></th></tr><tr><th></th><th></th></tr>');
  });
});
