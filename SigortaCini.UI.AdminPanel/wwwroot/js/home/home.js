var b2cothers,
  b2ccasco,
  b2ctraffic,
  b2bothers,
  b2bcasco,
  b2btraffic,
  leadcount,
  customercount;
$(document).ready(function() {
  sigortaCiniHome.init();
});
var sigortaCiniHome = {
  init: function() {
    this.createCharts();
    this.getLeadCount();
  },

  getLeadCount: function() {
    $.ajax({
      type: "GET",
      url: "/DashboardEnvironmentVariable/GetLeadCount",
      dataType: "json",
      success: function(response) {
        $("#leadcount").text(response.data);
        sigortaCiniHome.getCustomerCount(response.data);
        hideLoader();
      }
    });
    showLoader();
  },

  getCustomerCount: function(leadcount) {
    $.ajax({
      type: "GET",
      url: "/DashboardEnvironmentVariable/GetCustomerCount",
      dataType: "json",
      success: function(response) {
        $("#customercount").text(response.data);
        $("#sumUser").text(leadcount + response.data);
        hideLoader();
      }
    });
  },

  createCharts: function() {
    showLoader();

    $.ajax({
      type: "GET",
      url: "/DashboardEnvironmentVariable/GetDashboardEnvironmentVariable",
      dataType: "json",
      async: false,
      success: function(response) {
        b2bcasco =
          response.data.b2BTransactions.taskCount.productResults[0].count;
        b2btraffic =
          response.data.b2BTransactions.taskCount.productResults[1].count;
        b2bothers = response.data.b2BTransactions.taskCount.otherCount;
        $("#countb2b").text(response.data.b2BTransactions.taskCount.total);

        b2ccasco =
          response.data.b2CTransactions.taskCount.productResults[0].count;
        b2ctraffic =
          response.data.b2CTransactions.taskCount.productResults[1].count;
        b2cothers = response.data.b2CTransactions.taskCount.otherCount;
        $("#countb2c").text(response.data.b2CTransactions.taskCount.total);

        $("#b2ccount").text(response.data.b2CTransactions.policyCount.total);
        $("#b2bcount").text(response.data.b2BTransactions.policyCount.total);
        $("#sumPolicy").text(
          response.data.b2CTransactions.policyCount.total +
            response.data.b2BTransactions.policyCount.total
        );

        hideLoader();
      }
    });

    var ctx = document.getElementById("chart");
    var myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["KASKO", "TRAFİK", "DİĞER"],
        datasets: [
          {
            label: "Value",
            data: [b2btraffic, b2bcasco, b2bothers],
            backgroundColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)"
            ],

            borderColor: [
              "rgba(255,99,132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: "Offline Görevler",
          fontSize: 28
        } //end of title
      } //end of options
    });

    var ctxa = document.getElementById("charta");
    var myChart = new Chart(ctxa, {
      type: "doughnut",
      data: {
        labels: ["KASKO", "TRAFİK", "DİĞER"],
        datasets: [
          {
            label: "Value",
            data: [b2ctraffic, b2ccasco, b2cothers],
            backgroundColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)"
            ],

            borderColor: [
              "rgba(255,99,132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: "Online Görevler",
          fontSize: 28
        } //end of title
      } //end of options
    });
  }
};
