'use client'
import React from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from 'components/ui/use-toast'
import { Button } from 'components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'components/ui/form'
import { Input } from 'components/ui/input'
import { Separator } from 'components/ui/separator'

const schema = z.object({
    from: z.string().email('Geçerli bir email adresi giriniz'),
    subject: z.string().min(3, 'En az 3 karakter olmalıdır'),
    text: z.string().min(10, 'En az 10 karakter olmalıdır'),
})

export default function ResendForm(): React.ReactElement {
    const { toast, dismiss } = useToast()
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            from: '',
            subject: '',
            text: '',
        },
    })

    function onSubmit(data: z.infer<typeof schema>) {
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
