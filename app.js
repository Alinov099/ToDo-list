const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const port = 3000

let items=['Find Food', 'Cook Food', 'Eat Food']; // for use in whole code
let workItems =[]

app.set('view engine', 'ejs'); // should be below app = express()

app.use(bodyParser.urlencoded({extended:true}));    // grab item
app.use(express.static("public"));

app.get('/', (req, res) => {

    let today = new Date();
    // let currentDay = today.getDay();
    // let day="";
    const options = {
        weekday: 'long',
        day: 'numeric',
        year: 'numeric', 
        month: 'long',       
      };
    
    let day = today.toLocaleDateString("en-US", options );

    res.render('list', {listTitle : day, newlistItem : items});  // first is html letiable and next is express letiable
});

app.post('/', (req,res) =>{
    let item = req.body.newitem;

    if (req.body.list === "Work") {
        workItems.push ( item );
        res.redirect ("/work"); }
    else {
        items.push( item ) ;
        res.redirect ( "/" ) ;
        }
    
});

app.get('/work', (req,res) =>{
    res.render('list', {listTitle : "Work List", newlistItem : workItems})
});

app.post('/work', (req,res) =>{
    let item = req.body.newitem;
    
    workItems.push(item);

    res.redirect('/work');
});

app.get('/about', (req,res) =>{
    res.render("about")
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})