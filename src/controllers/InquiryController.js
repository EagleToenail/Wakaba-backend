const { Inquery } = require('../models');
module.exports = {
    async create(req, res) {
        const { inquiryphoneCount, inquiryvisitCount, userId } = req.body;
        console.log(inquiryphoneCount, inquiryvisitCount, userId);
      
        const [inquiry, created] = await Inquery.findOrCreate({
          where: { user_id: userId },
          defaults: {
            telcount: inquiryphoneCount,
            visitcount: inquiryvisitCount
          }
        });
      
        if (created) {
          console.log(`New inquiry created for user ${userId}`);
        } else {
          console.log(`Updating existing inquiry for user ${userId}`);
          inquiry.telcount = inquiryphoneCount;
          inquiry.visitcount = inquiryvisitCount;
          await inquiry.save();
        }
      
        return res.status(201).send({ message: "ok" });
      },
    
      async read(req, res) {
        const { userId } = req.body;
      
        const inquiry = await Inquery.findOne({
          where: { user_id: userId }
        });
      
        if (!inquiry) {
          return res.status(404).send({ message: "Inquiry not found" });
        }
      
        return res.status(200).send({
          inquiryphoneCount: inquiry.telcount,
          inquiryvisitCount: inquiry.visitcount
        });
      }

    
}