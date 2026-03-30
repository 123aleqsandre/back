const db = require("../config/db");
const bcrypt = require("bcrypt");

exports.login = (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], (err, result) => {
        if (err) return res.status(500).json({ message: "Server error" });

        if (result.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }

        const user = result[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (!isMatch) {
                return res.status(400).json({ message: "Incorrect password" });
            }

            return res.json({
                message: "Login successful",
                user: {
                    id: user.id,
                    email: user.email,
                }
            });
        });
    });
};