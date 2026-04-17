import React from 'react'

export default function IconArrowSmall({ h = 10, w = 10, color = "#ffffff" }: { h?: number, w?: number, color?: string }) {
    return (
        <svg width={w} height={h} viewBox="0 0 4 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.5 6.5L3.5 3.5L0.5 0.5" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}
