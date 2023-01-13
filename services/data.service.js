// const { Promise } = require('mongoose')
const db = require('./db')

const login = (username, password) => {
    //check acno and pswd is present in mongo db
    //asynchrous function -Promise
    console.log(username);
    return db.User.findOne({
        username,
        password
    }).then((result) => {
        if (result) {
            console.log('login successfully');
            return {
                status: true,
                username:username,
                message: 'login successfully',
                statusCode: 200
            }
        }
        else {
            console.log('invalid username or password');
            return {
                status: false,
                message: 'invalid account/password',
                statusCode: 404
            }
        }
    })
}

const getRest = () => {
    return db.FoodDetail.find().then((data) => {
        if (data) {
            return {
                statusCode: 200,
                result: data
            }
        }
        else {
            return {
                statusCode: 404,
                message: 'failed to fetch data from database'
            }
        }
    }).catch((error) => {
        console.log(error);
    })
}

const signup = (username, password) => {
    //check acno and pswd is present in mongo db
    //asynchrous function -Promise
    console.log(username);
    return db.User.findOne({
        username,
        password
    }).then((result) => {
        if (result) {
            console.log('Already registered');
            return {
                status: false,
                message: 'Account already exist',
                statusCode: 404
            }
        }
        else {
            console.log('register successful');
            let NewUser = new db.User({
                username,
                password,
                orderhistory: []
            })
            NewUser.save()
            return {
                status: true,
                message: 'Signup successfully',
                username: login.username,
                statusCode: 200
            }
        }
    }).catch((error) => {
        console.log(error);
    })
}


const addToCart = (id, name, price ,restname) => {
    return db.Cart.findOne({ id }).then((result) => {
        if (result) {
            return {
                statusCode: 404,
                message: 'Product already in your wishlist'
            }

        }
        else {
            const newItem = new db.Cart({
                id,
                name,
                price,
                restname
            });
            newItem.save()
            return {
                statusCode: 200,
                message: 'Product successfully added to your cart'
            }
        }
        // else {
        //     return {
        //         statusCode: 404,
        //         message: 'Product not found'
        //     }
        // }
    })
}

const getCart = () => {
    return db.Cart.find()
        .then((data) => {
            if (data) {
                return {
                    statusCode: 200,
                    result: data
                };
            }
            else {
                return {
                    statusCode: 404,
                    message: 'Your Cart is empty'
                };
            }
        });
}

const deleteItemCart = (id) => {
    return db.Cart.deleteOne({
        id
    })
        .then(
            (data) => {
                if (data) {
                    return db.Cart.find().then((data) => {
                        if (data) {
                            return {
                                statusCode: 200,
                                Cart: data,
                                message: 'Product successfully removed from your Cart'
                            };
                        }
                        else {
                            return {
                                statusCode: 404,
                                message: 'Your Cart is empty'
                            };
                        }
                    });
                }
                else {
                    return {
                        statusCode: 404,
                        message: 'Product not available'
                    };
                }
            })
}

const deleteCart = () => {
    return db.Cart.deleteMany()
        .then(
            (data) => {
                if (data) {
                    return {
                        statusCode: 200,
                        Cart: data,
                        message: 'Product successfully removed from your Cart'
                    };
                }
                else {
                    return {
                        statusCode: 404,
                        message: 'something went wrong '
                    };
                }
            });
}

module.exports = {
    login,
    getRest,
    signup,
    addToCart,
    getCart,
    deleteItemCart,
    deleteCart
}