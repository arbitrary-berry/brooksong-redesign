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

            response = {"message": "Order paid successfully"}
            return make_response(jsonify(response), 200)

        except Exception as e:
            error_message = str(e)
            response = {"error": error_message}
            return jsonify(response), 500



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

        # Retrieve the customer instance using the provided username
        customer = Customer.query.filter_by(username=username).first()

        if customer and customer.check_password(password):
            session['customer_id'] = customer.id
            return customer.to_dict(), 200
        return {'error': 'Invalid username or password'}, 401

class Logout(Resource):

    def delete(self): # just add this line!
        session['customer_id'] = None
        return {'message': '204: No Content'}, 204

class Authorized(Resource):
    def get(self):
        customer = Customer.query.filter(Customer.id == session.get('customer_id')).first()
        if customer:
            return make_response(customer.to_dict(), 200)
        else:
            return make_response({"Error": "customer not found"}, 401)
        
@app.route('/create-payment-intent', methods=['POST', 'GET'])
def create_payment_intent():
    intent = stripe.PaymentIntent.create(amount=1099, currency="usd")
    return jsonify(client_secret=intent.client_secret)

        # try:
        #     # Setup env vars beforehand 
        #     stripe_keys = {
        #         "secret_key": os.environ["STRIPE_SECRET_KEY"],
        #         "publishable_key": os.environ["STRIPE_PUBLISHABLE_KEY"],
        #     }

        #     stripe.api_key = stripe_keys["secret_key"]
        #     data = request.get_json()

        #     if 'customer' not in data:
        #         return jsonify(error='Invalid request: Missing "customer" key'), 400
            
        #     print(f"Request Data: {data}")

        #     intent = stripe.PaymentIntent.create(
        #         amount=2000,
        #         currency='usd',
        #         automatic_payment_methods={'enabled': True,},
        #         metadata={
        #             'customer': data['customer']
        #         },
        #     )

        #     # return jsonify({'clientSecret': intent['client_secret']}), 200
        #     return make_response(jsonify({'clientSecret': intent['client_secret']}), 200)

        # except stripe.error.StripeError as e:
        #     error_message = str(e)
        #     print(f"Stripe Error creating payment intent: {error_message}")
        #     return jsonify(error=f'Stripe Error: {error_message}'), 500

        # except Exception as e:
        #     error_message = str(e)
        #     print(f"Error creating payment intent: {error_message}")
        #     return jsonify(error=f'Failed to create payment intent: {error_message}'), 500



# @app.route('/secret')
# def secret():
#     data = request.get_json()
#     price = data['price']

#     try:
#         intent = stripe.PaymentIntent.create(
#             price=price,
#             currency='usd',
#         )
#         return jsonify(client_secret=intent.client_secret)
        
#     except Exception as e:
#         return jsonify(error=str(e)), 500

@app.route("/confirmed", methods=["GET", "POST"])
def payment_success():
    # logic to make necessary updates in db
    return redirect("/confirmed", code=302)
    # return jsonify({"message": "success"}), 200
# @app.route('/api/activities/check-payment-intent', methods=['POST'])
# def check_payment():
#         stripe.api_key = os.environ["STRIPE_SECRET_KEY"]
#         endpoint_secret = os.environ["STRIPE_ENDPOINT_KEY"]

#         event = None
#         payload = request.data
#         sig_header = request.headers['STRIPE_SIGNATURE']

#         try:
#             event = stripe.Webhook.construct_event(
#                 payload, sig_header, endpoint_secret
#             )
#         except ValueError as e:
#             raise e
#         except stripe.error.SignatureVerificationError as e:
#             raise e

#         if event['type'] == 'payment_intent.succeeded':
#             payment_intent = event['data']['object']
#             user_uuid = payment_intent['metadata']['customer']
#             # Update the user here using the uuid and your db client
#             print(f"User {user_uuid} completed a payment.")
        
#         else:
#             print('Unhandled event type {}'.format(event['type']))

#         return jsonify(success=True)
        
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

if __name__ == '__main__':
    app.run(port=5555, debug=True)