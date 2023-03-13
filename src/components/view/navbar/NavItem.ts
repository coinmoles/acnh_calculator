export interface NavItem {
    label: string
    subLabel?: string
    children?: Array<NavItem>
    href?: string
}

export const NAV_ITEMS: Array<NavItem> = [
    {
        label: "재료1",
        children: [
            { label: "ㅁ?ㄹ" },
            { label: "이슈" }
        ],
        href: "#"
    },
    {
        label: "재료2",
        children: [
            { label: "ㅁ?ㄹ" },
            { label: "이슈" }
        ],
        href: "#"
    }
]