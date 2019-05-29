const express = 'express';
const db = require('./userDb.js');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newUser = await db.insert(req.body);
        res.status(201).json(newUser);
    } catch (error){
        res.status(500).json({ message: 'There was a problem adding the user'});
    }
});

router.post('/:id/posts', async (req, res) => {
    try {
        
    } catch (error) {
        
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await db.get();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users'})
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = db.get(id);
        if (!user) {
            res.status(404).json({ message: 'No user found with that ID'})
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving this user' });
    }
});

router.get('/:id/posts', (req, res) => {
    try {
        
    } catch (error) {
        
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const user = await db.get(id);
        if (!user) {
            res.status(404).json({ message: 'Sorry, no user with this ID found'});
        } else {
            res.status(204).json({ message: 'This user has been deleted'});
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting this user'});
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await db.get(id);
        if (!user) {
            res.status(404).json({ message: 'User with this ID could not be found'});
        } else {
            await db.update(id, req.body);
            res.status(201).json({ message: 'Update successful' });
        }
        
    } catch (error) {
        res.status(500).json({ message: 'Error while attempting to update user'});
    }
});

//custom middleware

function validateUserId(req, res, next) {
    try {

    } catch (error) {
        
    }
    next();
};

function validateUser(req, res, next) {

    next();
};

function validatePost(req, res, next) {

    next();
};

module.exports = router;
