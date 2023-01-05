/**
 * @author floyd
 */

//普通方块类，就是玩家永久站在上面的
var NormalBlock = function(){
	//调用基类call函数，继承非prototype的属性与方法
	BlockBase.call(this);
	//普通方块的css类名
	this.className = 'normal';
}
//继承基类的prototype的属性与方法
NormalBlock.prototype = new BlockBase();

//普通方块的处理事件
NormalBlock.prototype.playOn = function(player){
	//玩家停止纵向移动
	player.clearMoveId(true);
	//向上移动
	player.moveUp(this.movepx,this.movesp);
	//方块继续移动
	this.animation();
	//设置需要检测玩家在方块上移动
	this.hasCheckMove = true;
}
//普通方块的左右移动检测
NormalBlock.prototype.checkMoveOut = function(player){
	
	var pdom = player.dom,bdom = this.dom;
	//玩家移动出了方块
	if (pdom.offsetLeft <= bdom.offsetLeft - pdom.clientWidth || pdom.offsetLeft >= bdom.offsetLeft + bdom.clientWidth) {
		//玩家向下移动
		player.clearMoveId(true);
		player.moveDown();
		//设置方块不需要检测玩家是否在方块上移动
		this.hasCheckMove = false;
		//方块需要检测玩家站立
		this.hasCheckPlayon = true;
	}
}
