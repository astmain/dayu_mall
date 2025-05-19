/**文档说明
 * @Description: 接口传入参数类型声明文档
 * @author liuJie
 * @Email 1547698569@qq.com
 * @date 2022/1/13 11:35
 */

import { OrderStatusType, OrderTypeType } from "@/views/order/common"

export interface getCanvasData {
  startTime: string
  endTime: string
  city: string
}

export interface getOrderParams {
  test: number
}

export interface orderDataParams {
  type: OrderTypeType
  status: OrderStatusType
}
