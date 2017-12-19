// Start Controll ************************************************************************************
/*
var del = 'true';
ons.ready(function() {
    // Add another Onsen UI element
    //console.log("DF");
    ons.disableDeviceBackButtonHandler();
    window.document.addEventListener('backbutton', function() {
        //  console.log('back');
        del = 'false';
    }, false);

});
*/

ons.bootstrap()



.directive('fileModel', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function() {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
})




.service('fileUpload', function($http, $rootScope) {
    this.uploadFileToUrl = function(file, uploadUrl) {
        var isAuther = localStorage.getItem('userprofile');
        var dataObject = JSON.parse(isAuther);
        var fd = new FormData();
        var client = {
            "username": dataObject.username,
            "logintoken": dataObject.logintoken,
            "logintime": dataObject.logintime,
            "logintimeout": dataObject.logintimeout,
            "clientuid": dataObject.clientuid,
            "registeruid": dataObject.registeruid,
            "confirmregis": dataObject.confirmregis,
            "browserinfo": dataObject.browserinfo,
            "ip": dataObject.ip,
            "other": dataObject.other,
            "lastaccess": dataObject.lastaccess,
            "isexist": dataObject.isexist,
            "clientjs": dataObject.clientjs,
            "fingerprint": dataObject.fingerprint,
            "data": {
                user: {
                    "username": dataObject.username
                }
            }
        };
        fd.append('userFile', file);
        fd.append('client', JSON.stringify(client));
        $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            })
            .then(function(res) {
                // success 
                //  console.log('success')
                $rootScope.path = res.data.data.file;
                ons.notification.alert(res.data.data.message);
                console.log(res.data.data)
            })
            .catch(function(err) {
                //error
                console.log('error')
                console.log(err)
            });
    }
})

.controller('AppController', function($scope, $rootScope) {
    this.load = function(page) {
        $scope.splitter.content.load(page);
        $scope.splitter.left.close();
    };

    this.toggle = function() {
        $scope.splitter.left.toggle();
    };
    $rootScope.Logged = "false";
    //  $rootScope.param = false;
    //ons.notification.alert("message");
    $rootScope.memberid = "Guest";
    $rootScope.path = "";
})

.controller('TopupController', function($scope, $rootScope, $http) {


    //  alert("DF");






})

.controller('LogoutController', function($scope, $rootScope, $http) {

    var isAuther = localStorage.getItem('userdata');
    var dataObject = JSON.parse(isAuther);

    $scope.Logoff = function() {
        //  alert(response);
        $http({
                url: "http://nonav.net:3000/logout",
                method: "POST",
                data: dataObject
            })
            .success(function(response) {
                    // alert(response);
                    if (response.data.message = "OK") {
                        //  load('main.html');
                        $rootScope.Logged = 'false';
                        $scope.navi.pushPage('home.html');
                    }


                },
                function() { // optional

                    ons.notification.alert(response);
                });


    }





})



.controller('ProductController', function($scope, $rootScope, $http, $filter, fileUpload) {

    clearTimeout(myVar);

    $scope.del = 'true';

    $scope.Productitems = [{
            "title": "Mobile",
            "images": "img/Product/mobile1.jpg",
            "price": 1000000,
            "desc": "test"
        },
        {
            "title": "Mobile",
            "images": "img/Product/mobile2.jpg",
            "price": 1030000,
            "desc": "test"
        },
        {
            "title": "Mobile",
            "images": "img/Product/mobile3.jpg",
            "price": 3000000,
            "desc": "test"
        },
        {
            "title": "Mobile",
            "images": "img/Product/mobile4.jpg",
            "price": 900000,
            "desc": "test"
        },
        {
            "title": "Mobile",
            "images": "img/Product/mobile5.jpg",
            "price": 250000,
            "desc": "test"
        },
        {
            "title": "Mobile",
            "images": "img/Product/mobile6.jpg",
            "price": 3600000,
            "desc": "test"
        },
        {

            "title": "Mobile",
            "images": "img/Product/comatic1.jpg",
            "price": 11500000,
            "desc": "test"
        },
        {
            "title": "Mobile",
            "images": "img/Product/comatic2.jpg",
            "price": 75000000,
            "desc": "test"
        },
        {
            "title": "Mobile",
            "images": "img/Product/comatic3.jpg",
            "price": 9880000,
            "desc": "test"
        },
        {
            "title": "Mobile",
            "images": "img/Product/comatic4.jpg",
            "price": 9000000,
            "desc": "test"
        }

    ];

    //  $scope.Product = { "name": "", "price": "0", "desc": "" };

    $scope.editAction = function(data) {

        $scope.Product = data;
        $scope.ProductModalEdit.show();

    }


   


    $scope.delAction = function(data) {

        alert(JSON.stringify(data));
    }


    $scope.onGesture = function(gesture) {
        $scope.$apply(function() {
            if (gesture == "Up") {

                $scope.load = 'true';
                console.log("true");


                // $scope.addItem();
                console.log("end");

                $scope.load = 'false';
            }
            if (gesture == "Hold") {
                $scope.del = 'false';
                console.log(gesture);
                //alert(JSON.stringify("Hold"));
            }

        })
    }



    $("#file-input").change(function() {
        readURLAdd(this);
    });

    $scope.uploadFile = function() {
        var file = $scope.userFile;
        var uploadUrl = "http://nonav.net:3000/upload_img";
        fileUpload.uploadFileToUrl(file, uploadUrl);
    }

    $scope.Save = function(data) {

        alert(JSON.stringify(data));

    }





})


.controller('PromotionController', function($scope, $rootScope, $http, $filter, fileUpload) {

    clearTimeout(myVar);

    $scope.Promotionitems = [{
            "images": "img/b1.jpg",
            "title": "Chistmas",
            "days": "5"

        },
        {
            "images": "img/b4.jpg",
            "title": "Valentine day",
            "days": "3"
        },
        {
            "images": "img/b5.jpg",
            "title": "New Year",
            "days": "7"
        }


    ];




    $scope.onGesture = function(gesture) {
        $scope.$apply(function() {
            if (gesture == "Up") {

                $scope.load = 'true';
                console.log("true");


                //  $scope.addItem();
                console.log("end");

                $scope.load = 'false';
            }

        })
    }


    $scope.editPromotion = function(data) {



        $scope.PromotionModalEdit.show();
        $scope.Promotion = data;


    }


    $("#file-input").change(function() {
        readURLAdd(this);
    });

    $scope.uploadFile = function() {
        var file = $scope.userFile;
        var uploadUrl = "http://nonav.net:3000/upload_img";
        fileUpload.uploadFileToUrl(file, uploadUrl);
    }

    $scope.Save = function(data) {

        alert(JSON.stringify(data));

    }





})


.controller('DetialController', function($rootScope, $scope, $http) {

    clearTimeout(myVar);
    //  alert("DF");

    //  $scope.ImageReal1 = "img/Product/htc1.png";
    // $scope.ImageReal2 = "img/Product/htc3.png";
    //  $scope.ImageReal3 = "img/Product/htc3.png";
    $rootScope.items = [];
    $rootScope.items.push({ "image": "img/Product/htc1.png" });
    $rootScope.items.push({ "image": "img/Product/mobile.jpg" });
    $rootScope.items.push({ "image": "img/Product/htc3.PNG" });

    // showDivs(1);


})

.controller('ItemsController', function($rootScope, $scope, $http) {

    // clearTimeout(myVar);



    // showDivs(1);


})




.controller('ChangePasswordController', function($rootScope, $scope, $http) {


    var isAuther = localStorage.getItem('userprofile');
    var dataObject = JSON.parse(isAuther);
    $scope.ChangePassword = function(Users) {

        if (Users.newpwd == Users.frmpwd && Users.phone == dataObject.data.user.phone1) {

            $scope.Auther = {
                "username": "",
                "logintoken": dataObject.logintoken,
                "logintime": "",
                "logintimeout": "",
                "clientuid": dataObject.clientuid,
                "registeruid": "",
                "confirmregis": "",
                "browserinfo": "",
                "ip": "",
                "other": "",
                "lastaccess": "",
                "isexist": false,
                "clientjs": "",
                "fingerprint": "",
                "data": {
                    "user": {
                        "username": dataObject.data.user.username,
                        "password1": Users.newpwd,
                        "password2": Users.frmpwd,
                        "oldpassword": Users.curpwd,
                        "secret": '0' + Users.phone
                    }
                }
            }

            var URL = "http://nonav.net:3000/change_password";
            $http({
                    url: URL,
                    method: "POST",
                    data: $scope.Auther
                })
                .success(function(response) {
                        console.log(response);
                        if (response.data.message == "OK") {

                            $scope.User = {
                                "curpwd": "",
                                "newpwd": "",
                                "frmpwd": "",
                                "phone": ""
                            };
                            ons.notification.alert($rootScope.LangObject.Message.Change);



                        } else {
                            ons.notification.alert($rootScope.LangObject.Message.Error);
                        }

                    },
                    function() { // optional

                        ons.notification.alert(response);
                    });
        } else {

            ons.notification.alert($rootScope.LangObject.Message.ConfirmNotMatch);
            //ons.notification.alert(response);
        }

    }



})



.controller('BalanceController', function($scope, $rootScope, $http) {

    var userdata = localStorage.getItem('userdata');

    var URL = "http://nonav.net:3000/get_userdata";
    $http({
            url: URL,
            method: "POST",
            data: JSON.parse(userdata)
        })
        .success(function(response) {
                console.log(response);

                $scope.userinit = response.data.user;


            },
            function() { // optional
                // failed
                ons.notification.alert(response);
            });


    $scope.Trasfter = function(type, value) {

        if (type == "offeredbonus") {

            ons.notification.confirm({
                message: "Transfer " + value + " Kip?",
                callback: function(idx) {
                    if (idx == 1) {
                        ons.notification.alert("OK");
                    }
                }


            });
            //  alert(d);
        }

    }



})

.controller('RegisterController', function($scope, $rootScope, $http) {


    //  alert("DF");


})

.controller('TreeController', function($scope, $rootScope, $http, $compile) {

    //  alert("DF");
    var host = $(location).attr('protocol') + "//" + $(location).attr('host');

    function getHost() {
        // host = $(location).attr('protocol') + "//" + $(location).attr('host')+$(location).attr('pathname');
        host = "http://nonav.net:3000";
        //console.log(host)
        return host;
    }

    function makeid(length, type) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        if (type == 1) {
            possible = "abcdefghijklmnopqrstuvwxyz0123456789";
        } else if (type == 2) {
            possible = "abcdefghijklmnopqrstuvwxyz";
        } else if (type == 3) {
            possible = "0123456789";
        } else if (type == 4) {
            possible = "012";
        }
        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    function jsonGet(url, data, cb) {
        //console.log(JSON.stringify(data));

        $.ajax({
            type: 'GET',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: "json",
            url: url,
            success: cb,
            error: function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 500) {
                    console.log('Internal error: ' + jqXHR.responseText);
                } else {
                    console.log('Unexpected error.');
                }
            }
        });
    }

    function jsonPost(url, data, cb) {
        //console.log(data);
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: "json",
            url: url,
            success: cb
        });
    }

    function findTreeByUsername(c, username) {
        for (var index = 0; index < c.length; index++) {
            var element = c[index];
            if (element.username == username) {
                return element;
            }
        }
        return null;
    }

    function findMaxLevel(level, b) {
        var maxlevel = level;
        for (var index = 0; index < b.length; index++) {
            var element = b[index];
            //console.log(maxlevel);
            if (element.level > level) {
                maxlevel = element.level;
                //console.log(maxlevel);
            }
        }
        return maxlevel;
    }
    function getIndexes(n, level) {
        var arr = [];
        for (var index = 1; index < level; index++) {
            if (index > 1)
                n = n * 2 + 1;
            for (var i = 0; i < Math.pow(2, index); i++) {
                arr.push(2 * n + 1 + i);
         }
        }
        return arr;
    }
    function fillUpMembers(username, level, b) {
        var u = getUserBinaryByUsername(username, b);
        if (!b.length) {
            return [];
        }
        var indexes = getIndexes(u.index, maxrange);
        for (let index = 0; index < indexes.length; index++) {
            const element = indexes[index];
            var exist = false;
            for (let index = 0; index < b.length; index++) {
                const e = b[index];
                if (element == e.index) {
                    exist = true;
                }
            }
            if (!exist) {
                var pindex = (element - ((element % 2) ? 1 : 2)) / 2;
                if (pindex >= u.index) {
                    var p = null;
                    for (let index = 0; index < b.length; index++) {
                        const e = b[index];
                        if (pindex == e.index) {
                            p = e;
                        }
                    }
                    if (p) {
                        var dummy = 'isregisterdummy';
                        var parent=p.parent;
                        if (p.isdummy == "isregisterdummy") {
                            dummy = 'isdummy';
                            parent='';                                
                        }
                        if (p.isdummy == 'isdummy'){
                            dummy = 'isdummy';
                            parent='';
                        }
                            
                        if (element % 2) {
                            luser = makeid(6, 1);
                            p.luser = luser;
                            b.push({
                                username: luser,
                                createddate: '',
                                updateddate: '',
                                luser: '',
                                ruser: '',
                                index: element,
                                level: p.level + 1,
                                isdummy: dummy,
                                parent:parent,
                                gui: makeid(6, 1)
                            });
                        } else {
                            ruser = makeid(6, 1);
                            p.ruser = ruser;
                            b.push({
                                username: ruser,
                                createddate: '',
                                updateddate: '',
                                luser: '',
                                ruser: '',
                                index: element,
                                level: p.level + 1,
                                isdummy: dummy,
                                parent: parent,
                                gui: makeid(6, 1)
                            });
                        }

                    } else {
                        console.log('could not find parent ' + pindex + " ");
                        return;
                    }
                } else {
                    console.log('this index not belong to this parent ' + u.index);
                    return;
                }
            }
        }
        return b;
    }

    function updateUserBinaryByUsername(username, b, user) {
        for (var index = 0; index < b.length; index++) {
            var element = b[index];
            if (element.username == username) {
                b[index] = user;
                return;
            }
        }
    }
    // function indexingJson(lusername, rusername, c, needlevel, i, parent) {
    //     //console.log("1 arr length:"+arr.lenghth);
    //     if (lusername) {
    //         if (res = findTreeByUsername(c, lusername)) {
    //             // if(needlevel<res.level)
    //             //     return;                 
    //             //var x=0;                                        
    //             var x = (2 * i) + 1;
    //             if (i == -1) x = 0; // root
    //             res.index = x;
    //             res.request = "lusrname:" + lusername;
    //             p = findParentByUserName(lusername, c);
    //             if (p && p != undefined)
    //                 res.parent = p.username;
    //             else res.parent = '';
    //             arr[x] = res;
    //             indexingJson(arr[x].luser, arr[x].ruser, c, needlevel, x, res.parent);
    //         }
    //     }
    //     if (rusername) {
    //         if (body = findTreeByUsername(c, rusername)) {
    //             // if(needlevel<body.level)
    //             //     return;
    //             var y = (2 * i) + 2;
    //             body.index = y;
    //             body.request = "rusrname:" + rusername;
    //             p = findParentByUserName(rusername, c);
    //             if (p && p != undefined)
    //                 body.parent = p.username;
    //             else body.parent = '';
    //             arr[y] = body;
    //             //console.log(arr);
    //             indexingJson(arr[y].luser, arr[y].ruser, c, needlevel, y, body.parent);
    //         }
    //     }
    //     return;
    // }

    function compare(a, b) {
        var x = a.name < b.name ? -1 : 1;
        return x;
    }

    function compareIndex(a, b) {
        var x = a.index < b.index ? -1 : 1;
        return x;
    }
    var myTree;
    var arr = [];
    var dbu = [];
    var js = {};
    js.client = {};
    js.client.data = {};
    js.client.data.user = {};
    js.client.data.userbinary = {};
    var isrestore = false;
    var searchCount = 0;

    function getBinaryDataByUser(username, needlevel, cb) {
        client.data = {};
        client.data.user = {};
        client.data.user.username = username;
        client.data.user.memberlevel = needlevel
        jsonPost(getHost() + "/get_user_binary_tree", client, cb); // URL : /get_user_binary_tree
    };

    function getBinaryDataByMemberLevel(level, arr) {
        var ar = [];
        for (var index = 0; index < arr.length; index++) {
            var element = arr[index];
            if (element.level == level) {
                ar.push(element);
            }
        }
        return ar;
    }

    function findParentByUserName(username, arr) {
        for (var index = 0; index < arr.length; index++) {
            var element = arr[index];
            if (element.luser == username || element.ruser == username) {
                return element;
            }
        }
        return null;
    }
    // loading data       
    var currentUsername = '';
    var selection = [];

    function getMemberListByParent(p) {
        if (p) {
            c = {};
            c.data = {};
            c.data.user = {};
            c.data.user.username = p;
            c.data.page = 0;
            c.maxpage = 10000000;
            console.log(c);
            /*
            jsonPost(getHost()+'/get_member_list_by_parent_name',c,function(res){
                //console.log('res');
                //console.log(res);
                var count=res.data.user.count;
                res.data.user=res.data.user.arr;
                res.data.user.sort(compareIndex);                    
                if(res){
                    $("#memberlist").empty();
                    var str="<p>member List total: "+(res.data.user.length+1)+"</p>";
                    str+="<ul>";      
                    str+="<li>";
                    str+=p;
                    str+="</li>";                   
                    for (var index = 0; index < res.data.user.length; index++) {
                        var element = res.data.user[index].username;  
                        str+="<li>";
                        str+=element;
                        str+="</li>";                                                        
                    }
                    str+="</ul>";
                    $("#memberlist").html(str);
                    //console.log($("#memberlist").html());
                }
            });
            */
        }
    }
    $scope.prepareBinaryData = function(username, needlevel)  {
        selection.push(username);
        if (currentUsername == username)
            $("#topname").empty().text(currentUsername);
        else
            $("#topname").empty().text(currentUsername + "/" + username);
        //console.log('getmember list by parent');
        getMemberListByParent(username);
        //console.log('get binary user');
        getBinaryDataByUser(username, needlevel, function (res) {
            js.client.data = {};
            js.client.data.user = {};
            js.client.data.userbinary = {};
            js.client.data.user = res.data.user;
            js.client.data.userbinary = res.data.userbinary;
            arr = [];
            //var f_userbinary = js.client.data.userbinary;
            //console.log(res);
            arr= fillUpMembers(username, needlevel, js.client.data.userbinary);
            //indexingJson(username, '', f_userbinary, needlevel, -1, username);
            arr.sort(compareIndex);
            arr.splice(0, 0, {}); // ignore the first item                    
            //console.log(arr.length);
            var _xarr = [];
            //console.log(arr);
            for (var index = 0; index < arr.length; index++) {
                //console.log(arr[index]);
                if (arr[index] == undefined || arr[index] == '') continue;
                if (arr[index].username && arr[index] != undefined) {
                    u = getUserBinaryByUsername(arr[index].username, arr);
                    // console.log("dummy" + u.isdummy);
                    if (u && u != undefined) {
                        var gui = u.gui;
                        var h="";
                        if (u.isdummy != undefined && u.isdummy != '') {
                            //var p = findParentByUserName(u.username,arr);
                            if (u.isdummy == 'isdummy') {
                                h =
                                    '<div><img width="32px" height="32px" src="' + getHost() + '/public/icons/forbidden-128.png" /></div>';
                            } else if (u.isdummy == 'isregisterdummy')
                                h = "<div><span  onclick=register('" + u.parent +
                                "')><img width='32px' height='32px' src='" + getHost() + "/public/icons/add-user2-512.png'/></span></div>";
                        } else {
                            h = "<div  style='border-style: unset;' ><span id='" + gui +
                                "' ng-click=\"prepareBinaryData('" + arr[index].username + "'," + maxrange + ")\"  title='" +
                                arr[index].username + "'>" + arr[index].username;
                            h += "</span></div>";
                        }

                        _xarr.push(h);
                    }
                } else {
                    var p = '';
                    p = arr[index].parent;
                    if (p == '' || p == null || p == undefined)
                        _xarr.push(
                            '<div><span onclick="clickme()"><img width="32px" height="32px" src="' +
                            getHost() + '/public/icons/forbidden-128.png" /></span></div>'
                        );
                    else {
                        _xarr.push("<div><span  onclick=register('" + p +
                            "')><img width='32px' height='32px' src='" + getHost() +
                            "/public/icons/add-user2-512.png'/></span></div>"
                        );
                    }
                }
            }
            // mapping
             console.log(_xarr);
            // console.log(_xarr.length);
            console.log('mapping');
            var _arr = [];
                _arr.push(_xarr[8]);
                _arr.push(_xarr[4]);
                _arr.push(_xarr[9]);
                _arr.push(_xarr[2]);
                _arr.push(_xarr[10]);
                _arr.push(_xarr[5]);
                _arr.push(_xarr[11]);
                _arr.push(_xarr[1]);
                _arr.push(_xarr[12]);
                _arr.push(_xarr[6]);
                _arr.push(_xarr[13]);
                _arr.push(_xarr[3]);
                _arr.push(_xarr[14]);
                _arr.push(_xarr[7]);
                _arr.push(_xarr[15]);
                var html = '';
                $("#treeDiv").html('');
            
                for (var index = 0; index < _arr.length; index++) {
                    html+=_arr[index];
                    //$("#treeDiv").append($compile(_arr[index])($scope));
                }
                console.log(html);
                $("#treeDiv").append($compile(html)($scope));
                $scope.$apply();
            getMoreDetails();
            redraw();
        });
    }

    function getMoreDetails() {
        for (var index = 0; index < js.client.data.user.length; index++) {
            var element = js.client.data.user[index];
            if (element || element != {})
                getUserDetailsByUser(element);
        }
    }

    function getUserBinaryByUsername(username, b) {
        for (var index = 0; index < b.length; index++) {
            var element = b[index];
            if (element) {
                if (username == element.username) {

                    return element;
                }
            }
        }
        return null;
    }

    function getUserByUsername(username) {
        //console.log("u:"+username);
        for (var index = 0; index < js.client.data.user.length; index++) {
            var element = js.client.data.user[index];
            if (element) {
                //console.log(element.username);                
                if (username == element.username) {
                    //console.log(element.username==username);
                    return element;
                }
            }
        }
    }

    function getUserDetailsByUser(user) {
        var b = getUserBinaryByUsername(user.username, js.client.data.userbinary);
        if (!b || b == undefined) return;
        $("#" + b.gui).empty();
        var imgurl = "";
        if (user.packagename == "The Best Friend") {
            imgurl = getHost() + "/public/img/best_friend.png";
        } else if (user.packagename == "Close Friend") {
            imgurl = getHost() + "/public/img/close_friend.png";
        } else if (user.packagename == "Friend") {
            imgurl = getHost() + "/public/img/friend.png";
        } else {
            // PUT X                 
            imgurl = getHost() + "/public/icons/forbidden-128.png";
        }
        user.LCoupling = 0;
        user.RCoupling = 0;
        user.leftuser = 0;
        user.rightuser = 0;
        $("#" + b.gui).append("<img title='" + user.username + "' width='48px' height='48px' src='" + imgurl +
            "'/>");
        $("#" + b.gui).append("<div class='small'>" + "<div id='score" + b.gui + "'>" + user.LCoupling + "|" + user
            .RCoupling + "</div>" +
            user.username +
            "<div id='qtty" + b.gui + "'><l>" + user.leftuser + "</l>|<r>" + user.rightuser +
            "</r></div></div>");

        if (b.luser) {
            //user.leftuser = 1;                
            c = {}; 
            c.data = {};
            c.data.user = {};
            c.data.user.username = b.luser;                
            var x=getUserBinaryByUsername(b.luser,js.client.data.userbinary);
            if(x==null)
                x={};
            if(x.isdummy!=undefined)
                user.leftuser=0;
            else
            setTimeout(jsonPost(getHost() + '/get_member_count_by_username', c, function (res) {
                user.leftuser = res.data.user.count;
                //console.log(res);
                if (user.leftuser == undefined)                    
                    user.leftuser=1;
                else
                    user.leftuser++;
                $("#qtty" + b.gui).find('l').empty().html(user.leftuser);                 
            }),100);
            setTimeout(jsonPost(getHost() + '/show_latest_coupling_by_user', c, function (res) {
                var couplingscore = res.data.couplingscore[0];
               // console.log(res);
                if (res.data.message.indexOf('OK') > -1) {
                    if (res.data.couplingscore.length)
                        $("#score" + b.gui).empty().html(couplingscore.LCoupling + "|" + couplingscore.RCoupling);
                    else
                        $("#score" + b.gui).empty().html(0 + "|" + 0);
                } else {
                    //console.log(res);
                    $("#score" + b.gui).empty().html(0 + "|" + 0);
                }
            }),100);
        }
        if (b.ruser) {
           // user.rightuser = 1;
            c = {};
            c.data = {};
            c.data.user = {};
            c.data.user.username = b.ruser;
            var x=getUserBinaryByUsername(b.ruser,js.client.data.userbinary);
            if(x==null)
                x={};
            if(x.isdummy!=undefined)
                user.rightuser=0;
            else
            setTimeout(jsonPost(getHost() + '/get_member_count_by_username', c, function (res) {
                user.rightuser = res.data.user.count;
                if(user.rightuser==undefined)
                    user.rightuser=1;
                else
                    user.rightuser++;
                $("#qtty" + b.gui).find('r').empty().html(user.rightuser);
            }),100);
            setTimeout(jsonPost(getHost() + '/show_latest_coupling_by_user', c, function (res) {
                var couplingscore = res.data.couplingscore;
                if (res.data.message.indexOf('OK') > -1) {
                    if (res.data.couplingscore.length)
                        $("#score" + b.gui).empty().html(couplingscore.LCoupling + "|" + couplingscore.RCoupling);
                    else
                        $("#score" + b.gui).empty().html(0 + "|" + 0);
                } else {
                    //console.log(res);
                    $("#score" + b.gui).empty().html(0 + "|" + 0);
                }
                
            }),100);
        }
    }



    /*
                    function getUserDetailsByUser(user) {
                        var b = getUserBinaryByUsername(user.username, js.client.data.userbinary);
                        if (!b || b == undefined) return;
                        $("#" + b.gui).empty();
                        imgurl = "";
                        if (user.packagename == "The Best Friend") {
                           imgurl = getHost()+"/public/img/best_friend.png";
                           // imgurl = "img/Glod_friend.png";
                        } else if (user.packagename == "Close Friend") {
                            imgurl = getHost()+"/public/img/close_friend.png";
                           // imgurl = "img/Close_Friend.png";
                        } else if (user.packagename == "Friend") {
                             imgurl = getHost()+"/public/img/friend.png";
                           // imgurl ="img/Friend.png";
                        } else {
                            // PUT X                 
                            imgurl = getHost()+"/public/icons/forbidden-128.png";
                        }
                        if (!user.leftuser) user.leftuser = 0;
                        if (!user.rightuser) user.rightuser = 0;
                        if (!user.LCoupling) user.LCoupling = 0;
                        if (!user.RCoupling) user.RCoupling = 0;
            
                        $("#" + b.gui).append("<img title='" + user.username + "' width='48px' height='48px' src='" + imgurl +
                            "'/>");
                        $("#" + b.gui).append("<div class='small'>" + user.LCoupling + "|" + user.RCoupling + 
                            "<div>" +  user.username + "</div>" +
                            "<div>" + user.leftuser + "|" + user.rightuser + "</div>"+
                            "</div>");            
                    }
                    */
    $(function() {
        myTree = $("#treeDiv").btree()[0];
        redraw();
    });

    function redraw() {
        myTree.clear();
        myTree = $("#treeDiv").btree({
            branchColor: '#ffffff',
            branchStroke: 1,
            hSpace: 9,
            vSpace: 70,
            borderWidth: 1,
            horizontal: false,
            flip: true
        })[0];
    }


    var maxrange = 3;

    $scope.init = function() {
        //  alert("D");
        client = {};
        client.data = {};
        client.data.user = {};
        client.data.user.username = $rootScope.memberid;
        jsonPost(getHost() + '/get_current_user', client, function(res) {
            //currentUsername=res.username;
            //console.log("get current user "+JSON.stringify(res));
            currentUsername = $rootScope.memberid; //TESTING ONLY
            $scope.prepareBinaryData(currentUsername, maxrange);
        });
        // currentUsername = $rootScope.memberid; //TESTING ONLY
        // $scope.prepareBinaryData(currentUsername, maxrange);
        return;
    }

    $scope.toTop = function() {
        //console.log(currentUsername);

        if (currentUsername)
            $scope.prepareBinaryData(currentUsername, maxrange);
    }

    $scope.search = function(e, val) {

        if (e.which == 10 || e.which == 13) {
            if (val) {
                checkExistUser(val);
            }
        }

    }


    function checkExistUser(username) {
        url = getHost() + "/check_your_member";
        var client = {};
        client.username = currentUsername; //
        client.data = {};
        client.data.user = {};
        client.data.user.username = username;
        jsonPost(url, client, function(res) {
            if (res.data.message.indexOf('OK') < 0) {
                $("#topname").empty().text('Not exist');
            } else {
                //$("#topname").empty().text=currentUsername+"/"+username;
                $scope.prepareBinaryData(username, maxrange);
            }
        });
    }

    /*
         $("#searchtext").keypress(function (e) {
            /// console.log("dfd");
             if (e.which == 10 || e.which == 13) {
                 search();
             }
         });
    */
    $scope.goBack = function() {
        if (selection.length) {
            var username = selection[selection.length - 2];
            console.log("back to " + username);
            selection.splice(selection.length - 1, 1);
            selection.splice(selection.length - 1, 1);
            $scope.prepareBinaryData(username, maxrange);
        }
    }

    $scope.register = function(p) {
        //     alert("test");
        client = {};
        client.data = {};
        client.data.user = {};
        client.data.user.introductioncode = p;
        $(location).attr('href', '/#/Register')


    };
})

.controller('ProfileController', function($scope, $rootScope, $http, $filter, fileUpload) {

    var isAuther = localStorage.getItem('userprofile');
    var dataObject = JSON.parse(isAuther);
    $scope.A = '0';
    $scope.up = "true";

    /*
    $scope.update = function(data){
        
        var defer = $q.defer();

       
        return defer.promise;

    }
    */
    $scope.updateCustomRequest = function(b) {
        $scope.up = b;
    }

    $("#file-input").change(function() {
        readURL(this);
    });

    $scope.uploadFile = function() {
        var file = $scope.userFile;
        var uploadUrl = "http://nonav.net:3000/upload_img";
        fileUpload.uploadFileToUrl(file, uploadUrl);
    }




    $scope.reload = function() {

        var isAuther = localStorage.getItem('userdata');
        // alert(isAuther);
        var dataObject = JSON.parse(isAuther);
        // ons.notification.alert(dataObject.logintoken);   
        $http({
                url: "http://nonav.net:3000/get_userdata",
                method: "POST",
                data: dataObject
            })
            .success(function(response) {
                    // ons.notification.alert(response.username);
                    if (response.data.message == "OK") {

                        //  ons.notification.alert(response.username);
                        localStorage.setItem('userprofile', JSON.stringify(response));

                    } else {
                        //	swal("ບໍ່ສາມາດເຂົ້າໄດ້");
                        ons.notification.alert("Can not getUserData!!");
                        //   $scope.Loading='false';
                    }

                },
                function(error) { // optional
                    // failed
                    // $scope.Loading='false';
                    ons.notification.alert(error);
                });

    };



    // alert(dataObject.data.user.birthdate);
    var d;
    var dates;
    if (dataObject.data.user.birthdate != "") {
        d = dataObject.data.user.birthdate.split("-");
        dates = d[2] + "-" + d[1] + "-" + d[0];
    } else {

        // d= dataObject.data.user.birthdate.split("-");
        dates = $filter('date')(new Date(), "yyyy-MM-dd");
    }

    //  $scope.dates =  $filter('date')(dataObject.data.user.birthdate, "yyyy/MM/dd");

    // console.log(dataObject.data.user.phone1);
    //.substring(3,dataObject.data.user.phone1.length)
    $scope.User = {

        "username": dataObject.username,
        "phone1": dataObject.data.user.phone1,
        "phone2": dataObject.data.user.phone2,
        "fullname": dataObject.data.user.fullname,
        "address": dataObject.data.user.address,
        "bankaccount": dataObject.data.user.bankaccount,
        "bank": dataObject.data.user.bank,
        "email": dataObject.data.user.email,
        "idcard": dataObject.data.user.ID == undefined ? "" : dataObject.data.user.ID,
        "birthdate": new Date(dates), //dataObject.data.user.birthdate,
        "gender": dataObject.data.user.gender

    };
    if (dataObject.data.user.photo == "") {
        $scope.UserImage = "img/quickadd.png";
    } else {
        $scope.UserImage = "http://nonav.net:3000" + dataObject.data.user.photo;
    }


    //  alert(JSON.stringify(dataObject));

    $scope.cancle = function() {
        $scope.User = {

            "username": dataObject.username,
            "phone1": dataObject.data.user.phone1.substring(3, dataObject.data.user.phone1.length),
            "phone2": dataObject.data.user.phone2.substring(3, dataObject.data.user.phone2.length),
            "fullname": dataObject.data.user.fullname,
            "address": dataObject.data.user.address,
            "bankaccount": dataObject.data.user.bankaccount,
            "bank": dataObject.data.user.bank,
            "email": dataObject.data.user.email,
            "idcard": dataObject.data.user.ID == undefined ? "" : dataObject.data.user.ID,
            "birthdate": new Date(dates), //dataObject.data.user.birthdate,
            "gender": dataObject.data.user.gender
        };
        if (dataObject.data.photo == "") {
            $scope.UserImage = "img/quickadd.png";
        } else {
            $scope.UserImage = "http://nonav.net:3000" + dataObject.data.user.photo;
        }

    };

    $scope.ChangeUserData = function(data) {

        console.log(data.photo);



        var userinfo = {
            "username": dataObject.username,
            "logintoken": dataObject.logintoken,
            "logintime": dataObject.logintime,
            "logintimeout": dataObject.logintimeout,
            "clientuid": dataObject.clientuid,
            "registeruid": dataObject.registeruid,
            "confirmregis": dataObject.confirmregis,
            "browserinfo": dataObject.browserinfo,
            "ip": dataObject.ip,
            "other": dataObject.other,
            "lastaccess": dataObject.lastaccess,
            "isexist": dataObject.isexist,
            "clientjs": dataObject.clientjs,
            "fingerprint": dataObject.fingerprint,
            "data": {
                "user": {

                    "oldusername": dataObject.username,
                    "oldphone1": dataObject.data.user.phone1,
                    "username": data.username,
                    "phone1": "" + data.phone1


                }

            }
        }


        var birthdatestring = $filter('date')(data.birthdate, "dd-MM-yyyy");
        var userUpdate = {
            "username": dataObject.username,
            "logintoken": dataObject.logintoken,
            "logintime": dataObject.logintime,
            "logintimeout": dataObject.logintimeout,
            "clientuid": dataObject.clientuid,
            "registeruid": dataObject.registeruid,
            "confirmregis": dataObject.confirmregis,
            "browserinfo": dataObject.browserinfo,
            "ip": dataObject.ip,
            "other": dataObject.other,
            "lastaccess": dataObject.lastaccess,
            "isexist": dataObject.isexist,
            "clientjs": dataObject.clientjs,
            "fingerprint": dataObject.fingerprint,
            "data": {
                "user": {
                    "ID": data.idcard, //notwork
                    "username": dataObject.username,
                    "fullname": data.fullname,
                    "birthdate": birthdatestring,
                    "gender": data.gender,
                    "address": data.address,
                    "bankaccount": data.bankaccount,
                    "bank": data.bank,
                    "email": data.email,
                    "phone2": "" + data.phone2,
                    "photo": $rootScope.path

                }

            }
        }



        $http({
                url: "http://nonav.net:3000/change_default_user_info",
                method: "POST",
                data: userinfo
            })
            .success(function(response) {
                    //    console.log(response);
                    if (response.data.message == "OK") {

                        $http({
                                url: "http://nonav.net:3000/update_userdata",
                                method: "POST",
                                data: userUpdate
                            })
                            .success(function(response) {

                                    if (response.data.message == "OK") {
                                        localStorage.removeItem("userprofile");
                                        ons.notification.alert($rootScope.LangObject.Message.Change);
                                        $scope.reload();
                                        $scope.A = '0';
                                    } else {

                                        ons.notification.alert(response);
                                    }
                                },
                                function() { // optional

                                    ons.notification.alert(response);
                                });

                    }
                },
                function() { // optional

                    ons.notification.alert(response);
                });





    }





    //  alert("DF");


})

.controller('LoginController', function($scope, $rootScope, $http) {
    //   alert($rootScope.test);
    // $rootScope.LangObject = Language.mode("EN");
    $scope.Loading = 'false';
    clearTimeout(myVar);
    var clientObject;
    //var isAuther = localStorage.getItem('session');

    // alert(isAuther);


    // $scope.splitter.content.load(page);
    // ons.notification.alert("Correct!!");
    $http({
        method: 'GET',
        url: 'http://nonav.net:3000/init_client'
    }).then(function successCallback(response) {
        clientObject = response.data;
        //clientObject = 
        //	$scope.TranList2 = response.data;
    }, function errorCallback(response) {
        //console.log(response);
        ons.notification.alert(response);
    });




    $scope.Logins = function(Users) {

        if (Users != undefined) {
            $scope.Loading = 'true';

            $scope.Auther = {
                "username": "",
                "logintoken": "",
                "logintime": "",
                "logintimeout": "",
                "clientuid": clientObject.clientuid,
                "registeruid": "",
                "confirmregis": "",
                "browserinfo": "",
                "ip": "",
                "other": "",
                "lastaccess": "",
                "isexist": false,
                "clientjs": "",
                "fingerprint": "",
                "data": {
                    "user": {
                        "username": Users.username,
                        "password": Users.password
                    }
                }
            }


            var URL = "http://nonav.net:3000/login";
            $http({
                    url: URL,
                    method: "POST",
                    data: $scope.Auther
                })
                .success(function(response) {

                        if (response.logintoken != "") {



                            var ObjectClient = {
                                "Lange": $scope.SetLang,
                                "username": response.username,
                                "password": Users.pass,
                                "clientid": response.clientuid,
                                "tokenid": response.logintoken
                            };

                            //localStorage.setItem('session', JSON.stringify(ObjectClient));

                            localStorage.setItem('userdata', JSON.stringify(response));

                            $rootScope.memberid = Users.username;
                            //	localStorage.setItem('session', JSON.stringify(response));
                            $rootScope.param = true;
                            $rootScope.Logged = "true";
                            $scope.Loading = 'true';
                            // $scope.navi.pushPage('main.html');
                            $scope.app.load('main.html');
                        } else {
                            //	swal("ບໍ່ສາມາດເຂົ້າໄດ້");
                            ons.notification.alert("can not Login");
                            $scope.Loading = 'false';
                        }

                    },
                    function(error) { // optional
                        // failed
                        $scope.Loading = 'false';
                        ons.notification.alert(error);
                    });

            //	$window.location.href = "#main";
            //	$rootScope.param = true;


        } else {
            $scope.Loading = 'false';
            ons.notification.alert("Please input infomation");
        }

    }




})

.controller('MainController', function($scope, $rootScope, $http) {
    clearTimeout(myVar);

    var isAuther = localStorage.getItem('userdata');
    // alert(isAuther);
    var dataObject = JSON.parse(isAuther);
    // ons.notification.alert(dataObject.logintoken);   
    $http({
            url: "http://nonav.net:3000/get_userdata",
            method: "POST",
            data: dataObject
        })
        .success(function(response) {
                // ons.notification.alert(response.username);
                if (response.data.message == "OK") {

                    //  ons.notification.alert(response.username);
                    localStorage.setItem('userprofile', JSON.stringify(response));

                } else {
                    //	swal("ບໍ່ສາມາດເຂົ້າໄດ້");
                    ons.notification.alert("Can not getUserData!!");
                    //   $scope.Loading='false';
                }

            },
            function(error) { // optional
                // failed
                // $scope.Loading='false';
                ons.notification.alert(error);
            });



})

.controller('HomeController', function($scope, $rootScope, $http) {
    //   alert($rootScope.test);
    $rootScope.LangObject = Language.mode("EN");
    $rootScope.Products = null;
    var page = 20;
    var iScrollPos = 0;


    var isAuther = localStorage.getItem('session');




    $scope.onGesture = function(gesture) {
        $scope.$apply(function() {
            if (gesture == "Up") {

                $scope.load = 'true';
                console.log("true");


                $scope.addItem();
                console.log("end");

                $scope.load = 'false';
            }

        })
    }





    //   alert(isAuther);
    $scope.items = [{
            "title": "Mobile",
            "images": "img/Product/mobile1.jpg",
            "price": "1,000,000",
            "desc": "test"
        },
        {
            "title": "Mobile",
            "images": "img/Product/mobile2.jpg",
            "price": "1,200,000",
            "desc": "test"
        },
        {
            "title": "Mobile",
            "images": "img/Product/mobile3.jpg",
            "price": "3,000,000",
            "desc": "test"
        },
        {
            "title": "Mobile",
            "images": "img/Product/mobile4.jpg",
            "price": "900,000",
            "desc": "test"
        },
        {
            "title": "Mobile",
            "images": "img/Product/mobile5.jpg",
            "price": "2,250,000",
            "desc": "test"
        },
        {
            "title": "Mobile",
            "images": "img/Product/mobile6.jpg",
            "price": "3,360,000",
            "desc": "test"
        },
        {
            "title": "Mobile",
            "title": "Mobile",
            "images": "img/Product/comatic1.jpg",
            "price": "1,110,000",
            "desc": "test"
        },
        {
            "title": "Mobile",
            "images": "img/Product/comatic2.jpg",
            "price": "890,000",
            "desc": "test"
        },
        {
            "title": "Mobile",
            "images": "img/Product/comatic3.jpg",
            "price": "510,000",
            "desc": "test"
        },
        {
            "title": "Mobile",
            "images": "img/Product/comatic4.jpg",
            "price": "290,000",
            "desc": "test"
        }

    ];





    // var i = 0
    $scope.addItem = function() {

            for (var i = 0; i < 10; i++) {

                $scope.items.push({
                    "title": "Mobile",
                    "images": "img/Product/comatic4.jpg",
                    "price": "290,000",
                    "desc": "test"
                });
                // console.log(i);
            }

            //   console.log("false");



        }
        /*
            $scope.addItem();


            this.delegate = {

                configureItemScope: function(index, itemScope) {
                    itemScope.item = $scope.items[index].images;

                },
                countItems: function() {

                    return $scope.items.length;
                },
                calculateItemHeight: function() {

                    return ons.platform.isAndroid() ? 48 : 44;
                }
            };
            */

    /*
        $("#items").scroll(function() {

            //  $scope.addItem();
            //  var iCurScrollPos = $(this).scrollTop();
            if (iScrollPos > 100) {
                $scope.$apply(function() {
                    $scope.addItem();
                });
                //   console.log("OK" + iScrollPos);
                iScrollPos = 0;
            } else {
                //  $scope.addItem();
                iScrollPos = iScrollPos + 5;
                // console.log("No: " + iScrollPos);
            }

        });
    */

    $scope.range = function(min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
    };

    $scope.setImage = function(image, title, price) {

        $rootScope.Products = { "image": image, "title": title, "price": price };

    }





    $scope.app.showFromObject = function() {
        ons.openActionSheet({
            title: $rootScope.LangObject.ActionSheet.Title,
            cancelable: true,
            buttons: [{
                    label: $rootScope.LangObject.ActionSheet.Lao,
                    icon: 'fa-flag'
                },
                {
                    label: $rootScope.LangObject.ActionSheet.Eng,
                    icon: 'fa-flag',

                }

            ]
        }).then(function(index) {

            if (index == 0) {

                $scope.changeLang("LA");
            } else if (index == 1) {

                $scope.changeLang("EN");
            }


        })
    };

    $scope.changeLang = function(lang) {


        $scope.SetLang = lang;
        $rootScope.LangObject = Language.mode(lang);
        $rootScope.fonts = "fontLao";
        $rootScope.fontname = "Phetsarath OT";
        if (lang == "EN") {
            ons.notification.alert("English Language");
        } else {
            ons.notification.alert("Lao Language");
        }


    }


    $scope.slide = [{
            image: 'img/b1.jpg'
        },
        {
            image: 'img/b4.jpg'
        },
        {
            image: 'img/b5.jpg'
        },
        {
            image: 'http://lorempixel.com/400/200/people'
        }
    ];







    showSlides();


});

// End Controll ************************************************************************************





// Silde show *****************************************

var myVar;
var slideIndex = 0;


function showSlides() {
    // alert("DF");
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" actives", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " actives";
    myVar = setTimeout(showSlides, 5000); // Change image every 2 seconds
}

// End  *****************************************   



/*
function addItems() {
    alert("DF");
}

*/
var previousPosition

$(window).scroll(function() {
    var currentScrollPosition = $(window).scrollTop() + $(window).height()
    if (currentScrollPosition > previousScrollPosition) {
        console.log('down')
    } else if (currentScrollPosition < previousScrollPosition) {
        console.log('up')
    }
    previousScrollPosition = currentScrollPosition
});

// Dictionary ***************************************************************     

var Language = {

    mode: function(code) {
        var objectLang = null;
        if (code == 'EN') {

            objectLang = {

                "Usernametxt": "Username",
                "Passwordtxt": "Password",
                "LoginButton": "Login",
                "Message": {
                    "OK": "OK",
                    "Change": "Information has been changed.",
                    "Erro": "Action is not Complete!!",
                    "ConfirmNotMatch": "Password is mismatch!!"
                },
                "Button": {
                    "Transfer": "Transfer",
                    "TopUp": "TopUp",
                    "Save": "Save",
                    "Cancel": "Cancel",
                    "Search": "Search",
                    "Register": "Register",
                    "Logout": "Logout",
                    "Top": "OWNER",
                    "Back": "BACK"



                },

                "ActionSheet": {

                    "Title": "Choose Language",
                    "Eng": "English",
                    "Lao": "Lao"

                },

                "Menu": {
                    "Logout_menu": "Logout",
                    "Login_menu": "Login",
                    "Setting": "Setting",
                    "About": "About",
                    "Home": "Home",
                    "Dashborad": "Topup Main",
                    "Balance": "Balance",
                    "Userprofile": "User Profile",
                    "Clinettree": "Clinet Tree",
                    "Mypassword": "My Password",
                    "Report": "Report",
                    "Topup": "Topup",
                    "System": "Topup System",
                    "Register": "Register",
                    "ProductDetail": "Product Detail",
                    "Product": "Product",
                    "Promotion": "Promotion"

                },
                "TB_ChangeProfile": {
                    "Cancel": "Cancel",
                    "Title": "Information",
                    "Action": "Change Information",
                    "username": "Username",
                    "phone1": "Phone 1",
                    "phone2": "Phone 2",
                    "fullname": "Fullname",
                    "birthdate": "Birth Date",
                    "address": "Address",
                    "bankaccount": "Bank Acount",
                    "bank": "Bank Name",
                    "email": "E-mail",
                    "idcard": "ID Card",
                    "upload": "Upload"
                },
                "Radio": {
                    "Cashing": "Cashing",
                    "Request": "Request",
                    "Transfer": "Transfer"
                },
                "TB_Transfer": {
                    "Name": "Name",
                    "LastName": "Lastname",
                    "UserName": "Username",
                    "Tel": "Phonenumber",
                    "Email": "Email",
                    "Amount": "Amount",
                    "File": "File"
                },
                "TB_Register": {
                    "Name": "Name",
                    "Email": "Email",
                    "PhoneNumber": "Phone Number",
                    "Code": "Sponsor Code"
                },
                "TB_ChangePassword": {
                    "CurrentPwd": "Current Password",
                    "NewPwd": "New Password",
                    "ConfirmPwd": "Confirm Password",
                    "PhoneNumber": "Phone Number"
                },
                "TB_Profile": {
                    "TotalMembers": "Total Members",
                    "Copper": "Copper",
                    "Silver": "Silver",
                    "Gold": "Gold",
                    "PackageName": "Package Name",
                    "TotalMember": "Total",
                    "MemberLeft": "Member Left",
                    "MemberRight": "Member Right"
                },
                "TB_Dashboard": {
                    "Provider": "Provider",
                    "Month": "Month",
                    "Year": "Year",
                    "Total": "Total",
                    "Product": "Product",
                    "Report": "Report",
                    "Dashborad": "Dashborad",
                    "Balance": "Balance",
                    "Bonus": "Bonus",
                    "Offerbonus": "Monthly Bonus",
                    "TopupBonus": "All Sale",
                    "Topup": "Refill",
                    "Register": "First BL"
                },
                "TB_Report": {
                    "Cashing": "Cashing",
                    "Request": "Request",
                    "Transfer": "Transfer",
                    "Topup": "Topup",
                    "Offer": "Offer",
                    "TopupBonus": "TopupBonus"
                },
                "TB_Product": {

                    "productname": "Product Name",
                    "price": "Price",
                    "description": "Description",
                    "image": "Image"
                },
                "TB_Promotion": {

                    "promotionname": "Promotion Name",
                    "days": "Days",
                    "image": "Image"
                }


            }

        } else {
            objectLang = {

                "Usernametxt": "ຜູ້ໃຊ້",
                "Passwordtxt": "ລະຫັດ",
                "LoginButton": "ເຂົ້າລະບົບ",
                "Menu": {
                    "Logout_menu": "ອອກລະບົບ",
                    "Login_menu": "ເຂົ້າລະບົບ",
                    "Setting": "ຕັ້ງຄ່າ",
                    "About": "ກ່ຽວກັບເຮົາ",
                    "Home": "ໜ້າຫຼັກ",
                    "Dashborad": "Topup Main",
                    "Userprofile": "ຂໍ້ມູນສ່ວນຕົວ",
                    "Clinettree": "ສາຍງານ",
                    "Mypassword": "ປ່ຽນລະຫັດ",
                    "Report": "ລາຍງານ",
                    "Topup": "ຕື່ມເງິນໂທ",
                    "System": "ລະບົບທອັບອັບ",
                    "Balance": "ຍອດເງິນ",
                    "Register": "ລົງທະບຽນ",
                    "ProductDetail": "ລາຍລະອຽດສີນຄ້າ",
                    "Product": "ສີນຄ້າ",
                    "Promotion": "ໂຄສະນາ"

                },
                "ActionSheet": {
                    "Title": "ເລືອກພາສາ",
                    "Eng": "ພາສາອັງກິດ",
                    "Lao": "ພາສາລາວ"

                },
                "Message": {
                    "OK": "ຕົກລົງ",
                    "Change": "ຂໍ້ມຸນຖືກປ່ຽນແປງແລ້ວ",
                    "Erro": "ການທຳງານບໍ່ສຳເລັດ!!",
                    "ConfirmNotMatch": "ລະຫັດຜ່ານບໍ່ກົງກັນ!!"
                },

                "Button": {
                    "Top": "ຜູ້ໃຊ້",
                    "Back": "ກັບຄືນ",
                    "Transfer": "ໂອນມູນຄ່າ",
                    "TopUp": "ຕື່ມ",
                    "Save": "ບັນທືກ",
                    "Cancel": "ຍົກເລີກ",
                    "Search": "ຄົ້ນຫາ",
                    "Register": "ລົງທະບຽນ",
                    "Logout": "ອອກລະບົບ"

                },
                "TB_ChangeProfile": {
                    "Cancel": "ຍົກເລີກ",
                    "Title": "ຂໍ້ມູນຜູ້ໃຊ້",
                    "Action": "ແກ້ໄຂ",
                    "username": "ຊີ່ຜູ້ໃຊ້",
                    "phone1": "ເບີໂທ 1",
                    "phone2": "ເບີໂທ 2",
                    "fullname": "ຊື່ເຕັມ",
                    "birthdate": "ວັນເດືອນປີເກີດ",
                    "address": "ທີ່ຢູ່",
                    "bankaccount": "ເລກບັນຊີ",
                    "bank": "ຊື່ທະນາຄານ",
                    "email": "ອີເມວ",
                    "idcard": "ເລກບັດປະຈຳຕົວ",
                    "upload": "ອັບໂຫຼດ"
                },
                "Radio": {
                    "Cashing": "ເງິນສົດ",
                    "Request": "ເອົາເງິນເຂົ້າ",
                    "Transfer": "ໂອນເງິນ"
                },
                "TB_Transfer": {
                    "Name": "ຊື່ເຕັມ",
                    "LastName": "ນາມສະກຸນ",
                    "UserName": "ຊື່ລະຫັດ",
                    "Tel": "ເບີໂທ",
                    "Email": "ເອເມວ",
                    "Amount": "ຈຳນວນ",
                    "File": "ເອກະສານ"
                },
                "TB_Register": {
                    "Name": "ຊື່",
                    "Email": "ອີເມວ",
                    "PhoneNumber": "ເບີໂທ",
                    "Code": "ລະຫັດຜູ້ແນະນຳ"
                },
                "TB_ChangePassword": {
                    "CurrentPwd": "ລະຫັດເກົ່າ",
                    "NewPwd": "ລະຫັດໃໝ່",
                    "ConfirmPwd": "ປ້ອນລະຫັດໃໝ່ອີກຄັ້ງ",
                    "PhoneNumber": "ເບີໂທ"
                },
                "TB_Profile": {
                    "TotalMembers": "ສະຫຼຸບຍອດລວມສະມາຊິກ",
                    "Copper": "ທອງ",
                    "Silver": "ເງິນ",
                    "Gold": "ຄຳ",
                    "PackageName": "ແພັກເກັດ",
                    "TotalMember": "ຍອດລວມ",
                    "MemberLeft": "ສະຊີກເບື້ອງຊ້າຍ",
                    "MemberRight": "ສະຊີກເບື້ອງຂວາ"
                },
                "TB_Dashboard": {
                    "Provider": "ຜູ້ໃຫ້ບໍລິການ",
                    "Month": "ເດືອນ",
                    "Year": "ປີ",
                    "Total": "ຍອດລວມ",
                    "Product": "ຈຳນວນສີນຄ້າ",
                    "Report": "ລາຍງານ",
                    "Dashborad": "ໜ້າຫຼັກ",
                    "Balance": "ມູນຄ່າໂທ",
                    "Bonus": "ໂບນັດ",
                    "Offerbonus": "ມູນຄ່າໂທຟີຮ",
                    "TopupBonus": "ມູນຄ່າໂທສະສົມ",
                    "Topup": "ຍອດທີ່ເຕີມ",
                    "Register": "ມູນຄ່າໂທເລີ່ມຕົ້ນ"
                },
                "TB_Report": {
                    "Cashing": "ເງິນສົດ",
                    "Request": "ຄຳຮ້ອງຂໍ",
                    "Transfer": "ການໂອນ",
                    "Topup": "ຕື່ມຄ່າໂທ",
                    "Offer": "ຄ່າໂທຟຮີ",
                    "TopupBonus": "ມູນຄ່າສະສົມ"
                },

                "TB_Product": {

                    "productname": "ໍຊີ່ສີນຄ້າ",
                    "price": "ລາຄາ",
                    "description": "ລາຍລະອຽດ",
                    "image": "ຮູບພາບ"
                },
                "TB_Promotion": {

                    "promotionname": "ໍຊື່ໂຄສະນາ",
                    "days": "ວັນກຳນົດ",
                    "image": "ຮູບພາບ"
                }

            }
        }

        return objectLang;
    }


}

// End *************************************************************** 


// PreviewImage *************************************************************** 

function PreviewImage() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);

    oFReader.onload = function(oFREvent) {
        document.getElementById("uploadPreview").src = oFREvent.target.result;
    };
};



function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            // $scope.up = "false";
            $('#blah').attr('src', e.target.result);
            var scope = angular.element(document.getElementById("b")).scope();
            scope.$apply(function() {
                scope.updateCustomRequest("false");
            });
        }
        reader.readAsDataURL(input.files[0]);
    }
}


function readURLAdd(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            // $scope.up = "false";
            $('#blah').attr('src', e.target.result);

        }
        reader.readAsDataURL(input.files[0]);
    }
}


var slideIndexPhotos = 1;


function plusDivs(n) {
    showDivs(slideIndexPhotos += n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) { slideIndexPhotos = 1 }
    if (n < 1) { slideIndexPhotos = x.length }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndexPhotos - 1].style.display = "block";
}
// End ***************************************************************