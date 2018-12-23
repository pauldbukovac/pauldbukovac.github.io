var url = "https://cors-anywhere.herokuapp.com/https://script.google.com/macros/s/AKfycbyNawJDKHfmr1O_5glRCk12kTsIxz5J4XSHArpsDe8oo0KFbzs/exec";

//var searchUrl = "https://cors-anywhere.herokuapp.com/";

//var url = "https://cors-anywhere.herokuapp.com/http://requestbin.fullcontact.com/1dsug0y1";

var foobar;

function bSearch_Click(){
	document.getElementById("dTracks").innerHTML = "";
	document.getElementById("sMessage").style.display = "none";
	
	document.getElementById("bSearch").disabled = "true";
	
	var query = document.getElementById("iQuery").value;
	
	var qurl = url + "?query=" + encodeURIComponent(query);
	
	$.ajax({
    url: qurl.toString(),
    type: 'get',
    dataType: 'json',
    success: function (data){
		populate(data);
		document.getElementById("bSearch").disabled = "";
    }
	});
	
//	$.get(url + "?query=" + encodeURIComponent(query), function(data){populate(data)});
}

function populate(data){
	
	foobar = data;
	
	var tracks = data.tracks.items;
	
	var dTracks = document.getElementById("dTracks");
	
	for (var i = 0; i < tracks.length && i < 5; i++){
		var track = tracks[i];
		
		var rb = document.createElement('input');
		
		rb.type = "radio";
		
		rb.name = "rbTrack";
		
		if (i === 0) rb.checked = true;
		
		rb.value = track.uri;
		
		dTracks.appendChild(rb);
		
		var art = document.createElement("img");
		
		art.src = track.album.images[2].url;
		
		dTracks.appendChild(art);
		
		var sInfo = document.createElement("span");
		
		sInfo.innerHTML = "  " + track.name + " // " + getArtists(track);
		
		dTracks.appendChild(sInfo);
		
		dTracks.appendChild(document.createElement("br"));
	}
	
	document.getElementById("bSend").disabled = "";
}

function getArtists(track){
	var artists = track.artists;
	
	var ret = artists[0].name;
	
	for (var i = 1; i < artists.length; i++){
		ret += ", " + artists[i].name;
	}
	
	return ret;
}

function bSend_Click(){
	var uri = $('input[name=rbTrack]:checked').val();
	
	//var uri = "spotify:track:5Kwd8HB9VQ12yFSu0dM4Yi";
	
	var data = {'pass' : 'nye18', 'uri':uri };
	
	//$.post(url, data, );
	
	
	$.ajax({
    url: url,
    type: 'post',
    data: data,
    headers: {
		"X-Requested-With": "XMLHttpRequest"
    },
    dataType: 'json',
    success: function (){
		document.getElementById("sMessage").style.display = "";
		document.getElementById("bSend").disabled = "true";
    }
	
});
	
	/*var request = new XMLHttpRequest();
request.open('POST', url, true);
//request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
request.send(data);
*/
}