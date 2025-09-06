// Globalny moduł zapewniający instancję PrismaClient dla całego aplikacyjnego kontekstu.
// Rejestrujemy PrismaClient jako provider, dzięki czemu możemy go wstrzykiwać w serwisach.
import { Global, Module } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Global()
@Module({
  providers: [
    {
      provide: PrismaClient,
      useValue: new PrismaClient(),
    },
  ],
  exports: [PrismaClient],
})
export class PrismaModule {}
