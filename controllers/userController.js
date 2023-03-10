const auth_Model = require("../models/userModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const otp_model = require("../models/otpmodel")
const secretKey = "randomSecret"
const nodemailer = require('nodemailer')
const { response } = require("express")
const startup_model = require("../models/startupmodel")
class userController {
    static sendotp = async (email, res) => {
        const otp = Math.floor(((Math.random() * 9000) + 1000))
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "tusharc20001@gmail.com",
                pass: "udfmjqntdpovoaoi",
            },
        });
        const mailoptions = {
            from: "tusharc20001@gmail.com",
            to: email,
            subject: "Verify your email",
            html: `Your otp for verification is <b>${otp}</b>. This code will expire in an <b>1 hour</b>`
        }
        const newOtpVerfication = await new otp_model({
            email: email,
            otp: otp,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000
        })
        await newOtpVerfication.save()
        await transporter.sendMail(mailoptions)
    }

    static verifyotp = async (req, res) => {
        const { email, user_otp } = req.body
        if (email && user_otp) {
            const otprecords = await otp_model.find({
                email: email
            })

            if (otprecords.length == 0) {
                res.status(403).json({
                    message: "Account does not exist or is already verified!"
                })
            }
            else {
                const expiresAt = otprecords[otprecords.length - 1].expiresAt
                const otp = otprecords[otprecords.length - 1].otp
                console.log(otp);
                console.log(user_otp);
                if (expiresAt < Date.now()) {
                    res.status(403).json({
                        message: "Otp has expired!"
                    })
                }
                else {
                    if (user_otp == otp) {
                        res.status(200).json({
                            message: "Your account has been verified!"
                        })
                    }
                    else {
                        res.status(403).json({
                            message: "Wrong otp!"
                        })
                    }
                }
            }
        }
        else {
            res.status(404).json({
                message: "Please provide email and otp"
            })
        }
    }

    static userRegistration = async (req, res) => {
        const { name, email, password, Role } = req.body
        if (name && email && password && Role) {
            if (Role.toLowerCase() == 'pitcher') {
                console.log('Hey');
                const isemailinstartup = await startup_model.findOne({ email: email })
                if (!isemailinstartup) {
                    const hashpass = await bcrypt.hash(password,10)
                    const newstartupuser = startup_model({
                        name: name,
                        email: email,
                        password: hashpass,
                        Role: Role,
                        isverified:false
                    })
                    const saveuser = await newstartupuser.save()
                    userController.sendotp(email, res)
                    res.status(200).json({
                        message:"Otp has been sent to your email"
                    })
                }
                else {
                    res.status(403).json({
                        message:"Email is already in use!"
                    })
                }
            }
            else {
                const isemailininvestor = await auth_Model.findOne({ email: email })
                console.log('hey');
                if (!isemailininvestor) {
                    const hashpass = await bcrypt.hash(password,10)
                    const newinvestor = auth_Model({
                        name: name,
                        email: email,
                        password: hashpass,
                        Role: Role,
                        isverified:false
                    })
                    const saveuser = await newinvestor.save()
                    userController.sendotp(email, res)
                    res.status(200).json({
                        message:"Otp has been sent to your email"
                    })
                }
                else {
                    res.status(403).json({
                        message:"Email is already in use!"
                    })
                }
            }
        }
        else {
            res.status(400).json({
                message:"Please enter all the fields!"
            })
        }
    }


    static userLogin = async (req, res) => {
        const { email, password, role } = req.body
        if (email && password && role) {
            if (role.toLowerCase() == 'pitcher') {
                const isuser = await startup_model.findOne({ email: email })
                if (!isuser) {
                    res.status(403).json({
                        "message": "Email not found"
                    })
                }
                else {
                    console.log(isuser);
                    const ispasscorrect = await bcrypt.compare(password, isuser.password)
                    if (!ispasscorrect) {
                        res.status(403).json({
                            "message": "Incorrect password"
                        })
                    }
                    else {
                        if ((isuser.Role).toLowerCase() == role.toLowerCase()) {
                            const token = jwt.sign({ email, password }, secretKey, { expiresIn: '1h' })
                            if ((isuser.Role).toLowerCase() == 'pitcher') {
                                const startupdetails = await startup_model.find({ email: email })
                                res.status(200).json({
                                    token: token,
                                    startupdetails: startupdetails
                                })
                            }
                            else {
                                res.status(200).json({
                                    "token": token
                                })
                            }
                        }
                        else {
                            res.status(403).json({
                                message: "Invalid role"
                            })
                        }
                    }
                }
            }
            else {
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
                        if ((isuser.Role).toLowerCase() == role.toLowerCase()) {
                            const token = jwt.sign({ email, password }, secretKey, { expiresIn: '1h' })
                                res.status(200).json({
                                    "token": token
                                })
                        }
                        else {
                            res.status(403).json({
                                message: "Invalid role"
                            })
                        }
                    }
                }
            }
        }
        else {
            res.status(403).json({
                "message": "Please enter all the fields"
            })
        }
    }
}

module.exports = userController