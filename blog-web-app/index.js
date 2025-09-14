import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
//import { title } from "process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];
let index = 0;
let fname = "";
let lname = "";
let title = "";
let content = "";

app.get("/", (req, res) => {
    res.render("index.ejs", {
        posts,
        firstName: fname,
        lastName: lname,
        title: title,
        content: content
    });
})

app.post("/submit", (req, res) => {
    let firstName = req.body.fname
    let lastName = req.body.lname;
    let titleOfPost = req.body.title;
    let contentOfPost = req.body.content;
    let dateOfPost = Date();
    let id = index;
    index++

    const post = {
        firstName: firstName,
        lastName: lastName,
        content: contentOfPost,
        date: dateOfPost,
        title: titleOfPost,
        id: id,
    }

    posts.push(post);

    res.render('index.ejs', {posts});
});

app.post("/:id/delete", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = posts.map(e => e.id).indexOf(id);
    posts.splice(index, 1);
    fname = "";
    lname = "";
    title = "";
    content = "";
    res.redirect('/');
})

app.post("/:id/edit", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = posts.map(e => e.id).indexOf(id);
    fname = posts[index].firstName;
    lname = posts[index].lastName;
    title = posts[index].title;
    content = posts[index].content;
    posts.splice(index, 1);
    res.redirect('/');
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});