import { Box, Typography } from "@mui/material";
import { getCommentById } from "@/lib/fetch";
import CommentPost from "./CommentPost";

export async function CommentReply({ id, depth }: { id: string, depth: number }) {
    const comment = await getCommentById({ id })

    if (!comment) return null

    const replies = comment.replies.filter(reply => reply !== null)

    return (
        <>
            <CommentPost {...comment} />
            {replies && replies.map(reply => <CommentReply key={reply.id} id={reply.id} depth={depth + 1} />)}
        </>
    )
}