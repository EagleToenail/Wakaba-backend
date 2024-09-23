const { User } = require('../models');
const { Profile } = require('../models');
const { Setting } = require('../models');
const { WorkingTime } = require('../models');

const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const response = require('../helpers/response');

const encrypt = require('../helpers/encrypt');
const decrypt = require('../helpers/decrypt');
const moment = require('moment'); // For date manipulation

  // Helper function to create an array of days for the current month
  const createDaysArray = (month, year) => {
    const daysArray = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get the number of days in the month
  
    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push({
        day,
        loginTime: null,
        logoutTime: null,
        workingTime: 0,
      });
    }
  
    return daysArray;
  };

module.exports = {

  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const encryptedPassword = encrypt(password);
      // Create a new user record
      console.log(username, email, password, 'User');
      const user = await User.create({
        username,
        email,
        password: encryptedPassword,
      });
      console.log(username, email, password, 'User');
      const setting = await Setting.create({
        userId: user.id,
        // If you want to override defaults or set other fields, include them here
      });
      console.log(setting, 'setting');
      const profile = await Profile.create({
        user_id: user.id, // Ensure userId is set
        username,
        email,
        fullname: username, // Map username to fullname
      });
      const Worktime = await WorkingTime.create({
        userId: user.id,
        loginTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        workingTime: '0', // Initialize workingtime to "0"
        // If you want to override defaults or set other fields, include them here
      });

      // generate access token
      const token = jwt.sign({ username: username }, 'shhhhh');


      response({
        res,
        statusCode: 201,
        message: 'Successfully created a new account',
        payload: token,
      });
    } catch (error0) {
      response({
        res,
        statusCode: error0.statusCode || 500,
        success: false,
        message: error0.message,
      });
    }
  },

  async login(req, res) {
    try {
      // console.log('================')
      const errData = {};
      const { ID, password } = req.body;
      const username = ID;
      // console.log('================', username, password)
      // console.log('password', encrypt(password))

      // Find user by username or email
      const user = await User.findOne({
        where: {
          [Op.or]: [
            { email: username },
            { username },
          ],
        },
      });

      // If user not found or invalid password
      if (!user) {
        errData.statusCode = 401;
        errData.message = 'Username or email not registered';

        throw errData;
      }

      // decrypt password
      decrypt(password, user.password);
      // generate access token
      const token = jwt.sign({ username: user.username }, 'shhhhh');
      const userId = user.id;

      // // Send response;
      response({
        res,
        statusCode: 200,
        message: 'Successfully logged in',
        payload: { token: token, userId: userId }, // -> send token to store in localStorage
      });
    } catch (error0) {
      response({
        res,
        statusCode: error0.statusCode || 500,
        success: false,
        message: error0.message,
      });
    }
  },
//-------------------------------------login time card---------------------------------------------
  async loginTime(req, res) {
    try {
      const { action, userId } = req.body;
      if (action == 'clock-in') {
        // Get the start of the current day
        const todayStart = moment().startOf('day').format('YYYY-MM-DD');
        console.log('================',todayStart)

        let workingTimeRecord = await WorkingTime.findOne({
          where: {
            userId:userId
          }
        });
        if (workingTimeRecord == null) {
          workingTimeRecord = await WorkingTime.create({
            loginTime: moment().format('YYYY-MM-DD HH:mm:ss'),
            workingTime: '0', // Initialize workingtime to "0"
            userId,
          });
        } else {
          // If a record exists, check if it's a new day
          const lastLoginDate = moment(workingTimeRecord.loginTime).startOf('day');
          if (!lastLoginDate.isSame(todayStart, 'day')) {
            await WorkingTime.update(
              { workingTime: '0' , loginTime: moment().format('YYYY-MM-DD HH:mm:ss')},
              { where: { userId: userId } }
            );
          }
        }
      }
      // working time
      let workingTimeRecord = await WorkingTime.findOne({
        where: {
          userId:userId
        }
      });
      console.log(workingTimeRecord,'workingTimeRecord')
      // // Send response;
      response({
        res,
        statusCode: 200,
        message: 'Successfully record logintime',
        payload: {},
      });
    } catch (error0) {
      response({
        res,
        statusCode: error0.statusCode || 500,
        success: false,
        message: error0.message,
      });
    }
  },
//---------------------------------------logout time card-------------------------------
  async logoutTime(req, res) {
    try {
        const { action, userId } = req.body;
          // Get the start of the current day
          let workingTimeRecord = await WorkingTime.findOne({
            where: {
              userId:userId
            }
          });
          console.log(workingTimeRecord.loginTime,'logintime')
          // Current time
          const currentTime = moment();
          const loginTime = moment(workingTimeRecord.loginTime, 'YYYY-MM-DD HH:mm:ss');
          const timeDifference = currentTime.diff(loginTime);
          console.log('datas',currentTime, loginTime,timeDifference)
          // Calculate the new working time by adding the difference
          const workingTime = parseFloat(workingTimeRecord.workingTime) + parseFloat(timeDifference);
          await WorkingTime.update(
            { workingTime: workingTime , logoutTime: moment().format('YYYY-MM-DD HH:mm:ss')},
            { where: { userId: userId } }
          );
          // console.log('aaaaaaaaa',WorkingTime);
        // // Send response;
        response({
          res,
          statusCode: 200,
          message: 'Successfully record logintime',
          payload: {},
        });

    } catch (error0) {
      response({
        res,
        statusCode: error0.statusCode || 500,
        success: false,
        message: error0.message,
      });
    }
  },
  //show workingtime
  async workingTime(req, res) {
    try {
      const startDate = new Date();
      startDate.setDate(1); // First day of the current month
      startDate.setHours(0, 0, 0, 0); // Reset to start of the day
  
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1); // First day of next month
      endDate.setDate(1);
      endDate.setHours(0, 0, 0, 0); // Reset to start of the day
  
      // Fetching data for the current month with user details
      const workingTimes = await WorkingTime.findAll({
        where: {
          loginTime: {
            [Op.between]: [startDate, endDate],
          },
        },
        include: [
          {
            model: User,
            attributes: ['store_name', 'full_name'], // Include store_name and full_name from User
          },
        ],
      });
  
      // Get the days array for the current month
      const daysArray = createDaysArray(startDate.getMonth(), startDate.getFullYear());
  
      // Structuring the data
      const userWorkingTimes = workingTimes.reduce((acc, entry) => {
        const userId = entry.userId;
        const storeName = entry.User.store_name; // Get store name from included user data
        const fullName = entry.User.full_name; // Get full name from included user data
  
        if (!acc[userId]) {
          acc[userId] = { userId, store_name: storeName, full_name: fullName, days: daysArray.map(day => ({ ...day })) }; // Create a copy of days array
        }
  
        // Determine the day of the month from the login time
        const dayOfMonth = new Date(entry.loginTime).getDate();
  
        // Update the specific day's working time details
        const dayEntry = acc[userId].days.find(day => day.day === dayOfMonth);
        dayEntry.loginTime = entry.loginTime;
        dayEntry.logoutTime = entry.logoutTime;
  
        // Calculate working time if both times exist
        if (entry.loginTime && entry.logoutTime) {
          const loginDate = new Date(entry.loginTime);
          const logoutDate = new Date(entry.logoutTime);
          const duration = (logoutDate - loginDate) / 1000 / 60; // Duration in minutes
          dayEntry.workingTime = duration; // Store calculated working time
        }
  
        return acc;
      }, {});
  
      // Prepare the response in the desired format
      const response = Object.values(userWorkingTimes);

    console.log('response',response)
      res.json(response);
    } catch (error0) {
      response({
        res,
        statusCode: error0.statusCode || 500,
        success: false,
        message: error0.message,
      });
    }
  },



}


// [
//   {
//     "userId": "user1",
//     "store_name": "aaa",
//     "full_name": "John Doe",
//     "days": [
//       {
//         "day": 1,
//         "loginTime": "2024-09-01T09:00:00Z",
//         "logoutTime": "2024-09-01T17:00:00Z",
//         "workingTime": 480
//       },
//       {
//         "day": 2,
//         "loginTime": "2024-09-02T09:15:00Z",
//         "logoutTime": "2024-09-02T17:30:00Z",
//         "workingTime": 525
//       },
//       // ... more days
//     ]
//   },
//   {
//     "userId": "user2",
//     "store_name": "aaa",
//     "full_name": "Jane Smith",
//     "days": [
//       {
//         "day": 1,
//         "loginTime": "2024-09-01T10:00:00Z",
//         "logoutTime": "2024-09-01T18:00:00Z",
//         "workingTime": 480
//       },
//       // ... more days
//     ]
//   }
// ]