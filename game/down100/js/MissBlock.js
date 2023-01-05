/**
 * @author floyd
 */

//会消失的方块，跟普通方块类似，只是它只会停留500毫秒
var MissBlock = function(className){
	BlockBase.call(this,className);
	this.className = 'miss';
}
MissBlock.prototype = new BlockBase();

MissBlock.prototype.playOn = function(player){
	
	player.clearMoveId(true);
	player.moveUp(this.movepx,this.movesp);
	
	this.animation();
	
	this.hasCheckMove = true;
	
	var _this = this;
	setTimeout(function(){
		_this.end();
		_this.hasCheckPlayon = true;
		player.clearMoveId(true);
		player.moveDown();
	},500);
}
MissBlock.prototype.checkMoveOut = function(player){
	
	var pdom = player.dom,bdom = this.dom;
	
	if (pdom.offsetLeft <= bdom.offsetLeft - pdom.clientWidth || pdom.offsetLeft >= bdom.offsetLeft + bdom.clientWidth) {
		player.clearMoveId(true);
		player.moveDown();
		this.hasCheckMove = false;
		this.hasCheckPlayon = true;
	}
}