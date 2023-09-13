import stripe
stripe.api_key = "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"

Megan_bag = stripe.Product.create(
    name="Megan bag",
    description="An everyday slouchy shoulder bag to have all you need at your fingertips. Natural edge flap makes every bag one-of-a-kind."
)

Megan_bag_price = stripe.Price.create(
    unit_amount=34000,
    currency="usd",
    product=Megan_bag['id'],
)

Mini_bag = stripe.Product.create(
    name="Mini bag",
    description="A crossbody bag for a night on the town or a gal who just needs the essentials. Natural edge flap makes every bag one-of-a-kind."
)

Mini_bag_price = stripe.Price.create(
    unit_amount=17500,
    currency="usd",
    product=Mini_bag['id'],
)

Christa_clutch = stripe.Product.create(
    name="Christa clutch",
    description="A classy zipper clutch that's versatile enough to carry on it's own or to slip into a larger bag. Comes with a removable wrist strap."
)

Christa_clutch_price = stripe.Price.create(
    unit_amount=12400,
    currency="usd",
    product=Christa_clutch['id'],
)

Passport_cover = stripe.Product.create(
    name="Passport cover",
    description="Carry your passports in style and keep all your important travel documents and cards together."
)

Passport_cover_price = stripe.Price.create(
    unit_amount=6000,
    currency="usd",
    product=Passport_cover['id'],
)

Mia_snap_wallet = stripe.Product.create(
    name="Mia snap wallet",
    description="A pocket-sized wallet, perfect for those times when you don't want to carry a bag."
)

Mia_snap_wallet_price = stripe.Price.create(
    unit_amount=5000,
    currency="usd",
    product=Mia_snap_wallet['id'],
)

Big_tassel_keychain = stripe.Product.create(
    name="Big tassel keychain",
    description="A little pizzazz to add to your keys or bag. 5 1/2' long"
)

Big_tassel_keychain = stripe.Price.create(
    unit_amount=1800,
    currency="usd",
    product=Big_tassel_keychain['id'],
)

Mini_tassel_keychain = stripe.Product.create(
    name="Mini tassel keychain",
    description="A little pizzazz to add to your keys or bag. 5 1/2' long"
)

Mini_tassel_keychain = stripe.Price.create(
    unit_amount=1400,
    currency="usd",
    product=Mini_tassel_keychain['id'],
)

print(f"Success! Here's all your products id: {Megan_bag.id}, {Mini_bag.id}, {Christa_clutch.id}, {Passport_cover.id}, {Mia_snap_wallet.id}, {Big_tassel_keychain.id}, {Mini_tassel_keychain.id}")
print(f"Success! Here's all your product prices id: {Megan_bag_price.id}, {Mini_bag.id}, {Christa_clutch.id}, {Passport_cover.id}, {Mia_snap_wallet.id}, {Big_tassel_keychain.id}, {Mini_tassel_keychain.id}")