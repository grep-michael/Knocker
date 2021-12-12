const { Console } = require("console")
const express = require("express")
const path = require("path")

const app = express()

app.set("views",path.join(__dirname,"views"))
app.set('view engine','pug')

var exec = require('child_process').exec;
function execute(command){
    return new Promise(function(resolve,reject){
        exec(command,function(error,stdOut,stdErr){
            if (error){
                reject()
                return
            }
            resolve(stdOut)
        })
    })
};

app.get('/',function(req,res){
    res.render('launcher')
})

app.get('/runKnocker',function(req,res){
    res.setTimeout(0)
    console.log(req.query.domain) 
    execute(`/opt/PenTools/knock/knockpy.py ${req.query.domain} -o ./reports/report.json`).then(
        (out)=>{res.redirect("/results")},
        ()=>{console.log("Error")}
    )
})

app.get('/results',function(req,res){
    res.send("results")

})

var server = app.listen(3000)
