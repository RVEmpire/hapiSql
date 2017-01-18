'use strict';
var crypto = require('crypto');

var internals = {};


/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
internals.genRandomString = function(length) {
  return crypto.randomBytes(Math.ceil(length/2))
          .toString('hex') /** convert to hexadecimal format */
          .slice(0,length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
internals.sha512 = function(password, salt) {
  try {
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return salt + '.' + value;
  } catch (e) {
    return { success: false, error: e };
  }
};

/**
 * Get salt and password hash
 * @function
 * @param {string} password - List of required fields.
 */
internals.saltHashPassword = function(userpassword) {
  try {
    var salt = internals.genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = internals.sha512(userpassword, salt);
    return passwordData;
  } catch (e) {
    return { success: false, error: e };
  }
}

/**
 * Verify password
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Salt stored in database
 */
internals.verifyPassword = function(password, storedPassword, salt) {
  try {
    var storedPasswordHash = salt + '.' + storedPassword;
    var passwordData = internals.sha512(password, salt);
    return { success: storedPasswordHash === passwordData };
  } catch (e) {
    return { success: false, error: e };
  }
}

module.exports = internals;
