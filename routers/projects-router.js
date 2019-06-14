const express = require("express");
const actionsDB = require("../data/actions-model")
const projectsDB = require("../data/projects-model")
const router = express.Router();

//middleware

const validateActionId = async (req, res, next) => {
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

const validateProjectId = async (req, res, next) => {
    try {
    const {id} = req.params;
    const project = await projectsDB.get(id);

    project 
    ? next()
    : res.status(404).json({message: "invalid id"});  
    } catch(err) {
        res.status(400).json({message: "missing project id"});
    }
}

const validateActionBody = (req, res, next) => {
    const {project_id, description, notes} = req.body;

    project_id && description && notes
    ? next()
    : res.status(400).json({message: "missing required fields for actions"})
} 

const validateProjectBody = (req, res, next) => {
    const { name, description } = req.body;

    name 
    ? description
    ? next()
    : res.status(400).json({message: "missing description"})
    : res.status(400).json({message: "missing name"});
};

//endpoints

router.get('/', async (req, res) => {
    try {
        const projects = await projectsDB.get();

        res.status(200).json(projects);
    } catch(err) {
        res.status(500).json({success: false, err});
    }
});


router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const project = await projectsDB.get(id);

        res.status(200).json(project);
    } catch(err) {
        res.status(500).json({success: false, err});
    }
}); 

router.get('/:id/actions', async (req, res) => {
    try {
        const {id} = req.params;
        const project = await projectsDB.getProjectActions(id);

        res.status(200).json(project);
    } catch (err) {
        res.status(500).json({success: false, err});
    }
});

router.post('/', validateProjectBody, async (req, res) => {
    try {
        const newProject = await projectsDB.insert(req.body);

        res.status(201).json(newProject);
    } catch(err) {
        res.status(500).json({success: false, err});
    }
});

router.post('/:id/actions', validateActionId, validateActionBody, async (req, res) => {
    try {
        const newAction = await actionsDB.insert(req.body);

        res.status(201).json(newAction);
    } catch(err) {
        res.status(500).json({success: false, err});
    }
});

router.put('/:id', validateProjectId, validateProjectBody, async (req, res) => {
    try {
        const {id} = req.params;
        const updateProject = await projectsDB.update(id, req.body);

        updateProject
        ? res.status(200).json({message: "successfully updated project"})
        : res.status(404).end()
    } catch(err) {
        res.status(500).json({success: false, err});
    }
});

router.delete('/:id', validateProjectId, async (req, res) => {
    try {
        const {id} = req.params;
        const success = await projectsDB.remove(id);

        success ?
         res.status(204).end() : res.status(404).end();
    }  catch(err) {
         res.status(500).json({success: false, err});
    }
});



module.exports = router;