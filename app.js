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
reply = (replyToken = '') => {
  let header = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer {punpuPSfr4UXjWEP4rUVZHMf/vhNHMjnXlOTPYRtB7pl33GkfIUtUS8MyWkfIG8PLQ0O/mZTcfytgDpNIdwpKTFoL3pcNwMn0Unoa37lUOA35kPEvirxg93jRDAoawsK1cvGVickdYkqAMXW63WCEAdB04t89/1O/w1cDnyilFU=}'
  }

  console.log('reply Func', replyToken)

  let body = JSON.stringify({
    replyToken,
    messages: [{
        type: 'text',
        text: 'Hello'
    },
    {
        type: 'text',
        text: 'How are you?'
    }]
  })

  console.log('reply Func body', body)
  request.post({
    url,
    header,
    body,
  }, (err, res, body) => {
      console.log('status = ' + res.statusCode)
  })
}