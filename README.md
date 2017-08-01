# hapi-dispatch

Slack Logs Dispatcher

Methods

```
method: GET

path: /generate-token/:msg/:API_KEY/:SECRET_API_KEY

response : ACCESS_TOKEN

```

```
method: POST

headers : x-access-token : ACCESS_TOKEN

path: /send
body : {
  message : `string \n multiline`
}
```

You need node environments, creating `.env` file like this

```
PORT=8000

SLACK_API_TOKEN=xxxxxxx-xxxxxxxxxxxxxx-xxxxxxx

WEBHOOK=https://www.slack-webhook.com

DEV=true

API_KEY=random-string

SECRET_API_KEY=random-strong-string

SECRET=jwt-secret-generation-string
```

Then run `npm install`

```
npm start
```

#Enjoy it!
