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

const keywords = {

northwestern: "40.4573551, -86.92881012",
cherry:"40.4392128, -86.92959624",
river: "40.41250041, -86.91311203",
farms: "40.4177754, -86.91027562",
asian: "40.4291352, -86.9176326",
seed: "40.2613167, -86.8886507",
biological: "40.42204362, -86.9165606",
brotection: "40.42387363, -86.91835873",
agronomy_center_for: "40.4700292, -86.9917576",
disease: "40.4181234, -86.915995",
agricultural_innovation: "40.41644426, -86.91955935",
discovery_park: "40.423625, -86.9246719",
aerospace: "40.41650316, -86.92853217",
addEventListenerquaculture: "40.5045035, -87.0137834",
agricultural_Administration: "40.42353251, -86.91432221",
holding: "40.41991997, -86.91306857",
information: "40.42362359, -86.91088462",
aquatic: "40.4281346, -86.923272",
armory: "40.42802158, -86.91611017",
armstrong: "40.43140742, -86.9150833",
administrative: "40.42515087, -86.94054451",
airport_service: "40.4157414, -86.93447183",
airport_storage: "40.4157414, -86.93281218",
animal_sciences_research: "40.497935, -87.0149048",
ralph:"40.4272578, -86.9100543",
betye:"40.4272578, -86.9100543",
bailey: "40.4272578, -86.9100543",
baseball_clubhouse: "40.4237054, -86.9211946",
baseball_press: "40.4237054, -86.9211946",
black: "40.42762148, -86.91945039",
biochemistry: "40.42300787, -86.91637687",
biochemistry: "40.4693473, -86.9926858",
//beck: "40.42744997, -86.91367471",   four letter default word is beck itself
maileen: "40.42868081, -86.91186796",
bechtel: "40.4274428, -86.9188882",
bioscience: "40.4229204, -86.9233974",
byproduct__east: "40.41818946, -86.93861792",
byproduct__north: "40.4175803, -86.9388378",
byproduct__west: "40.417312, -86.9388781",
bowen:"40.41063955, -86.91750763",
brunner_equine: "40.41886043, -86.91214244",
brittany: "40.43425793, -86.91654952",
farm_animal: "40.418354, -86.91109101",
nano: "40.4227305, -86.9245922",
beering: "40.4255747, -86.9162108",
small_animal: "40.4194789, -86.91328315",
brown_herbert_c: "40.4265812, -86.9118781",
television: "40.43718216, -86.91987547",
chaffee: "40.41773203, -86.93866227",
chaney: "40.4286339, -86.9152929",
"1950": "40.4263482, -86.9150559",
composites: "40.41688498, -86.93004192",
cary:"40.43270463, -86.91702376",
corec: "40.4282417, -86.9223556",
france: "40.4282417, -86.9223556",
cordova: "40.4282417, -86.9223556",
russell: "40.42134165, -86.91881076",
cooling: "40.41583979, -86.91299126",
daniel:  "40.44246281, -86.92977646",
sandy: "40.4219344, -86.9107036",
hall_for_discovery: "40.4212122, -86.9224542",
dement: "40.4277063, -86.9239714",
doyle: "40.4187087, -86.9155104",
//drug: "40.42114516, -86.91873747", the 4 letter code for this one is itself drug
data: "40.42828871, -86.91431844",
dudley: "40.42735421, -86.91150027",
duhme: "40.42561236, -86.92079623",
pete: "40.44013254, -86.92705118",
university_early_care: "40.4248554, -86.9330669",
entomology: "40.4229494, -86.914738",
environmental_field: "40.42966923, -86.94850161",
equine_health_science_annex: "40.41775877, -86.91413491",
equine_health_science_building: "40.41900276, -86.9162573",
elliot: "40.42804442, -86.91498045",
earhart: "40.42591448, -86.92517301",
flex_lab: "40.42176191, -86.92353149",
flight: "40.4164489, -86.9302125",
ford_dining: "40.43225687, -86.91949829",
forestry_building: "40.42294253, -86.91397655",
forest_products_building: "40.42313487, -86.91515122",
//forest_products_building: "40.42313487, -86.91515122",   same as above
forney: "40.4294512, -86.9139597",
central: "40.42504874, -86.92448558",
east_residence: "40.4248867, -86.9237558",
west_residence: "40.4249529, -86.9245559",
fowler: "40.4308024, -86.92069636",
golf_course: "40.4384231, -86.9287622",
maintenance_facility: "40.4155474, -86.9192085",
maintenance_greenhouse: "40.4155474, -86.9192085",
pesticide: "40.4155474, -86.9192085",
grissom: "40.4264235, -86.9107879",
grounds_service: "40.4228515, -86.919911",
gravel_pit: "40.4380357, -86.9287378",
golf_storage: "40.4268206, -86.9163078",
marc_and: "40.4271005, -86.9188353",
hampton: "40.4301413, -86.914835",
hansen: "40.4222608, -86.9169819",
harrison_hall: "40.42506742, -86.92661361",
hawkins: "40.4228572, -86.911385",
honors: "40.42618219, -86.91933228",
heavilon: "40.41546725, -86.93297655",
herrick_acoustic:"40.41659421, -86.9334553",
heavy: "40.41659421, -86.9334553",
hangar: "40.41659421, -86.9334553",
horticulture_green: "40.42723427, -86.93553084",
hicks: "40.42456554, -86.91260277",
hillenbrand: "40.4269487, -86.9264486",
herrick_lab: "40.4219851, -86.9198315",
hilltop: "40.42468809, -86.91255982",
hazardous: "40.4159816, -86.9112058",
hanley: "40.42469912, -86.92323338",
hockmeyer: "40.4210465, -86.9211649",
horticulture_building: "40.42184558, -86.91437679",
hovde: "40.4282112, -86.9143951",
horticulture_park: "40.42720976, -86.93546647",
trudy: "40.42861768, -86.92432203",
soybean: "40.4701287, -86.9944721",
johnson: "40.4293816, -86.9154928",
kozuch: "40.43665595, -86.91570954",
//knoy: "40.4278046, -86.9111405", knoy 4 letter id already
krannert: "40.4237214, -86.9108136",
krach: "40.4274852, -86.9214651",
lambert: "40.43244334, -86.91586988",
latino: "40.43065448, -86.91879458",
lilly: "40.423476, -86.9180072",
laboratory_materials: "40.4154023, -86.911108",
lakes: "40.42117563, -86.91845979",
life_science_animal: "40.42365563, -86.91805011",
life_science_plant: "40.4231921, -86.9187854",
lawson: "40.4275869, -86.9169208",
lyles: "40.4206351, -86.9163383",
// lynn: "40.41967828, -86.91489318", lynn 4 letter id already
mackey: "40.4334724, -86.91606898",
//mann: "40.42316229, -86.92261169", mann 4 letter id already
//math: "40.42641012, -86.91579371", 4 letter id already
//mcut: "40.42479196, -86.92813671", 4 letter id already
mech: "40.42829584, -86.91285408",
martin: "40.4222104, -86.9210931",
materials_management: "40.4152242, -86.9178616",
mollenkopf: "40.4355227, -86.91677",
meredith: "40.42638434, -86.92328536",
morgan: "40.42376903, -86.92287632",
mri: "40.42236502, -86.91545294",
marriott: "40.4245784, -86.9169739",
electrical: "40.42936071, -86.91262028",
matthews: "40.424712, -86.9163507",
native: "40.42923174, -86.91695098",
niswonger_aviation: "40.416435, -86.9294357",
nelson: "40.42194336, -86.91577222",
northwest_athletic: "40.4377928, -86.93938472",
northwest_chiller: "40.41903223, -86.91304035",
ollman: "40.4400973, -86.92708388",
// owen: "40.50760213, -86.88271568", 4 letter id already there
thomas: "40.410878, -86.9158654",
// pao: "40.4225322, -86.9129705", id already there
// pfen: "40.42378311, -86.91560625", id already there
physical: "40.4141124, -86.916597",
physics: "40.43017307200028, -86.91311039",
patty: "40.4570527, -86.9270649",
frieda: "40.428475, -86.919535",
winifred: "40.4278412, -86.9201552",
purdue_memorial_union: "40.4247235, -86.9105532",
potter: "40.4275231, -86.9123613",
peirce: "40.42659897, -86.91500739",
//prid: "40.4237054, -86.9211946", id already there
//prix: "40.43795802, -86.94388072", id already there
printing: "40.42528398, -86.91162781",
//psyc: "40.42708427, -86.91496801", id already there
technology_center:  "40.46515491, -86.92753012",
health: "40.4305152, -86.9163512",
village: "40.420234, -86.9239214",
railway: "40.4279136, -86.9127327",
ross: "40.434359, -86.9184385",
//rawl: "40.4237324, -86.9098202", id already there
heine: "40.4297676, -86.9159009",
softball: "40.4237054, -86.9211946",
stanley: "40.4264038, -86.9143489",
schleman: "40.42901187, -86.91475232",
schowe: "40.43938063, -86.9183163",
// schw: "40.43671757, -86.93757686", id already there
slayter: "40.4319321, -86.9225389",
shealy: "40.42627671, -86.92049064",
shreve: "40.42710211, -86.92468783",
holleman: "40.41664523, -86.93496151",
salt: "40.42814084, -86.85894723",
smalley: "40.4270243, -86.9231898",
smith: "40.42360838, -86.9168562",
//socc: "40.4237054, -86.9211946", id already there
erosion: "40.42147378, -86.91975356",
//spur: "40.43926459, -86.9273164", id already there
//stew: "40.4253198, -86.9132974", id already there
//ston: "40.4248736, -86.9132974", id already there
//tark: "40.4309343, -86.920727", id already there
telecommunications: "40.42610548, -86.91699298",
terminal: "40.41628704, -86.93098831",
oliver: "40.42233377, -86.92226571",
transmitter: "40.4276986, -86.91542124",
// turf: "40.4285034, -86.9242362", id already there
transportation: "40.4134461, -86.9145728",
university_church: "40.4262957, -86.91031006",
university_hall: "40.42546953, -86.9152471",
plant_office_building: "40.417169, -86.9117344",
office_facility: "40.4179037, -86.9124391",
plant_storage: "40.4172128, -86.9133787",
isolation_buildings_I: "40.41952698, -86.91603279",
isolation_buildings_II:"40.41904371, -86.91595513",
veterinary_center: "40.42634277, -86.9209749",
veterinary_lab:"40.41865639, -86.91516334",
voinoff: "40.418766, -86.9152358",
pathobiology: "40.4394843, -86.9268415",
pathology: "40.4198958, -86.9160942",
vision_tech: "40.46389495, -86.93311778",
wilmeth: "40.4273666, -86.9131699",
wiley_dining: "40.430425, -86.9124512",
women_golf: "40.428521, -86.9208235",
wiley_residence: "40.439346, -86.9246323",
wright: "40.43240974, -87.03868753",
whistler: "40.42324511, -86.91570563",
wetherill: "40.4264569, -86.9130638",
young_hall: "40.4228144, -86.9106722",
zucrow: "40.41590797, -86.94080614",
"2550": "40.4573551, -86.92881012",
  "844s": "40.41250041, -86.91311203",
  "8ssr": "40.4177754, -86.91027562",
  "9ssr": "40.4177754, -86.91027562",
  "aacc": "40.4291352, -86.9176326",
  "aapf": "40.2613167, -86.8886507",
  "abe": "40.42204362, -86.9165606",
  "ac47": "40.42387363, -86.91835873",
  "acre": "40.4700292, -86.9917576",
  "addl": "40.4181234, -86.915995",
  "adm": "40.41644426, -86.91955935",
  "adp": "40.423625, -86.9246719",
  "aero": "40.41650316, -86.92853217",
  "af0": "40.5045035, -87.0137834",
  "agad": "40.42353251, -86.91432221",
  "ahf": "40.41991997, -86.91306857",
  "aidc": "40.42362359, -86.91088462",
  "aqua": "40.4281346, -86.923272",
  "ar": "40.42802158, -86.91611017",
  "arms": "40.43140742, -86.9150833",
  "asa": "40.42515087, -86.94054451",
  "asb": "40.4157414, -86.93447183",
  "asb1": "40.4157414, -86.93281218",
  "asrec": "40.497935, -87.0149048",
  "baly": "40.4272578, -86.9100543",
  "bbch": "40.4237054, -86.9211946",
  "bbpb": "40.4237054, -86.9211946",
  "bcc": "40.42762148, -86.91945039",
  "bchm": "40.42300787, -86.91637687",
  "beck": "40.4693473, -86.9926858",
  "bell": "40.42744997, -86.91367471",
  "bhee": "40.42868081, -86.91186796",
  "bidc": "40.4274428, -86.9188882",
  "bind": "40.4229204, -86.9233974",
  "bmse": "40.41818946, -86.93861792",
  "bmsn": "40.4175803, -86.9388378",
  "bmsw": "40.417312, -86.9388781",
  "bown": "40.41063955, -86.91750763",
  "breq": "40.41886043, -86.91214244",
  "bres": "40.43425793, -86.91654952",
  "brfm": "40.418354, -86.91109101",
  "brk": "40.4227305, -86.9245922",
  "brng": "40.4255747, -86.9162108",
  "brun": "40.4194789, -86.91328315",
  "brwn": "40.4265812, -86.9118781",
  "btv": "40.43718216, -86.91987547",
  "chaf": "40.41773203, -86.93866227",
  "chas": "40.4286339, -86.9152929",
  "cl50": "40.4263482, -86.9150559",
  "comp": "40.41688498, -86.93004192",
  "cqe": "40.43270463, -86.91702376",
  "cqne": "40.43295142, -86.91759142",
  "cqnw": "40.4329094, -86.9183639",
  "cqs": "40.43199496, -86.91881451",
  "cqw": "40.43272593, -86.91888728",
  "crec": "40.4282417, -86.9223556",
  "crtn": "40.42134165, -86.91881076",
  "cteb": "40.41583979, -86.91299126",
  "danl": "40.44246281, -86.92977646",
  "dauc": "40.4219344, -86.9107036",
  "dlr": "40.4212122, -86.9224542",
  "dmnt": "40.4277063, -86.9239714",
  "doyl": "40.4187087, -86.9155104",
  "drug": "40.42114516, -86.91873747",
  "dscb": "40.42828871, -86.91431844",
  "dudl": "40.42735421, -86.91150027",
  "duhm": "40.42561236, -86.92079623",
  "dye": "40.44013254, -86.92705118",
  "ecec": "40.4248554, -86.9330669",
  "eel": "40.4229494, -86.914738",
  "efob": "40.42966923, -86.94850161",
  "ehsa": "40.41775877, -86.91413491",
  "ehsb": "40.41900276, -86.9162573",
  "ellt": "40.42804442, -86.91498045",
  "erht": "40.42591448, -86.92517301",
  "flex": "40.42176191, -86.92353149",
  "fopn": "40.4164489, -86.9302125",
  "ford": "40.43225687, -86.91949829",
  "fors": "40.42294253, -86.91397655",
  "fprd": "40.42313487, -86.91515122",
  "fprd": "40.42313487, -86.91515122",
  "frny": "40.4294512, -86.9139597",
  "fstc": "40.42504874, -86.92448558",
  "fste": "40.4248867, -86.9237558",
  "fstw": "40.4249529, -86.9245559",
  "fwlr": "40.4308024, -86.92069636",
  "fwlr": "40.4308024, -86.92069636",
  "gcmb": "40.4384231, -86.9287622",
  "gmf": "40.4155474, -86.9192085",
  "gmgf": "40.4155474, -86.9192085",
  "gmps": "40.4155474, -86.9192085",
  "gris": "40.4264235, -86.9107879",
  "grs": "40.4228515, -86.919911",
  "grvl": "40.41622223, -86.9288828",
  "gsmb": "40.4380357, -86.9287378",
  "haas": "40.4268206, -86.9163078",
  "hagl": "40.4271005, -86.9188353",
  "hamp": "40.4301413, -86.914835",
  "hans": "40.4222608, -86.9169819",
  "harr": "40.42506742, -86.92661361",
  "hawk": "40.4228572, -86.911385",
  "hcrn": "40.42618219, -86.91933228",
  "heav": "40.4262221, -86.9118506",
  "herl": "40.41546725, -86.93297655",
  "hesb": "40.41205997, -86.91466939",
  "hgr": "40.41659421, -86.9334553",
  "hgrh": "40.42723427, -86.93553084",
  "hiks": "40.42456554, -86.91260277",
  "hill": "40.4269487, -86.9264486",
  "hlab": "40.4219851, -86.9198315",
  "hltp": "40.42468809, -86.91255982",
  "hmmt": "40.4159816, -86.9112058",
  "hnly": "40.42469912, -86.92323338",
  "hnly": "40.42469912, -86.92323338",
  "hock": "40.4210465, -86.9211649",
  "hort": "40.42184558, -86.91437679",
  "hovd": "40.4282112, -86.9143951",
  "hrtp": "40.42720976, -86.93546647",
  "hull": "40.42861768, -86.92432203",
  "icsc": "40.4701287, -86.9944721",
  "jnsn": "40.4293816, -86.9154928",
  "kctr": "40.4234726, -86.9114978",
  "kfpc": "40.43665595, -86.91570954",
  "knoy": "40.4278046, -86.9111405",
  "kran": "40.4228242, -86.9106719",
  "kran": "40.4237214, -86.9108136",
  "krch": "40.4274852, -86.9214651",
  "lamb": "40.43244334, -86.91586988",
  "lamb": "40.43253271, -86.91597976",
  "lccp": "40.43065448, -86.91879458",
  "lg": "40.43244334, -86.91586988",
  "lily": "40.423476, -86.9180072",
  "lins": "40.41644789, -86.93101574",
  "lmbs": "40.427197, -86.9114995",
  "lmsa": "40.4154023, -86.911108",
  "lmsb": "40.4154023, -86.911108",
  "lmst": "40.4159275, -86.9110395",
  "lolc": "40.42117563, -86.91845979",
  "lsa": "40.42365563, -86.91805011",
  "lsps": "40.4231921, -86.9187854",
  "lwsn": "40.4275869, -86.9169208",
  "lyle": "40.4206351, -86.9163383",
  "lynn": "40.41967828, -86.91489318",
  "mack": "40.4334724, -86.91606898",
  "mann": "40.42316229, -86.92261169",
  "math": "40.42641012, -86.91579371",
  "mcut": "40.42479196, -86.92813671",
  "me": "40.42829584, -86.91285408",
  "mjis": "40.4222104, -86.9210931",
  "mmdc": "40.4152242, -86.9178616",
  "mms1": "40.4148151, -86.9189377",
  "mms2": "40.4148151, -86.9189377",
  "mms3": "40.4148151, -86.9189377",
  "moll": "40.4355227, -86.91677",
  "mrdh": "40.42638434, -86.92328536",
  "mrds": "40.42573589, -86.92343249",
  "mrgn": "40.42376903, -86.92287632",
  "mri1": "40.42236502, -86.91545294",
  "mrrt": "40.4245784, -86.9169739",
  "msee": "40.42936071, -86.91262028",
  "mthw": "40.424712, -86.9163507",
  "nacc": "40.42923174, -86.91695098",
  "nisw": "40.416435, -86.9294357",
  "nlsn": "40.42194336, -86.91577222",
  "nwac": "40.4377928, -86.93938472",
  "nwcp": "40.41903223, -86.91304035",
  "olmn": "40.4400973, -86.92708388",
  "owen": "40.50760213, -86.88271568",
  "page": "40.410878, -86.9158654",
  "pao": "40.4225322, -86.9129705",
  "pfen": "40.42378311, -86.91560625",
  "pfsb": "40.4141124, -86.916597",
  "pgg": "40.42533851, -86.90981896",
  "pggh": "40.42363564, -86.91089878",
  "pgh": "40.42165041, -86.91755072",
  "pgmd": "40.4251064, -86.9289502",
  "pgnw": "40.42970044, -86.91102395",
  "pgsc": "40.4298628, -86.9119412",
  "pgu": "40.42680048, -86.91701887",
  "pgw": "40.42288257, -86.91022391",
  "phys": "40.43017307200028, -86.91311039",
  "pjec": "40.4570527, -86.9270649",
  "pkrf": "40.428475, -86.919535",
  "pkrw": "40.4278412, -86.9201552",
  "pmu": "40.4247235, -86.9105532",
  "pmuc": "40.4249442, -86.9106786",
  "potr": "40.4275231, -86.9123613",
  "prce": "40.42659897, -86.91500739",
  "prid": "40.4237054, -86.9211946",
  "prix": "40.43795802, -86.94388072",
  "prix": "40.43795802, -86.94388072",
  "prsv": "40.42528398, -86.91162781",
  "psyc": "40.42708427, -86.91496801",
  "ptc": "40.46515491, -86.92753012",
  "push": "40.4305152, -86.9163512",
  "pvab": "40.420234, -86.9239214",
  "rail": "40.4279136, -86.9127327",
  "ralr": "40.434359, -86.9184385",
  "rawl": "40.4237324, -86.9098202",
  "rhph": "40.4297676, -86.9159009",
  "sbch": "40.4237054, -86.9211946",
  "sbpb": "40.4237054, -86.9211946",
  "sc": "40.4264038, -86.9143489",
  "schm": "40.42901187, -86.91475232",
  "scho": "40.43938063, -86.9183163",
  "schw": "40.43671757, -86.93757686",
  "scpa": "40.4319321, -86.9225389",
  "shly": "40.42627671, -86.92049064",
  "shrv": "40.42710211, -86.92468783",
  "siml": "40.41664523, -86.93496151",
  "slt": "40.42814084, -86.85894723",
  "smly": "40.4270243, -86.9231898",
  "smth": "40.42360838, -86.9168562",
  "socc": "40.4237054, -86.9211946",
  "soil": "40.42147378, -86.91975356",
  "spur": "40.43926459, -86.9273164",
  "stdm": "40.434359, -86.9184385",
  "stew": "40.4253198, -86.9132974",
  "stew": "40.4253198, -86.9132974",
  "stew": "40.4253198, -86.9132974",
  "stew": "40.4253198, -86.9132974",
  "stew": "40.4248736, -86.9132974",
  "ston": "40.4248736, -86.9132974",
  "tark": "40.4309343, -86.920727",
  "tel": "40.42610548, -86.91699298",
  "term": "40.41628704, -86.93098831",
  "tery": "40.42233377, -86.92226571",
  "tram": "40.4276986, -86.91542124",
  "trec": "40.4285034, -86.9242362",
  "trfm": "40.42764143, -86.91539979",
  "tswf": "40.4134461, -86.9145728",
  "turf": "40.42862329, -86.92449231",
  "turf": "40.4285034, -86.9242362",
  "uc": "40.4262957, -86.91031006",
  "univ": "40.42546953, -86.9152471",
  "upow": "40.42610548, -86.91699298",
  "util": "40.424588, -86.9103243",
  "util": "40.424588, -86.9103243",
  "util": "40.4271341, -86.9158419",
  "vetm": "40.43004185, -86.92716791",
  "vmri": "40.41865312, -86.91205907",
  "voss": "40.43401116, -86.91928933",
  "vpal": "40.4212019, -86.918183",
  "vpol": "40.42693829, -86.91615548",
  "vpol": "40.42693829, -86.91615548",
  "vpol": "40.42693829, -86.91615548",
  "vpol": "40.42693829, -86.91615548",
  "vpol": "40.42693829, -86.91615548",
  "vreh": "40.419464, -86.9197732",
  "vrpn": "40.43010725, -86.92740315",
  "walc": "40.42645687, -86.92482784",
  "walc": "40.42645687, -86.92482784",
  "warn": "40.42257078, -86.92316651",
  "webb": "40.42544725, -86.91356953",
  "welf": "40.4262478, -86.91110525",
  "welm": "40.42544725, -86.91356953",
  "werk": "40.42645687, -86.92482784",
  "wgry": "40.4247099, -86.923963",
  "wlak": "40.42723427, -86.93553084",
  "wlbb": "40.415341, -86.919384",
  "wlbb": "40.415341, -86.919384",
  "wlbr": "40.4163471, -86.916307",
  "wlgc": "40.4191681, -86.9120356",
  "wlms": "40.42313487, -86.91515122",
  "wlms": "40.42313487, -86.91515122",
  "wlpo": "40.42730391, -86.93721724",
  "wlpo": "40.42730391, -86.93721724",
  "wlre": "40.43105896, -86.91585334",
  "wlsb": "40.4309404, -86.9193444",
  "wltz": "40.4304479, -86.9194696",
  "wlwa": "40.4297185, -86.9190374",
  "wlyc": "40.4311496, -86.9197417",
  "wlzt": "40.431075, -86.9194134",
  "wlzw": "40.4305138, -86.9195125",
  "wmgn": "40.42591986, -86.92897224",
  "wthr": "40.43208342, -86.91788805",
"wwg": "40.42713339, -86.9169723",
"yong": "40.4228144, -86.9106722",
"zl16": "40.41590797, -86.94080614",
"zs0110": "40.41590797, -86.94080614",

}
var converted_location;
for(k = final_export_array.length - 1; k >= 0; k--){
        for(const key in keywords){
                converted_location = (final_export_array[k][5]).toLowerCase();
                converted_location = converted_location.replace(" ", "_");
                converted_location = converted_location.replace("-", "");

                if(converted_location.indexOf(key) >= 0){
                        final_export_array[k][5] = keywords[key];
                        break;
                }
        }
}

final_export_array_two = [];
for(i = 0; i < final_export_array.length; i++){
        if(!isNaN(final_export_array[i][5][0])){
               final_export_array_two.push(final_export_array[i]); 
        }
}
for(i = 0; i < final_export_array_two.length; i++){

        console.log(final_export_array_two[i][5])
}

const todays_date = new Date();
let todays_day = todays_date.getDate();

var day_of_event;
var end_date_of_event;
final_export_array_three = [];
for(i = 0; i < final_export_array_two.length; i++){
        end_date_of_event = final_export_array_two[i][2];
        day_of_event = end_date_of_event.substring(end_date_of_event.indexOf("/") + 1, end_date_of_event.lastIndexOf("/"));
        if(parseInt(day_of_event) <= parseInt(todays_day)){
                final_export_array_three.push(final_export_array_two[i]);
        } else {
                break;
        }
}

