'use client'
import React from 'react'
import { VscFeedback } from 'react-icons/vsc'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    DrawerFooter,
} from 'components/ui/drawer'
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from 'components/ui/dialog'
import ResendForm from './form'
import { Button } from 'components/ui/button'
import { useMediaQuery } from 'usehooks-ts'

type RequestJobProps = Readonly<{}>

export default function RequestJob(props: RequestJobProps): React.JSX.Element {
    const [open, setOpen] = React.useState<boolean>(false)
    const isDesktop = false //useMediaQuery('(min-width: 768px)')

    const content: React.ReactElement = isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className='text-lg'>
                <VscFeedback />
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle className='w-full text-start text-xl font-bold'>İş Teklifi Başvuru Formu</DialogTitle>
                    <DialogDescription className='mb-4 w-full text-start text-base'>
                        İş teklifi göndermek için aşağıdaki formu doldurunuz. En kısa sürede dönüş yapılacaktır.
                    </DialogDescription>
                    <ResendForm />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    ) : (
        <Drawer onOpenChange={setOpen}>
            <DrawerTrigger className='text-lg'>
                <VscFeedback />
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>İş Teklifi Başvuru Formu</DrawerTitle>
                    <DrawerDescription>
                        İş teklifi göndermek için aşağıdaki formu doldurunuz. En kısa sürede dönüş yapılacaktır.
                    </DrawerDescription>
                </DrawerHeader>
                <ResendForm />
            </DrawerContent>
        </Drawer>
    )

    return (
        <div className='relative flex h-full w-full cursor-pointer flex-row items-center justify-between gap-x-2 rounded-lg bg-card px-7 py-4 leading-none text-card-dark dark:bg-black dark:text-card'>
            <div className='absolute -inset-0.5 -z-10 animate-tilt rounded-lg bg-gradient-to-r from-blue-600 to-emerald-500 opacity-75 blur transition duration-1000 group-hover:opacity-100'></div>
            <h1>İş Teklifi gönder</h1>
            <Drawer onOpenChange={setOpen}>
                <DrawerTrigger className='text-lg'>
                    <VscFeedback />
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>İş Teklifi Başvuru Formu</DrawerTitle>
                        <DrawerDescription>
                            İş teklifi göndermek için aşağıdaki formu doldurunuz. En kısa sürede dönüş yapılacaktır.
                        </DrawerDescription>
                    </DrawerHeader>
                    <ResendForm />
                </DrawerContent>
            </Drawer>
        </div>
    )
}

// className='background-animate flex w-full flex-row items-center justify-between gap-x-2 rounded bg-gradient-to-r from-pink-500 via-red-500 to-blue-50 p-4'>
