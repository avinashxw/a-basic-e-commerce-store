const express = require('express');
const app = express();
const PORT = 3001;

app.listen(PORT, (error) => {
    if(!error) {
        console.log('Server is running & listening on PORT', PORT);
    }
    else {
        console.log('An error occured!', error);
    }
})