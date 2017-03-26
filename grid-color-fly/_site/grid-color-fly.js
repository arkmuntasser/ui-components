var root = $('[data-imageboxes]');
var prevX = 0;
var prevY = 0;
var hoverIn = false;

root.find('[data-imagebox]').hover(function(e) {
  hoverIn = !hoverIn;

  animate($(this), getDirection($(this), { x : e.pageX, y : e.pageY }));
});

root.find('[data-imagebox-overlay]').on('transitionend', function() {
  if (hoverIn) { return; }

  $(this).closest('[data-imagebox]').removeClass('animate');
  $(this).css({
    'transform' : '',
    'opacity' : 0,
    'pointer-events' : 'none',
    'will-change' : ''
  });
});

var animate = function(node, direction) {
  var transform = '';

  if (direction === 0) {
    transform = 'translate(0, -100%)';
  } else if (direction === 1) {
    transform = 'translate(100%, 0)';
  } else if (direction === 2) {
    transform = 'translate(0, 100%)';
  } else {
    transform = 'translate(-100%, 0)';
  }

  if (hoverIn) {
    node.find('[data-imagebox-overlay]').css({
      'transform' : transform,
      'opacity' : 1,
      'pointer-events' : 'all',
      'will-change' : 'transform'
    });

    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        node.addClass('animate');
        node.find('[data-imagebox-overlay]').css({
          'transform' : ''
        });
      });
    });
  } else {
    node.find('[data-imagebox-overlay]').css({
      'transform' : transform
    });
  }
};

var getDirection = function(node, position) {
  var w = node.width();
  var h = node.height();
  var x = (position.x - node.offset().left - (w / 2)) * (w > h ? (h / w) : 1);
  var y = (position.y - node.offset().top  - (h / 2)) * (h > w ? (w / h) : 1);

  return Math.round((((Math.atan2(y,x) * (180 / Math.PI)) + 180)) / 90 + 3) % 4;
};
