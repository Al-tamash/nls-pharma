import { Badge } from '@/components/ui/badge'
import { ReactNode } from 'react'

interface SectionHeaderProps {
  badge?: string
  title: string
  description?: string
  titleClassName?: string
  descriptionClassName?: string
}

export function SectionHeader({
  badge,
  title,
  description,
  titleClassName = 'text-3xl md:text-4xl font-bold text-foreground',
  descriptionClassName = 'text-lg text-muted-foreground max-w-2xl mx-auto',
}: SectionHeaderProps) {
  return (
    <div className="text-center space-y-4">
      {badge && <Badge variant="outline">{badge}</Badge>}
      <h2 className={titleClassName}>{title}</h2>
      {description && <p className={descriptionClassName}>{description}</p>}
    </div>
  )
}
