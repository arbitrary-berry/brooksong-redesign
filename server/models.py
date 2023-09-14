from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import relationship
from config import db, bcrypt

# Models go here!
class Product(db.Model, SerializerMixin):
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

skus = relationship('SKUs', backref='product')
skus_proxy = association_proxy('skus', 'sku')
    
class SKU(db.Model, SerializerMixin):
    __tablename__ = "skus"

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    sku = db.Column(db.String)
    color = db.Column(db.String)
    stock = db.Column(db.Integer)

product = relationship('Products', backref='skus')

class OrderItem(db.Model, SerializerMixin):
    __tablename__ = "order items"

    id = db.Column(db.Integer, primary_key=True)
    sku_id = db.Column(db.Integer, db.ForeignKey('skus.id'))
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'))
    quantity = db.Column(db.Integer)

order = relationship('Orders', backref='order_items')
sku = relationship('SKUs', backref='order_items')

class Order(db.Model, SerializerMixin):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer)
    paid_unpaid = db.Column(db.String)
    status = db.Column(db.String)

order_items = relationship('OrderItems', backref='order')
order_items_proxy = association_proxy('order_items', 'sku')

class Customer(db.Model, SerializerMixin):
    __tablename__ = "customers"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    email = db.Column(db.String)
    username = db.Column(db.String)
    password = db.Column(db.String)
    address = db.Column(db.String)

    @validates("password")
    def validate_password(self, key, value):
        if len(value) < 6:
            raise ValueError("Password must be at least 6 characters long.")

        if not any(char in "!@#$%^&*()_-+=<>?/~." for char in value):
            raise ValueError("Password must contain at least one special character.")

        if not any(char.isupper() for char in value):
            raise ValueError("Password must contain at least one uppercase letter.")

        if not any(char.isdigit() for char in value):
            raise ValueError("Password must contain at least one digit.")

        return value   
    
    @hybrid_property
    def password(self):
        return self._password

    @password.setter
    def password(self, plaintext_password):
      
        hashed_password = bcrypt.generate_password_hash(plaintext_password.encode("utf-8"))
        self._password = hashed_password.decode('utf-8')

    def check_password(self, plaintext_password):
 
        return bcrypt.check_password_hash(self._password, plaintext_password.encode('utf-8'))

