const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await User.findOne({username});

        if(!user){
            res.status(404).json({
                status: 'fail',
                message: 'user not found'
            })
        }
        const isCorrect = await bcrypt.compare(password, user.password)
        if(isCorrect){
            req.session.user = user;
        res.status(200).json({
            status: 'success',
            })
        } else {
            res.status(400).json({
                status: 'fail',
                message: 'incorrect username or password'
            })
        }
    } catch (e) {
        res.status(400).json({
            status: 'fail',
        });
    }
};

exports.signUp = async (req, res) => {
    const {username, password} = req.body;

    try {
        const hashPassword = await bcrypt.hash(password, 42);
        const newUser = User.create({
            username,
            password: hashPassword,
        });
        req.session.user = newUser;
        res.status(201).json({
            status: 'success',
            data : {
                user: newUser
            }
        })
    } catch (e) {
        res.status(400).json({
            status: 'fail',
        });
    }
};