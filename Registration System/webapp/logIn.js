/* ajax example, that appends to a list */
function sendForm( evt ) {
	
    // get userName data
    var userName = document.getElementById('userName');
    var password = document.getElementById('password');
    
    var xmlDoc = document.implementation.createDocument(null, null, null);

    var xml = xmlDoc.createElement('username');
    xml.appendChild( xmlDoc.createTextNode( userName.value) );
    xmlDoc.appendChild( xml );
    
    var xml = xmlDoc.createElement('password');
    xml.appendChild( xmlDoc.createTextNode( password.value) );
    
    
    if (userName.value =='root'){ 	
	    // transmit the document
	    var req = new XMLHttpRequest();
	    req.open("POST","login/root", true );	
	    req.onreadystatechange = function() {
		if ( req.readyState == 4) {
		    displayResult( req )
		}
	    }
	    req.send( xmlDoc );
	    // clear text area
    }
    
    else{
    	var req = new XMLHttpRequest();
	    req.open("POST","login/user", true );	
	    req.onreadystatechange = function() {
		if ( req.readyState == 4) {
		    displayResult( req )
		}
	    }
	    req.send( xmlDoc );
	    // clear text area
    }
    password.text = '';
    
}

function login(){
	
	var theName = document.getElementById('userName');
	var thePass = document.getElementById('password');
	if (theName.value == 'root') {
		checkPass();
		initializeForm();
		clearResults();
	}
	
		
}

function register(){
	var theName = document.getElementById('userName');
	var thePass = document.getElementById('password');
	if (theName == 'root'){
		clearResults();
		rootReg();
		//initializeForm();
	}
	else {
		clearResults();
		checkReg(theName.value, thePass.value);
		//initializeForm();
	}
}

function displayResult( req ) {
    var d = req.responseXML.documentElement;
    var e = d.getElementsByTagName( 'username' )[0].textContent;
    var f = d.getElementsByTagName( 'password' )[0].textContent;
    //var list = document.getElementById('list');
    //for( var i = 0 ; i < e.length; i++ ) {
	//var li = document.createElement('li');
	//var res = e[i].textContent;
	//li.appendChild( document.createTextNode( res ));
	//list.appendChild( li );
	document.getElementById('userName').value = e;
	
    }

function clearResults( ) {
   
	document.getElementById('userName').value = '';
	document.getElementById('password').value = '';
	
/**
   var list = document.getElementById('list');
     while( list.hasChildNodes() ) {
	 list.parentNode.removeChild( list );
     }
**/

}

function initializeForm() 
{
     var b = document.getElementById( 'loginButton' );
     b.addEventListener('click', sendForm, false );

}

window.addEventListener("load", initializeForm, false);

function checkPass(){
    var text = document.getElementById('userName');
	var thePass = document.getElementById('password');

    var xmlDoc = document.implementation.createDocument(null, null, null);
    
    var xml = xmlDoc.createElement('username');
    xml.appendChild( xmlDoc.createTextNode( text.value) );
    xmlDoc.appendChild( xml );
    var xml = xmlDoc.createElement('password');
    xml.appendChild( xmlDoc.createTextNode( thePass.value) );

    alert("ok");
    
    var req = new XMLHttpRequest();
    req.open("GET",'login/root', true );   	
    req.onreadystatechange = function() {
        if ( req.readyState == 4) {
	   // var d = req.responseXML.documentElement	
		    displayResult( req )    
		}
    }
    req.send( xmlDoc );
    // clear text area
    text.value = '';	
}