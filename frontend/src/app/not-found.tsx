'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light text-center p-4">
      <h1 className="display-3 text-primary">404</h1>
      <p className="lead mb-4 text-dark">Oops! Página não encontrada.</p>
      <Link href="/" className="btn btn-primary rounded-pill px-4 py-2 fw-bold">
        Voltar para o início
      </Link>
    </main>
  )
}