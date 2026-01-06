const express = require('express');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/submit", (req, res) => {
    const { username, email, password, fullname, phone, gender, country, bio, experience , confirmpassword } = req.body;

    res.render("result", {
        username, email, password, fullname, phone, gender, country, bio, experience , confirmpassword
    });
    // res.json({
    //     username, email, password, fullname, phone, gender, country, bio, experience
    // });

    console.log(req.body);
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}...`);
})