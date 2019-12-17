const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
  let { replyToken } = req.body.events[0]
  reply(replyToken)
  res.sendStatus(200)
})
app.listen(port)

const url = 'https://api.line.me/v2/bot/message/reply'
reply = (reply_token = '') => {
  let header = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer {4n+lqCft0dHfz2Cu3oI5FDc+W1cM8VNQHfiHn2eoRK14dshoX+o8HkLJSl95IYc/LQ0O/mZTcfytgDpNIdwpKTFoL3pcNwMn0Unoa37lUOAsyPdzj/El7aVSp2WQ0J2WvzwHzo5ElpS+WN0ZAe/9NgdB04t89/1O/w1cDnyilFU=}'
  }

  let body = JSON.stringify({
    replyToken: reply_token,
    messages: [{
        type: 'text',
        text: 'Hello'
    },
    {
        type: 'text',
        text: 'How are you?'
    }]
  })

  request.post({
    url,
    header,
    body,
  }, (err, res, body) => {
      console.log('res = ' + JSON.stringify(res))
      console.log('status = ' + res.statusCode)
      console.log('error_description = ' + res.error_description)
  })
}