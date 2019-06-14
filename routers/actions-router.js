const express = require("express");
const actionsDB = require("../data/helpers/actionModel")
const projectsDB = require("../data/helpers/projectModel")
const router = express.Router();


//middleware
const validateActionBody = (req, res, next) => {
    const {project_id, description, notes} = req.body;

    project_id && description && notes
    ? next()
    : res.status(400).json({message: "missing required fields for actions"})
} 

const validateAPID = async (req, res, next) => {
    try {
    const {project_id} = req.body;
    const action = await projectsDB.get(project_id);

    action 
    ? next()
    : res.status(404).json({message: "invalid id"});  
    } catch(err) {
        res.status(400).json({message: "missing action id"});
    }
}

const validateActionId = async (req, res, next) => {
    try {
    const {id} = req.params;
    const action = await actionsDB.get(id);

    action 
    ? next()
    : res.status(404).json({message: "invalid id"});  
    } catch(err) {
        res.status(400).json({message: "missing action id"});
    }
}

//endpoints

router.get('/', async (req, res) => {
    try {
        const actions = await actionsDB.get();

        res.status(200).json(actions);
    } catch(err) {
        res.status(500).json({success:false, err})
    }
});

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const action = await actionsDB.get(id);

        res.status(200).json(action);
    } catch(err) {
        res.status(500).json({success:false, err})
    }
});

router.post('/', validateActionBody, validateAPID, async (req, res) => {
    try {
        const newAction = await actionsDB.insert(req.body);

        res.status(201).json(newAction);
    } catch(err) {
        res.status(500).json({success:false, err})
    }
});

router.put('/:id', validateActionId, validateActionBody, validateAPID, async (req, res) => {
    try {
        const {id} = req.params;
        const updateAction = await actionsDB.update(id, req.body);

        updateAction 
        ? res.status(200).json({message: "successfully updated action"}) 
        : res.status(404).end();
    } catch(err) {
        res.status(500).json({success:false, err})
    }
});

router.delete('/:id', validateActionId, async (req, res) => {
    try {
        const {id} = req.params;
        const success = await actionsDB.remove(id);
        
        success ?
         res.status(204).end() : res.status(404).end();
    } catch(err) {
        res.status(500).json({success:false, err})
    }
});



module.exports = router;