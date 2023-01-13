const mongoose = require('mongoose')

//define connection string and connect db with node
mongoose.connect('mongodb://localhost:27017/app', () => {
  console.log('Mongodb connected successfully');
})

const User = mongoose.model('User', {
  username: String,
  password: String,
  orderhistory: []
})

const FoodDetail = mongoose.model('FoodDetail', {
  id: Number,
  name: String,
  address: String,
  cuisines: String,
  rating: Number,
  reviews: Number,
  feature_image: String,
  thumbnail_image: String,
  menu: [
    {
      id: Number,
      name: String,
      desc: String,
      price: Number,
      restname:String
    }
  ]
})

const Cart = mongoose.model('Cart', {
  
    
      id: Number,
      name: String,
      price: Number,
      restname:String
    
  
}

)

module.exports = {
  User,
  FoodDetail,
  Cart
}