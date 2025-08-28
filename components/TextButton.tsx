'use client'
import { Button } from "@mui/material";
import { ReactNode } from "react";

export default function TextButton({
    title,
    icon,
    onClick
}: {
        title: string,
        icon?: ReactNode,
        onClick?: () => void
    }) {
    return (
        <Button
            size="small"
            sx={{ minWidth: 0, p: 0, textTransform: 'none' }}
            onClick={onClick}
            startIcon={icon}
        >
            {title}
        </Button>
    )
}