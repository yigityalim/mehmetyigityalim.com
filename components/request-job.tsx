'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { VscFeedback } from 'react-icons/vsc'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

type RequestJobProps = Readonly<{}>

const schema = z.object({
    from: z.string().email('Geçerli bir email adresi giriniz'),
    subject: z.string().min(3, 'En az 3 karakter olmalıdır'),
    text: z.string().min(10, 'En az 10 karakter olmalıdır'),
})
type FormValues = z.infer<typeof schema>

export function RequestJob(): React.JSX.Element {
    const [open, setOpen] = React.useState<boolean>(false)

    return (
        <div className='relative flex h-full w-full cursor-pointer flex-row items-center justify-between gap-x-2 rounded-lg bg-card px-7 py-4 leading-none dark:bg-black'>
            <div className='absolute -inset-0.5 -z-10 animate-tilt rounded-lg bg-gradient-to-r from-blue-600 to-emerald-500 opacity-75 blur transition duration-1000 group-hover:opacity-100'></div>
            <h1>İş Teklifi gönder</h1>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className='text-lg'>
                    <VscFeedback />
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
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
function ResendForm(): React.ReactElement {
    const { toast } = useToast()
    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            from: '',
            subject: '',
            text: '',
        },
    })

    function onSubmit(data: FormValues) {
        toast({
            title: 'Email Gönderiliyor...',
            description: JSON.stringify(data, null, 2),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                    control={form.control}
                    name='from'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='block w-full text-start text-xl font-bold'>Email</FormLabel>
                            <FormControl>
                                <Input placeholder='Email adresiniz' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator />
                <FormField
                    control={form.control}
                    name='subject'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='block w-full text-start text-xl font-bold'>Konu</FormLabel>
                            <FormControl>
                                <Input placeholder='Konu' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator />
                <FormField
                    control={form.control}
                    name='text'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='block w-full text-start text-xl font-bold'>İçerik</FormLabel>
                            <FormControl>
                                <Input placeholder='İçerik' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator />
                <Button type='submit' className='w-full' size='sm'>
                    Gönder
                </Button>
            </form>
        </Form>
    )
}
