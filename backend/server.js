const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// CORS middleware for mobile app
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// --- Database Initialization and Seeding ---
// We use ':memory:' for a fast, in-memory database that resets on each run.
const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        return console.error('Database connection error:', err.message);
    }
    console.log('Connected to the in-memory SQLite database.');

    db.serialize(() => {
        // --- 1. Create Tables ---
        db.run(`CREATE TABLE IF NOT EXISTS movies (
            id INTEGER PRIMARY KEY,
            title TEXT,
            language TEXT,
            genre TEXT,
            rating REAL,
            duration TEXT,
            poster_url TEXT
        )`, (err) => {
            if (err) {
                console.error('Error creating movies table:', err.message);
            }
        });

        db.run(`CREATE TABLE IF NOT EXISTS theatres (
            id INTEGER PRIMARY KEY,
            name TEXT,
            location TEXT,
            amenities TEXT
        )`, (err) => {
            if (err) {
                console.error('Error creating theatres table:', err.message);
            }
        });

        db.run(`CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY,
            movie_id INTEGER,
            theatre_id INTEGER,
            show_time TEXT,
            seats TEXT,
            total_price REAL,
            booking_date TEXT
        )`, (err) => {
            if (err) {
                console.error('Error creating bookings table:', err.message);
            }
        });

        // --- 2. Seed Data (Matching your UI content) ---
        const seedMovies = [
            // Movie from your screenshots
            ['The Dark Universe', 'English', 'Action/Thriller', 8.5, '2h 30m', 'image_url_dark_universe'],
            ['Mission Strike', 'Hindi', 'Action/Drama', 7.8, '2h 15m', 'image_url_mission_strike'],
            ['Comedy Nights', 'English', 'Comedy', 8.8, '1h 30m', 'image_url_comedy'],
            ['Interstellar', 'English', 'Sci-Fi', 9.0, '2h 49m', 'image_url_interstellar'],
        ];
        const stmtMovies = db.prepare("INSERT INTO movies VALUES (NULL, ?, ?, ?, ?, ?, ?)");
        seedMovies.forEach(movie => stmtMovies.run(movie));
        stmtMovies.finalize();

        const seedTheatres = [
            ['PVR Cinemas - Phoenix Mall', 'Mumbai', '4K, Dolby Atmos, Recliner, Parking'],
            ['INOX Megaplex', 'Mumbai', 'IMAX, 4DX, Premium, Food Court'],
            ['Cinepolis - Andheri', 'Mumbai', '4K, VIP Lounge, Wheelchair Access'],
        ];
        const stmtTheatres = db.prepare("INSERT INTO theatres VALUES (NULL, ?, ?, ?)");
        seedTheatres.forEach(theatre => stmtTheatres.run(theatre));
        stmtTheatres.finalize();
        
        // Seed a sample booking for the My Tickets screen (101308.png)
        db.run("INSERT INTO bookings VALUES (NULL, 1, 1, '2024-12-09 20:30', 'D5,D6', 800.00, '2024-12-07 10:00')", (err) => {
            if (err) console.error('Error seeding booking 1:', err.message);
        });
        db.run("INSERT INTO bookings VALUES (NULL, 2, 2, '2024-12-12 17:30', 'G3,G4,G5', 900.00, '2024-12-06 09:00')", (err) => {
            if (err) console.error('Error seeding booking 2:', err.message);
        });
        db.run("INSERT INTO bookings VALUES (NULL, 3, 3, '2024-12-01 19:00', 'E8,E9', 600.00, '2024-11-20 15:00')", (err) => {
            if (err) console.error('Error seeding booking 3:', err.message);
        });

        console.log('Database seeded with initial data.');
    });
});

// --- End Database Initialization ---


// ------------------------------------------------------------------
// --- FOUR REQUIRED ENDPOINTS ---
// ------------------------------------------------------------------

/**
 * 1. GET /api/movies
 * Retrieves a list of all movies. Supports optional filtering (for Movies List Screen).
 * Example: GET /api/movies?language=Hindi&genre=Action
 */
app.get('/api/movies', (req, res) => {
    const { language, genre } = req.query;
    let sql = 'SELECT * FROM movies';
    const params = [];
    const conditions = [];

    if (language) {
        conditions.push('language = ?');
        params.push(language);
    }
    if (genre) {
        conditions.push('genre = ?');
        params.push(genre);
    }

    if (conditions.length) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }

    db.all(sql, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ data: rows });
    });
});

/**
 * 2. GET /api/movie/:id/showtimes
 * Retrieves theatres and their showtimes for a specific movie ID (for Movie Details Screen).
 * Example: GET /api/movie/1/showtimes
 */
app.get('/api/movie/:id/showtimes', (req, res) => {
    const movieId = req.params.id;
    
    // Check if movie exists
    db.get('SELECT title FROM movies WHERE id = ?', [movieId], (err, movie) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        // Fetch all theatres and attach mock showtimes (as seat availability is complex)
        db.all('SELECT * FROM theatres', [], (err, theatres) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            // Mock data reflecting timings in your UI screenshot (101207.png)
            const mockShowtimes = {
                1: ['10:30', '13:45', '17:00', '20:30'], // PVR
                2: ['11:00', '14:15', '17:30', '21:00'], // INOX
                3: ['10:00', '13:30', '16:45', '20:15'], // Cinepolis
            };

            const data = theatres.map(theatre => ({
                ...theatre,
                movie_title: movie.title,
                show_times: mockShowtimes[theatre.id] ? mockShowtimes[theatre.id].map((time, index) => ({
                    time: time,
                    // Simulate availability status
                    status: (index === 1 || index === 3) ? 'Fast Filling' : 'Available',
                    price: theatre.id === 1 ? 400.00 : 300.00 // Base price for seats
                })) : []
            }));

            res.json({ data: data });
        });
    });
});

/**
 * 3. POST /api/book
 * Handles the final booking request (triggered by 'Pay Now' on Payment Options Screen).
 * Body: { movie_id, theatre_id, show_time, seats: ['D1', 'D2', 'D3', 'D4'], total_price }
 */
app.post('/api/book', (req, res) => {
    const { movie_id, theatre_id, show_time, seats, total_price } = req.body;

    if (!movie_id || !theatre_id || !show_time || !seats || !total_price) {
        return res.status(400).json({ error: "Missing required booking fields." });
    }

    // Prepare data for insertion
    const seatsString = Array.isArray(seats) ? seats.join(',') : seats;
    const booking_date = new Date().toISOString();

    db.run(
        'INSERT INTO bookings (movie_id, theatre_id, show_time, seats, total_price, booking_date) VALUES (?, ?, ?, ?, ?, ?)',
        [movie_id, theatre_id, show_time, seatsString, total_price, booking_date],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({
                message: 'Booking successful',
                booking_id: `BKZWX${this.lastID}DF`, // Mocking the ID format from your screenshot
                details: req.body
            });
        }
    );
});

/**
 * 4. GET /api/bookings/:user_id
 * Retrieves the booking history for a user (for My Tickets Screen).
 * Example: GET /api/bookings/1 (user ID is often ignored in simple demos)
 */
app.get('/api/bookings/:user_id', (req, res) => {
    // Joins the three tables to create a comprehensive ticket history view
    const sql = `
        SELECT 
            b.id as booking_id, b.show_time, b.seats, b.total_price, b.booking_date,
            m.title as movie_title, m.poster_url, m.language,
            t.name as theatre_name, t.location
        FROM bookings b
        JOIN movies m ON b.movie_id = m.id
        JOIN theatres t ON b.theatre_id = t.id
        ORDER BY b.show_time DESC
    `;

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        // Transform data for the UI to determine Upcoming vs. Past
        const currentDate = new Date();
        const data = rows.map(row => {
            // Combine date and time for comparison (show_time is stored as YYYY-MM-DD HH:MM)
            const showDateTime = new Date(row.show_time.replace(' ', 'T')); 
            
            return {
                ...row,
                status: showDateTime > currentDate ? 'Upcoming' : 'Past'
            };
        });

        res.json({ data: data });
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Start Server
// Listen on all network interfaces (0.0.0.0) to allow mobile devices to connect
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running and listening at http://0.0.0.0:${port}`);
    console.log(`Local access: http://localhost:${port}`);
    console.log(`Network access: http://<your-ip>:${port}`);
    console.log(`\nTo find your IP address:`);
    console.log(`  - Windows: ipconfig`);
    console.log(`  - Mac/Linux: ifconfig or ip addr`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('Database connection closed.');
        }
        process.exit(0);
    });
});

