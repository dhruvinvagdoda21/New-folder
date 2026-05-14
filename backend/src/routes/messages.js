const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { protect } = require('../middleware/auth');

// Helper to create conversation ID
const getConversationId = (id1, id2) => {
  return [id1, id2].sort().join('_');
};

// GET /api/messages/conversations
router.get('/conversations', protect, async (req, res) => {
  try {
    const messages = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: req.user._id },
            { receiver: req.user._id },
          ],
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: '$conversationId',
          lastMessage: { $first: '$text' },
          lastMessageAt: { $first: '$createdAt' },
          sender: { $first: '$sender' },
          receiver: { $first: '$receiver' },
          unreadCount: {
            $sum: {
              $cond: [
                { $and: [{ $eq: ['$read', false] }, { $eq: ['$receiver', req.user._id] }] },
                1,
                0,
              ],
            },
          },
        },
      },
      { $sort: { lastMessageAt: -1 } },
    ]);

    // Populate user info
    const User = require('../models/User');
    const conversations = await Promise.all(
      messages.map(async (msg) => {
        const otherUserId = msg.sender.toString() === req.user._id.toString()
          ? msg.receiver
          : msg.sender;
        const otherUser = await User.findById(otherUserId).select('name avatar');
        return {
          ...msg,
          otherUser,
        };
      })
    );

    res.json({ success: true, conversations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/messages/:userId
router.get('/:userId', protect, async (req, res) => {
  try {
    const conversationId = getConversationId(req.user._id.toString(), req.params.userId);
    
    const messages = await Message.find({ conversationId })
      .populate('sender', 'name avatar')
      .populate('receiver', 'name avatar')
      .sort({ createdAt: 1 });

    // Mark as read
    await Message.updateMany(
      { conversationId, receiver: req.user._id, read: false },
      { read: true }
    );

    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/messages
router.post('/', protect, async (req, res) => {
  try {
    const { receiverId, text } = req.body;
    const conversationId = getConversationId(req.user._id.toString(), receiverId);

    const message = await Message.create({
      conversationId,
      sender: req.user._id,
      receiver: receiverId,
      text,
    });

    await message.populate('sender', 'name avatar');
    await message.populate('receiver', 'name avatar');

    res.status(201).json({ success: true, message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
