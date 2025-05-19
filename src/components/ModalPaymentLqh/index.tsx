import React from "react"
import { createPortal } from "react-dom"

import ModalStyle from "./index.module.scss"

interface ModalProps {
  title: string // 弹窗标题
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  showClose?: boolean // 是否显示关闭按钮，默认为 true
  zIndex?: number // 弹窗的 z-index，默认为 666
}

const ModalXzz2: React.FC<ModalProps> = ({ children, title, isOpen, showClose = false, onClose, zIndex = 666 }) => {
  if (isOpen) {
    document.body.style.overflow = "hidden"
    const bodyChildren = (
      <div className={ModalStyle.overlay} style={{ zIndex }}>
        <div
          className={ModalStyle.content}
          style={{ minWidth: "300px", minHeight: "260px", maxHeight: "90vh", overflow: "hidden" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={ModalStyle.header}>
            <div className={ModalStyle.headerContent}>
              <div className="text-[#222] text-[22px]">{title}</div>
              {showClose && (
                <div className={ModalStyle.closeIcon} onClick={onClose}>
                  <i className="iconfont icon-guanbi" style={{ fontSize: "20px" }}></i>
                </div>
              )}
            </div>
          </div>
          <div style={{ overflowY: "scroll", maxHeight: "calc(90vh - 60px)" }}>{children}</div>
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

export default ModalXzz2

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
