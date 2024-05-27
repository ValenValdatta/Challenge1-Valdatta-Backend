const socket = io()

let nickname = ""
let allMessages = []

Swal.fire({
    title: "Write your nickname",
    input: "text",
    allowOutsideClick: false,
    inputValidator: value => !value && "Please write a nickname"
}).then(data => {
    nickname = data.value;
    document.querySelector("#nickname").innerHTML = nickname
    socket.emit("nickname", nickname);
})

socket.on("messages", messages => {
    allMessages = messages
    document.querySelector("#allMessages").innerHTML = messages.map(each => `<p>${each}</p>`).join("")
})

document.querySelector("#message").addEventListener("keyup", event => {
    if (event.key == "Enter"){
        const message = `<span class="fw-bold">${nickname}:</span> ${event.target.value}`
        allMessages.push(message)
        socket.emit("all messages", allMessages)
        event.target.value = ""
    }
})