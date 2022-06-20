
      const express = require('express');
      const app = express();
      require('dotenv').config();
      const cors = require('cors');

      // middlewares
      app.use(cors());
      app.use(express.json());
      
      // defining port
      const PORT = process.env.PORT || 3001;
      
      // setting up an empty GET Route
      app.get('/', (req, res)=>{res.json({message: "You've come to the right place... it's a GET request!!"})});
      
      // Starting Server on PORT
      app.listen(PORT, () => console.log('Server started on PORT Number: ' + PORT))
      