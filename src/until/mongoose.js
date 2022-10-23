module.exports = {
    // sd cho 1 list document dang arr
    multipleMongooseToObject: function(mongooseArrs) {
        return mongooseArrs.map(mongooseArr => mongooseArr.toObject());
    },

    // sd cho 1 document
    mongooseToObject: function(mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    }
}