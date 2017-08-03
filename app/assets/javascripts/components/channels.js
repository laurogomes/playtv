$(function(){
  $.get('playtv.m3u', function(data) {
    var channel = '';
    $.each(parseM3U(data).tracks, function(i, item) {
      var link = (item.file).replace(/\.[^\.]+$/, '.m3u8');
      var title = item.title;
      var image = item.params['tvg-logo'];
      var category = toSlug(item.params['group-title']);

      channel += '<div class="channels__item '+category+'" data-remodal-target="modal" data-link="'+link+'">';
      channel += '<div class="channels__item-image"><img width="200" height="200" src="'+image+'" alt="'+title+'"></div>';
      channel += '<h3 class="channels__item-title">'+title+'</h3>';
      channel += '</div>';
    });
    $('.channels__list').html(channel);
    $('.channels__list').parents('.channels').addClass('loaded');

    var qsRegex;
    var buttonFilter;
    var $channels = $('.channels__list').isotope({
      itemSelector: '.channels__item',
      percentPosition: true,
      layoutMode: 'fitRows',
      filter: function() {
        var $this = $(this);
        var searchResult = qsRegex ? $this.text().match(qsRegex): true;
        var buttonResult = buttonFilter ? $this.is(buttonFilter): true;
        return searchResult && buttonResult;
      }
    });
    var $quicksearch = $('.header__search-input').keyup(debounce(function(event) {
      qsRegex = new RegExp($quicksearch.val(), 'gi');
      $channels.isotope();
    }));

    $channels.imagesLoaded().progress(function(imgLoad, image) {
      if (image.isLoaded) {
        $(image.img).parent().addClass('loaded');
      } else if (!image.isLoaded) {
        $(image.img).parent().addClass('not-loaded');
      }
      $channels.isotope('layout');
    });

    $('.header__menu-list').on('click', '.header__menu-item', function(event) {
      event.preventDefault();
      buttonFilter = $(this).attr('data-filter');
      $(document.body).removeAttr('class');
      $(document.body).addClass(buttonFilter.substring(1));
      $('.header__menu-item').removeClass('active');
      $(this).addClass('active');
      $channels.isotope();
    });

    var player;
    $('.channels__list').on('click', '.channels__item', function(event) {
      var link = $(this).attr('data-link');
      var image = $(this).find('img').attr('src');
      var config = {
        key: '55fcf315-8dc9-41fe-82a1-1f32bead1571',
        source: {
          hls: link,
          poster: image,
          // options: {
          //   withCredentials: true,
          //   manifestWithCredentials: true,
          //   hlsWithCredentials: true,
          //   hlsManifestWithCredentials: true,
          // },
          // vr: {
          //   contentType: 'single',
          // },
        },
        style: {
          width: '100%',
        },
        playback: {
          autoplay: true,
        },
        cast: {
          enable: true,
        },
        logs: {
          bitmovin: false,
        },
      };
      player = bitmovin.player('modal-content');
      player.setup(config);
    });

    $(document).on('closed', '.modal', function() {
      player.destroy();
    });
  });
});
