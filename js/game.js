var Game = {};

Game.init = function(){
    game.stage.disableVisibilityChange = true;
};

var player;

Game.preload = function() {
    // game.load.image('background','assets/map/background.png');
    game.load.image('player','assets/sprites/sprite.png');
};

Game.create = function(){
    Game.playerMap = {};
    var testKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    testKey.onDown.add(Client.sendTest, this);

    // player = game.add.sprite(game.world.centerX, game.world.centerY, 'player')
    // game.physics.enable(player, Phaser.Physics.ARCADE);



    
    game.canvas.oncontextmenu = function (e) { e.preventDefault(); }
    Client.askNewPlayer();
};

Game.update = function(){
    //  only move when you click
    if (game.input.mousePointer.isDown)
    {
        //  400 is the speed it will move towards the mouse
        game.physics.arcade.moveToPointer(player, 400)
        movePlayer('player', pointer.x, pointer.y);

    }
    else
    {
        // player.body.velocity.setTo(0, 0);
    }

}

Game.getCoordinates = function(layer,pointer){
    Client.sendClick(pointer.worldX,pointer.worldY);
};

Game.addNewPlayer = function(id,x,y){
    Game.playerMap[id] = game.add.sprite(x,y,'player');
};

Game.movePlayer = function(id,x,y){
    var player = Game.playerMap[id];
    var distance = Phaser.Math.distance(player.x,player.y,x,y);
    var tween = game.add.tween(player);
    var duration = distance*10;
    tween.to({x:x,y:y}, duration);
    tween.start();
};

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};
