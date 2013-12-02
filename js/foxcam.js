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
    $("#crop_buttom").click(function(e){
        e.preventDefault();
        alert("You can do it when picking an image.");
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
        //$("#edit-crop").css('display','none');
        $("#edit-rotate").css('display','none');
        $("#edit-effect").css('display','none');
    });
    $(".fa-times").click(function(e){
        e.preventDefault();
        $("#edit-intro").css('display','inline-block');
        //$("#edit-crop").css('display','none');
        $("#edit-rotate").css('display','none');
        $("#edit-effect").css('display','none');
    });
    $("i#choose-image").click(function(e){
        e.preventDefault();
        //alert("yooo");
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
                //alert("yeaaaa");
                img_width = img.width;
                img_height = img.height;
                img.id = 'theimage';
                img.style.display = 'none';
                bufferImage = new Image();
                bufferImage.src = img.src;
                bufferImage.width = img.width;
                bufferImage.height = img.height;

                var canvas = document.createElement('canvas'),
                canvas_wrapper = document.getElementById('image-canvas-wrapper');
                canvas.id = "preview-canvas";
                var canvas_max_width = $("#image-canvas-wrapper").width();
                var canvas_max_height = $("#image-canvas-wrapper").height();
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
                canvas_wrapper.appendChild(canvas);
                canvas_wrapper.appendChild(img);
                var context = canvas.getContext("2d");
                context.drawImage(img,0,0, canvas.width, canvas.height);
                $("#image-canvas-wrapper").css('display','block');
            }
        }
    });
    $("#rotate-right, #rotate-left").click(function(e){
        var canvas = document.getElementById('preview-canvas');
        if($('#theimage').height() > $('#theimage').width()){
            var rotate_width = $("#image-canvas-wrapper").width();
            var rotate_height = Math.ceil(canvas.width*rotate_width/canvas.height);
            if(this.id ==="rotate-right")
                myRotate(canvas, rotate_width, rotate_height, true);
            else
                myRotate(canvas, rotate_width, rotate_height, false);
        }else if ($('#theimage').height() < $('#theimage').width()){
            var rotate_height = $("#image-canvas-wrapper").height();
            var rotate_width = Math.ceil(canvas.height*rotate_height/canvas.width);
            if(this.id ==="rotate-right")
                myRotate(canvas, rotate_width, rotate_height, true);
            else
                myRotate(canvas, rotate_width, rotate_height, false);
        }else{
            var rotate_height = $("#image-canvas-wrapper").width();
            var rotate_width = $("#image-canvas-wrapper").width();
            if(this.id ==="rotate-right")
                myRotate(canvas, rotate_width, rotate_height, true);
            else
                myRotate(canvas, rotate_width, rotate_height, false);
        }
    });

    function myRotate(canvas, rw, rh, rol){
        if(rol == true){
            $('#theimage').rotateRight();
            $('#theimage').css('display','none');
        }else{
            $('#theimage').rotateLeft();
            $('#theimage').css('display','none');
        }
        var context = canvas.getContext("2d",canvas.width,canvas.height);
        canvas.width = rw;
        canvas.height = rh;
        context.save();
        context.clearRect (0,0,canvas.width,canvas.height);
        context.drawImage(document.getElementById('theimage'), 0, 0, rw,rh);        
        context.restore();
        
    }

    $("#flip-hoz, #flip-vtc").click(function(e){
        var canvas = document.getElementById('preview-canvas');
        myFlip(canvas, this.id);
        myFlip(document.getElementById('theimage'), this.id);
    });

    function myFlip(canvas, rol){
        context = canvas.getContext('2d');
        if(rol === 'flip-hoz'){
            context.translate(canvas.width, 0);
            context.scale(-1, 1);
        }else{
            context.translate(0, canvas.height);
            context.scale(1, -1);
        }
        context.drawImage(document.getElementById('theimage'), 0, 0, canvas.width, canvas.height);
        return true;
    }
    $("#save").click(function(e){
        $('#theimage').css('display','block');
    });
})();
