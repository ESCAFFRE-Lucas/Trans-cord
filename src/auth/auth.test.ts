import prisma from "../lib/db";
import { describe, expect } from '@jest/globals';
import request from 'supertest';
import { app } from '../index';
import * as authService from './auth.service';

const userMock = {
    id: "44c571e3-69db-4ac5-915b-c613f7b1177d",
    username: "test",
    password: "password",
    role: "admin",
    discordId: "123456789",
    preferLang: "en-US",
    createdAt: new Date()
}

jest.mock('./auth.service', () => ({
    getUserById: jest.fn(),
}));

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

    it('should not register an user if already exists', async () => {
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

        expect(response.status).toBe(400);
        expect(response.body).not.toBeNull();
        //expect(response.body).toHaveProperty('message', 'User already exists');
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