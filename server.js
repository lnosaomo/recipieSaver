const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

//Connect Database

connectDB();

//Init Middleware

app.use(express.json({ extended: false }));

//ROUTES CONFIGURATION

app.use('/api/appusers', require('./approutes/appusers'));
app.use('/api/auth', require('./approutes/auth'));
app.use('/api/contacts', require('./approutes/contacts'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client-view/build'));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client-view', 'build', 'index.html'))
  );
}
const PORT = process.env.PORT || 5002;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
