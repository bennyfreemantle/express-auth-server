import bcrypt from 'bcrypt';
import validator from 'validator';
import prisma from '../../config/prisma';
import { findUserByEmail, findUserByUsername } from '../models/user';

export const registerUser = async (email: string, username: string, password: string) => {

    const existingUser = await findUserByUsername(username);
    if (existingUser) {
        throw new Error('Username already exists');
    }
    const existingEmail = await findUserByEmail(email);
    if (existingEmail) {
        throw new Error('Email already exists');
    }

    if (!validator.isEmail(email)) {
        throw new Error('Invalid email');
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error('Password must be at least 8 characters long, and contain at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol');
    }

    const hashedPassword = await hashPassword(password);

    // normalize username
    username = username.toLowerCase();

    const user = await prisma.user.create({
        data: {
            email,
            username,
            password: hashedPassword
        }
    });

    return user;
}

const hashPassword = async (password: string): Promise<string> => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

export const loginUser = async (username: string, password: string) => {
    const user = await findUserByUsername(username);

    if (!user) {
        throw new Error('Invalid username or password');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new Error('Invalid username or password');
    }

    return user;
}