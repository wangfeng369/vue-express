class Tools{
    constructor(){

    }
    static createSixNum(){
        let Num="";
        for(var i=0;i<6;i++)
        {
            Num+=Math.floor(Math.random()*10);
        }
        return Num;
   }
   static formatgetTime(date){
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        let minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        return y + '-' + m + '-' + d+' '+h+':'+minute;
    
   }
}

export default Tools