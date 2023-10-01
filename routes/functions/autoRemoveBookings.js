const path = require('path');
const cron = require('node-cron');
const Database = require('better-sqlite3');

module.exports = function checkAndRemoveUnpaid(dbFile) {
  const db = new Database(dbFile);

    const currTime = new Date();

    const sql = db.prepare('SELECT * FROM bookings WHERE isPaid = 0');
    const unpaidBookings = sql.all();

    unpaidBookings.forEach((booking) => {
      const bookingTime = new Date(booking.userBooked);
      const timeDifference = currTime - bookingTime;
      const idBooking = booking.id;

      // if 10 minutes have passed, delete the booking
      if (timeDifference > 10 * 60 * 1000) {
        const sql = db.prepare('DELETE FROM bookings WHERE id = ?')
        console.log(sql.run(idBooking));
      }
    });

    db.close();
}