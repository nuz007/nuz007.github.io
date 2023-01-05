/**
 * @author floyd
 */

//游戏控制对象
var Game = {
	//游戏背景dom
	gamePanel : null,
	//玩家对象
	player : null,
	//分数
	score : 0,
	//开始按钮
	startBtn : null,
	//生产方块的循环ID
	createBlockId : 0,
	//初始化游戏
	init : function(){
		
		this.gamePanel = document.getElementById('gamePanel');
		this.gamePanel.focus();
		
		document.body.onkeydown = function(e){Game.keydown(e);};
		document.body.onkeyup = function(e){Game.keyup(e);};
		
		this.startPlayer();
		this.startBlock();
	},
	//玩家初始
	startPlayer : function(){
		this.player = new Player();
		
		this.player.setPosition(this.gamePanel);
		this.player.gameOver = function(){Game.gameOver();};
		
		this.player.moveDown();
	},
	//开始生产方块
	startBlock : function(){
		
		var _this = this,time = document.all?1100:800;
		
		BlockFactory.init(this.gamePanel,this.player);
		
		BlockFactory.createFirstBlock();
		
		this.createBlockId = setInterval(function(){
			if (_this.player.isLive) {
				BlockFactory.createBlock();
				_this.addScore();
			}
		},time);
	},
	//键盘按下事件
	keydown : function(e){
		
		e = e || window.event;
		//阻止浏览器默认事件
		if(e.keyCode == 37 || e.keyCode == 39){
			
			if(e.preventDefault)e.preventDefault();
			else e.returnValue = false;
			
			this.player.keydown(e);
		}
	},
	//键盘释放事件
	keyup : function(e){
		
		e = e || window.event;
		
		if (e.keyCode == 37 || e.keyCode == 39) {
			this.player.keyup(e);
		}
	},
	//加分
	addScore : function(){
		this.score += 1;
		document.getElementById('score').innerHTML = Math.floor(this.score/9);
	},
	//游戏结束
	gameOver : function(){
		alert("你死于地下"+String(Math.floor(this.score/9))+"层");
		BlockFactory.stopBlock();
		document.body.onkeydown = null;
		document.body.onkeyup = null;
		Game.startBtn.style.display = '';
		clearInterval(this.createBlockId);
	},
	//游戏重置
	reset : function(){
		BlockFactory.removeBlock();
		this.gamePanel.removeChild(this.player.dom);
		this.gamePanel = null;
		this.player = null;
		this.score = 0;
	}
}
//游戏开始入口
function Start(btn){
	if (!Game.startBtn) {
		Game.startBtn = btn;
	}
	else Game.reset();
	Game.startBtn.style.display = 'none';
	Game.init();
};
