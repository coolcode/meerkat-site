const express = require('express')
const faces = require('cool-ascii-faces').faces

const PORT = process.env.PORT || 5000

var app = express()
app.use(express.static(__dirname + '/html'))
// .use(express.static(path.join(__dirname, 'public')))
// .set('views', path.join(__dirname, 'views'))
// .set('view engine', 'ejs')
app.get('/', (req,res) => {  
  res.sendFile('index.html')
})

app.get('/hello', (req, res) => res.send('Hello (¬‿¬) !'))

app.get('/api/v1/faces', (req, res) =>{
  var payload = {
    "faces": faces.map(function(face, index, arr) {
      return { 'id': index, 'face': face }
    })
  }

  res.send(payload)
})

app.get('/api/v1/faces/:id', (req, res) =>{
  if (req.params.id > faces.length) res.send(404, 'Woah, like totally no faces here!') 

  var payload = {
    "id": req.params.id,
    "face": faces[req.params.id]
  }

  res.send(payload)
})
app.listen(PORT, () => console.log(`Example app listening on port ${PORT }!`))