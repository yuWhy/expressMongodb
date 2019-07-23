var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/');

var db = mongoose.connection;
db.on('error', function callback() {
    console.log('Connection error');
})

db.once('open', function callback() {
    console.log('connected');
})

var ListSchema = new mongoose.Schema({
    user_id: String,
    content: String,
    updated_at: Date
});
mongoose.model('user', ListSchema);

module.exports = mongoose;
