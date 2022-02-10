export class ChatUI {
    constructor(parent) {
        this.parentDiv = parent;
    }

    set parentDiv(parent) {
        this._parentDiv = parent;
    }

    get parentDiv() {
        return this._parentDiv;
    }

    formatDate(date) {
        let d = date.getDate();
        let m = date.getMonth() +1;

        let day = String(d).padStart(2, `0`);
        let month = String(m).padStart(2, `0`);
        let year = date.getFullYear();
        let hours = String(date.getHours()).padStart(2, `0`);
        let mins = String(date.getMinutes()).padStart(2, `0`);

        let today = new Date();
        let todayDay = today.getDate();
        let todayMonth = today.getMonth() + 1;

        if (d+1 === todayDay && m === todayMonth) {
            return `Yesterday ${hours}:${mins}`
        } else if (d === todayDay && m === todayMonth) {
            return `${hours}:${mins}`;
        } else {
            return `${day}.${month}.${year}. ${hours}:${mins}`
        }
    }

    msgTemplate(doc) {
        let localUser = localStorage.username;
        let currentUser = doc.data().username;
        let userColorKey = `user_${currentUser}`;
        let userColor = localStorage[userColorKey];
        let messageClass = localUser === currentUser
            ? `divMsg shadow-sm userMe`
            : `divMsg shadow-sm recieved`;
        let date = doc.data().created_at.toDate();
            let divMsgField =
                userColor
                    ? `<div style="background-color: ${userColor}" class="${messageClass}" id="${doc.id}">
                        <div class="pUser">
                            ${doc.data().username}
                        </div>
                        <div class="pMessage">
                            ${doc.data().message} 
                        </div>
                        <div class="pTime"">
                            <span class="msgDate">${this.formatDate(date)}</span>
                            <span class="trashDelete"><i class="bi bi-trash"></i></span>
                        </div>             
                        </div>`
                    : `<div class="${messageClass}" id="${doc.id}">
                        <div class="pUser">
                            ${doc.data().username}
                        </div>
                        <div class="pMessage">
                            ${doc.data().message} 
                        </div>
                        <div class="pTime"">
                            <span class="msgDate">${this.formatDate(date)}</span>
                            <span class="trashDelete"><i class="bi bi-trash"></i></span>
                        </div>             
                        </div>`
        this.parentDiv.innerHTML += divMsgField;
    }

    clearChat() {
        this.parentDiv.innerHTML = ``;
    }
}