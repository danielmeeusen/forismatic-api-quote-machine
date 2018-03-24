$(document).ready(function(){

  // Jquery to to allow the quotebox to fade in.
  $('#hidden').hide(0).delay(500).fadeIn(1000);
});

function getQuote(author, text) {
 
  var url = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?"
  
  // abreviated API call to forismatic.
  $.getJSON(url, function(data) {
    
    // Adding formated html to quoteText div
    text.html(data.quoteText);
    
    // If quote has author element add author with link, else attribute to unkown.
    if (data.quoteAuthor) {
      author.html(data.quoteAuthor);
      author.attr("href", data.quoteLink);
    } else {
      author.removeAttr("href");
      author.html("- unknown");
    }
    // asigning quote and author data to tweetThis variable
    tweetThis = data.quoteText + " - " + data.quoteAuthor;
  });
}
//function asigning author and text div tags to variables
$(function() {
  var author = $('#author');
  var text = $('#quoteText');
  getQuote(author, text);

  // asigning getQuote button functionality and fade
  $('#getQuote').click(function(event) {
    $('#hidden').fadeOut('fast');
    getQuote(author, text);
    $('#hidden').fadeIn(1000);
  })
});

// link functionality for tweet button
var tweetThis = "";
$('#tweetQuote').click(function() {
    $(this).attr("href", "https://twitter.com/intent/tweet?text=" + tweetThis);
});