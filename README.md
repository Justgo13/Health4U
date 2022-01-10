# Health4U Online COVID Accessory store

A web application that allows users to purchase COVID-19 health products. 

To checkout on the site, users must create a buyer account.

Design docs are found in design_docs

## Buyer account features:
- Add items to cart
- Remove items from cart
- Change product quantity in the cart
- Bookmark products
- Make purchases
- View order history
- Update profile

## Seller account features:
- Create item
- Edit item
- Delete item
- Update profile

## Techonlogies used:
### Frontend
- React + React Hooks
- SASS
- Material UI

### Backend
- NodeJS/Express
- Mongoose

### Database 
- MongoDB

## LOCAL DEVELOPMENT

### Set-up frontend (2 terminals)
```
cd frontend
npm install

sass -I src/styles/sass/_global.sass src/styles/sass:src/styles --watch
npm start
```

### Set-up backend (1 terminal)
```
npm install
npm start
```