function changeblack(e)
{
	if(e.altKey == false)//û�а�alt
		colorstroke = "black";
	if(e.altKey == true)//������alt
		colorfill = "black";
	drawcolornow();
}
function changeorange(e)
{
	if(e.altKey == false)//û�а�alt
		colorstroke = "orange";
	if(e.altKey == true)//������alt
		colorfill = "orange";
	drawcolornow();
}
function changewhite(e)
{
	if(e.altKey == false)//û�а�alt
		colorstroke = "white";
	if(e.altKey == true)//������alt
		colorfill = "white";
	drawcolornow();
}
function changeblue(e)
{
	if(e.altKey == false)//û�а�alt
		colorstroke = "blue";
	if(e.altKey == true)//������alt
		colorfill = "blue";
	drawcolornow();
}
function changegreen(e)
{
	if(e.altKey == false)//û�а�alt
		colorstroke = "green";
	if(e.altKey == true)//������alt
		colorfill = "green";
	drawcolornow();
}
function changeyellow(e)
{
	if(e.altKey == false)//û�а�alt
		colorstroke = "yellow";
	if(e.altKey == true)//������alt
		colorfill = "yellow";
	drawcolornow();
}
function changefreeline(e)
{
	drawmode = "freeline";
}
function changerect(e)
{
	drawmode = "rect";
}
function changefillrect(e)
{
	drawmode = "fillrect";
}
function changecircle(e)
{
	drawmode = "circle";
}
function changefillcircle(e)
{
	drawmode = "fillcircle";
}
function changestraightline(e)
{
	drawmode = "straightline";
}