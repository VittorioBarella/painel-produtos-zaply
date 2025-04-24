'use client'

import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'

interface Props {
  onNewProduct: () => void
}

export default function MobileMenu({ onNewProduct }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button className="btn btn-light d-md-none" onClick={() => setOpen(true)}>
        <FaBars />
      </button>

      {open && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex flex-column text-white p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="m-0">Menu</h5>
            <button className="btn btn-outline-light" onClick={() => setOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <button className="btn btn-outline-light mb-2" onClick={onNewProduct}>
            Novo Produto
          </button>

          <button className="btn btn-outline-light" onClick={() => alert('Função sair ainda não implementada.')}>
             Sair
          </button>
        </div>
      )}
    </>
  )
}
