<!--hide script from older browsers
//

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
   var gst_tax = 0; //Amt - (pretax_amt);
   return gst_tax;
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

		if ( Buyer && ScndBuyer) {
			ratio = 1;
		} else if ( OldBuyer || Buyer == 0 ) {
			ratio = 0.5;
		}else{
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
		}else{
			return (0.02 * inDataDecimal) - 3525
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
		}else if (inDataDecimal <= 400000 ){
			Rebate = ((0.01 * inDataDecimal) - 275);
		}else {
			Rebate = 3725;
		}
		if (Rebate > 3725) Rebate = 3725;

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
		}else if (inDataDecimal <= 400000 ){
			return (0.01 * (inDataDecimal-55000)) + 275;
		}else {
			return (0.02 * (inDataDecimal-400000)) + 3725;
		}

	} // end function


	function set_fees(form,transaction) {

	 LegalFees = document.getElementById('fees');
	 LTT = document.getElementById('landTax');
	 TLTT = document.getElementById('TorontolandTax');
	 Costs = document.getElementById('totalClosingCost');
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

	 for (ic=0;ic<3;ic++) {
		if (form.R1[ic].checked) transaction=ic+1;
	 }

	switch(transaction)
	{
	case 1:
	// purchase
	 showDiv('ValueRow');
	 showDiv('Rebates');

	 if (P == '') P = 0;
	 Fees = 1650;
	 F1 = (0.9*(P-500000))/1000
	 if (F1 >= 0 ) {
	 	Fees = 1650 + F1;
	 }else{
	 	Fees = 1650;
	 }

	 GST_Tax = detaxation(Fees);
	 PreTaxFees = RoundMoneyTwoDecimals(Fees ); //- GST_Tax
	 //alert (PreTaxFees);

	 L = TransferTax(P);
	 ONRebate = OntarioRebate(P,BuyerStat,Buyer2Stat,OldBuyerStat);
	 //alert (ONRebate);

	 TL = TorontoTransferTax(P);
	 TORebate = TorontoRebate(P,BuyerStat,Buyer2Stat,OldBuyerStat);
	 //alert (TORebate);

	 TCC = Fees + L - ONRebate + TL - TORebate;
	  //alert (TCC);
	 if (ONRebate) {
		RebateInfo = "  <i>(after $"+addCommas(ONRebate) +" rebate)</i>  ";
	 }else{
		 RebateInfo = '';
	 }

	 if (TORebate) {
		TORebateInfo = "  <i>(after $"+addCommas(TORebate) +" rebate)</i>  ";
	 }else {
	 	TORebateInfo = '';
	 }

	 LegalFees.innerHTML = "$" + addCommas(PreTaxFees) + " = $" + RoundMoneyTwoDecimals(Fees) + " + 5% GST";
	 TLTT.innerHTML = "$"+RoundMoneyTwoDecimals(TL-TORebate) + TORebateInfo;
	 LTT.innerHTML = "$"+RoundMoneyTwoDecimals(L-ONRebate) + RebateInfo;
	 Costs.innerHTML = "$" + RoundMoneyTwoDecimals(TCC);

	 ; break

	case 2:
	// sell
		showDiv('ValueRow');
	 	showDiv('Rebates');

	  Fees = 1050;
	 	F1 = (70*(P-500000))/100000

	 	if (F1 >= 0 ) {
	 		Fees = 1050 + F1;
	 	}else{
	 		Fees = 1050;
	 	}
	  L = 0.00;
	  TL = 0.00;

	  GST_Tax = detaxation(Fees);
	  PreTaxFees = RoundMoneyTwoDecimals(Fees ); //- GST_Tax

	  TCC = Fees;

		//hideDiv('ValueRow');
		hideDiv('Rebates');

		LegalFees.innerHTML = "$" + addCommas(PreTaxFees) + " = $" + RoundMoneyTwoDecimals(Fees) + " + 5% GST";
		LTT.innerHTML = "Buyer pays tax";
		TLTT.innerHTML = "Buyer pays tax";
		Costs.innerHTML = "$" + RoundMoneyTwoDecimals(TCC);
		; break

	case 3:
	// refinance
	//  Fees = 1132.08+67.92;
	  Fees = 1200.00;
	  GST_Tax = detaxation(Fees);
	  PreTaxFees = RoundMoneyTwoDecimals(Fees - GST_Tax);

	  L = 0.00;
	  TL = 0.00;
	  TCC = Fees;

		hideDiv('ValueRow');
		hideDiv('Rebates');

		LegalFees.innerHTML = "$" + addCommas(PreTaxFees) + " = $" + addCommas(Fees) + " + 5% GST";
		LTT.innerHTML = "Not Applicable";
		TLTT.innerHTML = "Not Applicable";
		Costs.innerHTML = "$" + RoundMoneyTwoDecimals(TCC);

		; break
	        }
	}

	function payment(form)   {
	  set_fees(form);
	}

	// CLEAR ALL INPUT FIELDS

	function clearForm(form){

	 form.price.value="";

	 LTT = document.getElementById('landTax');
	 TLTT = document.getElementById('TorontolandTax');
	 Costs = document.getElementById('totalClosingCost');

	 LTT.innerHTML = "$0.00";
	 TLTT.innerHTML = "$0.00";
	 Costs.innerHTML = "$0.00";

	 showDiv('ValueRow');
	 showDiv('Rebates');

	}

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
	}

	// end script hiding -->
