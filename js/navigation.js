var adminURL = "";
var result = [];
var skipped = [];
var adminURL = "http://wohlig.io:81/callApi/7advisors";
var scenarios = [{
  id: 0,
  question: 'Hi! Lets get started. Please give us the name of your portfolio',
  canSkip: false,
  label:'Goal Name',
  valueDefault: 0,
  valueType: 'text',
  rules: {
    minlength: 10,
    maxlength: 25,
    minimum: undefined,
    maximum: undefined
  },
  errors:[{
    type:'minlength',
    messages : ['the name is too short for your dream investment plan, don&apos;t you think?','Nice. Try better. 10 letters minimum']
  },{
    type:'maxlength',
    messages : ['the name is too long.','Nice. Try better. 25 letters max.','one too far. Shorten it.']
  }]
}, {
  id: 1,
  question: 'Now, What will be the lumpsum payment?',
  canSkip: true,
  label:'Lumpsum amount',
  valueDefault: 0,
  valueType: 'number',
  rules: {
    minimum: 50000,
    maximum: 70000,
    minlength:undefined,
    maxlength:undefined
  },
  errors:[{
    type:'minimum',
    messages : ['The lumpsum amount is less, don&apos;t you think?','Nice. Try better. more than 50000']
  },{
    type:'maximum',
    messages : ['The lumpsum amount is a lot, don&apos;t you think?','Nice. Try less than that. less than 70000']
  }]
}, {
  id: 2,
  question: 'Now, what will be the monthly contribution?',
  canSkip: true,
  label:'Monthly contribution',
  valueDefault: 0,
  valueType: 'number',
  rules: {
    minimum: 7000,
    maximum: 80000
  },
  errors:[{
    type:'minimum',
    messages : ['The monthly contribution is less, don&apos;t you think?','Nice. Try better. 10 letters minimum']
  },{
    type:'maximum',
    messages : ['the name is too long for your dream investment plan, don&apos;t you think?','Nice. Try better. 10 letters minimum']
  }]
}, {
  id: 3,
  question: 'And till when do you plan to contribute?',
  canSkip: true,
  label:'Monthly contribution uptil',
  valueDefault: '1-1-1970',
  valueType: 'date',
  rules: {
    minimum: '2022-05-28'
  },
  errors:[{
    type:'minimum',
    messages : ['It cannot start on or before '+ new Date('2022-05-28'),'start it after '+ new Date('2022-05-28')]
  }]
}, {
  id: 4,
  question: 'How frequently do you plan to withdraw this amount?',
  canSkip: true,
  label:'Withdrawal frequency',
  valueDefault: 1,
  valueType: 'number',
  rules: {
    minimum: 1
  },
  errors:[{
    type:'minimum',
    messages : ['Mininum once']
  }]
}, {
  id: 5,
  question: 'What will the inflation rate be?',
  canSkip: true,
  label:'Inflation rate',
  valueDefault: 6,
  valueType: 'number',
  rules: {
    minimum: 0
  },
  errors:[{
    type:'minimum',
    messages : ['Minimum 6 percent']
  }]
}, {
  id: 6,
  question: 'and what about the withdrawal amount?',
  canSkip: false,
  label:'withdrawal amount',
  valueDefault: 0,
  valueType: 'number',
  rules: {
    minimum: 0
  },
  errors:[{
    type:'minimum',
    messages : ['Minimum 0']
  }]
}, {
  id: 7,
  question: 'and what about the withdrawal period?',
  canSkip: false,
  label:'withdrawal period',
  valueDefault: '1-1-1970',
  valueType: 'date',
  rules: {
    minimum: '28-5-2022'
  },
  errors:[{
    type:'minimum',
    messages : ['It cannot start on or before '+ new Date('28-5-2022')]
  }]
}, {
  id: 8,
  question: 'and what about the short-term loss?',
  canSkip: false,
  label:'short-term loss',
  valueDefault: 0,
  valueType: 'number',
  rules: {
    minimum: 0
  },
  errors:[{
    type:'minimum',
    messages : ['Minimum 0']
  }]
}, {
  id: 9,
  question: 'and what about the long-term loss?',
  canSkip: false,
  label:'long-term loss',
  valueDefault: 0,
  valueType: 'number',
  rules: {
    minimum: 0
  },
  errors:[{
    type:'minimum',
    messages : ['Minimum 0']
  }]
}, {
  id: -1
}];

if (isproduction) {
  adminURL = "http://www.wohlig.co.in/demo/index.php";
} else {
  adminURL = "http://localhost/demo/index.php";
}

var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function() {
  var navigation = [{
    name: "Overview",
    classis: "active",
    anchor: "overview",
    icon: "donut_large"
  }, {
    name: "Portfolios",
    classis: "active",
    anchor: "portfolio",
    icon: "dashboard"
  }, {
    name: "Notification",
    classis: "active",
    anchor: "notification",
    icon: "notifications"
  }, {
    name: "Archive",
    classis: "active",
    anchor: "archive",
    icon: "archive"
  }, {
    name: "Referral",
    classis: "active",
    anchor: "referral",
    icon: "group"
  }, {
    name: "Profile",
    classis: "active",
    anchor: "profile",
    icon: "person"
  }, {
    name: "Logout",
    classis: "active",
    anchor: "logout",
    icon: "exit_to_app"
  }];

  return {
    getnav: function() {
      return navigation;
    },
    autoresponder: function(response, responseto, skip, callback, err) {
      result[responseto]={};
      if (response === undefined) {
        return callback(scenarios[0]);
      } else {
        if(skip){
          result[responseto].value = scenarios[responseto].valueDefault;
          result[responseto].label = scenarios[responseto].label;
          skipped[responseto]=skip;
        }else{
          result[responseto].value = response;
          result[responseto].label = scenarios[responseto].label;
          skipped[responseto]=skip;
        }
        console.log(result);
        return callback(scenarios[responseto+1]);
      }


    },
    getPortfolios:function(callback,err){
      return $http({
        url: adminURL + "addToCart",
        method: "POST",
        data:{}
      }).success(callback).error(err);
    },
    makeactive: function(menuname) {
      for (var i = 0; i < navigation.length; i++) {
        if (navigation[i].name == menuname) {
          navigation[i].classis = "active";
        } else {
          navigation[i].classis = "";
        }
      }
      return menuname;
    },

  };
});
