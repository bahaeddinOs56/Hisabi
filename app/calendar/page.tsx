"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import NavigationBar from "../../components/NavigationBar"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Calculator, Plus, X } from "lucide-react"
import { format, addDays, isBefore, isToday, parseISO } from "date-fns"
import { ar } from "date-fns/locale"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import styles from "./styles.module.css"
import { useLanguage } from "../../contexts/LanguageContext"
import { translations } from "../../utils/translations"

// Tax calendar events for 2025
const initialTaxEvents = {
  "2025-01-31": { title: "Monthly VAT Return Due", type: "vat", calculator: "/calculators/vat" },
  "2025-02-28": { title: "Monthly VAT Return Due", type: "vat", calculator: "/calculators/vat" },
  "2025-03-31": { title: "Q1 Corporate Tax Installment", type: "corporate", calculator: "/calculators/corporate" },
  "2025-04-30": {
    title: "Annual Income Tax Return Deadline",
    type: "income",
    description: "Deadline for filing personal income tax returns for the previous year",
    calculator: "/",
  },
  "2025-06-30": { title: "Q2 Corporate Tax Installment", type: "corporate", calculator: "/calculators/corporate" },
  "2025-09-30": { title: "Q3 Corporate Tax Installment", type: "corporate", calculator: "/calculators/corporate" },
  "2025-12-31": { title: "Q4 Corporate Tax Installment", type: "corporate", calculator: "/calculators/corporate" },
}

const TaxCalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedEvents, setSelectedEvents] = useState<any[]>([])
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([])
  const [taxEvents, setTaxEvents] = useState<Record<string, any>>(initialTaxEvents)
  const [newEventTitle, setNewEventTitle] = useState("")
  const [newEventType, setNewEventType] = useState("custom")
  const { language } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    checkUpcomingEvents()
    const storedEvents = localStorage.getItem("customTaxEvents")
    if (storedEvents) {
      setTaxEvents({ ...initialTaxEvents, ...JSON.parse(storedEvents) })
    }
  }, [])

  // Function to handle date selection
  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd")
      const events = taxEvents[formattedDate as keyof typeof taxEvents]
      setSelectedEvents(events ? [events] : [])
    }
  }

  // Function to get badge color based on event type
  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "vat":
        return "default"
      case "corporate":
        return "secondary"
      case "income":
        return "destructive"
      case "custom":
        return "outline"
      default:
        return "outline"
    }
  }

  // Function to highlight dates with events
  const isDayWithEvent = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd")
    return formattedDate in taxEvents
  }

  // Function to check for upcoming events
  const checkUpcomingEvents = () => {
    const today = new Date()
    const nextWeek = addDays(today, 7)
    const upcoming = Object.entries(taxEvents)
      .filter(([date, event]) => {
        const eventDate = new Date(date)
        return isBefore(today, eventDate) && isBefore(eventDate, nextWeek)
      })
      .map(([date, event]) => ({ date, ...event }))

    setUpcomingEvents(upcoming)

    // Show notifications for upcoming events
    upcoming.forEach((event) => {
      toast.info(
        `${t.upcoming}: ${event.title} ${t.on} ${format(new Date(event.date), "MMMM d, yyyy", { locale: language === "ar" ? ar : undefined })}`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        },
      )
    })
  }

  // Function to add a new custom event
  const addCustomEvent = () => {
    if (selectedDate && newEventTitle) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd")
      const newEvent = {
        title: newEventTitle,
        type: newEventType,
      }
      const updatedEvents = {
        ...taxEvents,
        [formattedDate]: newEvent,
      }
      setTaxEvents(updatedEvents)
      setSelectedEvents([newEvent])
      setNewEventTitle("")
      localStorage.setItem("customTaxEvents", JSON.stringify(updatedEvents))
      toast.success(t.newEventAdded(newEventTitle))
    }
  }

  // Function to remove a custom event
  const removeCustomEvent = (date: string) => {
    const updatedEvents = { ...taxEvents } as Record<string, any>
    delete updatedEvents[date]
    setTaxEvents(updatedEvents)
    setSelectedEvents([])
    localStorage.setItem("customTaxEvents", JSON.stringify(updatedEvents))
    toast.success(t.eventRemoved)
  }

  // Function to set an alarm for an event
  const setAlarm = (event: any, date: string) => {
    const alarmTime = new Date(date).getTime() - 24 * 60 * 60 * 1000 // 1 day before
    const now = new Date().getTime()
    const timeUntilAlarm = alarmTime - now

    if (timeUntilAlarm > 0) {
      setTimeout(() => {
        toast.warning(t.reminderMessage(event.title), {
          position: "top-right",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      }, timeUntilAlarm)
      toast.success(t.alarmSet(event.title))
    } else {
      toast.error(t.cannotSetAlarmPast)
    }
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${language === "ar" ? "rtl" : "ltr"}`}>
      <NavigationBar />
      <ToastContainer />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={styles.heroContainer}>
          <div className={styles.heroBackground}></div>
          <h1 className={styles.heroTitle}>{t.taxCalendar2025}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={styles.calendarContainer}>
            <h2 className="text-2xl font-semibold mb-4">{t.selectDate}</h2>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleSelect}
              className="rounded-md border"
              modifiers={{
                event: (date) => isDayWithEvent(date),
              }}
              modifiersStyles={{
                event: {
                  fontWeight: "bold",
                  backgroundColor: "rgba(79, 70, 229, 0.1)",
                  color: "rgb(79, 70, 229)",
                },
              }}
            />
          </div>

          <div className={styles.eventsContainer}>
            <h2 className="text-2xl font-semibold mb-4">
              {selectedDate
                ? t.eventsFor(format(selectedDate, "MMMM d, yyyy", { locale: language === "ar" ? ar : undefined }))
                : t.selectDateToViewEvents}
            </h2>
            {selectedEvents.length > 0 ? (
              selectedEvents.map((event, index) => (
                <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={getBadgeVariant(event.type)}>{event.type.toUpperCase()}</Badge>
                      <h3 className="font-medium">{event.title}</h3>
                    </div>
                  </div>
                  {event.description && <p className="text-sm text-gray-600 mb-2">{event.description}</p>}
                  {event.calculator && (
                    <Link
                      href={event.calculator}
                      className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 mb-2"
                    >
                      <Calculator className="w-4 h-4 mr-1" />
                      {t.goToRelatedCalculator}
                    </Link>
                  )}
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAlarm(event, format(selectedDate!, "yyyy-MM-dd"))}
                    >
                      <Bell className="w-4 h-4 mr-1" />
                      {t.setReminder}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeCustomEvent(format(selectedDate!, "yyyy-MM-dd"))}
                    >
                      <X className="w-4 h-4 mr-1" />
                      {t.deleteEvent}
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="space-y-4">
                <p className="text-gray-500">{t.noTaxEventsForThisDate}</p>
                {selectedDate && (
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder={t.enterEventName}
                      value={newEventTitle}
                      onChange={(e) => setNewEventTitle(e.target.value)}
                      className="w-full"
                    />
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                      <select
                        className={`w-full sm:w-auto p-2 border rounded rtl:text-right mb-2 sm:mb-0 ${styles.selectDropdown}`}
                        value={newEventType}
                        onChange={(e) => setNewEventType(e.target.value)}
                      >
                        <option value="custom">{t.custom}</option>
                        <option value="vat">{t.vat}</option>
                        <option value="corporate">{t.corporate}</option>
                        <option value="income">{t.income}</option>
                      </select>
                      <Button onClick={addCustomEvent} className="w-full sm:w-auto">
                        <Plus className="w-4 h-4 mr-1" />
                        {t.addEvent}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.upcomingDeadlines}</CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingEvents.length > 0 ? (
                <ul className="space-y-2">
                  {upcomingEvents.map((event, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-yellow-500" />
                      <span>
                        {format(new Date(event.date), "MMM d", { locale: language === "ar" ? ar : undefined })} -{" "}
                        {event.title}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">{t.noUpcomingDeadlines}</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.legend}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge>VAT</Badge>
                <span className="text-sm text-gray-600">{t.vatRelatedEvents}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{t.corporate}</Badge>
                <span className="text-sm text-gray-600">{t.corporateTaxRelatedEvents}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="destructive">{t.income}</Badge>
                <span className="text-sm text-gray-600">{t.personalIncomeTaxRelatedEvents}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{t.custom}</Badge>
                <span className="text-sm text-gray-600">{t.customRemindersAndEvents}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default TaxCalendarPage

