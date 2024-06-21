require("dotenv").config({ path: "backend/config/config.env" });
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

app.listen(3001, async () => {
  await sequelize.sync();
  console.log('Server is running on port 3001');
});


app.get('/', (req,res)=>{
  res.send('Hello My Sql')
})

