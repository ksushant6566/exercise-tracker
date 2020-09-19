const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
    Exercise.find()
        .then(exersises => res.json(exersises))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save()
        .then(() => res.json("exercise added!"))
        .catch(err => res.status(400).json("Error" + err));
});

router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error') + err);
});

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json("exercise deleted!"))
        .catch(err => res.status(400).json("Erorr" + err));
});

router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.date = Date.parse(req.body.date);
            exercise.duration = Number(req.body.duration);

        exercise.save()
            .then(() => res.json("exercise updated"))
            .catch(err => ers.status(400).json('Error' + err));
        })
        .catch(err => res.json('Error' + err));

})

module.exports = router;