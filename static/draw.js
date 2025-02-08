
document.write(8)
var isDrawing=false;
function drawOn(){
	const canvas = document.getElementById("canvas");
	const context = canvas.getContext("2d");
	var startarr = [];
	var endarr = [];
	canvas.onmousedown = (e) => {
		isDrawing = true;
		context.beginPath();
		context.lineWidth = 10;
		context.strokeStyle = "Black";
		context.lineJoin = "round";
		context.lineCap = "round";
		context.moveTo(e.offsetX, e.offsetY);
		startarr[0] = e.offsetX;
		startarr[1] = e.offsetY;
		websocket.send(JSON.stringify(startarr));
	};
	
	canvas.onmousemove = (e) => {
		if (isDrawing) {
			context.lineTo(e.offsetX, e.offsetY);
			endarr[0] = e.offsetX;
			endarr[1] = e.offsetY;
			websocket.send(JSON.stringify(endarr));
			context.stroke();
		}
	};
	
	canvas.onmouseup = function () {
		isDrawing = false;
		context.closePath();
		websocket.send(JSON.stringify(isDrawing));
	};

}
console.log(isDrawing);
function showOn() {
	const screen = document.getElementById("screen");
	const cont = screen.getContext("2d");
	document.write(4);
	var coordinates = [];
	var startcoor = [];
	document.write(3);
	cont.beginPath();
	cont.lineWidth = 10;
	cont.strokeStyle = "Black";
	cont.lineJoin = "round";
	cont.lineCap = "round";
	websocket.onmessage = function (event) {
		startcoor = JSON.parse (event.data);
		console.log("recieved"+startcoor)

		cont.lineTo(startcoor[0], startcoor[1]);
		cont.stroke();
	}
	document.write(4);
	/*websocket.onmessage = function (event) {
		var hi = JSON.parse (event.data);
		console.log(hi)
	}*/
	//websocket.send(JSON.stringify(startcoor));
	document.write(2);

	/*else {
		cont.closePath();
	}*/
}

/*function start () {
	drawOn();
	showOn();
}*/
const websocket = new WebSocket("ws://192.168.10.169:8765/");

drawOn();
showOn();
