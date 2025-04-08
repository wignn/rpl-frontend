"use client"

import { useEffect, useRef } from "react"
import type { FinanceDetailsResponse } from "@/types/finance"

type TimePeriod = "day" | "week" | "month" | "year" | "all"

interface FinanceChartProps {
  data: FinanceDetailsResponse[]
  timePeriod: TimePeriod
}

export function FinanceChart({ data, timePeriod }: FinanceChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return
    const now = new Date()
    const filteredData = data.filter((item) => {
      const itemDate = new Date(item.created_at)

      switch (timePeriod) {
        case "day":
          return (
            itemDate.getDate() === now.getDate() &&
            itemDate.getMonth() === now.getMonth() &&
            itemDate.getFullYear() === now.getFullYear()
          )
        case "week":
          const oneWeekAgo = new Date()
          oneWeekAgo.setDate(now.getDate() - 7)
          return itemDate >= oneWeekAgo
        case "month":
          return itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear()
        case "year":
          return itemDate.getFullYear() === now.getFullYear()
        default:
          return true
      }
    })
    const groupedData: Record<string, { income: number; outcome: number }> = {}
    let labels: string[] = []

    switch (timePeriod) {
      case "day":
        for (let i = 0; i < 24; i++) {
          const hour = i.toString().padStart(2, "0")
          groupedData[hour] = { income: 0, outcome: 0 }
          labels.push(`${hour}:00`)
        }

        filteredData.forEach((item) => {
          const date = new Date(item.created_at)
          const hour = date.getHours().toString().padStart(2, "0")

          if (item.type === "INCOME") {
            groupedData[hour].income += item.amount
          } else {
            groupedData[hour].outcome += item.amount
          }
        })
        break

      case "week":
        // Group by day of week (last 7 days)
        const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"]
        const today = now.getDay()

        for (let i = 6; i >= 0; i--) {
          const dayIndex = (today - i + 7) % 7
          const day = dayNames[dayIndex]
          const date = new Date()
          date.setDate(now.getDate() - i)
          const dateStr = `${day} ${date.getDate()}`

          groupedData[dateStr] = { income: 0, outcome: 0 }
          labels.push(dateStr)
        }

        filteredData.forEach((item) => {
          const date = new Date(item.created_at)
          const dayDiff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

          if (dayDiff >= 0 && dayDiff < 7) {
            const dayIndex = (today - dayDiff + 7) % 7
            const day = dayNames[dayIndex]
            const dateStr = `${day} ${date.getDate()}`

            console.log(item.type)
            if (!groupedData[dateStr]) {
              groupedData[dateStr] = { income: 0, outcome: 0 }
            }
            
            if (item.type === "INCOME") {
              groupedData[dateStr].income += item.amount
            } else {
              groupedData[dateStr].outcome += item.amount
            }
            
          }
        })
        break

      case "month":
        // Group by day of month (1-31)
        const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()

        for (let i = 1; i <= daysInMonth; i++) {
          const day = i.toString()
          groupedData[day] = { income: 0, outcome: 0 }
          labels.push(day)
        }

        filteredData.forEach((item) => {
          const date = new Date(item.created_at)
          const day = date.getDate().toString()

          if (item.type === "INCOME") {
            groupedData[day].income += item.amount
          } else {
            groupedData[day].outcome += item.amount
          }
        })
        break

      case "year":
      default:
        // Group by month (Jan-Dec)
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        monthNames.forEach((month) => {
          groupedData[month] = { income: 0, outcome: 0 }
        })
        labels = monthNames

        filteredData.forEach((item) => {
          const date = new Date(item.created_at)
          const month = monthNames[date.getMonth()]

          if (item.type === "INCOME") {
            groupedData[month].income += item.amount
          } else {
            groupedData[month].outcome += item.amount
          }
        })
        break
    }

    // Prepare data for chart
    const incomeData = labels.map((label) => groupedData[label]?.income || 0)
    const outcomeData = labels.map((label) => groupedData[label]?.outcome || 0)

    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    // Set dimensions
    const width = canvasRef.current.width
    const height = canvasRef.current.height
    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Find max value for scaling
    const maxValue = Math.max(...incomeData, ...outcomeData) || 1 // Prevent division by zero

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "#e5e7eb"
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Draw income line
    ctx.beginPath()
    ctx.strokeStyle = "#10b981"
    ctx.lineWidth = 2

    labels.forEach((_, i) => {
      const x = padding + (i * chartWidth) / (labels.length - 1 || 1)
      const y = height - padding - (incomeData[i] / maxValue) * chartHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Draw outcome line
    ctx.beginPath()
    ctx.strokeStyle = "#ef4444"
    ctx.lineWidth = 2

    labels.forEach((_, i) => {
      const x = padding + (i * chartWidth) / (labels.length - 1 || 1)
      const y = height - padding - (outcomeData[i] / maxValue) * chartHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Draw labels
    ctx.fillStyle = "#6b7280"
    ctx.font = "10px Arial"
    ctx.textAlign = "center"

    // Determine how many labels to show to avoid overcrowding
    const labelStep = Math.ceil(labels.length / 12) // Show max 12 labels

    labels.forEach((label, i) => {
      if (i % labelStep === 0 || i === labels.length - 1) {
        const x = padding + (i * chartWidth) / (labels.length - 1 || 1)
        ctx.fillText(label, x, height - padding + 15)
      }
    })

    // Draw dots and tooltips for data points
    // For day/week/month views, highlight the current point
    // For year view, highlight the current month

    let highlightIndex: number

    switch (timePeriod) {
      case "day":
        highlightIndex = now.getHours()
        break
      case "week":
        highlightIndex = 6 // Last day (today)
        break
      case "month":
        highlightIndex = now.getDate() - 1
        break
      case "year":
        highlightIndex = now.getMonth()
        break
      default:
        highlightIndex = -1
    }

    if (highlightIndex >= 0 && highlightIndex < labels.length) {
      if (incomeData[highlightIndex] > 0) {
        const x = padding + (highlightIndex * chartWidth) / (labels.length - 1 || 1)
        const y = height - padding - (incomeData[highlightIndex] / maxValue) * chartHeight

        ctx.beginPath()
        ctx.fillStyle = "#10b981"
        ctx.arc(x, y, 5, 0, Math.PI * 2)
        ctx.fill()

        // Draw tooltip for income
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
        ctx.fillRect(x - 40, y - 30, 80, 20)
        ctx.strokeStyle = "#10b981"
        ctx.strokeRect(x - 40, y - 30, 80, 20)

        ctx.fillStyle = "#10b981"
        ctx.textAlign = "center"
        ctx.fillText(`Rp ${incomeData[highlightIndex].toLocaleString()}`, x, y - 15)
      }

      if (outcomeData[highlightIndex] > 0) {
        const x = padding + (highlightIndex * chartWidth) / (labels.length - 1 || 1)
        const y = height - padding - (outcomeData[highlightIndex] / maxValue) * chartHeight

        ctx.beginPath()
        ctx.fillStyle = "#ef4444"
        ctx.arc(x, y, 5, 0, Math.PI * 2)
        ctx.fill()

        // Draw tooltip for outcome
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
        ctx.fillRect(x - 40, y - 30, 80, 20)
        ctx.strokeStyle = "#ef4444"
        ctx.strokeRect(x - 40, y - 30, 80, 20)

        ctx.fillStyle = "#ef4444"
        ctx.textAlign = "center"
        ctx.fillText(`Rp ${outcomeData[highlightIndex].toLocaleString()}`, x, y - 15)
      }
    }
  }, [data, timePeriod])

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} width={800} height={300} className="w-full h-full" />
      {data.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500">Tidak ada data untuk periode ini</p>
        </div>
      )}
    </div>
  )
}

