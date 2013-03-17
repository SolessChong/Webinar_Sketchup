/*
*	SolessChong
*	www.solesschong.com
*	solesschong@gmail.com
*/

/*

   以下为绘图函数的封装
 * 要求除了canvas之外，关于画图部分不再涉及全局变量。

   画图参数字段如下：
  		obj.x1;
		obj.y1;
		obj.x2;
		obj.y2;
		obj.color;
 */

function drawObject(obj)
{
	console.log('drawaction.js::drawobject()');
	console.log(obj);

	if ( obj.mode == 'rect' ){
		obj.x1;
		obj.y1;
		obj.x2;
		obj.y2;
		obj.color;
	}
	else if (obj.mode == 'fillrect'){

	}
}

function parseAction(objStr){
	e = JSON.parse(objStr);
	clientX = e.clientX;
	clientY = e.clientY;
	xbefore = e.xbefore;
	return e;
}

function encodeAction(ee){
	var e = new Object();
	e.clientX = ee.clientX;
	e.clientY = ee.clientY;
	e.drawmode = drawmode;
	e.xbefore = xbefore;
	e.ybefore = ybefore;
	
	return JSON.stringify(e);
}

// 获取当前状态，封装成绘图事件
function getstate(e){
	rst = new Object();
	rst.clientX = e.clientX;
	rst.clientY = e.clientY;
	rst.xbefore = xbefore;
	rst.ybefore = ybefore;
	rst.drawmode = drawmode;
	rst.isdraw = isdraw;
	return rst;
}

function setstate(e){
	xbefore = e.xbefore;
	ybefore = e.ybefore;
	drawmode = e.drawmode;
	isdraw = e.isdraw;
}

/*
function drawobject(e, send){
	console.log("drawobject");
	console.log(e);

	var canva=document.getElementById("myCanvas");
	ctx=canva.getContext("2d");
	ctx.strokeStyle = colorstroke;
	ctx.fillStyle = colorfill;
	imageData = ctx.getImageData(0,0,width, height);

	setstate(e);

	//startdraw(e);
	draw(e);
	
	if (!send){
		submitFigMsg();
	}
	enddraw();

}




function test(){

	var i = 3;

	e.drawmode = "rect";
	e.xbefore = i * 2 + 90;
	e.ybefore = i * 2 + 90;
	e.clientY = i * 10 + 90;
	e.clientX = i * 10 + 90;
	e.isdraw = true;

	e.drawmode="rect";

	drawobject(e, false);

	submitFigMsg();

}
*/