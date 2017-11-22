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
    let data = {}

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

    // let mapLink = (order.deliveredMethod && order.deliveredMethod.address['type'] == 'jetSki' ) ? `https://www.google.com.ar/maps/place/${},${},17/@${},${},14z/data=!3m1!4b1` : null

    let message = `${ order.orderID }
User : ${ order.user.firstname } ${ order.user.lastname }
Email : ${ order.user.email }
Phone : ${ order.user.phone || 'No tiene cel' }

Local : ${ order.subsidiary.name }`

    slack.webhook({
        channel: "#foodcloud-orders",
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
