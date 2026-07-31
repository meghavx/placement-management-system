// import { useEffect, useRef, useState } from 'react'
// import { MoreVertical } from 'lucide-react'

// export default function ActionMenu({ items = [] }) {
//   const [open, setOpen] = useState(false)
//   const menuRef = useRef(null)

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setOpen(false)
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside)

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [])

//   return (
//     <div className="relative inline-block" ref={menuRef}>
//       <button
//         type="button"
//         onClick={() => setOpen((prev) => !prev)}
//         className="rounded-md p-2 transition hover:bg-gray-100"
//       >
//         <MoreVertical size={18} />
//       </button>

//       {open && (
//         <div className="absolute right-0 z-50 mt-2 w-40 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
//           {items.map((item) => (
//             <button
//               key={item.label}
//               type="button"
//               onClick={() => {
//                 item.onClick()
//                 setOpen(false)
//               }}
//               className={`flex w-full items-center px-4 py-2 text-sm text-left hover:bg-gray-100 ${
//                 item.active ? 'font-semibold text-primary-600' : 'text-gray-700'
//               }`}
//             >
//               {item.label}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }


import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { MoreVertical } from 'lucide-react'

export default function ActionMenu({ items = [] }) {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  const buttonRef = useRef(null)

  useLayoutEffect(() => {
    if (!open || !buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()

    const menuWidth = 160

    let left = rect.right + window.scrollX - menuWidth

    if (left < 8) {
        left = 8
    }

    if (left + menuWidth > window.innerWidth + window.scrollX) {
        left = window.innerWidth + window.scrollX - menuWidth - 8
    }

    setPosition({
        top: rect.bottom + window.scrollY + 6,
        left,
    })
    }, [open])

  useEffect(() => {
    if (!open) return

    const handleClickOutside = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        !event.target.closest('.action-menu')
      ) {
        setOpen(false)
      }
    }

    const handleScroll = () => {
      setOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('scroll', handleScroll, true)
    window.addEventListener('resize', handleScroll)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('scroll', handleScroll, true)
      window.removeEventListener('resize', handleScroll)
    }
  }, [open])

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-md p-2 transition hover:bg-gray-100"
      >
        <MoreVertical size={18} />
      </button>

      {open &&
        createPortal(
          <div
            className="action-menu fixed z-[9999] w-40 rounded-lg border border-gray-200 bg-white py-1 shadow-xl"
            style={{
              top: position.top,
              left: position.left,
            }}
          >
            {items.map((item) => (
              <button
                key={item.label}
                type="button"
                disabled={item.active}
                onClick={() => {
                  item.onClick()
                  setOpen(false)
                }}
                className={`flex w-full items-center px-4 py-2 text-left text-sm transition
                  ${
                    item.active
                      ? 'cursor-default bg-gray-50 font-semibold text-primary-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>,
          document.body
        )}
    </>
  )
}