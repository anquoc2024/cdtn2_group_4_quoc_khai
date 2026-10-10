import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import { BookingContext } from '../context/BookingContext'
import { AdminContext } from '../context/AdminContext'
import { supabaseDb, supabase } from '../lib/supabase'
import {
  FaTachometerAlt, FaCalendarAlt, FaUsers, FaPalette,
  FaSearch, FaBell, FaPlus, FaCheck, FaTimes,
  FaTrash, FaChevronRight, FaSignOutAlt, FaCog, FaKey
} from 'react-icons/fa'

const AdminPage = () => {
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAdmin) {
      navigate('/login')
    }
  }, [isAdmin, navigate])

  if (!isAdmin) return null

  return (
    <div className="flex min-h-screen bg-surface font-body-md text-on-surface">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <Routes />
      </main>
    </div>
  )
}

const Routes = () => {
  const location = useLocation()
  const path = location.pathname.replace('/admin', '') || '/'

  if (path === '/') return <Dashboard />
  if (path === '/appointments') return <AppointmentsPage />
  if (path === '/customers') return <CustomersPage />
  if (path === '/blocked') return <BlockedPage />
  if (path === '/designs') return <DesignsPage />
  if (path === '/salon-info') return <SalonInfoPage />
  if (path === '/settings') return <SettingsPage />
  return <Dashboard />
}

const Sidebar = () => {
  const location = useLocation()
  const { logout, user } = useAuth()

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaTachometerAlt, path: '/admin' },
    { id: 'appointments', label: 'Appointments', icon: FaCalendarAlt, path: '/admin/appointments' },
    { id: 'customers', label: 'Customers', icon: FaUsers, path: '/admin/customers' },
    { id: 'blocked', label: 'Block Dates', icon: FaCalendarAlt, path: '/admin/blocked' },
    { id: 'designs', label: 'Manage Designs', icon: FaPalette, path: '/admin/designs' },
    { id: 'salon-info', label: 'Salon Info', icon: FaCog, path: '/admin/salon-info' },
    { id: 'settings', label: 'Settings', icon: FaKey, path: '/admin/settings' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white shadow-lg sticky top-0 h-screen z-50">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2">
          <img src="/images/logo/logo.svg" alt="Thuy's Nail" className="h-12 w-auto" />
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        <p className="px-4 py-2 text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Menu</p>
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`flex items-center px-4 py-3 rounded-xl transition-all ${
              isActive(item.path)
                ? 'bg-pink-100 text-pink-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <item.icon className="mr-3 text-lg" />
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 mt-auto mb-4">
        <div className="flex items-center bg-gray-100 p-3 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-pink-200 flex items-center justify-center text-pink-600 font-bold mr-3">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">{user?.name || 'Admin'}</p>
            <p className="text-[10px] text-gray-500 uppercase">Admin</p>
          </div>
          <button onClick={logout} className="p-2 text-gray-400 hover:text-red-500">
            <FaSignOutAlt />
          </button>
        </div>
      </div>
    </aside>
  )
}

const TopBar = ({ title }) => (
  <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between mb-6">
    <h1 className="hidden md:block text-xl font-bold text-pink-600">{title}</h1>
    <div className="flex items-center gap-4">
      <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-64">
        <FaSearch className="text-gray-400 mr-2" />
        <input className="bg-transparent border-none focus:ring-0 text-sm w-full" placeholder="Search..." />
      </div>
      <button className="relative p-2 text-gray-500 hover:text-pink-600">
        <FaBell />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
      <Link to="/booking" className="bg-pink-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-pink-600 transition">
        <FaPlus className="inline mr-1" /> New
      </Link>
    </div>
  </header>
)

const Dashboard = () => {
  const { bookings, calculateRevenue } = useContext(BookingContext)

  const today = new Date().toISOString().split('T')[0]
  const todayBookings = bookings?.filter(b => b.booking_date === today && b.status === 'confirmed') || []
  const uniqueCustomers = [...new Set(bookings?.map(b => b.user_email) || [])].length

  const cards = [
    { label: "Today's Bookings", value: todayBookings.length, color: 'pink' },
    { label: "Total Bookings", value: bookings?.length || 0, color: 'blue' },
    { label: "Customers", value: uniqueCustomers, color: 'green' },
    { label: "Revenue", value: `$${calculateRevenue()}`, color: 'purple' },
  ]

  const colors = {
    pink: 'bg-pink-100 text-pink-600',
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600'
  }

  return (
    <div className="p-6 overflow-y-auto flex-1">
      <TopBar title="Dashboard" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {cards.map((card) => (
          <div key={card.label} className="bg-white p-6 rounded-xl shadow-sm hover:-translate-y-1 transition-all">
            <div className={`w-12 h-12 rounded-xl ${colors[card.color]} flex items-center justify-center mb-4`}>
              <FaCalendarAlt className="text-xl" />
            </div>
            <p className="text-gray-500 text-sm mb-1">{card.label}</p>
            <p className="text-2xl font-bold text-gray-800">{card.value}</p>
          </div>
        ))}
      </div>

      <RecentBookings />
    </div>
  )
}

const RecentBookings = () => {
  const { bookings, updateBookingStatus } = useContext(BookingContext)

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-800">Recent Bookings</h2>
        <Link to="/admin/appointments" className="text-pink-500 text-sm hover:underline">View All</Link>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b text-gray-500 text-sm">
            <th className="pb-3">Customer</th>
            <th className="pb-3">Service</th>
            <th className="pb-3">Date/Time</th>
            <th className="pb-3">Status</th>
            <th className="pb-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings?.slice(0, 5).map((booking) => (
            <tr key={booking.id} className="border-b hover:bg-gray-50">
              <td className="py-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mr-2 text-xs font-bold">
                    {booking.user_name?.charAt(0) || 'U'}
                  </div>
                  <span className="text-sm">{booking.user_name || 'Guest'}</span>
                </div>
              </td>
              <td className="py-3 text-gray-500 text-sm">{booking.service_name || 'N/A'}</td>
              <td className="py-3 text-gray-500 text-sm">{booking.booking_date} - {booking.booking_time}</td>
              <td className="py-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  booking.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                  booking.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-gray-100 text-gray-500'
                }`}>
                  {booking.status}
                </span>
              </td>
              <td className="py-3 text-right">
                {booking.status === 'confirmed' && (
                  <div className="flex justify-end gap-1">
                    <button onClick={() => updateBookingStatus(booking.id, 'completed')} className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200">
                      <FaCheck />
                    </button>
                    <button onClick={() => updateBookingStatus(booking.id, 'cancelled')} className="p-1 bg-red-100 text-red-500 rounded hover:bg-red-200">
                      <FaTimes />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
          {(!bookings || bookings.length === 0) && (
            <tr><td colSpan={5} className="py-8 text-center text-gray-400">Chua co lich nao</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

const AppointmentsPage = () => {
  const { bookings, updateBookingStatus } = useContext(BookingContext)
  const [filter, setFilter] = useState('all')
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [cancelReason, setCancelReason] = useState('')
  const [selectedBooking, setSelectedBooking] = useState(null)

  const filtered = filter === 'all' ? bookings : bookings?.filter(b => b.status === filter) || []

  const handleCancelClick = (booking) => {
    setSelectedBooking(booking)
    setCancelReason('')
    setShowCancelModal(true)
  }

  const handleConfirmCancel = async () => {
    if (selectedBooking && cancelReason.trim()) {
      await updateBookingStatus(selectedBooking.id, 'cancelled', cancelReason.trim())
      setShowCancelModal(false)
      setSelectedBooking(null)
      setCancelReason('')
    }
  }

  return (
    <div className="p-6 overflow-y-auto flex-1">
      <TopBar title="Appointments" />

      <div className="mb-4">
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="bg-white border rounded-lg px-4 py-2">
          <option value="all">Tat ca</option>
          <option value="pending">Cho xac nhan</option>
          <option value="confirmed">Da xac nhan</option>
          <option value="completed">Hoan thanh</option>
          <option value="cancelled">Da huy</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr className="text-gray-500 text-sm">
              <th className="p-4 font-medium">Khach hang</th>
              <th className="p-4 font-medium">Dich vu</th>
              <th className="p-4 font-medium">Ngay/Gio</th>
              <th className="p-4 font-medium">Trang thai</th>
              <th className="p-4 font-medium text-right">Hanh dong</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((booking) => (
              <tr key={booking.id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <p className="font-medium">{booking.user_name || 'Guest'}</p>
                  <p className="text-gray-500 text-xs">{booking.user_email}</p>
                </td>
                <td className="p-4">
                  <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-medium">{booking.service_name}</span>
                </td>
                <td className="p-4 text-gray-600">{booking.booking_date} - {booking.booking_time}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                    booking.status === 'cancelled' ? 'bg-red-100 text-red-500' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {booking.status}
                  </span>
                  {booking.notes && (
                    <p className="text-red-500 text-xs mt-1">Ly do: {booking.notes}</p>
                  )}
                </td>
                <td className="p-4 text-right">
                  {booking.status === 'pending' && (
                    <button onClick={() => updateBookingStatus(booking.id, 'confirmed')} className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm mr-2">Xac nhan</button>
                  )}
                  {booking.status !== 'cancelled' && (
                    <button onClick={() => handleCancelClick(booking)} className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm">Huy</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Huy lich hen</h3>
            <p className="text-gray-600 mb-4">
              Khach hang: <strong>{selectedBooking?.user_name}</strong><br/>
              Dich vu: <strong>{selectedBooking?.service_name}</strong><br/>
              Ngay: <strong>{selectedBooking?.booking_date}</strong>
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ly do huy (bat buoc)
              </label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Nhap ly do huy lich..."
                className="w-full border rounded-lg px-4 py-3 h-24 resize-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                Dong
              </button>
              <button
                onClick={handleConfirmCancel}
                disabled={!cancelReason.trim()}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Xac nhan huy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const CustomersPage = () => {
  const { bookings } = useContext(BookingContext)

  const map = {}
  bookings?.forEach(b => {
    if (b.user_email) {
      if (!map[b.user_email]) map[b.user_email] = { count: 0, last: null }
      map[b.user_email].count++
      if (!map[b.user_email].last || b.created_at > map[b.user_email].last) {
        map[b.user_email].last = b.created_at
      }
    }
  })

  const customers = Object.entries(map).map(([email, data]) => ({
    email, ...data, name: bookings.find(b => b.user_email === email)?.user_name
  }))

  return (
    <div className="p-6 overflow-y-auto flex-1">
      <TopBar title="Customers" />
      <p className="text-gray-600 mb-4">Tong: {customers.length} khach hang</p>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr className="text-gray-500 text-sm">
              <th className="p-4 font-medium">Khach hang</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium text-center">So lich</th>
              <th className="p-4 font-medium">Cuoi cung</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.email} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mr-3 font-bold">{c.name?.charAt(0)}</div>
                    {c.name}
                  </div>
                </td>
                <td className="p-4 text-gray-500">{c.email}</td>
                <td className="p-4 text-center font-bold">{c.count}</td>
                <td className="p-4 text-gray-500">{c.last ? new Date(c.last).toLocaleDateString() : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const BlockedPage = () => {
  const { blockedDates, addBlockedDate, removeBlockedDate } = useContext(AdminContext)
  const [singleDate, setSingleDate] = useState('')
  const [singleReason, setSingleReason] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [rangeReason, setRangeReason] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('range') // 'single' or 'range'

  const handleAddRange = async () => {
    if (!startDate || !endDate) {
      alert('Vui long chon ngay bat dau va ngay ket thuc')
      return
    }

    if (new Date(endDate) < new Date(startDate)) {
      alert('Ngay ket thuc phai lon hon ngay bat dau')
      return
    }

    setIsLoading(true)
    const start = new Date(startDate)
    const end = new Date(endDate)
    let count = 0

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0]
      const exists = blockedDates.some(bd => bd.blocked_date === dateStr)
      if (!exists) {
        await addBlockedDate(dateStr, rangeReason || 'Khong lam viec')
        count++
      }
    }

    setIsLoading(false)
    alert(`Da them ${count} ngay nghi`)
    setStartDate('')
    setEndDate('')
    setRangeReason('')
  }

  const handleAddSingle = async () => {
    if (!singleDate) {
      alert('Vui long chon ngay')
      return
    }
    await addBlockedDate(singleDate, singleReason || 'Khong lam viec')
    setSingleDate('')
    setSingleReason('')
  }

  // Group blocked dates by month for better display
  const groupedDates = {}
  ;(blockedDates || []).forEach(d => {
    const [year, month] = d.blocked_date.split('-')
    const monthKey = `${month}/${year}`
    if (!groupedDates[monthKey]) groupedDates[monthKey] = []
    groupedDates[monthKey].push(d)
  })

  const monthNames = {
    '01': 'Tháng 1', '02': 'Tháng 2', '03': 'Tháng 3', '04': 'Tháng 4',
    '05': 'Tháng 5', '06': 'Tháng 6', '07': 'Tháng 7', '08': 'Tháng 8',
    '09': 'Tháng 9', '10': 'Tháng 10', '11': 'Tháng 11', '12': 'Tháng 12'
  }

  return (
    <div className="p-6 overflow-y-auto flex-1 bg-gray-50">
      <TopBar title="Ngày nghỉ" />

      {/* Add Block Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 max-w-3xl">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
            <FaCalendarAlt className="text-pink-500" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Thêm ngày nghỉ</h3>
            <p className="text-sm text-gray-500">Chọn 1 ngày hoặc 1 khoảng ngày để khóa lịch</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('range')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              activeTab === 'range' ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-600'
            }`}
          >
            Nhiều ngày (Tết, lễ)
          </button>
          <button
            onClick={() => setActiveTab('single')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              activeTab === 'single' ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-600'
            }`}
          >
            Một ngày
          </button>
        </div>

        {activeTab === 'range' ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Từ ngày</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-pink-200 focus:border-pink-400 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Đến ngày</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-pink-200 focus:border-pink-400 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Lý do</label>
                <input
                  value={rangeReason}
                  onChange={(e) => setRangeReason(e.target.value)}
                  placeholder="VD: Tết Nguyên Đán"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-pink-200 focus:border-pink-400 transition"
                />
              </div>
            </div>
            <button
              onClick={handleAddRange}
              disabled={isLoading}
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2.5 rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isLoading ? '⏳ Đang thêm...' : '🔒 Khóa khoảng ngày'}
            </button>
            <p className="mt-3 text-xs text-gray-400 italic">
              VD: Tết 2026 → Từ: 28/01/2026, Đến: 05/02/2026
            </p>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Chọn ngày</label>
                <input
                  type="date"
                  value={singleDate}
                  onChange={(e) => setSingleDate(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-pink-200 focus:border-pink-400 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Lý do</label>
                <input
                  value={singleReason}
                  onChange={(e) => setSingleReason(e.target.value)}
                  placeholder="VD: Bảo trì"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-pink-200 focus:border-pink-400 transition"
                />
              </div>
            </div>
            <button
              onClick={handleAddSingle}
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2.5 rounded-lg hover:shadow-lg transition font-medium"
            >
              🔒 Khóa ngày
            </button>
          </div>
        )}
      </div>

      {/* List Blocked Dates */}
      <div className="bg-white rounded-2xl shadow-sm p-6 max-w-3xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <FaCalendarAlt className="text-red-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Danh sách ngày nghỉ</h3>
              <p className="text-sm text-gray-500">Tổng cộng: {blockedDates?.length || 0} ngày</p>
            </div>
          </div>
        </div>

        {Object.keys(groupedDates).length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto mb-3 flex items-center justify-center">
              <FaCalendarAlt className="text-gray-400 text-2xl" />
            </div>
            <p className="text-gray-400">Chưa có ngày nghỉ nào</p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(groupedDates).sort((a, b) => b[0].localeCompare(a[0])).map(([monthKey, dates]) => {
              const [month, year] = monthKey.split('/')
              return (
                <div key={monthKey}>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                    {monthNames[month]} {year}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {dates.sort((a, b) => a.blocked_date.localeCompare(b.blocked_date)).map((d) => {
                      const [, , day] = d.blocked_date.split('-')
                      return (
                        <div
                          key={d.id}
                          className="group flex items-center gap-2 bg-gradient-to-br from-red-50 to-pink-50 border border-red-100 px-3 py-2 rounded-xl hover:shadow-md transition"
                        >
                          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-xs font-bold text-red-500">
                            {parseInt(day)}
                          </div>
                          <div>
                            <p className="text-red-700 font-medium text-sm">{d.blocked_date}</p>
                            <p className="text-gray-500 text-xs">{d.reason || 'Không làm việc'}</p>
                          </div>
                          <button
                            onClick={() => {
                              if (window.confirm(`Xoa ngay nghi ${d.blocked_date}?`)) {
                                removeBlockedDate(d.id)
                              }
                            }}
                            className="text-gray-300 hover:text-red-500 hover:bg-red-100 p-1.5 rounded-lg transition opacity-0 group-hover:opacity-100"
                          >
                            <FaTrash size={12} />
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

const DesignsPage = () => {
  const { designs } = useContext(BookingContext)
  const { customDesigns, addDesign, deleteDesign } = useContext(AdminContext)
  const [isAdd, setIsAdd] = useState(false)
  const [newD, setNewD] = useState({ name: '', description: '', category: 'simple', image_url: '' })
  const [previewImage, setPreviewImage] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  const all = [...(designs || []), ...(customDesigns || [])]

  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File qua lon! Vui long chon file nho hon 5MB')
        return
      }
      // Preview image
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAdd = async () => {
    if (!newD.name) {
      alert('Vui long nhap ten mau')
      return
    }
    if (!previewImage && !newD.image_url) {
      alert('Vui long chon hinh anh')
      return
    }

    setIsUploading(true)
    try {
      const designData = { ...newD }
      if (previewImage) {
        designData.image_url = previewImage
      }
      await addDesign(designData)
      setNewD({ name: '', description: '', category: 'simple', image_url: '' })
      setPreviewImage(null)
      setIsAdd(false)
      alert('Them mau thanh cong!')
    } catch (error) {
      alert('Loi: ' + error.message)
    } finally {
      setIsUploading(false)
    }
  }

  const categories = [
    { value: 'simple', label: 'Đơn giản' },
    { value: 'cute', label: 'Dễ thương' },
    { value: 'glitter', label: 'Lấp lánh' },
    { value: 'korean', label: 'Hàn Quốc' },
    { value: 'ombre', label: 'Ombre' },
    { value: 'wedding', label: 'Cưới hỏi' },
  ]

  return (
    <div className="p-6 overflow-y-auto flex-1 bg-gray-50">
      <TopBar title="Mẫu Nail" />

      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-gray-600">Tổng cộng: {all.length} mẫu</p>
          <p className="text-sm text-gray-400">Mẫu tùy chỉnh: {customDesigns?.length || 0}</p>
        </div>
        <button onClick={() => setIsAdd(!isAdd)} className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-5 py-2.5 rounded-lg hover:shadow-lg transition flex items-center gap-2">
          {isAdd ? (
            <>
              <span>✕</span> Đóng lại
            </>
          ) : (
            <>
              <span>+</span> Thêm mẫu mới
            </>
          )}
        </button>
      </div>

      {isAdd && (
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 max-w-xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
              <FaPalette className="text-pink-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Thêm mẫu nail mới</h3>
              <p className="text-sm text-gray-500">Upload hình ảnh từ máy tính của bạn</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tên mẫu</label>
              <input
                value={newD.name}
                onChange={(e) => setNewD({...newD, name: e.target.value})}
                placeholder="VD: Hoa cherry"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-pink-200 focus:border-pink-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Hình ảnh</label>
              <div className={`border-2 border-dashed rounded-xl p-6 text-center transition ${previewImage ? 'border-pink-400 bg-pink-50' : 'border-gray-200 hover:border-pink-300'}`}>
                {previewImage ? (
                  <div className="relative inline-block">
                    <img src={previewImage} alt="Preview" className="max-h-48 rounded-lg mx-auto" />
                    <button
                      onClick={() => {
                        setPreviewImage(null)
                      }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto mb-3 flex items-center justify-center">
                      <span className="text-3xl">📷</span>
                    </div>
                    <p className="text-gray-600 font-medium">Click để chọn hình</p>
                    <p className="text-gray-400 text-sm mt-1">JPG, PNG, GIF (tối đa 5MB)</p>
                    <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
                  </label>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Loại/Danh mục</label>
                <select
                  value={newD.category}
                  onChange={(e) => setNewD({...newD, category: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-pink-200 focus:border-pink-400 transition"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Mô tả (tùy chọn)</label>
              <textarea
                value={newD.description}
                onChange={(e) => setNewD({...newD, description: e.target.value})}
                placeholder="Mô tả về mẫu nail này..."
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-pink-200 focus:border-pink-400 transition resize-none"
              />
            </div>

            <button
              onClick={handleAdd}
              disabled={isUploading || !newD.name || !previewImage}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? '⏳ Đang tải lên...' : '💾 Lưu mẫu nail'}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {all.map((d) => (
          <div key={d.id} className="relative group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition">
            <img
              src={d.image_url}
              alt={d.name}
              className="w-full aspect-square object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <div className="translate-y-full group-hover:translate-y-0 transition-transform">
                <p className="text-white font-medium">{d.name}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-white/80 text-xs capitalize">{d.category}</span>
                  <button
                    onClick={() => {
                      if (window.confirm(`Xóa mẫu "${d.name}"?`)) {
                        deleteDesign(d.id)
                      }
                    }}
                    className="text-red-300 hover:text-red-500 bg-white/20 hover:bg-red-500 p-1.5 rounded-lg transition"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
            </div>
            {d.is_custom && (
              <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                Custom
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Settings Page - Change Admin Password
const SettingsPage = () => {
  const { user } = useAuth()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Vui lòng điền đầy đủ thông tin')
      return
    }

    if (newPassword.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Mật khẩu mới không khớp')
      return
    }

    setIsLoading(true)
    try {
      // Verify current password
      const { data: admin } = await supabaseDb.login(user?.email, currentPassword)

      if (!admin) {
        setError('Mật khẩu hiện tại không đúng')
        setIsLoading(false)
        return
      }

      // Update password using supabaseDb
      const { error: updateError } = await supabaseDb.updateUser(user?.id, { password: newPassword })

      if (updateError) {
        setError('Không thể cập nhật mật khẩu: ' + updateError.message)
        setIsLoading(false)
        return
      }

      setSuccess('Đổi mật khẩu thành công!')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      setError('Đã xảy ra lỗi: ' + err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6 overflow-y-auto flex-1 bg-gray-50">
      <TopBar title="Settings" />

      <div className="max-w-xl">
        {/* Change Password Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
              <FaKey className="text-pink-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Đổi mật khẩu Admin</h3>
              <p className="text-sm text-gray-500">Cập nhật mật khẩu để bảo mật tài khoản</p>
            </div>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                ⚠️ {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
                ✅ {success}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Mật khẩu hiện tại</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Nhập mật khẩu hiện tại"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-pink-200 focus:border-pink-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Mật khẩu mới</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-pink-200 focus:border-pink-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Xác nhận mật khẩu mới</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Nhập lại mật khẩu mới"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-pink-200 focus:border-pink-400 transition"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition font-medium disabled:opacity-50"
            >
              {isLoading ? '⏳ Đang xử lý...' : '🔒 Đổi mật khẩu'}
            </button>
          </form>
        </div>

        {/* Admin Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Thông tin Admin</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Email</span>
              <span className="font-medium text-gray-800">{user?.email}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Tên</span>
              <span className="font-medium text-gray-800">{user?.name}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-500">Vai trò</span>
              <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium">Admin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Salon Info Page
const SalonInfoPage = () => {
  const [info, setInfo] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    hours: '',
    facebook: '',
    instagram: '',
    map_url: '',
    logo: ''
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [success, setSuccess] = useState('')
  const [logoPreview, setLogoPreview] = useState(null)

  useEffect(() => {
    loadSalonInfo()
  }, [])

  const loadSalonInfo = async () => {
    try {
      const { data } = await supabaseDb.getSalonInfo()
      if (data) {
        const infoObj = {}
        data.forEach(item => {
          infoObj[item.key] = item.value
        })
        setInfo(prev => ({ ...prev, ...infoObj }))
        if (infoObj.logo) {
          setLogoPreview(infoObj.logo)
        }
      }
    } catch (error) {
      console.error('Error loading salon info:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async (key, value) => {
    setIsSaving(true)
    try {
      const { error } = await supabaseDb.updateSalonInfo(key, value)
      if (error) throw error
      setInfo(prev => ({ ...prev, [key]: value }))
      setSuccess('Đã lưu thành công!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      alert('Lỗi: ' + error.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = (key, value) => {
    setInfo(prev => ({ ...prev, [key]: value }))
  }

  const handleLogoSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File qua lon! Vui long chon file nho hon 2MB')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result)
        handleSave('logo', reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Đang tải...</p>
        </div>
      </div>
    )
  }

  const infoFields = [
    { key: 'name', label: 'Tên Salon', icon: '🏪', placeholder: 'VD: Thuy\'s Nail' },
    { key: 'address', label: 'Địa chỉ', icon: '📍', placeholder: 'VD: 123 Đường ABC, Quận 1, TP.HCM' },
    { key: 'phone', label: 'Số điện thoại', icon: '📞', placeholder: 'VD: 0901 234 567' },
    { key: 'email', label: 'Email', icon: '✉️', placeholder: 'VD: hello@thuysnail.com' },
    { key: 'hours', label: 'Giờ mở cửa', icon: '🕐', placeholder: 'VD: Tue-Sun: 9am - 7pm' },
  ]

  const socialFields = [
    { key: 'facebook', label: 'Facebook', icon: '📘', placeholder: 'https://facebook.com/...' },
    { key: 'instagram', label: 'Instagram', icon: '📷', placeholder: 'https://instagram.com/...' },
    { key: 'map_url', label: 'Google Maps', icon: '🗺️', placeholder: 'Dán link Google Maps vào đây' },
  ]

  return (
    <div className="p-6 overflow-y-auto flex-1 bg-gray-50">
      <TopBar title="Thông tin Salon" />

      {success && (
        <div className="max-w-3xl mx-auto mb-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg flex items-center gap-2">
          ✅ {success}
        </div>
      )}

      {/* Logo Upload */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 max-w-3xl">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
            <span className="text-xl">🎨</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Logo Shop</h3>
            <p className="text-sm text-gray-500">Hình ảnh logo hiển thị trên header</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className={`w-32 h-32 rounded-2xl border-2 border-dashed flex items-center justify-center overflow-hidden transition ${logoPreview ? 'border-pink-400 bg-pink-50' : 'border-gray-200 hover:border-pink-300'}`}>
            {logoPreview ? (
              <img src={logoPreview} alt="Logo" className="w-full h-full object-contain" />
            ) : (
              <div className="text-center">
                <span className="text-4xl">🖼️</span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <label className="cursor-pointer inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition font-medium">
              📁 Chọn hình logo
              <input type="file" accept="image/*" onChange={handleLogoSelect} className="hidden" />
            </label>
            <p className="text-gray-400 text-sm mt-2">JPG, PNG, SVG (tối đa 2MB)</p>
            <p className="text-gray-400 text-sm">Nên dùng hình vuông, nền trong suốt</p>
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 max-w-3xl">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
            <span className="text-xl">🏪</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Thông tin cơ bản</h3>
            <p className="text-sm text-gray-500">Thông tin hiển thị trên website</p>
          </div>
        </div>

        <div className="space-y-4">
          {infoFields.map(field => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                <span className="mr-1">{field.icon}</span> {field.label}
              </label>
              <div className="flex gap-2">
                <input
                  type={field.key === 'email' ? 'email' : 'text'}
                  value={info[field.key] || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-pink-200 focus:border-pink-400 transition"
                />
                <button
                  onClick={() => handleSave(field.key, info[field.key])}
                  disabled={isSaving}
                  className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition disabled:opacity-50"
                >
                  💾
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 max-w-3xl">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-xl">🔗</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Mạng xã hội</h3>
            <p className="text-sm text-gray-500">Link các trang mạng xã hội</p>
          </div>
        </div>

        <div className="space-y-4">
          {socialFields.map(field => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                <span className="mr-1">{field.icon}</span> {field.label}
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={info[field.key] || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-pink-200 focus:border-pink-400 transition"
                />
                <button
                  onClick={() => handleSave(field.key, info[field.key])}
                  disabled={isSaving}
                  className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition disabled:opacity-50"
                >
                  💾
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white rounded-2xl p-6 shadow-sm max-w-3xl">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-xl">👁️</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Xem trước</h3>
            <p className="text-sm text-gray-500">Logo và tên sẽ hiển thị ở header</p>
          </div>
        </div>

        <div className="bg-gray-100 rounded-xl p-4">
          <div className="flex items-center gap-4 mb-4 p-3 bg-white rounded-xl">
            {logoPreview ? (
              <img src={logoPreview} alt="Logo" className="w-16 h-16 object-contain" />
            ) : (
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-2xl">🎨</div>
            )}
            <div className="font-bold text-lg">{info.name || 'Tên Salon'}</div>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <p>📍 {info.address || 'Địa chỉ'}</p>
            <p>📞 {info.phone || 'Số điện thoại'}</p>
            <p>✉️ {info.email || 'Email'}</p>
            <p>🕐 {info.hours || 'Giờ mở cửa'}</p>
            {info.facebook && <p>📘 <a href={info.facebook} className="text-blue-500 hover:underline" target="_blank">Facebook</a></p>}
            {info.instagram && <p>📷 <a href={info.instagram} className="text-pink-500 hover:underline" target="_blank">Instagram</a></p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
