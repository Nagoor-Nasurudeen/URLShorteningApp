const express = require('express');
const app = express();
const PORT=5000;  //env

const db = require("./config/db");



app.use(express.json());

app.get("/",async (req,res)=>{
    try{
        const [result]=await db.execute("SELECT * FROM urltable");
        
        res.json(result);
    }catch(err){
        console.error(err);
        res.status(500).json({error:err.message});
    }
    
});

app.post("/shorturls",  async (req,res)=>{
    try{
        let longurl = req.body.longurl;
        
        //validation and sanitisation
        if(!longurl.startsWith("http://") && !longurl.startsWith("https://")){
            longurl="https://"+longurl;
        }

        

        let [lastId]= await db.execute("SELECT id FROM urltable order by id  desc limit 1");
        let lastiUrlId;
        //to handle first insert
        if (typeof lastId[0] !== 'undefined'){  
            lastUrlId=lastId[0].id;
            //check if longurl is already inserted
            let [longurlResult]= await db.execute("SELECT longurl,shorturl FROM urltable where longurl=?",[longurl]);
            if(longurlResult.length>0){
                return res.status(409).json({message:`The given longurl ${longurl} is already exists with shorturl ${longurlResult[0].shorturl}`})

            }
        }else{
            lastUrlId=0;
        }
        
        let shorturl= `web${lastUrlId+1}`;

        const [result]= await db.execute("INSERT INTO urltable (longurl,shorturl) VALUES (?,?)",[longurl,shorturl]);
        
        res.json({shorturl});

    }catch(err){
        console.error(err);
        res.status(500).json({error:err.message});
    }
})

app.get("/:shorturl",async (req,res)=>{  //return longurl
    try{
        let shorturl=req.params.shorturl;
        const [result]=await db.execute("SELECT id,longurl,visits FROM urltable where shorturl=?",[shorturl]);
        // console.log(result);
        //if result is empty then it is  not a valid url
        if(result.length>0){ 
            const [result2]=await db.execute("UPDATE urltable SET visits = ?+1 WHERE id=?",[result[0].visits,result[0].id]);
            
            res.redirect(result[0].longurl);
        }else{
            res.status(404).json({message: `the given shorturl ${shorturl} is invalid. Please provide a valid shorturl`})
        }
    }catch(err){
        console.error(err);
        res.status(500).json({error:err.message});
    }
});

app.listen(PORT,()=>{
    console.log("Server started successfully");
})