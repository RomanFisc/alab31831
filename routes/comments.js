const express = require("express");
const router = express.Router();

const comments = require("../data/comments"); 
const error = require("../utilities/error");

router.get("/", (req, res) => {
  res.json(comments);
});

router.post("/", (req, res, next) => {
  const { userId, postId, body } = req.body;
  
  if (!userId || !postId || !body) {
    return next(error(400, "Insufficient Data"));
  }
  
  const newComment = {
    id: comments.length ? comments[comments.length - 1].id + 1 : 1,
    userId,
    postId,
    body
  };
  
  
  comments.push(newComment);
  
  res.status(201).json(newComment);
});

router.get('/:id', (req, res, next) => {
  const commentId = parseInt(req.params.id, 10);
  const comment = comments.find(c => c.id === commentId);

  if (!comment) {
    return next(error(404, 'Comment Not Found'));
  }

  res.json(comment);
});

module.exports = router;