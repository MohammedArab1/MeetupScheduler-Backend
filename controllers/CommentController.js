import { Comment } from '../database/models/comment.js';

export const createComment = async (req, res) => {
	const { content, inReplyTo, note } = req.body;
    const userId = req.auth.id;
	const newComment = new Comment({
		user:userId,
        content,
        inReplyTo:inReplyTo || null,
        note
    });
	await newComment.save();
	const populatedComment = await Comment.findById(newComment._id).populate('user').populate('inReplyTo').populate('note');
	res.status(201).json(populatedComment);
};


export const fetchCommentsPerNoteId = async (req, res) => {
    const { noteId } = req.params;
	const comments = await Comment.find({ note:noteId }).populate('user').populate('inReplyTo').populate('note');
	res.status(200).json(comments);
}