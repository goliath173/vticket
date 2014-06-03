var mainarray = new Array();
var preCartNID = new Array();
var preCartAID = new Array();
var preCartOIDA = new Array();
var preCartOIDJ = new Array();
var preCartOIDS = new Array();
var preCartOIDP = new Array();
var preCartA = new Array();
var preCartType = new Array();
var gaArray = new Array(0,0,0,0);


function reloadNight(x) {
         var old_url = location.href;
         var new_url = old_url.substring(0, old_url.indexOf("=")-6);
         location.href = new_url+'?night='+x;
}

/*this function only updates the General Admission tickets array */
function update_GAtix_input(tixnumber,type,NID,AID,OIDA,OIDJ,OIDS,OIDP){
      gaArray[type] = tixnumber;
      var storagestring = 'e';
           storagestring = storagestring + '-p' + NID + '_q' + gaArray[0] + '_a'+AID+'o'+OIDA;
           storagestring = storagestring + '-p' + NID + '_q' + gaArray[1] + '_a'+AID+'o'+OIDJ;
           storagestring = storagestring + '-p' + NID + '_q' + gaArray[2] + '_a'+AID+'o'+OIDS;
           storagestring = storagestring + '-p' + NID + '_q' + gaArray[3] + '_a'+AID+'o'+OIDP;
      var element = document.getElementById('gatix_to_pass');
      element.value = 'https://www.thearlingtonplayers.org/drupal-6.20/cart/add/' + storagestring + '?destination=cart';

}



/*
function pass_to_ubercart(){
         var old_url = getBaseURL();
         var new_url = old_url + 'drupal-6.20/cart/add/';
         var storagestring = '';
         for (i=0;i<preCartNID.length;i++){
             if (i == 0){
                      storagestring = 'e_p'+preCartNID[i]+ '_q1_a1o' +preCartA[i];
             }
             else {
                      storagestring = storagestring + '-p'+preCartNID[i]+ '_q1_a1o' +preCartA[i];
             }
         } 
      var element = document.getElementById('tix_to_pass');
      element.value = new_url + storagestring + '?destination=cart';
}
*/
function getBaseURL() {
    var url = location.href;  // entire url including querystring - also: window.location.href;
    var baseURL = url.substring(0, url.indexOf('/', 14));


    if (baseURL.indexOf('http://localhost') != -1) {
        // Base Url for localhost
        var url = location.href;  // window.location.href;
        var pathname = location.pathname;  // window.location.pathname;
        var index1 = url.indexOf(pathname);
        var index2 = url.indexOf("/", index1 + 1);
        var baseLocalUrl = url.substr(0, index2);

        return baseLocalUrl + "/";
    }
    else {
        // Root Url for domain name
        return baseURL + "/";
    }

}
function changetickettype(value, NID){
       NID = NID.substring(9);
       for (i=0;i<=preCartNID.length;i++){
             if (preCartNID[i] == NID){
                if(value == 1){preCartA[i] = preCartOIDA[i];}
                if(value == 2){preCartA[i] = preCartOIDJ[i];}
		if(value == 3){preCartA[i] = preCartOIDS[i];}
		if(value == 4){preCartA[i] = preCartOIDP[i];}
		preCartType[i] = value;
             }
       }
       change_the_address();
}



function change_the_address(){
         var storagestring = '';
         for (i=0;i<preCartNID.length;i++){
             if (i == 0){
                      storagestring = 'e-p'+preCartNID[i]+ '_q1_a' + preCartAID[i] + 'o' +preCartA[i];
             }
             else {
                      storagestring = storagestring + '-p'+preCartNID[i]+ '_q1_a' + preCartAID[i] + 'o' +preCartA[i];
             }
         } 

      var element = document.getElementById('tix_to_pass');
      element.value = 'https://www.thearlingtonplayers.org/drupal-6.20/cart/add/' + storagestring + '?destination=cart';


}





function updatePreCartArrays(NID, AID, OIDA, OIDJ, OIDS, OIDP){
       var found;
       for (i=0;i<=preCartNID.length;i++){
             if (preCartNID[i] === NID){
                 found = preCartNID[i];
                 preCartNID.splice(i,1);
                 preCartAID.splice(i,1);
                 preCartOIDA.splice(i,1);
                 preCartOIDJ.splice(i,1);
                 preCartOIDS.splice(i,1);
                 preCartOIDP.splice(i,1);
                 preCartA.splice(i,1);
                 preCartType.splice(i,1);
              }
       }
       if (!found){
             	preCartNID.push(NID);
             	preCartAID.push(AID);
		preCartOIDA.push(OIDA);
		preCartOIDJ.push(OIDJ);
		preCartOIDS.push(OIDS);
		preCartOIDP.push(OIDP);
                preCartA.push(OIDA);
                preCartType.push('1');

       }
        change_the_address();
        addseatrow(NID);


}



function changetheseat(id){
      var element = document.getElementById(id);
      var transarray = new Array();
      var found;

                for (i=0;i<=mainarray.length;i++){
                                if (mainarray[i] === id){
                                                found = mainarray[i];
                                                mainarray.splice(i,1);
                                                element.style.backgroundColor = '#9CDD9C';
                                }
                }
                if (!found){
                                mainarray.push(id);
                                element.style.backgroundColor = '#FFCC3E';
                }
				
}


function flipseatsection(id){
               var element = document.getElementById('seatmaphover');
               if (id==1){ //pos6
                     element.style.backgroundPositionY='-1669px';
               }else if(id==3){ //2
                     element.style.backgroundPositionY='-335px';
               }else if(id==4){  //5
                element.style.backgroundPositionY='-1336px';
               }else if(id==6){ //1
                element.style.backgroundPositionY='-1px';
               }else if(id==5){ //4
                element.style.backgroundPositionY='-1002px';
               }else if(id==2){ //3
                element.style.backgroundPositionY='-668px';               
               }
               else if(id==0){ //0
                element.style.backgroundPositionY='-2002px';               
               }
               
}


function addseatrow(){
                var i=0;
                var x = '<div class = "ticketlightrow">';
                var y = '<div class = "ticketdarkrow">';
                var z = '<select class="TixTypeSelect" onchange="changetickettype(this.value, this.id)" id="';
                var g = '"><option value="1">Adult</option><option value="2" selected>Junior</option><option value="3">Senior</option><option value="4">Passbook</option></select></div>';
                var full = "";
                var frame = document.getElementById('SelectedTicketFrame');
                for (i=0;i<mainarray.length;i++){
                                if(!isEven(i)){
                                                full = full + y + mainarray[i]+ z + 'TixSelect' + preCartNID[i] + g; 
                                }
                                else{
                                                full = full + x + mainarray[i]+ z + 'TixSelect' + preCartNID[i] + g; 
                                }
                                
                }
                var element = document.getElementById('SelectedTicketHolder')                           
                element.innerHTML = full;
                
                //makes sure the ticket types are maintained after adding or removing a seat.
                for (i=0;i<mainarray.length;i++){
			$("#TixSelect" +preCartNID[i]).val(preCartType[i]);
		}

                if (mainarray.length == 0){
                                frame.style.visibility = 'hidden';
                }else{
                                frame.style.visibility = 'visible';
                }
                

}

function isEven(value){
                if (value%2 == 0){return true;}        
                else{return false;}
}

function hoverseat(id){
                
		var element = document.getElementById(id);
		if (element){
                element.style.borderColor="red";
		element.style.borderWidth=1;
		element.style.color="red";
                }
}
function hoveroutseat(id){
                
		var element = document.getElementById(id);
		if (element){
                element.style.borderColor="black";
		element.style.borderWidth=1;
		element.style.color="black";
                }

}

function selectsection(section){
                for (x=1; x<=6; x++){
                      var name = 'Section'+x;
                      var element = document.getElementById(name); 
                      if (x==section){
                                element.style.display = "block"
                      }else{
                                element.style.display = "none"
                      }
                }                
}


function printtheseats(){
	var changer = document.getElementById('printer'); 
	var x = new Array('K101','K102','K103','K104');
	var element = document.getElementById('K101');
	//var purchasing = array();
	/*for (var i=0;i<x.length;i++){
		element = document.getElementById(x[i]);
		if(element.currentStyle.backgroundColor == 'yellow'){
			purchasing.push(x[i].toString());
		}
	}*/
	changer.value = element.value;
		
}

function showDate(thisObj){
  /* create a Date object using the system clock */
  now=new Date();
  /* convert contents to string and place in control */
  document.getElementById(thisObj).value=now.toString();
}












// $Id$
Drupal.behaviors.dynamic_products = function (context) {
  $('a.categoryLink:not(.categoryLink-processed)', context).click(function () {
    // This function will get exceuted after the ajax request is completed successfully
    var updateProducts = function(data) {
      // The data parameter is a JSON object. The “products” property is the list of products items that was returned from the server response to the ajax request.
      $('#divProducts').html(data.products);
    }
    $.ajax({
      type: 'POST',
      url: this.href, // Which url should be handle the ajax request. This is the url defined in the <a> html tag
      success: updateProducts, // The js function that will be called upon success request
      dataType: 'json', //define the type of data that is going to get back from the server
      data: 'js=1' //Pass a key/value pair
    });
    return false;  // return false so the navigation stops here and not continue to the page in the link
  }).addClass('categoryLink-processed');
}
