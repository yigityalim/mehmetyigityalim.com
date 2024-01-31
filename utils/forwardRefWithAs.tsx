/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

/**
 * Copied from Reach UI utils...
 *
 * It fixes TypeScript [type] inferencing to work with <Comp as={AnotherComp} />
 */

import * as React from 'react'

/**
 * React.Ref uses the readonly [type] `React.RefObject` instead of
 * `React.MutableRefObject`, We pretty much always assume ref objects are
 * mutable (at least when we create them), so this [type] is a workaround so some
 * of the weird mechanics of using refs with TS.
 */
export type AssignableRef<ValueType> =
    | {
          bivarianceHack(instance: ValueType | null): void
      }['bivarianceHack']
    | React.MutableRefObject<ValueType | null>
    | null

////////////////////////////////////////////////////////////////////////////////
// The following types help us deal with the `as` prop.
// I kind of hacked around until I got this to work using some other projects,
// as a rough guide, but it does seem to work so, err, that's cool? Yay TS! 🙃
// P = additional props
// T = [type] of component to render

export type As<BaseProps = any> = React.ElementType<BaseProps>

export type PropsWithAs<ComponentType extends As, ComponentProps> = ComponentProps &
    Omit<React.ComponentPropsWithRef<ComponentType>, 'as' | keyof ComponentProps> & {
        as?: ComponentType
    }

export type PropsFromAs<ComponentType extends As, ComponentProps> = (PropsWithAs<ComponentType, ComponentProps> & {
    as: ComponentType
}) &
    PropsWithAs<ComponentType, ComponentProps>

export type ComponentWithForwardedRef<
    ElementType extends React.ElementType,
    ComponentProps,
> = React.ForwardRefExoticComponent<
    ComponentProps & React.HTMLProps<React.ElementType<ElementType>> & React.ComponentPropsWithRef<ElementType>
>

export interface ComponentWithAs<ComponentType extends As, ComponentProps> {
    <TT extends As>(props: PropsWithAs<TT, ComponentProps>): React.ReactElement | null
    (props: PropsWithAs<ComponentType, ComponentProps>): React.ReactElement | null

    displayName?: string
    propTypes?: React.WeakValidationMap<PropsWithAs<ComponentType, ComponentProps>>
    contextTypes?: React.ValidationMap<any>
    defaultProps?: Partial<PropsWithAs<ComponentType, ComponentProps>>
}

export function forwardRefWithAs<Props, ComponentType extends As>(
    component: (props: PropsFromAs<ComponentType, Props>, ref: React.RefObject<any>) => React.ReactElement | null
) {
    return React.forwardRef(component as any) as unknown as ComponentWithAs<ComponentType, Props>
}
