/**
 * @author floyd
 */
window.scroll(0,760);

//方块基类
var BlockBase = function(){
	//方块dom元素
	this.dom = null;
	//dom的css类名
	this.className = "";
	//是否需要检测玩家在方块上移动
	this.hasCheckMove = false;
	//移动循环ID
	this.moveId = 0;
}
BlockBase.prototype = {
	//是否需要检测玩家停留在方块
	hasCheckPlayon : true,
	//方块移动速度
	movepx : 3,
	//方块移动频率
	movesp : 30,
	//游戏背景dom
	gamePanel : null,
	//方块出现的位置
	site : {
		1:0,
		2:76,
		3:142,
		4:208,
		5:274,
		6:340
	},
	//初始化
	init : function(){
		
		this.dom = document.createElement('div');
		this.dom.className = this.className;
		this.dom.style.width = '120px';
		this.dom.style.height = '10px';
	},
	//设置位置//gamepanel游戏背景dom，type位置下标
	setPosition : function(gamePanel,type){
		
		if(!this.gamePanel)this.gamePanel = gamePanel;
		
		this.dom.style.left = this.site[type] + 'px';
		this.dom.style.top = this.gamePanel.offsetHeight + 'px';
		
		this.gamePanel.appendChild(this.dom);
	},
	//动画，移动
	animation : function(){
		
		var _this = this;
		//处理函数
		var process = function(){
			//dom元素为空，退出
			if(!_this.dom)return;
			//计算移动后的y坐标
			var top = _this.dom.offsetTop - _this.movepx;
			
			_this.dom.style.top = top + 'px';
			//获取玩家是否站在方块上
			var isPlayerOn = _this.hasCheckPlayon && _this.onCheckPlayerOn();
			//如果需要判断方块上的左右移动
			if(_this.hasCheckMove)_this.onCheckMoveOut();
			//方块超出边界，而且玩家没有站在方块上
			if(top <= -_this.dom.offsetHeight && !isPlayerOn){
				//方块结束，就是消失
				_this.end();
			}
			//玩家站在方块上
			else if(isPlayerOn){
				//停止方块移动
				_this.stopMove();
				//执行每种方块的处理函数
				_this.onPlayOn();
			}
		}
		this.moveId = setInterval(process,this.movesp);
	},
	//停止移动
	stopMove: function(){
		clearTimeout(this.moveId);
	},
	//方块结束
	end : function(){
		this.stopMove();
		this.gamePanel.removeChild(this.dom);
		this.dom = null;
		this.onEnd();
	},
	//外部接口，方块结束
	onEnd : function(){},
	//检测玩家是否在方块上
	checkPlayerOn : function(player){
		//玩家处于弹跳状态，返回非
		if(player.isFlip)return false;
		
		var pdom = player.dom,bdom = this.dom;
		//判断玩家的X坐标是否在方块的范围内
		if(pdom.offsetLeft > bdom.offsetLeft - pdom.clientWidth && pdom.offsetLeft < bdom.offsetLeft + bdom.clientWidth){
			//判断此时玩家的脚的Y坐标是否在方块上面，而且，之后移动的下一次，玩家的脚的Y坐标在方块下面
			if((pdom.offsetTop + pdom.clientHeight <= bdom.offsetTop) && 
			(pdom.offsetTop + pdom.clientHeight + player.movepy + player.g > bdom.offsetTop-this.movepx)){
				
				pdom.style.top = (bdom.offsetTop - pdom.offsetHeight) + 'px';
				this.hasCheckPlayon = false;
				return true;
			}
		}
		return false;
	},
	//子类重写方法，玩家是否移出方块范围
	checkMoveOut : function(player){},
	//子类重写方法，玩家站在方块上，各自处理的事件
	playOn : function(player){},
	//外部接口，传参，回调checkMoveOut
	onCheckMoveOut : function(){},
	//外部接口，传参，回调checkPlayerOn
	onCheckPlayerOn : function(){},
	//外部接口，传参，回调playOn
	onPlayOn : function(){}
}
