const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

const port = process.env.PORT || 4000
const url = 'https://api.line.me/v2/bot/message/reply'
const token = '' // Channel line access token 

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
  let { replyToken } = req.body.events[0]
  let { text } = req.body.events[0].message
  reply(replyToken, text)
  res.sendStatus(200)
})
app.listen(port)


reply = (replyToken, text) => {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer {'+token+'}',
  }

  const messages = [{
      type: 'text',
      text: 'Hello'
    },
    {
      type: 'text',
      text: 'How are you?'
  }]

  let body = JSON.stringify({ replyToken, messages })
  request.post({
    url,
    headers,
    body,
  }, (res) => {
      console.log('status = ' + res.statusCode)
  })
}