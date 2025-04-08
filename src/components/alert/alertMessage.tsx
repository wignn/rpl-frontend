"use client"

import { useEffect } from "react"
import { CheckCircle, AlertCircle, X } from 'lucide-react'

type AlertType = "success" | "error"

interface AlertMessageProps {
  type: AlertType
  message: string
  isOpen: boolean
  onClose: () => void
  autoClose?: boolean
  autoCloseTime?: number
}

export default function AlertMessage({
  type,
  message,
  isOpen,
  onClose,
  autoClose = true,
  autoCloseTime = 3000,
}: AlertMessageProps) {
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose()
      }, autoCloseTime)

      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose, autoClose, autoCloseTime])

  if (!isOpen) return null

  return (
    <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-5 duration-300">
      <div 
        className={`bg-white border-l-4 ${
          type === "success" ? "border-green-500" : "border-red-500"
        } rounded-lg shadow-lg p-4 flex items-start max-w-md`}
      >
        {type === "success" ? (
          <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
        ) : (
          <AlertCircle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0" />
        )}
        <div className="flex-1">
          <p className="text-gray-800 font-medium">{message}</p>
        </div>
        <button title="x" onClick={onClose} className="text-gray-400 hover:text-gray-600 ml-4 flex-shrink-0">
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
