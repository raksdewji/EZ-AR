var SQLQuery = require('./sql.js');

module.exports = function () {

};


//GETTERS

module.exports.getUser = function (userID, callback) {
    var status = -1;
    var query = "SELECT * FROM user where user_id='" + userID + "';";

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

module.exports.getProfile = function (userID, callback) {
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

module.exports.getRegistry = function (email, callback) {
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

module.exports.getSocialMedia = function (userID, callback) {
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

module.exports.getIdentificationPicture = function (pic_id, callback) {
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

module.exports.getARResources = function (res_id, callback) {
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

module.exports.getAdvertisements = function (ad_id, callback) {
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

module.exports.getBusinessOwner = function (user_id, callback) {
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

module.exports.getCard = function (card_name, callback) {
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

module.exports.getCompany = function (company_name, callback) {
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

module.exports.getEntertainmentComplex = function (complex_name, callback) {
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

module.exports.getProduct = function (product_code, callback) {
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

module.exports.getService = function (provider, callback) {
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

// Get what user has provided, return a table
module.exports.getProvideRelation = function (user_id, callback) {
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

//Get what user has scanned, return a table
module.exports.getScanRelation = function (user_id, callback) {
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

//Get what user has shared, return a table
module.exports.getShareRelation = function (user_id, callback) {
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

//Get what user has viewed, return a table
module.exports.getViewRelation = function (user_id, callback) {
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