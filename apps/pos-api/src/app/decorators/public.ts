// Dekorator 'Public' używany do oznaczania endpointów jako publicznych
// Pozwala guard'owi na pominięcie autoryzacji dla konkretnych handlerów lub klas.

import { SetMetadata } from '@nestjs/common'

export const IS_PUBLIC_KEY = 'isPublic'
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)
