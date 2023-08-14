import React from "react"
import { HashLoader } from "react-spinners"

type Props = {
  children: React.ReactNode
  loading: boolean
  buttonProps?: any, loaderProps?: {color: string, [name:string]: any}
}

export function LoadingButton({ children, loading, buttonProps, loaderProps }: Props) {
  const allButtonProps = {
    ...buttonProps,
    className: `${buttonProps?.className} ${loading && "pointer-events-none"}`,
  }
  return (
    <button {...allButtonProps}>
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
