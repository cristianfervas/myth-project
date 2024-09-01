const jwt = require('jsonwebtoken');

const loginUser = async (user_name, password) => {
  const user = await User.findOne({ where: { user_name } });

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  user.last_login = new Date();
  await user.save();

  const token = jwt.sign(
    { user_id: user.user_id, user_name: user.user_name },
    process.env.JWT_SECRET,
    { expiresIn: '1h' },
  );

  return { token, user };
};

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
};

const handleFailedLogin = async (user) => {
  user.failed_login_attempts += 1;

  if (user.failed_login_attempts >= 5) {
    user.block_account_time = new Date(Date.now() + 30 * 60 * 1000);
  }

  await user.save();
};

module.exports = { loginUser, verifyToken, handleFailedLogin };
