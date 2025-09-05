import Input from '@components/server/Input/Input.component'
import { shiftStore } from '@store/ShiftStore'
import { FormEvent } from 'react'
import Button from '../Button/Button.component'
import { observer } from 'mobx-react'
import { motion } from 'motion/react'

const CashInputModal = observer(
  ({ handleSubmit }: { handleSubmit: (e: FormEvent<HTMLFormElement>) => void }) => {
    return (
      <motion.form
        method="post"
        onSubmit={handleSubmit}
        className="px-3 py-2 rounded-md flex flex-col shadow-2xl gap-2 outline-1 outline-sky-500 bg-sky-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <Input
          label="Wprowadź ilość gotówki w kasie"
          inputName="cashAmount"
          defaultValue={shiftStore.cash ? shiftStore.cash : 300.0}
          placeholder={shiftStore.cash ? shiftStore.cash.toString() : '300.0'}
        />
        <Button submit label="Wyślij" auxClassNames="px-21 py-2"></Button>
      </motion.form>
    )
  },
)

export default CashInputModal
