const express = require("express");
const app = express();
const port = 8080;
const path = require ("path");
const methodOverride = require("method-override");
// const { title } = require("process");
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'));

app.set ("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let posts = [
    {   
        id: uuidv4(),
        username: "ashrarul0812",
        title: "The Power of Morning Rituals",
        content: "In today's fast-paced world, a structured morning ritual can be the cornerstone of success. Starting your day with intention sets the tone for productivity and positivity. Whether it's meditation, exercise, or simply savoring a cup of coffee in silence, these moments cultivate mental clarity. Studies show that consistent morning routines can improve focus, reduce stress, and foster a sense of control. Embrace small, meaningful actions each morning to transform your life step-by-step."
    },
    {
        id: uuidv4(),
        username: "abeeha2403",
        title: "Exploring the Future of Artificial Intelligence",
        content: "Artificial Intelligence (AI) continues to reshape industries and redefine innovation. From healthcare diagnostics to personalized customer experiences, its potential is limitless. However, with rapid advancements come ethical questions. How do we balance technological power with responsible usage? The future depends on creating AI that enhances human capabilities while respecting privacy and equity. As the journey unfolds, collaboration between technology experts, governments, and society will shape the path forward."
    },
    {
        id: uuidv4(),
        username: "arfa2610",
        title: "Unlocking Creativity in a Digital Age",
        content: "In a world saturated with content, creativity has become more valuable than ever. Digital tools offer endless possibilities, but true innovation lies in how we use them. From designing captivating visual art to writing compelling narratives, blending technology with imagination is the key to standing out. The secret to fostering creativity is curiosity—exploring new ideas, learning continuously, and embracing failure as a step toward greatness. Creativity isn’t a talent, it’s a way of thinking."
    }
];

app.get("/posts", (req,res) => {
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req,res) => {
    res.render("new.ejs");
});
app.post("/posts", (req,res) => {
    let {username, title, content} = req.body;
    let id = uuidv4();
    posts.unshift({id,username,title,content});
    res.redirect("/posts");
});
app.get("/posts/:id", (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("post.ejs", {post});
});
app.patch("/posts/:id", (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    let newContent = req.body.content;
    let newTitle = req.body.title;
    post.content = newContent;
    post.title = newTitle;
    console.log(post);
    res.redirect("/posts");
});
app.get("/posts/:id/edit", (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
})
app.delete("/posts/:id", (req,res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})
app.get("/", (req,res) => {
    res.send("you requested the homepage which is blank, kindly request for /posts route to check all the posts");
});

app.listen(port, () => {
    console.log('server is listening');
});