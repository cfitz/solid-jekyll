(function($) {

// prettyPhoto
	jQuery(document).ready(function(){
		jQuery('a[data-gal]').each(function() {
			jQuery(this).attr('rel', jQuery(this).data('gal'));
		});  	
		jQuery("a[data-rel^='prettyPhoto']").prettyPhoto({animationSpeed:'slow',theme:'light_square',slideshow:false,overlay_gallery: false,social_tools:false,deeplinking:false});
	}); 



// search select
jQuery(document).ready(function(){
	$('#search-service-select a').on('click', function (e) {
		e.preventDefault();
		$target = $(e.target);
		$('.search-service-select-label').text( $target.text() );

		$target.closest('form').data('target', $target.data('selector'));
		
	});
	
	$('#search-select a').on('click', function (e) {
		e.preventDefault();
		$target = $(e.target);
		$('.search-select-label').text( $target.text() );
		$('.slave-select option').removeAttr('selected');
		$('.slave-select option').filter( function() {
			return $(this).text() == $target.text();
		}).prop('selected', true);	
	});
	
	$('.home-searchbox').on('change', function(e) { 
		$('.slave-home-searchbox').val( $(e.target).val() );	
	});
	
	$('#home-search').on('submit', function(e) { 
		e.preventDefault();
		target = $(e.target).data('target');
		$('#' + target).submit();
		
	});
	
	$("#search-service-select-button").on('click', function(e){ 
		e.preventDefault();
		$('#home-search').submit();
	});
	
	
	if ( $("#blog-list").length > 0 ) {
            var feed_url = 'http://blog.maritimelibrarian.net/feeds/posts/default';
            $.ajax({
  				url      : document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(feed_url),
  				dataType : 'json',
  				success  : function (data) {
    			if (data.responseData.feed && data.responseData.feed.entries) {
      				
      				$.each(data.responseData.feed.entries, function (i, e) {
       					$("#blog-list").append("<p><a href='" + e.link + "'>" + e.title + "</a></p>");
      					return i < 4;
      				});
    				}
  				}
			});
	};
 
  if ( $("#scroll-nav").length > 0 ){
  $('body').scrollspy({ target: '#scroll-nav', offset: 200 });
  $("#scroll-nav").affix({
    target: "#services", 
    offset: {
      top: 20,
      bottom: function () {
           return (this.bottom = $('.footer').outerHeight(true))
       }} 
  })  
  }
	
	
});

		
})(jQuery);
