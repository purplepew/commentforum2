import { OAuth2Client } from 'google-auth-library'

const googleOAuth2Client = new OAuth2Client({
    clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    redirectUri: `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.GOOGLE_OAUTH_REDIRECT_URI}`
})

export default googleOAuth2Client