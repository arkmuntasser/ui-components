$(document).ready(function() {
  $(window).scroll(function() {
    var h = $("img").height();
    var top = $(this).scrollTop();

    $("img").css({
      top: (top / 4) + "px",
      opacity: (h - top) / h
    });
  });

  $(window).resize(function() {
    var h = $("img").height();
    var top = $(window).scrollTop();

    $(".hero").attr("style", "height : " + h + "px;");
    $("img").css({
      top: (top / 4) + "px",
      opacity: (h - top) / h
    });
  });

  var h = $("img").height();

  $(".hero").attr("style", "height : " + h + "px;");
  $(window).resize();
});
