import { useState, useCallback } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { Plus, Trash2, Sun, Moon, MapPin, ArrowRight, Calendar, Clock, Save, FileDown } from 'lucide-react'
import PageHero from '../components/ui/page-hero'
import { ATTRACTIONS, DINING, STAY, EXPERIENCES, EVENTS } from '../data'
import StructuredData from '../components/seo/structured-data'

interface DayPlan {
  day: number
  items: { id: string; name: string; type: string; time?: string }[]
}

export default function TripPlanner() {
  const [days, setDays] = useState<DayPlan[]>([{ day: 1, items: [] }])
  const [saved, setSaved] = useState(false)

  const allItems = [
    ...ATTRACTIONS.map(i => ({ id: i.id, name: i.name, type: 'attraction' })),
    ...DINING.map(i => ({ id: i.id, name: i.name, type: 'dining' })),
    ...STAY.map(i => ({ id: i.id, name: i.name, type: 'stay' })),
    ...EXPERIENCES.map(i => ({ id: i.id, name: i.name, type: 'experience' })),
    ...EVENTS.map(i => ({ id: i.id, name: i.name, type: 'event' })),
  ]

  const addDay = () => setDays([...days, { day: days.length + 1, items: [] }])

  const addItem = (dayIndex: number, item: { id: string; name: string; type: string }) => {
    const updated = [...days]
    if (!updated[dayIndex].items.some(i => i.id === item.id)) {
      updated[dayIndex].items.push({ ...item, time: '09:00' })
      setDays(updated)
      setSaved(false)
    }
  }

  const removeItem = (dayIndex: number, itemId: string) => {
    const updated = [...days]
    updated[dayIndex].items = updated[dayIndex].items.filter(i => i.id !== itemId)
    setDays(updated)
    setSaved(false)
  }

  const saveItinerary = useCallback(async () => {
    try {
      const { jsPDF } = await import('jspdf')

      const doc = new jsPDF({ format: 'a4', unit: 'mm' })
      const pageWidth = doc.internal.pageSize.getWidth()
      const margin = 20
      const contentWidth = pageWidth - margin * 2
      let y = margin

      const gold = '#C5954A'
      const dark = '#1a1a2e'
      const gray = '#666'
      const lightGray = '#f5f5f5'

      const addFooter = () => {
        const pageCount = doc.getNumberOfPages()
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i)
          doc.setFontSize(7)
          doc.setTextColor(gray)
          doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin, doc.internal.pageSize.getHeight() - 10, { align: 'right' })
          doc.text('Generated ' + new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }), margin, doc.internal.pageSize.getHeight() - 10)
        }
      }

      // Load & draw logo
      const logoImg = new Image()
      logoImg.crossOrigin = 'anonymous'
      const logoLoaded = new Promise<void>((resolve) => {
        logoImg.onload = () => {
          try {
            const canvas = document.createElement('canvas')
            canvas.width = logoImg.naturalWidth
            canvas.height = logoImg.naturalHeight
            const ctx = canvas.getContext('2d')!
            ctx.drawImage(logoImg, 0, 0)
            const dataUrl = canvas.toDataURL('image/png')
            const imgWidth = 40
            const imgHeight = (logoImg.naturalHeight / logoImg.naturalWidth) * imgWidth
            doc.addImage(dataUrl, 'PNG', margin, y, imgWidth, imgHeight)
            y += imgHeight + 8
          } catch {}
          resolve()
        }
        logoImg.onerror = () => resolve()
        logoImg.src = '/Images/mylogo.png'
      })
      await logoLoaded

      // Title
      doc.setFontSize(22)
      doc.setTextColor(dark)
      doc.text('Trip Itinerary', margin, y)
      y += 9

      doc.setFontSize(9)
      doc.setTextColor(gold)
      doc.text('ASUOGYAMAN TOURISM & BUSINESS HUB', margin, y)
      y += 7

      // Divider
      doc.setDrawColor(gold)
      doc.setLineWidth(0.5)
      doc.line(margin, y, pageWidth - margin, y)
      y += 8

      // Date range
      const totalDays = days.filter(d => d.items.length > 0).length
      doc.setFontSize(8)
      doc.setTextColor(gray)
      const dateStr = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      doc.text(`${totalDays}-Day Trip — ${dateStr}`, margin, y)
      y += 10

      // Days
      let hasActivities = false
      for (const day of days) {
        if (day.items.length === 0) continue
        hasActivities = true

        // Check if we need a new page
        const estimatedHeight = 20 + day.items.length * 7
        if (y + estimatedHeight > doc.internal.pageSize.getHeight() - 20) {
          addFooter()
          doc.addPage()
          y = margin
        }

        // Day header bg
        doc.setFillColor(26, 26, 46)
        doc.roundedRect(margin, y, contentWidth, 8, 1.5, 1.5, 'F')
        doc.setFontSize(9)
        doc.setTextColor('#fff')
        doc.text(`Day ${day.day}`, margin + 3, y + 5.5)

        // Day type icon indicator
        doc.setFontSize(6)
        doc.setTextColor(gold)
        doc.text(`${day.items.length} ${day.items.length === 1 ? 'activity' : 'activities'}`, pageWidth - margin - 3, y + 5.5, { align: 'right' })

        y += 13

        // Items
        day.items.forEach((item, idx) => {
          // Row bg
          if (idx % 2 === 0) {
            doc.setFillColor(250, 250, 250)
            doc.rect(margin, y - 2, contentWidth, 7, 'F')
          }

          doc.setFontSize(8)
          doc.setTextColor(gray)
          doc.text(item.time || '09:00', margin + 2, y + 2)

          doc.setFontSize(8)
          doc.setTextColor(dark)
          doc.text(item.name, margin + 14, y + 2)

          doc.setFontSize(6)
          doc.setTextColor(gold)
          doc.text(item.type.toUpperCase(), pageWidth - margin - 2, y + 2, { align: 'right' })

          y += 7
        })

        y += 4
      }

      if (!hasActivities) {
        doc.setFontSize(10)
        doc.setTextColor(gray)
        doc.text('No activities planned yet. Add activities from the sidebar.', margin, y)
      }

      addFooter()

      // Save
      doc.save('atbh-itinerary.pdf')
      localStorage.setItem('atbh-itinerary', JSON.stringify(days))
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch {}
  }, [days])

  const clearAll = () => {
    setDays([{ day: 1, items: [] }])
    localStorage.removeItem('atbh-itinerary')
  }

  return (
    <div className="min-h-screen bg-bg">
      <StructuredData type="TouristDestination" name="Trip Planner" description="Plan your itinerary for Asuogyaman, Ghana" />
      <PageHero
        title="Trip Planner"
        subtitle="Build your perfect Asuogyaman itinerary"
        image="/Images/adomi-bridge-hero.jpg"
      />
      <div className="max-w-6xl mx-auto px-5 py-8 grid md:grid-cols-[1fr_320px] gap-8">
        {/* Planner */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-medium text-fg">Your Itinerary</h2>
            <div className="flex items-center gap-2">
              <button onClick={clearAll} className="text-[10px] text-muted hover:text-red-500 transition-colors flex items-center gap-1"><Trash2 className="w-3 h-3" /> Clear</button>
              <button onClick={saveItinerary} className="flex items-center gap-1.5 px-3 py-1.5 bg-accent text-accent-fg text-[10px] font-medium rounded-lg hover:bg-accent/90 transition-all">
                <FileDown className="w-3 h-3" /> {saved ? 'Saved!' : 'Download PDF'}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {days.map((day, di) => (
              <motion.div key={di} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-surface border border-border/60 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center">
                      {di % 2 === 0 ? <Sun className="w-3.5 h-3.5 text-accent" /> : <Moon className="w-3.5 h-3.5 text-accent" />}
                    </div>
                    <span className="text-xs font-medium text-fg">Day {day.day}</span>
                  </div>
                  <span className="text-[10px] text-muted">{day.items.length} {day.items.length === 1 ? 'activity' : 'activities'}</span>
                </div>
                {day.items.length === 0 ? (
                  <p className="text-[10px] text-muted py-4 text-center">Add activities from the sidebar</p>
                ) : (
                  <div className="space-y-1.5">
                    {day.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-bg border border-border/40 text-xs">
                        <Clock className="w-3 h-3 text-muted shrink-0" />
                        <input type="time" value={item.time || '09:00'} onChange={(e) => { const u = [...days]; u[di].items = u[di].items.map(i => i.id === item.id ? { ...i, time: e.target.value } : i); setDays(u); setSaved(false) }} className="text-[10px] bg-transparent border-none outline-none text-muted w-16" />
                        <span className="flex-1 text-fg truncate">{item.name}</span>
                        <span className="text-[9px] uppercase tracking-wider text-accent/70">{item.type}</span>
                        <button onClick={() => removeItem(di, item.id)} className="text-muted hover:text-red-500 transition-colors">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <button onClick={addDay} className="mt-4 w-full py-2.5 border-2 border-dashed border-border rounded-xl text-xs text-muted hover:text-accent hover:border-accent/30 transition-all">
            + Add Day
          </button>
        </div>

        {/* Sidebar */}
        <div>
          <h3 className="text-xs font-medium text-fg mb-3 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-accent" /> Add Activities</h3>
          <div className="space-y-1 max-h-[60vh] overflow-y-auto">
            {allItems.map((item) => (
              <button
                key={item.id}
                onClick={() => addItem(days.length - 1, item)}
                className="w-full text-left px-3 py-2 rounded-lg text-xs text-muted hover:text-fg hover:bg-accent/5 border border-transparent hover:border-accent/20 transition-all flex items-center gap-2"
              >
                <Plus className="w-3 h-3 text-accent shrink-0" />
                <span className="flex-1 truncate">{item.name}</span>
                <span className="text-[8px] uppercase tracking-wider text-accent/60 shrink-0">{item.type}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
