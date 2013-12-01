document.addEventListener('DOMComponentsLoaded', function(){
	//alert("loaded");
});

(function () {
    var img_width = 0;
    var img_height = 0;
    var high_res_canvas = document.createElement('canvas');
    high_res_canvas.id = "high-canvas";
    var bufferImage;
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
                img_width = img.width;
                img_height = img.height;
                bufferImage = new Image();
                bufferImage.src = img.src;
                bufferImage.width = img.width;
                bufferImage.height = img.height;
                var canvas = document.createElement('canvas'),
                div = document.getElementById('image-canvas-wrapper');
                var canvas_max_width = $("#image-canvas-wrapper").width();
                var canvas_max_height = $("#image-canvas-wrapper").height();
                scale_ratio_h = $("#image-canvas-wrapper").height()/img.height;
                scale_ratio_w = $("#image-canvas-wrapper").width()/img.width;
                if(img.height > img.width){
                    canvas.width = Math.ceil(img.width*canvas_max_height/img.height);
                    canvas.height = canvas_max_height;
                }else if (img.height < img.width){
                    canvas.width = canvas_max_width;
                    canvas.height = Math.ceil(img.height*canvas_max_width/img.width);
                }else{
                    canvas.width  = canvas_max_width;
                    canvas.height = canvas_max_width;
                }
                canvas.id = "preview-canvas";
                canvas.style.position = "absolute";
                div.appendChild(canvas);
                var context = canvas.getContext("2d");
                context.drawImage(img,0,0, canvas.width, canvas.height);
                $("#image-canvas-wrapper").css('display','block');
            }
        }
    });
    $("#compare").click(function(e){
        var canvas = document.getElementById('preview-canvas');
        if($('#preview-canvas').length != 0){
            if(canvas.height > canvas.width){
                var rotate_width = $("#image-canvas-wrapper").width();
                var rotate_height = Math.ceil(img_width*rotate_width/img_height);
                alert(rotate_width + "--"+rotate_height);
                myRotate(canvas, rotate_height, rotate_width);
            }
        }
        else
            alert("fuck you");
    });
    function myRotate(canvas, cw, ch){
        var context = canvas.getContext("2d",ch,cw);
        canvas.width = ch;
        canvas.height = cw;
        cw = canvas.width;
        ch = canvas.height;
        context.save();
        context.translate(cw, ch / cw);
        context.rotate(Math.PI / 2);
        context.drawImage(bufferImage, 0, 0, canvas.height,canvas.width);/*wtf!!!!*/           
        context.restore();
    }
})();
