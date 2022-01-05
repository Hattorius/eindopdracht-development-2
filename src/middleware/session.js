import nJwt from "njwt";

class authenticated {
    constructor(user) {
        this.user = user;
    }

    yes() {
        if (this.user === null) {
            return false;
        }
        return true;
    }

    userid() {
        if (!this.yes()) {
            return null;
        }
        return parseInt(this.user.body.sub.split('/')[1])
    }

    userid_str() {
        if (!this.yes()) {
            return null;
        }
        return this.userid().toString(); // I'm lazy
    }

    isadmin() {
        if (!this.yes()) {
            return false;
        }
        if (this.user.body.scope.includes('admin')) {
            return true;
        }
        return false;
    }

    isuser() {
        if (!this.yes()) {
            return false;
        }
        if (this.user.body.scope.includes('user')) {
            return true;
        }
        return false;
    }
}

export const session = async(req, res, next) => {
    // Check if session exists, if so validate
    var auth = null;
    var cooker = false;
    if (typeof req.get('Authorization') !== 'undefined') {
        auth = req.get('Authorization');
    } else if (typeof req.cookies.Authorization !== 'undefined') {
        auth = req.cookies.Authorization;
        cooker = true;
    }

    if (auth !== null) {
        req.user = await new Promise((resolve) => {
            nJwt.verify(auth, process.env.JWT_KEY, (err, verified) => {
                if (err) {
                    res.clearCookie('Authorization', {
                        domain: '.' + process.env.URL,
                        path: '/api'
                    })
                } else {
                    resolve(verified);
                }
                resolve(null);
            });
        });
    } else {
        req.user = null;
    }

    req.auth = new authenticated(req.user);

    next();
}