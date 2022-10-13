const express=require('express')
const router=express.Router()
const Note=require('../models/note')
const swaggerJsDocs=require('swagger-jsdoc')
const swaggerUI=require('swagger-ui-express')



/**
 * @swagger
 * definitions:
 *  Note:
 *    type: object
 *    properties:
 *      title:
 *        type: string
 *        description: title of note
 *        example: 'Note1'
 *      body:
 *        type: string
 *        description: body of note
 *        example: 'This is the content'
 */


/**
 * @swagger
 * /notes:
 *   get:
 *     summary: get all notes
 *     description: List of notes
 *     responses:
 *        "200":
 *           description: success
 *        "500":
 *           description: failure
 */

 router.get('/notes',async(req,res)=>{
    try{
        const notes=await Note.find({})
        res.status(200).send(notes)
    }
    catch{
        res.status(500).send('Server not responding')
    }
})


/**
 * @swagger
 * /note/{id}:
 *   get:
 *     summary: get notes by id
 *     description: Fetch a note
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string
 *        required: true
 *        description: id of a note
 *        example: "633d8611d20089baef0152bf"
 *     responses:
 *        "200":
 *           description: success
 *        "500":
 *           description: failure
 */

router.get('/note/:id',async(req,res)=>{
    try{
        const note=await Note.findById(req.params.id)
        res.status(200).send(note)
    }
    catch(e){
        res.status(500).send(e)
    }
})


/**
 * @swagger
 * /note:
 *   post:
 *     summary: create note
 *     description: enter new note
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/Note'    
 *     responses:
 *        201:
 *            description: created
 *        400:
 *            description: error
 */

router.post('/note',async(req,res)=>{
    const note=new Note(req.body)
    try{
        await note.save()
        res.status(201).send(note)
    }
    catch(e){
        res.status(400).send()
    }
})


/**
 * @swagger
 * /note/{id}:
 *   patch:
 *     summary: update note
 *     description: update note
 *     consumes:
 *      - application/json
 *     produces:
 *      - application/json
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: id of a note
 *        example: "633d8611d20089baef0152bf"
 *      - in: body
 *        name: body
 *        required: true
 *        description: body object
 *        schema:
 *          $ref: '#/definitions/Note' 
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/Note'    
 *     responses:
 *        201:
 *            description: created
 *            content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/definitions/Note'   
 *        400:
 *            description: error
 */

router.patch('/note/:id',async(req,res)=>{
    const note=await Note.findById(req.params.id)
    const updates=Object.keys(req.body)
    const allowedUpdates=['title','body']
    const isValidUpdates=updates.every((update)=>{
        return allowedUpdates.includes(update)
    })
    if(!isValidUpdates){
        return res.status(400).send({error:'invalid updates'})
    }

    try{
        updates.forEach((update)=>{
            note[update]=req.body[update]
        })
        await note.save()
        res.status(201).send(note)
    }
    catch(e){
        res.status(500).send(e)
    }
})

/**
 * @swagger
 * /note/{id}:
 *   delete:
 *     summary: delete note
 *     description: delete note
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string
 *        required: true
 *        description: id of note
 *        example: "633e77c7025685a92b0cf4d2"
 *     responses:
 *        "200":
 *           description: success
 *        "500":
 *           description: failure
 */


router.delete('/note/:id',async(req,res)=>{
    try{
        const note=await Note.findByIdAndDelete(req.params.id)
        res.status(200).send('Deleted successfully')
    }
    catch(e){
        res.status(500).send(e)
    }
})



module.exports = router
