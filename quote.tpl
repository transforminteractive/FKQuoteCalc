<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Feld | Kalia - Barristers & Solicitors | Toronto, Real Estate Law</title>

{* set the site section *}
{assign var="section" value="quote"}

{include file="$doc_root/inc/header.inc.tpl"}

<script language="javascript" src="/js/calculator.js"></script>


</head>

<body>
	{include file="$doc_root/inc/body.header.inc.tpl"}
        	<div id="mainLeft">

<div id="getQuote">


<h1><div style="float: right; margin: -30px 10px 0px 0px; z-index: -1;"><a class="twicon" href="http://twitter.com/home?status=http://feldkalia.com{$this->url()}">
                          <img src="/images/tt-twitter-big2.png" width="142" height="50"></a></div>
Residential Closing Cost Calculator</h1>
<p>At F|K, there are no hidden fees. Find out instantly how little it
is going to cost you to have us by your side. Go on…we dare you! Our
fee is <a href="http://feldkalia.com/faq/general/#17">all-inclusive.</a></p><br>


<p>If you like what you hear and how we work, please use the contact
form on the right side of this page and someone from our office will
send you an email with the next steps. It’s that easy to get started…
Or, if you have some questions and would like to hear more, please <a href="http://feldkalia.com/contact.html">contact us</a>. If you prefer email, so do we! </p>


<form id="calculatorForm" name="calc_form">

<h1 class="gta_located">Where is the Property Located</h1>
<div class="formBlock">
<input id="gta" value="L1" name="R3" onclick="payment(this.form);" checked="checked" type="radio"> <label for="gta">In Toronto</label><br>
<input id="ont" value="L2" name="R3" onclick="payment(this.form);" type="radio"> <label for="ont">Outside of Toronto</label><br>
 
 </div>

 
<h1 class="plan">Select your type of transaction</h1>

 <div class="formBlock">
 <input id="purchase" value="V1" name="R1" onclick="set_fees(this.form,'1');payment(this.form);" checked="checked" type="radio"> <label for="purchase">Purchase</label><br>
 <input id="sell" value="V2" name="R1" onclick="set_fees(this.form,'2');payment(this.form);" type="radio"> <label for="sell">Sell</label><br>
 <input id="mortgageRefinance" value="V3" name="R1" onclick="set_fees(this.form,'3');payment(this.form);" type="radio"> <label for="mortgageRefinance">Mortgage Refinance</label>
 </div>
 
	<div style="display: block;" id="ValueRow">
		<h1 class="house">Enter the price of your property</h1>
		<div class="formBlock">
        <label for="price">Price of Property</label>
		<input value="0" class="priceinput" name="price" id="price" onkeyup="payment(this.form);" type="text" size="20"> 
        </div>
	</div>
    
    <div style="display: block;" id="Rebates">
  
		<h1 class="checkoffs">Choose what best describes this transaction</h1>
	    
        <div class="formBlock">
        	<label>
	    <input class="checkbox" id="firstTime" name="SFR" value="ON" onclick="payment(this.form);" type="checkbox">
      	The property is a Single-family residence (detached or semi-detached home, townhome or condominium)</label><br>
	    <label>
	    <input class="checkbox" id="firstTime" name="NewBuyer" value="ON" onclick="payment(this.form);" type="checkbox">
		I am a First Time Home Buyer</label><br>
	    <label>
	    <input class="checkbox" id="firstTime" name="CanPR" value="ON" onclick="payment(this.form);" type="checkbox">
		I am a Canadian citizen or permanent resident (or become one within the next 18-months)</label><br>
  			
		<label>
	    <input class="checkbox" id="coPurchase" name="NewBuyer2" value="ON" onclick="form.OldBuyer2.checked = false; payment(this.form);" type="checkbox">
	    My Co-Purchaser is a First Time Home Buyer</label><br>
	    <label>
	    <input class="checkbox" id="coPurchase2" name="OldBuyer2" value="ON" onclick="form.NewBuyer2.checked = false; payment(this.form);" type="checkbox">
	    My Co-Purchaser previously owned a home (anywhere)</label><br>
		<label>
	    <input class="checkbox" id="firstTime" name="CanPRBuyer2" value="ON" onclick="payment(this.form);" type="checkbox">
		My Co-Purchaser is a Canadian citizen or permanent residents (or will become one within the next 18-months)</label><br>

    
		</div>
	<!--//rebates-->
  
      <h1 class="calcs">Legal and Land Transfer Costs</h1>
      <div class="formBlock">
      <p class="calcLabel">Legal Fees (All Inclusive) <span id="fees">$1,650 
      + 13% HST</span></p><br>
      <p class="calcLabel">Your Toronto Land Transfer Tax will be <span class="calcinput" id="TorontolandTax">$0.00</span></p><b><font size="1">* Effective April 1, 2016 for more info please see the <a href="http://www1.toronto.ca/wps/portal/contentonly?vgnextoid=769f4b3d0e673510VgnVCM10000071d60f89RCRD&vgnextchannel=4f90ff0e43db1410VgnVCM10000071d60f89RCRD#3" target="_new">City of Toronto's website</a></font></b><br>
      <br>
      <p class="calcLabel">Your Ontario Land Transfer Tax will be <span class="calcinput" id="landTax">$0.00</span></p>
      <br>
      </div>

      <h1 class="dollars">Final Closing Costs</h1>    
      <div class="formBlock">
      <p class="calcLabel">Total Closing Costs: <span class="calcinput" id="totalClosingCost">$1,650.00</span></p>
      <b><font size="1">* this fee assumes no unforeseen complications or 
      circumstances arise.</font></b><br>
      <span id="ClosingCostCalcs"></span>
	  </div>

	
	<input name="" class="clearButton" onclick="clearForm(this.form); return false;" src="images/butRestart.jpg" alt="Restart Calculator" type="image" width="111" height="24">
	
<p>&nbsp;</p>
	
</form>
				

</div>
<!--//articles-->
             
			</div>
<!--//mainLeft-->
            <div id="mainRight">
            	
              
            
            {include file="$doc_root/inc/tile.contact.inc.tpl"}    
                
          	</div>
      		<!--//main right-->
            
            {include file="$doc_root/inc/body.footer.inc.tpl"}
<script type="text/javascript">
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
      </script>
<script type="text/javascript">
var pageTracker = _gat._getTracker("UA-478423-30");
pageTracker._trackPageview();
      </script>
</body>
</html>