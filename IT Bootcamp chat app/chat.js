export class Chatroom {
    constructor(rm, usr) {
        this.room = rm;
        this.username = usr;
        this.chats = db.collection(`chats`);
        this.unsub = false; // dodelili smo false kao signal da je stranica prvi put ucitana
    }

    set room(rm) {
        this._room = rm;
    }
    set username(usr) {
        let usrTrim = usr.trim();
        if (usrTrim.length >= 2 && usrTrim.length <= 10) {
            this._username = usrTrim;
        } else {
            alert(`Please insert valid username`);
        }
    }

    get room() {
        return this._room;
    }
    get username() {
        return this._username;
    }

    updateRoom(ur) {
        this.room = ur;
        if (this.unsub != false) { // pitamo da li je unsub vec bilo pozvano, da li je u getChats vec postalo funkcija
            this.unsub(); // unsub je ovde funkcija i pozivamo je sa ()
        }
    }

    async addChat(msg) {
        let date = new Date();
        let docChat = {
            message: msg,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(date)
        };
        let response = await this.chats.add(docChat);
        return response; //vraća Promise i onda za njega idu .then i .catch
    }

    scrollToBottom(element) {
        element.scrollTop = element.scrollHeight;
    }

    getChats(callback) {                // prati promene u bazi i vraca poruke
        this.unsub = this.chats
            .where(`room`, `==`, this.room)
            .orderBy(`created_at`)
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === `added`) {
                        callback(change.doc)
                    }
                });
                const messageBox = document.getElementById(`messageBox`);
                this.scrollToBottom(messageBox);
            });
    }

    filteredChat(startDate, endDate) {
        return this.chats
            .where(`room`, `==`, this.room)
            .orderBy(`created_at`)
            .get()
            .then(snapshot => {
                let filteredMessages = [];
                snapshot.docs.forEach(doc => {
                    const messageTimestamp = doc.data().created_at.seconds;
                    if (messageTimestamp >= startDate && messageTimestamp <= endDate) {
                        filteredMessages.push(doc);
                    }
                });
                return filteredMessages;
            })
    }

    validateUser(usr) {
        let usrTrim = usr.trim();
        return usrTrim.length >= 2 && usrTrim.length <= 10;
    }
}
