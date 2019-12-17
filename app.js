const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const AIMLParser = require('aimlparser')

const port = process.env.PORT || 4000
const url = 'https://api.line.me/v2/bot/message/reply'
const aimlParser = new AIMLParser({ name:'HelloBot' })
aimlParser.load(['./test-aiml.xml'])

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
  let { replyToken } = req.body.events[0]
  let { text } = req.body.events[0].message

  aimlParser.getResult(text, (answer, wildCardArray, input) => {
    reply(replyToken, answer)
  })

  res.sendStatus(200)
})
app.listen(port)


reply = (reply_token, text) => {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer {4n+lqCft0dHfz2Cu3oI5FDc+W1cM8VNQHfiHn2eoRK14dshoX+o8HkLJSl95IYc/LQ0O/mZTcfytgDpNIdwpKTFoL3pcNwMn0Unoa37lUOAsyPdzj/El7aVSp2WQ0J2WvzwHzo5ElpS+WN0ZAe/9NgdB04t89/1O/w1cDnyilFU=}',
  }

  let body = JSON.stringify({
    replyToken: reply_token,
    messages: [{
        type: 'text',
        text,
    }]
  })

  request.post({
    url,
    headers,
    body,
  }, (err, res, body) => {
      console.log('status = ' + res.statusCode)
  })
}