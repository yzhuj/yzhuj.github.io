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
	
	const powerUnit = document.querySelector('input[name="calc1-power-unit"]:checked').value;
	const areaUnit = document.querySelector('input[name="calc1-area-unit"]:checked').value;
	document.getElementById("calc1-result-label").innerHTML = `Peak power density [${powerUnit}/${areaUnit.replace('^2', '<sup>2</sup>')}]:`;
  
	if (isBad(power_W) || isBad(radius_mm) || radius_mm <= 0) {
		document.getElementById("calc1-result").textContent = "—";
		return;
	}
	
	// move to user-specified units
	let power;
	if (powerUnit == 'mW') {
		power = power_W * 1e3;
	} else if (powerUnit == 'W') {
		power = power_W;
	} else if (powerUnit == 'kW') {
		power = power_W * 1e-3
	}

	let radius;
	if (areaUnit == 'mm^2') {
		radius = radius_mm;
	} else if (areaUnit == 'cm^2') {
		radius = radius_mm*1e-1;
	} else if (areaUnit == 'm^2') {
		radius = radius_mm*1e-3;
	}

	const area = Math.PI * radius * radius;
	const density = 2 * power / area;
	
	document.getElementById("calc1-result").textContent = Number(density.toPrecision(3));
}

function calc2() {
	const inputValue = parseFloat(document.getElementById("calc2-input").value);
	const loadR = parseFloat(document.getElementById("calc2-R").value);	
	const selectedUnit = document.querySelector('input[name="calc2-unit"]:checked').value;
	
	if (isBad(inputValue) || isBad(loadR) || loadR <= 0) {
		document.getElementById("calc2-result-w").textContent = "—";
		document.getElementById("calc2-result-dbm").textContent = "—";
		document.getElementById("calc2-result-vpp").textContent = "—";
		document.getElementById("calc2-result-vrms").textContent = "—";
		return;
	}
	
	let powerW;
	
	// Convert input to watts first
	switch(selectedUnit) {
		case 'W':
			powerW = inputValue;
			break;
		case 'dBm':
			powerW = Math.pow(10, (inputValue - 30) / 10);
			break;
		case 'Vpp':
			// Vpp to Vrms: Vrms = Vpp / (2 * sqrt(2))
			// Power = Vrms^2 / R
			const vrmsFromVpp = inputValue / (2 * Math.sqrt(2));
			powerW = (vrmsFromVpp * vrmsFromVpp) / loadR;
			break;
		case 'Vrms':
			// Power = Vrms^2 / R
			powerW = (inputValue * inputValue) / loadR;
			break;
	}
	
	// Convert watts to all other units
	const powerDbm = 10 * Math.log10(powerW) + 30;
	const vrms = Math.sqrt(powerW * loadR);
	const vpp = vrms * 2 * Math.sqrt(2);
	
	document.getElementById("calc2-result-w").textContent = Number(powerW.toPrecision(3));
	document.getElementById("calc2-result-dbm").textContent = Number(powerDbm.toPrecision(3));
	document.getElementById("calc2-result-vpp").textContent = Number(vpp.toPrecision(3));
	document.getElementById("calc2-result-vrms").textContent = Number(vrms.toPrecision(3));
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

function calc5() {
	let wavelength = document.getElementById("calc5-wavelength").value;
	const EPD = document.getElementById("calc5-EPD").value;
	const EFL = document.getElementById("calc5-EFL").value;

	if (isBad(wavelength) || isBad(EPD) || isBad(EFL)) {
		document.getElementById("calc5-result1").textContent = "—";
		document.getElementById("calc5-result2").textContent = "—";
		return;
	}

	wavelength = wavelength/1e6;
	resolution = 1.22 * wavelength * EFL / EPD
	document.getElementById("calc5-result1").textContent = Number((resolution*1e3).toPrecision(3));

	let dpx = document.getElementById("calc5-dpx").value;
	const npx = document.getElementById("calc5-npx").value;
	if (isBad(dpx) || isBad(npx)) {
		document.getElementById("calc5-result2").textContent = "—";
		return;	
	}
	dpx = dpx/1e3;

	f = npx * dpx * EPD / (2.44 * wavelength)
	document.getElementById("calc5-result2").textContent = Number(f.toPrecision(3));
}


function calc6() {
	let wavelength = document.getElementById("calc6-wavelength").value;
	let D = document.getElementById("calc6-D").value;
	let MFD = document.getElementById("calc6-mfd").value;

	if (isBad(wavelength) || isBad(MFD)) {
		document.getElementById("calc6-result1").textContent = "—";
		document.getElementById("calc6-result2").textContent = "—";
		return;
	}

	wavelength = wavelength/1e9;
	MFD = MFD/1e6;
	NA = 2 * wavelength / (Math.PI * MFD)
	document.getElementById("calc6-result2").textContent = Number(NA.toPrecision(3));

	if (isBad(D)) {
		document.getElementById("calc6-result1").textContent = "—";
		return;
	}
	D = D/1e3;
	f = Math.PI * D * MFD / (4 * wavelength)
	document.getElementById("calc6-result1").textContent = Number((f*1e3).toPrecision(3));
}
  