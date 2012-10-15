
dojo.require("dojox.mobile.parser");
dojo.require("dojox.mobile");
dojo.require("dojox.mobile.compat");
dojo.require("dojox.mobile.deviceTheme");
dojo.require("dojox.mobile.ScrollableView");
dojo.require("dojox.mobile.SwapView");
dojo.require("dojox.mobile.IconContainer");
dojo.require("dojox.mobile.Button");
dojo.require("dojox.mobile.TextBox");
dojo.require("dojox.mobile.TextArea");
dojo.require("dojox.mobile.SpinWheelDatePicker");
dojo.require("dojox.mobile.SpinWheelTimePicker");
dojo.require("dojox.mobile.PageIndicator");




var currentIncident=null;
var incidentList = new Array();

dojo.ready(function(){
	populateIncidentList();
	init();
});

function init()
{
	console.log("In init");
	list = new dojox.mobile.RoundRectList();
	
	list.placeAt("incidentListContainer");
    list.startup();

	console.log("Made lsit");

    for(var i = 0; i < incidentList.length; i++)
	{
		console.log(incidentList[i],i);

        var item1 = new dojox.mobile.ListItem({
            label: incidentList[i],
			arrayId: i,
			onClick:function(){
				setIncident(this.arrayId);
			},
			moveTo:"titleView"
        });
        item1.placeAt(list.containerNode);
        item1.startup();
    }

	console.log("done");
}

function addNewIncident()
{
	console.log("Adding new incident");
	var incidentName=dijit.byId("incidentNameTxt").get('value');
	dijit.byId("incidentNameTxt").set('value',"");

	console.log(incidentName);

	incidentList.push(incidentName);

    var item1 = new dojox.mobile.ListItem({
        label: incidentName,
		arrayId: incidentList.length-1,
		onClick:function(){
			setIncident(this.arrayId);
		},
		moveTo:"titleView"
    });
    item1.placeAt(list.containerNode);
    item1.startup();
}

function setIncident(id)
{
	currentIncident=id;
	dojo.byId("incidentLabel").innerHTML=incidentList[id];

	console.log("Setting incident ", id);
}


function populateIncidentList()
{
	//this should be generated from the database, but static for now
	incidentList[0]="Finish this before 12pm";
	incidentList[1]="No Beer!!!";
	incidentList[2]="Water Failure Notification";
	incidentList[3]="White Powder Incident";
}

function initView(viewName)
{
	console.log("in initView ",viewName);
	dojo.byId(viewName).innerHTML="Incident: "+incidentList[currentIncident];

//	var dObj = dijit.byId('eventDate');
//	var date = dObj.slots[2].get('value')+"-"+dObj.slots[1].get('value')+"-"+dObj.slots[0].get('value');

//	var tObj = dijit.byId('eventDate')
//	var time = tObj.slots[0].get('value')+":"+tObj.slots[1].get('value');

//	dojo.byId('phoneLogTimestamp').innerHTML=lasttime+" "+lastdate;

//	console.log(date,time);

	return true;
}

lastdate="";
lasttime="";

function saveTimestamp()
{

	var dObj = dijit.byId('eventDate');
	lastdate = dObj.slots[2].get('value')+"-"+dObj.slots[1].get('value')+"-"+dObj.slots[0].get('value');

	var tObj = dijit.byId('eventTime')
	lasttime = tObj.slots[0].get('value')+":"+tObj.slots[1].get('value');


	dojo.byId('phoneLogTimestamp').innerHTML=lasttime+" "+lastdate;

	dijit.byId('logPhoneView').show();

}

function submitPhoneLog()
{
	console.log("thanks22");
	dijit.byId('titleView').show();
}


//https://docs.google.com/spreadsheet/ccc?key=0AoMGj1IlIlmbdERRVXRMS2cyME5PN3BaZEZVSElSblE
// dijit.byId('testing').backButton
