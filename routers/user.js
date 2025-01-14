// filepath: /c:/Users/Acer/Downloads/jwt/routers/user.js
import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
let refreshTokens = [];

router.post('/login', (req, res) => {
    const username = req.body.username;
    const user = { name: username };

    const accessKey = jwt.sign(user, process.env.TOKEN_KEY, { expiresIn: '10s' }); 
    const refreshKey = jwt.sign(user, process.env.RE_TOKEN_KEY, { expiresIn: '1h' });
    refreshTokens.push(refreshKey);
    res.send({ accessKey, refreshKey });
});

router.post('/token', (req, res) => {
    const refreshToken = req.body.refreshKey;
    if (refreshToken == null) res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) res.sendStatus(403);
    jwt.verify(refreshToken, process.env.RE_TOKEN_KEY, (err, user) => {
        if (err) res.sendStatus(403);
        const accessToken = jwt.sign({ name: user.name }, process.env.TOKEN_KEY, { expiresIn: '10s' });
        res.send({ accessToken });
    });
});


router.delete('/logout', (req, res) => {
    const refreshToken = req.body.refreshKey;
    refreshTokens = refreshTokens.filter(t => t !== refreshToken);
    res.sendStatus(204);
});

export default router;