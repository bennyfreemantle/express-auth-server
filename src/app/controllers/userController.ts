import { Request, Response } from 'express';
import { findUserById, findUserByUsername } from '../models/user';

export const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        const user = await findUserById(Number(userId));

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        return res.status(200).json(returnUser(user));

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                message: error.message
            });
        } else {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }
    }
}

export const getUserByUsername = async (req: Request, res: Response) => {
    const { username } = req.params;

    try {
        const user = await findUserByUsername(username);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        return res.status(200).json(returnUser(user));

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                message: error.message
            });
        } else {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }
    }
}

export const getProtectedUserInfo = (req: Request, res: Response) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader ? authHeader.split(' ')[1] : undefined;

    try {
        return res.status(200).json({
            message: 'Protected user info',
            token
        });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                message: error.message
            });
        } else {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }
    }
}

const returnUser = (user: User) => {
    return {
        id: user.id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
}

type User = {
    id: number;
    email: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}