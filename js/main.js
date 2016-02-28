$(document).ready(function() {
  $(window).scroll(function() {
    var h = $("img").height();
    var top = $(this).scrollTop();

    if(top > 0) {
      $("img").css({
        top: (top / 4) + "px",
        opacity: (h - top) / h
      });
    }
  });

  $(window).resize(function() {
    var h = $("img").height();
    var top = $(window).scrollTop();

    $(".hero").css({ height: h + "px" });

    if(top > 0) {
      $("img").css({
        top: (top / 4) + "px",
        opacity: (h - top) / h
      });
    }
  });

  var h = $("img").height();

  $(".hero").attr("style", "height : " + h + "px;");
  $(window).resize();
});
