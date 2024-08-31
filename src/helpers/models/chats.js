const { Chat, Profile, File } = require('../../models');

exports.find = async (roomId, { skip = 0, limit = 20 }) => {
  const chats = await Chat.findAll({
    where: { roomId },
    include: [
      {
        model: Profile,
        attributes: {
          exclude: ['username', 'email', 'bio', 'phone', 'dialCode', 'online', 'createdAt', 'updatedAt']
        }
      },
      {
        model: File
      }
    ],
    order: [['createdAt', 'DESC']], // Initial sort
    offset: Number(skip),
    limit: Number(limit),
    subQuery: false // Ensure the order is respected when using `offset` and `limit`
  });

  // Reverse the order to match `$sort: { createdAt: 1 }`
  return chats.reverse();
};
