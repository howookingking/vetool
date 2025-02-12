import {
  DESKTOP_WIDTH_SEQUENCE,
  MOBILE_WIDTH_SEQUENCE,
} from '@/constants/hospital/icu/chart/order'

export type DesktopOrderWidth = (typeof DESKTOP_WIDTH_SEQUENCE)[number]
export type MobileOrderWidth = (typeof MOBILE_WIDTH_SEQUENCE)[number]
export type OrderWidth = DesktopOrderWidth | MobileOrderWidth
