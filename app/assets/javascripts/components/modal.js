$(function(){
  $('.channels__list').on('click', '.channels__item', function(event) {
    var link = $(this).attr('data-link');
    var image = $(this).find('img').attr('src');
    var player = new Clappr.Player({
      source: link,
      poster: image,
      width: '100%',
      height: 'auto',
      autoPlay: true,
      parentId: '#modal-content',
      disableVideoTagContextMenu: true
    });
  });
  $(document).on('closed', '.modal', function() {
    $('.modal__content').html('');
  });
});
