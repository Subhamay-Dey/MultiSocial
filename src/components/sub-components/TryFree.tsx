"use client"

import { signIn } from 'next-auth/react'

export default function TryFree({children}: {children: React.ReactNode}) {
  return (
    <>
      <div onClick={() => (document.getElementById('sign_in_modal') as HTMLDialogElement)?.showModal()}>
        {children}
      </div>

      <dialog id="sign_in_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          
          <h3 className="font-bold text-lg">You have to Sign In first!</h3>
          <p className="py-4">
            To access the free trial period, you have to sign in to MultiSocial!
          </p>
          
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-ghost mr-2">Cancel</button>
              <button 
                className="btn btn-ghost" 
                onClick={() => signIn()}
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}