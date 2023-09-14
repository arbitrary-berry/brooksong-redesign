#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import abort, request, session
from flask_restful import Resource
from sqlite3 import IntegrityError
from flask import Flask, make_response, jsonify, request, session
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
# Add your model imports
from models import Product, SKU, OrderItem, Order, Customer

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

class CustomerById(Resource):
    def get(self, id):
        customer = Customer.query.filter_by(id=id).first()
        if not customer:
            raise ValueError("Customer not found")
        return make_response(customer.to_dict(), 200)
    
class OrderById(Resource):
    def get(self, id):
        order = Order.query.filter_by(id=id).first()
        if not order:
            raise ValueError("Order not found")
        return make_response(order.to_dict(), 200)



####### Handling Authorization #####
class Signup(Resource):
    def post(self):
        req_json = request.get_json()
        try:
            new_customer = Customer(
                first_name=req_json["firstname"],
                last_name=req_json["lastname"],
                email=req_json["email"],
                username=req_json["username"],
                password=req_json["password"],
                address=req_json["address"],
                )
        except:
            abort(422, "Invalid customer data")
        db.session.add(new_customer)
        db.session.commit()
        session["customer_id"] = new_customer.id
        return make_response(new_customer.to_dict(), 201)   
    
class Login(Resource):
    def post(self):
        req_json = request.get_json()
        username = req_json['username']
        password = req_json['password']

        # Retrieve the customer instance using the provided username
        customer = customer.query.filter_by(username=username).first()

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
        customer = customer.query.filter(customer.id == session.get('customer_id')).first()
        if customer:
            return make_response(customer.to_dict(), 200)
        else:
            return make_response({"Error": "customer not found"}, 401)
        
api.add_resource(Authorized, '/authorized')   
api.add_resource(Signup, "/signup")
api.add_resource(Login, "/login")
api.add_resource(Logout, '/logout')

api.add_resource(Products, '/products')
api.add_resource(ProductsById, '/products/<int:id>')
api.add_resource(CustomerById, '/customer/<int:id>')
api.add_resource(OrderById, '/order/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)