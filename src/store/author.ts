import { create, StoreApi, UseBoundStore } from 'zustand'
import { Author } from 'lib/types'

type AuthorStore = {
    author: Author | undefined
    fetch: (id: string) => Promise<void>
}

const useMenuStore = create<AuthorStore>(
    (set): AuthorStore => ({
        author: undefined,
        fetch: async (id) => {
            const response = await fetch(`/api/authors/${id}`)
            const data = await response.json()
            set({ author: data })
        },
    })
)

export function useMenu() {}
