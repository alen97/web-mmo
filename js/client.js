var Client = {};
Client.socket = io.connect();

Client.sendTest = function(){
    console.log("test sent");
    Client.socket.emit('test');
};

Client.askNewPlayer = function(){
    Client.socket.emit('newplayer');
};

Client.sendClick = function(x,y){
  Client.socket.emit('click',{x:x,y:y});
};

Client.socket.on('newplayer',function(data){
    Game.addNewPlayer(data.id,data.x,data.y);
});

Client.socket.on('allplayers',function(data){
    for(var i = 0; i < data.length; i++){
        Game.addNewPlayer(data[i].id,data[i].x,data[i].y);
    }

    Client.socket.on('move',function(data){
        console.log("YIAAA NIGGA")
        Game.movePlayer(data.id,data.x,data.y);
    });

    Client.socket.on('remove',function(id){
        Game.removePlayer(id);
    });
});

Client.sendShoot = function(x,y){
    console.log("SHOOOT")

    Client.socket.emit('shoot',{x:x,y:y});
};

Client.socket.on('newproyectil',function(data){
    console.log("NARNIA HERE")

     Game.addNewProyectil(data.id,data.x,data.y);
});

Client.socket.on('allproyectiles',function(data){
    for(var i = 0; i < data.length; i++){
        Game.addNewProyectil(data[i].id,data[i].x,data[i].y);
    }

    Client.socket.on('moveproyectil',function(data){
        console.log("YIIIIIAAAA")

        Game.moveProyectil(data.id,data.x,data.y);
    });

    Client.socket.on('remove',function(id){
        Game.removeProyectil(id);
    });
});
