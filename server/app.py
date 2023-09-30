#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import abort, request, session
from flask_restful import Api, Resource
from sqlite3 import IntegrityError
from flask import Flask, make_response, jsonify, request, session, redirect
from flask_cors import CORS
from sqlalchemy.exc import IntegrityError
from dotenv import load_dotenv
import os
import json
import stripe

# Local imports
from config import app, db, api
# Add your model imports
from models import Product, SKU, OrderItem, Order, Customer

load_dotenv()
stripe_keys = {
    "secret_key": os.environ["STRIPE_SECRET_KEY"],
    "publishable_key": os.environ["STRIPE_PUBLISHABLE_KEY"],
}
# stripe_secret_key=os.getenv("STRIPE_SECRET_KEY")
# stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
stripe.api_key = stripe_keys["secret_key"]
# print(stripe)
# Views go here!

class Products(Resource):
    def get(self):
        products = [product.to_dict() for product in Product.query.all()]
        return make_response(products, 200)

class ProductsById(Resource):
    def get(self, id):
        product = Product.query.filter_by(id=id).first()
        if not product:
            raise ValueError("Could not find product")
        return make_response(product.to_dict(), 200)
    
class SKUsById(Resource):
    def get(self, id):
        SKU = SKU.query.filter_by(id=id).first()
        if not SKU:
            raise ValueError("Could not find product")
        return make_response(SKU.to_dict(), 200)

class CustomerById(Resource):
    def get(self, id):
        customer = Customer.query.filter_by(id=id).first()
        if not customer:
            raise ValueError("Customer not found")
        return make_response(customer.to_dict(), 200)

class OrderItems(Resource):
    def get(self):
        order_items = [order_item.to_dict() for order_item in OrderItem.query.all()]
        return make_response(order_items, 200)

    def post(self):
        req_json = request.get_json()
        print(req_json)

        try:
            sku_id = req_json['sku_id']
            order_id = req_json['order_id']
            quantity = req_json['quantity']

            new_order_item = OrderItem(
                sku_id = sku_id,
                order_id = order_id,
                quantity=quantity,
            )

            db.session.add(new_order_item)
            db.session.commit()

            return make_response(new_order_item.to_dict(), 201)
        
        except KeyError as e:
            missing_field = str(e)
            print(f"keyError: {missing_field}")
            return {'error': f'Missing required field: {missing_field}'}, 400
        except IntegrityError:
            return {'error': 'Database integrity violation'}, 500
    
class OrderById(Resource):
    def get(self, id):
        order = Order.query.filter_by(id=id).first()
        if not order:
            raise ValueError("Order not found")
        return make_response(order.to_dict(), 200)
    
class OrderStatusUpdate(Resource):
    def patch(self, id):
        order = Order.query.filter_by(id=id).first()
        try:
            data = request.get_json()
            order.paid_unpaid = data.get("paid_unpaid")
            db.session.commit()

            new_order = Order(
            customer_id=session['customer_id'],
            paid_unpaid="unpaid",
            status="not shipped"
            )
        
            db.session.add(new_order)
            db.session.commit()

            response = {"message": "Order paid successfully"}
            return make_response(jsonify(response), 200)

        except Exception as e:
            error_message = str(e)
            response = {"error": error_message}
            return jsonify(response), 500

class UnpaidOrders(Resource):
    def get(self, customer_id):
        # Retrieve unpaid order items associated with the customer
        unpaid_order_items = db.session.query(OrderItem).join(Order).filter(
            Order.customer_id == customer_id,
            Order.paid_unpaid == 'unpaid'
        ).all()

        # Convert unpaid order items to dictionaries
        unpaid_order_items_data = [order_item.to_dict() for order_item in unpaid_order_items]

        # Retrieve unpaid orders associated with the customer
        unpaid_orders = Order.query.filter_by(customer_id=customer_id, paid_unpaid='unpaid').all()

        # Convert unpaid orders to dictionaries
        unpaid_orders_data = [order.to_dict() for order in unpaid_orders]

        # Return both unpaid orders and unpaid order items as a JSON response
        return make_response({
            "unpaid_orders": unpaid_orders_data,
            "unpaid_order_items": unpaid_order_items_data
        }, 200)


####### Handling Authorization #####
class Signup(Resource):
    def post(self):
        req_json = request.get_json()
        try:
            new_customer = Customer(
                first_name=req_json["first_name"],
                last_name=req_json["last_name"],
                email=req_json["email"],
                username=req_json["username"],
                password=req_json["password"],
                address=req_json["address"],
                )
            db.session.add(new_customer)
            db.session.commit()

            new_order = Order(
                customer_id=new_customer.id,
                paid_unpaid="unpaid",
                status="not shipped"
                )
        
            db.session.add(new_order)
            db.session.commit()

        except Exception as e:
            abort(422, f"Invalid customer data {e}")
        
        session["customer_id"] = new_customer.id
        return make_response(new_customer.to_dict(), 201)   
    
class Login(Resource):
    def post(self):
        req_json = request.get_json()
        username = req_json['username']
        password = req_json['password']

        customer = Customer.query.filter_by(username=username).first()

        if customer and customer.check_password(password):
            session['customer_id'] = customer.id
            return customer.to_dict(), 200
        return {'error': 'Invalid username or password'}, 401

class Logout(Resource):
    def delete(self):
        session['customer_id'] = None
        return {'message': '204: No Content'}, 204

class Authorized(Resource):
    def get(self):
        customer = Customer.query.filter(Customer.id == session.get('customer_id')).first()
        if customer:
            return make_response(customer.to_dict(), 200)
        else:
            return make_response({"Error": "customer not found"}, 401)
        
@app.route('/current-cart', methods=['GET'])
def get_current_cart():
    customer_id = session.get('customer_id')
    customer = Customer.query.filter(Customer.id == customer_id).first()
    if not customer:
        return {"Error": "customer not found"}, 401
    
    current_cart = customer.current_cart
    if current_cart:
        return jsonify(current_cart.to_dict()), 200
    else:
        return {"Error": "No current carrt found for this customer"}, 404
        
@app.route('/create-payment-intent', methods=['POST', 'GET'])
def create_payment_intent():
    intent = stripe.PaymentIntent.create(amount=1099, currency="usd")
    return jsonify(client_secret=intent.client_secret)

@app.route("/confirmed", methods=["GET", "POST"])
def payment_success():
    return redirect("/confirmed", code=302)

api.add_resource(Authorized, '/authorized')   
api.add_resource(Signup, "/signup")
api.add_resource(Login, "/login")
api.add_resource(Logout, '/logout')

api.add_resource(Products, '/products')
api.add_resource(ProductsById, '/products/<int:id>')
api.add_resource(SKUsById, '/skus/<int:id>')
api.add_resource(CustomerById, '/customer/<int:id>')
api.add_resource(OrderItems, '/order_items')
api.add_resource(OrderById, '/order/<int:id>')
api.add_resource(OrderStatusUpdate, '/update-order-status/<int:id>')
api.add_resource(UnpaidOrders, '/customer/<int:customer_id>/unpaid-orders')

if __name__ == '__main__':
    app.run(port=5555, debug=True)