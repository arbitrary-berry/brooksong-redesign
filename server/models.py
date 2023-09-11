from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class Products(db.Model, SerializerMixin):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    price = db.Column(db.Integer)
    description = db.Column(db.String)
    photo1 = db.Column(db.String)
    photo2 = db.Column(db.String)
    photo3 = db.Column(db.String)
    photo4 = db.Column(db.String)
    photo5 = db.Column(db.String)

class SKUs(db.model, SerializerMixin):
    __tablename__ = "skus"

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    sku = db.Column(db.String)
    color = db.Column(db.String)
    stock = db.Column(db.Integer)

class OrderItems(db.model, SerializerMixin):
    __tablename__ = "order items"

    id = db.Column(db.Integer, primary_key=True)
    sku_id = db.Column(db.Integer, db.ForeignKey('skus.id'))
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'))
    quantity = db.Columb(db.Integer)

class Orders(db.model, SerializerMixin):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer)
    paid_unpaid = db.Column(db.String)
    status = db.Column(db.String)

class Customers(db.model, SerializerMixin):
    __tablename__ = "customers"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    email = db.Column(db.String)
    password = db.Column(db.String)
    address = db.Column(db.String)



