import { Chatroom } from "./chat.js";
import { ChatUI } from "./ui.js";

let divMessagebox = document.getElementById(`messageBox`);
let formMsg = document.getElementById(`formMsg`);
let formUsername = document.getElementById(`formUsername`);
let btnFilterM = document.getElementById(`btnFilterM`);
let btnFilterW = document.getElementById(`btnFilterW`);
let pCurrentUser = document.getElementById(`currentUser`);
let textarea = document.getElementById(`message`);
let btnSend = document.getElementById(`btnSend`);
let color = document.getElementById(`color`);
let btnUpdate = document.getElementById(`btnUpdate`);
let navigation = document.getElementById(`navigation`);

let chatMessages = new ChatUI(divMessagebox);

pCurrentUser.innerHTML = `${localStorage.username}:`;

const pCurrentUserColor = () => {
    if (localStorage[`user_${localStorage.username}`]) {
        pCurrentUser.style.backgroundColor = localStorage[`user_${localStorage.username}`];
    } else {
        pCurrentUser.style.backgroundColor = `#e4f0ff`;
    }
}

let username = `anonymous`;
if (localStorage.username) {
    username = localStorage.username
    pCurrentUserColor();
} else {
    localStorage.setItem(`username`, `anonymous`)
    pCurrentUser.innerHTML = `${username}:`;
    localStorage.setItem(`current_room`, `general`)
    pCurrentUser.style.backgroundColor = `#e4f0ff`;
    color.value = `#e4f0ff`;
}

navigation.addEventListener(`click`, e => {
    if (e.target.tagName === `LI`) {
        chatMessages.clearChat();
        localStorage.setItem(`current_room`, e.target.id);
        chatroom.updateRoom(e.target.id);
        let nav = document.querySelectorAll("#navigation li");
        nav.forEach(li => {
            li.style.backgroundColor = `#e7e7e7`;
            li.style.fontWeight = `400`;
        })
        let currentRoom = document.getElementById(localStorage.current_room);
        currentRoom.style.backgroundColor = `#ff9803`;
        currentRoom.style.fontWeight = `600`;
        chatroom.getChats(callback => {          //ispis svih doc (poruka) na stranici
            chatMessages.msgTemplate(callback);
        });
    }
})

let chatroom = new Chatroom(localStorage.current_room, username);
chatroom.getChats(callback => {
    chatMessages.msgTemplate(callback);
});

let currentRoom = document.getElementById(localStorage.current_room);
currentRoom.style.backgroundColor = `#ff9803`;
currentRoom.style.fontWeight = `600`;



const setColor = () => {
    let messages = Array.from(document.querySelectorAll(`.divMsg`));
    messages.forEach(message => {
        let user = message.children.item(0).innerHTML.trim();
        user === localStorage.username
            ? message.style.backgroundColor = document.getElementById(`color`).value
            : message.style.backgroundColor = `#e4f0ff;`;
    })
}

const leftyRighty = () => {
        let messages = Array.from(document.querySelectorAll(`.divMsg`));
        messages.forEach(message => {
            let user = message.children.item(0).innerHTML.trim();
            if (user === localStorage.username) {
                message.classList.add(`userMe`)
                message.classList.remove(`recieved`);
            } else {
                message.classList.remove(`userMe`);
                message.classList.add(`recieved`);
            }
        })
}

let colorPicker = document.getElementById(`color`);
colorPicker.addEventListener(`change`, () => {
    let colorValue = document.getElementById(`color`).value;
    localStorage.setItem(`user_${localStorage.username}`, colorValue);
    localStorage.setItem(`last_color`, colorValue);
    setTimeout(() => {
        setColor();
        pCurrentUserColor();
    }, 500)
})

btnFilterM.addEventListener(`click`, async (e) => {
    e.preventDefault();
    chatMessages.clearChat();
    let startDateValue = document.getElementById(`inputStartDateM`).value;
    let endDateValue = document.getElementById(`inputEndDateM`).value;
    startDateValue = new Date(startDateValue);
    startDateValue = firebase.firestore.Timestamp.fromDate(startDateValue).seconds;
    endDateValue = new Date(endDateValue);
    endDateValue = firebase.firestore.Timestamp.fromDate(endDateValue).seconds;
    const filteredMessages = await chatroom.filteredChat(startDateValue, endDateValue);
    filteredMessages.forEach(message => chatMessages.msgTemplate(message))
})
btnFilterW.addEventListener(`click`, async (e) => {  // srediti filter za widescreen wiev. Popraviti input polja values
    e.preventDefault();
    chatMessages.clearChat();
    let startDateValue = document.getElementById(`inputStartDateW`).value;
    let endDateValue = document.getElementById(`inputEndDateW`).value;
    startDateValue = new Date(startDateValue);
    startDateValue = firebase.firestore.Timestamp.fromDate(startDateValue).seconds;
    endDateValue = new Date(endDateValue);
    endDateValue = firebase.firestore.Timestamp.fromDate(endDateValue).seconds;
    const filteredMessages = await chatroom.filteredChat(startDateValue, endDateValue);
    filteredMessages.forEach(message => chatMessages.msgTemplate(message))
})

btnSend.addEventListener(`click`, e => {
    e.preventDefault();
    pCurrentUserColor();
    let msgValue = document.getElementById(`message`).value;
    if (msgValue.trim().length === 0){
        alert(`Please insert message!`)
    } else {
        chatroom.addChat(msgValue) // dodaje novi doc sa porukom iz parametra
            .then(() => {
                formMsg.reset();
                btnSend.disabled = true;
                setTimeout(() => {
                    btnSend.disabled = false;
                }, 500)
            })
            .catch(err => {
                console.log(`Greska: ${err}.`)
            });
    }
})

textarea.addEventListener(`keyup`, (e) => {
    if (e.keyCode === 13) {
        let msgValue = document.getElementById(`message`).value;
        if (msgValue.trim().length === 0){
            alert(`Please insert message!`)
        } else {
            chatroom.addChat(msgValue) // dodaje novi doc sa porukom iz parametra
                .then(() => {
                    formMsg.reset();
                    textarea.disabled = true;
                    setTimeout(() => {
                        textarea.disabled = false;
                    }, 500)
                })
                .catch(err => {
                    console.log(`Greska: ${err}.`)
                });
        }
    }
})

btnUpdate.addEventListener(`click`, e => {
    e.preventDefault();
    let usernameValue = document.getElementById(`username`).value;
    if (chatroom.validateUser(usernameValue)){
        chatroom.username = usernameValue;
        let userUpdated = document.getElementById(`userUpdated`);
        formUsername.reset();
        userUpdated.innerHTML = `<p>Username changed to <span>${usernameValue}</span></p>`;
        userUpdated.style.display = `block`;
        setTimeout(() => {
            userUpdated.style.display = `none`;
        }, 3000)
        localStorage.setItem(`username`, usernameValue);
        pCurrentUser.innerHTML = `${localStorage.username}:`
        pCurrentUserColor();
        leftyRighty();
    } else {
        alert(`Username should have between 2 and 10 characters. Please insert valid username!`);
        formUsername.reset();
    }
});

divMessagebox.addEventListener(`click`, e => {
    if (e.target.tagName === `I`) {
        let divName = e.target.parentElement.parentElement.parentElement.firstElementChild.innerHTML.trim();
        let id = e.target.parentElement.parentElement.parentElement.id;
        console.log(divName)
        if (localStorage.username === divName) {
            if (confirm("Delete this message?") == true) {
            db.collection(`chats`)
                .doc(id)
                .delete()
                .then()
                .catch(err => {
                    alert(`Error, message could not be deleted.`)
                });
            e.target.parentElement.parentElement.parentElement.remove();
            }
        } else {
            e.target.parentElement.parentElement.parentElement.remove();
        }
    }
})