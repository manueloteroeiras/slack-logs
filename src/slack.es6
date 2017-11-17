import Slack  from 'slack-node';
import dotenv from 'dotenv'

dotenv.config()
// const token = process.env.SLACK_API_TOKEN || '';

// const slack = new Slack(token);

var slack = new Slack();

slack.setWebhook(process.env.WEBHOOK);

console.log('====================================');
console.log(process.env.WEBHOOK);
console.log('====================================');


const channels = {
    foodcloud: "C64DZ6KQS"
}

let defaultOptions = {
    text : "",
    username: 'Foodcloud-Logs',
    channel : channels.foodcloud,
    icon_emoji : ":chart_with_upwards_trend:"
}


const sendMessage = async ({message}) =>{
    let  options = { ...{}, ...defaultOptions, ...{ text: message } }
    let data = {}

    console.log('====================================');
    console.log(options);
    console.log('====================================');

    slack.webhook({
        channel: "#foodcloud-logs",
        username: "foodcloud-logs",
        text: message
    },
    function(err, response) {
        console.log(response);
        data = response
    });

    return await data
}

const sendOrder = async ({order}) =>{
    let data = {}

    let message = `${ order.orderID }
User : ${ order.user.email }
Phone : ${ order.user.phone || 'No tiene cel' }

${ JSON.stringify(order) }`

    slack.webhook({
        channel: "#foodcloud-logs",
        username: "foodcloud-logs",
        text: message
    },
    function(err, response) {
        console.log(response);
        data = response
    });

    return await data
}

const welcomeMessage = async () =>{
    let data = {}
    console.log('====================================');
    console.log("Welcome!");
    console.log('====================================');

    slack.webhook({
        channel: "#foodcloud-logs",
        username: "foodcloud-logs",
        text: "Welcome!"
    },
    function(err, response) {
        console.log(response);
        data = response
    });

    return await data
}


export  { sendMessage, welcomeMessage, sendOrder };
