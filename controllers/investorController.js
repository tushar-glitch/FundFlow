const auth_Model = require("../models/userModel")

class investorController {
    static patch_investor = async (req, res) => {
        const { name, age, experience, no_of_companies_funded, total_money_funded } = req.body
        if (name&&age&&experience&&no_of_companies_funded&&total_money_funded) {
            const isname = await auth_Model.findOne({ name: name })
            if (!isname) {
                res.status(404).json({
                    "message": "User not found!"
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
    static get_investor = async (req, res) => {
        const investor = await auth_Model.find()
        const investorlist = [{}]
        for (let i = 0; i < investor.length; ++i){
            if (investor[i].Role == 'Investor')
                investorlist.push(investor[i])
        }
        res.send(investorlist)
    }
}

module.exports = investorController