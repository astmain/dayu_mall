// import { cs } from '@/utils'
import cart from "@assets/cart.webp"
import { useGlobalStore } from "@store/global"
import { useUserStore } from "@store/user"
import { Badge } from "antd"
import { useTranslation } from "react-i18next"

import CartStyle from "./index.module.scss"
function Cart() {
  // const navigate = useNavigate()
  const { cartCount } = useGlobalStore()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const token = useUserStore((state) => state.token)

  return (
    token && (
      <div className={CartStyle.cart} onClick={() => navigate("/shoppingcart")}>
        <Badge count={cartCount} offset={[10, 8]}>
          <div className={CartStyle.box}>
            <img src={cart} alt="" style={{ width: "20px", height: "20px" }} />
            <div>{t("header.cart")}</div>
            {/* {cartCount > 0 && <div className={CartStyle.badge}>{cartCount}</div>} */}
          </div>
        </Badge>
      </div>
    )
  )
}

export default Cart
