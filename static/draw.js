
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
function showOn() {
	const screen = document.getElementById("screen");
	const cont = screen.getContext("2d");
	var coordinates = [];
	var startcoor = [];
	cont.beginPath();
	cont.lineWidth = 10;
	cont.strokeStyle = "Black";
	cont.lineJoin = "round";
	cont.lineCap = "round";
	websocket.onmessage = function (event) {
		var receivedData = JSON.parse (event.data);
		if (Array.isArray(receivedData) || receivedData === false) {
			if (receivedData !== false) {
				startcoor = receivedData;
				console.log("recieved"+startcoor)

				cont.lineTo(startcoor[0], startcoor[1]);
				cont.stroke();
			}
		}
		else {
			console.log(receivedData)
			printMessage(receivedData);
		}
	}	
}

const websocket = new WebSocket("ws://localhost:8765/");


function sendMessage() {

    let messageInput = document.getElementById("messageInput");
    let chatBox = document.getElementById("chatBox");
    
    if (messageInput.value.trim() !== "") {
        let message = document.createElement("div");

	let messageText = messageInput.value;
	const data = {type: "chat", message: messageText};
	websocket.send(JSON.stringify(data));
        message.classList.add("chat-message");
        message.textContent = messageInput.value;
        chatBox.appendChild(message);
        chatBox.scrollTop = chatBox.scrollHeight;
        messageInput.value = "";
    }
}

function printMessage(receivedData) {
	let chatBox = document.getElementById("chatBox");
        let message = document.createElement("div");
        message.classList.add("chat-message");
        message.textContent = receivedData.message;
        chatBox.appendChild(message);
        chatBox.scrollTop = chatBox.scrollHeight;
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

drawOn();
showOn();
