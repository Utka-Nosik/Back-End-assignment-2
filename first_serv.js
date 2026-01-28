require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');    
const itemRoutes = require('./routes/itemRoutes');   
const categoryRoutes = require('./routes/categoryRoutes');
const weatherRoutes = require('./routes/weatherRoutes'); 
const pageRoutes = require('./routes/pageRoutes');      

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());           
app.use(express.static('assets')); 

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.error('MongoDB Connection Error:', err));

app.use('/api/auth', authRoutes); 

app.use('/api/v2/items', itemRoutes); 

app.use('/api/v2/categories', categoryRoutes); 

app.use('/weather', weatherRoutes); 

app.use('/', pageRoutes);

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});