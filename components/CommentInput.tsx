'use client'
import { Box, TextField } from "@mui/material";
import TextButton from "./TextButton";
import { Send } from "@mui/icons-material";
import { createComment } from "@/lib/fetch";
import { useState } from "react";

export default function CommentInput({ commentId }: { commentId: string | null }) {
    const [content, setContent] = useState('')

    const handleCreateComment = async () => {
        if (!content) return
        try {
            const res = await createComment({
                authorId: "cmedn5awt00007ikxzhqbb5i0",
                parentId: commentId,
                content
            })
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box
            sx={{
                border: '1px solid grey',
                p: 1,
            }}
        >
            <TextField
                placeholder="Write reply"
                multiline
                minRows={2}
                maxRows={10}
                variant="standard"
                InputProps={{
                    disableUnderline: true,
                    sx: { font: 'inherit', background: 'transparent' }
                }}
                onChange={(e) => setContent(e.target.value)}
                fullWidth
            />
            <Box sx={{ display: 'flex', gap: 1, pl: 1 }}>
                <TextButton title="Send" icon={<Send fontSize="small" />} onClick={handleCreateComment} />
                <TextButton title="Edit" />
            </Box>
        </Box>
    );
}