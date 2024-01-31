import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type Language = 'tr' | 'en'

export type LanguageState = {
    language: Language
    t: (from: string, to: string) => string
    setLanguage: (language: Language) => void
}

const useLanguageStore = create<LanguageState>()(
    persist(
        (set): LanguageState => ({
            language: 'tr',
            t: (from: string, to: string): string => {
                return useLanguageStore.getState().language === 'tr' ? from : to
            },
            setLanguage: (language: Language) => set({ language }),
        }),
        {
            name: 'language',
            storage: createJSONStorage(() => localStorage),
        }
    )
)

export function useLanguage(): LanguageState {
    const language: Language = useLanguageStore((state: LanguageState) => state.language)
    const setLanguage = useLanguageStore((state: LanguageState) => state.setLanguage)

    function t(from: string, to: string): string {
        return language === 'tr' ? from : to
    }

    return { language, t, setLanguage }
}

export default useLanguageStore
