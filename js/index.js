/**
 * Created by warren on 2017/4/15.
 */
$(function () {
    var isOpen = true,
         r =100;
    $(".contact").click(function () {
        var posInfo,
            ox,
            oy,
            oImg;
        if(isOpen){
            for(var i = 0, len= $(".contact-img img").length; i< len;i++){

                 posInfo = getPos(i, r);
                //console.log(posInfo)
                 ox = posInfo.x;
                 oy = posInfo.y;
                //console.log("i的坐标" +ox + oy)
                //console.log($(".contact-img img").eq(i))
                $(".contact-img img").eq(i).show().animate({
                    left:ox + "px",
                    top: oy + "px"
                }, 200+100*i, function () {

                })



            }
        }else{
            for(var i = 0, len= $(".contact-img img").length; i< len;i++){

                 posInfo = getPos(i, r);
                 ox = posInfo.x;
                 oy = posInfo.y;
                $(".contact-img img").eq(i).animate({
                    left:"50%",
                    top: "20%"
                }, 200+100 * (3-i-1), function () {
                    $(".contact-img img").eq(i).hide();

                })


            }

        }
        isOpen = !isOpen;



    })

    //获得x y坐标
    function getPos(index, or){
        var ox, oy;
        //坐标 到时是负值
        if(index<2){
            ox = Math.round(Math.sin((Math.PI/ 180)* (index+1)* 36 ) * or);
            oy = Math.round(Math.cos((Math.PI/ 180)* (index+1)* 36 ) * or);
            return {x: ox, y: -oy}
        }else{
           // 定位坐标是正值
            ox = Math.round(Math.sin((Math.PI/ 180)* (3- index +1)* 36 ) * or);
            oy = Math.round(Math.cos((Math.PI/ 180)* (3- index +1)* 36 ) * or);
            return {x: ox, y: oy}
        }

    }


})