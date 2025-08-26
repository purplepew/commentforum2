'use client'
import { getGoogleOAuthLink } from "@/lib/fetch";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter() 

    const handleSignIn = async () => {
        const url = await getGoogleOAuthLink()
        router.push(url)
    }

    return (
        <AppBar position="static">
            <Toolbar>

                <Box>
                    <Typography>Hello</Typography>
                </Box>

                <Box ml='auto'>
                    <Button onClick={handleSignIn}>Sign in</Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}