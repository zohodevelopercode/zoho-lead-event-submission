string standalone.HandleLeadEventSubmission1(String crmAPIRequest)
{
info "[HandleLeadEventSubmission] START";
crmAPIRequestMap = crmAPIRequest.get("body");
webActivityJson = null;
try 
{
	webActivityJson = crmAPIRequestMap.get("details");
}
catch (e)
{
	info "[HandleLeadEventSubmission] ERROR | Could not read 'details' from the request body — the body is likely not valid JSON. If you're testing manually, make sure only the JSON object itself is pasted (no label text like 'Call A:' before it). | error=" + e.toString();
	parseErrorResultMap = Map();
	parseErrorResultMap.put("status","error");
	parseErrorResultMap.put("message","Could not read 'details' from the request body — the body is likely not valid JSON.");
	return parseErrorResultMap.toString();
}
if(crmAPIRequestMap == null || webActivityJson == null)
{
	info "[HandleLeadEventSubmission] ERROR | 'body' or 'details' missing from crmAPIRequest. Aborting.";
	missingBodyErrorResultMap = Map();
	missingBodyErrorResultMap.put("status","error");
	missingBodyErrorResultMap.put("message","'body' or 'details' missing from crmAPIRequest");
	return missingBodyErrorResultMap.toString();
}
info "[HandleLeadEventSubmission] Payload parsed successfully from body.details";
emailFromJson = ifNull(webActivityJson.get("Email"),"").toString().trim();
firstNameFromJson = ifNull(webActivityJson.get("First name"),"").toString().trim();
lastNameFromJson = ifNull(webActivityJson.get("Last name"),"").toString().trim();
fullNameFromJson = ifNull(webActivityJson.get("Full name"),"").toString().trim();
if(firstNameFromJson == "" && lastNameFromJson == "" && fullNameFromJson != "")
{
	firstNameFromJson = fullNameFromJson.getPrefix(" ").trim();
	lastNameFromJson = fullNameFromJson.getSuffix(" ").trim();
	if(lastNameFromJson == fullNameFromJson)
	{
		lastNameFromJson = "";
	}
}
companyFromJson = ifNull(webActivityJson.get("Company"),"").toString().trim();
countryFromJson = ifNull(webActivityJson.get("Country"),"").toString().trim();
phoneFromJson = ifNull(webActivityJson.get("Phone"),"").toString().replaceAll(" ","").trim();
mobileFromJson = ifNull(webActivityJson.get("Mobile"),"").toString().replaceAll(" ","").trim();
phoneNumberFromJson = ifNull(webActivityJson.get("PhoneNumber"),"").toString().replaceAll(" ","").trim();
jobTitleFromJson = ifNull(webActivityJson.get("Job title"),"").toString().trim();
industryFromJson = ifNull(webActivityJson.get("Industry"),"").toString().trim();
formUrlFromJson = ifNull(webActivityJson.get("form_url"),"").toString().trim();
domainNameFromJson = ifNull(webActivityJson.get("DomainName"),"").toString().trim();
licenseIdFromJson = ifNull(webActivityJson.get("LicenseId"),"").toString().trim();
accountIdFromJson = ifNull(webActivityJson.get("AccountId"),"").toString().trim();
cloudAccountIdFromJson = ifNull(webActivityJson.get("CloudAccountId"),"").toString().trim();
customerIdFromPayload = ifNull(crmAPIRequestMap.get("Customer_ID"),"").toString().trim();
zohoAccIdFromJson = ifNull(crmAPIRequestMap.get("ZohoAccountID"),"").toString().trim();
sourceFromJson = ifNull(crmAPIRequestMap.get("Source"),"").toString().trim();
activityNameFromJson = ifNull(crmAPIRequestMap.get("name"),"").toString().trim();
externalIdFromJson = ifNull(webActivityJson.get("External ID"),ifNull(webActivityJson.get("External_Id"),"")).toString().trim();
actionFromJson = ifNull(webActivityJson.get("Action"),"").toString().trim();
categoryFromJson = ifNull(webActivityJson.get("Category"),"").toString().trim();
labelFromJson = ifNull(webActivityJson.get("Label"),"").toString().trim();
invoiceIdFromJson = ifNull(webActivityJson.get("InvoiceId"),"").toString().trim();
paymentGroupIdFromJson = ifNull(webActivityJson.get("PaymentGroupId"),"").toString().trim();
amountFromJson = webActivityJson.get("Amount");
currencyFromJson = ifNull(webActivityJson.get("Currency"),"").toString().trim();
amountInUsdFromJson = webActivityJson.get("AmountInUsd");
paymentDateFromJson = ifNull(webActivityJson.get("PaymentDate"),"").toString().trim();
subscriptionPeriodFromJson = webActivityJson.get("SubscriptionPeriod");
subscriptionEndDateFromJson = webActivityJson.get("SubscriptionEndDate");
salesPersonFromJson = ifNull(webActivityJson.get("SalesPerson"),"").toString().trim();
productNameFromJson = ifNull(webActivityJson.get("ProductName"),"").toString().trim();
productTypeIdFromJson = ifNull(webActivityJson.get("ProductTypeId"),"").toString().trim();
paymentMethodFromJson = ifNull(webActivityJson.get("PaymentMethod"),"").toString().trim();
howPlanToUseFromJson = ifNull(webActivityJson.get("How do you plan to use RavenDB?"),"").toString().trim();
howHeardFromJson = ifNull(webActivityJson.get("How did you hear about RDB"),"").toString().trim();
gclidFromJson = ifNull(webActivityJson.get("GClId"),ifNull(webActivityJson.get("GCLID"),"")).toString().trim();
gbraidFromJson = ifNull(webActivityJson.get("Gbraid"),"").toString().trim();
wbraidFromJson = ifNull(webActivityJson.get("Wbraid"),"").toString().trim();
fbcFromJson = ifNull(webActivityJson.get("Fbc"),"").toString().trim();
marketingConsent = ifNull(webActivityJson.get("I would like to receive learning materials and occasional marketing emails"),webActivityJson.get("I'd like to receive product updates and tips by email"));
acceptTerms = webActivityJson.get("AcceptTheTermsAndConditions");
privacyPolicyAccepted = webActivityJson.get("PrivacyPolicyAccepted");
platformFromJson = ifNull(webActivityJson.get("Platform"),"").toString().trim();
versionFromJson = ifNull(webActivityJson.get("Version"),"").toString().trim();
channelFromJson = ifNull(webActivityJson.get("Channel"),"").toString().trim();
statusFromJson = ifNull(webActivityJson.get("Status"),"").toString().trim();
utmsPayload = crmAPIRequestMap.get("utms");
if(utmsPayload != null)
{
	utmSourceFromPayload = ifNull(utmsPayload.get("utm_source"),"").toString().trim();
	utmMediumFromPayload = ifNull(utmsPayload.get("utm_medium"),"").toString().trim();
	utmCampaignFromPayload = ifNull(utmsPayload.get("utm_campaign"),"").toString().trim();
	utmTermFromPayload = ifNull(utmsPayload.get("utm_term"),"").toString().trim();
	utmContentFromPayload = ifNull(utmsPayload.get("utm_content"),"").toString().trim();
}
else
{
	utmSourceFromPayload = ifNull(crmAPIRequestMap.get("utm_source"),"").toString().trim();
	utmMediumFromPayload = ifNull(crmAPIRequestMap.get("utm_medium"),"").toString().trim();
	utmCampaignFromPayload = ifNull(crmAPIRequestMap.get("utm_campaign"),"").toString().trim();
	utmTermFromPayload = ifNull(crmAPIRequestMap.get("utm_term"),"").toString().trim();
	utmContentFromPayload = ifNull(crmAPIRequestMap.get("utm_content"),"").toString().trim();
}
zohoAccountResolvedId = "";
if(zohoAccIdFromJson != "")
{
	try 
	{
		zohoAccountCheckRecord = zoho.crm.getRecordById("Accounts",zohoAccIdFromJson.toLong());
		if(zohoAccountCheckRecord != null && zohoAccountCheckRecord.get("id") != null)
		{
			zohoAccountResolvedId = zohoAccIdFromJson;
		}
		else
		{
			info "[Account Priority] ZohoAccountID does not resolve to an existing Account — ignoring" + " | ZohoAccountID=" + zohoAccIdFromJson;
		}
	}
	catch (e)
	{
		info "[Account Priority] ZohoAccountID validation error — ignoring" + " | ZohoAccountID=" + zohoAccIdFromJson + " | error=" + e.toString();
	}
}
preResolvedAccountId = "";
customerIdResolvedAccountId = "";
customerIdOrdersRecordId = "";
if(zohoAccountResolvedId != "")
{
	preResolvedAccountId = zohoAccountResolvedId;
	info "[Account Priority] Using ZohoAccountID (Priority 1)" + " | accountId=" + preResolvedAccountId;
}
else if(customerIdFromPayload != "")
{
	try
	{
		customerIdOrdersSearch = zoho.crm.searchRecords("OrdersCustomerIds","(Name:equals:" + customerIdFromPayload + ")");
		if(customerIdOrdersSearch != null && customerIdOrdersSearch.size() > 0)
		{
			customerIdOrdersRecord = customerIdOrdersSearch.get(0);
			customerIdOrdersRecordId = ifNull(customerIdOrdersRecord.get("id"),"").toString();
			customerIdAccountObj = customerIdOrdersRecord.get("Account_Name");
			if(customerIdAccountObj != null)
			{
				candidateAccountId = ifNull(customerIdAccountObj.get("id"),"").toString();
				if(candidateAccountId != "")
				{
					try 
					{
						customerIdAccountCheck = zoho.crm.getRecordById("Accounts",candidateAccountId.toLong());
						if(customerIdAccountCheck != null && customerIdAccountCheck.get("id") != null)
						{
							customerIdResolvedAccountId = candidateAccountId;
						}
						else
						{
							info "[Account Priority] Customer_ID mapping points to a missing Account — will re-create and reconcile" + " | Customer_ID=" + customerIdFromPayload + " | staleAccountId=" + candidateAccountId;
						}
					}
					catch (e)
					{
						info "[Account Priority] Customer_ID Account validation error — will re-create and reconcile" + " | Customer_ID=" + customerIdFromPayload + " | error=" + e.toString();
					}
				}
			}
		}
	}
	catch (e)
	{
		info "[Account Priority] OrdersCustomerIds search error | " + e.toString();
	}
	if(customerIdResolvedAccountId != "")
	{
		preResolvedAccountId = customerIdResolvedAccountId;
		info "[Account Priority] Using Customer_ID mapping (Priority 2)" + " | accountId=" + preResolvedAccountId;
	}
	else
	{
		domainMatchedAccountForCustomerId = "";
		if(emailFromJson != "" && emailFromJson.contains("@"))
		{
			candidateDomainForCustomerId = emailFromJson.getSuffix("@").toLowerCase().trim();
			isCandidateDomainPersonalForCustomerId = false;
			try
			{
				personalDomainCheckForCustomerId = zoho.crm.searchRecords("Personal_Domains","(Domain:equals:" + candidateDomainForCustomerId + ")");
				if(personalDomainCheckForCustomerId != null && personalDomainCheckForCustomerId.size() > 0)
				{
					isCandidateDomainPersonalForCustomerId = true;
				}
			}
			catch (e)
			{
				isCandidateDomainPersonalForCustomerId = false;
			}
			if(!isCandidateDomainPersonalForCustomerId)
			{
				try
				{
					domainAccountSearchForCustomerId = zoho.crm.searchRecords("Accounts","(Email_Domains:equals:" + candidateDomainForCustomerId + ")");
					if(domainAccountSearchForCustomerId != null && domainAccountSearchForCustomerId.size() > 0)
					{
						candidateDomainAccountId = domainAccountSearchForCustomerId.get(0).get("id").toString();
						existingLinkedCustomerIdForDomain = "";
						try
						{
							domainAccountOrdersCheckForCustomerId = zoho.crm.searchRecords("OrdersCustomerIds","(Account_Name:equals:" + candidateDomainAccountId + ")");
							if(domainAccountOrdersCheckForCustomerId != null && domainAccountOrdersCheckForCustomerId.size() > 0)
							{
								existingLinkedCustomerIdForDomain = ifNull(domainAccountOrdersCheckForCustomerId.get(0).get("Name"),"").toString();
							}
						}
						catch (e)
						{
							existingLinkedCustomerIdForDomain = "";
						}
						if(existingLinkedCustomerIdForDomain == "" || existingLinkedCustomerIdForDomain == customerIdFromPayload)
						{
							domainMatchedAccountForCustomerId = candidateDomainAccountId;
						}
					}
				}
				catch (e)
				{
					domainMatchedAccountForCustomerId = "";
				}
			}
		}
		if(domainMatchedAccountForCustomerId != "")
		{
			preResolvedAccountId = domainMatchedAccountForCustomerId;
			info "[Account Priority] Using Email Domain match for Customer_ID" + " | accountId=" + preResolvedAccountId;
			try
			{
				if(customerIdOrdersRecordId != "")
				{
					accountLookup = Map();
					accountLookup.put("id",preResolvedAccountId);
					zoho.crm.updateRecord("OrdersCustomerIds",customerIdOrdersRecordId.toLong(),{"Account_Name":accountLookup});
					info "[Customer ID] Reconciled stale OrdersCustomerIds mapping" + " | Customer_ID=" + customerIdFromPayload + " | accountId=" + preResolvedAccountId;
				}
				else
				{
					ordersCustomerData = Map();
					ordersCustomerData.put("Name",customerIdFromPayload);
					accountLookup = Map();
					accountLookup.put("id",preResolvedAccountId);
					ordersCustomerData.put("Account_Name",accountLookup);
					zoho.crm.createRecord("OrdersCustomerIds",ordersCustomerData);
					info "[Customer ID] OrdersCustomerIds record created" + " | Customer_ID=" + customerIdFromPayload + " | accountId=" + preResolvedAccountId;
				}
			}
			catch (e)
			{
				info "[Customer ID] OrdersCustomerIds link error | " + e.toString();
			}
		}
		else
		{
			newCustomerAccName = "Unknown Account";
			if(companyFromJson != "")
			{
				newCustomerAccName = companyFromJson;
			}
			else if((firstNameFromJson + " " + lastNameFromJson).trim() != "")
			{
				newCustomerAccName = (firstNameFromJson + " " + lastNameFromJson).trim();
			}
			newCustomerAccMap = Map();
			newCustomerAccMap.put("Account_Name",newCustomerAccName);
			newCustomerAccMap.put("Account_State","New");
			newCustomerAccMap.put("Source","api.orders.hibernatingrhinos.com");
			if(countryFromJson != "")
			{
				newCustomerAccMap.put("Territory_Country",countryFromJson);
			}
			if(emailFromJson != "" && emailFromJson.contains("@"))
			{
				newCustomerAccMap.put("Email",emailFromJson);
				candidateDomain = emailFromJson.getSuffix("@").toLowerCase().trim();
				isCandidateDomainPersonal = false;
				try
				{
					personalDomainCheck = zoho.crm.searchRecords("Personal_Domains","(Domain:equals:" + candidateDomain + ")");
					if(personalDomainCheck != null && personalDomainCheck.size() > 0)
					{
						isCandidateDomainPersonal = true;
					}
				}
				catch (e)
				{
					isCandidateDomainPersonal = false;
				}
				if(!isCandidateDomainPersonal)
				{
					newCustomerAccMap.put("Email_Domains",candidateDomain);
					newCustomerAccMap.put("Lead_Type","Business");
				}
				else
				{
					newCustomerAccMap.put("Lead_Type","Personal");
				}
			}
			try
			{
				newCustomerAccDataList = List();
				newCustomerAccDataList.add(newCustomerAccMap);
				newCustomerAccCreatePayload = Map();
				newCustomerAccCreatePayload.put("data",newCustomerAccDataList);
				newCustomerAccCreatePayload.put("trigger",List({"workflow"}));
				createCustomerAccApiResp = invokeurl
				[
					url :"https://www.zohoapis.com/crm/v8/Accounts"
					type :POST
					parameters:newCustomerAccCreatePayload.toString()
					connection:"zcrm"
				];
				createCustomerAccResultId = "";
				if(createCustomerAccApiResp != null && createCustomerAccApiResp.get("data") != null && createCustomerAccApiResp.get("data").size() > 0)
				{
					createCustomerAccRecordResult = createCustomerAccApiResp.get("data").get(0);
					if(ifNull(createCustomerAccRecordResult.get("status"),"").toString() == "success")
					{
						createCustomerAccDetails = createCustomerAccRecordResult.get("details");
						if(createCustomerAccDetails != null)
						{
							createCustomerAccResultId = ifNull(createCustomerAccDetails.get("id"),"").toString();
						}
					}
				}
				if(createCustomerAccResultId != "")
				{
					preResolvedAccountId = createCustomerAccResultId;
					info "[Account Priority] New Account created for Customer_ID" + " | Customer_ID=" + customerIdFromPayload + " | accountId=" + preResolvedAccountId;
					info "[Account Priority] Skipping CreateAccountCommand - Orders API already created this Account";
					try
					{
						if(customerIdOrdersRecordId != "")
						{
							accountLookup = Map();
							accountLookup.put("id",preResolvedAccountId);
							zoho.crm.updateRecord("OrdersCustomerIds",customerIdOrdersRecordId.toLong(),{"Account_Name":accountLookup});
							info "[Customer ID] Reconciled stale OrdersCustomerIds mapping" + " | Customer_ID=" + customerIdFromPayload + " | accountId=" + preResolvedAccountId;
						}
						else
						{
							ordersCustomerData = Map();
							ordersCustomerData.put("Name",customerIdFromPayload);
							accountLookup = Map();
							accountLookup.put("id",preResolvedAccountId);
							ordersCustomerData.put("Account_Name",accountLookup);
							zoho.crm.createRecord("OrdersCustomerIds",ordersCustomerData);
							info "[Customer ID] OrdersCustomerIds record created" + " | Customer_ID=" + customerIdFromPayload + " | accountId=" + preResolvedAccountId;
						}
					}
					catch (e)
					{
						info "[Customer ID] OrdersCustomerIds link error | " + e.toString();
					}
				}
				else
				{
					info "[Account Priority] ERROR | New Account creation failed for Customer_ID" + " | Customer_ID=" + customerIdFromPayload;
				}
			}
			catch (e)
			{
				info "[Account Priority] ERROR | New Account creation exception for Customer_ID" + " | Customer_ID=" + customerIdFromPayload + " | error=" + e.toString();
			}
		}
	}
}
info "[Account Priority] Pre-resolved accountId=" + preResolvedAccountId + " | ZohoAccountID=" + zohoAccIdFromJson + " | Customer_ID=" + customerIdFromPayload;
if(preResolvedAccountId != "")
{
	try
	{
		territoryCentralEuropeCountries = List({"Austria","Czech Republic","Germany","Hungary","Liechtenstein","Poland","Slovakia","Switzerland"});
		territoryNordicRegionCountries = List({"Aland Islands","Denmark","Faroe Islands","Finland","Iceland","Norway","Sweden"});
		territoryBritishIslesCountries = List({"Great Britain","Ireland","Isle of Man","Northern Ireland","Svalbard and Jan Mayen","United Kingdom"});
		territoryWestEuropeCountries = List({"Belgium","France","Guernsey","Jersey","Luxembourg","Monaco","Netherlands"});
		territorySouthEuropeCountries = List({"Andorra","Gibraltar","Italy","Malta","Montserrat","Portugal","San Marino","Spain","Vatican"});
		territorySouthEastEuropeCountries = List({"Albania","Bosnia and Herzegovina","Bulgaria","Croatia","Greece","Kosovo","Montenegro","North Macedonia","Romania","Serbia","Slovenia"});
		territoryEastEuropeCountries = List({"Belarus","Estonia","Georgia","Latvia","Lithuania","Moldova","Russia","Ukraine"});
		territoryMenaCountries = List({"Armenia","Bahrain","Cyprus","Egypt","Iran","Iraq","Israel","Jordan","Kuwait","Lebanon","Libya","Oman","Palestine","Qatar","Saudi Arabia","Syria","Turkey","United Arab Emirates","Yemen"});
		territoryPacificCountries = List({"American Samoa","Australia","Cook Islands","Fiji","French Polynesia","French Southern Territories","Guam","Kiribati","Marshall Islands","Micronesia","Nauru","New Caledonia","New Zealand","Niue","Norfolk Island","Palau","Papua New Guinea","Pitcairn","Samoa","Solomon Islands","Tokelau","Tonga","Tuvalu","Vanuatu","Wallis and Futuna Islands"});
		territoryWestAsiaCountries = List({"Afghanistan","Bangladesh","Bhutan","India","Maldives","Nepal","Pakistan","Sri Lanka"});
		territoryCentralAsiaCountries = List({"Azerbaijan","Kazakhstan","Kyrgyzstan","Tajikistan","Turkmenistan","Uzbekistan"});
		territoryNorthEastAsiaCountries = List({"China","Hong Kong","Japan","Macao","Mongolia","North Korea","South Korea"});
		territorySouthEastAsiaCountries = List({"Brunei","Cambodia","Christmas Island","Cocos Islands","East Timor","Indonesia","Laos","Malaysia","Myanmar","Northern Mariana Islands","Philippines","Singapore","Taiwan","Thailand","United States Minor Outlying Islands","Vietnam"});
		territoryNorthAmericaCountries = List({"Aruba","Bermuda","Canada","Cayman Islands","Cuba","Dominican Republic","Greenland","Haiti","Mexico","Puerto Rico","Saint Pierre and Miquelon","United States"});
		territorySouthAmericaCountries = List({"Antarctica","Argentina","Bolivia","Bouvet Island","Brazil","Chile","Ecuador","Falkland Islands","French Guiana","Guyana","Heard Island and McDonald Islands","Paraguay","Peru","South Georgia and the South Sandwich Islands","Suriname","Uruguay","Venezuela"});
		territoryCentralAmericaCountries = List({"Anguilla","Antigua and Barbuda","Bahamas","Barbados","Belize","British Virgin Islands","Colombia","Costa Rica","Curacao","Dominica","El Salvador","Grenada","Guadeloupe","Guatemala","Honduras","Jamaica","Martinique","Netherlands Antilles","Nicaragua","Panama","Saint Kitts and Nevis","Saint Lucia","Saint Martin","Saint Vincent and the Grenadines","Sint Maarten","Trinidad and Tobago","Turks and Caicos Islands","Virgin Islands"});
		territoryWestAfricaCountries = List({"Benin","Burkina Faso","Cape Verde","Cote d'Ivoire","Gambia","Ghana","Guinea","Guinea Bissau","Liberia","Mali","Mauritania","Niger","Nigeria","Saint Helena","Senegal","Sierra Leone","Togo"});
		territoryNorthAfricaCountries = List({"Algeria","Morocco","Tunisia","Western Sahara"});
		territorySouthAfricaCountries = List({"Botswana","Eswatini","Lesotho","Namibia","South Africa"});
		territoryCentralAfricaCountries = List({"Angola","Cameroon","Central African Republic","Chad","Democratic Republic of the Congo","Equatorial Guinea","Gabon","Republic of the Congo","Sao Tome and Principe"});
		territoryEastAfricaCountries = List({"British Indian Ocean Territory","Burundi","Comoros","Djibouti","Eritrea","Ethiopia","Kenya","Madagascar","Malawi","Mauritius","Mayotte","Mozambique","Reunion","Rwanda","Seychelles","Somalia","Sudan","Tanzania","Uganda","Zambia","Zimbabwe"});
		subTerritoryAccountRecord = zoho.crm.getRecordById("Accounts",preResolvedAccountId.toLong());
		subTerritoryCountry = "";
		existingAccSubTerritory = "";
		if(subTerritoryAccountRecord != null)
		{
			subTerritoryCountry = ifNull(subTerritoryAccountRecord.get("Territory_Country"),"").toString().trim();
			existingAccSubTerritory = ifNull(subTerritoryAccountRecord.get("Sub_Territory"),"").toString().trim();
		}
		if(subTerritoryCountry == "" && countryFromJson != "")
		{
			subTerritoryCountry = countryFromJson;
		}
		if(existingAccSubTerritory == "" && subTerritoryCountry != "")
		{
			accSubTerritory = null;
			if(territoryCentralEuropeCountries.contains(subTerritoryCountry)) { accSubTerritory = "C. Europe"; }
			else if(territoryNordicRegionCountries.contains(subTerritoryCountry)) { accSubTerritory = "Nordic Region"; }
			else if(territoryBritishIslesCountries.contains(subTerritoryCountry)) { accSubTerritory = "British Isles"; }
			else if(territoryWestEuropeCountries.contains(subTerritoryCountry)) { accSubTerritory = "W. Europe"; }
			else if(territorySouthEuropeCountries.contains(subTerritoryCountry)) { accSubTerritory = "S. Europe"; }
			else if(territorySouthEastEuropeCountries.contains(subTerritoryCountry)) { accSubTerritory = "SE Europe"; }
			else if(territoryEastEuropeCountries.contains(subTerritoryCountry)) { accSubTerritory = "E. Europe"; }
			else if(territoryMenaCountries.contains(subTerritoryCountry)) { accSubTerritory = "MENA"; }
			else if(territoryPacificCountries.contains(subTerritoryCountry)) { accSubTerritory = "Pacific"; }
			else if(territoryWestAsiaCountries.contains(subTerritoryCountry)) { accSubTerritory = "W. Asia"; }
			else if(territoryCentralAsiaCountries.contains(subTerritoryCountry)) { accSubTerritory = "C. Asia"; }
			else if(territoryNorthEastAsiaCountries.contains(subTerritoryCountry)) { accSubTerritory = "NE Asia"; }
			else if(territorySouthEastAsiaCountries.contains(subTerritoryCountry)) { accSubTerritory = "SE Asia"; }
			else if(territoryNorthAmericaCountries.contains(subTerritoryCountry)) { accSubTerritory = "N. America"; }
			else if(territorySouthAmericaCountries.contains(subTerritoryCountry)) { accSubTerritory = "S. America"; }
			else if(territoryCentralAmericaCountries.contains(subTerritoryCountry)) { accSubTerritory = "C. America"; }
			else if(territoryWestAfricaCountries.contains(subTerritoryCountry)) { accSubTerritory = "W. Africa"; }
			else if(territoryNorthAfricaCountries.contains(subTerritoryCountry)) { accSubTerritory = "N. Africa"; }
			else if(territorySouthAfricaCountries.contains(subTerritoryCountry)) { accSubTerritory = "S. Africa"; }
			else if(territoryCentralAfricaCountries.contains(subTerritoryCountry)) { accSubTerritory = "C. Africa"; }
			else if(territoryEastAfricaCountries.contains(subTerritoryCountry)) { accSubTerritory = "E. Africa"; }
			if(accSubTerritory != null)
			{
				accSubTerritoryUpdateDataList = List();
				accSubTerritoryUpdateDataList.add({"Sub_Territory":accSubTerritory});
				accSubTerritoryUpdatePayload = Map();
				accSubTerritoryUpdatePayload.put("data",accSubTerritoryUpdateDataList);
				accSubTerritoryUpdatePayload.put("trigger",List({"workflow"}));
				invokeurl
				[
					url :"https://www.zohoapis.com/crm/v8/Accounts/" + preResolvedAccountId
					type :PUT
					parameters:accSubTerritoryUpdatePayload.toString()
					connection:"zcrm"
				];
				info "[Account Priority] Account Sub_Territory assigned | accountId=" + preResolvedAccountId + " | country=" + subTerritoryCountry + " | subTerritory=" + accSubTerritory;
			}
			else
			{
				info "[Account Priority] No matching sub-territory for country | accountId=" + preResolvedAccountId + " | country=" + subTerritoryCountry;
			}
		}
		else
		{
			info "[Account Priority] Account Sub_Territory not assigned | accountId=" + preResolvedAccountId + " | existing=" + existingAccSubTerritory + " | country=" + subTerritoryCountry;
		}
	}
	catch (e)
	{
		info "[Account Priority] ERROR | Account Sub_Territory assignment exception | accountId=" + preResolvedAccountId + " | error=" + e.toString();
	}
}
if(activityNameFromJson == "Account Provisioning")
{
	info "[Cloud] Account Provisioning event — Account + Contact only, no Lead/Activity/Deal/Quote" + " | accountId=" + preResolvedAccountId;
	cloudContactId = "";
	if(emailFromJson != "")
	{
		try 
		{
			cloudContactSearch = zoho.crm.searchRecords("Contacts","(Email:equals:" + emailFromJson + ")");
			if(cloudContactSearch != null && cloudContactSearch.size() > 0)
			{
				cloudContactId = cloudContactSearch.get(0).get("id").toString();
				info "[Cloud] Contact matched by Email | contactId=" + cloudContactId;
			}
		}
		catch (e)
		{
			info "[Cloud] Contact email search error | " + e.toString();
		}
	}
	if(cloudContactId == "" && preResolvedAccountId != "")
	{
		try 
		{
			cloudAccountContactSearch = zoho.crm.searchRecords("Contacts","(Account_Name:equals:" + preResolvedAccountId + ")");
			if(cloudAccountContactSearch != null && cloudAccountContactSearch.size() > 0)
			{
				cloudContactId = cloudAccountContactSearch.get(0).get("id").toString();
				info "[Cloud] Contact already exists on this Account — reusing it | contactId=" + cloudContactId;
			}
		}
		catch (e)
		{
			info "[Cloud] Account Contact search error | " + e.toString();
		}
	}
	if(cloudContactId == "")
	{
		cloudContactLastName = "Unknown";
		if(lastNameFromJson != "")
		{
			cloudContactLastName = lastNameFromJson;
		}
		cloudConMap = Map();
		cloudConMap.put("First_Name",firstNameFromJson);
		cloudConMap.put("Last_Name",cloudContactLastName);
		cloudConMap.put("Email",emailFromJson);
		if(phoneFromJson != "")
		{
			cloudConMap.put("Phone",phoneFromJson);
		}
		if(mobileFromJson != "")
		{
			cloudConMap.put("Mobile",mobileFromJson);
		}
		if(preResolvedAccountId != "")
		{
			cloudConMap.put("Account_Name",Map({"id":preResolvedAccountId}));
		}
		if(countryFromJson != "")
		{
			cloudConMap.put("Territory_Country",countryFromJson);
		}
		try
		{
			cloudConDataList = List();
			cloudConDataList.add(cloudConMap);
			cloudConCreatePayload = Map();
			cloudConCreatePayload.put("data",cloudConDataList);
			cloudConCreatePayload.put("trigger",List({"workflow"}));
			createCloudConApiResp = invokeurl
			[
				url :"https://www.zohoapis.com/crm/v8/Contacts"
				type :POST
				parameters:cloudConCreatePayload.toString()
				connection:"zcrm"
			];
			createCloudConResultId = "";
			if(createCloudConApiResp != null && createCloudConApiResp.get("data") != null && createCloudConApiResp.get("data").size() > 0)
			{
				createCloudConRecordResult = createCloudConApiResp.get("data").get(0);
				if(ifNull(createCloudConRecordResult.get("status"),"").toString() == "success")
				{
					createCloudConDetails = createCloudConRecordResult.get("details");
					if(createCloudConDetails != null)
					{
						createCloudConResultId = ifNull(createCloudConDetails.get("id"),"").toString();
					}
				}
			}
			if(createCloudConResultId != "")
			{
				cloudContactId = createCloudConResultId;
				info "[Cloud] New Contact created | contactId=" + cloudContactId;
			}
			else
			{
				info "[Cloud] ERROR | Contact creation failed";
			}
		}
		catch (e)
		{
			info "[Cloud] ERROR | Contact creation exception | error=" + e.toString();
		}
	}
	else if(preResolvedAccountId != "")
	{
		try 
		{
			cloudContactRecord = zoho.crm.getRecordById("Contacts",cloudContactId.toLong());
			cloudExistingContactAcc = "";
			cloudAccObj = cloudContactRecord.get("Account_Name");
			if(cloudAccObj != null)
			{
				cloudExistingContactAcc = ifNull(cloudAccObj.get("id"),"").toString();
			}
			if(cloudExistingContactAcc == "")
			{
				cloudContactAccountUpdateDataList = List();
				cloudContactAccountUpdateDataList.add({"Account_Name":Map({"id":preResolvedAccountId})});
				cloudContactAccountUpdatePayload = Map();
				cloudContactAccountUpdatePayload.put("data",cloudContactAccountUpdateDataList);
				cloudContactAccountUpdatePayload.put("trigger",List({"workflow"}));
				invokeurl
				[
					url :"https://www.zohoapis.com/crm/v8/Contacts/" + cloudContactId
					type :PUT
					parameters:cloudContactAccountUpdatePayload.toString()
					connection:"zcrm"
				];
				info "[Cloud] Contact.Account set | contactId=" + cloudContactId + " | accountId=" + preResolvedAccountId;
			}
			else
			{
				info "[Cloud] Contact already has Account — not overwriting | existingAccountId=" + cloudExistingContactAcc;
			}
		}
		catch (e)
		{
			info "[Cloud] Contact.Account update error | " + e.toString();
		}
	}
	cloudResultMap = Map();
	cloudResultMap.put("status","success");
	cloudResultMap.put("accountId",preResolvedAccountId);
	cloudResultMap.put("contactId",cloudContactId);
	return cloudResultMap.toString();
}
else if(activityNameFromJson == "Cloud Payment" || activityNameFromJson == "On Premise Payment")
{
	info "[Cloud] Cloud Payment event — Sales Order/Invoice only for now, no Lead/Contact/Activity/Deal/Quote";
	cloudAccountId = preResolvedAccountId;
	cloudSoId = "";
	cloudInvoiceId = "";
	cloudProductId = "";
	cloudContactId = "";
	if(emailFromJson != "")
	{
		try
		{
			cloudPaymentContactSearch = zoho.crm.searchRecords("Contacts","(Email:equals:" + emailFromJson + ")");
			if(cloudPaymentContactSearch != null && cloudPaymentContactSearch.size() > 0)
			{
				cloudContactId = cloudPaymentContactSearch.get(0).get("id").toString();
				info "[Cloud] Contact matched by Email | contactId=" + cloudContactId;
			}
		}
		catch (e)
		{
			info "[Cloud] Contact email search error | " + e.toString();
		}
	}
	if(cloudContactId == "" && cloudAccountId != "")
	{
		try
		{
			cloudPaymentAccContactSearch = zoho.crm.searchRecords("Contacts","(Account_Name:equals:" + cloudAccountId + ")");
			if(cloudPaymentAccContactSearch != null && cloudPaymentAccContactSearch.size() > 0)
			{
				cloudContactId = cloudPaymentAccContactSearch.get(0).get("id").toString();
				info "[Cloud] Contact matched by Account | contactId=" + cloudContactId;
			}
		}
		catch (e)
		{
			info "[Cloud] Account Contact search error | " + e.toString();
		}
	}
	if(activityNameFromJson == "Cloud Payment")
	{
		cloudProductName = "Ravendb Cloud";
		cloudProductSku = "RDB.CLD";
		try
		{
			cloudProductSearch = zoho.crm.searchRecords("Products","(Product_Name:equals:" + cloudProductName + ") or (Product_Code:equals:" + cloudProductSku + ")");
			if(cloudProductSearch != null && cloudProductSearch.size() > 0)
			{
				cloudProductId = cloudProductSearch.get(0).get("id").toString();
				info "[Cloud] Hardcoded product found | productId=" + cloudProductId;
			}
		}
		catch (e)
		{
			info "[Cloud] Hardcoded product search error | error=" + e.toString();
		}
		if(cloudProductId == "")
		{
			try
			{
				cloudNewProductMap = Map();
				cloudNewProductMap.put("Product_Name",cloudProductName);
				cloudNewProductMap.put("Product_Code",cloudProductSku);
				createCloudProductResp = zoho.crm.createRecord("Products",cloudNewProductMap);
				info "[Cloud] Hardcoded product create response | response=" + createCloudProductResp.toString();
				if(createCloudProductResp != null && createCloudProductResp.get("id") != null)
				{
					cloudProductId = createCloudProductResp.get("id").toString();
					info "[Cloud] Hardcoded product created | productId=" + cloudProductId;
				}
			}
			catch (e)
			{
				info "[Cloud] Hardcoded product creation error | error=" + e.toString();
			}
		}
	}
	else
	{
		cloudProductName = productNameFromJson;
		if(cloudProductName != "")
		{
			try
			{
				cloudProductSearch = zoho.crm.searchRecords("Products","(Product_Name:equals:" + cloudProductName + ")");
				if(cloudProductSearch != null && cloudProductSearch.size() > 0)
				{
					cloudProductId = cloudProductSearch.get(0).get("id").toString();
					info "[OnPremise] Product found | productId=" + cloudProductId;
				}
			}
			catch (e)
			{
				info "[OnPremise] Product search error | error=" + e.toString();
			}
			if(cloudProductId == "")
			{
				try
				{
					cloudNewProductMap = Map();
					cloudNewProductMap.put("Product_Name",cloudProductName);
					createCloudProductResp = zoho.crm.createRecord("Products",cloudNewProductMap);
					if(createCloudProductResp != null && createCloudProductResp.get("id") != null)
					{
						cloudProductId = createCloudProductResp.get("id").toString();
						info "[OnPremise] Product created | name=" + cloudProductName + " | productId=" + cloudProductId;
					}
				}
				catch (e)
				{
					info "[OnPremise] Product creation error | error=" + e.toString();
				}
			}
		}
	}
	cloudProductLineItems = List();
	if(cloudProductId != "")
	{
		cloudProductLineItem = Map();
		cloudProductLineItem.put("product",Map({"id":cloudProductId}));
		cloudProductLineItem.put("quantity",1);
		cloudProductLineItems.add(cloudProductLineItem);
	}
	if(cloudProductLineItems.size() == 0)
	{
		cloudErrorResultMap = Map();
		cloudErrorResultMap.put("status","error");
		cloudErrorResultMap.put("message","Could not find or create product '" + cloudProductName + "'");
		cloudErrorResultMap.put("accountId",cloudAccountId);
		return cloudErrorResultMap.toString();
	}
	existingCloudSO = null;
	if(paymentGroupIdFromJson != "")
	{
		try 
		{
			if(cloudAccountId != "")
			{
				existingCloudSO = zoho.crm.searchRecords("Sales_Orders","(Payment_Group_Id:equals:" + paymentGroupIdFromJson + ") and (Account_Name:equals:" + cloudAccountId + ")");
			}
			else
			{
				existingCloudSO = zoho.crm.searchRecords("Sales_Orders","(Payment_Group_Id:equals:" + paymentGroupIdFromJson + ")");
			}
		}
		catch (e)
		{
			info "[Cloud] Sales_Orders search error | " + e.toString();
		}
	}
	if(existingCloudSO != null && existingCloudSO.size() > 0)
	{
		cloudSoId = existingCloudSO.get(0).get("id").toString();
		info "[Cloud] Existing Sales Order found (renewal) | soId=" + cloudSoId;
	}
	else
	{
		cloudSoMap = Map();
		cloudSoName = "Cloud Account";
		if(companyFromJson != "")
		{
			cloudSoName = companyFromJson;
		}
		cloudSoMap.put("Subject",cloudSoName + " - Cloud SO");
		cloudSoMap.put("Status","Fully Paid");
		cloudSoMap.put("Product_Details",cloudProductLineItems);
		if(paymentGroupIdFromJson != "")
		{
			cloudSoMap.put("Payment_Group_Id",paymentGroupIdFromJson);
		}
		if(cloudAccountId != "")
		{
			cloudSoMap.put("Account_Name",Map({"id":cloudAccountId}));
		}
		if(cloudContactId != "")
		{
			cloudSoMap.put("Contact_Name",Map({"id":cloudContactId}));
		}
		try
		{
			createCloudSOResp = zoho.crm.createRecord("Sales_Orders",cloudSoMap);
			info "[Cloud] Sales Order create response | fields=" + cloudSoMap.toString() + " | response=" + createCloudSOResp.toString();
			if(createCloudSOResp != null && createCloudSOResp.get("id") != null)
			{
				cloudSoId = createCloudSOResp.get("id").toString();
				info "[Cloud] Sales Order created | soId=" + cloudSoId;
			}
			else
			{
				info "[Cloud] ERROR | Sales Order creation failed | response=" + createCloudSOResp.toString();
			}
		}
		catch (e)
		{
			info "[Cloud] ERROR | Sales Order creation exception | error=" + e.toString();
		}
	}
	if(cloudSoId == "")
	{
		info "[Cloud] ABORTING | Sales Order was not created, so no Invoice will be created either";
		cloudErrorResultMap = Map();
		cloudErrorResultMap.put("status","error");
		cloudErrorResultMap.put("message","Sales Order creation failed for Cloud Payment event");
		cloudErrorResultMap.put("accountId",cloudAccountId);
		return cloudErrorResultMap.toString();
	}
	if(cloudSoId != "")
	{
		cloudInvMap = Map();
		cloudInvMap.put("Subject","Invoice - " + invoiceIdFromJson);
		cloudInvoiceLineItems = List();
		for each  cloudInvoiceProductLineItem in cloudProductLineItems
		{
			cloudInvoiceLineItem = Map();
			cloudInvoiceLineItem.put("product",cloudInvoiceProductLineItem.get("product"));
			cloudInvoiceLineItem.put("quantity",cloudInvoiceProductLineItem.get("quantity"));
			cloudInvoiceLineItem.put("list_price",amountFromJson);
			cloudInvoiceLineItems.add(cloudInvoiceLineItem);
		}
		cloudInvMap.put("Product_Details",cloudInvoiceLineItems);
		cloudInvMap.put("Sales_Order",Map({"id":cloudSoId}));
		cloudInvMap.put("Status","Paid");
		if(paymentDateFromJson != "")
		{
			cloudInvMap.put("Invoice_Date",paymentDateFromJson.getPrefix("T"));
		}
		if(cloudAccountId != "")
		{
			cloudInvMap.put("Account_Name",Map({"id":cloudAccountId}));
		}
		if(cloudContactId != "")
		{
			cloudInvMap.put("Contact_Name",Map({"id":cloudContactId}));
		}
		try
		{
			createCloudInvResp = zoho.crm.createRecord("Invoices",cloudInvMap);
			if(createCloudInvResp != null && createCloudInvResp.get("id") != null)
			{
				cloudInvoiceId = createCloudInvResp.get("id").toString();
				info "[Cloud] Invoice created | invoiceId=" + cloudInvoiceId;
			}
			else
			{
				info "[Cloud] ERROR | Invoice creation failed";
			}
		}
		catch (e)
		{
			info "[Cloud] ERROR | Invoice creation exception | error=" + e.toString();
		}
	}
	if(cloudAccountId != "")
	{
		try
		{
			cloudPayingAccountMap = Map();
			cloudPayingAccountMap.put("Account_State","Paying Customer");
			cloudPayingAccountUpdateDataList = List();
			cloudPayingAccountUpdateDataList.add(cloudPayingAccountMap);
			cloudPayingAccountUpdatePayload = Map();
			cloudPayingAccountUpdatePayload.put("data",cloudPayingAccountUpdateDataList);
			cloudPayingAccountUpdatePayload.put("trigger",List({"workflow"}));
			invokeurl
			[
				url :"https://www.zohoapis.com/crm/v8/Accounts/" + cloudAccountId
				type :PUT
				parameters:cloudPayingAccountUpdatePayload.toString()
				connection:"zcrm"
			];
			info "[Cloud] Account state updated to Paying Customer" + " | accountId=" + cloudAccountId;
		}
		catch (e)
		{
			info "[Cloud] ERROR | Account state update exception" + " | error=" + e.toString();
		}
	}
	cloudResultMap = Map();
	cloudResultMap.put("status","success");
	cloudResultMap.put("accountId",cloudAccountId);
	cloudResultMap.put("soId",cloudSoId);
	cloudResultMap.put("invoiceId",cloudInvoiceId);
	return cloudResultMap.toString();
}
if(emailFromJson == "" && zohoAccountResolvedId != "")
{
	info "[HandleLeadEventSubmission] Email missing from payload — trying to resolve via ZohoAccountID" + " | accountId=" + zohoAccountResolvedId;
	try
	{
		accEmailContactSearch = zoho.crm.searchRecords("Contacts","(Account_Name:equals:" + zohoAccountResolvedId + ")");
		if(accEmailContactSearch != null)
		{
			for each accEmailContact in accEmailContactSearch
			{
				if(emailFromJson == "")
				{
					candidateContactEmail = ifNull(accEmailContact.get("Email"),"").toString().trim();
					if(candidateContactEmail != "")
					{
						emailFromJson = candidateContactEmail;
						info "[HandleLeadEventSubmission] Email resolved from Account's Contact" + " | email=" + emailFromJson;
					}
				}
			}
		}
	}
	catch (e)
	{
		info "[HandleLeadEventSubmission] Account Contact email lookup error | error=" + e.toString();
	}
	if(emailFromJson == "")
	{
		try
		{
			accEmailLeadSearch = zoho.crm.searchRecords("Leads","(Account:equals:" + zohoAccountResolvedId + ")");
			if(accEmailLeadSearch != null)
			{
				for each accEmailLead in accEmailLeadSearch
				{
					if(emailFromJson == "")
					{
						candidateLeadEmail = ifNull(accEmailLead.get("Email"),"").toString().trim();
						if(candidateLeadEmail != "")
						{
							emailFromJson = candidateLeadEmail;
							info "[HandleLeadEventSubmission] Email resolved from Account's Lead" + " | email=" + emailFromJson;
						}
					}
				}
			}
		}
		catch (e)
		{
			info "[HandleLeadEventSubmission] Account Lead email lookup error | error=" + e.toString();
		}
	}
}
if(emailFromJson == "")
{
	info "[HandleLeadEventSubmission] ERROR | Email is required but missing/unresolvable. Aborting.";
	emailErrorResultMap = Map();
	emailErrorResultMap.put("status","error");
	emailErrorResultMap.put("message","Email is required");
	return emailErrorResultMap.toString();
}
productParamsRaw = webActivityJson.get("Product_Parameters");
productParamsList = List();
if(productParamsRaw != null)
{
	isSingleObject = true;
	try 
	{
		testVal = productParamsRaw.get("Product_Name");
	}
	catch (e)
	{
		isSingleObject = false;
	}
	if(isSingleObject)
	{
		productParamsList.add(productParamsRaw);
	}
	else
	{
		productParamsList = productParamsRaw;
	}
}
else
{
	flatProductNameFromJson = ifNull(webActivityJson.get("ProductName"),"").toString().trim();
	if(flatProductNameFromJson != "")
	{
		flatProductEntry = Map();
		flatProductEntry.put("Product_Name",flatProductNameFromJson);
		productParamsList.add(flatProductEntry);
	}
}
productLineItems = List();
dealProductLineItems = List();
purchaseProductIds = List();
unresolvedProductNames = List();
for each  productEntry in productParamsList
{
	productEntryMap = Map();
	try 
	{
		productEntryMap = productEntry.toMap();
	}
	catch (e)
	{
		productEntryMap = productEntry;
	}
	entryProductName = ifNull(productEntryMap.get("Product_Name"),"").toString().trim();
	if(entryProductName != "")
	{
		entryProductRecId = "";
		try 
		{
			productSearch = zoho.crm.searchRecords("Products","(Product_Name:equals:" + entryProductName + ")");
			if(productSearch != null && productSearch.size() > 0)
			{
				entryProductRecId = productSearch.get(0).get("id").toString();
			}
			else
			{
				try
				{
					newProductMap = Map();
					newProductMap.put("Product_Name",entryProductName);
					createNewProductResp = zoho.crm.createRecord("Products",newProductMap);
					if(createNewProductResp != null && createNewProductResp.get("id") != null)
					{
						entryProductRecId = createNewProductResp.get("id").toString();
						info "[Product] Created new Product record | name=" + entryProductName + " | productId=" + entryProductRecId;
					}
					else
					{
						unresolvedProductNames.add(entryProductName);
					}
				}
				catch (e)
				{
					unresolvedProductNames.add(entryProductName + " (create error)");
				}
			}
		}
		catch (e)
		{
			unresolvedProductNames.add(entryProductName + " (search error)");
		}
		if(entryProductRecId != "")
		{
			lineItem = Map();
			lineItem.put("product",Map({"id":entryProductRecId}));
			lineItem.put("quantity",1);
			productLineItems.add(lineItem);
			dealLineItem = Map();
			dealLineItem.put("Product_Name",Map({"id":entryProductRecId}));
			dealLineItem.put("Quantity",1);
			dealProductLineItems.add(dealLineItem);
			purchaseProductIds.add(entryProductRecId);
		}
	}
}
productSummary = "[Product] Resolved " + productLineItems.size() + "/" + productParamsList.size();
if(unresolvedProductNames.size() > 0)
{
	productSummary = productSummary + " | Not found: " + unresolvedProductNames.toString();
}
info productSummary;
matchInput = Map();
matchInput.put("Email",emailFromJson);
matchInput.put("FirstName",firstNameFromJson);
matchInput.put("LastName",lastNameFromJson);
matchInput.put("FullName",fullNameFromJson);
matchInput.put("Company",companyFromJson);
matchInput.put("Phone",phoneFromJson);
matchInput.put("Mobile",mobileFromJson);
matchInput.put("PhoneNumber",phoneNumberFromJson);
matchInput.put("ExternalId",externalIdFromJson);
matchInput.put("Category",categoryFromJson);
matchInput.put("Action",actionFromJson);
matchInput.put("Label",labelFromJson);
matchInput.put("Source",sourceFromJson);
matchInput.put("Country",countryFromJson);
matchInput.put("GClId",gclidFromJson);
matchInput.put("Gbraid",gbraidFromJson);
matchInput.put("Wbraid",wbraidFromJson);
matchInput.put("Fbc",fbcFromJson);
matchInput.put("Designation",jobTitleFromJson);
matchInput.put("Industry",industryFromJson);
matchInput.put("HowPlanToUse",howPlanToUseFromJson);
matchInput.put("HowHeardAboutRDB",howHeardFromJson);
matchInput.put("ZohoAccId",zohoAccIdFromJson);
matchInput.put("ActivityName",activityNameFromJson);
matchInput.put("PreResolvedAccountId",preResolvedAccountId);
matchInput.put("Customer_ID",customerIdFromPayload);
matchInput.put("MarketingConsent",marketingConsent);
matchInput.put("AcceptTerms",acceptTerms);
matchInput.put("PrivacyPolicyAccepted",privacyPolicyAccepted);
matchInput.put("DomainName",domainNameFromJson);
matchInput.put("LicenseId",licenseIdFromJson);
matchInput.put("AccountId",accountIdFromJson);
matchInput.put("CloudAccountId",cloudAccountIdFromJson);
matchInput.put("FormUrl",formUrlFromJson);
matchInput.put("Platform",platformFromJson);
matchInput.put("Version",versionFromJson);
matchInput.put("Channel",channelFromJson);
utmsMap = Map();
utmsMap.put("utm_source",utmSourceFromPayload);
utmsMap.put("utm_medium",utmMediumFromPayload);
utmsMap.put("utm_campaign",utmCampaignFromPayload);
utmsMap.put("utm_term",utmTermFromPayload);
utmsMap.put("utm_content",utmContentFromPayload);
matchInput.put("Utms",utmsMap);
leadId = "";
contactId = "";
accountId = "";
webActivityId = "";
try 
{
	matchResultString = standalone.ResolveLeadContactAccountLeadActivity(matchInput);
	matchResult = matchResultString.toMap();
	leadId = ifNull(matchResult.get("leadId"),"").toString();
	contactId = ifNull(matchResult.get("contactId"),"").toString();
	accountId = ifNull(matchResult.get("accountId"),"").toString();
	webActivityId = ifNull(matchResult.get("webActivityId"),"").toString();
}
catch (e)
{
	info "[HandleLeadEventSubmission] ERROR | ResolveLeadContactAccountLeadActivity exception | error=" + e.toString();
}
matchedAccountId = accountId;
customerAccountId = "";
if(leadId == "")
{
	info "[HandleLeadEventSubmission] ERROR | Matching function returned no Lead. Aborting.";
	noLeadErrorResultMap = Map();
	noLeadErrorResultMap.put("status","error");
	noLeadErrorResultMap.put("message","Matching function returned no Lead");
	return noLeadErrorResultMap.toString();
}
info "[HandleLeadEventSubmission] Matching complete" + " | leadId=" + leadId + " | contactId=" + contactId + " | matchedAccountId=" + matchedAccountId + " | webActivityId=" + webActivityId;
if(customerIdFromPayload != "" && customerIdResolvedAccountId == "" && accountId != "")
{
	existingMappingForAccount = null;
	try 
	{
		existingMappingForAccount = zoho.crm.searchRecords("OrdersCustomerIds","(Account_Name:equals:" + accountId + ")");
	}
	catch (e)
	{
		info "[Customer ID] OrdersCustomerIds account-lookup error | " + e.toString();
	}
	if(existingMappingForAccount != null && existingMappingForAccount.size() > 0)
	{
		existingMappingRecord = existingMappingForAccount.get(0);
		existingMappingCustomerId = ifNull(existingMappingRecord.get("Name"),"").toString();
		if(existingMappingCustomerId == customerIdFromPayload)
		{
			info "[Customer ID] Account already correctly linked to this Customer_ID — nothing to do";
		}
		else
		{
			info "[Customer ID] Account already linked to a DIFFERENT Customer_ID — not overwriting (one Account = one Customer_ID)" + " | accountId=" + accountId + " | existingCustomerId=" + existingMappingCustomerId + " | thisCustomerId=" + customerIdFromPayload;
			try 
			{
				conflictAccountRecord = zoho.crm.getRecordById("Accounts",accountId.toLong());
				if(conflictAccountRecord != null)
				{
					conflictOwnerEmail = "";
					conflictOwnerObj = conflictAccountRecord.get("Owner");
					if(conflictOwnerObj != null)
					{
						conflictOwnerEmail = ifNull(conflictOwnerObj.get("email"),"").toString().trim();
					}
					if(conflictOwnerEmail != "")
					{
						sendmail
						[
							from :zoho.loginuserid
							to :conflictOwnerEmail
							subject :"Review needed - Account already linked to a different Customer ID"
							message :"ZohoAccountID resolved this event to Account " + accountId + ", but that Account is already linked to Customer_ID " + existingMappingCustomerId + " in OrdersCustomerIds. This event's Customer_ID is " + customerIdFromPayload + ". Please review and reconcile which one is correct."
						]
						info "[Customer ID] Owner notified of Customer_ID conflict" + " | email=" + conflictOwnerEmail;
					}
				}
			}
			catch (e)
			{
				info "[Customer ID] Conflict notification error | " + e.toString();
			}
		}
	}
	else
	{
		ordersCustomerData = Map();
		ordersCustomerData.put("Name",customerIdFromPayload);
		accountLookup = Map();
		accountLookup.put("id",accountId);
		ordersCustomerData.put("Account_Name",accountLookup);
		try 
		{
			createOrdersCustomer = zoho.crm.createRecord("OrdersCustomerIds",ordersCustomerData);
			info "[Customer ID] OrdersCustomerIds record created" + " | Customer_ID=" + customerIdFromPayload + " | accountId=" + accountId + " | response=" + createOrdersCustomer;
		}
		catch (e)
		{
			info "[Customer ID] Create error | " + e.toString();
		}
	}
}
info "[Customer ID] FINAL accountId=" + accountId;
dealName = "";
if(companyFromJson != "")
{
	dealName = companyFromJson;
}
else
{
	dealName = (firstNameFromJson + " " + lastNameFromJson).trim();
}
dealId = "";
quoteId = "";
soId = "";
invoiceId = "";
isPurchase = false;
isFreeDownload = false;
isLead = false;
if(paymentGroupIdFromJson != "")
{
	isPurchase = true;
	info "[Event Resolve] Purchase detected" + " | PaymentGroupId=" + paymentGroupIdFromJson;
}
else
{
	info "[Event Resolve] PaymentGroupId not found. Checking Free_Download_Activities" + " | Action=" + actionFromJson + " | Category=" + categoryFromJson + " | Label=" + labelFromJson;
	if(actionFromJson != "" && categoryFromJson != "" && labelFromJson != "")
	{
		freeDownloadCriteria = "(Name:equals:" + actionFromJson + ")" + " and (Category:equals:" + categoryFromJson + ")" + " and (Label:equals:" + labelFromJson + ")";
		info "[Event Resolve] Free Download criteria=" + freeDownloadCriteria;
		try 
		{
			freeDownloadRecords = zoho.crm.searchRecords("Free_Download_Activities",freeDownloadCriteria);
			if(freeDownloadRecords != null)
			{
				info "[Event Resolve] Free Download search completed" + " | recordsFound=" + freeDownloadRecords.size();
				if(freeDownloadRecords.size() > 0)
				{
					isFreeDownload = true;
					info "[Event Resolve] Free Download detected" + " | Action=" + actionFromJson + " | Category=" + categoryFromJson + " | Label=" + labelFromJson;
				}
				else
				{
					isLead = true;
					info "[Event Resolve] No Free Download match. Treating as Lead.";
				}
			}
			else
			{
				isLead = true;
				info "[Event Resolve] Free Download search returned null. Treating as Lead.";
			}
		}
		catch (e)
		{
			isLead = true;
			info "[Event Resolve] Free_Download_Activities search failed" + " | criteria=" + freeDownloadCriteria + " | error=" + e.toString() + " | Treating as Lead.";
		}
	}
	else
	{
		isLead = true;
		info "[Event Resolve] Action/Category/Label incomplete. Treating as Lead.";
	}
}
if(isFreeDownload)
{
	try 
	{
		currentLeadRecordForTrial = zoho.crm.getRecordById("Leads",leadId.toLong());
		currentLeadStatusForTrial = "";
		if(currentLeadRecordForTrial != null)
		{
			currentLeadStatusForTrial = ifNull(currentLeadRecordForTrial.get("Lead_Status"),"").toString();
		}
		if(currentLeadStatusForTrial == "New")
		{
			leadUpdateMap = Map();
			leadUpdateMap.put("Lead_Status","Trial");
			updateLeadResp = zoho.crm.updateRecord("Leads",leadId.toLong(),leadUpdateMap);
			if(updateLeadResp != null && updateLeadResp.get("id") != null)
			{
				info "[FreeDownload] Lead status updated to Trial (was New)" + " | leadId=" + leadId;
			}
			else
			{
				info "[FreeDownload] ERROR | Lead status update failed" + " | leadId=" + leadId;
			}
		}
		else
		{
			info "[FreeDownload] Lead status left unchanged — not New, status never moves backward" + " | leadId=" + leadId + " | currentStatus=" + currentLeadStatusForTrial;
		}
	}
	catch (e)
	{
		info "[FreeDownload] ERROR | Lead status check/update exception" + " | error=" + e.toString();
	}
	if(accountId != "")
	{
		try
		{
			trialAccountUpdate = Map();
			trialAccountUpdate.put("Trial_Flag",true);
			trialAccountUpdate.put("Sub_Status","Free Trial");
			trialAccountUpdateDataList = List();
			trialAccountUpdateDataList.add(trialAccountUpdate);
			trialAccountUpdatePayload = Map();
			trialAccountUpdatePayload.put("data",trialAccountUpdateDataList);
			trialAccountUpdatePayload.put("trigger",List({"workflow"}));
			invokeurl
			[
				url :"https://www.zohoapis.com/crm/v8/Accounts/" + accountId
				type :PUT
				parameters:trialAccountUpdatePayload.toString()
				connection:"zcrm"
			];
			info "[FreeDownload] Account Trial_Flag and Sub_Status set" + " | accountId=" + accountId;
		}
		catch (e)
		{
			info "[FreeDownload] ERROR | Account Trial update exception" + " | error=" + e.toString();
		}
	}
}
if(isPurchase)
{
	info "[Purchase] Starting Purchase flow" + " | PaymentGroupId=" + paymentGroupIdFromJson;
	if(productLineItems.size() == 0)
	{
		info "[Purchase] ERROR | No products could be resolved in Zoho. Product line item is mandatory — aborting.";
		noProductErrorResultMap = Map();
		noProductErrorResultMap.put("status","error");
		noProductErrorResultMap.put("message","No products could be resolved in Zoho for this Purchase event");
		noProductErrorResultMap.put("accountId",accountId);
		return noProductErrorResultMap.toString();
	}
	existingSO = null;
	try 
	{
		if(accountId != "")
		{
			existingSO = zoho.crm.searchRecords("Sales_Orders","(Payment_Group_Id:equals:" + paymentGroupIdFromJson + ") and (Account_Name:equals:" + accountId + ")");
		}
		else
		{
			existingSO = zoho.crm.searchRecords("Sales_Orders","(Payment_Group_Id:equals:" + paymentGroupIdFromJson + ")");
		}
	}
	catch (e)
	{
		info "[Purchase] Sales_Orders search error | " + e.toString();
	}
	isRenewal = existingSO != null && existingSO.size() > 0;
	if(isRenewal)
	{
		soRecord = existingSO.get(0);
		soId = soRecord.get("id").toString();
		dealObj = soRecord.get("Deal_Name");
		if(dealObj != null)
		{
			dealId = ifNull(dealObj.get("id"),"").toString();
		}
		quoteObj = soRecord.get("Quote_Name");
		if(quoteObj != null)
		{
			quoteId = ifNull(quoteObj.get("id"),"").toString();
		}
		if(dealId == "")
		{
			backfillDealMap = Map();
			backfillDealMap.put("Deal_Name",dealName + " - Purchase");
			backfillDealMap.put("Stage","Closed Won");
			backfillDealMap.put("Lead_Name",Map({"id":leadId}));
			if(accountId != "")
			{
				backfillDealMap.put("Account_Name",Map({"id":accountId}));
			}
			if(contactId != "")
			{
				backfillDealMap.put("Contact_Name",Map({"id":contactId}));
			}
			backfillDealMap.put("Product_Details",dealProductLineItems);
			try 
			{
				backfillDealResp = zoho.crm.createRecord("Deals",backfillDealMap);
				if(backfillDealResp != null && backfillDealResp.get("id") != null)
				{
					dealId = backfillDealResp.get("id").toString();
					try 
					{
						zoho.crm.updateRecord("Sales_Orders",soId.toLong(),{"Deal_Name":Map({"id":dealId})});
						info "[Purchase] Backfilled missing Deal on renewal Sales Order" + " | soId=" + soId + " | dealId=" + dealId;
					}
					catch (e)
					{
						info "[Purchase] ERROR | Backfill Deal_Name on Sales Order failed" + " | error=" + e.toString();
					}
				}
			}
			catch (e)
			{
				info "[Purchase] ERROR | Backfill Deal creation exception" + " | error=" + e.toString();
			}
		}
	}
	else
	{
		dealMap = Map();
		dealMap.put("Deal_Name",dealName + " - Purchase");
		dealMap.put("Stage","Closed Won");
		dealMap.put("Lead_Name",Map({"id":leadId}));
		if(accountId != "")
		{
			dealMap.put("Account_Name",Map({"id":accountId}));
		}
		if(contactId != "")
		{
			dealMap.put("Contact_Name",Map({"id":contactId}));
		}
		dealMap.put("Product_Details",dealProductLineItems);
		try 
		{
			createDealResp = zoho.crm.createRecord("Deals",dealMap);
			if(createDealResp != null && createDealResp.get("id") != null)
			{
				dealId = createDealResp.get("id").toString();
			}
		}
		catch (e)
		{
			info "[Purchase] ERROR | Deal creation exception" + " | error=" + e.toString();
		}
		if(dealId != "")
		{
			quoteMap = Map();
			quoteMap.put("Subject",dealName + " - Quote");
			quoteMap.put("Deal_Name",Map({"id":dealId}));
			quoteMap.put("Quote_Stage","Closed Won");
			quoteMap.put("Lead_Name",Map({"id":leadId}));
			if(accountId != "")
			{
				quoteMap.put("Account_Name",Map({"id":accountId}));
			}
			if(contactId != "")
			{
				quoteMap.put("Contact_Name",Map({"id":contactId}));
			}
			quoteMap.put("Product_Details",productLineItems);
			try 
			{
				createQuoteResp = zoho.crm.createRecord("Quotes",quoteMap);
				if(createQuoteResp != null && createQuoteResp.get("id") != null)
				{
					quoteId = createQuoteResp.get("id").toString();
				}
			}
			catch (e)
			{
				info "[Purchase] ERROR | Quote creation exception" + " | error=" + e.toString();
			}
		}
		soMap = Map();
		soMap.put("Subject",dealName + " - SO");
		if(dealId != "")
		{
			soMap.put("Deal_Name",Map({"id":dealId}));
		}
		if(quoteId != "")
		{
			soMap.put("Quote_Name",Map({"id":quoteId}));
		}
		soMap.put("Lead_Name",Map({"id":leadId}));
		soMap.put("Status","Fully Paid");
		soMap.put("Payment_Group_Id",paymentGroupIdFromJson);
		if(accountId != "")
		{
			soMap.put("Account_Name",Map({"id":accountId}));
		}
		if(contactId != "")
		{
			soMap.put("Contact_Name",Map({"id":contactId}));
		}
		soMap.put("Product_Details",productLineItems);
		try 
		{
			createSOResp = zoho.crm.createRecord("Sales_Orders",soMap);
			if(createSOResp != null && createSOResp.get("id") != null)
			{
				soId = createSOResp.get("id").toString();
			}
		}
		catch (e)
		{
			info "[Purchase] ERROR | Sales Order creation exception" + " | error=" + e.toString();
		}
	}
	if(soId != "")
	{
		existingInvoiceId = "";
		if(invoiceIdFromJson != "")
		{
			try 
			{
				existingInvoiceSearch = zoho.crm.searchRecords("Invoices","(Invoice_ID:equals:" + invoiceIdFromJson + ")");
				if(existingInvoiceSearch != null && existingInvoiceSearch.size() > 0)
				{
					existingInvoiceRecord = existingInvoiceSearch.get(0);
					if(existingInvoiceRecord != null)
					{
						existingInvoiceId = ifNull(existingInvoiceRecord.get("id"),"").toString();
					}
				}
			}
			catch (e)
			{
				info "[Purchase] Invoice existing-check error | " + e.toString();
			}
		}
		if(existingInvoiceId != "")
		{
			invoiceId = existingInvoiceId;
			info "[Purchase] Invoice already exists for this Invoice_ID — skipping creation" + " | invoiceId=" + invoiceId + " | Invoice_ID=" + invoiceIdFromJson;
		}
		else
		{
			invMap = Map();
			invMap.put("Subject","Invoice - " + invoiceIdFromJson);
			invMap.put("Invoice_ID",invoiceIdFromJson);
			invMap.put("Sales_Order",Map({"id":soId}));
			invMap.put("Lead_Name",Map({"id":leadId}));
			invMap.put("Status","Paid");
			if(paymentDateFromJson != "")
			{
				invMap.put("Invoice_Date",paymentDateFromJson.getPrefix("T"));
			}
			if(accountId != "")
			{
				invMap.put("Account_Name",Map({"id":accountId}));
			}
			if(contactId != "")
			{
				invMap.put("Contact_Name",Map({"id":contactId}));
			}
			invoiceLineItems = List();
			for each  invoiceProductLineItem in productLineItems
			{
				invoiceLineItem = Map();
				invoiceLineItem.put("product",invoiceProductLineItem.get("product"));
				invoiceLineItem.put("quantity",invoiceProductLineItem.get("quantity"));
				invoiceLineItem.put("list_price",amountFromJson);
				invoiceLineItems.add(invoiceLineItem);
			}
			invMap.put("Product_Details",invoiceLineItems);
			try 
			{
				createInvResp = zoho.crm.createRecord("Invoices",invMap);
				if(createInvResp != null && createInvResp.get("id") != null)
				{
					invoiceId = createInvResp.get("id").toString();
				}
			}
			catch (e)
			{
				info "[Purchase] ERROR | Invoice creation exception" + " | error=" + e.toString();
			}
		}
	}
	try 
	{
		leadCloseMap = Map();
		leadCloseMap.put("Lead_Status","Closed/Won");
		zoho.crm.updateRecord("Leads",leadId.toLong(),leadCloseMap);
		info "[Purchase] Lead status updated to Closed/Won" + " | leadId=" + leadId;
	}
	catch (e)
	{
		info "[Purchase] ERROR | Lead status update exception" + " | error=" + e.toString();
	}
	if(accountId != "")
	{
		try
		{
			payingAccountMap = Map();
			payingAccountMap.put("Account_State","Paying Customer");
			payingAccountUpdateDataList = List();
			payingAccountUpdateDataList.add(payingAccountMap);
			payingAccountUpdatePayload = Map();
			payingAccountUpdatePayload.put("data",payingAccountUpdateDataList);
			payingAccountUpdatePayload.put("trigger",List({"workflow"}));
			invokeurl
			[
				url :"https://www.zohoapis.com/crm/v8/Accounts/" + accountId
				type :PUT
				parameters:payingAccountUpdatePayload.toString()
				connection:"zcrm"
			];
			info "[Purchase] Account state updated to Paying Customer" + " | accountId=" + accountId;
		}
		catch (e)
		{
			info "[Purchase] ERROR | Account state update exception" + " | error=" + e.toString();
		}
	}
	purchaseModeLabel = "First payment";
	if(isRenewal)
	{
		purchaseModeLabel = "Renewal";
	}
	info "[Purchase] " + purchaseModeLabel + " completed" + " | dealId=" + dealId + " | quoteId=" + quoteId + " | soId=" + soId + " | invoiceId=" + invoiceId;
}
if(isLead)
{
	info "[Lead] Normal Lead detected | No additional action required.";
}
resultMap = Map();
resultMap.put("status","success");
resultMap.put("leadId",leadId);
resultMap.put("contactId",contactId);
resultMap.put("accountId",accountId);
resultMap.put("webActivityId",webActivityId);
resultMap.put("dealId",dealId);
resultMap.put("quoteId",quoteId);
resultMap.put("soId",soId);
resultMap.put("invoiceId",invoiceId);
info "[HandleLeadEventSubmission] END";
return resultMap.toString();
}