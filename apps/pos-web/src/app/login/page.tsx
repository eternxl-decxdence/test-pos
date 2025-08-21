import Button from '@components/client/Button/Button.component'
import DateTimeWidget from '@components/client/DateTimeWidget/DateTimeWidget.component'
import config from './login.config'
import Input from '@components/server/Input/Input.component'
import { ReactComponent as Logo } from '@assets/cool-pos-logo.svg'
export default function LoginPage() {
  return (
    <>
      <form className={config.logic.composeStyles('login-form')}>
        <Logo className={config.logic.composeStyles('logo')} />

        <Input placeholder="janedoe123" label="Login" inputName="login" inputType="text" />
        <Input placeholder="Podaj hasło" label="Hasło" inputName="password" inputType="password" />
        <Button label="Zaloguj się" auxClassNames="px-2 py-1.5" />
      </form>
      <div className={config.logic.composeStyles('date-time-widget')}>
        <DateTimeWidget />
      </div>
    </>
  )
}
