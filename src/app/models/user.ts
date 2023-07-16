import prisma from '../../config/prisma';

export const findUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });
    return user;
}

export const findUserByUsername = async (username: string) => {
    username = username.toLowerCase();
    const user = await prisma.user.findUnique({
        where: {
            username
        }
    });
    return user;
}

export const findUserById = async (id: number) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    });
    return user;
}