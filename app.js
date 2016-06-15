var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var login = require('facebook-chat-api');
var request = require('request');
var http = require('http');
http.createServer(function (req, res) {
  console.log("ping");
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end("");
}).listen(process.env.PORT || 5000);

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var keys = [
  "Always have faith. Always have hope.",
  "The key is to make it.",
  "Another one.",
  "Key to more success is clean heart and clean face.",
  "Smh they get mad when u have joy.",
  "Baby, you smart. I want you to film me taking a shower.",
  "You smart! You loyal! You’re a genius!",
  "We go hard. In everything we do we’re going to accomplish our victory and our goal. If it takes a day, a year, or 20 years, we’re going to win. I haven’t taken a loss because everything I’ve done has been a working process to win. From being a kid on them turntables to becoming where I am is not a loss. It’s a blessing.",
  "Give thanks to the most high.",
  "They will try to close the door on u, just open it.",
  "They don’t want you to win. They don’t want you to have the No. 1 record in the country. They don’t want you get healthy. They don’t want you to exercise. And they don’t want you to have that view.",
  "I don’t have no favorite rock bands. I’m a fan of rock music though.",
  "I wanted to see what type of trees is growing in Marcy Projects, what type of water Jay Z was drinking.",
  "Those that weather the storm r the great ones.",
  "The key to more success is coco butter.",
  "I changed… a lot.",
  "My fans expect me to be greater and keep being great.",
  "There will be road blocks but we will overcome it.",
  "They don’t want you to jet ski.",
  "Congratulations, you played yourself.",
  "You want my advice? Don’t play yourself.",
  "Another one, no. Another two, drop two singles at a time.",
  "I can deal with everything. I got the answer for anything. This DJ Khaled.",
  "God has blessed me because I think. No I know that i’ve been put on this Earth to make people happy, to inspire people and to uplift people. That’s a beautiful thing. But the only downfall about it is that I really don’t have nobody to do that for me. But it makes me super strong because I do know that if I’m having a bad day, I can come up here and make Ebro and y’all laugh and smile.",
  "They don't want you to win.",
  "Lion",
  "Some people can't handle success. I can.",
  "They don't want you to have lunch.",
  "The key to more success is to get a massage once a week.",
  "The key is to stay clean at all times.",
  "The key is to be honest. Be honest, but don't play yourself.",
  "You have to make it through the jungle to make it to paradise. That's the key.",
  "The minute we think we went hard, go harder. We gotta work.",
  "The key is to never be afraid of being yourself.",
  "In life, everyone has a choice. The key is: make the right choice.",
  "The key to success is to have a hammock.",
  "Don't burn no bridge. Only god can walk on water.",
  "Bless up.",
  "They don't want us to win.",
  "We the best.",
  "They don't want us to eat.",
  "Egg whites, turkey sausage, wheat toast, water. Of course they don't want us to eat our breakfast, so we are going to enjoy our breakfast.",
  "Celebrate success right, the only way, apple.",
  "You smart, you loyal, you a genius.",
  "Hammock talk come soon.",
  "Give thanks to the most high.",
  "Congratulations, you played yourself.",
  "Don't ever play yourself.",
  "The key to more success is to have a lot of pillows.",
  "The ladies always say Khaled you smell good, I use no cologne. Cocoa butter is the key.",
  "Watch your back, but more importantly when you get out the shower, dry your back, it's a cold world out there.",
  "It's on you how you want to live your life. Everyone has a choice. I pick my choice, squeaky clean.",
  "How's business? Boomin.",
  "They never said winning was easy. Some people can't handle success, I can.",
  "They will try to close the door on you, just open it.",
  "We don't see them, we will never see them.",
  "Every chance I get, I water the plants, Lion!",
  "In life there will be road blocks but we will over come it.",
  "To succeed you must believe. When you believe, you will succeed.",
  "Life is what you make it, so let's make it.",
  "To be successful you've got to work hard, to make history, simple, you've got to make it.",
  "A major key, never panic. Don't panic, when it gets crazy and rough, don't panic, stay calm.",
  "Put it this way, it took me twenty five years to get these plants, twenty five years of blood sweat and tears, and I'm never giving up, I'm just getting started.",
  "You see that bamboo behind me though, you see that bamboo? Ain't nothin' like bamboo. Bless up.",
  "In life you have to take the trash out, if you have trash in your life, take it out, throw it away, get rid of it, major key.",
  "Surround yourself with angels, positive energy, beautiful people, beautiful souls, clean heart, angel.",
  "Find peace, life is like a water fall, you've gotta flow.",
  "Let's see what Chef Dee got that they don't want us to eat.",
  "LION!",
  "Surround yourself with angels.",
  "Major key, don't fall for the trap, stay focused. It's the ones closest to you that want to see you fail.",
  "The key to more success is to get a massage once a week, very important, major key, cloth talk.",
  "The key to success is to keep your head above the water, never give up.",
  "It's important to use cocoa butter. It's the key to more success, why not live smooth? Why live rough?",
  "They key is to have every key, the key to open every door.",
  "Learning is cool, but knowing is better, and I know the key to success.",
  "You do know, you do know that they don't want you to have lunch. I'm keeping it real with you, so what you going do is have lunch.",
  "Stay focused.",
  "I told you all this before, when you have a swimming pool, do not use chlorine, use salt water, the healing, salt water is the healing.",
  "You should never complain, complaining is a weak emotion, you got life, we breathing, we blessed.",
  "The key is to enjoy life, because they don't want you to enjoy life. I promise you, they don't want you to jetski, they don't want you to smile.",
  "The other day the grass was brown, now it's green because I ain't give up. Never surrender.",
  "The key is to drink coconut, fresh coconut, trust me.",
  "The weather is amazing, walk with me through the pathway of more success. Take this journey with me, Lion!",
  "You see the hedges, how I got it shaped up? It's important to shape up your hedges, it's like getting a haircut, stay fresh.",
  "Let me be clear, you have to make it through the jungle to make it to paradise, that's the key, Lion!",
  "Always remember in the jungle there's a lot of they in there, after you overcome they, you will make it to paradise.",
  "I'm giving you cloth talk, cloth. Special cloth alert, cut from a special cloth.",
  "Look at the sunset, life is amazing, life is beautiful, life is what you make it.",
  "The first of the month is coming, we have to get money, we have no choice. It cost money to eat and they don't want you to eat."
];

var greetings = ["hey", "hello", "sup", "what's up", "greetings", "khaled", "dj khaled"];
var thanks = ["thanks", "thank you", "thanks so much", "great", "appreciate it", "thanks khaled", "thanks dj", "you're the fucking greatest"];
var help = ["help", "wtf is this", "who are you", "what is this", "i'm calling the cops", "gtfo"];

login({email: "FACEBOOK_EMAIL", password: "FACEBOOK_PASSWORD"}, function callback (err, api) { //replace with your facebook email address and password
    if(err) return console.error(err);

    var keysToSuccess = [];
    for(var i=0; i<keys.length; i++)
    {
       if(keys[i].indexOf("key") > -1) {
          keysToSuccess.push(keys[i]);
       }
    }

    api.listen(function callback(err, message) {
        if(err) return console.log(err);

        console.log('got message - '+message.body);

        var response = "";
        if(inArray(message.body.toLowerCase(),["key", "keys", "🔑"])) {
          response = keysToSuccess[Math.floor(Math.random()*keysToSuccess.length)];
        }
        else if (inArray(message.body.toLowerCase(), greetings)) {
          response = "Bless up 🙏 This is DJ Khaled and I'm here to guide you on the path to more success";
        }
        else if (inArray(message.body.toLowerCase(), help)) {
          response = "I'm a digital embodiment of DJ Khaled and I'm here to give you the major 🔑s to success";
        }
        else if (inArray(message.body.toLowerCase(), thanks)) {
          response = "You're welcome! Bless up 🙏";
        }
        else {
          response = keys[Math.floor(Math.random()*keys.length)];
        }

        var yourID = message.participantIDs[0]; 
        var msg = {body: response};
        api.sendMessage(msg, yourID);
    }
)});

function inArray(message, keywords) {
    var length = keywords.length;
    for(var i = 0; i < length; i++) {
        if(message.search(keywords[i]) > -1)
            return true;
    }
    return false;
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
