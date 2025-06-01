const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const Pdf = require('../models/pdfModal')

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

exports.signup = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const user = await User.create({ email, username, password });
        console.log("rrrrrrrrr",user);
        

        const token = generateToken(user);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000
        });

        res.status(201).json({ message: 'Signup Successfuly' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    console.log(email, password, "reached backedn");


    try {
        const user = await User.findOne({ email });
        console.log("eeeeeeeeee",user);
        
        if (!user || !(await user.matchPassword(password))) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }


        const token = generateToken(user);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000
        });

        res.json({ message: 'Login successful' });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};



exports.uploadPdf = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        console.log("File upload route hit.");
        const newPdf = new Pdf({
            userId: req.user._id,
            path: req.file.path,
            filename: req.file.filename,
        });

        await newPdf.save();
        res.status(201).json({ message: "File uploaded successfully!", pdf: newPdf });
    } catch (error) {
        console.error('Error during file upload:', error);
        res.status(500).json({ message: 'Failed to upload file' });
    }
};


exports.getUserPdfs = async (req, res) => {
    try {
        console.log(req.user._id,"user id here inside getpdf");
        
        const pdfs = await Pdf.find({ userId: req.user._id });
        res.status(200).json(pdfs);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch PDFs" });
    }
}





exports.logout = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'Lax',
        secure: process.env.NODE_ENV === 'production',
    });
    return res.status(200).json({ message: 'Logged Out Successfully' })
}