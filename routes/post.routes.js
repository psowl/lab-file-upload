const express = require('express');
const { NotExtended } = require('http-errors');
const router = express.Router();
const Post = require('../models/Post.model');

const fileUploader = require('../configs/cloudinary.config');

router.get('/post-form', (req, res) => res.render('post-form'));

router.post('/post-form', fileUploader.single('picPath'), (req,res) => {
  const {content, creatorId, picName } = req.body;

  Post.create({
    content,
    creatorId,
    picName,
    picPath: req.file.path
    
  }).then(postFromDB => {
    console.log('Newly created post: ', postFromDB);
    res.redirect('/post-display');
  })
    .catch(error => next(error));
})

router.get('/post-display', (req, res) => 
  res.render('post-display')
  );

module.exports = router;