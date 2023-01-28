export interface Team {
    id: string
    name: string
    logo: string
    members: {
        top: string | null
        jungle: string | null
        mid: string | null
        adc: string | null
        support: string | null
    },
    record: string

}
