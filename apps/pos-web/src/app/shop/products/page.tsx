import ProductsProvider from '@components/client/ProductsProvider/ProductsProvider'
import DashboardWidget from '@components/server/DashboardWidget/DashboardWidget.component'

export default function ProductsPage() {
  return (
    <DashboardWidget auxClassNames="h-full" title="Towary">
      <ProductsProvider />
    </DashboardWidget>
  )
}
