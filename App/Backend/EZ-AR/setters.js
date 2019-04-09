var SQLQuery = require('./sql.js');
var Getter = require('./getters.js');

module.exports = function () {

};


String.prototype.format = function () {
    if (arguments.length === 0) return this;
    var obj = arguments[0];
    var s = this;
    for (var key in obj) {
        s = s.replace(new RegExp("\\{" + key + "\\}", "g"), obj[key]);
    }
    return s;
};

//SETTERS

//Example
module.exports.setUser = function (user_id, username, country, state, city, callback) {
    var  _username, _country, _state, _city;

    Getter.getUser(user_id, function (status, getres) {
        if (status === 0) {
            //return -1 means unknown sql query error
            callback(-1);
        }
        if (status === 1) {
            if (getres.rows.length === 0) {
                //return 0 means this user does not exist
                callback(0);
            } else {
                (!username) ? _username = getres.username : _username = username;
                (!country) ? _country = getres.country : _country = country;
                (!state) ? _state = getres.state : _state = state;
                (!city) ? _city = getres.city : _city = city;
                //Query error: insert or update on table "user" violates foreign key constraint "user_registry_email_fk"
                // There is one more bug. If the original attribute is NULL, then the query will input 'undefine' to the database
                var data = {
                    username: _username,
                    country: _country,
                    state: _state,
                    city: _city,
                    //email:_email,
                    userid: user_id
                };
                var query = "UPDATE public.user SET username = '{username}', country = '{country}', state = '{state}', city = '{city}' WHERE user_id = '{userid}'".format(data);
                SQLQuery(query, function (err, res) {
                    if (err) {
                        //return -1 means unknown sql query error
                        status = -1;
                        callback(status);
                    } else {
                        status = 1;
                        callback(status, res);
                    }
                });
            }
        }
    });
};

module.exports.setProfile = function (userID, callback) {
    var status = -1;
    var query = "SELECT * FROM profile where user_id='" + userID + "';";

    SQLQuery(query, function (err, res) {
        if (err) {
            status = 0;
            callback(status);
        } else {
            status = 1;
            callback(status, res);
        }
    });
};

module.exports.setRegistry = function (email, callback) {
    var status = -1;
    var query = "SELECT * FROM registry where email='" + email + "';";

    SQLQuery(query, function (err, res) {
        if (err) {
            status = 0;
            callback(status);
        } else {
            status = 1;
            callback(status, res);
        }
    });
};

module.exports.setSocialMedia = function (userID, callback) {
    var status = -1;
    var query = "SELECT * FROM socialmedia where user_id='" + userID + "';";

    SQLQuery(query, function (err, res) {
        if (err) {
            status = 0;
            callback(status);
        } else {
            status = 1;
            callback(status, res);
        }
    });
};

module.exports.setIdentificationPicture = function (pic_id, callback) {
    var status = -1;
    var query = "SELECT * FROM identification_picture where pic_id='" + pic_id + "';";

    SQLQuery(query, function (err, res) {
        if (err) {
            status = 0;
            callback(status);
        } else {
            status = 1;
            callback(status, res);
        }
    });
};

module.exports.setARResources = function (res_id, callback) {
    var status = -1;
    var query = "SELECT * FROM ar_resources where res_id='" + res_id + "';";

    SQLQuery(query, function (err, res) {
        if (err) {
            status = 0;
            callback(status);
        } else {
            status = 1;
            callback(status, res);
        }
    });
};

module.exports.setAdvertisements = function (ad_id, callback) {
    var status = -1;
    var query = "SELECT * FROM advertisement where ad_id='" + ad_id + "';";

    SQLQuery(query, function (err, res) {
        if (err) {
            status = 0;
            callback(status);
        } else {
            status = 1;
            callback(status, res);
        }
    });
};

module.exports.setBusinessOwner = function (user_id, callback) {
    var status = -1;
    var query = "SELECT * FROM business_owner where user_id='" + user_id + "';";

    SQLQuery(query, function (err, res) {
        if (err) {
            status = 0;
            callback(status);
        } else {
            status = 1;
            callback(status, res);
        }
    });
};

module.exports.setCard = function (card_name, callback) {
    var status = -1;
    var query = "SELECT * FROM card where card_name='" + card_name + "';";

    SQLQuery(query, function (err, res) {
        if (err) {
            status = 0;
            callback(status);
        } else {
            status = 1;
            callback(status, res);
        }
    });
};

module.exports.setCompany = function (company_name, callback) {
    var status = -1;
    var query = "SELECT * FROM company where company_name='" + company_name + "';";

    SQLQuery(query, function (err, res) {
        if (err) {
            status = 0;
            callback(status);
        } else {
            status = 1;
            callback(status, res);
        }
    });
};

module.exports.setEntertainmentComplex = function (complex_name, callback) {
    var status = -1;
    var query = "SELECT * FROM entertainment_complex where complex_name='" + complex_name + "';";

    SQLQuery(query, function (err, res) {
        if (err) {
            status = 0;
            callback(status);
        } else {
            status = 1;
            callback(status, res);
        }
    });
};

module.exports.setProduct = function (product_code, callback) {
    var status = -1;
    var query = "SELECT * FROM product where product_code='" + product_code + "';";

    SQLQuery(query, function (err, res) {
        if (err) {
            status = 0;
            callback(status);
        } else {
            status = 1;
            callback(status, res);
        }
    });
};

module.exports.setService = function (provider, callback) {
    var status = -1;
    var query = "SELECT * FROM service where provider='" + provider + "';";

    SQLQuery(query, function (err, res) {
        if (err) {
            status = 0;
            callback(status);
        } else {
            status = 1;
            callback(status, res);
        }
    });
};

// Set what user has provided, return a table
module.exports.setProvideRelation = function (user_id, callback) {
    var status = -1;
    var query = "SELECT * FROM provide where user_id='" + user_id + "';";

    SQLQuery(query, function (err, res) {
        if (err) {
            status = 0;
            callback(status);
        } else {
            status = 1;
            callback(status, res);
        }
    });
};

//Set what user has scanned, return a table
module.exports.setScanRelation = function (user_id, callback) {
    var status = -1;
    var query = "SELECT * FROM scan where user_id='" + user_id + "';";

    SQLQuery(query, function (err, res) {
        if (err) {
            status = 0;
            callback(status);
        } else {
            status = 1;
            callback(status, res);
        }
    });
};

//Set what user has shared, return a table
module.exports.setShareRelation = function (user_id, callback) {
    var status = -1;
    var query = "SELECT * FROM share where user_id='" + user_id + "';";

    SQLQuery(query, function (err, res) {
        if (err) {
            status = 0;
            callback(status);
        } else {
            status = 1;
            callback(status, res);
        }
    });
};

//Set what user has viewed, return a table
module.exports.setViewRelation = function (user_id, callback) {
    var status = -1;
    var query = "SELECT * FROM view where user_id='" + user_id + "';";

    SQLQuery(query, function (err, res) {
        if (err) {
            status = 0;
            callback(status);
        } else {
            status = 1;
            callback(status, res);
        }
    });
};