import * as zustand from 'zustand'

type MenuStore<T = boolean> = {
    menu: T
    setMenu: (value: T) => void
}

const useMenuStore: zustand.UseBoundStore<zustand.StoreApi<MenuStore>> = zustand.create<MenuStore>(
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
    const { menu, setMenu } = useMenuStore()
    return { menu, setMenu }
}
