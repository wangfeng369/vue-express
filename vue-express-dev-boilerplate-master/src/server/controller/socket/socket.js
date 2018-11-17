const schedule = require('node-schedule')

class socket{
    constructor(){

    }
    socketInit(socket){
        //接收并处理客户端的hi事件
        socket.on('hi', (data)=>{
            schedule.scheduleJob('0 23 18 * * *', ()=>{
                socket.emit('message','你好');
            }); 
       
        })

        //断开事件
        socket.on('disconnect', function(data) {
        console.log('断开',data)
        socket.emit('c_leave','离开');
        //socket.broadcast用于向整个网络广播(除自己之外)
        //socket.broadcast.emit('c_leave','某某人离开了')
        })
    }
    setTimeSocket(socket){

    }
}

  
export default new socket