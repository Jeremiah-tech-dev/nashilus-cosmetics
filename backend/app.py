from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return {'message': 'Nashilus Cosmetics Backend is running!'}

@app.route('/health')
def health():
    return {'status': 'healthy'}

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 
    
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import json

app = Flask(__name__)
CORS(app)

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# --- MODELS ---
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(20), default='user')

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    image = db.Column(db.String(500), nullable=True)
    reviews = db.relationship('Review', backref='product', lazy=True)

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    text = db.Column(db.String(500), nullable=False)
    user_name = db.Column(db.String(100), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    user_name = db.Column(db.String(100), nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), default='Pending') 
    items_json = db.Column(db.Text, nullable=False)

# --- ROUTES ---

with app.app_context():
    db.create_all()

@app.route('/api/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    output = []
    for p in products:
        reviews = [{'user': r.user_name, 'rating': r.rating, 'text': r.text} for r in p.reviews]
        avg = sum([r.rating for r in p.reviews]) / len(p.reviews) if p.reviews else 0
        output.append({
            'id': p.id, 'name': p.name, 'price': p.price,
            'category': p.category, 'image': p.image,
            'reviews': reviews, 'rating': round(avg, 1)
        })
    return jsonify(output)

@app.route('/api/products', methods=['POST'])
def add_product():
    data = request.json
    new_product = Product(name=data['name'], price=data['price'], category=data['category'], image=data['image'])
    db.session.add(new_product)
    db.session.commit()
    return jsonify({'message': 'Product added!'})

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email already exists'}), 400
    new_user = User(name=data['name'], email=data['email'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created!'})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email'], password=data['password']).first()
    if user:
        return jsonify({'id': user.id, 'name': user.name, 'role': user.role})
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/api/reviews', methods=['POST'])
def add_review():
    data = request.json
    new_review = Review(rating=data['rating'], text=data['text'], user_name=data['user_name'], product_id=data['product_id'])
    db.session.add(new_review)
    db.session.commit()
    return jsonify({'message': 'Review added!'})

@app.route('/api/orders', methods=['POST'])
def create_order():
    data = request.json
    items_string = json.dumps(data['items'])
    new_order = Order(
        user_id=data['user_id'],
        user_name=data['user_name'],
        total_price=data['total_price'],
        items_json=items_string
    )
    db.session.add(new_order)
    db.session.commit()
    return jsonify({'message': 'Order placed successfully!'})

@app.route('/api/orders/<int:user_id>', methods=['GET'])
def get_user_orders(user_id):
    orders = Order.query.filter_by(user_id=user_id).all()
    output = []
    for o in orders:
        output.append({
            'id': o.id,
            'total': o.total_price,
            'status': o.status,
            'items': json.loads(o.items_json)
        })
    return jsonify(output)

if __name__ == '__main__':
    app.run(debug=True
            
