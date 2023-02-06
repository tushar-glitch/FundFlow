const auth_Model = require("../models/userModel")
const bcrypt = require('bcryptjs')
class userController {
    static userRegistration = async (req, res) => {
        const { name, age, email, password, Role } = req.body
        if (name, email, password, Role) {
            const isemail = await auth_Model.findOne({ email: email })
            if (!isemail) {
                const newpass = await bcrypt.hash(password, 10)
                const new_user = auth_Model({
                    name: name,
                    email: email,
                    password:newpass,
                    Role: Role
                })
                const save_user = await new_user.save()
                res.status(200).json({
                    "message": "New account created!"
                })
            }
            else {
                res.status(403).json({
                    "message": "User already exist!"
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
    static userLogin = async (req, res) => {
        const { email, password } = req.body
        if (email && password) {
            const isuser = await auth_Model.findOne({ email: email })
            if (!isuser) {
                res.status(403).json({
                    "message": "Email not found"
                })
            }
            else {
                const ispasscorrect = await bcrypt.compare(password, isuser.password)
                if (!ispasscorrect) {
                    res.status(403).json({
                        "message": "Incorrect password"
                    })
                }
                else {
                    res.status(200).json({
                        "message":"Login successfull"
                    })
                }
            }
        }
        else {
            res.status(403).json({
                "message":"Please enter all the fields"
            })
        }
    }
}

module.exports = userController