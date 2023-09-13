#!/usr/bin/env python3
from sqlalchemy import create_engine
import json 
from config import db, bcrypt
from models import Products, SKUs, Orders, OrderItems, Customers

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
# from models import db

with open('db.json', 'r') as json_file:
    data = json.load(json_file)

def seed_database():
    for product_data in data.get('products', []):
        product = Products(
            name=product_data['name'],
            price=product_data['price'],
            description=product_data['description'],
            photo1=product_data['photo1'],
            photo2=product_data['photo2'],
            photo3=product_data['photo3'],
            photo4=product_data['photo4'],
            photo5=product_data['photo5']
        )
        db.session.add(product)

    for sku_data in data.get('SKUs', []):
        sku = SKUs(
            product_id=sku_data['product_id FK'],
            sku=sku_data['SKU'],
            color=sku_data['color'],
            stock=sku_data['stock']
        )
        db.session.add(sku)

    for order_data in data.get('orders', []):
        order = Orders(
            customer_id=order_data['customer_id FK'],
            paid_unpaid=order_data['paid/unpaid'],
            status=order_data['status']
        )
        db.session.add(order)

    for order_item_data in data.get('order items', []):
        order_item = OrderItems(
            sku_id=order_item_data['SKU_id FK'],
            order_id=order_item_data['order_id FK'],
            quantity=order_item_data['quantity']
        )
        db.session.add(order_item)

    for customer_data in data.get('customers', []):
        customer = Customers(
            first_name=customer_data['first_name'],
            last_name=customer_data['last_name'],
            email=customer_data['email'],
            username=customer_data['username'],
            password=bcrypt.generate_password_hash(customer_data['password'].encode('utf-8')).decode('utf-8'),
            address=customer_data['address']
        )
        db.session.add(customer)

    # Commit the changes to the database
    db.session.commit()
    

if __name__ == '__main__':
    engine = create_engine("sqlite:///")
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        seed_database()

