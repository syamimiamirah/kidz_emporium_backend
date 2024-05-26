const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    fcmToken: {
        type: String,
    }
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.userId = ret._id.toString();
            delete ret._id;
            delete ret.__v;
            delete ret.password;
        }
    },
    timestamps: true
});

// Pre-save hook to log before saving
userSchema.pre('save', function (next) {
    if (this.isModified('fcmToken')) {
        console.log(`FCM Token is being created or modified for user ${this._id}`);
    }
    next();
});

// Post-save hook to log after saving
userSchema.post('save', function (doc) {
    if (doc.fcmToken) {
        console.log(`FCM Token for user ${doc._id} has been saved or updated`);
    }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
