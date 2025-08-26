import { type NextRequest } from "next/server"
import { NextResponse } from "next/server"
import client from "@/lib/OAuthClient"
import { TokenPayload } from "google-auth-library"
import jwt from 'jsonwebtoken'
import { IUser} from "@/lib/db/types"
import prisma from "@/lib/db/prisma"
import { BASE_URL } from "@/lib/constants"
import { env } from "@/lib/type-guards"

export const GET = async (req: NextRequest) => {
    const code = req.nextUrl.searchParams.get('code')

    if (!code) {
        return NextResponse.json({ message: 'Missing code' }, { status: 400 })
    }

    let payload: TokenPayload | undefined
    let user: IUser | null

    try {
        const { tokens } = await client.getToken(code)
        client.setCredentials(tokens)

        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token!,
            audience: process.env.GOOGLE_CLIENT_ID
        })

        payload = ticket.getPayload()

        if (!payload || !payload?.email || !payload?.name) {
            return NextResponse.json({ message: 'Ticket\'s payload is missing. ' }, { status: 500 })
        }

    } catch {
        // console.error('Error during Google OAuth callback:', error);
        return NextResponse.json({ error: 'An error occurred during token exchange.' }, { status: 500 });
    }



    try {
        user = await prisma.user.findFirst({ where: { email: payload.email } })

        if (!user) {
            
            user = await prisma.user.create({
                data: {
                    email: payload.email,
                    name: payload.name,
                }
            })
            console.log("New user is created.")
        }

    } catch {
        return NextResponse.json({ error: 'An error occurred during prisma query' }, { status: 500 });
    }

    const refreshToken = jwt.sign(
        {
            "UserInfo": {
                id: user.id.toString()
            }
        },
        env.JWT_REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )

    const response = NextResponse.redirect(BASE_URL)

    response.cookies.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 3600
    })

    return response
}

