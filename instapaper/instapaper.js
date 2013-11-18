$(function() {
  var $articleList = $("#article_list");
  var $articles = $articleList.find(".article_item");
  for (var i = 0; i < $articles.length; i++) {
    var $article = $($articles[i]);
    var sourceURL = $article.find(".title_meta a").attr("href");
    $article.find(".title_row a").attr("href", sourceURL);
  }

});