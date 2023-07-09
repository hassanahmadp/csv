"use client"
import {  UserInfo } from "@/components"
import React from "react"

type Props = {}

export default function Dashboard({}: Props) {
  return (
    <>
      <UserInfo editAccess={true}/>
    </>
  )
}
