import { Request, Response } from 'express';
import { loginUser, registerUser } from '../services/authService';
import { generateJwtToken } from '../../utils/jwtUtils';

export const register = async (req: Request, res: Response) => {
    const { email, username, password } = req.body;

    try {
        const user = await registerUser(email, username, password);

        // TODO: send email verification link
        // TODO: send welcome email

        const token = generateJwtToken(user.id);

        res.status(201).json({
            success: true,
            message: 'User Registered successfully',
            user: {
                id: user.id,
                email: user.email,
                username: user.username
            },
            token
        });
    } catch (error) {
        console.error(error);

        let errorMessage = 'User registration failed';
        let statusCode = 400;

        if (error instanceof Error) {
            errorMessage = error.message;
            statusCode = 400;
        } else {
            errorMessage = 'Internal server error';
            statusCode = 500;
        }

        res.status(statusCode).json({
            success: false,
            message: errorMessage,
        });

    }
}

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await loginUser(username, password);

        const token = generateJwtToken(user.id);

        res.status(200).json({
            success: true,
            message: 'Login successfully',
            user: {
                id: user.id,
                email: user.email,
                username: user.username
            },
            token
        });
    } catch (error) {
        console.error(error);

        let errorMessage = 'User login failed';
        let statusCode = 401;

        if (error instanceof Error) {
            errorMessage = error.message;
            statusCode = 401;
        } else {
            errorMessage = 'Internal server error';
            statusCode = 500;
        }

        res.status(statusCode).json({
            success: false,
            message: errorMessage,
        });
    }
}

export const logout = (req: Request, res: Response) => {
    // handle logout logic

    // return appropriate response
}