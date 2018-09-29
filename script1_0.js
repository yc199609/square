//纯手写源码,谢绝抄袭
//别想了，网上没有源码的
//定义画布
var watermark=document.createElement('canvas');
var cbb = watermark.getContext('2d');
var canvas = document.getElementById('canvas');
var cxc = canvas.getContext('2d');
canvas.width = 200;
canvas.height = 300;
watermark.width = 80;
watermark.height = 80;
cbb.font = 'bold 20px Arial';cbb.linewidth = '2';cbb.fillStyle = 'rgba(0,4,255,0.8)';cbb.textBaseline = 'middle';cbb.fillText('yc',0,20);
// 用于深拷贝的函数
var objDeepCopy = function (source) {
    var sourceCopy = source instanceof Array ? [] : {};
    for (var item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
    }
    return sourceCopy;
}
//___________________________________定义背景_______________________________________________
// 将渲染包装成函数
function render(){
	cxc.clearRect(0,0,canvas.width,canvas.height)
	cxc.save()
	cxc.fillStyle = 'gray';
	for(var i=0;i<data.length;i++){
		for (var j=0;j<data[i].length;j++){
			if(data[i][j]==0){
				cxc.fillRect(j*20,i*20,18,18);
			}
		}
	}
	cxc.restore()

	cxc.save()
	cxc.fillStyle = 'yellow';
	for(var i=0;i<data.length;i++){
		for (var j=0;j<data[i].length;j++){
			if(data[i][j]==1){
				cxc.fillRect(j*20,i*20,18,18);
			}
		}
	}
	cxc.restore()
	cxc.drawImage(watermark,canvas.width-watermark.width,canvas.height-watermark.height);
}



//______________________________定义背景________________
var x=0;
var y=0;
var time;    //既是计时器的名称，同时可以作为一个标记
var gameover;
function tryone(square){
	time = setInterval(function(){
		for(var n = 0;n<square[style].b.length;n++){
			// game over
			if(data[square[style].b[n]+x][square[style].r[n]+y]==1){
				clearInterval(time);
				gameover = true;
				alert('胜败乃兵家常事，大侠请重头再来');
				break;
			}
			// 没game over 生成新的方块
			data[square[style].b[n]+x][square[style].r[n]+y]=1;
		}
		// 阻止继续向下执行 alert
		if(gameover){
			return;
		}
		render()
		// 画完

		// 判断是否到达了底部
		for(var n = 0;n<square[style].b.length;n++){
			if(square[style].b[n]+x>=14){
				// 判定是否清行
				for(var q =0;q<data.length;q++){
				 	for (var p=0;p<data[q].length;p++){
				 		if(data[q][p]==0){
				 			break;
				 		}
				 		if(p>=data[q].length-1){
				 			data.splice(q,1);
				 			data.unshift([[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]]);
				 		}
				 	}
				}

				x=0;
				y=0;
				clearInterval(time);
				time=null;
				return;
			}
		}
		// 判定是否触摸到下面方块的函数
		var isdown=tauchdown(square,style);
		if(isdown){
			// 判定是否清行
			for(var q =0;q<data.length;q++){
			 	for (var p=0;p<data[q].length;p++){
			 		if(data[q][p]==0){
			 			break;
			 		}
			 		if(p>=data[q].length-1){
			 			data.splice(q,1);
			 			data.unshift([[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]]);
			 		}
			 	}
			}
			x=0;
			y=0;
			clearInterval(time);
			time=null;
			return;
		}
		// 将上半秒的格子的数据在data上清空
		for(var n = 0;n<square[style].b.length;n++){
			data[square[style].b[n]+x][square[style].r[n]+y]=0;
		}
		x++;
	},500)
}
render();
var square=j; //设置第一个出现的方块
var style = 0; //默认的形状
tryone(square);
var arr = [z,i,j,o,t,l];
setInterval(function(){
	if(time==null){
		var random = Math.floor(Math.random()*6);
		style=0;
		square = arr[random];
		tryone(square);
	}
},100)

//_______________________________3个判定函数________________________________
// 判定是否触摸到下面方块的函数
function tauchdown(square,style){
	var isstoparr=[]
	isstoparr.push([square[style].b[0]+x,square[style].r[0]+y]);
	for (var n=0;n<square[style].r.length;n++){
		for(var m=0;m<isstoparr.length;m++){
			if(square[style].r[n]+y==isstoparr[m][1]){
				if(square[style].b[n]+x>=isstoparr[m][0]){
					isstoparr[m][0]=square[style].b[n]+x;
				}
				break;
			}
			if(m>=isstoparr.length-1){
				isstoparr.push([square[style].b[n]+x,square[style].r[n]+y]);
			}
		}
	}

	// 判断是否触到了之前的方格
	for(var n =0;n<isstoparr.length;n++){
		if(data[isstoparr[n][0]+1][isstoparr[n][1]]==1){
			return true;
		}
	}
}
//判断是否触摸到了左边的方块
function tauchleft(square,style){
	var isstoparr=[]
	isstoparr.push([square[style].b[0]+x,square[style].r[0]+y]);
	for (var n=0;n<square[style].b.length;n++){
		for(var m=0;m<isstoparr.length;m++){
			if(square[style].b[n]+x==isstoparr[m][0]){

				
				if(square[style].r[n]+y<=isstoparr[m][1]){
					isstoparr[m][1]=square[style].r[n]+y;
				}
				break;
			}
			if(m>=isstoparr.length-1){
				isstoparr.push([square[style].b[n]+x,square[style].r[n]+y]);
			}
		}
	}
	for(var n = 0;n<isstoparr.length;n++){
		if(isstoparr[n][1]==0){
			return true;
		}
	}
	// 判断是否触到了之前的方格
	for(var n =0;n<isstoparr.length;n++){
		if(data[isstoparr[n][0]][isstoparr[n][1]-1]==1){
			return true;
		}
	}
}
// 判断是否触到了右边的方块
function tauchright(square,style){
	var isstoparr=[]
	isstoparr.push([square[style].b[0]+x,square[style].r[0]+y]);
	for (var n=0;n<square[style].b.length;n++){
		for(var m=0;m<isstoparr.length;m++){
			if(square[style].b[n]+x==isstoparr[m][0]){

				
				if(square[style].r[n]+y>=isstoparr[m][1]){
					isstoparr[m][1]=square[style].r[n]+y;
				}
				break;
			}
			if(m>=isstoparr.length-1){
				isstoparr.push([square[style].b[n]+x,square[style].r[n]+y]);
			}
		}
	}
	for(var n = 0;n<isstoparr.length;n++){
		if(isstoparr[n][1]==9){
			return true;
		}
	}
	// 判断是否触到了之前的方格
	for(var n =0;n<isstoparr.length;n++){
		if(data[isstoparr[n][0]][isstoparr[n][1]+1]==1){
			return true;
		}
	}
}
//_____________________________________________________
// ____________________键盘事件______________________
document.onkeydown = function(e){
	switch (e.keyCode){
		case 37:
		//这是左
			if(!tauchleft(square,style)){
				y--;
			}
		break;
		case 38:
		//这是上
			style++;
			if(style==square.length){
				style=0
			}
			// 判断改变形状后的方块否占用了之前方块的位置，以及是否超出了游戏空间
			for(var n = 0;n<square[style].b.length;n++){
				if(data[square[style].b[n]+x][square[style].r[n]+y]==1||square[style].r[n]+y<0||square[style].r[n]+y>9){
					style--;
					if(style<0){
						style =square.length-1;
					}
					break;
				}
			}
		break;
		case 39:
		//这是右
			if(!tauchright(square,style)){
				y++;
			}
		break;
		case 89:
		for(var n = 0;n<data.length;n++){
			for(var b=0;b<data[n].length;b++){
				data[n][b]=0;
			}
		};
			x=0;
			y=0;
		break;
	}
}
