"use client"

import { useState, useEffect, useRef } from "react"
import { Check, X } from "lucide-react"
import { apiRequest } from "@/lib/api"
import type { ReportUpdateRequest } from "@/types/report"

interface EditStatusModalProps {
  isOpen: boolean
  onClose: () => void
  reportId: string
  currentStatus: string
  onStatusUpdated: () => void
}

export function EditStatusModal({ isOpen, onClose, reportId, currentStatus, onStatusUpdated }: EditStatusModalProps) {
  const [status, setStatus] = useState(currentStatus)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Handle ESC key press
  useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen, onClose])

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)

      // Create a FormData object to pass to the server action
      const formData = new FormData()
      formData.append("reportId", reportId)
      formData.append("status", status)

      // Call the server action
      const updateAction = async () => {
        try {
          const reportId = formData.get("reportId") as string
          const status = (formData.get("status") as string).toUpperCase()

          const res = await apiRequest<ReportUpdateRequest>({
            endpoint: `/report/${reportId}`,
            method: "PUT",
            body: { status },
          })

          // Call the callback to notify parent component
          onStatusUpdated()
          return res
        } catch (error) {
          console.error("Error updating report status:", error)
          throw error
        }
      }

      await updateAction()
      onClose()
    } catch (error) {
      console.error("Failed to update status:", error)
      // You could add a toast notification here
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium">Update Status</h3>
        </div>

        <div className="p-4">
          <div className="py-2">
            <label htmlFor="status-select" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="p-4 border-t flex justify-between">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Updating...
              </span>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Save
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

