module.exports = class Channel {
    constructor(id) {
        this.subscribers = [];
        this.id = id;
    }

    addSubscriber(user) {
        if (!this.hasUserAsSubscriber(user)) {
            this.subscribers.push(user);
        }

        if (!user.hasSubscribedToChannel(this)) {
            user.subscribe(this);
        }
    }

    removeSubscriber(user) {
        if (this.hasUserAsSubscriber(user)) {
            this.subscribers.splice(this.findUserIndex(user), 1)
        }

        if (user.hasSubscribedToChannel(this)) {
            user.unsubscribe(this);
        }
    }

    hasUserAsSubscriber(user) {
        return this.subscribers.filter(u => u.id === user.id).length > 0;
    }

    findUserIndex(user) {
        return this.subscribers.indexOf(this.subscribers.filter(u => u.id === user.id)[0]);
    }

    listSubscribers() {
        let list = "";

        for (let s in this.subscribers) {
            if (list === "") {
                list = `${ this.subscribers[s].id }`;
            } else {
                list = `${ list }, ${ this.subscribers[s].id }`;
            }
        }

        return list;
    }
}