const mongoose=require('mongoose')

const dbUrl=
"mongodb+srv://oohab:ooha@cluster0.ah7yn41.mongodb.net/NotesApp?retryWrites=true&w=majority"

const connectionParams={
    useNewUrlParser:true,
    useUnifiedTopology:true
}

mongoose.connect(dbUrl,connectionParams)
.then(()=>{
    console.log("Connected to the DB")
})
.catch((e)=>{
    console.log("Error:",e)
})
