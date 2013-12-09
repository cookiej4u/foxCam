document.addEventListener('DOMComponentsLoaded', function(){
    //alert("loaded");
});

(function () {

    var img_width = 0;
    var img_height = 0;
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
        $("div#head").css('left','0');
    });
    $(".fa-arrow-left").click(function(e){
        e.preventDefault();
        $("#edit-screen").css('left','100%');
        $("#collage-screen").css('left','100%');
        $("#about-screen").css('left','100%');
        $("div.footer").css('left','100%');
        $("div#head").css('left','100%');
    });
    $("#crop_button").click(function(e){
        e.preventDefault();
        alert("You can do it when picking up an image.");
    });
    $("#rotate_button").click(function(e){
        e.preventDefault();
        $("#edit-intro").css('display','none');
        $("#edit-rotate").css('display','inline-block');
    });
    $("#effect_button").click(function(e){
        e.preventDefault();
        $("#edit-intro").css('display','none');
        $("#edit-effect").css('display','inline-block');
        document.getElementById('theimage').style.display = 'block';
        $("#theimage").before( "<p id='ori-text' style='color:white; padding:1em;'>Original:</p>" );
        //document.getElementById('theimage').style.opacity = '0';
    });
    $("#stamps_button").click(function(e){
        e.preventDefault();
        if(img_width <= 0) {
            alert("Please choose an image.");
            $("i#choose-image").click();
            return;
        }
        $("#edit-intro").css('display', 'none');
        $("#edit-stamps").css('display', 'inline-block');
        $("#stamps-zone").css('display', 'block');
        $("#fabric-zone").css('display', 'block');
    });
	$("#text_button").click(function(e){
        e.preventDefault();
        if(img_width <= 0) {
            alert("Please choose an image.");
            $("i#choose-image").click();
            return;
        }
        $("#edit-intro").css('display', 'none');
        $("#navigator").css('display', 'none');
		$("#text-zone").css('display', 'block');
        $("#fabric-zone").css('display', 'block');
        var input = document.getElementById("textInput");
		input.focus();
        input.value = "";
    });
    $("#textInput").keyup(function(e) {
        if(e.keyCode === 13) {
            e.target.blur();
            $("#navigator").css('display', 'block');
            $("#text-zone").css('display', 'none');
            $("#edit-text").css('display', 'inline-block');
            
            var preCvs = document.getElementById('preview-canvas');
            var canvas = new fabric.Canvas('playground');
            canvas.setDimensions({ width: preCvs.width, height: preCvs.height });
            canvas.setBackgroundImage(
                preCvs.toDataURL(),
                canvas.renderAll.bind(canvas), {
                originX: 'left',
                originY: 'top'
            });
            canvas.allowTouchScrolling = true;

            var text = new fabric.Text(e.target.value||'What does the fox say?', {
                fontSize: 20,
                fontFamily: 'Impact',
                fill: 'white',
                shadow: 'black 0 0 5px',
                stroke: 'rgba(0,0,0,.2)',
                strokeWidth: 1
            });
            var ratio = 0.5*preCvs.width/text.getWidth();
            text.scale(ratio);
            canvas.add(text);
            canvas.centerObject(text);
            text.setCoords();
            
            var textHandler = function(e) {
                e.preventDefault();
                var data = document.getElementById('theimage');
                data.onload = function() {
                    var ctx = preCvs.getContext("2d", preCvs.width, preCvs.height);
                    ctx.drawImage(data, 0, 0, preCvs.width, preCvs.height);
                    canvas.clear();
                    canvas.setDimensions({width: 0, height: 0});
                    $(".textButton>.fa").unbind('click', textHandler);
                };
                if(e.target.className.match(/fa-check/g)) {
                    var bench = document.createElement('canvas');
                    bench.width = data.width;
                    bench.height = data.height;
                    var ctx = bench.getContext("2d", data.width, data.height);
                    ctx.drawImage(data, 0, 0);
                    
                    var rw = data.width/preCvs.width;
                    var rh = data.height/preCvs.height;
                    var angle = text.getAngle();
                    text.setFontSize(text.getFontSize()*rw);
                    text.setLeft(text.getLeft()*rw);
                    text.setTop(text.getTop()*rh);
                    canvas.deactivateAll();
                    text.render(ctx);
                    data.src = bench.toDataURL();
                }
            };
            $(".textButton>.fa").click(textHandler);
        }
    });
    $(".fa-check, .fa-times").click(function(e){
        e.preventDefault();
        $("#edit-intro").css('display', 'inline-block');
        //$("#edit-crop").css('display', 'none');
        $("#edit-rotate").css('display', 'none');
        //$("#edit-effect").css('display', 'none');
        $("#edit-stamps").css('display', 'none');
        $("#stamps-zone").css('display', 'none');
        $("#edit-text").css('display', 'none');
        $("#text-zone").css('display', 'none');
        $("#fabric-zone").css('display', 'none');
    });
    $("li.stamp").click(function(e) {
        e.preventDefault();
        $('#stamps-zone').css('display', 'none');
        var preCvs = document.getElementById('preview-canvas');
        var canvas = new fabric.Canvas('playground');
        canvas.setDimensions({ width: preCvs.width, height: preCvs.height });
        canvas.setBackgroundImage(
            preCvs.toDataURL(),
            canvas.renderAll.bind(canvas), {
            originX: 'left',
            originY: 'top'
        });
        canvas.allowTouchScrolling = true;

        var stampURL = e.target.src.replace('.png', '.svg');
        fabric.Image.fromURL(stampURL, function(img) {
            var ratio = 0.4*preCvs.width/img.getWidth();
            img.setWidth(img.getWidth()*ratio);
            img.setHeight(img.getHeight()*ratio);
            canvas.add(img);
            canvas.centerObject(img);
            img.setCoords();
            var stamphandler = function(e) {
                e.preventDefault();
                var data = document.getElementById('theimage');
                data.onload = function() {
                    var ctx = preCvs.getContext("2d", preCvs.width, preCvs.height);
                    ctx.drawImage(data, 0, 0, preCvs.width, preCvs.height);
                    canvas.clear();
                    canvas.setDimensions({width: 0, height: 0});
                    $(".stampsButton>.fa").unbind('click', stamphandler);
                };
                if(e.target.className.match(/fa-check/g)) {
                    var bench = document.createElement('canvas');
                    bench.width = data.width;
                    bench.height = data.height;
                    var ctx = bench.getContext("2d", data.width, data.height);
                    ctx.drawImage(data, 0, 0);
                    
                    var rw = data.width/preCvs.width
                    var rh = data.height/preCvs.height;
                    var stamp = new Image();
                    stamp.src = stampURL;
                    var width = img.getWidth()*rw;
                    var height = img.getHeight()*rh;
                    ctx.save();
                    ctx.translate(img.getLeft()*rw, img.getTop()*rh);
                    ctx.rotate(img.angle/180*Math.PI);
                    ctx.drawImage(stamp, 0, 0, width, height);
                    ctx.restore();
                    data.src = bench.toDataURL();
                }
            };
            $(".stampsButton>.fa").click(stamphandler);
        });
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
                bufferImage.id = 'bufferImage';
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
                //$('#theimage').rotateRight(0);
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
        if($('canvas#theimage').length == 0){
            //alert("shitttt");
            myFlip(canvas, this.id);
            //$('#theimage').rotateRight(0);/*make sure canvas is existing*/
            var acanvas = document.createElement('canvas');
            acanvas.id = 'theimage';
            acanvas.width = img_width;
            acanvas.height = img_height
            var acontext = acanvas.getContext('2d');
            acontext.save();
            if(this.id ==='flip-hoz'){
                acontext.translate(acanvas.width, 0);
                acontext.scale(-1, 1);
            }else{
                acontext.translate(0, acanvas.height);
                acontext.scale(1, -1);
            }
            acontext.drawImage(bufferImage, 0, 0, img_width, img_height);
            acontext.restore();
            $('img#theimage')[0].parentNode.replaceChild(acanvas, $('img#theimage')[0]);
            //$('#theimage').css('display','none');
            //$('#theimage').css('display','block');
        }
        else{
            if(myFlip(canvas, this.id))
                myFlip($('canvas#theimage')[0], this.id);
            //alert('done');
        }
    });

    function myFlip(canvas, rol){
        context = canvas.getContext('2d');
        context.save();
        if(rol === 'flip-hoz'){
            context.translate(canvas.width, 0);
            context.scale(-1, 1);
        }else{
            context.translate(0, canvas.height);
            context.scale(1, -1);
        }
        //context.restore();
        context.drawImage(document.getElementById('theimage'), 0, 0, canvas.width, canvas.height);
        context.restore();
        return true;
    }

    $("#save").click(function(e){/*for debugging now*/
        $('#theimage').css('display','block');
    });
    
    $("a.effects").click(function(e){
        e.preventDefault();
        if(img_width <= 0){
            alert("Please pick up an image first");
            return;
        }
        myEffect(this, $(this).attr("data-effect-id"));
        function myEffect(obj, ef_id){
            switch (ef_id){
                case '1':
                    Caman("#theimage", function (e) {
                        this.greyscale();
                        this.contrast(5);
                        this.noise(3);
                        this.sepia(100);
                        this.channels({
                            red: 8,
                            blue: 2,
                            green: 4
                        }).render();;
                        this.gamma(0.87);
                        this.vignette("40%", 30);
                        this.render(function(){
                            var canvas = document.getElementById('preview-canvas');
                            var context = canvas.getContext("2d",canvas.width,canvas.height);
                            context.save();
                            context.clearRect (0,0,canvas.width,canvas.height);
                            context.drawImage(document.getElementById('theimage'), 0, 0, canvas.width, canvas.height);
                            context.restore();
                            alert('done');
                        });
                    });
                    break;
                case '2':
                    Caman("#theimage", function (e) {
                        this.brightness(15);
                        this.exposure(15);
                        this.curves("rgb", [0, 0], [200, 0], [155, 255], [255, 255]);
                        this.saturation(-20);
                        this.gamma(1.8);
                        this.vignette("50%", 60);
                        this.brightness(5);
                        this.render(function(){
                            var canvas = document.getElementById('preview-canvas');
                            var context = canvas.getContext("2d",canvas.width,canvas.height);
                            context.save();
                            context.clearRect (0,0,canvas.width,canvas.height);
                            context.drawImage(document.getElementById('theimage'), 0, 0, canvas.width, canvas.height);
                            context.restore();
                            alert('done');
                        });
                    });
                    break;
                case '3':
                    Caman("#theimage", function (e) {
                        this.exposure(3.5);
                        this.saturation(-5);
                        this.vibrance(50);
                        this.sepia(60);
                        this.colorize("#e87b22", 10);
                        this.channels({
                            red: 8,
                            blue: 8
                        });
                        this.contrast(5);
                        this.gamma(1.2);
                        this.vignette("55%", 25);
                        this.render(function(){
                            var canvas = document.getElementById('preview-canvas');
                            var context = canvas.getContext("2d",canvas.width,canvas.height);
                            context.save();
                            context.clearRect (0,0,canvas.width,canvas.height);
                            context.drawImage(document.getElementById('theimage'), 0, 0, canvas.width, canvas.height);
                            context.restore();
                            alert('done');
                        });
                    });
                    break;
                case '4':
                    Caman("#theimage", function (e) {
                        this.gamma(1.5);
                        this.clip(25);
                        this.saturation(-60);
                        this.contrast(5);
                        this.noise(5);
                        this.vignette("50%", 30);
                        this.render(function(){
                            var canvas = document.getElementById('preview-canvas');
                            var context = canvas.getContext("2d",canvas.width,canvas.height);
                            context.save();
                            context.clearRect (0,0,canvas.width,canvas.height);
                            context.drawImage(document.getElementById('theimage'), 0, 0, canvas.width, canvas.height);
                            context.restore();
                            alert('done');
                        });
                    });
                    break;
                case '5':
                    Caman("#theimage", function (e) {
                        this.saturation(-35);
                        this.curves("b", [20, 0], [90, 120], [186, 144], [255, 230]);
                        this.curves("r", [0, 0], [144, 90], [138, 120], [255, 255]);
                        this.curves("g", [10, 0], [115, 105], [148, 100], [255, 248]);
                        this.curves("rgb", [0, 0], [120, 100], [128, 140], [255, 255]);
                        this.sharpen(20);
                        this.render(function(){
                            var canvas = document.getElementById('preview-canvas');
                            var context = canvas.getContext("2d",canvas.width,canvas.height);
                            context.save();
                            context.clearRect (0,0,canvas.width,canvas.height);
                            context.drawImage(document.getElementById('theimage'), 0, 0, canvas.width, canvas.height);
                            context.restore();
                            alert('done');
                        });
                    });
                    break;
                default:
                    $('p#ori-text').remove();
                    $('#edit-effect').css('display','none');
                    if($(obj).attr('data-setting-check') == 'true'){
                        alert('Good to go. \n :)');
                    }else{
                        alert("Sorry, it's under development. \n :P");
                    }
                    document.getElementById('theimage').style.display = 'none';
                    break;
            }
        }
    });
    
    $('.under-dev').click(function(e){
        e.preventDefault();
        alert("Sorry, it's under development. \n :P");
    })

})();
