const User = require('../Model/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const md5 = require('md5');

exports.RegisterUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const checkEmail = await User.findOne({ email });
        if (checkEmail) return res.status(400).json({ message: 'Email already exists' });

        const checkUsername = await User.findOne({ username });
        if (checkUsername) return res.status(400).json({ message: 'Username already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const hashedEmail = await md5(email);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            avatarImg: `https://gravatar.com/avatar/${hashedEmail}?d=mp`,
        });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully!' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.LoginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const CheckUser = await User.findOne({ email });
        if (!CheckUser) return res.status(400).json({ message: 'User does not exist!' });

        const CheckPassword = await bcrypt.compare(password, CheckUser.password);
        if (!CheckPassword) return res.status(400).json({ message: 'Email or password is incorrect!' });

        const token = jwt.sign({
            id: CheckUser._id,
            email: CheckUser.email,
            username: CheckUser.username,
        }, process.env.JWT_SECRET);

        const user = {
            uid: CheckUser._id,
            username: CheckUser.username,
            email: CheckUser.email,
            avatar: CheckUser.avatarImg,
            token,
        }

        res.status(200).json({ user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};