
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
	isdraw = false;
	xbefore = -1;
	ybefore = -1;

	Sender.prototype.submitFigMsg(getstate(e));
}
function draw(e)
{

	//console.log(getState(e));

	if(isdraw == true)
	{
		if(drawmode == "freeline")
		{
			drawfreeline(e);
		}
		if(drawmode == "rect")
		{
			drawrect(e);
		}
		if(drawmode == "fillrect")
		{
			drawfillrect(e);
		}
		if(drawmode == "circle")
		{
			drawcircle(e);
		}
		if(drawmode == "fillcircle")
		{
			drawfillcircle(e);
		}
	}

	

}
function drawfreeline(e)
{

	x=e.clientX -60;
	y=e.clientY -20;
	ctx.beginPath();
	if(xbefore != -1)
	{
		ctx.moveTo(xbefore,ybefore);
		ctx.lineTo(x,y);
	}

	xbefore = x;
	ybefore = y;
	ctx.stroke();
}
function drawrect(e)
{
	x=e.clientX -60;
	y=e.clientY -20;
	//ctx.clearRect(0,0,width, height);
	ctx.putImageData(imageData, 0, 0,0,0,width,height);
	ctx.beginPath();
	if(e.ctrlKey == true)
	{
		if(Math.abs(x-xbefore) > Math.abs(y-ybefore))
		{
			if(sgn(x-xbefore,y-ybefore) == 1)
				x = xbefore + y-ybefore;
			else
				x = xbefore - (y-ybefore);
			
		}
		else
		{
			if(sgn(x-xbefore,y-ybefore) == 1)
				y = ybefore + x-xbefore;
			else
				y = ybefore - (x-xbefore);
		}
	}
	if(xbefore != -1)
	{
		ctx.strokeRect(xbefore,ybefore,(x-xbefore),(y-ybefore));
	}
	ctx.stroke();
}
function drawfillrect(e)
{
	x=e.clientX -60;
	y=e.clientY -20;
	//ctx.clearRect(0,0,width, height);
	ctx.putImageData(imageData, 0, 0,0,0,width,height);
	ctx.beginPath();
	if(e.ctrlKey == true)
	{
		if(Math.abs(x-xbefore) > Math.abs(y-ybefore))
		{
			if(sgn(x-xbefore,y-ybefore) == 1)
				x = xbefore + y-ybefore;
			else
				x = xbefore - (y-ybefore);
			
		}
		else
		{
			if(sgn(x-xbefore,y-ybefore) == 1)
				y = ybefore + x-xbefore;
			else
				y = ybefore - (x-xbefore);
		}
	}
	if(xbefore != -1)
	{
		ctx.fillRect(xbefore,ybefore,(x-xbefore),(y-ybefore));
		ctx.strokeRect(xbefore,ybefore,(x-xbefore),(y-ybefore));
	}
	ctx.fill();
	ctx.stroke();
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
	ctx.putImageData(imageData, 0, 0,0,0,width,height);
	ctx.beginPath();
	var radius;
	if(e.ctrlKey == true)
	{
		if(Math.abs(x-xbefore) > Math.abs(y-ybefore))
		{
			if(sgn(x-xbefore,y-ybefore) == 1)
				x = xbefore + y-ybefore;
			else
				x = xbefore - (y-ybefore);
			ctx.translate((x+xbefore)/2,(y+ybefore)/2);
			radius = Math.abs(y-ybefore)/2;
		}
		else
		{
			if(sgn(x-xbefore,y-ybefore) == 1)
				y = ybefore + x-xbefore;
			else
				y = ybefore - (x-xbefore);
			
			ctx.translate((x+xbefore)/2,(y+ybefore)/2);
			radius = Math.abs(x-xbefore)/2;
		}
	}
	else
	{
		ctx.translate((x+xbefore)/2,(y+ybefore)/2);
		ctx.scale(1.0,Math.abs((y-ybefore)/(x-xbefore)));
		radius = Math.abs(x-xbefore)/2;
	}
	if(xbefore != -1)
	{
		ctx.arc(0,0,Math.abs(x-xbefore)/2,0,2*Math.PI,true);
	}
	ctx.stroke();
	ctx.restore();
}
function drawfillcircle(e)
{
	x=e.clientX -60;
	y=e.clientY -20;
	ctx.save();
	ctx.putImageData(imageData, 0, 0,0,0,width,height);
	ctx.beginPath();
	
	var radius;
	if(e.ctrlKey == true)
	{
		if(Math.abs(x-xbefore) > Math.abs(y-ybefore))
		{
			if(sgn(x-xbefore,y-ybefore) == 1)
				x = xbefore + y-ybefore;
			else
				x = xbefore - (y-ybefore);
			ctx.translate((x+xbefore)/2,(y+ybefore)/2);
			radius = Math.abs(y-ybefore)/2;
		}
		else
		{
			if(sgn(x-xbefore,y-ybefore) == 1)
				y = ybefore + x-xbefore;
			else
				y = ybefore - (x-xbefore);
			
			ctx.translate((x+xbefore)/2,(y+ybefore)/2);
			radius = Math.abs(x-xbefore)/2;
		}
	}
	else
	{
		ctx.translate((x+xbefore)/2,(y+ybefore)/2);
		ctx.scale(1.0,Math.abs((y-ybefore)/(x-xbefore)));
		radius = Math.abs(x-xbefore)/2;
	}
	if(xbefore != -1)
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
