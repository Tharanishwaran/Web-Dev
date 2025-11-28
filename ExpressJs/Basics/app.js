// const express = require('express');
// const app = express();
import express from 'express';
import mongoose from 'mongoose';

const port = 3000;

// const app = express();

app.get('/', (req, res) => {

     res.send("welocme to the universe higher than the sky");

});


app.listen(port, () => {

  console.log(`Server is running on http:localhost:${port}`);
  
});