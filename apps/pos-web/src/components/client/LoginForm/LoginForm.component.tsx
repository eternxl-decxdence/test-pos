'use client'
import Button from '@components/client/Button/Button.component'
import Input from '@components/server/Input/Input.component'
import { ReactComponent as Logo } from '@assets/cool-pos-logo.svg'
import config from './LoginForm.config'
import { useRouter } from 'next/navigation'
import useLogin from '@utils/hooks/useLogin'
import { FormEvent, useState } from 'react'
import { observer } from 'mobx-react'
import { authStore } from '@store/AuthStore'
import { userStore } from '@store/UserStore'
const LoginForm = observer(() => {
  const router = useRouter()
  const login = useLogin()

  const [credentials, setCredentials] = useState<{ username: string; password: string }>({
    username: '',
    password: '',
  })
  const [errorStatus, setErrorStatus] = useState<string>('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (credentials.username !== '' && credentials.password !== '') {
      login.mutate(
        { username: credentials.username, password: credentials.password },
        {
          onSuccess: (data) => {
            authStore.setAccessToken(data.accessToken)
            userStore.setGreet(data.greetname)
            router.push('/shop/dashboard')
          },
          onError: (data) => setErrorStatus(data.message),
        },
      )
    } else setErrorStatus('Wprowadź login i hasło')
  }
  return (
    <form
      method="post"
      onSubmit={handleSubmit}
      className={config.logic.composeStyles('login-form')}
    >
      <Logo className={config.logic.composeStyles('logo')} />

      <Input
        variant={errorStatus ? 'error' : 'default'}
        handleChange={(e) =>
          setCredentials({ username: e.target.value, password: credentials.password })
        }
        placeholder="examplelogin123"
        label="Login"
        inputName="username"
        inputType="text"
      />
      <Input
        variant={errorStatus ? 'error' : 'default'}
        handleChange={(e) =>
          setCredentials({ username: credentials.username, password: e.target.value })
        }
        placeholder="Podaj hasło"
        label="Hasło"
        inputName="password"
        inputType="password"
      />
      <Button submit label="Zaloguj się" auxClassNames="px-2 py-1.5" />
      {errorStatus && (
        <span className={config.logic.composeStyles('error-message')}>{errorStatus}</span>
      )}
    </form>
  )
})

export default LoginForm
