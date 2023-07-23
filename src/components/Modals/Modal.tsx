'use client'
import React, {useState} from 'react'

type Props = {
  children: React.ReactNode,
  setShowModal: any,
  maxWidth?: 'sm' | 'md' | 'lg' 
}

export function Modal({children, setShowModal, maxWidth='sm'}: Props) {
  let size = maxWidth === 'sm' ? '20rem' : maxWidth === 'md' ? '30rem' : '40rem'
  return (
    <div className='fixed top-0 left-0 w-screen h-screen flex justify-center items-center p-5'>
      <div className='absolute top-0 left-0 h-full w-full bg-black opacity-20' onClick={() => setShowModal(false)}></div>
      <div className={`relative w-full max-w-[${size}] min-h-[20rem] max-h-[80vh] overflow-auto bg-white rounded-xl shadow-xl`}>{children}</div>
    </div>
  )
}