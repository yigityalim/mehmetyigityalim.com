import { create } from 'zustand'
import { type Menu, menu as menus } from '@/lib/menu'

type MenuState = {
    menu: Menu[]
    isOpen: boolean
    toggle: () => void
    set: (isOpen: boolean) => void
}

export const useMenu = create<MenuState>()((set) => ({
    menu: [...menus],
    isOpen: false,
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
    set: (isOpen) => set({ isOpen }),
}))
