import { motion } from "framer-motion"
import React from "react"
import { createPortal } from "react-dom"

import { usePreventBodyScroll } from "@/hooks/usePreventBodyScroll"

interface ModalProps {
  title: string // 弹窗标题
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  showClose?: boolean // 是否显示关闭按钮，默认为 true
  zIndex?: number // 弹窗的 z-index，默认为 666
}

const ModalXzz2: React.FC<ModalProps> = ({ children, title, isOpen, showClose = false, onClose, zIndex = 666 }) => {
  usePreventBodyScroll(isOpen)

  if (!isOpen) {
    return null
  }

  const bodyChildren = (
    <motion.div
      style={{ zIndex }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        style={{ minWidth: "300px", minHeight: "260px", maxHeight: "90vh", overflow: "hidden" }}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div>
          <div>
            <div className="text-[#222] text-[22px]">{title}</div>
            {showClose && (
              <div onClick={() => startTransition(() => onClose())}>
                <i className="iconfont icon-guanbi" style={{ fontSize: "20px" }}></i>
              </div>
            )}
          </div>
        </div>
        <div style={{ overflowY: "scroll", maxHeight: "calc(90vh - 60px)" }}>{children}</div>
      </motion.div>
    </motion.div>
  )
  return createPortal(bodyChildren, document.body)
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
