import axios from "axios";
import { Octokit } from "@octokit/core";
import { Router } from "express";

const api = Router();
const octokit = new Octokit({
    auth: 'your-token-here'
})

api.post("/check/:name",async (req,res)=> {
    try {
        let name = req.params.name;

        const result = await octokit.request('GET /users/{username}', {
            username: name,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })

        res.json(result.data);
    } catch (error) {
        console.log(error);
        res.json({message: "Error"})
    }   
});


api.get("/check-exists",async (req,res)=> {
    try {
        let name = req.query.input;

        await octokit.request('GET /users/{username}', {
            username: name,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })

        res.json({message: "yes"});
    } catch (error) {
        console.log(error);
        res.json({message: "no"})
    }  
})

export default api;