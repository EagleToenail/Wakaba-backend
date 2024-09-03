const { Inbox, Profile, Group, File } = require('../../models');
const { Op } = require('sequelize');

exports.find = async (queries, search = '') => {
  const inboxes = await Inbox.findAll({
    where: queries,
    include: [
      {
        model: Profile,
        as: 'profiles',
        attributes: {
          exclude: [] // Adjust if you want to exclude specific fields
        }
      },
      {
        model: File,
        as: 'file',
        attributes: {
          exclude: [] // Adjust if you want to exclude specific fields
        }
      }
    ],
    where: {
      [Op.or]: [
        {
          roomType: 'private',
          ownersId: {
            [Op.like]: `%${profileId}%` // Use LIKE if JSON is stored as a string
          }
        },

      ]
    },
    // order: [['updatedAt', 'DESC']], // Initial sort
  });
  
  return inboxes;
};

// order: [['content', 'time', 'DESC']]