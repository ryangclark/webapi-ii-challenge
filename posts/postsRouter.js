const express = require('express');

const router = express.Router();

const db = require('../data/db.js');

router.post('/', async (req, res) => {
  try {
    if (
      req.body.hasOwnProperty('title') &&
      req.body.hasOwnProperty('contents')
    ) {
      const post = await db.insert(req.body);
      res.status(201).json(post);
    } else {
      res.status(400).json({
        errorMessage: 'Please provide title and contents for the post.'
      });
    }
  } catch (error) {
    console.log('POST /api/posts/ ERROR: ', error);
    res.status(500).json({
      error: 'There was an error while saving the post to the database.'
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const posts = await db.find();
    res.status(200).json(posts);
  } catch (error) {
    console.log('GET /api/posts/ ERROR: ', error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await db.findById(req.params.id);
    if (!post) {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    console.log('GET /api/posts/:id ERROR: ', error);
    res
      .status(500)
      .json({ error: 'The post information could not be retrieved.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const post = await db.findById(req.params.id);
    if (!post) {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    } else {
      res.status(204).end();
    }
  } catch (error) {
    console.log('DELETE /api/posts/:id ERROR: ', error);
    res.status(500).json({ error: 'The post could not be removed' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    if (
      req.body.hasOwnProperty('title') &&
      req.body.hasOwnProperty('contents')
    ) {
      const post = await db.findById(req.params.id);
      if (!post) {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      } else {
        const updatedPost = await db.update(req.params.id, req.body);
        res.status(200).json(updatedPost);
      }
    } else {
      res.status(400).json({
        errorMessage: 'Please provide title and contents for the post.'
      });
    }
  } catch (error) {
    console.log('PUT /api/posts/:id ERROR: ', error);
    res
      .status(500)
      .json({ error: 'The post information could not be modified.' });
  }
});
