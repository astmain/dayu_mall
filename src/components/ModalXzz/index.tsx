import React from "react"
import { createPortal } from "react-dom"

import ModalStyle from "./index.module.scss"

interface ModalProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  showClose?: boolean // 是否显示关闭按钮，默认为 true
  zIndex?: number
}

const ModalXzz: React.FC<ModalProps> = ({ children, isOpen, showClose = false, onClose, zIndex = 888 }) => {
  if (isOpen) {
    document.body.style.overflow = "hidden"

    const bodyChildren = (
      <div className={ModalStyle.overlay} style={{ zIndex }}>
        <div
          className={ModalStyle.content}
          style={{ minWidth: "300px", minHeight: "260px" }}
          onClick={(e) => e.stopPropagation()}
        >
          {showClose && (
            <div className={ModalStyle.closeIcon} onClick={onClose}>
              <i className="iconfont icon-guanbi" style={{ fontSize: "20px" }}></i>
            </div>
          )}
          <div className="mt-[20px]">{children}</div>
        </div>
      </div>
    )
    return createPortal(bodyChildren, document.body)
  } else {
    document.body.style.overflow = "auto"

    return null
  }
}

// Modal.propTypes = {
//   width: PropTypes.string.isRequired,
//   height: PropTypes.string.isRequired,
//   children: PropTypes.node.isRequired,
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
// }

export default ModalXzz

// 示例父组件
// const App = () => {
//   const [isModalOpen, setModalOpen] = useState(false)

//   const openModal = () => {
//     setModalOpen(true)
//   }

//   const closeModal = () => {
//     setModalOpen(false)
//   }

//   return (
//     <div>
//       <button onClick={openModal}>打开弹窗</button>
//       <Modal width="400px" height="300px" isOpen={isModalOpen} onClose={closeModal}>
//         <h2>这是弹窗内容</h2>
//         <p>可以在这里放任何 JSX 内容。</p>
//       </Modal>
//     </div>
//   )
// }
