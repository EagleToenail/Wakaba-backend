const { where } = require('sequelize');
const { Scheduler,Profile } = require('../models');
module.exports = {
    async create(req, res) {
        try {
            const { item, userId } = req.body;
            const { start_date, end_date, text, id } = item;
            
            
            
            const profile = await Profile.findOne({
              where: { user_id: userId }
            });
            
            if (profile) {
              const store_name = profile.store_name;
                console.log(store_name)
              Scheduler.belongsTo(Profile, { foreignKey: 'user_id', onDelete: 'CASCADE' });
              const event = await Scheduler.create({
                id,
                store_name: store_name,
                user_id: userId,
                start_date,
                end_date,
                text
              }, {
                include: [{
                  model: Profile,
                  where: { user_id: userId },
                  required: true
                }]
              });
          
              console.log(event);
          
              res.status(201).json({ message: 'Event created successfully' });
            } else {
              res.status(404).json({ message: 'Profile not found' });
            }
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating event' });
          }
    },
    
    async read(req, res) {
      try {
        const { userId } = req.body;
        if (!userId) {
          res.status(400).json({ message: 'Invalid user ID' });
          return;
        }
    
        const profile = await Profile.findOne({
          where: { user_id: userId }
        });
        if (!profile) {
          res.status(404).json({ message: 'Profile not found' });
          return;
        }
    
        const storeName = profile.store_name;
        console.log("store_name", storeName);
    
        const schedulers = await Scheduler.findAll({
          attributes: ['id', 'text', 'start_date', 'end_date'],
          where: { store_name: storeName }
        });
        if (!schedulers) {
          res.status(404).json({ message: 'Schedulers not found' });
          return;
        }
    
        console.log(schedulers, "schedulers");
        res.status(201).json({ schedulers: schedulers });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error reading event' });
      }
    },

    async update(req, res) {
      console.log(testtest)

    }
}