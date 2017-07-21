import Slack  from 'slack-node';

const token = process.env.SLACK_API_TOKEN || '';

const slack = new Slack(token);

const channels = {
    foodcloud: "C64DZ6KQS"
}

let defaultOptions = {
    text : "",
    username: 'Foodcloud-Logs',
    channel : channels.foodcloud,
    icon_emoji : ":chart_with_upwards_trend:"
}


const sendMessage = async ({type, message}) =>{
    let  options = { ...{}, ...defaultOptions, ...{ text: message } }
    let data = {}

    console.log('====================================');
    console.log(options);
    console.log('====================================');

    slack.api('chat.postMessage', options ,(err, response) =>{
            data = response
    });

    return await data
}


export  { sendMessage };