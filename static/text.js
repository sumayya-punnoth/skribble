
function sendMessage() {
    let messageInput = document.getElementById("messageInput");
    let chatBox = document.getElementById("chatBox");
    
    if (messageInput.value.trim() !== "") {
        let message = document.createElement("div");
        message.classList.add("chat-message");
        message.textContent = messageInput.value;
        chatBox.appendChild(message);
        chatBox.scrollTop = chatBox.scrollHeight;
        messageInput.value = "";
    }
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
