var objectName;
var thisPage = location.href;

// Calculate LabVIEW version by searching for "LabVIEW%20" in
// this documents URL and taking the following 3 characters
// for example we're looking for the "7.1" in "LabVIEW%207.1"
var search_string = "LabVIEW%20";
var a = location.href.search(search_string);
var offset = a + search_string.length;
var lv_version = location.href.substring(offset, offset + 3);

// we have to send you back to the top of the topic because of a HTML Help API bug when you call a topic with a hash in the URL
function replaceURL() {
	if (location.hash == "" )
		thisPage = location.href;
	else
		thisPage = location.pathname;
	
	location.replace(thisPage);
	}


function placeObject(objectName) {
		setTimeout(replaceURL, 500);
		location.replace("http://127.0.0.1:3580/National%20Instruments/LabVIEW/LabVIEW/" + lv_version + "/DropControlOrFunction?drop=" + objectName );
	return false;
}

function findObject(objectName) {
		setTimeout(replaceURL, 500);
		location.replace("http://127.0.0.1:3580/National%20Instruments/LabVIEW/LabVIEW/" + lv_version + "/HighlightPaletteMenuItem?highlight=" + objectName );
	return false;
}

function searchMacUnixHelp() {
		setTimeout(replaceURL, 500);
		location.replace("http://127.0.0.1:3580/National%20Instruments/LabVIEW/LabVIEW/" + lv_version + "/SearchMacUnixHelp");
	return false;
}

function openVI(path) {
		setTimeout(replaceURL, 500);
		location.replace("http://127.0.0.1:3580/National%20Instruments/LabVIEW/LabVIEW/" + lv_version + "/OpenVIFromHelp?VI=" + path );
	return false;
}

function openLLB(path) {
		setTimeout(replaceURL, 500);
		location.replace("http://127.0.0.1:3580/National%20Instruments/LabVIEW/LabVIEW/" + lv_version + "/OpenVIFromHelp?LLB=" + path );
	return false;
}

function openProj(path) {
		setTimeout(replaceURL, 500);
		location.replace("http://127.0.0.1:3580/National%20Instruments/LabVIEW/LabVIEW/" + lv_version + "/OpenVIFromHelp?PROJ=" + path );
	return false;
}

function findExamples(categoryID) {
		setTimeout(replaceURL, 500);
		location.replace("http://127.0.0.1:3580/National%20Instruments/LabVIEW/LabVIEW/" + lv_version + "/ExampleFinderCommand?name=leaf&value=" + categoryID );
	return false;
}
