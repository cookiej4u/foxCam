document.addEventListener('DOMComponentsLoaded', function(){
    //alert("loaded");
});

(function () {
    $("li.page-toggler").click(function(e){
        e.preventDefault();
        var target = $(this).attr('data-page-no');
        $("div.page").each(function( index ) {
            if(index == target)
                $(this).css('left','0');
        });
    });
})();
