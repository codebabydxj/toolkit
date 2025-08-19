export interface MvCalendarForm {
    id?: string
    title: string
    color: string
    content: string
    calDate: string
}

export type MvCalendarType = 'list' | 'dot'

export type MvCalendarSize = '' | 'small' | 'large' | 'default'
