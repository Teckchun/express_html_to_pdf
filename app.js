var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('./test/businesscard.html', 'utf8');
var options = { format: 'Letter' };
var express = require('express')
var app = express();
const port = 3000;
// pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
//   if (err) return console.log(err);
//   console.log(res); // { filename: '/app/businesscard.pdf' }
// });
app.get('/', (req, res) => res.send('Hello World!'))
app.get('/invoice/pdf', (req, res) => {
    pdf.create(html).toStream((err, pdfStream) => {
      if (err) {   
        // handle error and return a error response code
        console.log(err)
        return res.sendStatus(500)
      } else {
        // send a status code of 200 OK
        res.statusCode = 200             
  
        // once we are done reading end the response
        pdfStream.on('end', () => {
          // done reading
          return res.end()
        })
  
        // pipe the contents of the PDF directly to the response
        pdfStream.pipe(res)
      }
    })
  })


app.listen(port, () => console.log(`Example app listening on port ${port}!`))