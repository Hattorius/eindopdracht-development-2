import { require } from "./utils/require.js";
import crypto from "crypto";
import nJwt from "njwt";

export const veryVERYsecretKey = "yes";

export const authenticate = async(req, res) => {
    // Authenticate user
    if (!require(req.body.username, res, "Username")) return;
    if (!require(req.body.password, res, "Password")) return;

    const md5sum = crypto.createHash('md5');
    const hashedPassword = md5sum.update(req.body.password).digest('hex');

    const result = await req.database.users.read(null, req.body.username);
    if (typeof result === 'undefined') {
        return res.json({
            error: true,
            message: 'Username or password incorrect'
        });
    }
    if (result.password !== hashedPassword) { // give exactly the same error as we are bastards like that
        return res.json({
            error: true,
            message: 'Username or password incorrect'
        });
    }

    var scope = ['user'];
    if (result.administrator == 1) {
        scope.push('admin');
    }

    const jwt = nJwt.create({
        iss: process.env.URL,
        sub: 'user/' + result.id.toString(),
        scope: scope
    }, process.env.JWT_KEY);

    res.cookie('Authorization', jwt.compact(), { domain: '.' + process.env.URL, path: '/api', httpOnly: true, expires: new Date(jwt.body.exp) });

    res.send({
        error: false,
        auth: jwt.compact()
    });
}