const mysql = require("mysql2")
const Sequelize = require("sequelize")
const sequelize_connection = require('./db_connect')


// Модель комментариев

const Comment = sequelize_connection.define("Comment", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    comment_text: {
        type: Sequelize.TEXT,
        allowNull: false
      },
    parent_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
})


// Модель сообщений обратной связи

const Message = sequelize_connection.define("Message", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    sender_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
    sender_email: {
        type: Sequelize.STRING,
        allowNull: false
      },
    message_text: {
        type: Sequelize.TEXT,
        allowNull: false
      },
    message_readed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
})


// Модель картин

const Picture = sequelize_connection.define("Picture", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    picture_image: {
        type: Sequelize.STRING,
        allowNull: false
      },
    picture_header: {
        type: Sequelize.STRING,
        allowNull: false
      },
    picture_description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
    picture_price: {
        type: Sequelize.STRING,
        allowNull: false
      },
    picture_slug: {
        type: Sequelize.STRING,
        allowNull: false
      }
})


// Модель категорий картин

const Picture_category = sequelize_connection.define("Picture_category", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    picture_category_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
    picture_category_slug: {
        type: Sequelize.STRING,
        allowNull: false
      }
})


// Модель слайдов

const Slider = sequelize_connection.define("Slider", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    slider_picture: {
        type: Sequelize.STRING,
        allowNull: false
      },
    slider_header: {
        type: Sequelize.STRING,
        allowNull: false
      },
    slider_description: {
        type: Sequelize.STRING,
        allowNull: false
      }
})

// Модель пользователей

const User = sequelize_connection.define("User", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    user_name: {
        type: Sequelize.TEXT,
        allowNull: false
      },
    user_password: {
        type: Sequelize.STRING,
        allowNull: false
      },
    user_role: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    user_avatar: {
        type: Sequelize.STRING,
        allowNull: false
      }
})

// Модель заказов

const Order = sequelize_connection.define("Order", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    }
})


// Pivot-таблица категорий и картин

// const Picture_category_union = sequelize_connection.define("picture_category_union", {
//     id: {
//       type: Sequelize.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       allowNull: false
//     }
// })

// Отношения моделей

// -- Отношения "Многие ко многим" между картинами и категориями

Picture.belongsToMany(Picture_category, { through: 'PictureCategoriesUnion'})
Picture_category.belongsToMany(Picture, { through: 'PictureCategoriesUnion'})

// -- Отношения "Один ко многим" между комментариями и пользователями

User.hasMany(Comment)
Comment.belongsTo(User)

// -- Отношения "Один ко многим" между картинами и комментариями

Picture.hasMany(Comment)
Comment.belongsTo(Picture)


// -- Отношения "Один ко многим" между пользователями и заказами

User.hasMany(Order)
Order.belongsTo(User)

// -- Отношения "Один ко многим" между картинами и заказами

Picture.hasMany(Order)

sequelize_connection.sync().then(result=>{
    console.log(result);
  })
  .catch(err=> console.log(err))

module.exports = {Comment, Message, Picture, Picture_category, Slider, User}
