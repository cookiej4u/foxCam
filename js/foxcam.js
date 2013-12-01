document.addEventListener('DOMComponentsLoaded', function(){
	//alert("loaded");
});

(function () {
    var width = 0;
    var height = 0;
    var img = new Image;
    var rotating = false;
    var canvas = document.getElementById("image-canvas");
    var canvas_bak = document.createElement("canvas");
    var ch;
    var cw;
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
    $("i#choose-image").click(function(e){
        e.preventDefault();
        var context = canvas.getContext("2d");
        var b_contxet = canvas_bak.getContext("2d");
        var pick = new MozActivity({
            name: "pick",
            data: {
                type: ["image/png", "image/jpg", "image/jpeg"]
            }
        });
        pick.onsuccess = function () { 
            img.src = URL.createObjectURL(this.result.blob);
            img.onload = function() {
                scale_ratio_h = canvas.height/img.height;
                scale_ratio_w = canvas.width/img.width;
                //alert(scale_ratio_h + " " + scale_ratio_w);
                if(img.height > img.width){
                    context.drawImage(img,0,0, Math.ceil(canvas.width*(img.width/img.height)),canvas.height);
                    b_contxet.drawImage(img,0,0, Math.ceil(canvas.width*(img.width/img.height)),canvas.height);
                    canvas_bak.width = Math.ceil(canvas.width*(img.width/img.height));
                    canvas_bak.height = canvas.height;
                }else if (img.height < img.width){
                    context.drawImage(img,0,0, canvas.width, Math.ceil(canvas.height*(img.height/img.width)));
                    b_contxet.drawImage(img,0,0, canvas.width, Math.ceil(canvas.height*(img.height/img.width)));
                    canvas_bak.width = canvas_bak.width;
                    canvas_bak.height = Math.ceil(canvas.height*(img.height/img.width));
                }else
                    context.drawImage(img,0,0, canvas.width, canvas.height);
                //context.drawImage(img,0,0);
                cw = canvas.width;
                ch = canvas.height;
            }
            $("#image-canvas").css('display','block');
        };

        pick.onerror = function () {
            alert("Image loading error.");
        };
    });
    $("#compare").click(function(e){
        if (!rotating) {
            rotating = true;            
            // store current data to an image
            myImage = new Image();
            myImage.src = canvas_bak.toDataURL();
            myImage.onload = function () {
                //alert("yoooo");
                var context = canvas.getContext("2d");
                canvas.width = ch;
                canvas.height = cw;
                cw = canvas.width;
                ch = canvas.height;
                context.save();
                context.translate(cw, ch / cw);
                context.rotate(Math.PI / 2);
                // draw the previows image, now rotated
                context.drawImage(myImage, 0, 0);               
                context.restore();
               
                // clear the temporary image
                myImage = null;
               
                rotating = false;
            }
        }
    });
})();
