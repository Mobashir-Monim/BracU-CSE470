module.exports = class User {
    constructor(id) {
        this.subscriptions = [];
        this.id = id;
    }

    subscribe(channel) {
        if (!this.hasSubscribedToChannel(channel)) {
            this.subscriptions.push(channel);
        }

        if (!channel.hasUserAsSubscriber(this)) {
            channel.addSubscriber(this);
        }
    }

    unsubscribe(channel) {
        if (this.hasSubscribedToChannel(channel)) {
            this.subscriptions.splice(this.findChannelIndex(channel), 1);
        }

        if (!channel.hasUserAsSubscriber(this)) {
            channel.removeSubscriber(this);
        }
    }

    hasSubscribedToChannel(channel) {
        return this.subscriptions.filter(s => s.id === channel.id).length > 0;
    }

    findChannelIndex(channel) {
        return this.subscriptions.indexOf(this.subscriptions.filter(s => s.id === channel.id)[0]);
    }

    listSubscriptions() {
        let list = "";

        for (let s in this.subscriptions) {
            if (list === "") {
                list = `${ this.subscriptions[s].id }`;
            } else {
                list = `${ list }, ${ this.subscriptions[s].id }`;
            }
        }

        return list;
    }
}