const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const AppleStrategy = require("passport-apple");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User.model/User.model");
const { UserLoginType, UserStatusEnum, VerifyStatus } = require("../constants");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const config = require("./config");
const compareBcryptPassword = require("../utils/compareBcryptPassword");

// LOCAL STRATEGY (email + password)

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({
          email,
          provider: UserLoginType.LOCAL,
        });
        if (!user)
          return done(null, false, {
            message: new ApiError(400, "User not found"),
          });

        const passwordIsMatch = await compareBcryptPassword(
          password,
          user.password
        );
        if (!passwordIsMatch) {
          throw new ApiError(400, "Invalid credential, email or password.");
        }

        if (!passwordIsMatch)
          return done(null, false, {
            message: new ApiError(
              400,
              "Invalid credential, email or password."
            ),
          });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// GOOGLE STRATEGY
passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: config.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({
          provider: UserLoginType.GOOGLE,
          providerId: profile.id,
          email: profile.emails[0].value,
        });
        if (existingUser) return done(null, existingUser);

        const user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          username: profile.emails[0].value,
          avatar: profile.photos[0].value,
          provider: UserLoginType.GOOGLE,
          providerId: profile.id,
          isEmailVerified: VerifyStatus.VERIFY,
          status: UserStatusEnum.ACTIVE,
          isActive: UserStatusEnum.ACTIVE,
        });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// FACEBOOK STRATEGY
passport.use(
  new FacebookStrategy(
    {
      clientID: config.FACEBOOK_APP_ID,
      clientSecret: config.FACEBOOK_APP_SECRET,
      callbackURL: config.FACEBOOK_CALLBACK_URL,
      profileFields: ["id", "displayName", "emails"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({
          provider: UserLoginType.FACEBOOK,
          providerId: profile.id,
        });
        if (existingUser) return done(null, existingUser);

        const newUser = await User.create({
          name: profile.displayName,
          email: profile.emails?.[0]?.value || null,
          username: profile.emails?.[0]?.value || null,
          provider: UserLoginType.FACEBOOK,
          providerId: profile.id,
          status: UserStatusEnum.APPROVED,
        });
        return done(null, new ApiResponse(201, newUser, "User created"));
      } catch (err) {
        return done(err);
      }
    }
  )
);

// APPLE STRATEGY
passport.use(
  new AppleStrategy(
    {
      clientID: config.APPLE_SERVICE_ID,
      teamID: config.APPLE_TEAM_ID,
      keyID: config.APPLE_KEY_ID,
      privateKeyLocation: config.APPLE_PRIVATE_KEY_PATH,
      callbackURL: config.APPLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, idToken, profile, done) => {
      try {
        const existingUser = await User.findOne({
          provider: UserLoginType.APPLE,
          providerId: idToken.sub,
        });
        if (existingUser) return done(null, existingUser);

        const newUser = await User.create({
          name: profile?.name || "Apple User",
          email: idToken.email,
          username: idToken.email,
          provider: UserLoginType.APPLE,
          providerId: idToken.sub,
          status: UserStatusEnum.APPROVED,
        });
        return done(null, new ApiResponse(201, newUser, "User created"));
      } catch (err) {
        return done(err);
      }
    }
  )
);
