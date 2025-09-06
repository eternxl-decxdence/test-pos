import DateTimeWidget from '@components/client/DateTimeWidget/DateTimeWidget.component'
import config from './login.config'
import LoginForm from '@components/client/LoginForm/LoginForm.component'

export default function LoginPage() {
  return (
    <>
      <LoginForm />
      <div className={config.logic.composeStyles('date-time-widget')}>
        <DateTimeWidget />
      </div>
    </>
  )
}
