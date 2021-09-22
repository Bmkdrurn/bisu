const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const router=express.Router();

const app = express()
const port = process.env.PORT || 5000;

// Parsing middleware
// Parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false })); // Remove 
app.use(express.urlencoded({extended: true})); // New
// Parse application/json
// app.use(bodyParser.json()); // Remove
app.use(express.json()); // New

// MySQL Code goes here

// Listen on enviroment port or 5000
app.listen(port, () => console.log(`Listening on port ${port}`));
var cors = require('cors');
app.use(cors());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

/*const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'bidb'
});

connection.connect((err)=>
{
    if(!err){
        console.log('db baglandı');
    }
    else
    console.log('baglanamadı');
}
);
app.get('/getCustomerInfo',(res,req)=>{
    connection.query('SELECT * FROM products',(err,rows,fields)=>{
        if(!err){
        console.log(rows);
        }
        else
        console.log(err);
    })
});
app.get('/getSubscriptionOrders',(res,req)=>{
    connection.query('SELECT * FROM suborders',(err,rows,fields)=>{
        if(!err)
        console.log(rows);
        else
        console.log(err);
    })
});

router.get('/',(req,res,next)=>{
    res.status(200).json();
});
router.get('/',(req,res,next)=>{
    res.status(403).json({
        message:'Belirtilen telefona ait kayıt bulunamamıştır'
    });
});
router.get('/',(req,res,next)=>{
    res.status(500).json({
        message:'Sunucu hatası. Lütfen tekrar deneyin'
    });
});*/

const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'bidb'
})
app.get('/getCustomerInfo', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.subscriptionId)
        connection.query('SELECT * from products', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from beer table are: \n', rows)
        })
    })
    
})
app.get('/getSubscriptionOrders', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.orderId)
        connection.query('SELECT * from suborders', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('Tablodaki veriler: \n', rows)
        })
    })
})