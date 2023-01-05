/**
 * @author floyd
 */
//玩家类
var Player = function(){
	//玩家对应的dom元素
	this.dom = null;
	//玩家的纵方向速度
	this.movepy = 0;
	//是否在左右移动
	this.isMove = false;
	//横向移动循环ID
	this.moveXId = 0;
	//纵向移动循环ID
	this.moveYId = 0;
	//是否或者
	this.isLive = true;
	//是否处于弹跳状态
	this.isFlip = false;
	
	this.init();
}
Player.prototype = {
	//游戏背景dom元素
	gamePanel : null,
	//弹力系数
	k:0.9,
	//重力加速度
	g:1,
	//玩家横向移动速度
	movepx : 15,
	//默认玩家纵向移动速度
	cmovepy : 1,
	//玩家移动频率
	movesp : 40,
	//初始化
	init : function(){
		this.dom = document.createElement('div');
		this.dom.className = 'player';
		
		this.movepy = this.cmovepy;
	},
	//设置初始位置
	setPosition : function(gamePanel){
		
		this.gamePanel = gamePanel;
		
		this.gamePanel.appendChild(this.dom);
		
		this.dom.style.left = (this.gamePanel.offsetWidth - this.dom.offsetWidth) / 2 + 'px';
		this.dom.style.top = 70 + 'px';
	},
	//键盘按下事件
	keydown : function(e){
		//移动中，退出事件
		if(this.isMove)return;
		//标识为移动中
		this.isMove = true;
		//左右移动
		this.moveLeftRight(e.keyCode==37?'left':'right');
		
	},
	//键盘释放事件
	keyup : function(e){
		//标识为非移动中
		this.isMove = false;
		//清除左右移动循环
		clearInterval(this.moveXId);
		//设置玩家为普通状态
		this.dom.className = 'player';
	},
	//左右移动事件
	moveLeftRight : function(direction){
		
		var _this = this;
		//设置玩家为左右移动状态
		this.dom.className = direction;
		//处理移动函数
		var process = function(){
			//玩家死了，清除移动循环ID
			if(!_this.isLive)clearInterval(_this.moveXId);
			//设置玩家的x坐标
			_this.dom.style.left = _this.dom.offsetLeft + (_this.movepx*(direction=='left'?-1:1)) + 'px';
			//右移动中，如果玩家走出右边界，停止移动
			if((_this.dom.offsetLeft >= _this.gamePanel.clientWidth - _this.dom.clientWidth) && direction == 'right'){
				_this.dom.style.left = _this.gamePanel.clientWidth - _this.dom.clientWidth + 'px';
				clearInterval(_this.moveXId);
			}
			//左移动中，如果玩家走出左边界，停止移动
			else if(_this.dom.offsetLeft <= 0 && direction == 'left'){
				_this.dom.style.left = 0 + 'px';
				clearInterval(_this.moveXId);
			}
		}
		//开始移动
		this.moveXId = setInterval(process,this.movesp);
	},
	//向下移动事件
	moveDown : function(){
		
		var _this = this;
		//处理函数
		var process = function(){
			//设置玩家的y坐标
			_this.dom.style.top = _this.dom.offsetTop + _this.movepy + 'px';
			//纵向移动速度加上重力加速度
			_this.movepy += _this.g;
			//如果玩家撞到上下边界，死亡
			if(_this.checkCrash()){
				_this.wasDead();
			}
		}
		//开始移动
		this.moveYId = setInterval(process,this.movesp);
	},
	//向上移动事件//b_movepx移动速度，b_movesp移动频率
	moveUp : function(b_movepx,b_movesp){
		
		var _this = this;
		
		var process = function(){
			
			_this.dom.style.top = _this.dom.offsetTop - b_movepx + 'px';
			if(_this.checkCrash()){
				_this.wasDead();
			}
		}
		this.moveYId = setInterval(process,b_movesp);
	},
	//弹跳事件
	flip : function(){
		//弹跳中，退出
		if(this.isFlip)return;
		//设置弹跳状态为真
		this.isFlip = true;
		//定义弹跳初始速度
		var _this = this,f_movepy = 25;
		//处理函数
		var process = function(){
			//计算弹跳的速度 = 当前速度*弹性系数
			f_movepy *= _this.k;
			//设置玩家的y坐标
			_this.dom.style.top = _this.dom.offsetTop - f_movepy+ 'px';
			//玩家撞到上下边界，死亡 
			if(_this.checkCrash()){
				_this.wasDead();
			}
			//弹跳速度小于1，向下加速运动
			else if(f_movepy < 1){
				_this.isFlip = false;
				_this.movepy = _this.cmovepy;
				_this.moveDown();
			}
			else {
				setTimeout(process,_this.movesp);
			}
		}
		//开始弹跳
		setTimeout(process,this.movesp);
	},
	//判断是否撞到上下边界
	checkCrash : function(){
		if(this.dom.offsetTop >= this.gamePanel.offsetHeight-this.dom.clientHeight || this.dom.offsetTop <= 0){
			return true;
		}
		return false;
	},
	//清除纵向移动
	clearMoveId : function(clearMovepy){
		clearInterval(this.moveYId);
		if(clearMovepy)this.movepy = this.cmovepy;
	},
	//玩家死亡
	wasDead :function(){
		this.clearMoveId();
		this.isLive = false;
		this.gameOver();
		location.reload();
	},
	//外部游戏结束接口
	gameOver : function(){}
}
