$(document).ready(function () {
    

    $('#btn-subs').click(function () {

        $.ajax({
            url: "http://localhost:5000/getCustomerInfo",
            type: 'GET',
            dataType: 'json', // added data type
            success: function(res) {
                
                let html = ``
                let html2 = ``
                res.map(function (data) {
                 console.log(Object.keys(data));

                    html = `
                    <tr>
                      <th>subscriptionId</th>
                      <th>fullname</th>
                      <th>address</th>
                      <th>locationName</th>
                      <th>subCityName</th>
                      <th>cityName</th>
                      <th>brand</th>
                      <th>phoneNumber</th>
                      <th>distributorNumber</th>

                    </tr>

                   
                  `
                    html2 += `
                    
                    <tr>
                    <td>${data.subscriptionId}</td>
                    <td>${data.fullname}</td>
                    <td>${data.address}</td>
                    <td>${data.locationName}</td>
                    <td>${data.subCityName}</td>
                    <td>${data.cityName}</td>
                    <td>${data.brand}</td>
                    <td>${data.phoneNumber}</td>
                    <td>${data.distributorNumber}</td>
                  </tr>
                    `
                  $("#columns").html(html);
                  $("#body").html(html2);
                })
            
            },
            error: function () {
                console.log("error");
            }
        });
    })
    $('#btn-order').click(function () {

        $.ajax({
            url: "http://localhost:5000/getSubscriptionOrders",
            type: 'GET',
            dataType: 'json', // added data type
            success: function(res) {
                
                let html3 = ``
                let html4 = ``
                res.map(function (data) {
                 console.log(Object.keys(data));

                    html3 = `
                    <tr>
                      <th>orderId</th>
                      <th>subscriptionId</th>
                      <th>deliveryDate</th>
                      <th>paymentMethod</th>
                      <th>products</th>
                      <th>totalAmount</th>
                      <th>status</th>
                    </tr>

                   
                  `
                    html4 += `
                    
                    <tr>
                    <td>${data.orderId}</td>
                    <td>${data.subscriptionId}</td>
                    <td>${data.deliveryDate}</td>
                    <td>${data.paymentMethod}</td>
                    <td>${data.products}</td>
                    <td>${data.totalAmount}</td>
                    <td>${data.status}</td>
                  </tr>
                    `
                  $("#columns").html(html3);
                  $("#body").html(html4);
                })
            
            },
            error: function () {
                console.log("error");
            }
        });
    })


})