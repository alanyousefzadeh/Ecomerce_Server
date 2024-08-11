const express = require('express');
const router = express.Router();
const connection = require('../db/connection');
const {getAllUsers, getUserById} = require("../controllers/userController");


router.get('/', getAllUsers);
router.get('/:id', getUserById);


//alan test
// Get all users
// router.get('/', (req, res) => {
//   const query = 'SELECT * FROM user';
//   connection.query(query, (err, results) => {
//     if (err) {
//       console.error('Error fetching users:', err);
//       res.status(500).send('Server error');
//       return;
//     }
//     res.json(results);
//   });
// });

// Define the pagination route or show all users if no pagination parameters are provided

// router.get('/', (req, res) => {
//   const page = parseInt(req.query.page);
//   const limit = parseInt(req.query.limit);
//
//   if (page && limit) {
//     // Paginated response
//     const offset = (page - 1) * limit;
//
//     connection.query('SELECT COUNT(*) AS count FROM user', (err, result) => {
//       if (err) return res.status(500).json({ error: err.message });
//
//       const totalItems = result[0].count;
//       const totalPages = Math.ceil(totalItems / limit);
//
//       connection.query('SELECT * FROM user LIMIT ? OFFSET ?', [limit, offset], (err, results) => {
//         if (err) return res.status(500).json({ error: err.message });
//
//         res.json({
//           totalItems,
//           totalPages,
//           currentPage: page,
//           data: results
//         });
//       });
//     });
//   } else {
//     // Return all users
//     connection.query('SELECT * FROM user', (err, results) => {
//       if (err) return res.status(500).json({ error: err.message });
//
//       res.json(results);
//     });
//   }
// });
//
//
// // Get user by ID
// router.get('/:id', (req, res) => {
//   const { id } = req.params;
//   const query = 'SELECT * FROM user WHERE id = ?';
//   connection.query(query, [id], (err, results) => {
//     if (err) {
//       console.error('Error fetching user:', err);
//       res.status(500).send('Server error');
//       return;
//     }
//     res.json(results[0]);
//   });
// });
//
// // Create new user
// router.post('/', (req, res) => {
//   const { Email,Password,Address,Phone } = req.body;
//   const query = 'INSERT INTO user (email, password,address,phone) VALUES (?,?,?,?)';
//   connection.query(query, [Email,Password,Address,Phone], (err, results) => {
//     if (err) {
//       console.error('Error creating user:', err);
//       res.status(500).send('Server error');
//       return;
//     }
//     res.status(201).json({ id: results.insertId,Email,Password,Address,Phone});
//   });
// });
//
// // Update user
// router.put('/:id', (req, res) => {
//   const { id } = req.params;
//   const { Email,Password,Address,Phone } = req.body;
//   const query = 'UPDATE user SET Email = ? , Password = ? , Address = ? , Phone = ? WHERE id = ?';
//   connection.query(query, [Email,Password,Address,Phone , id], (err, results) => {
//     if (err) {
//       console.error('Error updating user:', err);
//       res.status(500).send('Server error');
//       return;
//     }
//     res.send('User updated');
//   });
// });
//
// // Delete user
// router.delete('/:id', (req, res) => {
//   const { id } = req.params;
//   const query = 'DELETE FROM user WHERE id = ?';
//   connection.query(query, [id], (err, results) => {
//     if (err) {
//       console.error('Error deleting user:', err);
//       res.status(500).send('Server error');
//       return;
//     }
//     res.send('User deleted');
//   });
// });


module.exports = router;
