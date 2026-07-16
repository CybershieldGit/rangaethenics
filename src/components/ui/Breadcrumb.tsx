import { Fragment } from 'react'
import { Link } from 'react-router-dom'

export interface Crumb {
  label: string
  to?: string
}

interface BreadcrumbProps {
  items?: Crumb[]
  className?: string
}

export function Breadcrumb({ items = [], className = '' }: BreadcrumbProps) {
  const crumbs: Crumb[] = [{ label: 'Home', to: '/' }, ...items]

  return (
    <div className={`py-4 ${className}`}>
      <nav
        aria-label="Breadcrumb"
        className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3.5 text-[12px] md:text-[16px] md:px-8"
      >
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1
          return (
            <Fragment key={`${crumb.label}-${i}`}>
              {crumb.to && !isLast ? (
                <Link to={crumb.to} className="text-text transition-colors hover:text-maroon">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-text">{crumb.label}</span>
              )}
              {!isLast && <span className="text-text/60">&gt;</span>}
            </Fragment>
          )
        })}
      </nav>
    </div>
  )
}
