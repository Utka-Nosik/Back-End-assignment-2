const { json } = require('body-parser');
const express = require('express');
const fs = require('fs');
let app = express();
app.use(express.json());

app.use(express.static('assets')); 

app.get('/index.html', (request, response) => {
    response.sendFile(__dirname + '/index.html');
})

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
})

app.get('/cart.html', (request, response) => {
    response.sendFile(__dirname + '/cart.html');
})

app.get('/contact.html', (request, response) => {
    response.sendFile(__dirname + '/contact.html');
})

app.get('/product.html', (request, response) => {
    response.sendFile(__dirname + '/product.html');
})

app.get('/profile.html', (request, response) => {
    response.sendFile(__dirname + '/profile.html');
})

app.get('/shop.html', (request, response) => {
    response.sendFile(__dirname + '/shop.html');
})

app.get('/about.html', (request, response) => {
    response.sendFile(__dirname + '/about.html');
})



app.get('/hello', (request, response) => { 
    response.json({message: "Hello from SERVEEEEEEEER<3"});
})

app.get('/time', (request, response) => {
    const now = new Date();
    
    response.send("Present time: " + now.toLocaleTimeString());
});

app.get('/status', (request, response) => {
    response.status(200).json({
        status: "OK",
        message: "Semakina zemli poela"
    });
});

app.get('/items', (request, response) => {
    fs.readFile('data.json', 'utf8', (err, data) => {

        const jsonData = JSON.parse(data);

        response.json(jsonData);
    });
});

app.post('/items', (req, res) => {

    fs.readFile('data.json', 'utf8', (err, data) => {

        const db = JSON.parse(data);
        
        const newItem = {
            id: db.items.length > 0 ? db.items[db.items.length - 1].id + 1 : 1,
            name: req.body.name,
            price: req.body.price,
            category: req.body.category || "General",
            description: req.body.description || ""
        };

        db.items.push(newItem);

        fs.writeFile('data.json', JSON.stringify(db, null, 2), (err) => {
            if (err) return res.status(500).send("Error writing file");
            res.json(newItem);
        });
    });
});

app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id); 

    fs.readFile('data.json', 'utf8', (err, data) => {
        
        const db = JSON.parse(data);
        
        const item = db.items.find(i => i.id === id);

        if (!item) {
            return res.status(404).send("Item not found"); 
        }

        item.name = req.body.name || item.name;
        item.price = req.body.price || item.price;
        item.category = req.body.category || item.category;
        item.description = req.body.description || item.description;

        fs.writeFile('data.json', JSON.stringify(db, null, 2), (err) => {
            if (err) return res.status(500).send("Error writing file");
            res.json(item); 
        });
    });
});

app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);

    fs.readFile('data.json', 'utf8', (err, data) => {

        let db = JSON.parse(data);

        const newItems = db.items.filter(i => i.id !== id);

        if (newItems.length === db.items.length) {
            return res.status(404).send("Item not found");
        }

        db.items = newItems; 
        fs.writeFile('data.json', JSON.stringify(db, null, 2), (err) => {
            if (err) return res.status(500).send("Error writing file");
            res.json(item); 
        });
    });
});


app.listen(3000, () => {
    console.log("Server started at http://localhost:3000");
})