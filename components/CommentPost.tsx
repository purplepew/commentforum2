import { IComment } from "@/lib/fetch/types";
import { Box, Typography } from "@mui/material";

export default function CommentPost(props: IComment) {
    return (
        <>
            <Box
                sx={{
                    border: '1px solid grey',
                    p: 1
                }}
            >
                <Typography>{props.content}</Typography>
                <Typography
                    variant='caption'
                    color='textSecondary'
                >{new Date(props.createdAt).toLocaleString()}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, pl: 1 }}>
                <Typography
                    variant="caption"
                    component='button'
                    sx={{
                        backgroundColor: 'rgba(0,0,0,0)',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >Like</Typography>
                <Typography
                    variant="caption"
                    component='button'
                    sx={{
                        backgroundColor: 'rgba(0,0,0,0)',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >Reply</Typography>
            </Box>
        </>
    )
}