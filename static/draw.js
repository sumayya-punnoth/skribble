
document.write(8)
function drawOn(){
	const canvas = document.getElementById("canvas");
	const context = canvas.getContext("2d");
	let isDrawing;
	canvas.onmousedown = (e) => {
		isDrawing = true;
		context.beginPath();
		context.lineWidth = 10;
		context.strokeStyle = "Black";
		context.lineJoin = "round";
		context.lineCap = "round";
		context.moveTo(e.clientX, e.clientY);
	};
	
	canvas.onmousemove = (e) => {
		if (isDrawing) {
			context.lineTo(e.clientX, e.clientY);
			context.stroke();
		}
		
	};
	
	canvas.onmouseup = function () {
		isDrawing = false;
		context.closePath();
	};
	document.getElementById('clear').addEventListener('click', () => {
		context.clearRect(0, 0, canvas.width, canvas.height);

});
}

drawOn()
