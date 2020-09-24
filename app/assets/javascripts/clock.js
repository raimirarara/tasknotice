document.addEventListener('turbolinks:load', function() {
  init();
});

// clock関数を１秒周期で繰り返す
function init(){
clock();
setInterval('clock();',1000);
}


// clock関数 start
function clock(){
var now = new Date();

var canvas = document.getElementById("analogclock");
var ctx = canvas.getContext('2d');
ctx.save();

// 各種設定
canvas.width = 300;
canvas.height = 300;
var w      = canvas.width;
var h      = canvas.height;
var center = {x : w / 2, y : h / 2};
// 文字盤の数字の中心までの半径(canvas の半分より少し小さく)
var rads     = w / 2 * 0.8;

ctx.clearRect(0, 0, w, h);


// 時計の外側の丸
ctx.save();
ctx.lineWidth   = 3;
ctx.translate(center.x,center.y);
ctx.fillStyle = '#FFF';
ctx.beginPath();
ctx.arc(0, 0, (w/2)-5, 0, Math.PI * 2, false);
ctx.fill();
ctx.stroke();
/* circle white */
ctx.beginPath();
ctx.arc(0, 0, 100, 0, Math.PI * 2, false);
ctx.fillStyle   ="#FFF";
ctx.fill();

ctx.restore();

var tblTbody = document.getElementById('table_body_id');

function setStartHour()
{
   task_start_time = new Array();
   task_start_hr = new Array();
   for (var i=0; i<tblTbody.rows.length; i++){
      task_start_time[i] = tblTbody.rows[i].cells[2].innerHTML;
      task_start_hr[i] = task_start_time[i].substring(0, 2);
   }
   return task_start_hr;
}
function setStartMin()
{
   task_start_time = new Array();
   task_start_min = new Array();
   for (var i=0; i<tblTbody.rows.length; i++){
      task_start_time[i] = tblTbody.rows[i].cells[2].innerHTML;
      task_start_min[i] = task_start_time[i].substring(3, 5);
   }
   return task_start_min;
}
function setEndHour()
{
   task_end_time = new Array();
   task_end_hr = new Array();
   for (var i=0; i<tblTbody.rows.length; i++){
      task_end_time[i] = tblTbody.rows[i].cells[3].innerHTML;
      task_end_hr[i] = task_end_time[i].substring(0, 2);
   }
   return task_end_hr;
}
function setEndMin()
{
   task_end_time = new Array();
   task_end_min = new Array();
   for (var i=0; i<tblTbody.rows.length; i++){
      task_end_time[i] = tblTbody.rows[i].cells[3].innerHTML;
      task_end_min[i] = task_end_time[i].substring(3, 5);
   }
   return task_end_min;
}

function setArray()
{
     abc = new Array();
     for (var i=0; i<tblTbody.rows.length; i++){
        abc[i] = tblTbody.rows[i].cells[4].innerHTML;
     }
     return abc;
}

function setColor(){
  abc = new Array();
  for (var i=0; i<tblTbody.rows.length; i++){
     abc[i] = tblTbody.rows[i].cells[5].style.color;
  }
  return abc;
}
task_start_hr = setStartHour();
task_start_min = setStartMin();
task_end_hr = setEndHour();
task_end_min = setEndMin();


 task_users = setArray();
 task_users_color = setColor();
 var a = Array.from(new Set(task_users));


for (var i=0; i<tblTbody.rows.length; i++){

for(var j=0; j<tblTbody.rows.length; j++){
  if(task_users[j] == a[i]){
    ctx.save();
    ctx.lineWidth   = 6;
    ctx.strokeStyle = task_users_color[j];
    ctx.translate(center.x,center.y);  //円の中心に移動
    ctx.beginPath();
    ctx.arc(0, 0, (w/2)-12-i*8, task_start_hr[j]*(Math.PI/6) + (Math.PI/360)*task_start_min[j] - (Math.PI/2) , task_end_hr[j]*(Math.PI/6) + (Math.PI/360)*task_end_min[j] - (Math.PI/2) , false);
    ctx.stroke();

    ctx.restore();
  }
}

}

// タスクを時計に表示(分)
// ctx.save();
// ctx.lineWidth   = 6;
// ctx.strokeStyle = 'blue';
// ctx.translate(center.x,center.y);  //円の中心に移動
// ctx.beginPath();
// ctx.arc(0, 0, (w/2)-12, (Math.PI/30)*task_start_min - (Math.PI/2) , (Math.PI/30)*task_end_min - (Math.PI/2) , false);
// ctx.stroke();

// タスクを時計に表示(時)
// ctx.save();
// ctx.lineWidth   = 6;
// ctx.strokeStyle = 'blue';
// ctx.translate(center.x,center.y);  //円の中心に移動
// ctx.beginPath();
// ctx.arc(0, 0, (w/2)-12, (task_start_hr*(Math.PI/6) + (Math.PI/360)*task_start_min) - (Math.PI/2) , (task_end_hr*(Math.PI/6) + (Math.PI/360)*task_end_min) - (Math.PI/2) , false);
// ctx.stroke();

ctx.restore();

// ctx.save();
// ctx.lineWidth   = 6;
// ctx.strokeStyle = 'green';
// ctx.translate(center.x,center.y);  //円の中心に移動
// ctx.beginPath();
// ctx.arc(0, 0, (w/2)-12, (task_start_hr2*(Math.PI/6) + (Math.PI/360)*task_start_min2) - (Math.PI/2) , (task_end_hr2*(Math.PI/6) + (Math.PI/360)*task_end_min2) - (Math.PI/2) , false);
// ctx.stroke();
//
// ctx.restore();


// 文字盤
// ctx.save();
// ctx.font        = "30px 'sans-serif'";
// ctx.textAlign   ="center";
// ctx.textBaseline    ="middle";
// ctx.fillStyle   = "rgb(0, 0, 0)";
// ctx.shadowBlur = 5;
// ctx.shadowColor = "#FFF";
// for (var i = 0; i < 12; i++) {
//     var radian = i * Math.PI / 6;
//     var x = center.x + rads * Math.sin(radian);
//     var y = center.y - rads * Math.cos(radian);
//     var text = "" + (i == 0 ? "12" : i);
//     ctx.fillText(text, x, y);
//   }
// ctx.restore();
//

//  中心を移動
ctx.translate(center.x,center.y);

// // 分
ctx.save();
// ctx.strokeStyle ="#CCC";
// ctx.lineWidth = 2;
// ctx.beginPath();
//     for (var i=0;i<60;i++){
//         if (i%5!=0) {
//         ctx.moveTo(100,0);
//         ctx.lineTo(95,0);
//         }
//     ctx.rotate(Math.PI/30);
//     }
// ctx.stroke();

// // 時間
// ctx.strokeStyle ="#999";
// ctx.lineWidth = 3;
// ctx.beginPath();
//     for (var i=0;i<60;i++){
//     ctx.moveTo(100,0);
//     ctx.lineTo(90,0);
//     ctx.rotate(Math.PI/6);
//     }
// ctx.stroke();
// ctx.restore();


// 針の設定
var sec = now.getSeconds();
var min = now.getMinutes();
var hr= now.getHours();
var year = now.getFullYear();
var month = now.getMonth() + 1;
var day = now.getDate();
var week = now.getDay();
var weeks = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
var w = weeks[week];
var ampm = (hr>= 12) ? "PM" : "AM";
hr = (hr>=12) ? hr-12 : hr; // 12以上なら「hr-12」、それ以外なら「hr」
ctx.fillStyle = "#999";

// 1桁の数字を0埋めで2桁にする
var toDoubleDigits = function(num) {
  num += "";
  if (num.length === 1) {
    num = "0" + num;
  }
 return num;
};

hr = toDoubleDigits(hr)
min = toDoubleDigits(min)


// 短針
ctx.save();
ctx.rotate( hr*(Math.PI/6) + (Math.PI/360)*min + (Math.PI/21600)*sec )
ctx.lineWidth = 5;
ctx.beginPath();
ctx.moveTo(0,-50);
ctx.lineTo(0,-110);
ctx.lineTo(0,-50);
ctx.stroke();
ctx.restore();

// 長針
ctx.save();
ctx.rotate( (Math.PI/30)*min + (Math.PI/1800)*sec )
ctx.lineWidth = 3;
ctx.strokeStyle = "rgb(0, 0, 0)";
ctx.beginPath();
ctx.moveTo(0,-50);
ctx.lineTo(0,-130);
ctx.stroke();
ctx.restore();

// // 秒針
// ctx.save();
// ctx.rotate(sec * Math.PI/30);
// ctx.strokeStyle = "rgb(192, 192, 192)";
// ctx.lineWidth = 2;
// ctx.beginPath();
// ctx.moveTo(0,-30);
// ctx.lineTo(0,-130);
// ctx.stroke();
// ctx.restore();


//真ん中のデジタル時計
ctx.save();
ctx.font        = "30px 'cursive'";
ctx.textAlign   ="center";
ctx.textBaseline    ="middle";
ctx.fillStyle   = "rgb(0, 0, 0)";
var text = hr + ":" + min ;
ctx.fillText(text, 0, 0);
// ctx.fillText( year + "." + month "." + day, 0, -100);
ctx.restore();

ctx.save();
ctx.font        = "12px 'cursive'";
ctx.textAlign   ="center";
ctx.textBaseline    ="middle";
ctx.fillStyle   = "rgb(0, 0, 0)";
var text = ampm + "/" + year + "." + month + "." + day + "/" + w;
ctx.fillText( text, 0, 24);
ctx.restore();



}   // clock end
