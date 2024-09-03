import { OpeningHoursCreation } from "./openingHours.js"

export interface ActivityCreation
{
    id?: number
    title: string
    description: string
    address: string
    tel: string
    website: string
    categoryId: number
    openingHours?: OpeningHoursCreation[]
}