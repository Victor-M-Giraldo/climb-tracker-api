import passport from 'passport';
import PrismaClient from '../../database/PrismaClient.js';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

async function jwtVerify(payload, done) {
  try {
    const user = await PrismaClient.user.findUnique({
      where: {
        id: payload.sub,
      },
    });

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
}

passport.use(new JwtStrategy(jwtOptions, jwtVerify));

export default passport;
