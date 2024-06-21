const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const SECRET_KEY = process.env.SECRET_KEY;

// Registration
exports.register = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email, role } });
    if (existingUser) {
      return res.status(400).send('User already exists.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ firstName, lastName, email, password: hashedPassword, role, verified: false });
    await sendVerificationEmail(user.email, user.id);

    res.status(200).send('A verification email has been sent to ' + user.email + '.');
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Email verification
exports.verifyEmail = async (req, res) => {
  const token = req.query.token;
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    await User.update({ verified: true }, { where: { id: decoded.id } });
    res.status(200).send('Email verified successfully!');
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(400).send('Invalid token');
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Invalid credential.' });// done on purpose
    }
    if(user.verified === 0){
      return res.status(404).json({ message: 'user is not verified, verify email.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

async function sendVerificationEmail(email, userId) {
  try {
    const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });
    const verificationLink = `http://localhost:5173/verify-email?token=${token}`;
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Email Verification',
      html: `Please click the link to verify your email: <a href="${verificationLink}">Verify Email</a>`
    };

    await sendEmail(mailOptions);
  } catch (error) {
    console.error('Send verification email error:', error);
    throw new Error('Failed to send verification email.');
  }
}

