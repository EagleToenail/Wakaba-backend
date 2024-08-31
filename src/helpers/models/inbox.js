const { Inbox, Profile, Group, File } = require('../../models');

exports.find = async (queries, search = '') => {
  const inboxes = await Inbox.findAll({
    where: queries,
    include: [
      {
        model: Profile,
        as: 'owners',
        attributes: {
          exclude: [] // Adjust if you want to exclude specific fields
        }
      },
      {
        model: Group,
        as: 'group',
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
          '$owners.fullname$': {
            [Op.iLike]: `%${search}%`
          }
        },
        {
          roomType: 'group',
          '$group.name$': {
            [Op.iLike]: `%${search}%`
          }
        }
      ]
    },
    order: [['content', 'time', 'DESC']]
  });

  return inboxes;
};
