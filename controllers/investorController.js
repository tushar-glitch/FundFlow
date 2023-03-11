const auth_Model = require("../models/userModel")
const jwt = require("jsonwebtoken")
const secretKey = 'randomSecret'
class investorController {
    static patch_investor = async (req, res) => {
        const { name, age, experience, no_of_companies_funded, total_money_funded } = req.body
        if (name && age && experience && no_of_companies_funded && total_money_funded) {
            const isname = await auth_Model.findOne({ name: name })
            if (!isname) {
                res.status(404).json({
                    "message": "User not found!"
                })
            }
            else {
                console.log(isname);
                Object.assign(isname, req.body)
                await isname.save()
                console.log(isname);
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
    static get_investor = async (req, res) => {
        const investor = await auth_Model.find()
        const investorlist = [{}]
        for (let i = 0; i < investor.length; ++i) {
            if ((investor[i].Role).toLowerCase == 'investor')
                investorlist.push(investor[i])
        }
        res.send(investorlist)
    }
    static single_investor_details = async (req, res) => {
        const bearerheader = req.headers['authorization']
        const tokenArr = bearerheader.split(' ')
        const token = tokenArr[1]
        const decode = jwt.verify(token, secretKey)
        const investor_details = await auth_Model.find({ email: decode.email })
        res.status(200).json(investor_details)
    }
}

module.exports = investorController