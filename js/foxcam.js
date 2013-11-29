document.addEventListener('DOMComponentsLoaded', function(){
	//alert("loaded");
});

(function () {
	$("li.page-toogler").click(function(e){
		e.preventDefault();
		$("#navigator").css('visibility','visible');
		var target = $(this).attr('data-page-no');
		var target = $(this).attr('footer-page-no');
		$("div.page").each(function( index ) {
			if(index == target)
				$(this).css('left','0');
		});
		$("div.footer").each(function( index ) {
			if(index == target-1)
				$(this).css('left','0');
		});
	});
	$(".fa-arrow-left").click(function(e){
		e.preventDefault();
		$("#navigator").css('visibility','hidden');
		$("#edit-screen").css('left','100%');
		$("#camera-screen").css('left','200%');
		$("#collage-screen").css('left','300%');
		$("#setting-screen").css('left','400%');
		$("#edit-footer").css('left','100%');
		$("#camera-footer").css('left','200%');
		$("#collage-footer").css('left','300%');
		$("#setting-footer").css('left','400%');
	});
})();
