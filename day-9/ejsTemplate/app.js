const express = require('express');
const app = express();

app.set('view engine','ejs');

app.get('/',(req,res) => {
   const items = ['Item 1','Item 2','Item 3','Item 4'];
   res.render('mytemplate',{items: items, ptitle: 'HelloWorld!'});
})

const PORT =process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
})