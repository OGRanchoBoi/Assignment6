function MenuChoice()

{
    if (document.getElementById("menu").value == "Add Customer")
    {
        document.getElementById("createnew").style.visibility="visible";
        document.getElementById("update").style.visibility="hidden";
        document.getElementById("delete").style.visibility="hidden";
    }
    
    else if (document.getElementById("menu").value == "Update Order Address")
    {
        document.getElementById("createnew").style.visibility="hidden";
        document.getElementById("update").style.visibility="visible";
        document.getElementById("delete").style.visibility="hidden";
    }
    
    else if (document.getElementById("menu").value == "Delete Customer")
    {
        document.getElementById("createnew").style.visibility="hidden";
        document.getElementById("update").style.visibility="hidden";
        document.getElementById("delete").style.visibility="visible";
    }
    else
    {
        document.getElementById("createnew").style.visibility="hidden";
        document.getElementById("update").style.visibility="hidden";
        document.getElementById("delete").style.visibility="hidden";
    }
}

function CreateCustomer()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCustomer/";
    
    //Collect customer data from web page
    
    var customerid = document.getElementById("custid").value;
    var customername = document.getElementById("custname").value;
    var customercity = document.getElementById("custcity").value;
    
    //Create the parameter string
    
    var newcustomer = '{"CustomerID":"' + customerid + '","CompanyName": "' + customername + '","CustomerCity": "' + customercity + '"}';
    
    // Checking for AJAX operation return
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult(result);
        }
    };
    // Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Conent-type", "application/x-www-form-urlencoded");
    objRequest.send(newcustomer);
    
    
}


function OperationResult(output)
{
    if (output.WasSuccessful == 1)
    {
        document.getElementById("result").innerHTML = "The operation was successful!";
    }
    else
    {
        document.getElementById("result").innerHTML = "The operation was not successful" + "<br>" + output.Exception;
    }
}

function ChangeAddress()

{
    
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/updateOrderAddress";
    
    //Collect customer data from web page
    
    var ordernum = document.getElementById("custorder").value;
    var shipname = document.getElementById("shipname").value;
    var address = document.getElementById("address").value;
    var custcity = document.getElementById("custcity").value;
    var postcode = document.getElementById("custnum").value;
    
    //Create the parameter string
    
    var changeaddress = '{"OrderID":"' + ordernum + '","ShipAddress": "' + address + '","ShipCity": "' + custcity + '","ShipName": "' + shipname + '","ShipPostCode": "' + postcode + '"}';
    
    // Checking for AJAX operation return
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult2(result);
        }
    };
    // Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Conent-type", "application/x-www-form-urlencoded");
    objRequest.send(changeaddress);
    
    
}


function OperationResult2(output)
{
    if (output.updateOrderAddress == 1)
    {
        document.getElementById("result2").innerHTML = "The operation was successful!";
    }
    else
    {
        document.getElementById("result2").innerHTML = "The operation was not successful" + "<br>" + output.Exception;
    }
}

function DeleteCustomer()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/deleteCustomer/";
    url += document.getElementById("custid");
    
    objRequest.onreadystatechange = function ()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            GenerateOutput(output);
        }
    };
    objRequest.open("GET",url,true);
    objRequest.send();
}


function GenerateOutput(result)

{
    if (result.DeleteCustomerResult.WasSuccessful) {
        document.getElementById("result3").innerHTML = "The deletion was successful!";
    }
    
    else {
        document.getElementById("result3").innerHTML = "The deletion was not successful" + "<br>" + result.DeleteCustomerResult.Exception;
    }
    
    
}