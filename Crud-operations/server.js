const express = require('express')
const connectToDB = require('./src/db/db')
const noteModel = require('./src/Models/note.model')

const app = express()

app.use(express.json())  //middleware

app.post('/notes',async(req,res)=>{   // to handle await we use async function
    const {title,content} = req.body
    console.log(title,content)
    await noteModel.create({    // this return a promise for this we use await  
        title,content
    })
    res.json({
        message: "Note created Successfully"
    })
    
})

app.get('/notes', async (req,res)=>{
    const notes = await noteModel.find()

    res.json({
        message: "Notes fetch successfully",
        notes
    })
})

app.delete('/notes/:id', async (req,res)=>{
    const noteId = req.params.id
    await noteModel.findOneAndDelete({
        _id:noteId
    })
    res.json({
        message: "note deleted"
    })
})

app.patch('/notes/:idx', async (req,res)=>{
    const noteId = req.params.idx
    const {title} = req.body
    await noteModel.findOneAndUpdate({
        _id:noteId
    },{
        title:title
    })
    res.json({
        message:"note updated"
    })
})


connectToDB()

app.listen(3000,()=>{
    console.log('server is running on port 3000')
})


// Schema --> jo data tum database m store krne vaale ho vo kaisa dikhega