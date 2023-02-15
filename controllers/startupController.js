const auth_Model = require("../models/userModel")
const bcrypt = require('bcryptjs')
const startup_model = require("../models/startupmodel")
class startupController {
    static poststartupdetails = async (req, res) => {
        const { name, type_of_company, est_year, revenue_of_last_year, video_link, evaluation_of_last_year, founder, co_founder, location, ask_money, give_equity} = req.body
        if (name && type_of_company && est_year && revenue_of_last_year && unique_feature && video_link && evaluation_of_last_year && founder && co_founder && location && ask_money && give_equity) {
            const new_startup = startup_model({
                name: name,
                type_of_company: type_of_company,
                est_year: est_year,
                revenue_of_last_year: revenue_of_last_year,
                unique_feature: unique_feature,
                video_link: video_link,
                evaluation_of_last_year: evaluation_of_last_year,
                founder:founder,
                co_founder:co_founder,
                location: location,
                ask_money:ask_money,
                give_equity:give_equity
            })
            const save_startup = await new_startup.save()
            res.status(200).json({
                message:"New Startup created!"
            })
        }
        else {
            res.status(403).json({
                message:"Please fill all the fields"
            })
        }
    }
    static getstartupdetails = async (req, res) => {
        const allstartups = await startup_model.find()
        res.send(allstartups)
        // var startupnames=[]
        // for (let i = 0; i < allstartups.length; ++i){
        //     console.log(allstartups[i].name) 
        //     startupnames.push_back(allstartups[i].name)
        // }
    }
}

module.exports = startupController