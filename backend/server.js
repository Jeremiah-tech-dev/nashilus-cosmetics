const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// --- MOCK DATABASE (Users) ---
// Default Admin: admin@nashilus.com / password: admin
const users = [
    { 
        id: 1, 
        name: "The Boss", 
        email: "admin@nashilus.com", 
        phone: "0700000000", 
        password: "admin", 
        role: "admin", 
        country: "Kenya" 
    }
];

// --- MOCK DATABASE (Products) ---
// Includes your diverse categories: Teeth, Undies, Tongue, etc.
let products = [
    { 
        id: 1, 
        name: "Rose Hydrating Mist", 
        price: "1200", 
        category: "Face", 
        image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=400" 
    },
    { 
        id: 2, 
        name: "Charcoal Whitening Paste", 
        price: "850", 
        category: "Teeth", 
        image: "https://images.unsplash.com/photo-1559599101-f09722fb2948?auto=format&fit=crop&q=80&w=400" 
    },
    { 
        id: 3, 
        name: "Silk Intimate Wash", 
        price: "1500", 
        category: "Private Areas", 
        image: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&q=80&w=400" 
    },
    { 
        id: 4, 
        name: "Lace Bodysuit Set", 
        price: "2800", 
        category: "Undies", 
        image: "https://images.unsplash.com/photo-1596462502278-27bfdd403348?auto=format&fit=crop&q=80&w=400" 
    },
    { 
        id: 5, 
        name: "Volume Mascara", 
        price: "950", 
        category: "Eyelashes", 
        image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?auto=format&fit=crop&q=80&w=400" 
    },
    { 
        id: 6, 
        name: "Copper Tongue Scraper", 
        price: "600", 
        category: "Tongue", 
        image: "https://placehold.co/400x400/e17688/ffffff?text=Tongue+Scraper" 
    },
    { 
        id: 7, 
        name: "Vanilla Body Splash", 
        price: "1800", 
        category: "Body Splash", 
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400" 
    }
];

// --- API ROUTES ---

// 1. GET ALL PRODUCTS
app.get('/api/products', (req, res) => {
    res.json(products);
});

// 2. GET ALL USERS (For Admin Dashboard)
app.get('/api/users', (req, res) => {
    res.json(users);
});

// 3. ADD NEW PRODUCT (For Admin)
app.post('/api/products', (req, res) => {
    const { name, price, category, image } = req.body;
    
    // Create new product object
    const newProduct = {
        id: Date.now(), // Generate unique ID
        name, 
        price, 
        category, 
        image: image || "https://placehold.co/400x500/e17688/ffffff?text=New+Product"
    };
    
    products.push(newProduct);
    console.log("New Product Added:", newProduct.name);
    res.status(201).json({ message: "Product added successfully!", product: newProduct });
});

// 4. REGISTER NEW USER
app.post('/api/register', (req, res) => {
    const { name, email, phone, country, password, confirmPassword } = req.body;

    // Basic Validation
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match!" });
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email === email || u.phone === phone);
    if (existingUser) {
        return res.status(400).json({ message: "User with this email or phone already exists!" });
    }

    // Create new user
    const newUser = { 
        id: Date.now(), 
        name, 
        email, 
        phone, 
        country, 
        password, 
        role: "customer" // Default role is customer
    };

    users.push(newUser);
    console.log("New User Registered:", newUser.name);
    res.status(201).json({ message: "Registration Successful!", user: newUser });
});

// 5. LOGIN USER
app.post('/api/login', (req, res) => {
    const { identifier, password } = req.body;

    // Find user by Email OR Phone
    const user = users.find(u => 
        (u.email === identifier || u.phone === identifier) && u.password === password
    );

    if (user) {
        res.json({ message: "Login Successful", user });
    } else {
        res.status(401).json({ message: "Invalid email/phone or password" });
    }
});

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
    console.log(`- Shop API ready`);
    console.log(`- Admin API ready`);
});