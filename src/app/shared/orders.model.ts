import { Item } from './item.model'
import { OrderItem } from './order-item.model'

export class Orders{
    orderNo: string
    pMethod: string
    customerId: number
    gTotal: number
    orderItem: OrderItem
}