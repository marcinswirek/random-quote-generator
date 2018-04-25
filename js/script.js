$(function() {
  var tweetLink = "https://twitter.com/intent/tweet?text=";
  var quoteUrl =
    "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
  var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

  function getQuote() {
    $getJSON(quoteUrl, createTweet);
  }

  function createTweet(input) {
    var data = input[0];

    var quoteText = $(data.content)
      .text()
      .trim();
    var quoteAuthor = data.title;

    if (!quoteAuthor.length) {
      quoteAuthor = "Unknown author";
    }

    if (tweetText.length > 140) {
      getQuote();
    } else {
      var tweet = tweetLink + encodeURIComponent(tweetText);
      $(".quote").text(quoteText);
      $(".author").text("Author: " + quoteAuthor);
      $(".tweet").attr("href", tweet);
    }

    $(".tweet").attr("href", tweet);
  }

  $(document).ready(function() {
    getQuote();
    $(".trigger").click(function() {
      getQuote();
    });
  });
});
