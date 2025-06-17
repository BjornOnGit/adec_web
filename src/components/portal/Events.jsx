"use client"

import { useState, useEffect } from "react"
import {
  CalendarIcon,
  Clock,
  MapPin,
  Users,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  X,
  Plus,
  Edit,
  Trash2,
} from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"
import { eventsService } from "../../lib/supabaseOperations"
import Button from "../ui/Button"
import CreateEventModal from "./CreateEventModal"

const CalendarView = ({ events, onClose, onEventClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentView, setCurrentView] = useState("month") // 'month', 'week', 'day'

  // Get current month and year
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Get days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  // Calculate days from previous month to show
  const daysFromPrevMonth = firstDayOfMonth

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  // Navigate to today
  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // Format date for display
  const formatMonthYear = (date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  }

  // Check if a date has events
  const getEventsForDate = (day) => {
    const dateToCheck = new Date(currentYear, currentMonth, day)
    dateToCheck.setHours(0, 0, 0, 0)

    return events.filter((event) => {
      const eventDate = new Date(event.event_date)
      eventDate.setHours(0, 0, 0, 0)
      return eventDate.getTime() === dateToCheck.getTime()
    })
  }

  // Create calendar grid
  const createCalendarGrid = () => {
    const totalDays = daysInMonth
    const totalCells = Math.ceil((totalDays + daysFromPrevMonth) / 7) * 7
    const days = []

    // Previous month days
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate()
    for (let i = 0; i < daysFromPrevMonth; i++) {
      days.push({
        day: prevMonthDays - daysFromPrevMonth + i + 1,
        currentMonth: false,
        date: new Date(currentYear, currentMonth - 1, prevMonthDays - daysFromPrevMonth + i + 1),
      })
    }

    // Current month days
    for (let i = 1; i <= totalDays; i++) {
      days.push({
        day: i,
        currentMonth: true,
        date: new Date(currentYear, currentMonth, i),
        today: new Date(currentYear, currentMonth, i).toDateString() === new Date().toDateString(),
      })
    }

    // Next month days
    const remainingCells = totalCells - days.length
    for (let i = 1; i <= remainingCells; i++) {
      days.push({
        day: i,
        currentMonth: false,
        date: new Date(currentYear, currentMonth + 1, i),
      })
    }

    return days
  }

  const calendarGrid = createCalendarGrid()

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Calendar</h3>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
          <Button variant="outline" size="sm" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <span className="font-medium">{formatMonthYear(currentDate)}</span>
          <Button variant="outline" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarGrid.map((day, index) => {
          const eventsForDay = getEventsForDate(day.day)
          const hasEvents = day.currentMonth && eventsForDay.length > 0

          return (
            <div
              key={index}
              className={`
                min-h-[80px] p-1 border border-gray-100 
                ${!day.currentMonth ? "bg-gray-50 text-gray-400" : ""}
                ${day.today ? "bg-blue-50" : ""}
                ${hasEvents ? "cursor-pointer hover:bg-gray-50" : ""}
              `}
              onClick={() => hasEvents && onEventClick(eventsForDay)}
            >
              <div className="flex justify-between">
                <span
                  className={`
                  inline-flex h-6 w-6 items-center justify-center rounded-full text-sm
                  ${day.today ? "bg-primary text-white" : ""}
                `}
                >
                  {day.day}
                </span>
                {hasEvents && (
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary-light text-primary text-xs">
                    {eventsForDay.length}
                  </span>
                )}
              </div>

              {hasEvents && (
                <div className="mt-1 space-y-1">
                  {eventsForDay.slice(0, 2).map((event, idx) => (
                    <div key={idx} className="text-xs truncate bg-primary-light text-primary px-1 py-0.5 rounded">
                      {event.title}
                    </div>
                  ))}
                  {eventsForDay.length > 2 && (
                    <div className="text-xs text-gray-500">+{eventsForDay.length - 2} more</div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const EventModal = ({
  event,
  onClose,
  isRegistered,
  onRegister,
  onUnregister,
  registering,
  canEdit,
  onEdit,
  onDelete,
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const isPastEvent = new Date(event.event_date) < new Date()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold">{event.title}</h3>
            <div className="flex items-center space-x-2">
              {canEdit && (
                <>
                  <button onClick={() => onEdit(event)} className="text-gray-500 hover:text-primary" title="Edit Event">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDelete(event.id)}
                    className="text-gray-500 hover:text-red-500"
                    title="Delete Event"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </>
              )}
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <p className="text-gray-700">{event.description}</p>

            <div className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-2" />
              <span>{formatDate(event.event_date)}</span>
            </div>

            {event.location && (
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{event.location}</span>
              </div>
            )}

            {event.max_attendees && (
              <div className="flex items-center text-gray-600">
                <Users className="h-5 w-5 mr-2" />
                <span>
                  {event.current_attendees || 0}/{event.max_attendees} attendees
                </span>
              </div>
            )}

            {event.category && (
              <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
              </div>
            )}

            {event.is_virtual && event.meeting_link && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-700 mb-2">Virtual Event</p>
                <a
                  href={event.meeting_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Join Meeting
                </a>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 border-t border-gray-100 pt-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>

            {!isPastEvent &&
              !canEdit &&
              (isRegistered ? (
                <Button variant="outline" onClick={() => onUnregister(event.id)} disabled={registering === event.id}>
                  {registering === event.id ? "Canceling..." : "Cancel Registration"}
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => onRegister(event.id)}
                  disabled={
                    registering === event.id || (event.max_attendees && event.current_attendees >= event.max_attendees)
                  }
                >
                  {registering === event.id ? "Registering..." : "Register"}
                </Button>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const Events = () => {
  const { user } = useAuth()
  const [events, setEvents] = useState([])
  const [userRegistrations, setUserRegistrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [registering, setRegistering] = useState(null)
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedEvents, setSelectedEvents] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)

  useEffect(() => {
    loadEvents()
    if (user) {
      loadUserRegistrations()
    }
  }, [user])

  const loadEvents = async () => {
    const result = await eventsService.getEvents()
    if (result.success) {
      setEvents(result.data)
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  const loadUserRegistrations = async () => {
    const result = await eventsService.getUserEvents(user.id)
    if (result.success) {
      setUserRegistrations(result.data.map((reg) => reg.event_id))
    }
  }

  const handleRegister = async (eventId) => {
    setRegistering(eventId)
    const result = await eventsService.registerForEvent(eventId, user.id)

    if (result.success) {
      setUserRegistrations([...userRegistrations, eventId])
      // Update the events list to reflect the new registration
      setEvents(
        events.map((event) =>
          event.id === eventId ? { ...event, current_attendees: (event.current_attendees || 0) + 1 } : event,
        ),
      )
    } else {
      setError(result.error)
    }
    setRegistering(null)
  }

  const handleUnregister = async (eventId) => {
    setRegistering(eventId)
    const result = await eventsService.unregisterFromEvent(eventId, user.id)

    if (result.success) {
      setUserRegistrations(userRegistrations.filter((id) => id !== eventId))
      // Update the events list to reflect the canceled registration
      setEvents(
        events.map((event) =>
          event.id === eventId
            ? { ...event, current_attendees: Math.max(0, (event.current_attendees || 1) - 1) }
            : event,
        ),
      )
    } else {
      setError(result.error)
    }
    setRegistering(null)
  }

  const handleEventCreated = (newEvent) => {
    setEvents([...events, newEvent])
  }

  const handleEditEvent = (event) => {
    setEditingEvent(event)
    setShowCreateModal(true)
  }

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const result = await eventsService.deleteEvent(eventId)
      if (result.success) {
        setEvents(events.filter((event) => event.id !== eventId))
        setSelectedEvent(null)
      } else {
        setError(result.error)
      }
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return {
      month: date.toLocaleDateString("en-US", { month: "short" }),
      day: date.getDate(),
      time: date.toLocaleDateString("en-US", {
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }
  }

  const isRegistered = (eventId) => userRegistrations.includes(eventId)
  const isPastEvent = (dateString) => new Date(dateString) < new Date()
  const canEditEvent = (event) => event.created_by === user?.id

  const toggleCalendarView = () => {
    setShowCalendar(!showCalendar)
  }

  const handleEventClick = (event) => {
    setSelectedEvent(event)
  }

  const handleCalendarEventClick = (events) => {
    if (events.length === 1) {
      setSelectedEvent(events[0])
    } else {
      setSelectedEvents(events)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Events</h2>
        <div className="flex space-x-2">
          <Button variant="primary" size="sm" onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
          <Button variant="outline" size="sm" onClick={toggleCalendarView}>
            <CalendarIcon className="h-4 w-4 mr-2" />
            {showCalendar ? "List View" : "Calendar View"}
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {selectedEvents.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">
              Events on {new Date(selectedEvents[0].event_date).toLocaleDateString()}
            </h3>
            <Button variant="outline" size="sm" onClick={() => setSelectedEvents([])}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {selectedEvents.map((event) => {
              const dateInfo = formatDate(event.event_date)
              const registered = isRegistered(event.id)
              const past = isPastEvent(event.event_date)

              return (
                <div key={event.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-lg bg-primary-light flex flex-col items-center justify-center mr-4 text-primary">
                      <span className="text-xs font-medium">{dateInfo.month}</span>
                      <span className="text-lg font-bold">{dateInfo.day}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-lg">{event.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{dateInfo.time}</p>
                      {event.location && <p className="text-sm text-gray-600 mb-3">{event.location}</p>}
                      <div className="flex items-center space-x-3">
                        <Button variant="outline" size="sm" onClick={() => setSelectedEvent(event)}>
                          View Details
                        </Button>
                        {!past &&
                          (registered ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUnregister(event.id)}
                              disabled={registering === event.id}
                            >
                              {registering === event.id ? "Canceling..." : "Cancel Registration"}
                            </Button>
                          ) : (
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleRegister(event.id)}
                              disabled={
                                registering === event.id ||
                                (event.max_attendees && event.current_attendees >= event.max_attendees)
                              }
                            >
                              {registering === event.id ? "Registering..." : "Register"}
                            </Button>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {showCalendar ? (
        <CalendarView events={events} onClose={toggleCalendarView} onEventClick={handleCalendarEventClick} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-medium mb-4">Upcoming Events</h3>

              {events.length === 0 ? (
                <div className="text-center py-8">
                  <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No events scheduled at the moment.</p>
                  <Button variant="primary" className="mt-4" onClick={() => setShowCreateModal(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Event
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {events.map((event) => {
                    const dateInfo = formatDate(event.event_date)
                    const registered = isRegistered(event.id)
                    const past = isPastEvent(event.event_date)
                    const canEdit = canEditEvent(event)

                    return (
                      <div key={event.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                        <div className="flex items-start">
                          <div className="w-16 h-16 rounded-lg bg-primary-light flex flex-col items-center justify-center mr-4 text-primary">
                            <span className="text-xs font-medium">{dateInfo.month}</span>
                            <span className="text-2xl font-bold">{dateInfo.day}</span>
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-lg">{event.title}</h4>
                              {canEdit && (
                                <div className="flex space-x-1">
                                  <button
                                    onClick={() => handleEditEvent(event)}
                                    className="text-gray-400 hover:text-primary"
                                    title="Edit Event"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteEvent(event.id)}
                                    className="text-gray-400 hover:text-red-500"
                                    title="Delete Event"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              )}
                            </div>
                            <p className="text-gray-600 mb-3">{event.description}</p>

                            <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {dateInfo.time}
                              </div>
                              {event.location && (
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {event.location}
                                </div>
                              )}
                              {event.max_attendees && (
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 mr-1" />
                                  {event.current_attendees || 0}/{event.max_attendees}
                                </div>
                              )}
                            </div>

                            <div className="flex items-center space-x-3">
                              <Button variant="outline" size="sm" onClick={() => setSelectedEvent(event)}>
                                View Details
                              </Button>

                              {past ? (
                                <span className="text-gray-500 text-sm">Event has ended</span>
                              ) : registered ? (
                                <>
                                  <div className="flex items-center text-green-600 text-sm">
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Registered
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleUnregister(event.id)}
                                    disabled={registering === event.id}
                                  >
                                    {registering === event.id ? "Canceling..." : "Cancel Registration"}
                                  </Button>
                                </>
                              ) : (
                                !canEdit && (
                                  <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => handleRegister(event.id)}
                                    disabled={
                                      registering === event.id ||
                                      (event.max_attendees && event.current_attendees >= event.max_attendees)
                                    }
                                  >
                                    {registering === event.id ? "Registering..." : "Register"}
                                  </Button>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-medium mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Events</span>
                  <span className="font-medium">{events.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Registered</span>
                  <span className="font-medium">{userRegistrations.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Upcoming</span>
                  <span className="font-medium">{events.filter((event) => !isPastEvent(event.event_date)).length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Created by You</span>
                  <span className="font-medium">{events.filter((event) => canEditEvent(event)).length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          isRegistered={isRegistered(selectedEvent.id)}
          onRegister={handleRegister}
          onUnregister={handleUnregister}
          registering={registering}
          canEdit={canEditEvent(selectedEvent)}
          onEdit={handleEditEvent}
          onDelete={handleDeleteEvent}
        />
      )}

      <CreateEventModal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false)
          setEditingEvent(null)
        }}
        onEventCreated={handleEventCreated}
        editingEvent={editingEvent}
      />
    </div>
  )
}

export default Events
