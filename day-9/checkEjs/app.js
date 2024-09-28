const express = require('express');
const app = express();

app.set('view engine','ejs');

app.get('/',(req,res) => {
   const items = ['item1','item2','item3','item5'];
   res.render('mytemplate',{items:items});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
   console.log(`Server is running on http://localhost:${PORT}`);

});