function noScroll() {
    window.scrollTo(0, 0);
  }
  
  // add listener to disable scroll
  window.addEventListener('scroll', noScroll);

var game = new Phaser.Game("99%", "99%", Phaser.AUTO, document.getElementById('game'));
game.state.add('Game',Game);
game.state.start('Game');