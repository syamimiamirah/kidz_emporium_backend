const mongoose = require('mongoose');


const user = mongoose.Schema({
        name:{
            type: String,
            required: true,
            },
        email:{
            type: String,
            lowercase: true,
            required: true,
            unique: true
            },
        phone:{
            type: String,
            required: true,
            },
        role:{
            type: String,
            required: true,
            },
        password:{
            type: String,
            required: true,
            }
        },
        {
            toJSON:{
                transform: function(doc, ret){
                    ret.userId = ret._id.toString();
                    delete ret._id;
                    delete ret.__v;
                    delete ret.password;
                }
            }
        },
        {
            timestamps: true
        });

// userSchema.pre('save', async function(){
//     try{
//         var user = this;
//         const salt = await(bcrypt.genSalt(10));
//         const hashpass = await bcrypt.hash(user.password, salt);

//         user.password = hashpass;
//     }catch{
//         throw error;
//     }
// });
const UserModel = mongoose.model('User', user);

module.exports = UserModel;