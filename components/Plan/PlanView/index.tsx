'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { plans } from '@/lib/plans'
import type { Optionals, Plan } from '@/lib/types/plan'
import { cn, formatPrice } from '@/utils'
import Container from '@/components/Containers'
import { useInView } from 'framer-motion'
import { OVERLAY_MENU_HEIGHT } from '@/utils/constants'
import {
    Select as SelectPrimitive,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'

export function PlanView({ type }: Readonly<{ type?: Plan['type'] }>): React.ReactElement {
    const priceRef = React.useRef<React.ElementRef<'h2'>>(null)
    const isInView = useInView(priceRef, { margin: `-${OVERLAY_MENU_HEIGHT}px` })
    const plan = plans.find((plan) => plan.type === type)!
    const { toast } = useToast()

    const [selectedOptions, setSelectedOptions] = React.useState<Optionals | null>(null)

    const [pageNumber, setPageNumber] = React.useState<number>(plan.pageNumbers.page)
    const [revision, setRevision] = React.useState<number>(plan.revisions.revision)
    const [currentPrice, setCurrentPrice] = React.useState<number>(plan.price)
    const incrementPageNumber = React.useCallback(() => setPageNumber((prev) => prev + 1), [])
    const decrementPageNumber = () => setPageNumber((prev) => prev - 1)
    const incrementRevision = () => setRevision((prev) => prev + 1)
    const decrementRevision = () => setRevision((prev) => prev - 1)
    const incrementPageNumberDisabled: boolean = pageNumber >= plan.pageNumbers.max
    const decrementPageNumberDisabled: boolean = pageNumber <= plan.pageNumbers.min
    const incretmentRevisionDisabled: boolean = revision >= plan.revisions.max
    const decrementRevisionDisabled: boolean = revision <= plan.revisions.min

    const handleOptionSelect = (key: keyof Plan['optionals']) => {
    }

    const handleFrameworkSelect = (value: string) => {}

    return (
        <Container className="items-start">
            <div
                className="flex w-full flex-col items-start justify-center gap-y-8 md:flex-row md:items-stretch md:justify-start md:gap-x-8 md:gap-y-0">
                <div
                    className={cn(
                        'bg-card dark:bg-wash-dark fixed left-2 right-2 flex flex-row items-center justify-between gap-x-2 rounded-lg p-3 transition-all duration-300',
                        isInView ? '-bottom-full' : 'bottom-4',
                    )}
                >
                    <div className="flex flex-col items-start justify-between gap-y-2">
                        <h1 className={cn('text-2xl font-bold italic', plan.color?.heading)}>{plan.name}</h1>
                        <h2 className="text-xl font-bold italic text-gray-900 dark:text-gray-200">
                            {formatPrice(currentPrice)}
                        </h2>
                    </div>
                    <button type="submit">Teklifi ver</button>
                </div>
                <h1 className={cn('text-5xl font-bold italic', plan.color?.heading)}>{plan.name}</h1>
                <h2 ref={priceRef} className="text-4xl font-bold italic text-gray-900 dark:text-gray-200">
                    {formatPrice(currentPrice)}
                </h2>
                <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">{plan.description}</p>
                <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
                    <h2 className="mb-2 text-xl font-semibold">Plan Özellikleri:</h2>
                    <h3 className="mb-2 text-lg font-semibold text-gray-600 dark:text-gray-400">
                        Eklemek istediklerinize basarak ekleme işlemini gerçekleştirebilirsiniz.
                    </h3>
                    <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {Object.keys(plan.optionals)
                            .filter((key) => key !== 'pageNumber' && key !== 'revision')
                            .map((key) => {
                                if (key === 'framework' && plan.framework)
                                    if (plan.framework.length > 1)
                                        return (
                                            <SelectPrimitive key={key} onValueChange={handleFrameworkSelect}>
                                                <SelectTrigger className="mb-4">
                                                    <SelectValue
                                                        placeholder={
                                                            plan.framework.find((f) => f.index)?.name ??
                                                            'Teknoloji Seçiniz...'
                                                        }
                                                    />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {plan.framework.map(({ name, description }) => (
                                                        <SelectItem key={name} value={name}>
                                                            {name} ({description})
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </SelectPrimitive>
                                        )
                                    else
                                        return (
                                            <h2 key={key} className="p-2 text-2xl">
                                                {plan.framework.find((f) => f.index)?.name}
                                            </h2>
                                        )
                                else
                                    return (
                                        <div key={key} className="flex w-full items-center justify-start gap-x-2">
                                            <button
                                                type="button"
                                                className={cn(
                                                    'cursor-pointer rounded-lg px-4 py-1 text-lg font-semibold transition-all duration-300',
                                                )}
                                            >
                                                {key} {plan.optionals[key as keyof Plan['optionals']].cost}
                                            </button>
                                        </div>
                                    )
                            })}
                    </div>
                    <div className="flex w-full items-center justify-start gap-x-2">
                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={decrementPageNumber}
                            disabled={decrementPageNumberDisabled}
                        >
                            Azalt
                        </Button>
                        <p>Sayfa Sayısı: {pageNumber}</p>
                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={incrementPageNumber}
                            disabled={incrementPageNumberDisabled}
                        >
                            Artır
                        </Button>
                    </div>
                    <div className="flex w-full items-center justify-start gap-x-2">
                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={decrementRevision}
                            disabled={decrementRevisionDisabled}
                        >
                            Azalt
                        </Button>{' '}
                        <p>Revizyon: {revision}</p>
                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={incrementRevision}
                            disabled={incretmentRevisionDisabled}
                        >
                            Artır
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

PlanView.displayName = 'PlanView'
