const auth_Model = require("../models/userModel")
const bcrypt = require('bcryptjs')
const startup_model = require("../models/startupmodel")
const jwt = require('jsonwebtoken')
const secretKey = "randomSecret"
class biddingController {
    static postbid = async (req, res) => {
        var { name, evaluation } = req.body
        if (name && evaluation) {
            const isstartup = await startup_model.findOne({ name })
            if (!isstartup) {
                res.status(404).json({
                    message: "Sorry no startup found with this name"
                })
            }
            else if (!isstartup.isstart) {
                res.status(403).json({
                    message:"Auction is not started yet"
                })
            }
            else {
                const bearerheader = req.headers['authorization']
                const tokenArr = bearerheader.split(' ')
                const token = tokenArr[1]
                const decode = jwt.verify(token, secretKey)
                evaluation = Number(evaluation)
                const bid = {
                    email: decode.email,
                    evaluation: Number(evaluation)
                }
                let isemailpresent = false;
                Boolean(isemailpresent)
                for (let i = 0; i < isstartup.leaderboard.length; i++) {
                    if (isstartup.leaderboard[i].email == decode.email) {
                        isemailpresent = true
                    }
                }
                if (!isemailpresent) {
                    await startup_model.updateOne(
                        { name: isstartup.name },
                        { $push: { leaderboard: bid } },
                    );
                }
                else {
                    startup_model.findOneAndUpdate(
                        { 'leaderboard.email': decode.email },
                        { $set: { 'leaderboard.$.evaluation': Number(evaluation) } },
                        { upsert: true, new: true },
                        (err, doc) => {
                            if (err) {
                                console.error(err);
                                res.status(500).send('Error updating data');
                            } else {
                                var rank
                                doc.leaderboard.sort((a, b) => b.evaluation - a.evaluation);
                                console.log(doc.leaderboard);
                                for (let i = 0; i < doc.leaderboard.length; i++) {
                                    if (doc.leaderboard[i].email == decode.email) {
                                        rank=i+1
                                    }
                                }
                                res.json({ rank: rank })
                            }
                        }
                    );
                }
            }
        }
        else {
            res.status(403).json({
                message: "Please provide name and evaluation"
            })
        }
    }
}

module.exports = biddingController