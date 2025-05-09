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

function isBad(val) {
	return val === "" || isNaN(val);
}

function calc1() {
	const power_W = parseFloat(document.getElementById("calc1-power").value);
	const radius_mm = parseFloat(document.getElementById("calc1-radius").value);
  
	if (isBad(power_W) || isBad(radius_mm) || radius_mm <= 0) {
		document.getElementById("calc1-result1").textContent = "—";
		document.getElementById("calc1-result2").textContent = "—";
		return;
	}
  
	const area_mm2 = Math.PI * radius_mm * radius_mm;
	const density_mm = 2 * power_W / area_mm2;
  
	document.getElementById("calc1-result1").textContent = Number(density_mm.toPrecision(3));
	document.getElementById("calc1-result2").textContent = Number((density_mm/10.0).toPrecision(3));
  }

function calc2() {
	const dbm = document.getElementById("calc2-dbm").value;
	if (isBad(dbm)){
		document.getElementById("calc2-result1").textContent = "—";
		return;
	}

	const watts = Math.pow(10, (dbm - 30) / 10);
	document.getElementById("calc2-result1").textContent = Number(watts.toPrecision(3));
}
  
function calc3() {
	const watts = document.getElementById("calc3-watts").value;
	if (isBad(watts)) {
		document.getElementById("calc3-result1").textContent = "—";
		return;
	}

	const dbm = 10 * Math.log10(watts) + 30;
	document.getElementById("calc3-result1").textContent = Number(dbm.toPrecision(3));
}

function calc4() {
	let wavelength = document.getElementById("calc4-wavelength").value;
	const w0 = document.getElementById("calc4-w0").value;
	const z = document.getElementById("calc4-z").value;

	if (isBad(wavelength) || isBad(w0)) {
		document.getElementById("calc4-result1").textContent = "—";
		document.getElementById("calc4-result2").textContent = "—";
		return;
	}

	wavelength = wavelength/1e6;
	rayleigh = Math.PI * w0 * w0 / wavelength;
	document.getElementById("calc4-result1").textContent = Number(rayleigh.toPrecision(4));

	if (isBad(z)) {
		document.getElementById("calc4-result2").textContent = "—";
		return;
	}

	w = w0 * Math.sqrt(1 + Math.pow(z/rayleigh, 2));
	document.getElementById("calc4-result2").textContent = Number(w.toPrecision(4));
	document.getElementById("calc4-result3").textContent = Number((w/w0).toPrecision(3));
}


function calc6() {
	let wavelength = document.getElementById("calc6-wavelength").value;
	const D = document.getElementById("calc6-D").value;
	let MFD = document.getElementById("calc6-mfd").value;

	if (isBad(wavelength) || isBad(D) || isBad(MFD)) {
		document.getElementById("calc6-result1").textContent = "—";
		console.log('here')
		return;
	}

	wavelength = wavelength/1e6;
	MFD = MFD/1e3;
	f = Math.PI * D * MFD / (4 * wavelength)
	document.getElementById("calc6-result1").textContent = Number(f.toPrecision(3));
}
  