$(function() {
    var articles = document.querySelectorAll("#article_list .article_item")
    console.log(articles.length)
    for (var i = 0; i < articles.length; i++) {
        var article = articles[i];
        var sourceURL = article.querySelectorAll(".title_meta a")[0].getAttribute("href")
        article.querySelectorAll(".title_row a")[0].setAttribute("href", sourceURL);
    }

    document.querySelector(".article_inner_item").addEventListener("mouseover", event => {
        event.target.querySelector('.article_item_footer .article_actions').style.display = 'block'
        event.target.querySelector('.article_item_footer .article_actions .action_link').style.opacity = 1
    });

    document.querySelector(".article_inner_item").addEventListener("mouseleave", event => {
        event.target.querySelector('.article_item_footer .article_actions').style.display = 'hidden'
        event.target.querySelector('.article_item_footer .article_actions .action_link').style.opacity = 0
    });
});
