const filters = {
  // msg=>タイムスタンプなど　pat=>変換する形式
  dateFormat: function (msg, pat) {
   function addZero(msg) {
     return msg.toString().padStart(2, '0')
   }
   //タイムスタンプ処理
   msg = new Date(msg);
   let y = msg.getFullYear();
   let m = addZero(msg.getMonth() + 1);
   let da = addZero(msg.getDate());
   let h = addZero(msg.getHours());
   let s = addZero(msg.getSeconds());
   let mi = addZero(msg.getMinutes());
   if(pat && pat.toLowerCase(`yyy-mm-dd`)){
       return `${y}-${m}-${da}`
   } else {
       return `${y}-${m}-${da} ${h}:${s}:${mi}`
   }
  }
};

export default filters;
