const fs = require('fs')
var date = new Date();
var currentYear = date.getFullYear().toString;
const results = fs.readFileSync('./results.txt').toString()
var result_array = results.split("<title>").slice(2, )
for(i = 0; i < result_array.length; i++){
        result_array[i] = result_array[i].replace(/&nbsp;/g, " ");
        result_array[i] = result_array[i].replace(/<em>/g, " ");
}


var title_array = [];

//TITLE 

for (i = 0; i < result_array.length; i++){
        title_array.push(result_array[i].substring(0, result_array[i].indexOf("</title>")));
}

//DATE AND TIME

start_date = [];
end_date = [];
start_time = [];
end_time = [];
var index, start_string, end_string;
for(i = 0; i < result_array.length; i++){
        index = result_array[i];
        start_string = index.substring(index.indexOf('<start xmlns="events">') + 22, index.indexOf("</start>"))
        end_string = index.substring(index.indexOf('<end xmlns="events">') + 20, index.indexOf("</end>"))

        start_date.push(start_string.substring(0, start_string.indexOf(":") - 3))
        end_date.push(end_string.substring(0, end_string.indexOf(":") - 3))



        start_time.push(start_string.substring(start_string.indexOf(":") - 2))
        end_time.push(end_string.substring(end_string.indexOf(":") - 2))
}

est_startdate_array = []
est_starttime_array = []
est_enddate_array = []
est_endtime_array = []
var est_start_date, est_end_date = "";
var est_start_time, est_end_time = "";
var start_year, end_year, start_month, end_month, start_day, end_day, last_space_rem, last_endspace_rem, two_space_rem, two_endspace_rem, est_start_object, est_end_object = "";
var months = {Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"};
for(f = 0; f < result_array.length; f++){
  // year 
   start_year = start_date[f].substring(start_date[f].lastIndexOf(" ") + 1)  
   end_year = end_date[f].substring(end_date[f].lastIndexOf(" ") + 1)

   last_space_rem = start_date[f].substring(0, start_date[f].lastIndexOf(" "))   
   last_endspace_rem = end_date[f].substring(0, end_date[f].lastIndexOf(" "))   

   // month 
   start_month = last_space_rem.substring(last_space_rem.lastIndexOf(" "));
   start_month = months[start_month.replace(" ", "")];

   end_month = last_endspace_rem.substring(last_endspace_rem.lastIndexOf(" "));
   end_month = months[end_month.replace(" ", "")];

   two_space_rem = last_space_rem.substring(0, last_space_rem.lastIndexOf(" "))  
   two_endspace_rem = last_endspace_rem.substring(0, last_endspace_rem.lastIndexOf(" "))    

   // day
   start_day = two_space_rem.substring(two_space_rem.lastIndexOf(" "));
   end_day = two_endspace_rem.substring(two_endspace_rem.lastIndexOf(" "));

   const gmtStartDateString = start_year + "-" + start_month + "-" + start_day.replace(" ", "") + "T" + start_time[f].replace(" ", "").substring(0, start_time[f].replace(" ", "").length - 3) + "Z";
   const gmtEndDateString = end_year + "-" + end_month + "-" + end_day.replace(" ", "") + "T" + end_time[f].replace(" ", "").substring(0, end_time[f].replace(" ", "").length - 3) + "Z";
   
   const gmtStartDate = new Date(gmtStartDateString);
   const gmtEndDate = new Date(gmtEndDateString);

   est_start_object = gmtStartDate.toLocaleString().toString();
   est_end_object = gmtEndDate.toLocaleString().toString();

   est_start_date = est_start_object.substring(0, est_start_object.indexOf(","));
   est_end_date = est_end_object.substring(0, est_end_object.indexOf(","));

   est_start_time = est_start_object.substring(est_start_object.indexOf(" ") + 1, );
   est_end_time = est_end_object.substring(est_end_object.indexOf(" ") + 1, )
   
   est_startdate_array.push(est_start_date);
   est_enddate_array.push(est_end_date);

   est_starttime_array.push(est_start_time);
   est_endtime_array.push(est_end_time);
   
} 


//LOCATION

var loc_array = [];
for(var i = 0; i < result_array.length; i++){
        var placeholderString = '<location xmlns="events">'
        var startIndex = result_array[i].indexOf('<location xmlns="events">') + placeholderString.length;
        var endIndex = result_array[i].indexOf("</location>");
        loc_array.push(result_array[i].substring(startIndex, endIndex)); 
}

//DESCRIPTION

var desc_array = [];
for(var j = 0; j < result_array.length; j++) {
        var placeHolderString = 'class="p-description description"><p>'
        var startIndex = result_array[j].indexOf(placeHolderString) + placeHolderString.length;
        var temporaryResult = result_array[j].substring(startIndex);
        var realResult = temporaryResult.substring(0, temporaryResult.indexOf("<"));
        desc_array.push(realResult);
} 

//LINK

var link_array = [];
for (var k = 0; k < result_array.length; k++){
        var placeHolderString = "<link>";
        var startIndex = result_array[k].indexOf(placeHolderString) + placeHolderString.length;
        var endIndex = result_array[k].indexOf("</link>")
        link_array.push(result_array[k].substring(startIndex, endIndex));
}

final_export_array = [];

for (var row = 0; row < result_array.length; row++){
        final_export_array.push([title_array[row], est_startdate_array[row], est_enddate_array[row], est_starttime_array[row], est_endtime_array[row], loc_array[row], desc_array[row], link_array[row]])
}

console.log(final_export_array[34])
