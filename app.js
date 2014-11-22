var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var marked = require('marked');
var moment = require('moment');
fs = require('fs');

//ENABLE CORS
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/', function(req, res){
    fs.readFile('README.md', {encoding: 'utf-8'}, function(err,data){
        if (!err){
            res.send(marked(data));
        }else{
            console.log(err);
        }

    });
    //res.sendfile('README.md');
    //res.send(fs.readFile('README.md'));
    //marked();
})
app.get('/api/menu', function(req, res){
	
	url = 'https://uwaterloo.ca/food-services/menu';

	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);

			var company;
            //var link;
			var json = [];
            
			$('tr').each(function(i,elem){
                var data = $(this);
                
                var dates = [];
                var menu = {items:[]};
                
                //console.log(data.children);
                if(i == 0){
                    //Listings of dates
                    var th = data.children('th');
                    //console.log(th.length);
                    for(var i=1;i<6;i++){
                        dates.push(th[i].children[0].data);
                    }
                    console.log(dates);
                    
                }
                if(i > 0){
                    //Listings of dates
                    var children = data.children();
                    var menu_row = {items:[]};
                    var name = data.find('th').find('img').attr('alt');
                    //console.log(children);
                    var td = data.find('td');
                    //console.log(td.length);
                    for(var i=1;i<6;i++){
                        var row = {date:dates[i-1],
                                   menu:td.slice(i).ep(0).html()};
                        menu_row.items.push(row);
                        console.log(row);
                        console.log(td.html());
                        
                    }
                    menu.items.push({caf_name:name,data:menu_row});
                    //console.log(menu);
                }
                console.log(menu);
                json.push(menu);
	        });
		}
        // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
        res.send(json);
	})
});

app.get('/api/menu/product/:id', function(req, res){
	var id = req.param("id");
	
	url ='https://uwaterloo.ca/food-services/menu/product/'+id;

	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
			

			var name = $('#content h1').text().slice(21);
			var size = $('.content dd').slice(0).eq(0).text();
			var type = $('.content dd').slice(1).eq(0).text();
			var ingredients = $('.content dd').slice(2).eq(0).text();
			var facts = $('.uw_food_services-nutrition').html();
			
            //var link;
			var json = {name : "", 
						size : "", 
						type:"",
						ingredients:"", 
						facts_html:""};
						
			json.name=name;
			json.size=size;
			json.type=type;
			json.ingredients=ingredients;
			json.facts_html=facts;
            
		}

        // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
        res.send(json);
	})
});


app.get('/api/event/:id', function(req, res){
    
    var id = req.param("id");
    console.log("Scraping: " + url);
    
    url_part = 'http://www.ceca.uwaterloo.ca/students/sessions_details.php?id=';
    url = url_part + id;

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            var company,datetime,location,descrption,rsvplink,programs;
            //var link;
            var json = {company: "",date: "",time: "",location: "",descrption: "",rsvplink: "",programs: "",website: ""};

            $('#tableform').filter(function(){
                var data = $(this);
                //company = data.text;//data.children().first().text();            
                //link = data.attr('href');//children().last().children().text();
                //thisJson.company = company;
                //console.log(data.children().length);

                json.company = data.children().first().children().eq(1).text();
                var date = data.children().eq(1).children().eq(1).text();
                json.date = date;
                json.datetime = moment(date, "MMM D, YYYY", "en"); //TODO add time as well
                json.time = data.children().eq(2).children().eq(1).text();

                json.location = data.children().eq(3).children().eq(1).text();

                json.website = data.children().eq(4).children().eq(1).text();
                json.programs = data.children().eq(5).children().eq(0).text();

                json.description = data.children().eq(6).children().eq(0).text();
                json.rsvplink = "https://info.uwaterloo.ca/infocecs/students/rsvp/index.php?id="+id+"&mode=on";

            })
        }
        res.send(json);
    });
});

app.listen(process.env.PORT||8085);
console.log('Magic happens on port'+ process.env.port);
exports = module.exports = app;
