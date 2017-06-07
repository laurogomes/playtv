$(function(){
  var prevScroll = 0;
  var prevDir = 'up';
  var curDir = 'down';

  $(window).scroll(function(){
    if ($(this).scrollTop() >= prevScroll) {
      curDir = 'down';
      if (curDir != prevDir) {
        $('.header').addClass('fixed');
        prevDir = curDir;
      }
    } else {
      curDir = 'up';
      if (curDir != prevDir) {
        $('.header').removeClass('fixed');
        prevDir = curDir;
      }
    }
    prevScroll = $(this).scrollTop();
  });
});
