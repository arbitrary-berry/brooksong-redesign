from sqlalchemy import create_engine
from sqlalchemy.exc import SQLAlchemyError
import json 
from config import db, bcrypt
from models import Product, SKU, Order, OrderItem, Customer

from random import randint, choice as rc

from app import app

with open('db.json', 'r') as json_file:
    data = json.load(json_file)
    print(data)

def seed_database():
    for product_data in data.get('products', []):
        product = Product(
            name=product_data['name'],
            price=product_data['price'],
            description=product_data['description'],
            photo1=product_data['photo1'],
            photo2=product_data['photo2'],
            photo3=product_data['photo3'],
            photo4=product_data['photo4'],
            photo5=product_data['photo5'],
        )
        print(product)
        db.session.add(product)
    db.session.commit()


    for sku_data in data.get('SKUs', []):
        sku = SKU(
            product_id=sku_data['product_id FK'],
            sku=sku_data['SKU'],
            color=sku_data['color'],
            stock=sku_data['stock']
        )
        db.session.add(sku)

    for customer_data in data.get('customers', []):
        customer = Customer(
            first_name=customer_data['first_name'],
            last_name=customer_data['last_name'],
            email=customer_data['email'],
            username=customer_data['username'],
            password=customer_data['password'],
            address=customer_data['address']
        )
        db.session.add(customer)

    for new_customer_data in data.get('new_customer', []):
        new_customer = Customer(
            first_name=new_customer_data['first_name'],
            last_name=new_customer_data['last_name'],
            email=new_customer_data['email'],
            username=new_customer_data['username'],
            password=new_customer_data['password'],
            address=new_customer_data['address']
        )
        db.session.add(new_customer)

    product_updates = [
    
        {
            "id": "1",
            "photo1": "/images/Brooksong_Design_Megan_bag_hero.jpg",
            "photo2": "/images/Brooksong_Design_Megan_bag_front.jpg",
            "photo3": "/images/Brooksong_Design_Megan_bag_back.jpg",
            "photo4": "/images/Brooksong_Design_Megan_bag_inner.jpg",
            "photo5": "/images/Brooksong_Design_Megan_bag_props.jpg",
            "photo6": "/images/Brooksong_Design_Megan_bag_swatches.jpg"
        },
        {
            "id": "2",
            "photo1": "/images/Brooksong_Design_Mini_bag_hero.jpg",
            "photo2": "/images/Brooksong_Design_Mini_bag_front.jpg",
            "photo3": "/images/Brooksong_Design_Mini_bag_back.jpg",
            "photo4": "/images/Brooksong_Design_MIni_bag_inner.jpg",
            "photo5": "/images/Brooksong_Design_Mini_bag_props.jpg",
            "photo6": "/images/Brooksong_Design_Mini_bag_swatches.jpg"
        },
        {
            "id": "3",
            "photo1": "/images/Brooksong_Design_Christa_clutch_hero.jpg",
            "photo2": "/images/Brooksong_Design_Christa_clutch_front.jpg",
            "photo3": "/images/Brooksong_Design_Christa_clutch_back.jpg",
            "photo4": "/images/Brooksong_Design_Christa_clutch_props.jpg",
            "photo5": "/images/Brooksong_Design_Christa_clutch_strap.jpg",
            "photo6": "/images/Brooksong_Design_all_leather_swatches.jpg"
        },
        {
            "id": "4",
            "photo1": "/images/Brooksong_Design_Passport_cover_hero1.jpg",
            "photo2": "/images/Brooksong_Design_Passport_cover_hero.jpg",
            "photo3": "/images/Brooksong_Design_Passport_cover_inner.jpg",
            "photo4": "/images/Brooksong_Design_Passport_cover_props.jpg",
            "photo5": "/images/Brooksong_Design_Passport_cover_connector.jpg",
            "photo6": "/images/Brooksong_Design_all_leather_swatches.jpg"
        },
        {
            "id": "5",
            "photo1": "/images/Brooksong_Design_Mia_Snap_wallet_hero.jpg",
            "photo2": "/images/Brooksong_Design_Mia_Snap_wallet_front.jpg",
            "photo3": "/images/Brooksong_Design_Mia_Snap_wallet_back.jpg",
            "photo4": "/images/Brooksong_Design_Mia_Snap_wallet_inner.jpg",
            "photo5": "/images/Brooksong_Design_Mia_Snap_wallet_props.JPG",
            "photo6": "/images/Brooksong_Design_all_leather_swatches.jpg"
        },
        {
            "id": "6",
            "photo1": "/images/Brooksong_Design_Big_tassel_keychain_hero.jpg",
            "photo2": "/images/Brooksong_Design_Big_tassel_keychain_hero2.jpg",
            "photo3": "/images/Brooksong_Design_Big_tassel_keychain_onbag.jpg",
            "photo4": "/images/Brooksong_Design_tassel_keychain_both.JPG",
            "photo5": "/images/Brooksong_Design_Big_tassel_keychain_props.jpg",
            "photo6": "/images/Brooksong_Design_all_leather_swatches.jpg"
        },
        {
            "id": "7",
            "photo1": "/images/Brooksong_Design_Mini_tassel_keychain_hero.jpg",
            "photo2": "/images/Brooksong_Design_Mini_tassel_keychain_hero2.jpg",
            "photo3": "/images/Brooksong_Design_Mini_tassel_keychain_hero3.jpg",
            "photo4": "/images/Brooksong_Design_tassel_keychain_both.JPG",
            "photo5": "/images/Brooksong_Design_Mini_tassel_keychain_props.jpg",
            "photo6": "/images/Brooksong_Design_all_leather_swatches.jpg"
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

    db.session.commit()
    print([product.name for product in Product.query.all()])
    
def clear_database():
    Product.query.delete()
    SKU.query.delete()
    Order.query.delete()
    OrderItem.query.delete()
    Customer.query.delete()
    print([product.name for product in Product.query.all()])


if __name__ == '__main__':
    with app.app_context():
        clear_database()
        print("Starting seed...")
        seed_database()

