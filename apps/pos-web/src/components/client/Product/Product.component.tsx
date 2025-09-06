import { IProduct } from './Product.types'
import config from './Product.config'

export default function Product({ name, imageHref, price, quantity, category }: IProduct) {
  return (
    <div className={config.logic.composeStyles('main-container')}>
      <div className={config.logic.composeStyles('image-container')}>
        <img src={imageHref} className={config.logic.composeStyles('image-styles')} />
      </div>
      <p className={config.logic.composeStyles('text')}>{name}</p>
      <p className={config.logic.composeStyles('text')}>{category}</p>
      <p className={config.logic.composeStyles('text')}>
        {price.toLocaleString('pl-PL', { currency: 'PLN', style: 'currency' })}
      </p>
      <p className={config.logic.composeStyles('text')}>
        Na stanie: <br />
        {quantity} szt.
      </p>
    </div>
  )
}
