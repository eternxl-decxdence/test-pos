'use client'
import { motion } from 'motion/react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouse,
  faCashRegister,
  faCartArrowDown,
  faChartSimple,
} from '@fortawesome/free-solid-svg-icons'
import config from './NavBar.config'
import { usePathname } from 'next/navigation'

export default function NavBar() {
  const currentPath = usePathname()

  const tabs = [
    { icon: faHouse, label: 'Główna', link: '/dashboard' },
    { icon: faCashRegister, label: 'Sprzedaż', link: '/sell' },
    { icon: faCartArrowDown, label: 'Towary', link: '/products' },
  ]
  const baseURL = '/shop'

  return (
    <div className={config.logic.composeStyles('container')}>
      {tabs.map((tab) => {
        const isActive = currentPath.startsWith(baseURL + tab.link)
        return (
          <Link
            key={tab.label}
            href={baseURL + tab.link}
            className={config.logic.composeStyles('nav-button')}
          >
            <FontAwesomeIcon
              icon={tab.icon}
              className={config.logic.composeStyles(`nav-icon${isActive ? '-active' : ''}`)}
            />
            <span className={config.logic.composeStyles(`nav-label${isActive ? '-active' : ''}`)}>
              {tab.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className={config.logic.composeStyles('animated-background')}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </Link>
        )
      })}
    </div>
  )
}
