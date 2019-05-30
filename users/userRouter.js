const express = require('express');
const db = require('./userDb.js');

const router = express.Router();

router.post('/', validateUser, async (req, res) => {
    try {
        const newUser = await db.insert(req.body);
        res.status(201).json(newUser);
    } catch (error){
        res.status(500).json({ message: 'There was a problem adding the user'});
    }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    const user = await db.getById(id)
    if (!user) {
        res.status(400).json({ message: 'Sorry, correct request and try again'})
    } else {
        try {
            const post = await db.insert(id, changes);
        res.status(200).json(post)
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving posts'});
        }
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

router.get('/:id', validateUserId, async (req, res) => {
    const userFound = req.user;
    
    res.status(200).json(userFound);
});

router.get('/:id/posts', validateUserId, async (req, res) => {
    const { id } = req.params;
    const user = await db.getById(id)
    if (!user) {
        res.status(400).json({ message: 'Sorry, correct request and try again'})
    } else {
        try {
            const post = await db.getUserPosts(id);
        res.status(200).json(post)
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving posts'});
        }
    }
});

router.delete('/:id', validateUserId, async (req, res) => {
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

router.put('/:id', validateUserId, async (req, res) => {
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
    if (req.params && req.params.id ) {
        db.getById(req.params.id)
        .then(user => {
            if (user) {
            req.user = user
            next()
            } else {
                res.status(400).json({ message: 'Unable to retrieve user'})
            }
        })
        .catch( err => {
            res.status(500).json({ message: 'Problem getting user'});
        })
    }
};

function validateUser(req, res, next) {
    if (!req.body) {
        res.status(400).json({ message: 'missing user data'});
    } else if (!req.body.name){
        res.status(400).json({ message: 'missing required name field'})
    } else {
        next()
    }
};

function validatePost(req, res, next) {
    if (!req.body) {
        res.status(400).json({ message: 'missing post data'});
    } else if (!req.body.text){
        res.status(400).json({ message: 'missing required text field'});
    } else if (!req.body.user_id){
        res.status(400).json({ message: 'missing a user ID'});
    } else {
        next();
    }
};

module.exports = router;
