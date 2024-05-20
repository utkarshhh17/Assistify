from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token
from flask_bcrypt import Bcrypt
import re
import pymongo
from flask_cors import CORS
from gradio_client import Client

from bson import ObjectId


app = Flask(__name__)

CORS(app)


app.config['JWT_SECRET_KEY'] = 'utkarshisthebest'

# Initialize extensions

bcrypt = Bcrypt(app)
jwt = JWTManager(app)


client = pymongo.MongoClient("mongodb+srv://utkarsh:utkarsh@atlascluster.vdrhcf6.mongodb.net/")
db = client.Assistify
users_collection = db.users
products_collection = db.products
order_collection=db.orders

def is_email_valid(email):
    return re.match(r"[^@]+@[^@]+\.[^@]+", email)


def signup_user(email, password, username):
    if not email or not password:
        raise ValueError('All fields must be filled')
    if not is_email_valid(email):
        raise ValueError('Email not valid')

    if users_collection.find_one({"email": email}):
        raise ValueError('Email already in use')

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    userObject = {"email": email, "username": username, "password": hashed_password}
    result = users_collection.insert_one(userObject)
    userObject["_id"] = str(result.inserted_id)

    return userObject

def login_user(email, password):
    if not email or not password:
        raise ValueError('All fields must be filled')

    user = users_collection.find_one({"email": email})
    if not user:
        raise ValueError('Incorrect email')

    if not bcrypt.check_password_hash(user['password'], password):
        raise ValueError('Incorrect password')


    user["_id"] = str(user["_id"])
    return user

def reset_user_password(email, password, newpassword):
    if not email or not password or not newpassword:
        raise ValueError('All fields must be filled')

    user = users_collection.find_one({"email": email})
    if not user:
        raise ValueError('User Not Found')

    if not bcrypt.check_password_hash(user['password'], password):
        raise ValueError('Incorrect password')

    hashed_newpassword = bcrypt.generate_password_hash(newpassword).decode('utf-8')
    users_collection.update_one({"email": email}, {"set": {"password": hashed_newpassword}})
    return user

# Routes
@app.route('/signup', methods=['POST'])
def signup_route():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    username = data.get('username')

    try:
        user = signup_user(email, password, username)
        token = create_access_token(identity=user['_id'])
        return jsonify(email=email, username=username, token=token), 200
    except Exception as e:
        return jsonify(error=str(e)), 400

@app.route('/login', methods=['POST'])
def login_route():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    try:
        user = login_user(email, password)
        token = create_access_token(identity=user['_id'])
        return jsonify(username=user['username'], email=email, token=token), 200
    except Exception as e:
        return jsonify(error=str(e)), 400

@app.route('/reset', methods=['POST'])
def reset_password_route():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    newpassword = data.get('newpassword')

    try:
        user = reset_user_password(email, password, newpassword)
        return jsonify(email=email), 200
    except Exception as e:
        return jsonify(error=str(e)), 400
    

@app.route('/products', methods=['GET'])
def products_post():
    try:
        products_cursor = products_collection.find({})
        # Convert ObjectId to string for each document
        products = [{**product, '_id': str(product['_id'])} for product in products_cursor]
        return jsonify(products=products), 200
    except Exception as e:
        return jsonify(error=str(e)), 400


@app.route('/products/<data>', methods=['GET'])
def get_product(data):
     
    try:
        # Convert the data to an ObjectId
        product_id = ObjectId(data)
    except Exception as e:
        return jsonify({"error": "Invalid product ID format"}), 400

    # Query the product by _id
    product = products_collection.find_one({"_id": product_id})

    if product:
        # Convert the ObjectId to string for JSON serialization
        product['_id'] = str(product['_id'])
        return jsonify(product)
    else:
        return jsonify({"error": "Product not found"}), 404
    

@app.route('/chat', methods=['POST'])
def chat():
    data=request.get_json()
    message=data.get("message")
    print(message)
    try:
        client = Client("https://8588aa9270389f8e8f.gradio.live")
        result = client.predict(
		message=message,
		api_name="/chat"
        )
        return jsonify(result),200

        
    except Exception as e:
        return jsonify(error=str(e)), 400
    

@app.route('/order', methods=['POST'])
def order():
    data=request.get_json()
    email=data.get("user")
    product=data.get("product")

    try:
        orderObject={'email':email, 'product':product}
        result = order_collection.insert_one(orderObject)
        orderObject["_id"] = str(result.inserted_id)
        
        return jsonify(orderObject),200

        
    except Exception as e:
        return jsonify(error=str(e)), 400




if __name__ == '__main__':
    app.run(port=8000, debug=True)