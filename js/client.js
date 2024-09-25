const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const messageinput = document.getElementById('messageinp');
const messagecontainer = document.querySelector('.container');

var audio = new Audio('notify.wav');
const append =(message,position)=>{
    const messagelement = document .createElement('div');
    messagelement.innerText = message;
    messagelement.classList.add('message')
    messagelement.classList.add(position)
    messagecontainer.append(messagelement)
    if (position == 'left'){

        audio.play();

    }
    

}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageinput.value;
    append(`you:${message}`,'right');

    socket.emit('send',message);
    messageinput.value = ''
})
const name = prompt('enter you name to join:');
socket.emit('new-user-joined',name)

socket.on('user-joined',name =>{
    append(`${name} joined the chat`,'right');
})

socket.on('receive',data =>{
    append(`${data.name} : ${data.message}`,'left');
})

socket.on('left',name =>{
    append(`${name} left the chat`,'right');
})