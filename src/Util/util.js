/**
 * Created by Diaohy on 2017/7/20.
 */
import $ from "jquery";
export function showAlert( msg = "未知错误" ) {
    let _msg = msg;
    //若是提示内容过长，比如说报各种log错误，则提示“内部错误”
    if(_msg.length > 35){
        _msg = "未知错误";
    }
    $(".system-alert>span").html(_msg);
    $(".system-alert").stop().show().animate({"top":"0px"}, 500);
    this._alertTimeout ? clearTimeout(this._alertTimeout) : "";
    this._alertTimeout = setTimeout(function () {
        clearTimeout(this._alertTimeout);
        $(".system-alert").stop().animate({"top":"-60px"}, 500,function () {
            $(this).hide();
        });
    }, 2500);
}