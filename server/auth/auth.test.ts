import { describe, expect } from '@jest/globals';
import request from 'supertest';
import { app } from '../index';
import * as authService from './auth.service';
import { prismaMock } from '../singleton'

const userMock = {
    id: "44c571e3-69db-4ac5-915b-c613f7b1177d",
    username: "test",
    password: "password",
    role: "admin",
    discordId: "123456789",
    preferLang: "en-US",
    createdAt: new Date()
}

const mockAuthService = {
    getUserById: jest.fn(),
};

describe('test on controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should register an user', async () => {
        jest.spyOn(authService, 'getUserById').mockImplementation(async (id: string) => {
            if (id === userMock.id) {
                return userMock;
            } else {
                return null;
            }
        });

        const response = await request(app).post('/auth/register').send({
            username: "test",
            password: "password",
        });

        expect(response.status).toBe(201);
        expect(response.body).not.toBeNull();
        expect(response.body).toHaveProperty('token');
    });

    it('should not register a user if already exists', async () => {
        mockAuthService.getUserById.mockImplementation(async (id) => {
            if (id === userMock.id) {
                return { userMock };
            } else {
                return null;
            }
        });

        const response = await request(app).post('/auth/register').send({
            username: userMock.username,
            password: userMock.password,
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'User already exists');

        expect(mockAuthService.getUserById).toHaveBeenCalledWith('existingUserId');
    });
    it('should login an user', async () => {

        const response = await request(app).post('/auth/login').send({
            username: "test3",
            password: "password",
        });

        expect(response.status).toBe(200);
        expect(response.body).not.toBeNull();
        expect(response.body).toHaveProperty('token');
    });
});

describe('test on service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should add a new user', async () => {
        prismaMock.user.create.mockResolvedValue(userMock);

        await expect(authService.addUser({
            username: "test",
            password: "password",
            discordId: "123456789",
            role: "admin"
        })).resolves.toEqual(userMock);
        expect(prismaMock.user.create).toBeCalledTimes(1);
        expect(prismaMock.user.create).toBeCalledWith({
            data: {
                username: "test",
                password: "password",
                discordId: "123456789",
                role: "admin"
            }
        });
    });
});