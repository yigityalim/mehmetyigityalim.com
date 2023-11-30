'use client'
import React from 'react'
import Link from 'next/link'

export default function RequestProject(): React.JSX.Element {
    return (
        <Link href='/pricing' className='group relative w-full'>
            <div className='absolute -inset-0.5 animate-tilt rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 opacity-75 blur transition duration-1000 group-hover:opacity-100'></div>
            <button className='relative flex w-full items-center justify-between rounded-lg bg-black px-7 py-4 leading-none'>
                <span className='flex items-center space-x-5'>
                    <span className='pr-6 text-gray-100'>Proje Teklifleri</span>
                </span>
                <span className='pl-6 text-indigo-400 transition duration-200 group-hover:text-gray-100'>
                    Teklifleri gör
                </span>
            </button>
        </Link>
    )
}
