'use client'
import { Star } from 'lucide-react'

import React, { useCallback, useState } from 'react'
import { trackEvent } from '@/lib/events'
import { toast } from 'sonner'

export function RatingStars() {
    const [hover, setHover] = useState<number>(() => {
        const rating = window.localStorage.getItem('rating')
        return rating ? parseInt(rating) : 0
    })
    const handleHover = useCallback((star: number) => setHover(star), [])
    async function onSubmit(_rating: number) {
        setHover(_rating)
        window.localStorage.setItem('rating', _rating.toString())
        trackEvent({
            name: 'rating',
            properties: {
                rating: _rating,
            },
        })
        toast.success(`Teşekkürler! ${_rating} Puanınızı aldık. 🌟`)
    }

    return (
        <div className='flex w-full flex-col items-center justify-center gap-2 rounded-lg bg-zinc-400 px-4 py-2 dark:bg-zinc-800'>
            <h1 className='text-base font-semibold italic text-black dark:text-white'>Bu blog yazısına puan ver</h1>
            <div className='flex w-full items-center justify-center'>
                {Array.from({ length: 5 }, (_, i) => (
                    <Star
                        key={i}
                        size={30}
                        className='cursor-pointer stroke-zinc-800 pr-2 transition-colors dark:stroke-zinc-200'
                        fill={i < hover ? '#e4e4e7' : 'none'}
                        onMouseEnter={() => handleHover(i + 1)}
                        onMouseLeave={() => handleHover(hover)}
                        onClick={() => onSubmit(i + 1)}
                    />
                ))}
            </div>
        </div>
    )
}
