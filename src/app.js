const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Customer = require('./models/customer');
const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}))
mongoose.set('strictQuery',false);

const start = async()=>{
    try {
await mongoose.connect(process.env.CONN);
app.listen(PORT,()=>{
    console.log('App is listening on port localhost:'+PORT);
});
} catch (e) {
        console.log(e.message);
}
};



//const http = require('http');
//const {v4 : uuidv4} = require('uuid');
// const server = http.createServer((req , res )=>{
//     res.statusCode = 200;
//     res.setHeader('Content-Type','text/html');
//     res.end('<h1>Hello</h1>');
// })

// server.listen(3000, '127.0.0.1',()=>{
//     console.log('Connecting to server on port http//127.0.0.1:3000' );
//     console.log(uuidv4())
// });

// const json ={
//         "name": "calub curry",
//       "industry": "Music",
    
//         "favoriteColors": [
//             "red",
//             "blue",
//             "green"
//         ],
//         "favoriteNumbers": [
//             1,
//             2,
//             3
//         ],
//         "favoritePeople": [
//             {
//                 "name": "haha",
//                 "relationship": "okasan"
//             },
//             {
//                 "name": "otosan",
//                 "relationship": "otosan"
//             }
//         ]
//     };

// const customers = [
//     {"name":"calub","profeshion":"music"},
//     {"name":"john","profeshion":"wwe"},
//     {"name":"sal","profeshion":"fashion"}
// ]



const customer = new Customer({
    name : "caleb",
    industry: "music"
});
//customer.save();

// homepage
app.get('/',(req , res)=>{
    //res.send("homepage")
    res.send("welcome !")
})
// fetch data
app.get('/api/customers',async (req , res)=>{
   // console.log(await mongoose.connection.db.listCollections().toArray()) this is to get meta deta or dp 
   
    try {
    
    const result = await Customer.find(); 
res.json({"Customers:": result})
    
} catch (e) {
        console.log(e.message);
        res.status(500).json({error: e.message});
}
});

// fetch with id

app.get('/api/customers/:id',async(req , res)=>{
    // just to look at hr data
console.log({requestParams: req.params,requestQuery: req.query});
try{
//const customerId = req.params.id; without destructure
// const {id} = req.params; with destructure
const {id : customerId} = req.params;
console.log(customerId);
const customer = await Customer.findById(customerId);
if(!customer){
    res.status(404).json({Error: 'Customer not found'});
}else{
// res.send(customer); this also works
res.send({customer});
}
}catch(e){
res.status(500).json({error : 'incorrect id'})
}

});

// Post Data
app.post('/api/customers', async (req , res)=>{

console.log(req.body);
//res.send(req.body);
const customer = new Customer(req.body);
try{
await customer.save();
res.status(201).json({customer});
}
catch(e){
    res.status(400).json({error: e.message})
    }

});
// updating data
app.put('/api/customers/:id', async (req , res)=>{
    try{
const customerId = req.params.id;
const result = await Customer.replaceOne({_id:customerId},req.body);
console.log(result)
res.json({updatedCount : result.modifiedCount});
}catch(e){
res.status(500).json({Error: 'someyhing is a miss'});
}
});

// app.post('/', (req,res)=>{
//     res.send("this is post")
// });

start();
