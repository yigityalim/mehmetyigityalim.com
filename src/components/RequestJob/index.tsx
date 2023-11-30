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
} from '@/components/ui/dialog'
import ResendForm from './form'

type RequestJobProps = Readonly<{}>

export default function RequestJob(props: RequestJobProps): React.JSX.Element {
    return (
        <div className='background-animate flex w-full flex-row items-center justify-between gap-x-2 rounded bg-gradient-to-r from-pink-500 via-red-500 to-blue-50 p-4'>
            <h1>İş Teklifi gönder</h1>
            <Dialog>
                <DialogTrigger className='text-lg'>
                    <VscFeedback />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>İş Teklifi Başvuru Formu</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account and remove your data
                            from our servers.
                        </DialogDescription>
                        <ResendForm />
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}
