$(function() {

  var $articleList = $("#article_list");
  var $articles = $articleList.find(".article_item");
  for (var i = 0; i < $articles.length; i++) {
    var $article = $($articles[i]);
    var sourceURL = $article.find(".title_meta a").attr("href");
    $article.find(".title_row a").attr("href", sourceURL);
  }

  // Override for some reason the max-width property on css stops this from appearing.
  $('.article_inner_item').hover(
    function() {
      $(this).find('.article_item_footer .article_actions').show()
      $(this).find('.article_item_footer .article_actions .action_link').css('opacity', 1)
    },
    function() {
      $(this).find('.article_item_footer .article_actions').hide()
      $(this).find('.article_item_footer .article_actions .action_link').css('opacity', 0)
    }
  );
});
