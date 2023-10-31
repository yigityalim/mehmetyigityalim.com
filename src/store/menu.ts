import { create } from 'zustand'

type MenuStore = {
    menu: boolean
    setMenu: (value: boolean) => void
}

const useMenuStore = create<MenuStore>((set) => ({
    menu: false,
    setMenu: (value) => set({ menu: value }),
}))

export function useMenu(): MenuStore {
    const { menu, setMenu } = useMenuStore()
    return { menu, setMenu }
}
