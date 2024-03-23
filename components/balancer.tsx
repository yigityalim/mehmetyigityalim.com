'use client'
import React from 'react'
import { Balancer as BalancerPrimitive } from 'react-wrap-balancer'

export interface BalancerProps extends React.PropsWithChildren<React.ComponentProps<typeof BalancerPrimitive>> {}
export function Balancer({ children, ...props }: Readonly<BalancerProps>): React.ReactElement {
    return <BalancerPrimitive {...props}>{children}</BalancerPrimitive>
}
