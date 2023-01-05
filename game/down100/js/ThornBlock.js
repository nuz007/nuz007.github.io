/**
 * @author floyd
 */

//带刺的方块，刺一下，就gameover
var ThornBlock = function(){
	
	BlockBase.call(this);
	this.className = 'thorn';
}
ThornBlock.prototype = new BlockBase();

ThornBlock.prototype.playOn = function(player){
	
	player.clearMoveId(true);
	player.wasDead();
}
