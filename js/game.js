var Game = {};

Game.init = function(){
    game.stage.disableVisibilityChange = true;
};

var player;
var proyectilSprite;
// var proyectiles;

Game.preload = function() {
    // game.load.image('background','assets/map/background.png');
    game.load.image('player','assets/sprites/player.png');
    game.load.image('proyectil','assets/sprites/proyectil.png');
};

Game.create = function(){
    Game.playerMap = {};
    var testKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    testKey.onDown.add(Client.sendTest, this);

    game.physics.startSystem(Phaser.Physics.ARCADE);

    // proyectiles = game.add.group();
    // proyectiles.enableBody = true;
    // proyectiles.physicsBodyType = Phaser.Physics.ARCADE;

    // proyectiles.createMultiple(50, 'proyectil');
    // proyectiles.setAll('checkWorldBounds', true);
    // proyectiles.setAll('outOfBoundsKill', true);
    
    
    game.canvas.oncontextmenu = function (e) { e.preventDefault(); }

    Client.askNewPlayer();
};

// var shoot = false;
// var timer;
// var total = 0;
var proyectilEquipado = false;
var proyectiles = [];
var id = 0;

Game.update = function(){

    //  only move when you click
    if (game.input.activePointer.isDown) 
    {
        if(this.proyectilEquipado) {
            if(game.input.activePointer.duration > 500){
                // this.proyectilSprite  = game.add.sprite(this.player.x, this.player.y, 'proyectil');

                this.proyectilEquipado = false;

                Game.shoot(game.input.activePointer);
            }
        }
        // proyectilSprite.physics.enable(proyectilSprite, Phaser.Physics.ARCADE);
        // proyectilSprite.body.allowRotation = false;
        // game.physics.arcade.moveToPointer(bullet, 300);
    
        // shoot = true;

        // Hacer sistema de casteo mientras se mantiene el click
        // console.log(game.input.activePointer.duration)
        // if(game.input.activePointer.msSinceLastClick > 100){
        //     Game.getCoordinates(game.input.activePointer);

        // }
        
        if(game.input.activePointer.duration < 30){
            Game.getCoordinates(game.input.activePointer);

        }

        // //  Create our Timer
        // this.timer = game.time.create(false);

        // //  Set a TimerEvent to occur after 2 seconds
        // this.timer.loop(1000, updateCounter, this);

        // //  Start the timer running - this is important!
        // //  It won't start automatically, allowing you to hook it to button events and the like.
        // this.timer.start();
    }
    //proyectilSprite.rotation = game.physics.arcade.angleToPointer(proyectilSprite);


    // if(total > 0 && shoot == true) {
    //     this.timer.stop();
    //     this.shoot = false;
    // }

    // if (game.input.activePointer.isDown)
    // {
    // }

}

// function updateCounter() {
//     total++;
// }

Game.getCoordinates = function(pointer){
    console.log(pointer);
    Client.sendClick(pointer.worldX-12,pointer.worldY-12);
};

Game.shoot = function(pointer){
    console.log(pointer);
    Client.sendShoot(pointer.worldX-12,pointer.worldY-12);
};

// var id = 0;
// var playerList = [];

Game.addNewPlayer = function(id,x,y){
    Game.playerMap[id] = game.add.sprite(x,y,'player');
    console.log("NUEVO PLAYERRRRRR "+Game.playerMap[id])
    // game.physics.enable(Game.playerMap[id], Phaser.Physics.ARCADE);
    this.player = Game.playerMap[id];

    // this.playerList[this.id] = Game.playerMap[id];
    // this.id++;
    this.proyectilEquipado = true;
};

Game.addNewProyectil = function(id,x,y){
    Game.proyectilMap[id] = game.add.sprite(x,y,'proyectil');
    console.log("NUEVO PROYECTILLLL "+Game.proyectilMap[id])
    // game.physics.enable(Game.playerMap[id], Phaser.Physics.ARCADE);
    this.proyectilSprite = Game.proyectilMap[id];

    // this.playerList[this.id] = Game.playerMap[id];
    // this.id++;
    this.proyectilEquipado = false;
};

Game.movePlayer = function(id,x,y){
    var player = Game.playerMap[id];
    var distance = Phaser.Math.distance(player.x,player.y,x,y);
    var tween = game.add.tween(player);
    var duration = distance*5;
    tween.to({x:x,y:y}, duration);
    tween.start();
};

Game.moveProyectil = function(id,x,y){
    console.log("YIIIIIAAAA")
    var proyectil = Game.proyectilMap[id];
    var distance = Phaser.Math.distance(proyectil.x,proyectil.y,x,y);
    var tween = game.add.tween(proyectil);
    var duration = distance*5;
    tween.to({x:x,y:y}, duration);
    tween.start();
};

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};

Game.removeProyectil = function(id){
    this.proyectilSprite.destroy();
    delete this.proyectilSprite
};