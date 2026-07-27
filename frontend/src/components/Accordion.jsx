/*
========================================
Component: Accordion

Purpose:
Reusable expandable section, used for FAQs, Resume Guidelines,
Eligibility Rules, and Selection Process display.

Current Features:
- Single accordion item that expands/collapses
- AccordionGroup wraps multiple items

Future:
- None; keep this the single Accordion implementation.
========================================
*/

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

function AccordionItem({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-3 text-left text-sm font-medium text-gray-800"
      >
        {title}
        <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="pb-3 text-sm text-gray-600">{children}</div>}
    </div>
  )
}

export default function Accordion({ items = [] }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white px-4">
      {items.map((item, index) => (
        <AccordionItem key={item.title} title={item.title} defaultOpen={index === 0}>
          {item.content}
        </AccordionItem>
      ))}
    </div>
  )
}
