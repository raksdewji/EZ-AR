var SQLQuery = require('./sql.js');

module.exports = function () {

};


//SETTERS

module.exports.setUser = function (userID, callback) {
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