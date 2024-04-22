import app from './app.js';
const PORT = 2222;




app.listen(PORT, (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
})