import { Box, Typography } from "@mui/material";
import { getCommentById } from "@/lib/fetch";
import CommentPost from "./CommentPost";

export async function CommentReply({
    id,
    depth,
}: {
    id: string,
    depth: number,
}) {
    const comment = await getCommentById({ id })

    if (!comment) return null

    const replies = comment.replies.filter(reply => reply !== null)

    return (
        <Box
            sx={{
                borderLeft: replies.length && '1px solid grey',
                display: 'flex',
                flexDirection: 'column',
                columnGap: 2,
                ml: depth,
                mb: 2
            }}
        >
            <CommentPost props={comment} depth={depth + 1} />
            {replies.length > 0 && replies.map(reply =>
                <CommentReply
                    key={reply.id}
                    id={reply.id}
                    depth={depth + 1}
                />
            )}
        </Box>
    )
}