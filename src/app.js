const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;
const mongoose = require('mongoose');

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

const customers = [
    {"name":"calub","profeshion":"music"},
    {"name":"john","profeshion":"wwe"},
    {"name":"sal","profeshion":"fashion"}
]

// app.listen(PORT,()=>{
//     console.log('App is listening on port localhost:'+PORT);
// });

app.get('/',(req , res)=>{
    res.send("homepage")
})

app.get('/api/customers',(req , res)=>{
res.send({"Customers:": customers})
});

app.post('/api/customers',(req , res)=>{

console.log(req.body);
res.send(req.body);

});

app.post('/', (req,res)=>{
    res.send("this is post")
});

start();
