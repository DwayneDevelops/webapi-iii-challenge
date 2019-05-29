const express = 'express';
const db = require('./postDb.js');

const router = express.Router();

router.get('/', (req, res) => {
    try {
        const posts = await db.get();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving posts'})
    }
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    try {
        const post = db.get(id);
        if (!post) {
            res.status(404).json({ message: 'No user found with that ID'})
        } else {
            res.status(200).json(post);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving this post' });
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    
    try {
        const post = await db.get(id);
        if (!post) {
            res.status(404).json({ message: 'Sorry, no post with this ID found'});
        } else {
            res.status(204).json({ message: 'This post has been deleted'});
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting this post'});
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;

    try {
        const post = await db.get(id);
        if (!post) {
            res.status(404).json({ message: 'The post with this ID could not be found'});
        } else {
            await db.update(id, req.body);
            res.status(201).json({ message: 'Update successful' });
        }
        
    } catch (error) {
        res.status(500).json({ message: 'Error while attempting to update post'});
    }
});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;