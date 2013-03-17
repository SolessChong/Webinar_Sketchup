
function startdraw(e)
{
	isdraw = true;
	var canva=document.getElementById("myCanvas");
	ctx=canva.getContext("2d");
	ctx.strokeStyle = colorstroke;
	ctx.fillStyle = colorfill;
	imageData = ctx.getImageData(0,0,width, height);
	xbefore=e.clientX -60;
	ybefore=e.clientY -20;
}
function enddraw(e)
{
	draw(e);
	Sender.prototype.submitFigMsg(encodeAction(e));
	isdraw = false;
	xbefore = -1;
	ybefore = -1;
	
}
function draw(e)
{
	if(isdraw == true)
	{
		//¶Ô»æÍ¼ÊÂ¼þ½øÐÐ·â×°ºó·¢ËÍ
		var ee = new Object();
		ee.clientX = e.clientX; ee.clientY = e.clientY;
		ee.xbefore = xbefore; ee.ybefore = ybefore;
		ee.imageData = imageData;
		ee.colorstroke = colorstroke;
		ee.colorfill = colorfill;
		ee.otherside = false;
		ee.ctrlKey = e.ctrlKey;
		if(drawmode == "freeline")
		{
			Sender.prototype.submitFigMsg(encodeAction(e));
			drawfreeline(ee);
		}
		if(drawmode == "rect")
		{
			drawrect(ee);
		}
		if(drawmode == "fillrect")
		{
			drawfillrect(ee);
		}
		if(drawmode == "circle")
		{
			drawcircle(ee);
		}
		if(drawmode == "fillcircle")
		{
			drawfillcircle(ee);
		}
		if(drawmode == "straightline")
		{
			drawstraightline(ee);
		}
	}

}
function drawfreeline(e)
{
	x=e.clientX -60;
	y=e.clientY -20;
	ctx.save();
	ctx.strokeStyle = e.colorstroke;
	ctx.fillStyle = e.colorfill;
	ctx.beginPath();
	if(e.xbefore != -1)
	{
		ctx.moveTo(e.xbefore,e.ybefore);
		ctx.lineTo(x,y);
	}
	if(e.otherside == false)
	{
		//alert("¸üÐÂxbeforeºÍybefore");
		xbefore = x;
		ybefore = y;
	}
	ctx.stroke();
	ctx.restore();
}
function drawrect(e)
{
	var x=e.clientX -60;
	var y=e.clientY -20;
	//ctx.clearRect(0,0,width, height);
	ctx.save();
	ctx.strokeStyle = e.colorstroke;
	ctx.fillStyle = e.colorfill;
	if(e.otherside == false)
		ctx.putImageData(e.imageData, 0, 0,0,0,width,height);
	ctx.beginPath();
	if(e.ctrlKey == true)
	{
		if(Math.abs(x-e.xbefore) > Math.abs(y-e.ybefore))
		{
			if(sgn(x-e.xbefore,y-e.ybefore) == 1)
				x = e.xbefore + y-e.ybefore;
			else
				x = e.xbefore - (y-e.ybefore);
			
		}
		else
		{
			if(sgn(x-e.xbefore,y-e.ybefore) == 1)
				y = e.ybefore + x-e.xbefore;
			else
				y = e.ybefore - (x-e.xbefore);
		}
	}
	if(e.xbefore != -1)
	{
		ctx.strokeRect(e.xbefore,e.ybefore,(x-e.xbefore),(y-e.ybefore));
	}
	ctx.stroke();
	ctx.restore();
}
function drawfillrect(e)
{
	x=e.clientX -60;
	y=e.clientY -20;
	//ctx.clearRect(0,0,width, height);
	ctx.save();
	ctx.strokeStyle = e.colorstroke;
	ctx.fillStyle = e.colorfill;
	if(e.otherside == false)
		ctx.putImageData(e.imageData, 0, 0,0,0,width,height);
	ctx.beginPath();
	if(e.ctrlKey == true)
	{
		if(Math.abs(x-e.xbefore) > Math.abs(y-e.ybefore))
		{
			if(sgn(x-e.xbefore,y-e.ybefore) == 1)
				x = e.xbefore + y-e.ybefore;
			else
				x = e.xbefore - (y-e.ybefore);
			
		}
		else
		{
			if(sgn(x-e.xbefore,y-e.ybefore) == 1)
				y = e.ybefore + x-e.xbefore;
			else
				y = e.ybefore - (x-e.xbefore);
		}
	}
	if(e.xbefore != -1)
	{
		ctx.fillRect(e.xbefore,e.ybefore,(x-e.xbefore),(y-e.ybefore));
		ctx.strokeRect(e.xbefore,e.ybefore,(x-e.xbefore),(y-e.ybefore));
	}
	ctx.fill();
	ctx.stroke();
	ctx.restore();
}
function sgn(number1,number2)
{
	if(number1*number2 >=0)
		return 1;
	else
		return -1;
}
function drawcircle(e)
{
	x=e.clientX -60;
	y=e.clientY -20;
	ctx.save();
	ctx.strokeStyle = e.colorstroke;
	ctx.fillStyle = e.colorfill;
	if(e.otherside == false)
		ctx.putImageData(e.imageData, 0, 0,0,0,width,height);
	ctx.beginPath();
	var radius;
	if(e.ctrlKey == true)
	{
		if(Math.abs(x-e.xbefore) > Math.abs(y-e.ybefore))
		{
			if(sgn(x-e.xbefore,y-e.ybefore) == 1)
				x = e.xbefore + y-e.ybefore;
			else
				x = e.xbefore - (y-e.ybefore);
			ctx.translate((x+e.xbefore)/2,(y+e.ybefore)/2);
			radius = Math.abs(y-e.ybefore)/2;
		}
		else
		{
			if(sgn(x-e.xbefore,y-e.ybefore) == 1)
				y = e.ybefore + x-e.xbefore;
			else
				y = e.ybefore - (x-e.xbefore);
			
			ctx.translate((x+e.xbefore)/2,(y+e.ybefore)/2);
			radius = Math.abs(x-e.xbefore)/2;
		}
	}
	else
	{
		ctx.translate((x+e.xbefore)/2,(y+e.ybefore)/2);
		ctx.scale(1.0,Math.abs((y-e.ybefore)/(x-e.xbefore)));
		radius = Math.abs(x-e.xbefore)/2;
	}
	if(e.xbefore != -1)
	{
		ctx.arc(0,0,Math.abs(x-e.xbefore)/2,0,2*Math.PI,true);
	}
	ctx.stroke();
	ctx.restore();
}
function drawfillcircle(e)
{
	x=e.clientX -60;
	y=e.clientY -20;
	ctx.save();
	ctx.strokeStyle = e.colorstroke;
	ctx.fillStyle = e.colorfill;
	if(e.otherside == false)
		ctx.putImageData(e.imageData, 0, 0,0,0,width,height);
	ctx.beginPath();
	
	var radius;
	if(e.ctrlKey == true)
	{
		if(Math.abs(x-e.xbefore) > Math.abs(y-e.ybefore))
		{
			if(sgn(x-e.xbefore,y-e.ybefore) == 1)
				x = e.xbefore + y-e.ybefore;
			else
				x = e.xbefore - (y-e.ybefore);
			ctx.translate((x+e.xbefore)/2,(y+e.ybefore)/2);
			radius = Math.abs(y-e.ybefore)/2;
		}
		else
		{
			if(sgn(x-e.xbefore,y-e.ybefore) == 1)
				y = e.ybefore + x-e.xbefore;
			else
				y = e.ybefore - (x-e.xbefore);
			
			ctx.translate((x+e.xbefore)/2,(y+e.ybefore)/2);
			radius = Math.abs(x-e.xbefore)/2;
		}
	}
	else
	{
		ctx.translate((x+e.xbefore)/2,(y+e.ybefore)/2);
		ctx.scale(1.0,Math.abs((y-e.ybefore)/(x-e.xbefore)));
		radius = Math.abs(x-e.xbefore)/2;
	}
	if(e.xbefore != -1)
	{
		ctx.arc(0,0,radius,0,2*Math.PI,true);
	}
	ctx.fill();
	ctx.stroke();
	ctx.restore();
}
function drawcolornow(e)
{
	var canva=document.getElementById("color_state");
	ctx=canva.getContext("2d");
	ctx.beginPath();
	ctx.fillStyle = colorstroke;
	ctx.moveTo(0,0);
	ctx.lineTo(45,0);
	ctx.lineTo(0,45);
	ctx.fill();
	ctx.beginPath();
	ctx.fillStyle = colorfill;
	ctx.moveTo(46,46);
	ctx.lineTo(46,1);
	ctx.lineTo(1,46);
	ctx.fill();
}
function drawstraightline(e)
{
	x=e.clientX -60;
	y=e.clientY -20;
	if(e.otherside == false)
		ctx.putImageData(e.imageData, 0, 0,0,0,width,height);
	ctx.beginPath();
	if(e.ctrlKey == true)
	{
		if(Math.abs(x-e.xbefore) > Math.abs(y-e.ybefore))
		{
			y = e.ybefore;
		}
		else
		{
			x = e.xbefore;
		}
	}
	if(e.xbefore != -1)
	{
		ctx.moveTo(e.xbefore,e.ybefore);
		ctx.lineTo(x,y);
	}
	ctx.stroke();
}

function cleancanvas()
{
	//Sender.prototype.submitFigMsg();
	ctx.clearRect(0,0,10000,10000);
}