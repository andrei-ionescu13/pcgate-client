"use client"

import { useState } from "react";

export const useOpen = (initialOpen = false): [boolean, () => void, () => void] => {
  const [open, setOpen] = useState(initialOpen);

  const handleOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  return [open, handleOpen, handleClose];
}