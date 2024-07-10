const express = require('express')
const mongoose = require('mongoose')
const port = process.env.PORT || 3000;
mongoose.connect("mongodb+srv://admin:232004Aditya%40mongo@cluster0.dahrvb8.mongodb.net/trialDB");
const dbSchema = new mongoose.Schema({
    name: String,
    age: Number
})
const user = mongoose.model('user', dbSchema);
const cors = require('cors')

const app = express()
app.use(cors({
    origin: '*'
}));
app.use(express.json())
app.get('/', async(req, res) => {
    const users = await user.find();
    res.json(users);
})
app.post('/', async(req, res) => {
    const { name, age } = req.body;
    const newUser = new user({ name, age });
    await newUser.save();
    res.json(newUser);
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });