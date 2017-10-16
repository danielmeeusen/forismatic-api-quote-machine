$(document).ready(function(){
$('#hidden').hide(0).delay(500).fadeIn(1000);
});

function getQuote(author, text) {
 
  var url = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?"

  $.getJSON(url, function(data) {
    
    text.html(data.quoteText);
    if (data.quoteAuthor) {
      author.html(data.quoteAuthor);
      author.attr("href", data.quoteLink);
    } else {
      author.removeAttr("href");
      author.html("- unknown");
    }
    tweetThis = data.quoteText + " - " + data.quoteAuthor;
  });
}

$(function() {
  var author = $('#author');
  var text = $('#quoteText');
  getQuote(author, text);

  $('#getQuote').click(function(event) {
    $('#hidden').fadeOut('fast');
    getQuote(author, text);
    $('#hidden').fadeIn(1000);
  })
});

var tweetThis = "";
$('#tweetQuote').click(function() {
    $(this).attr("href", "https://twitter.com/intent/tweet?text=" + tweetThis);
});