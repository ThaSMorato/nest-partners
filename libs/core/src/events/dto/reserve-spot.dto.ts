import { TicketKind } from '@prisma/client'

export class ReserveSpotDTO {
  spots: string[]
  ticketKind: TicketKind
  email: string
}
