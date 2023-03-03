export interface NavItem {
    label: string
    subLabel?: string
    children?: Array<NavItem>
    href?: string
}

export const NAV_ITEMS: Array<NavItem> = [
    {
        label: "재료",
        children: [
            { label: "ㅁ?ㄹ" },
            { label: "이슈" }
        ],
        href: "#"
    },
    {
        label: "재료",
        children: [
            { label: "ㅁ?ㄹ" },
            { label: "이슈" }
        ],
        href: "#"
    }
]