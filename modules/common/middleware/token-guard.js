import passport from "passport";

export const UseGuard = (strategy = "jwt", options = {}) => {
    return (req, res, next) =>
        passport.authenticate(strategy, { session: false, ...options }, (_, payload) => {
            if (!payload) return res.status(401).json({ message: "You need authorization" });
            // ...
            // CHECKING ACCOUNT EXIST OT TOKEN WHITE LIST EXIST E.G.
            // ...
            req.user = payload;
            return next();
        })(req, res, next);
};
