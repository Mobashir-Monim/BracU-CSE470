const Channel = require('./Channel');
const User = require('./User');
const prompt = require('prompt-sync')({signint: true});

let channels = [];
let users = [];
let lastChannelID = 0;
let lastUserID = 0;
let inputLoop = true;

// Creating random number of channels
while (true) {
    channels.push(new Channel(lastChannelID));
    lastChannelID += 1;

    if (Math.random() < 0.1) {
        break;
    }
}

// Creating random number of users
while (true) {
    users.push(new User(lastUserID));
    lastUserID += 1;

    if (Math.random() < 0.01) {
        break;
    }
}

const takeSubInput = () => {
    let inp = prompt("Command: ");

    if (inp === null) {
        inputLoop = false;
    } else if (inp === "List channels") {
        console.log(listChannel());
    } else if (inp === "List users") {
        console.log(listUsers());
    } else {
        processInput(inp);
    }
}

const processInput = inp => {
    inp = inp.split(" ");
        
    if (inputIsProcessable(inp)) {
        let [user, channel] = [null, null];
        switch (inp[1]) {
            case "adds":
                [channel, user] = findChannelAndUser(inp[0], inp[2]);
                channelAddsUser(channel, user);
                break;
            case "removes":
                [channel, user] = findChannelAndUser(inp[0], inp[2]);
                channelRemovesUser(channel, user);
                break;
            case "subscribes":
                [channel, user] = findChannelAndUser(inp[2], inp[0]);
                userSubscribesToChannel(channel, user);
                break;
            case "unsubscribes":
                [channel, user] = findChannelAndUser(inp[2], inp[0]);
                userUnsubscribesFromChannel(channel, user);
                break;
            default:
                console.log(inp[1]);
                break;
        }

        printUserAndChanneldetails(channel, user); 
    }
}

const printUserAndChanneldetails = (channel, user) => {
    console.log(`User subscriptions: ${ user.listSubscriptions() }`);
    console.log(`Channel subscribers: ${ channel.listSubscribers() }`);
}

const findChannel = channel => channels.filter(c => c.id === parseInt(channel))[0];
const findUser = user => users.filter(u => u.id === parseInt(user))[0]
const findChannelAndUser = (channel, user) => [findChannel(channel), findUser(user)];
const channelAddsUser = (channel, user) => { channel.addSubscriber(user) }
const channelRemovesUser = (channel, user) => { channel.removeSubscriber(user) }
const userSubscribesToChannel = (channel, user) => { user.subscribe(channel) }
const userUnsubscribesFromChannel = (channel, user) => { user.unsubscribe(channel) }

const inputIsProcessable = input => {
    if (input.length !== 3) {
        console.log("Invalid Command Length!!!");
    } else if (input[1] !== "adds" && input[1] !== "removes" && input[1] !== "subscribes" && input[1] !== "unsubscribes") {
        console.log("Invalid Command Argument!!!");
    } else {
        return true;
    }

    return false;
}

const listChannel = () => {
    let list = "";

    for (let channel in channels) {
        if (list === "") {
            list = `${ channels[channel].id }`;
        } else {
            list = `${list}, ${ channels[channel].id }`;
        }
    }
    
    return `Channel IDs: ${ list }`;
}

const listUsers = () => {
    let list = "";

    for (let user in users) {
        if (list === "") {
            list = `${ users[user].id }`;
        } else {
            list = `${list}, ${ users[user].id }`;
        }
    }
    
    return `User IDs: ${ list }`;
}

while (inputLoop) {
    takeSubInput();
}

console.log("exited");

