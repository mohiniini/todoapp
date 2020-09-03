const router = require('express').Router();
const mongoose = require('mongoose')
const Notes1 = require('../model/Notes');
router.post('/', (req, res, next) => {

    const notes = new Notes1({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        // productImage: req.file.path
    });

    notes.save().then(
        result => {
            console.log(result);
        }
    ).catch(err =>
        console.log(err)
    )

    res.status(201).json({
        message: "Handling post request to the product",
        notes: notes
    })


})

router.get("/getnotes", (req, res, next) => {
    Notes1.find().then(documents => {
        res.status(200).json({
            //  message: "Employee fetched successfully! by Id",
            notes: documents
        });
    });
});


router.get("/:id", (req, res, next) => {

    Notes1.findById(req.params.id).then(documents => {


        res.status(200).json({
            message: "Posts fetched successfully! by Id",
            notes: documents
        });
    });
});



router.put("/updatenotes/:id", (req, res, next) => {
    Notes1.findById({ _id: req.params.id }).then(documents => {
        documents.title = req.body.title;
        documents.description = req.body.description;
        documents.save()
            .then(documents => {
                console.log(documents);
                res.status(200).json({
                    message: "Notes update successfully! by Id",
                    notes: documents
                });
            }).catch(error => {
                console.log(error);
            })
    })

});


router.delete("/deletenotes/:id", (req, res, next) => {
    Notes1.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({ message: "Notes deleted!" });
    });
});




module.exports = router;