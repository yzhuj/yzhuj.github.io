function appdisapp(elementID, block){
	if (document.getElementById(elementID).style.display == 'none'){
		if (block) {
			document.getElementById(elementID).style.display = 'block'
		}
		else {
			document.getElementById(elementID).style.display = 'inline'
		}
	}
	else{ 
		document.getElementById(elementID).style.display = 'none'
	}
}