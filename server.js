const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let products = [
    {
        id: 0,
        productName: 'Samsung Galaxy S9',
        price: 4000
    },
    {
        id: 1,
        productName: 'Iphone XR',
        price: 3999
    }
];

app.get('/get-all', (req, res) => {
    res.status(200).send(products);
})

app.post('/add', (req, res) => {
    if(req.body.productName && req.body.price){
        let product = {
            id: products.length,
            productName: req.body.productName,
            price: req.body.price
        };
        products.push(product);
        res.status(200).send(product);
    } else {
        res.status(500).send({success: false, message: 'Internal server error'});
    }
});

app.put('/update/:id',(req,res)=>{
    if(req.params.id && req.body.productName && req.body.price){
        let product = {
            id: req.params.id,
            productName: req.body.productName,
            price: req.body.price
        };
        let foundAt = null;
        products.map((_product, i) => {
            if(_product.id == product.id){
                foundAt = i;
            }
        })
        if(foundAt !== null){
            products[foundAt] = product;
            res.status(200).send(product);
        } else {
            res.status(404).send({success: false, message: `There is no product with id = ${product.id}`});
        }
    }else{
        res.status(400).send({success: false, message: 'Your request does not match the required schema'});
    }
});


app.delete('/delete' , (req, res) => {
    if(req.body.productName) {
        let found = false;
        for(let i = 0; i < products.length ; i++){
            if(products[i].productName == req.body.productName){
                found = true;
                products.splice(i,1);
                res.status(200).send({success: true, message: "The product has been deleted"});
                break;
            }
        }
        if(!found){
            res.status(404).send({success: false, message: "There is no product with this name"});
        }    
    } else {
        res.status(400).send({success: false, message: "Request does not match schema"});
    }
});

const server = app.listen(8080, () => {
    console.log(`Server started on port ${server.address().port}...`);
});