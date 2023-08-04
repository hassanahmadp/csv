import React from "react"
import { HashLoader } from "react-spinners"

type Props = {
  children: React.ReactNode
  loading: boolean
  buttonProps?: any, loaderProps?: {color: string, [name:string]: any}
}

export function LoadingButton({ children, loading, buttonProps, loaderProps }: Props) {
  return (
    <button {...buttonProps}>
      {!loading && children}
      {loading && (
        <HashLoader
          color={loaderProps?.color || "#fff"}
          loading={true}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </button>
  )
}
