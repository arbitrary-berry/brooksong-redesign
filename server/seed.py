#!/usr/bin/env python3
from sqlalchemy import create_engine
from sqlalchemy.exc import SQLAlchemyError
import json 
from config import db, bcrypt
from models import Product, SKU, Order, OrderItem, Customer

# Standard library imports
from random import randint, choice as rc

# Local imports
from app import app
# from models import db
# db.create_all()

with open('db.json', 'r') as json_file:
    data = json.load(json_file)

def seed_database():
    for product_data in data.get('product', []):
        product = Product(
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

    for sku_data in data.get('SKU', []):
        sku = SKU(
            product_id=sku_data['product_id FK'],
            sku=sku_data['SKU'],
            color=sku_data['color'],
            stock=sku_data['stock']
        )
        db.session.add(sku)

    for order_data in data.get('order', []):
        order = Order(
            customer_id=order_data['customer_id FK'],
            paid_unpaid=order_data['paid/unpaid'],
            status=order_data['status']
        )
        db.session.add(order)

    for order_item_data in data.get('order item', []):
        order_item = OrderItem(
            sku_id=order_item_data['SKU_id FK'],
            order_id=order_item_data['order_id FK'],
            quantity=order_item_data['quantity']
        )
        db.session.add(order_item)

    for customer_data in data.get('customer', []):
        customer = Customer(
            first_name=customer_data['first_name'],
            last_name=customer_data['last_name'],
            email=customer_data['email'],
            username=customer_data['username'],
            _password=bcrypt.generate_password_hash(customer_data['_password'].encode('utf-8')).decode('utf-8'),
            address=customer_data['address']
        )
        db.session.add(customer)

    for new_customer_data in data.get('new_customer', []):
        new_customer = Customer(
            first_name=new_customer_data['first_name'],
            last_name=new_customer_data['last_name'],
            email=new_customer_data['email'],
            username=new_customer_data['username'],
            password=bcrypt.generate_password_hash(new_customer_data['password'].encode('utf-8')).decode('utf-8'),
            address=new_customer_data['address']
        )
        db.session.add(new_customer)

    product_updates = [
    
        {
            "id": "1",
            "photo1": "client/src/images/Brooksong_Design_Megan_bag_hero.jpg",
            "photo2": "client/src/images/Brooksong_Design_Megan_bag_front.jpg",
            "photo3": "client/src/images/Brooksong_Design_Megan_bag_back.jpg",
            "photo4": "client/src/images/Brooksong_Design_Megan_bag_inner.jpg",
            "photo5": "client/src/images/Brooksong_Design_Megan_bag_props.jpg",
            "photo6": "client/src/images/Brooksong_Design_Megan_bag_swatches.jpg"
        },
        {
            "id": "2",
            "photo1": "client/src/images/Brooksong_Design_Mini_bag_hero.jpg",
            "photo2": "client/src/images/Brooksong_Design_Mini_bag_front.jpg",
            "photo3": "client/src/images/Brooksong_Design_Mini_bag_back.jpg",
            "photo4": "client/src/images/Brooksong_Design_MIni_bag_inner.jpg",
            "photo5": "client/src/images/Brooksong_Design_Mini_bag_props.jpg",
            "photo6": "client/src/images/Brooksong_Design_Mini_bag_swatches.jpg"
        },
        {
            "id": "3",
            "photo1": "client/src/images/Brooksong_Design_Christa_clutch_hero.jpg",
            "photo2": "client/src/images/Brooksong_Design_Christa_clutch_front.jpg",
            "photo3": "client/src/images/Brooksong_Design_Christa_clutch_back.jpg",
            "photo4": "client/src/images/Brooksong_Design_Christa_clutch_props.jpg",
            "photo5": "client/src/images/Brooksong_Design_Christa_clutch_strap.jpg",
            "photo6": "client/src/images/Brooksong_Design_all_leather_swatches.jpg"
        },
        {
            "id": "4",
            "photo1": "client/src/images/Brooksong_Design_Passport_cover_hero1.jpg",
            "photo2": "client/src/images/Brooksong_Design_Passport_cover_hero.jpg",
            "photo3": "client/src/images/Brooksong_Design_Passport_cover_inner.jpg",
            "photo4": "client/src/images/Brooksong_Design_Passport_cover_props.jpg",
            "photo5": "client/src/images/Brooksong_Design_Passport_cover_connector.jpg",
            "photo6": "client/src/images/Brooksong_Design_all_leather_swatches.jpg"
        },
        {
            "id": "5",
            "photo1": "client/src/images/Brooksong_Design_Mia_Snap_wallet_hero.jpg",
            "photo2": "client/src/images/Brooksong_Design_Mia_Snap_wallet_front.jpg",
            "photo3": "client/src/images/Brooksong_Design_Mia_Snap_wallet_back.jpg",
            "photo4": "client/src/images/Brooksong_Design_Mia_Snap_wallet_inner.jpg",
            "photo5": "client/src/images/Brooksong_Design_Mia_Snap_wallet_props.JPG",
            "photo6": "client/src/images/Brooksong_Design_all_leather_swatches.jpg"
        },
        {
            "id": "6",
            "photo1": "client/src/images/Brooksong_Design_Big_tassel_keychain_hero.jpg",
            "photo2": "client/src/images/Brooksong_Design_Big_tassel_keychain_hero2.jpg",
            "photo3": "client/src/images/Brooksong_Design_Big_tassel_keychain_onbag.jpg",
            "photo4": "client/src/images/Brooksong_Design_tassel_keychain_both.JPG",
            "photo5": "client/src/images/Brooksong_Design_Big_tassel_keychain_props.jpg",
            "photo6": "client/src/images/Brooksong_Design_all_leather_swatches.jpg"
        },
        {
            "id": "7",
            "photo1": "client/src/images/Brooksong_Design_Mini_tassel_keychain_hero.jpg",
            "photo2": "client/src/images/Brooksong_Design_Mini_tassel_keychain_hero2.jpg",
            "photo3": "client/src/images/Brooksong_Design_Mini_tassel_keychain_hero3.jpg",
            "photo4": "client/src/images/Brooksong_Design_tassel_keychain_both.JPG",
            "photo5": "client/src/images/Brooksong_Design_Mini_tassel_keychain_props.jpg",
            "photo6": "client/src/images/Brooksong_Design_all_leather_swatches.jpg"
        }
    ]

    for update_data in product_updates:
        product_id = update_data["id"]
        try:
            product_to_update = Product.query.filter_by(id=product_id).first()
            if product_to_update:
                product_to_update.photo1 = update_data["photo1"]
                product_to_update.photo2 = update_data["photo2"]
                product_to_update.photo3 = update_data["photo3"]
                product_to_update.photo4 = update_data["photo4"]
                product_to_update.photo5 = update_data["photo5"]
                product_to_update.photo6 = update_data["photo6"]
            
            db.session.commit()
        except SQLAlchemyError as e:
            print(f"An error occured: {str(e)}")

    # Commit the changes to the database
    db.session.commit()
    

if __name__ == '__main__':
    engine = create_engine("sqlite:///")
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        seed_database()

