'use client'
import React from 'react'
import { VscFeedback } from 'react-icons/vsc'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from 'components/ui/dialog'
import ResendForm from './form'

type RequestJobProps = Readonly<{}>

export default function RequestJob(props: RequestJobProps): React.JSX.Element {
    return (
        <div className='relative flex h-full w-full cursor-pointer flex-row items-center justify-between gap-x-2 rounded-lg bg-card px-7 py-4 leading-none text-card-dark dark:bg-black dark:text-card'>
            <div className='absolute -inset-0.5 -z-10 animate-tilt rounded-lg bg-gradient-to-r from-blue-600 to-emerald-500 opacity-75 blur transition duration-1000 group-hover:opacity-100'></div>
            <h1>İş Teklifi gönder</h1>
            <Dialog>
                <DialogTrigger className='text-lg'>
                    <VscFeedback />
                </DialogTrigger>
                <DialogContent className=''>
                    <DialogHeader>
                        <DialogTitle className='w-full text-start text-xl font-bold'>
                            İş Teklifi Başvuru Formu
                        </DialogTitle>
                        <DialogDescription className='mb-4 w-full text-start text-base'>
                            İş teklifi göndermek için aşağıdaki formu doldurunuz. En kısa sürede dönüş yapılacaktır.
                        </DialogDescription>
                        <ResendForm />
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

// className='background-animate flex w-full flex-row items-center justify-between gap-x-2 rounded bg-gradient-to-r from-pink-500 via-red-500 to-blue-50 p-4'>
