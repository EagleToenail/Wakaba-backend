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

  const calculateTimeDifference = (startTime, endTime,workingTime) => {
    const [hours1, minutes1, seconds1] = startTime.split(':').map(Number);
    const [hours2, minutes2, seconds2] = endTime.split(':').map(Number);
    const [hours3, minutes3, seconds3] = workingTime.split(':').map(Number);

    // Convert both times to total seconds
    const totalSeconds1 = hours1 * 3600 + minutes1 * 60 + seconds1;
    const totalSeconds2 = hours2 * 3600 + minutes2 * 60 + seconds2;
    const totalSeconds3 = hours3 * 3600 + minutes3 * 60 + seconds3;

    // Calculate the difference in seconds
    const differenceInSeconds = totalSeconds2 - totalSeconds1 + totalSeconds3;

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(differenceInSeconds / 3600);
    const minutes = Math.floor((differenceInSeconds % 3600) / 60);
    const seconds = differenceInSeconds % 60;

    return { hours, minutes, seconds };
};

module.exports = {

  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const encryptedPassword = encrypt(password);
      // Create a new user record
      // console.log(username, email, password, 'User');
      const user = await User.create({
        username,
        email,
        password: encryptedPassword,
        role_flag:'1',
      });
      // console.log(username, email, password, 'User');
      const setting = await Setting.create({
        userId: user.id,
        // If you want to override defaults or set other fields, include them here
      });
      // console.log(setting, 'setting');
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
      const storename = user.store_name;
      const role = user.role_flag;

      // // Send response;
      response({
        res,
        statusCode: 200,
        message: 'Successfully logged in',
        payload: { token: token, userId: userId,username:username,storename:storename ,role:role }, // -> send token to store in localStorage
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
      const { action, userId } = req.body;
      if (action == 'clock-in') {
        const now = new Date();
        // Format the date as YYYY-MM-DD
        const optionsDate = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Tokyo' };
        const currentDay = new Intl.DateTimeFormat('ja-JP', optionsDate).format(now).replace(/\//g, '-');

        // Format the time as HH:mm:ss
        const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Tokyo' };
        const currentTime = new Intl.DateTimeFormat('ja-JP', optionsTime).format(now);

        // Combine date and time
        const currentDateTime = `${currentDay} ${currentTime}`;
        // Get the start of the current day
        const todayStart = moment().startOf('day').format('YYYY-MM-DD');
        // console.log('================',userId,currentDay)

        let workingTimeRecord = await WorkingTime.findOne({
          where: {
            userId:userId,
            date: currentDay,
          }
        });
        // console.log('workingTimeRecord',workingTimeRecord)
        if (workingTimeRecord === null) {
          // console.log()
          workingTimeRecord = await WorkingTime.create({
            date:currentDay,
            userId:userId,
            loginTime: currentTime,
            workingTime: '0:0:0', // Initialize workingtime to "0:0:0"
          });
        } else {

            await WorkingTime.update(
              {loginTime:currentTime},
              { where: {
                 userId: userId,
                 date:currentDay,
                 } }
            );
        }
      }
      response({
        res,
        statusCode: 200,
        message: 'Successfully record logintime',
        payload: {},
      });
  },
//---------------------------------------logout time card-------------------------------
  async logoutTime(req, res) {
    try {
        const { action, userId } = req.body;
              // Get current date and time
              const now = new Date();
              // Format the date as YYYY-MM-DD
              const optionsDate = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Tokyo' };
              const currentDay = new Intl.DateTimeFormat('ja-JP', optionsDate).format(now).replace(/\//g, '-');
      
              // Format the time as HH:mm:ss
              const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Tokyo' };
              const currentTime = new Intl.DateTimeFormat('ja-JP', optionsTime).format(now);
      
              // Combine date and time
              const currentDateTime = `${currentDay} ${currentTime}`;

          let workingTimeRecord = await WorkingTime.findOne({
            where: {
              userId:userId,
              date:currentDay
            }
          });
       
        const time1 = workingTimeRecord.loginTime;
        const time2 = currentTime;
        const time3 = workingTimeRecord.workingTime;
        if(time1 == null || time1 == '') {
          time1 = currentTime;
        }
        // console.log('time1,time2',time1,time2);
        
        const { hours, minutes, seconds } = calculateTimeDifference(time1, time2 ,time3);
        const timeDifference = `${hours}:${minutes}:${seconds}`

          await WorkingTime.update(
            { logoutTime:currentTime, workingTime:timeDifference},
            { where: { 
              userId: userId,
              date:currentDay,
            } }
          );
      console.log('aaaaaaaaa',timeDifference);
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
  //show workingtime-----------------------workingtime-----------------------------------
   async workingTime(req, res) {
    // const currentMonth = new Date().getMonth() + 1;
    // const currentYear = new Date().getFullYear();
    // const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    
    // const dateToDayMap = {
    //     0: '日', // Sunday
    //     1: '月', // Monday
    //     2: '火', // Tuesday
    //     3: '水', // Wednesday
    //     4: '木', // Thursday
    //     5: '金', // Friday
    //     6: '土', // Saturday
    // };
    
    // const dates = Array.from({ length: daysInMonth }, (_, i) => {
    //     const date = new Date(currentYear, currentMonth - 1, i + 1);
    //     const dayOfWeek = date.getDay(); // Get the day of the week (0-6)
    //     return {
    //         formatted: `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${(i + 1).toString().padStart(2, '0')}`,
    //         dayOfWeek: dateToDayMap[dayOfWeek] // Map to Japanese short day name
    //     };
    // });
    
    // try {
    //     const workingTimes = await WorkingTime.findAll({
    //         include: [{
    //             model: User,
    //             attributes: ['full_name', 'store_name']
    //         }],
    //         where: {
    //             date: {
    //                 [Op.in]: dates.map(d => d.formatted)
    //             }
    //         },
    //         order: [['date', 'ASC']],
    //     });
    
    //     const users = [...new Set(workingTimes.map(entry => `${entry.User.full_name} - ${entry.User.store_name}`))];
    
    //     const results = dates.map(date => {
    //         const dailyEntries = users.map(user => {
    //             const entry = workingTimes.find(record => {
    //                 const fullNameStore = `${record.User.full_name} - ${record.User.store_name}`;
    //                 return record.date === date.formatted && fullNameStore === user;
    //             });
    //             return {
    //                 user: user,
    //                 loginTime: entry ? entry.loginTime : '00:00:00',
    //                 logoutTime: entry ? entry.logoutTime : '00:00:00',
    //                 workingTime: entry ? entry.workingTime : '00:00:00',
    //             };
    //         });
    //         return { date: date.formatted, dayOfWeek: date.dayOfWeek, entries: dailyEntries };
    //     });
    
    //     res.json(results);
    // } catch (error) {
    //     console.error('Error fetching working times:', error);
    //     res.status(500).json({ error: 'データ取得中にエラーが発生しました。' });
    // }
    const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();
const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
const currentDate = new Date(); // Get the current date
const todayFormatted = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

const dateToDayMap = {
    0: '日', // Sunday
    1: '月', // Monday
    2: '火', // Tuesday
    3: '水', // Wednesday
    4: '木', // Thursday
    5: '金', // Friday
    6: '土', // Saturday
};

const dates = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(currentYear, currentMonth - 1, i + 1);
    const dayOfWeek = date.getDay(); // Get the day of the week (0-6)
    return {
        formatted: `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${(i + 1).toString().padStart(2, '0')}`,
        dayOfWeek: dateToDayMap[dayOfWeek], // Map to Japanese short day name
        isFuture: date > currentDate // Check if the date is in the future
    };
});

try {
    const workingTimes = await WorkingTime.findAll({
        include: [{
            model: User,
            attributes: ['full_name', 'store_name']
        }],
        where: {
            date: {
                [Op.in]: dates.map(d => d.formatted)
            }
        },
        order: [['date', 'ASC']],
    });

    const users = [...new Set(workingTimes.map(entry => 
        `${entry.User.full_name} - ${entry.User.store_name}`
    ))];

    const results = dates.map(date => {
        const dailyEntries = users.map(user => {
            const entry = workingTimes.find(record => {
                const fullNameStore = `${record.User.full_name} - ${record.User.store_name}`;
                return record.date === date.formatted && fullNameStore === user;
            });
            
            // Determine values based on whether the entry exists and if it's today
            const isToday = date.formatted === todayFormatted;

            return {
                user: user,
                loginTime: entry ? entry.loginTime : (isToday ? '00:00:00' : null),
                logoutTime: entry ? entry.logoutTime : (isToday ? '00:00:00' : null),
                workingTime: entry ? entry.workingTime : (isToday ? '00:00:00' : null),
            };
        });
        return { date: date.formatted, dayOfWeek: date.dayOfWeek, entries: dailyEntries };
    });

    res.json(results);
} catch (error) {
    console.error('Error fetching working times:', error);
    res.status(500).json({ error: 'データ取得中にエラーが発生しました。' });
}
  },
  



}

