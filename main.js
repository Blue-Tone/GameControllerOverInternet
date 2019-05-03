// define your obniz id
let obnizId="";

// URL引数があれば、IDを設定する。
// /index.html?id=xxxxxxxx
if(location.search){
  obnizId=location.search.replace("?id=","");
}

///////////// obniz処理 /////////////// 
if("" === obnizId){
  // 入力ダイアログを表示
	obnizId = window.prompt("Please enter obniz id\nor define to main.js", "");
}
console.log(obnizId);

var obniz = new Obniz(obnizId);

const UP = false;
const DOWN = true;
const IO_GND = obniz.io0;
const IO_LEFT = obniz.io2;//left
const IO_DOWN = obniz.io3;// down
const IO_RIGHT = obniz.io4;//rught
const IO_UP = obniz.io1;// up
const IO_A = obniz.io5;
const IO_B = obniz.io6;
const IOS = [ IO_UP, IO_DOWN, IO_LEFT, IO_RIGHT, IO_A, IO_B]

/** 接続完了イベント */
obniz.onconnect = async function () {
  obniz.display.clear();
  obniz.display.print("Conect!!");
  IO_GND.pull("0v");
  IO_GND.output(false);

  /** 初期化で全部OFF */
  IOS.forEach(io => {
    io.output(UP);
  });

  obniz.switch.onchange = function(state) {
    $('#print').text(state);
    obniz.display.clear();
    obniz.display.print(state);
  }  
}

////////////// キー処理 //////////////// 
document.onkeydown = keydown;
document.onkeyup = keyup;
/** イベントログ表示用バッファ */
const events = [];

/** キーダウン */
function keydown() {
  showKeyEvent(event)
  let id = pushKey(event.key, DOWN);
  if(id){
    let target = document.getElementById(id);
    target.classList.add("push");
  }
}

/** キーアップ */
function keyup() {
  showKeyEvent(event)
  let id = pushKey(event.key, UP);
  if(id){
    let target = document.getElementById(id);
    target.classList.remove("push");
  }
}

/** キーイベント表示 */
function showKeyEvent(e) {
  if("a" == e.key || "s" == e.key ||
     "d" == e.key || "w" == e.key ||
     "ArrowLeft" == e.key ||
     "ArrowRight" == e.key)
  {    
    target = document.getElementById("key_event");
    let type = "";
    if("keydown" == e.type) t = "Down"
    if("keyup" == e.type) t = "Up__"
    let str = t + " key=" + e.key + " | code=" + e.code ;
    events.push(str);
    if(10 < events.length){
      events.shift()
    }
    target.innerHTML = events.join("</br>");
  }
}

/**
 * キーイベント処理
 * 
 * @param {String} key 
 * @param {bool} action 
 * @return {String} id キーコードをHtmlのIDに変換した文字列
 */
function pushKey(key, action){
  let id = ""
  if (key == 's') {
    id = "key_down"
    if(action){
      IO_DOWN.output(DOWN);
      IO_UP.output(UP);
    }else{
      IO_DOWN.output(UP);
    }
  }
  if (key == 'w') {
    id = "key_up";
    if(action){
      IO_UP.output(DOWN);
      IO_DOWN.output(UP);
    }else{
      IO_UP.output(UP);
    }
  }
  if (key == 'd'){
    id = "key_right"
    if(action){
      IO_RIGHT.output(DOWN);
      IO_LEFT.output(UP);
    }else{
      IO_RIGHT.output(UP);
    }
  }
  if (key == 'a') {
    id = "key_left"
    if(action){
      IO_LEFT.output(DOWN);
      IO_RIGHT.output(UP);
    }else{
      IO_LEFT.output(UP);
    }
  } 
  if (key == 'ArrowLeft'){
    id = "key_a";
    IO_A.output(action);
  } 
  if (key == 'ArrowRight') {
    id = "key_b"
    IO_B.output(action);
  }
  return id;
}

// マウスオーバー、マウスアウト イベント
$(function(){
  $('button')
  .mouseover(function(){
    const id =  $(this).attr("id");
    console.log("mouseover:" + id);
    pushKey(id, DOWN)
    $(this).addClass("push");
  })
  .mouseout(function(){
    const id =  $(this).attr("id");
    console.log("mouseout :" + id);
    pushKey(id, UP)
    $(this).removeClass("push");
  })
  .ontouchstart(function(){
    const id =  $(this).attr("id");
    console.log("ontouchstart :" + id);
    pushKey(id, DOWN)
    $(this).addClass("push");
  })
  .ontouchend(function(){
    const id =  $(this).attr("id");
    console.log("ontouchend :" + id);
    pushKey(id, UP)
    $(this).removeClass("push");
  })
});


