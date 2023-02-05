const auth_Model = require("../models/userModel")

class userController {
    static userRegistration = async (req, res) => {
        const { name, age, email, Role } = req.body
        if (name, age, email, Role) {
            const isemail = await auth_Model.findOne({ email: email })
            if (!isemail) {
                const new_user = auth_Model({
                    name: name,
                    age: age,
                    email: email,
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
        const { email, Role } = req.body
        const isemail = await auth_Model.findOne({ email: email })
        if (!isemail) {
            res.status(404).json({
                "message": "Email not found. First register to create new account"
            })
        }
        else {
            if (isemail.Role != Role) {
                res.status(404).json({
                    "message": "Email not found. First register to create new account"
                })
            }
            else {
                res.status(200).json({
                    "message":"Logged In successfully!"
                })
            }
        }
    }
}

module.exports = userController