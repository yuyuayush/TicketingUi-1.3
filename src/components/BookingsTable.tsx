import { format } from 'date-fns';
import { Badge } from './Badge';

export function BookingsTable({ bookings = [] }) {
  const getStatusColor = (status) => {
    const colors = {
      CONFIRMED: 'green',
      PENDING: 'yellow',
      CANCELLED: 'red',
      EXPIRED: 'gray',
    };
    return colors[status] || 'blue';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Booking ID</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">User</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Concert</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{booking.bookingId}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{booking.user?.name || 'N/A'}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{booking.concert?.title || 'N/A'}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-gray-900">₹{booking.finalAmount?.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <Badge color={getStatusColor(booking.status)}>{booking.status}</Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {booking.createdAt ? format(new Date(booking.createdAt), 'MMM dd, yyyy') : 'N/A'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-8 text-center text-gray-500">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
