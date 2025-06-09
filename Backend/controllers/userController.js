const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const Pdf = require('../models/pdfModal');
const statusCodes = require('../utils/statusCodes');

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

exports.signup = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const user = await User.create({ email, username, password });
        const token = generateToken(user);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000,
        });

        res.status(statusCodes.CREATED).json({ message: 'Signup Successfully' });
    } catch (error) {
        res.status(statusCodes.BAD_REQUEST).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;


    try {
        const user = await User.findOne({ email });

        if (!user || !(await user.matchPassword(password))) {
            return res.status(statusCodes.BAD_REQUEST).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000,
        });

        res.status(statusCodes.OK).json({ message: 'Login successful' });

    } catch (error) {
        res.status(statusCodes.SERVER_ERROR).json({ message: 'Server error' });
    }
};

exports.uploadPdf = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(statusCodes.BAD_REQUEST).json({ message: 'No file uploaded' });
        }

        console.log("File upload route hit.");
        const newPdf = new Pdf({
            userId: req.user._id,
            path: req.file.path,
            filename: req.file.filename,
        });

        await newPdf.save();
        res.status(statusCodes.CREATED).json({ message: "File uploaded successfully!", pdf: newPdf });
    } catch (error) {
        console.error('Error during file upload:', error);
        res.status(statusCodes.SERVER_ERROR).json({ message: 'Failed to upload file' });
    }
};

exports.getUserPdfs = async (req, res) => {
    try {
        console.log(req.user._id, "user id here inside getpdf");

        const pdfs = await Pdf.find({ userId: req.user._id });
        res.status(statusCodes.OK).json(pdfs);
    } catch (error) {
        res.status(statusCodes.SERVER_ERROR).json({ message: "Failed to fetch PDFs" });
    }
}

exports.logout = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'Lax',
        secure: process.env.NODE_ENV === 'production',
    });
    return res.status(statusCodes.OK).json({ message: 'Logged Out Successfully' })
}
