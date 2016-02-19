var express=require('express'),
    path=require('path'),
    logger=require('morgan'),
    bodyParser=require('body-parser'),
    api=require('./lib/api'),
    app=express();

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname,'public')));

api(app);

app.listen(3000,function(){
  console.log('Server listening ..');
})
