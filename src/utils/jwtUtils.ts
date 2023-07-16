import jwt from 'jsonwebtoken';

type User = {
    id: number;
    email: string;
    username: string;
}
export const generateJwtToken = ({ id, email, username }: User) => {
    const token = jwt.sign({ id, email, username }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRATION_TIME || '1h'
    });

    return token;
};