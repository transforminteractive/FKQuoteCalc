<!--hide script from older browsers
//

var VER = " QuoteCalc V5.2 GitHub ";

function hideDiv(id) {
	if (document.getElementById) { // DOM3 = IE5, NS6
		document.getElementById(id).style.display = 'none';
	}
} // end function

function showDiv(id) {
	if (document.getElementById) { // DOM3 = IE5, NS6
		document.getElementById(id).style.display = 'block';
	}
} // end function

function detaxation(Amt) {
   var pretax_amt = (Amt)*(100 / (100 + (100 * 0.05)));
   var prov_tax = 0; //Amt - (pretax_amt)
   return prov_tax;
} // end function

function PROV_taxation(Amt,rate) {
   var prov_tax = Amt*rate;
   return prov_tax;
 } // end function

function RoundMoneyTwoDecimals(n) {
	pennies = n * 100;
	pennies = Math.round(pennies);
	strPennies = "" + pennies;
	len = strPennies.length;
    //return strPennies.substring(0, len - 2) + "." + strPennies.substring(len - 2, len);
    //result = Math.round(n*100)/100;
	result = Math.round(n);
	  // let's also add comments
	  return addCommas(result.toFixed(2));
} // end function

function RoundUPMoneyTwoDecimals(n) {
  pennies = n * 100;
  pennies = Math.round(pennies);
  strPennies = "" + pennies;
  len = strPennies.length;
    //return strPennies.substring(0, len - 2) + "." + strPennies.substring(len - 2, len);
  result = Math.round(n*100)/100;
	  // let's also add comments
	return addCommas(result.toFixed(2));
} // end function

function OntarioRebate(inData,Buyer,ScndBuyer,OldBuyer) {
	var inDataDecimal = inData - 0;

	if ( Buyer || ScndBuyer)   {
		// check if either is FTHB
		if ( Buyer && ScndBuyer) {
			ratio = 1; // both FTHB 100% Rebate
		} else if ( OldBuyer || Buyer == 0 ) {
			ratio = 0.5; // only one FTHB
		}else{
			ratio = 1; // one FTHB
		}

	  if ( inDataDecimal <= 55000 ) {
			Rebate = (0.005 * inDataDecimal);
		}else if (inDataDecimal <= 250000 ){
			Rebate = ((0.01 * inDataDecimal) - 275);
		}else if (inDataDecimal <= 400000 ){
			Rebate = ((0.015 * inDataDecimal) - 1525);
		}else if (inDataDecimal <= 2000000 ){
			Rebate = ((0.02 * inDataDecimal) - 3525);
		}else {
			Rebate = 4000;
		}
		if (Rebate > 4000) Rebate = 4000;

		return Rebate * ratio;

	} else {
		return 0;
	}

} // end function

function TransferTax(inData) {
	var inDataDecimal = inData -0;

	if( inData == '' ) {
		return 0.0;
	}

	if ( inDataDecimal <= 55000 ) {
			return 0.005 * inDataDecimal;
		}else if (inDataDecimal <= 250000 ){
			return (0.01 * inDataDecimal) - 275
		}else if (inDataDecimal <= 400000 ){
			return (0.015 * inDataDecimal) - 1525
		}else if (inDataDecimal <= 2000000 ){
			return (0.02 * inDataDecimal) - 3525
		}else{
			return (0.025 * inDataDecimal) - 13525
		}

} // end function

function TorontoRebate(inData,Buyer,ScndBuyer,OldBuyer) {
	var inDataDecimal = inData - 0;

	if ( Buyer || ScndBuyer )   {

		if ( Buyer && ScndBuyer ) {
			ratio = 1;
		} else if ( OldBuyer || Buyer == 0 ) {
			ratio = 0.5;
		} else {
			ratio = 1;
		}

		if ( inDataDecimal <= 55000 ) {
			Rebate = (0.005 * inDataDecimal);
		}else if (inDataDecimal <= 250000 ){
			Rebate = ((0.01 * inDataDecimal) - 275);
		}else if (inDataDecimal <= 400000 ){
			Rebate = ((0.015 * inDataDecimal) - 1525);
		}else if (inDataDecimal <= 2000000 ){
			Rebate = ((0.02 * inDataDecimal) - 3525);
		}else {
			Rebate = 4475;
		}
		if (Rebate > 4475) Rebate = 4475;

		return Rebate * ratio;

	} else {
		return 0;
	}

} // end function

function TorontoTransferTax(inData) {
	var inDataDecimal = inData -0;
	if( inData == '' ) {
		return 0.0;
	}

	if ( inDataDecimal <= 55000 ) {
			return 0.005 * inDataDecimal;
		}else if (inDataDecimal <= 250000 ){
			return (0.01 * inDataDecimal) - 275
		}else if (inDataDecimal <= 400000 ){
			return (0.015 * inDataDecimal) - 1525
		}else if (inDataDecimal <= 2000000 ){
			return (0.02 * inDataDecimal) - 3525
		}else{
			return (0.025 * inDataDecimal) - 13525
		}

} // end function

function set_fees(form,transaction) {

	LegalFees = document.getElementById('fees');
 	LTT = document.getElementById('landTax');
	TLTT = document.getElementById('TorontolandTax');
	Costs = document.getElementById('totalClosingCost');
	CostsInfo = document.getElementById('ClosingCostCalcs');
	Buyer = document.getElementById('NewBuyer');
	ScndBuyer = document.getElementById('NewBuyer2');
	OldBuyer = document.getElementById('OldBuyer2');

	if (document.calc_form.NewBuyer.checked == true)	BuyerStat = 1; else BuyerStat = 0;
	if (document.calc_form.NewBuyer2.checked == true)	Buyer2Stat = 1; else Buyer2Stat = 0;
	if (document.calc_form.OldBuyer2.checked == true)	OldBuyerStat = 1; else OldBuyerStat = 0;

	P=form.price.value;
	var objRegExp = /[$$,]/g;
	P = eval(P.replace(objRegExp,''));

	if (form.price.value.length == 0) P = "0";

	// after July 1st -- calculate HST
	PROV_rate = "13% HST";
	rate = 0.13;
	//alert (PROV_rate);

	for (ic=0;ic<2;ic++) {
		if (form.R3[ic].checked) gta_located=ic+1;
	}

	switch(gta_located){
		case 1:
			// in GTA
			GTA = 1;
		; break
		case 2:
			// outside GTA
			GTA = 0;
		; break
	} // end switch

	 for (ic=0;ic<3;ic++) {
		if (form.R1[ic].checked) transaction=ic+1;
 	}

	switch(transaction) {
		case 1:
			// purchase
			showDiv('ValueRow');
			showDiv('Rebates');

			if (P == '') P = 0;
			BaseFee = 1865;
			F1 = (0.001*(P-500000));
			if (F1 >= 0 ) {
				Fees = BaseFee + F1;
			}else{
				Fees = BaseFee;
			}

		 	PROV_Tax = PROV_taxation(Fees,rate);
		 	//alert (PROV_Tax);

		  L = TransferTax(P);
		  ONRebate = OntarioRebate(P,BuyerStat,Buyer2Stat,OldBuyerStat);
		 	//alert (ONRebate);

			if (GTA) {
				TL = TorontoTransferTax(P);
				TORebate = TorontoRebate(P,BuyerStat,Buyer2Stat,OldBuyerStat);
				//alert (TORebate);
			}else{
				TL = 0;
				TORebate = 0;
			} // end if GTA

			if (P<15000) {
				TLTTAF = 0;
				TLINFO = '';
			}else{
			 	TLTTAF = 84.75;
			 	TLINFO = " (*incl Admin Fee)";
			} // end < $15000

			TCC = Fees + PROV_Tax + L - ONRebate + TL - TORebate + TLTTAF;
			//alert (TCC);

			if (ONRebate) {
				RebateInfo = "  <i>(after $" + addCommas(ONRebate.toFixed(0)) +" rebate)</i>  ";
			}else{
			 	RebateInfo = '';
			}

			if (TORebate) {
				TORebateInfo = "  <i>(after $" + addCommas(TORebate.toFixed(0)) +" rebate)</i> "; // + TLINFO;
				hideDiv('TLAFINF');
			}else {
				TORebateInfo = '' + TLINFO;
				showDiv('TLAFINF');
			}

			TotalFees = PROV_Tax + Fees;
			// LegalFees.innerHTML = "$" + addCommas(PreTaxFees) + " = $" + RoundMoneyTwoDecimals(Fees) + " + 5% GST";
			LegalFees.innerHTML =  "$" + RoundMoneyTwoDecimals(Fees) + " + " + PROV_rate + " = $"+ RoundMoneyTwoDecimals(TotalFees);
			if(GTA){
			 	TLTT.innerHTML = "$"+RoundMoneyTwoDecimals(TL-TORebate+TLTTAF) + TORebateInfo;
			}else{
			 	TLTT.innerHTML = "Not Applicable";
			}
			LTT.innerHTML = "$"+RoundMoneyTwoDecimals(L-ONRebate) + RebateInfo;
			Costs.innerHTML = "$" + RoundMoneyTwoDecimals(TCC);
			CostsInfo.innerHTML = "<font color='#FFFFFF'>" + TCC.toFixed(2) +" = "+ BaseFee +" + "+ F1 +" + "+ PROV_Tax.toFixed(2) +" + "+ L +" - "+ ONRebate +" + "+ TL +" - "+ TORebate +" + "+ TLTTAF + VER +"</font>";

		; break

	case 2:
	// sell
		showDiv('ValueRow');
		hideDiv('Rebates');
		hideDiv('TLAFINF');

		BaseFee = 1187;
		F1 = (1*(P-500000))/1000;
	 	if (F1 >= 0 ) {
	 		Fees = BaseFee + F1;
	 	}else{
	 		Fees = BaseFee;
	 	}

	  L = 0.00;
		ONRebate = 0.00;
		TL = 0.00;
		TORebate = 0.00;

		PROV_Tax = PROV_taxation(Fees,rate);
		TCC = Fees + PROV_Tax;

		TotalFees = PROV_Tax + Fees;
//		LegalFees.innerHTML = "$" + addCommas(PreTaxFees) + " = $" + RoundMoneyTwoDecimals(Fees) + " + 5% GST";
		LegalFees.innerHTML =  "$" + RoundMoneyTwoDecimals(Fees) + " + " + PROV_rate + " = $"+ RoundMoneyTwoDecimals(TotalFees);

		LTT.innerHTML = "Buyer pays tax";
		TLTT.innerHTML = "Buyer pays tax";
		Costs.innerHTML = "$" + RoundMoneyTwoDecimals(TCC);
		CostsInfo.innerHTML = "<font color='#FFFFFF'>" + TCC.toFixed(2) +" = "+ BaseFee +" + "+ F1 +" + "+ PROV_Tax.toFixed(2) + VER +"</font>";

		; break

	case 3:
		// refinance
		showDiv('ValueRow');
		hideDiv('TLAFINF');

		//  Fees = 1132.08+67.92;
		//  Fees = 1200.00;
		//    Fees = 1061.95+138.05;
		// OCT 2016
		//  Fees = 1200.00+156.00;

		BaseFee = 1200.00
		F1 = (1*(P-500000))/1000;
		if (F1 >= 0 ) {
			Fees = BaseFee + F1;
		}else{
			Fees = BaseFee;
		}

		PROV_Tax = PROV_taxation(Fees,rate);
		PreTaxFees = RoundMoneyTwoDecimals(Fees - PROV_Tax);

		L = 0.00;
		TL = 0.00;
		TCC = Fees + PROV_Tax;

		// hideDiv('ValueRow');
		hideDiv('Rebates');

		TotalFees = PROV_Tax + Fees;
		// LegalFees.innerHTML = "$" + addCommas(PreTaxFees) + " = $" + addCommas(Fees) + " + 13% HST";
		LegalFees.innerHTML = "$" + addCommas(Fees) + " + " + PROV_rate + " = $"+ RoundMoneyTwoDecimals(TotalFees);
		LTT.innerHTML = "Not Applicable";
		TLTT.innerHTML = "Not Applicable";
		Costs.innerHTML = "$" + RoundMoneyTwoDecimals(TCC);
		CostsInfo.innerHTML = "<font color='#FFFFFF'>" + TCC.toFixed(2) +" = "+ BaseFee +" + "+ F1 +" + "+ PROV_Tax.toFixed(2) + VER + "</font>";
		; break

	  } // end switch
} // end set fees function

function payment(form)   {
  set_fees(form);
} // end function

// CLEAR ALL INPUT FIELDS
function clearForm(form){

	form.price.value="";

	form.R1[0].checked = true;
	//form.R2[0].checked = true;
	form.R3[0].checked = true;

	form.NewBuyer.checked = false;
	form.NewBuyer2.checked = false;
	form.OldBuyer2.checked = false;

	showDiv('ValueRow');
 	showDiv('Rebates');

	LTT = document.getElementById('landTax');
	TLTT = document.getElementById('TorontolandTax');
	Costs = document.getElementById('totalClosingCost');
	CostsInfo = document.getElementById('ClosingCostCalcs');

	LTT.innerHTML = "$0.00";
	TLTT.innerHTML = "$0.00";
	Costs.innerHTML = "$0.00";
	CostsInfo.innerHTML = "<font color='#F0F0F0'> " + VER + " &copy; 2017 </font>";

 	hideDiv('TLAFINF');

} // end function

// comma-format numbers
function addCommas(nStr) {
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
} // end function

// end script hiding -->
