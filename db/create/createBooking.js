const Database = require('better-sqlite3');
const cron = require('node-cron');

function createBooking(dbFile, idRoom, idUser, checkin, checkout, isPaid, userBooked) {
  const db = new Database(dbFile);
  const sql = db.prepare('INSERT INTO bookings (idRoom, idUser, checkin, checkout, isPaid, userBooked) VALUES (?, ?, ?, ?, ?, ?);');
  const booking = sql.run(idRoom, idUser, checkin, checkout, isPaid, userBooked);
  const lastId = booking.lastInsertRowid; 
  
  db.close();
  return lastId;
}

function markAsPaid(dbFile, idBooking) {
  const db = new Database(dbFile);
  const sql = db.prepare('UPDATE bookings SET isPaid = 1 WHERE id = ?');
  const booking = sql.run(idBooking);

  db.close();
  
  return booking;
}

function getUnpaidBookings(dbFile, idUser) {
  const db = new Database(dbFile);
  const sql = db.prepare('SELECT bookings.id, bookings.idRoom, bookings.idUser, bookings.checkin, bookings.checkout, bookings.userBooked FROM bookings INNER JOIN users ON bookings.idUser = users.id WHERE users.id = ? AND bookings.isPaid = 0')
  const unpaidBookings = sql.get(idUser)

  db.close();

  return unpaidBookings;
}

// function checkAndRemoveUnpaid(dbFile) {
//   const db = new Database(dbFile);
//   cron.schedule('0 * * * *', () => {
//     const currTime = new Date();
//     const tenMinutesAgo = new Date(currTime - 10 * 60 * 1000);

//     const unpaid = db.prepare('SELECT id, userBooked FROM bookings WHERE isPaid = 0 AND userBooked <= ?').all(tenMinutesAgo);

//     unpaid.forEach((booking) => {
//       const bookingTime = new Date(booking.userBooked);
//       const timeDifference = currTime - bookingTime;

//       if (timeDifference >= 10 * 60 * 1000) { // Check if 10 minutes have passed (in milliseconds)
//         db.prepare('DELETE FROM bookings WHERE id = ?').run(booking.id);
//         console.log(`Removed booking with ID ${booking.id} due to exceeding 10 minutes.`);
//       }
//     });

//     db.close();
//   });
// }




module.exports = {
  createBooking,
  markAsPaid,
  getUnpaidBookings,
};