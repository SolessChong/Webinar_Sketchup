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
	
	var canva=document.getElementById("myCanvas");
	ctx=canva.getContext("2d");
	ctx.save();
	ctx.strokeStyle = obj.colorstroke;
	ctx.fillStyle = obj.colorfill;

	console.log('drawaction.js::drawobject()');
	console.log(obj);

	if(obj.drawmode == "freeline")
	{
		drawfreeline(obj);
	}
	if(obj.drawmode == "rect")
	{
		drawrect(obj);
	}
	if(obj.drawmode == "fillrect")
	{
		drawfillrect(obj);
	}
	if(obj.drawmode == "circle")
	{
		drawcircle(obj);
	}
	if(obj.drawmode == "fillcircle")
	{
		drawfillcircle(obj);
	}
	if(obj.drawmode == "straightline")
	{
		drawstraightline(obj);
	}

	ctx.restore();
}

function parseAction(objStr){
	e = JSON.parse(objStr);
	clientX = e.clientX;
	clientY = e.clientY;
	xbefore = e.xbefore;
	return e;
}

function encodeAction(e){
	
	var ee = new Object();
		
	ee.clientX = e.clientX; 
	ee.clientY = e.clientY;
	ee.xbefore = xbefore; 
	ee.ybefore = ybefore;
	//ee.imageData = imageData;
	
	ee.colorstroke = colorstroke;
	ee.colorfill = colorfill;
	ee.othreside = true;
	ee.drawmode = drawmode;
	ee.ctrlKey = e.ctrlKey;
	ee.kind = "fig";
	
	return ee;
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