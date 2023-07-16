import jwt from 'jsonwebtoken';

export const generateJwtToken = (userId: number) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRATION_TIME || '1h'
    });

    return token;
};