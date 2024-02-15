'use client'
import { Analytics as VercelAnalytics } from '@vercel/analytics/react'
import React from 'react'

export function Analytics(): React.ReactElement {
    return <VercelAnalytics />
}
