'use client'
import { IComment } from "@/lib/fetch/types";
import { Box, Collapse, Typography } from "@mui/material";
import CommentInput from "./CommentInput";
import { useState } from "react";
import TextButton from "./TextButton";

export default function CommentPost({
    props,
    depth,
}: {
    props: IComment,
    depth?: number,
}) {
    const [open, setOpen] = useState(false)

    const toggleDropdown = () => {
        setOpen(!open)
    }
    return (
        <Box>
            <Box
                sx={{
                    border: '1px solid grey',
                    p: 1,
                }}
            >
                <Typography>{props.content}</Typography>
                <Typography
                    variant='caption'
                    color='textSecondary'
                >{new Date(props.createdAt).toLocaleString()}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, pl: 1 }}>
                <TextButton title='Like' />
                <TextButton title='Reply' onClick={toggleDropdown} />
            </Box>
            <Collapse in={open}>
                <Box
                    sx={{
                        ml: depth ? depth : 2,// if depth is passed, let it be the marginLeft. else 2, the reply to the parent comment
                        mb: 1
                    }}
                >
                    <CommentInput commentId={props.id} />
                </Box>
            </Collapse>
        </Box>
    )
}