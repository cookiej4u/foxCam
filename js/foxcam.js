document.addEventListener('DOMComponentsLoaded', function(){
	//alert("loaded");
});

(function () {
	$("li.page-toogler").click(function(e){
		e.preventDefault();
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
})();
