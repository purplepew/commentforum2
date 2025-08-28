import { getAllComments } from "@/lib/fetch"
import { CommentReply } from "./CommentReply";
import { Box } from "@mui/material";
import CommentPost from "./CommentPost";

export async function CommentList() {
    const comments = await getAllComments()

    if (!comments.length) return null

    console.log('Parent Comments: ', comments)

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}
        >
            {/** Here, it maps every parent comment */}
            {comments.map(comment => (
                <Box key={comment.id}>
                    <CommentPost props={comment} />

                    {/** Here, it maps every replies */}
                    {comment.replies.filter(reply => reply != null).map(reply => (
                        <CommentReply key={reply.id} id={reply.id} depth={2} />
                    ))}
                </Box>
            ))}
        </Box>
    )
}