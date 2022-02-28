const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const axios = require('axios');
var data;
var renderString; //for storing and building DOM elements step by step

async function fetchAPI(){

    await axios.get('http://hp-api.herokuapp.com/api/characters')
    .then(function(response){
        data = response.data;
    }).catch(function(error){
        console.log(error);
    })

}

    app.get('/',async function(req,res) {//defining the basic route
        try{
            const tmp = await fetchAPI();
            renderString = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">`;
            var page = req.query.page;
            if(!page){
                page = 1;
            }
            const paginationCutoff = 8;
            const first = (page-1)*paginationCutoff;
            const last = page*paginationCutoff;
            const result = data.slice(first, last);
            renderString += `<div><h1 style = "margin-left : 25%;color : white">`;
            renderString += "HARRY POTTER CHARACETRS";
            renderString += `</h1></div><div class="container">`;
            renderString += `<div class="row">`;
            for(var i=0;i<result.length;i++){
                
                renderString +=`<div class="col-xs-12">`;// using bootstrap columns to structure the display


                renderString += "<p>";
                if(result[i].image == ''){
                    renderString +=  `<img style = "border-style: solid; border-color : white;border-width: 2px;" src =https://s32287.pcdn.co/wp-content/uploads/2021/04/home_chaos.jpg height = 250px width = 250px"` + "></img>";

                }else{
                    renderString +=  `<img style = "border-style: solid; border-color : white;border-width: 2px;" src =` + result[i].image + " height = 250px width = 250px" + "></img>";

                } 
                renderString += "</p>";
                
                renderString += `<div style = "background-color:black; width : 250px; border-style: solid; border-color : white; border-width: 2px;">`;

                renderString += `<li style = "color : white">`;
                renderString += `<p style = "color: white;">`;
                renderString += "Name: " + result[i].name;
                renderString += "</p>";
            
                renderString += `<li style = "color : grey">`;
                renderString += `<p style = "color: grey">`;
                renderString += "Species: " + result[i].species;
                renderString += "</p>";

                renderString += `<li style = "color : white">`;
                renderString += `<p style = "color: white">`;
                renderString += "Gender: " + result[i].gender;
                renderString += "</p>";

                renderString += `<li style = "color : grey">`;
                renderString += `<p style = "color: grey">`;
                renderString += "House: " + result[i].house;
                renderString += "</p>";

                renderString += `<li style = "color : white">`;
                renderString += `<p style = "color: white">`;
                renderString += "Wizard: " + result[i].wizard;
                renderString += "</p>";

                renderString += `<li style = "color : grey">`;
                renderString += `<p style = "color: grey">`;
                renderString += "Patronus: " + result[i].patronus;
                renderString += "</p>";

                renderString += `<li style = "color : white">`;
                renderString += `<p style = "color: white">`;
                renderString += "Hogwarts-Student: " + result[i].hogwartsStudent;
                renderString += "</p>";

                renderString += `<li style = "color : grey">`;
                renderString += `<p style = "color: grey">`;
                renderString += "Actor: " + result[i].actor;
                renderString += "</p>";

                renderString += `<li style = "color : white">`;
                renderString += `<p style = "color: white">`;
                renderString += "Alive: " + result[i].alive;
                renderString += "</p>";



                renderString += "</div></div>";
            }
            renderString += "</div></div>";



            var bootstrap = `<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
                             <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
                             <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>`;

            var dataToDisplay = data.length/paginationCutoff;// calculating how much data to show
            var finalPage = "";
            finalPage += `<div style = "margin-left:9% ;color: yellow;">`;
            for(var count=0;count<dataToDisplay;count++){
                finalPage += `<li style="display:inline;"><a style= "color: yellow" href=?page=` + (count+1) + ">  " + (count+1) + " " +  "</a></li>";// appending the calculated page count one by one to a list
            }
            finalPage += `</div>`;
            res.send(`<body style="background-image: url('https://wallpaperforu.com/wp-content/uploads/2021/04/Wallpaper-Harry-Potter-Pack-1080p-Hd-Architecture-Built391680x1050.jpg')"><p>` + renderString + "</p>" + bootstrap +  finalPage+"</body>");
            constructPage(renderString,bootstrap,finalPage);
        }
        catch(error){
            console.log("error", error)
        }

    });


    function constructPage(renderString, bootstrap, finalPage){
        var statuscode = 500;

            if(renderString && bootstrap && finalPage){
                statuscode = 200;
                console.log("status", statuscode);
            }

        else{
            statuscode = 503;
            console.log("status", statuscode);

        }
        return statuscode;
    }

    app.listen(port, () => {
    })
    
    
module.exports = constructPage;