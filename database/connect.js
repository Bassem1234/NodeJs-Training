const mongoose = require('mongoose');
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}
mongoose.connect('mongodb://localhost:27017/nodejsChallenge_Database').then(connect => {
console.log('connect to database successfully')
}).catch(err => {
    console.log('connect to database failed, error:');
    console.log(err);
});