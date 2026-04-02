import { Album, DollarSign, FolderKanban, LucideIcon, Star } from 'lucide-react'

export const iconMap: Record<number, LucideIcon> = {
	1: DollarSign,
	2: FolderKanban,
	3: Album,
	4: Star,
}

export const getIcon = (id: number): LucideIcon => {
	return iconMap[id] || DollarSign
}
