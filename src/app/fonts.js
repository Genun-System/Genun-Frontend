import { Oxygen, Crimson_Text, DM_Sans, Inter, Oxygen_Mono } from "next/font/google"

export const oxygen = Oxygen({
    weight: ["400", "700"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-oxygen"
})


export const crimsonText = Crimson_Text({
    weight: ["400", "600", "700"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-crimson-text"
})


export const dmSans = DM_Sans({
    weight: ["400", "500", "600", "700", "900"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-dm-sans"
})

export const inter = Inter({
    weight: ["400", "500", "600", "700", "900"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter"
})

export const oxygenMono = Oxygen_Mono({
    weight: ["400"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-oxygen-mono"
})