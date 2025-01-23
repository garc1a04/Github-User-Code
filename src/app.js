import axios from 'axios';
import { dirname } from "path";
import express from 'express'
import api from './API/index.js';
import bodyParser from 'body-parser';
import { fileURLToPath } from "url";
import session from 'express-session';

const dirName = dirname(fileURLToPath(import.meta.url));
const url = "http://localhost:3000";
const app = express();

async function githubUserPrincipal() {
    try {
        var result = await axios.post(url+"/check/octocat");
        return result.data;

    } catch (error) {
        console.log(error);
    }
}

function created(text) {
    var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
    var joined = `Joined ${text.slice(8,10)} ${months[parseInt(text.slice(5,7))-1]} ${text.slice(0,4)}`;

    return joined;
}

//middleware
app.use(session({
    secret: 'dlaslkdsalçfall21ikmdslakdjas',
    resave: true,
    saveUninitialized: true,
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("src/public"));
app.use(bodyParser.json());
app.use(api);

app.get("/",async (req,res)=> {
    var git = await githubUserPrincipal();
    req.session.input = "octocat";
    
    res.render(dirName+"/views/index.ejs", {
        data: git,
        dataErro: false,
        created: created(git.created_at),
        theme: req.session.theme || "LIGHT"
    });
});

app.post("/submit",async (req,res)=> {
    try {
        var name = req.body['name'].trim();
        const result = await axios.get(url+"/check-exists?input="+name);
    
        if(!name || result.data.message == "no") {
            req.session.error = true;
            res.redirect("/submit?input="+req.session.input);
        }

        req.session.error = false;
        res.redirect("/submit?input="+name);
    } catch (error) {
        console.log(error);
    }
});

app.get("/submit",async (req,res)=> {
    req.session.input = req.query.input;
    const result = await axios.post(url+"/check/"+req.session.input);

    req.session.githubUser = result.data;
    res.render(dirName+"/views/index.ejs",{
        data: result.data,
        dataErro:  req.session.error,
        created: created(result.data.created_at),
        theme: req.session.theme || "LIGHT"
    });
});

app.post("/theme",async (req,res)=> {
    req.session.theme = req.body.data;
    res.sendStatus(200);
});

export default app;