import Link from 'next/link'
import { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface CategoryCardProps {
  name: string
  description: string
  icon: LucideIcon
  count: string
  href: string
  color: string
}

export function CategoryCard({
  name,
  description,
  icon: Icon,
  count,
  href,
  color,
}: CategoryCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="text-center space-y-4">
        <div
          className={`h-16 w-16 mx-auto rounded-full flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}
        >
          <Icon className="h-8 w-8" />
        </div>
        <div>
          <CardTitle className="text-xl">{name}</CardTitle>
          <Badge variant="secondary" className="mt-2">
            {count}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <CardDescription className="text-base">{description}</CardDescription>
        <Button variant="outline" asChild className="w-full hover:bg-primary hover:text-primary-foreground hover:border-primary">
          <Link href={href}>
            View Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
