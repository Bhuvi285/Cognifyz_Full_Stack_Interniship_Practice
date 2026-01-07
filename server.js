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
    const { username, email, password, fullname, phone, gender, country, bio, experience, confirmpassword } = req.body;

    //Adding server-side validations

    // Check required fields
    if(!username || !email || !password || !fullname || !phone ){
        return res.status(400).send("All fields are required.");
    }

    //Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(email)){
        return res.status(400).send("Invalid email.");
    }

    //phone number validation
    if(!/^[0-9]{10}$/.test(phone)){
        return res.status(400).send("Invalid phone number.");
    }

    //password match 
    if(password !== confirmpassword){
        return res.status(400).send("password do not match");
    }

    const validExperience = ["beginner", "intermediate", "advanced"];
    if(!validExperience.includes(experience)){
        return res.status(400).send("Invalid experience");
    }

    res.send("Server-side validation passed!");

    res.render("result", {
        username, email, password, fullname, phone, gender, country, bio, experience, confirmpassword
    });
    // res.json({
    //     username, email, password, fullname, phone, gender, country, bio, experience
    // });

    console.log(req.body);
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}...`);
})