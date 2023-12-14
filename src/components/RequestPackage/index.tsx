import React from 'react'
import Link from 'next/link'

export default function RequestPackage(): React.JSX.Element {
    return (
        <Link href='/packages' className='group relative w-full'>
            <div className='absolute -inset-0.5 animate-tilt rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 opacity-75 blur transition duration-1000 group-hover:opacity-100'></div>
            <button className='relative flex w-full items-center justify-between rounded-lg bg-black px-7 py-4 leading-none'>
                <span className='flex items-center space-x-5'>
                    <span className='pr-6 text-gray-100'>Paketler</span>
                </span>
                <span className='flex flex-row items-center justify-center gap-x-1 pl-6 text-indigo-400 transition duration-200 group-hover:text-gray-100'>
                    Teklifleri gör
                </span>
            </button>
        </Link>
    )
}
