import { getAllComments } from "@/lib/fetch"
import { CommentReply } from "./CommentReply";
import { Box } from "@mui/material";
import { IReplies } from "@/lib/fetch/types";
import CommentPost from "./CommentPost";

export async function CommentList() {
    const comments = await getAllComments()

    if (!comments.length) return null

    return (
        <>
            {comments.map(comment => (
                <Box key={comment.id}>
                    <CommentPost {...comment} />

                    {comment.replies.filter(reply => reply != null).map(reply => (
                        <CommentReply key={reply.id} id={reply.id} depth={1} />
                    ))}
                </Box>
            ))}
        </>
    )
}