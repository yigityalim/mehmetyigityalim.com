import { create } from 'zustand'

type OverlayMenuStore<T = boolean> = {
    menu: T
    setMenu: (value: T) => void
}

const useOverlayMenuStore = create<OverlayMenuStore>()(
    (set): OverlayMenuStore => ({
        menu: false,
        setMenu: (value: OverlayMenuStore['menu']) => set({ menu: value }),
    })
)

export function useOverlayMenu(): OverlayMenuStore {
    const menu = useOverlayMenuStore((state) => state.menu)
    const setMenu = useOverlayMenuStore((state) => state.setMenu)
    return { menu, setMenu }
}
