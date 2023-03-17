const auth_Model = require("../models/userModel")
const bcrypt = require('bcryptjs')
const startup_model = require("../models/startupmodel")
const jwt = require('jsonwebtoken')
const secretKey = 'randomSecret'
class startupController {
    static poststartupdetails = async (req, res) => {
        const { name, type_of_company, est_year, revenue_of_last_year, video_link, evaluation_of_last_year, founder, co_founder, location, ask_money, give_equity } = req.body
        if (name && type_of_company && est_year && revenue_of_last_year && video_link && evaluation_of_last_year && founder && co_founder && location && ask_money && give_equity) {
            const bearerheader = req.headers['authorization']
            const tokenArr = bearerheader.split(' ')
            const token = tokenArr[1]
            const decode = jwt.verify(token, secretKey)
            const new_startup = startup_model({
                name: name,
                type_of_company: type_of_company,
                est_year: est_year,
                revenue_of_last_year: revenue_of_last_year,
                video_link: video_link,
                evaluation_of_last_year: evaluation_of_last_year,
                founder: founder,
                co_founder: co_founder,
                location: location,
                ask_money: ask_money,
                give_equity: give_equity,
                leaderboard: [{}],
                isstart: false,
                email: decode.email
            })
            const isemaili = await startup_model.findOne({ email: decode.email })
            if (!isemaili) {
                res.status(400).json({
                    message: "Startup with this email does not exist!"
                })
            }
            else {
                const save_startup = await new_startup.save()
                res.status(200).json({
                    message: "New Startup created!"
                })
            }
        }
        else {
            res.status(403).json({
                message: "Please fill all the fields"
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
    static start_auction = async (req, res) => {
        const { name } = req.body
        const isname = await startup_model.findOne({ name: name })
        console.log(isname);
        if (!isname) {
            res.status(404).json({
                message: "Startup not found!"
            })
        }
        else {
            const bearerheader = req.headers['authorization']
            const tokenArr = bearerheader.split(' ')
            const token = tokenArr[1]
            const decode = jwt.verify(token, secretKey)
            console.log(isname.email);
            if (isname.email == decode.email) {
                await startup_model.updateOne(
                    { name: isname.name },
                    { $set: { isstart: true } }
                );
                res.status(200).json({
                    message: "Auction started!"
                })
            }
            else {
                res.status(403).json({
                    message: "You are not authorized to start the auction!"
                })
            }
        }
    }
    static end_auction = async (req, res) => {
        const { name } = req.body
        const isname = await startup_model.findOne({ name: name })
        console.log(isname);
        if (!isname) {
            res.status(404).json({
                message: "Startup not found!"
            })
        }
        else {
            const bearerheader = req.headers['authorization']
            const tokenArr = bearerheader.split(' ')
            const token = tokenArr[1]
            const decode = jwt.verify(token, secretKey)
            console.log(isname.leaderboard);
            const data = isname.leaderboard;
            data.sort((a, b) => b.evaluation - a.evaluation);
            console.log(data);
            if (isname.email == decode.email) {
                await startup_model.updateOne(
                    { name: isname.name },
                    { $set: { isstart: false } }
                );
                res.status(200).json({
                    message: "Auction ended!",
                    leaderboard: data
                })
            }
            else {
                res.status(403).json({
                    message: "You are not authorized to end the auction!"
                })
            }
        }
    }
    static single_startup_details = async (req, res) => {
        const bearerheader = req.headers['authorization']
        const tokenArr = bearerheader.split(' ')
        const token = tokenArr[1]
        const decode = jwt.verify(token, secretKey)
        const startup_details = await startup_model.find({ email: decode.email })
        res.status(200).json(startup_details)
    }
    static patch_startup = async (req, res) => {
        const { name, type_of_company, est_year, revenue_of_last_year, video_link, evaluation_of_last_year, founder, co_founder, location, ask_money, give_equity } = req.body
        if (name&& type_of_company&& est_year&& revenue_of_last_year&& video_link&& evaluation_of_last_year&& founder&& co_founder&& location&& ask_money&& give_equity) {
            const isname = await startup_model.findOne({ name: name })
            if (!isname) {
                res.status(404).json({
                    "message": "Startup not found!"
                })
                
            }
            else {
                Object.assign(isname, req.body)
                await isname.save()
                res.status(200).json({
                    message:"Fields updated successfully!"
                })
            }
        }
        else {
            res.status(403).json({
                "message": "Please enter all the fields"
            })
            console.log('Field empty');
        }
    }
}

module.exports = startupController