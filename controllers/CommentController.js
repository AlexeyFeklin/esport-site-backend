import Comment from './../models/Comment.js';

export const createComment = async (req, res) => {
  try {
    const { parentId, userId, text, target, targetId } = req.body;

    const newComment = new Comment({
      parentId,
      userId,
      text,
      target,
      targetId,
    });

    if (parentId) {
      const parentComment = await Comment.findOneAndUpdate(
        { _id: parentId },
        { $push: { replies: newComment._id } },
      );
    }

    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating comment' });
  }
};

export const getCommentsByTarget = async (req, res) => {
  try {
    const { target, targetId } = req.params;

    const comments = await Comment.find({ target, targetId });

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting comments' });
  }
};

export const updateLikes = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { action } = req.body;

    let update;

    if (action === 'like') {
      update = { $inc: { likes: 1 } };
    } else if (action === 'dislike') {
      update = { $inc: { dislikes: 1 } };
    }

    const updatedComment = await Comment.findOneAndUpdate({ _id: commentId }, update, {
      new: true,
    });

    res.status(200).json(updatedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating comment likes/dislikes' });
  }
};
export const getCommentById = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting comment by id' });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const commentId = req.query.id;

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting comment' });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting all comments' });
  }
};

export const searchComments = async (req, res) => {
  try {
    const text = req.query.text;

    const comments = await Comment.find({ text: { $regex: text, $options: 'i' } });

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error searching comments' });
  }
};
