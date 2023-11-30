'use client'
import React from 'react'
import { BellRing, Check } from 'lucide-react'
import { Button } from 'components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'components/ui/card'
import pricing, { type Pricing } from 'utils/pricing'
import Link from 'next/link'

export default function RequestProject(): React.JSX.Element {
    return (
        <Link href='/pricing' className='group relative w-full'>
            <div className='animate-tilt absolute -inset-0.5 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 opacity-75 blur transition duration-1000 group-hover:opacity-100'></div>
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

/*
<Dialog>
                    <DialogTrigger asChild>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className='text-lg'>{pricing[currentCardIndex].name}</DialogTitle>
                        </DialogHeader>
                        <AnimatePresence initial={false} mode='wait'>
                            <motion.div
                                key={currentCardIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {pricing.slice(currentCardIndex, currentCardIndex + 1).map((pricing) => (
                                    <PricingCard key={pricing.id} pricing={pricing} />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                        <div className='flex w-full items-center justify-between gap-x-2'>
                            <Button
                                className='w-full'
                                size='sm'
                                onClick={handlePrevious}
                                disabled={currentCardIndex === 0}
                            >
                                Önceki Teklif
                            </Button>
                            <Button
                                className='w-full'
                                size='sm'
                                onClick={handleNext}
                                disabled={currentCardIndex === pricing.length - 1}
                            >
                                Sonraki Teklif
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
 */
