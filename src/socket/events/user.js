const {Profile} = require('../../models');

module.exports = (socket) => {
  // user connect
  socket.on('user/connect', async (userId) => {
    socket.join(userId);
    socket.broadcast.to(userId).emit('user/inactivate', true);

    /* eslint-disable */
    // store userId in socket object
    socket.userId = userId;
    /* eslint-enable */

    try {
      // Update user's online status in the database
      await Profile.update({ online: 1 }, {
        where: { user_id:userId }
      });

      // Notify other clients about the user connection
      socket.broadcast.emit('user/connect', userId);
    } catch (error) {
      console.error('Error updating user status on connect:', error);
    }

  });

  socket.on('disconnect', async () => {
    const { userId } = socket;
    try {
      // Update user's online status in the database
      await Profile.update({ online: 0 }, {
        where: { user_id:userId }
      });

      // Notify other clients about the user disconnection
      socket.broadcast.emit('user/disconnect', userId);
    } catch (error) {
      console.error('Error updating user status on explicit disconnect:', error);
    }
  });

  socket.on('user/disconnect', async () => {
    const { userId } = socket;
    try {
      // Update user's online status in the database
      await Profile.update({ online: 0 }, {
        where: { user_id: userId }
      });

      // Notify other clients about the user disconnection
      socket.broadcast.emit('user/disconnect', userId);
    } catch (error) {
      console.error('Error updating user status on explicit disconnect:', error);
    }
  });
};
