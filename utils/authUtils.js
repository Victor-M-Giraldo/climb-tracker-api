import jwt from 'jsonwebtoken';

function issueJWT(user) {
  const payload = {
    sub: user.id,
    iat: Math.floor(Date.now() / 1000),
  };

  const expiresIn = '7d';

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });

  return {
    expiresIn,
    token,
  };
}

export { issueJWT };
