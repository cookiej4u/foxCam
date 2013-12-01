document.addEventListener('DOMComponentsLoaded', function(){
	//alert("loaded");
});

(function () {
    $("li.page-toggler").click(function(e){
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
        $("#navigator").css('left','0');
    });
    $(".fa-arrow-left").click(function(e){
        e.preventDefault();
        $("#edit-screen").css('left','100%');
        $("#collage-screen").css('left','100%');
        $("#about-screen").css('left','100%');
        $("div.footer").css('left','100%');
        $("#navigator").css('left','100%');
    });
    $("i#choose-image").click(function(e){
        e.preventDefault();
        var canvas = document.getElementById("image-canvas");
        var context = canvas.getContext("2d");
        var pick = new MozActivity({
            name: "pick",
            data: {
                type: ["image/png", "image/jpg", "image/jpeg"]
            }
        });
        pick.onsuccess = function () { 
            var img = new Image;
            img.src = URL.createObjectURL(this.result.blob);
            img.onload = function() {
                scale_ratio_h = canvas.height/img.height;
                scale_ratio_w = canvas.width/img.width;
                alert(scale_ratio_h + " " + scale_ratio_w);
                if(img.height > img.width){
                    context.drawImage(img,0,0, Math.ceil(canvas.width*(img.width/img.height)),canvas.height);
                }else if (img.height < img.width){
                    context.drawImage(img,0,0, canvas.width, Math.ceil(canvas.height*(img.height/img.width)));
                }else
                    context.drawImage(img,0,0, canvas.width, canvas.width);
                //alert(canvas.width/img.width);
                //var previewHeight = img.height*(canvas.width/img.width);
                //context.drawImage(img,0,0);
            }
            $("#image-canvas").css('display','block');
        };

        pick.onerror = function () {
                
        };
    });
})();
