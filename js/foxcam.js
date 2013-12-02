document.addEventListener('DOMComponentsLoaded', function(){
	//alert("loaded");
});

(function () {

    var img_width = 0;
    var img_height = 0;
    var high_res_canvas = document.createElement('canvas');
    high_res_canvas.id = "high-canvas";
    var rotating = false;
    var bufferImage;
    var cw;
    var ch;

    $("li.page-toggler").click(function(e){
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
        $("#camera-screen").css('left','100%');
        $("#edit-screen").css('left','200%');
        $("#collage-screen").css('left','300%');
        $("#setting-screen").css('left','400%');
        $("#camera-footer").css('left','100%');
        $("#edit-footer").css('left','200%');
        $("#collage-footer").css('left','300%');
        $("#setting-footer").css('left','400%');
    });
    $("#crop_buttom").click(function(e){
        e.preventDefault();
        $("#edit-intro").css('display','none');
        $("#edit-crop").css('display','inline-block');
    });
    $("#rotate_buttom").click(function(e){
        e.preventDefault();
        $("#edit-intro").css('display','none');
        $("#edit-rotate").css('display','inline-block');
    });
    $("#effect_buttom").click(function(e){
        e.preventDefault();
        $("#edit-intro").css('display','none');
        $("#edit-effect").css('display','inline-block');
    });
    $(".fa-check").click(function(e){
        e.preventDefault();
        $("#edit-intro").css('display','inline-block');
        $("#edit-crop").css('display','none');
        $("#edit-rotate").css('display','none');
        $("#edit-effect").css('display','none');
    });
    $(".fa-times").click(function(e){
        e.preventDefault();
        $("#edit-intro").css('display','inline-block');
        $("#edit-crop").css('display','none');
        $("#edit-rotate").css('display','none');
        $("#edit-effect").css('display','none');
    });
    
})();
