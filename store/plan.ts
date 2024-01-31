import { create } from 'zustand'
import { Plan } from 'lib/types/plan'
import { plans } from 'lib/plans'

type PlanStore = {
    plans: Plan[]
    plan: Plan | undefined
    findPlan: (type: Plan['type']) => Plan | undefined
}

export const usePlanStore = create<PlanStore>()((set, get) => ({
    plans,
    plan: undefined,
    findPlan: (type: Plan['type']) => get().plans.find((plan) => plan.type === type),
}))
