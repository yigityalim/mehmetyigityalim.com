import { create, StoreApi, UseBoundStore } from 'zustand'

type MenuStore<T = boolean> = {
    menu: T
    setMenu: (value: T) => void
}

const useMenuStore: UseBoundStore<StoreApi<MenuStore>> = create<MenuStore>(
    (
        set: (
            partial: MenuStore | Partial<MenuStore> | ((state: MenuStore) => MenuStore | Partial<MenuStore>),
            replace?: boolean | undefined
        ) => void
    ): MenuStore => ({
        menu: false,
        setMenu: (value: MenuStore['menu']) => set({ menu: value }),
    })
)

export function useMenu(): MenuStore {
    const menu = useMenuStore((state) => state.menu)
    const setMenu = useMenuStore((state) => state.setMenu)
    return { menu, setMenu }
}
