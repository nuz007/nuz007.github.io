/**
 * @author floyd
 */

//扩展数组方法，删除指定值
Array.prototype.remove = function(obj){
	
	for(var i=0,l=this.length;i<l;i++){
		if(this[i] == obj || this[i].dom == null){
			this.splice(i,1);
			break;
		}
	}
	return this;
}


//方块生产工厂，负责生产方块
var BlockFactory = {
	//游戏背景dom
	gamePanel:null,
	//玩家对象
	player : null,
	//生成的方块列表
	blockList : [],
	//初始化工厂
	init : function(gamePanel,player){
		this.gamePanel = gamePanel;
		this.player = player;
	},
	//生产一个方块
	createBlock : function(){
		//随机方块
		var randomBlock = Math.floor(Math.random()*20+1),block;
		switch(randomBlock){
			case 1:block=new NormalBlock();break;
			case 2:;
			case 3:;
			case 4:block=new FlipBlock();break;
			case 5:;
			case 6:;
			case 7:block=new NormalBlock();break;
			case 8:;
			case 9:;
			case 10:block=new ThornBlock();break;
			case 11:;
			case 12:;
			case 13:;
			case 14:block=new NormalBlock();break;
			case 15:;
			case 16:;
			case 17:block=new MissBlock();break;
			case 18:;
			case 19:;
			case 20:block=new FlipBlock();break;
			
		}
		//随机方块位置
		var randomPosition = Math.floor(Math.random()*5+1);
		this.setBlock(block,randomPosition);
	},
	//生产第一个方块,默认为普通方块，居中
	createFirstBlock : function(){
		var block = new NormalBlock();
		this.setBlock(block,3);
	},
	//设置方块的通用方法
	setBlock : function(block,position){
		
		var _this = this;
		
		block.init();
		block.setPosition(this.gamePanel,position);
		block.onCheckPlayerOn = function(){return this.checkPlayerOn(_this.player);}
		block.onPlayOn = function(){this.playOn(_this.player);}
		block.onCheckMoveOut = function(){this.checkMoveOut(_this.player);}
		block.onEnd = function(){_this.blockList.remove(this);}
		
		block.animation();
		
		this.blockList.push(block);
	},
	//方块停止移动
	stopBlock : function(){
		for(var i=0,l=this.blockList.length;i<l;i++){
			this.blockList[i].stopMove();
		}
	},
	//清除所有方块
	removeBlock : function(){
		for(var i=0,l=this.blockList.length;i<l;i++){
			var b = this.blockList.pop();
			this.gamePanel.removeChild(b.dom);
			b.dom = null;
			b=null;
		}
	}
}
