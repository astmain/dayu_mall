const copyToClipboard = async (text: string): Promise<boolean> => {
  // Try modern Clipboard API first
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (err) {
      console.error("Failed to copy using Clipboard API:", err)
    }
  }

  // Fallback to older method
  try {
    const el = document.createElement("textarea")
    const iOS = window.navigator.userAgent.match(/ipad|iphone/i)
    const yPosition = window.scrollY || document.documentElement.scrollTop

    el.contentEditable = "true"
    el.readOnly = false
    el.value = text
    el.style.border = "0"
    el.style.padding = "0"
    el.style.margin = "0"
    el.style.position = "absolute"
    el.style.top = `${yPosition}px`

    document.body.appendChild(el)

    if (iOS) {
      const range = document.createRange()
      range.selectNodeContents(el)
      const selection = window.getSelection()
      selection?.removeAllRanges()
      selection?.addRange(range)
      el.setSelectionRange(0, 999999)
    } else {
      el.select()
    }

    const successful = document.execCommand("copy")
    document.body.removeChild(el)
    return successful
  } catch (err) {
    console.error("Failed to copy text:", err)
    return false
  }
}

export default copyToClipboard
