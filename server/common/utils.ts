import jwt from 'jsonwebtoken';

export interface JwtPayload   {
	id: string | undefined
	username: string | undefined
	role: string | undefined
	discordId: string | undefined
}

export const signToken = (payload: JwtPayload) => {
	return jwt.sign(payload, process.env.JWT_SECRET ?? '', {
		expiresIn: '2d'
	})
}