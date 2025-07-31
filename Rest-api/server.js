const express = require('express')

const app = express()  // server is created

app.get('/',(req,res)=>{
    res.send('hello bhai log')
})
// lets create api /notes
const notes = []
app.use(express.json())   //middleware

// /notes => {title,content}

app.post('/notes',(req,res)=>{
    console.log(req.body);
    notes.push(req.body);
    res.json({
        message: 'notes created successfully'
    })
})
app.get('/notes',(req,res)=>{
    res.json(notes)
})

// delete /notes:index

app.delete('/notes/:index',(req,res)=>{
    const index = req.params.index
    delete notes[index]
    res.json({
        message: 'note is deleted successfully'
    })
})

/*PATCH /notes/:index => {title}*/

app.patch('/notes/:index',(req,res)=>{
    const index = req.params.index
    const {title} = req.body
    const {content} = req.body
    notes[index].title = title
    notes[index].content = content
    res.json({
        message: 'note updated successfully'
    })
})


// app.patch

app.listen(3000,()=>{
    console.log('server is running');
    
})
    // app.delete('/notes',(req,res)=>{
    //     notes.splice(1,1);
    //     res.json({
    //         message: 'note deleted successfully',
    //         notes:notes
    //     })
    // })