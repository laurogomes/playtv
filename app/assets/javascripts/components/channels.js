$(function(){
  $.get('playtv.m3u', function(data) {
    $.each(M3U.parse(data), function(i, item) {
      console.log(this);
    });
  });

  var $channels = $('.channels__list').isotope({
    itemSelector: '.channels__item',
    percentPosition: true
  });

  $channels.imagesLoaded().progress(function(imgLoad, image) {
    if (image.isLoaded) {
      $(image.img).parent().addClass('loaded');
    }
    $channels.isotope('layout');
  });

  $('.header__menu-list').on('click', '.header__menu-item', function(event) {
    event.preventDefault();
    var filter = $(this).attr('data-filter');
    $(document.body).removeAttr('class');
    $(document.body).addClass(filter.substring(1));
    $('.header__menu-item').removeClass('active');
    $(this).addClass('active');
    $channels.isotope({filter: filter});
  });
});

$('.channels__item-description').each(function(i, item) {
  var text = $(this).text();
  $(this).text(truncate(text, 40));
});

function truncate(str, num) {
  if (num > str.length) {
    return str;
  } else {
    str = str.substring(0,num);
    return str+'...';
  }
}
