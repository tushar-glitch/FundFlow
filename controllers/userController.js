const auth_Model = require("../models/userModel")

class userController {
    static userRegistration = async (req, res) => {
        const { name, age, email, password, Role } = req.body
        if (name, age, email, password, Role) {
            const isemail = await auth_Model.findOne({ email: email })
            if (!isemail) {
                const new_user = auth_Model({
                    name: name,
                    age: age,
                    email: email,
                    password:password,
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
        const isemail = await auth_Model.findOne({ email: email })
        if (!isemail) {
            res.status(404).json({
                "message": "Email not found. First register to create new account"
            })
        }
        else {
            if (isemail.password != password) {
                res.status(404).json({
                    "message": "Invalid password"
                })
            }
            else if(email&&password) {
                res.status(200).json({
                    "message":"Logged In successfully!"
                })
            }
            else {
                res.status(403).json({
                    "message":"Please fill all the fields"
                })
            }
        }
    }
}

module.exports = userController