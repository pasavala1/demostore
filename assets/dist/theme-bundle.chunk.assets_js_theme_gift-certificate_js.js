"use strict";
(self["webpackChunkbigcommerce_cornerstone"] = self["webpackChunkbigcommerce_cornerstone"] || []).push([["assets_js_theme_gift-certificate_js"],{

/***/ "./assets/js/theme/common/gift-certificate-validator.js":
/*!**************************************************************!*\
  !*** ./assets/js/theme/common/gift-certificate-validator.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(cert) {
  if (typeof cert !== 'string' || cert.length === 0) {
    return false;
  }

  // Add any custom gift certificate validation logic here
  return true;
}

/***/ }),

/***/ "./assets/js/theme/common/utils/translations-utils.js":
/*!************************************************************!*\
  !*** ./assets/js/theme/common/utils/translations-utils.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTranslationDictionary: function() { return /* binding */ createTranslationDictionary; }
/* harmony export */ });
var TRANSLATIONS = 'translations';
var isTranslationDictionaryNotEmpty = function isTranslationDictionaryNotEmpty(dictionary) {
  return !!Object.keys(dictionary[TRANSLATIONS]).length;
};
var chooseActiveDictionary = function chooseActiveDictionary() {
  for (var i = 0; i < arguments.length; i++) {
    var dictionary = JSON.parse(i < 0 || arguments.length <= i ? undefined : arguments[i]);
    if (isTranslationDictionaryNotEmpty(dictionary)) {
      return dictionary;
    }
  }
};

/**
 * defines Translation Dictionary to use
 * @param context provides access to 3 validation JSONs from en.json:
 * validation_messages, validation_fallback_messages and default_messages
 * @returns {Object}
 */
var createTranslationDictionary = function createTranslationDictionary(context) {
  var validationDictionaryJSON = context.validationDictionaryJSON,
    validationFallbackDictionaryJSON = context.validationFallbackDictionaryJSON,
    validationDefaultDictionaryJSON = context.validationDefaultDictionaryJSON;
  var activeDictionary = chooseActiveDictionary(validationDictionaryJSON, validationFallbackDictionaryJSON, validationDefaultDictionaryJSON);
  var localizations = Object.values(activeDictionary[TRANSLATIONS]);
  var translationKeys = Object.keys(activeDictionary[TRANSLATIONS]).map(function (key) {
    return key.split('.').pop();
  });
  return translationKeys.reduce(function (acc, key, i) {
    acc[key] = localizations[i];
    return acc;
  }, {});
};

/***/ }),

/***/ "./assets/js/theme/gift-certificate.js":
/*!*********************************************!*\
  !*** ./assets/js/theme/gift-certificate.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ GiftCertificate; }
/* harmony export */ });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/gift-certificate-validator */ "./assets/js/theme/common/gift-certificate-validator.js");
/* harmony import */ var _common_models_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/models/forms */ "./assets/js/theme/common/models/forms.js");
/* harmony import */ var _common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }








var GiftCertificate = /*#__PURE__*/function (_PageManager) {
  function GiftCertificate(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    _this.validationDictionary = (0,_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__.createTranslationDictionary)(context);
    var $certBalanceForm = $('#gift-certificate-balance');
    var purchaseModel = {
      recipientName: function recipientName(val) {
        return val.length;
      },
      recipientEmail: function recipientEmail() {
        return _common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"].email.apply(_common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"], arguments);
      },
      senderName: function senderName(val) {
        return val.length;
      },
      senderEmail: function senderEmail() {
        return _common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"].email.apply(_common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"], arguments);
      },
      customAmount: function customAmount(value, min, max) {
        return value && value >= min && value <= max;
      },
      setAmount: function setAmount(value, options) {
        var found = false;
        options.forEach(function (option) {
          if (option === value) {
            found = true;
            return false;
          }
        });
        return found;
      }
    };
    var $purchaseForm = $('#gift-certificate-form');
    var $customAmounts = $purchaseForm.find('input[name="certificate_amount"]');
    var purchaseValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: '#gift-certificate-form input[type="submit"]',
      delay: 300,
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__.announceInputErrorMessage
    });
    if ($customAmounts.length) {
      var $element = $purchaseForm.find('input[name="certificate_amount"]');
      var min = $element.data('min');
      var minFormatted = $element.data('minFormatted');
      var max = $element.data('max');
      var maxFormatted = $element.data('maxFormatted');
      var insertFormattedAmountsIntoErrorMessage = function insertFormattedAmountsIntoErrorMessage(message) {
        for (var _len = arguments.length, amountRange = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          amountRange[_key - 1] = arguments[_key];
        }
        var amountPlaceholders = ['[MIN]', '[MAX]'];
        var updatedErrorText = message;
        amountPlaceholders.forEach(function (placeholder, i) {
          updatedErrorText = updatedErrorText.includes(placeholder) ? updatedErrorText.replace(placeholder, amountRange[i]) : updatedErrorText;
        });
        return updatedErrorText;
      };
      purchaseValidator.add({
        selector: '#gift-certificate-form input[name="certificate_amount"]',
        validate: function validate(cb, val) {
          var numberVal = Number(val);
          if (!numberVal) {
            cb(false);
          }
          cb(numberVal >= min && numberVal <= max);
        },
        errorMessage: insertFormattedAmountsIntoErrorMessage(_this.validationDictionary.certificate_amount_range, minFormatted, maxFormatted)
      });
    }
    purchaseValidator.add([{
      selector: '#gift-certificate-form input[name="to_name"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.recipientName(val);
        cb(result);
      },
      errorMessage: _this.context.toName
    }, {
      selector: '#gift-certificate-form input[name="to_email"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.recipientEmail(val);
        cb(result);
      },
      errorMessage: _this.context.toEmail
    }, {
      selector: '#gift-certificate-form input[name="from_name"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.senderName(val);
        cb(result);
      },
      errorMessage: _this.context.fromName
    }, {
      selector: '#gift-certificate-form input[name="from_email"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.senderEmail(val);
        cb(result);
      },
      errorMessage: _this.context.fromEmail
    }, {
      selector: '#gift-certificate-form input[name="certificate_theme"]:first-of-type',
      triggeredBy: '#gift-certificate-form input[name="certificate_theme"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="certificate_theme"]:checked').val();
        cb(typeof val === 'string');
      },
      errorMessage: _this.context.certTheme
    }, {
      selector: '#gift-certificate-form input[name="agree"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="agree"]').get(0).checked;
        cb(val);
      },
      errorMessage: _this.context.agreeToTerms
    }, {
      selector: '#gift-certificate-form input[name="agree2"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="agree2"]').get(0).checked;
        cb(val);
      },
      errorMessage: _this.context.agreeToTerms
    }]);
    if ($certBalanceForm.length) {
      var balanceVal = _this.checkCertBalanceValidator($certBalanceForm);
      $certBalanceForm.on('submit', function () {
        balanceVal.performCheck();
        if (!balanceVal.areAll('valid')) {
          return false;
        }
      });
    }
    $purchaseForm.on('submit', function (event) {
      purchaseValidator.performCheck();
      if (!purchaseValidator.areAll('valid')) {
        return event.preventDefault();
      }
    });
    var createFrame = function createFrame(container, html) {
      var frame = $('<iframe />').width('100%').attr('frameBorder', '0').appendTo(container)[0];

      // Grab the frame's document object
      var frameDoc = frame.contentWindow ? frame.contentWindow.document : frame.contentDocument;
      frameDoc.open();
      frameDoc.write(html);
      frameDoc.close();

      // Calculate max height for the iframe
      var maxheight = Math.max($(window).height() - 300, 300);

      // Auto adjust the iframe's height once its document is ready
      $(frameDoc).ready(function () {
        var height = Math.min(frameDoc.body.scrollHeight + 20, maxheight);
        $(frame).height(height);
      });
    };
    $('#gift-certificate-preview').on('click', function (event) {
      event.preventDefault();
      purchaseValidator.performCheck();
      if (!purchaseValidator.areAll('valid')) {
        return;
      }
      var modal = (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.defaultModal)();
      var previewUrl = $(event.currentTarget).data('previewUrl') + "&" + $purchaseForm.serialize();
      modal.open();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_6__.api.getPage(previewUrl, {}, function (err, content) {
        if (err) {
          return modal.updateContent(_this.context.previewError);
        }
        modal.updateContent();
        var container = $('#modal-content');
        createFrame(container, content);
      });
    });
    return _this;
  }
  _inheritsLoose(GiftCertificate, _PageManager);
  var _proto = GiftCertificate.prototype;
  _proto.checkCertBalanceValidator = function checkCertBalanceValidator($balanceForm) {
    var balanceValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: $balanceForm.find('input[type="submit"]'),
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__.announceInputErrorMessage
    });
    balanceValidator.add({
      selector: $balanceForm.find('input[name="giftcertificatecode"]'),
      validate: function validate(cb, val) {
        cb((0,_common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_2__["default"])(val));
      },
      errorMessage: this.validationDictionary.invalid_gift_certificate
    });
    return balanceValidator;
  };
  return GiftCertificate;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9naWZ0LWNlcnRpZmljYXRlX2pzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSw2QkFBZSxvQ0FBVUEsSUFBSSxFQUFFO0VBQzNCLElBQUksT0FBT0EsSUFBSSxLQUFLLFFBQVEsSUFBSUEsSUFBSSxDQUFDQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0lBQy9DLE9BQU8sS0FBSztFQUNoQjs7RUFFQTtFQUNBLE9BQU8sSUFBSTtBQUNmOzs7Ozs7Ozs7Ozs7OztBQ1BBLElBQU1DLFlBQVksR0FBRyxjQUFjO0FBQ25DLElBQU1DLCtCQUErQixHQUFHLFNBQWxDQSwrQkFBK0JBLENBQUlDLFVBQVU7RUFBQSxPQUFLLENBQUMsQ0FBQ0MsTUFBTSxDQUFDQyxJQUFJLENBQUNGLFVBQVUsQ0FBQ0YsWUFBWSxDQUFDLENBQUMsQ0FBQ0QsTUFBTTtBQUFBO0FBQ3RHLElBQU1NLHNCQUFzQixHQUFHLFNBQXpCQSxzQkFBc0JBLENBQUEsRUFBOEI7RUFDdEQsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdDLFNBQUEsQ0FBbUJSLE1BQU0sRUFBRU8sQ0FBQyxFQUFFLEVBQUU7SUFDaEQsSUFBTUosVUFBVSxHQUFHTSxJQUFJLENBQUNDLEtBQUssQ0FBb0JILENBQUMsUUFBQUMsU0FBQSxDQUFBUixNQUFBLElBQURPLENBQUMsR0FBQUksU0FBQSxHQUFBSCxTQUFBLENBQURELENBQUMsQ0FBQyxDQUFDO0lBQ3BELElBQUlMLCtCQUErQixDQUFDQyxVQUFVLENBQUMsRUFBRTtNQUM3QyxPQUFPQSxVQUFVO0lBQ3JCO0VBQ0o7QUFDSixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLElBQU1TLDJCQUEyQixHQUFHLFNBQTlCQSwyQkFBMkJBLENBQUlDLE9BQU8sRUFBSztFQUNwRCxJQUFRQyx3QkFBd0IsR0FBd0VELE9BQU8sQ0FBdkdDLHdCQUF3QjtJQUFF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RSxJQUFJLENBQUMsbUNBQW1DLENBQUM7TUFDaEVzQixRQUFRLFdBQUFBLFNBQUNDLEVBQUUsRUFBRXhDLEdBQUcsRUFBRTtRQUNkd0MsRUFBRSxDQUFDdEQsOEVBQW9CLENBQUNjLEdBQUcsQ0FBQyxDQUFDO01BQ2pDLENBQUM7TUFDRDJDLFlBQVksRUFBRSxJQUFJLENBQUNoRCxvQkFBb0IsQ0FBQ3NHO0lBQzVDLENBQUMsQ0FBQztJQUVGLE9BQU9ELGdCQUFnQjtFQUMzQixDQUFDO0VBQUEsT0FBQXpHLGVBQUE7QUFBQSxFQWxPd0NQLHFEQUFXIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmlnY29tbWVyY2UtY29ybmVyc3RvbmUvLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2dpZnQtY2VydGlmaWNhdGUtdmFsaWRhdG9yLmpzIiwid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMuanMiLCJ3ZWJwYWNrOi8vYmlnY29tbWVyY2UtY29ybmVyc3RvbmUvLi9hc3NldHMvanMvdGhlbWUvZ2lmdC1jZXJ0aWZpY2F0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoY2VydCkge1xyXG4gICAgaWYgKHR5cGVvZiBjZXJ0ICE9PSAnc3RyaW5nJyB8fCBjZXJ0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBZGQgYW55IGN1c3RvbSBnaWZ0IGNlcnRpZmljYXRlIHZhbGlkYXRpb24gbG9naWMgaGVyZVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuIiwiY29uc3QgVFJBTlNMQVRJT05TID0gJ3RyYW5zbGF0aW9ucyc7XHJcbmNvbnN0IGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkgPSAoZGljdGlvbmFyeSkgPT4gISFPYmplY3Qua2V5cyhkaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLmxlbmd0aDtcclxuY29uc3QgY2hvb3NlQWN0aXZlRGljdGlvbmFyeSA9ICguLi5kaWN0aW9uYXJ5SnNvbkxpc3QpID0+IHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGljdGlvbmFyeUpzb25MaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgZGljdGlvbmFyeSA9IEpTT04ucGFyc2UoZGljdGlvbmFyeUpzb25MaXN0W2ldKTtcclxuICAgICAgICBpZiAoaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eShkaWN0aW9uYXJ5KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGljdGlvbmFyeTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogZGVmaW5lcyBUcmFuc2xhdGlvbiBEaWN0aW9uYXJ5IHRvIHVzZVxyXG4gKiBAcGFyYW0gY29udGV4dCBwcm92aWRlcyBhY2Nlc3MgdG8gMyB2YWxpZGF0aW9uIEpTT05zIGZyb20gZW4uanNvbjpcclxuICogdmFsaWRhdGlvbl9tZXNzYWdlcywgdmFsaWRhdGlvbl9mYWxsYmFja19tZXNzYWdlcyBhbmQgZGVmYXVsdF9tZXNzYWdlc1xyXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSA9IChjb250ZXh0KSA9PiB7XHJcbiAgICBjb25zdCB7IHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04gfSA9IGNvbnRleHQ7XHJcbiAgICBjb25zdCBhY3RpdmVEaWN0aW9uYXJ5ID0gY2hvb3NlQWN0aXZlRGljdGlvbmFyeSh2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OKTtcclxuICAgIGNvbnN0IGxvY2FsaXphdGlvbnMgPSBPYmplY3QudmFsdWVzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSk7XHJcbiAgICBjb25zdCB0cmFuc2xhdGlvbktleXMgPSBPYmplY3Qua2V5cyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLm1hcChrZXkgPT4ga2V5LnNwbGl0KCcuJykucG9wKCkpO1xyXG5cclxuICAgIHJldHVybiB0cmFuc2xhdGlvbktleXMucmVkdWNlKChhY2MsIGtleSwgaSkgPT4ge1xyXG4gICAgICAgIGFjY1trZXldID0gbG9jYWxpemF0aW9uc1tpXTtcclxuICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgfSwge30pO1xyXG59O1xyXG4iLCJpbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSAnLi9wYWdlLW1hbmFnZXInO1xyXG5pbXBvcnQgbm9kIGZyb20gJy4vY29tbW9uL25vZCc7XHJcbmltcG9ydCBjaGVja0lzR2lmdENlcnRWYWxpZCBmcm9tICcuL2NvbW1vbi9naWZ0LWNlcnRpZmljYXRlLXZhbGlkYXRvcic7XHJcbmltcG9ydCBmb3JtTW9kZWwgZnJvbSAnLi9jb21tb24vbW9kZWxzL2Zvcm1zJztcclxuaW1wb3J0IHsgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IH0gZnJvbSAnLi9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzJztcclxuaW1wb3J0IHsgYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSB9IGZyb20gJy4vY29tbW9uL3V0aWxzL2Zvcm0tdXRpbHMnO1xyXG5pbXBvcnQgeyBhcGkgfSBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XHJcbmltcG9ydCB7IGRlZmF1bHRNb2RhbCB9IGZyb20gJy4vZ2xvYmFsL21vZGFsJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdpZnRDZXJ0aWZpY2F0ZSBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcclxuICAgICAgICBzdXBlcihjb250ZXh0KTtcclxuICAgICAgICB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5ID0gY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5KGNvbnRleHQpO1xyXG5cclxuICAgICAgICBjb25zdCAkY2VydEJhbGFuY2VGb3JtID0gJCgnI2dpZnQtY2VydGlmaWNhdGUtYmFsYW5jZScpO1xyXG5cclxuICAgICAgICBjb25zdCBwdXJjaGFzZU1vZGVsID0ge1xyXG4gICAgICAgICAgICByZWNpcGllbnROYW1lKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbC5sZW5ndGg7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlY2lwaWVudEVtYWlsKC4uLmFyZ3MpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtTW9kZWwuZW1haWwoLi4uYXJncyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNlbmRlck5hbWUodmFsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsLmxlbmd0aDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2VuZGVyRW1haWwoLi4uYXJncykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1Nb2RlbC5lbWFpbCguLi5hcmdzKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY3VzdG9tQW1vdW50KHZhbHVlLCBtaW4sIG1heCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlICYmIHZhbHVlID49IG1pbiAmJiB2YWx1ZSA8PSBtYXg7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldEFtb3VudCh2YWx1ZSwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uID09PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZm91bmQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3QgJHB1cmNoYXNlRm9ybSA9ICQoJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0nKTtcclxuICAgICAgICBjb25zdCAkY3VzdG9tQW1vdW50cyA9ICRwdXJjaGFzZUZvcm0uZmluZCgnaW5wdXRbbmFtZT1cImNlcnRpZmljYXRlX2Ftb3VudFwiXScpO1xyXG4gICAgICAgIGNvbnN0IHB1cmNoYXNlVmFsaWRhdG9yID0gbm9kKHtcclxuICAgICAgICAgICAgc3VibWl0OiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFt0eXBlPVwic3VibWl0XCJdJyxcclxuICAgICAgICAgICAgZGVsYXk6IDMwMCxcclxuICAgICAgICAgICAgdGFwOiBhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoJGN1c3RvbUFtb3VudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0ICRlbGVtZW50ID0gJHB1cmNoYXNlRm9ybS5maW5kKCdpbnB1dFtuYW1lPVwiY2VydGlmaWNhdGVfYW1vdW50XCJdJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1pbiA9ICRlbGVtZW50LmRhdGEoJ21pbicpO1xyXG4gICAgICAgICAgICBjb25zdCBtaW5Gb3JtYXR0ZWQgPSAkZWxlbWVudC5kYXRhKCdtaW5Gb3JtYXR0ZWQnKTtcclxuICAgICAgICAgICAgY29uc3QgbWF4ID0gJGVsZW1lbnQuZGF0YSgnbWF4Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1heEZvcm1hdHRlZCA9ICRlbGVtZW50LmRhdGEoJ21heEZvcm1hdHRlZCcpO1xyXG4gICAgICAgICAgICBjb25zdCBpbnNlcnRGb3JtYXR0ZWRBbW91bnRzSW50b0Vycm9yTWVzc2FnZSA9IChtZXNzYWdlLCAuLi5hbW91bnRSYW5nZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYW1vdW50UGxhY2Vob2xkZXJzID0gWydbTUlOXScsICdbTUFYXSddO1xyXG4gICAgICAgICAgICAgICAgbGV0IHVwZGF0ZWRFcnJvclRleHQgPSBtZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgYW1vdW50UGxhY2Vob2xkZXJzLmZvckVhY2goKHBsYWNlaG9sZGVyLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlZEVycm9yVGV4dCA9IHVwZGF0ZWRFcnJvclRleHQuaW5jbHVkZXMocGxhY2Vob2xkZXIpID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZEVycm9yVGV4dC5yZXBsYWNlKHBsYWNlaG9sZGVyLCBhbW91bnRSYW5nZVtpXSkgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVkRXJyb3JUZXh0O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdXBkYXRlZEVycm9yVGV4dDtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHB1cmNoYXNlVmFsaWRhdG9yLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cImNlcnRpZmljYXRlX2Ftb3VudFwiXScsXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBudW1iZXJWYWwgPSBOdW1iZXIodmFsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFudW1iZXJWYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2IoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2IobnVtYmVyVmFsID49IG1pbiAmJiBudW1iZXJWYWwgPD0gbWF4KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IGluc2VydEZvcm1hdHRlZEFtb3VudHNJbnRvRXJyb3JNZXNzYWdlKHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnkuY2VydGlmaWNhdGVfYW1vdW50X3JhbmdlLCBtaW5Gb3JtYXR0ZWQsIG1heEZvcm1hdHRlZCksXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVyY2hhc2VWYWxpZGF0b3IuYWRkKFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJ0b19uYW1lXCJdJyxcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHB1cmNoYXNlTW9kZWwucmVjaXBpZW50TmFtZSh2YWwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LnRvTmFtZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJ0b19lbWFpbFwiXScsXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBwdXJjaGFzZU1vZGVsLnJlY2lwaWVudEVtYWlsKHZhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQudG9FbWFpbCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJmcm9tX25hbWVcIl0nLFxyXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcHVyY2hhc2VNb2RlbC5zZW5kZXJOYW1lKHZhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQuZnJvbU5hbWUsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFtuYW1lPVwiZnJvbV9lbWFpbFwiXScsXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBwdXJjaGFzZU1vZGVsLnNlbmRlckVtYWlsKHZhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQuZnJvbUVtYWlsLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cImNlcnRpZmljYXRlX3RoZW1lXCJdOmZpcnN0LW9mLXR5cGUnLFxyXG4gICAgICAgICAgICAgICAgdHJpZ2dlcmVkQnk6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJjZXJ0aWZpY2F0ZV90aGVtZVwiXScsXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gJHB1cmNoYXNlRm9ybS5maW5kKCdpbnB1dFtuYW1lPVwiY2VydGlmaWNhdGVfdGhlbWVcIl06Y2hlY2tlZCcpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYih0eXBlb2YgKHZhbCkgPT09ICdzdHJpbmcnKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5jZXJ0VGhlbWUsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFtuYW1lPVwiYWdyZWVcIl0nLFxyXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9ICRwdXJjaGFzZUZvcm0uZmluZCgnaW5wdXRbbmFtZT1cImFncmVlXCJdJykuZ2V0KDApLmNoZWNrZWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNiKHZhbCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQuYWdyZWVUb1Rlcm1zLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cImFncmVlMlwiXScsXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gJHB1cmNoYXNlRm9ybS5maW5kKCdpbnB1dFtuYW1lPVwiYWdyZWUyXCJdJykuZ2V0KDApLmNoZWNrZWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNiKHZhbCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQuYWdyZWVUb1Rlcm1zLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF0pO1xyXG5cclxuICAgICAgICBpZiAoJGNlcnRCYWxhbmNlRm9ybS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc3QgYmFsYW5jZVZhbCA9IHRoaXMuY2hlY2tDZXJ0QmFsYW5jZVZhbGlkYXRvcigkY2VydEJhbGFuY2VGb3JtKTtcclxuXHJcbiAgICAgICAgICAgICRjZXJ0QmFsYW5jZUZvcm0ub24oJ3N1Ym1pdCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGJhbGFuY2VWYWwucGVyZm9ybUNoZWNrKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFiYWxhbmNlVmFsLmFyZUFsbCgndmFsaWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkcHVyY2hhc2VGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIHB1cmNoYXNlVmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFwdXJjaGFzZVZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNyZWF0ZUZyYW1lID0gKGNvbnRhaW5lciwgaHRtbCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmcmFtZSA9ICQoJzxpZnJhbWUgLz4nKS53aWR0aCgnMTAwJScpLmF0dHIoJ2ZyYW1lQm9yZGVyJywgJzAnKS5hcHBlbmRUbyhjb250YWluZXIpWzBdO1xyXG5cclxuICAgICAgICAgICAgLy8gR3JhYiB0aGUgZnJhbWUncyBkb2N1bWVudCBvYmplY3RcclxuICAgICAgICAgICAgY29uc3QgZnJhbWVEb2MgPSBmcmFtZS5jb250ZW50V2luZG93ID8gZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudCA6IGZyYW1lLmNvbnRlbnREb2N1bWVudDtcclxuXHJcbiAgICAgICAgICAgIGZyYW1lRG9jLm9wZW4oKTtcclxuICAgICAgICAgICAgZnJhbWVEb2Mud3JpdGUoaHRtbCk7XHJcbiAgICAgICAgICAgIGZyYW1lRG9jLmNsb3NlKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgbWF4IGhlaWdodCBmb3IgdGhlIGlmcmFtZVxyXG4gICAgICAgICAgICBjb25zdCBtYXhoZWlnaHQgPSBNYXRoLm1heCgoJCh3aW5kb3cpLmhlaWdodCgpIC0gMzAwKSwgMzAwKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEF1dG8gYWRqdXN0IHRoZSBpZnJhbWUncyBoZWlnaHQgb25jZSBpdHMgZG9jdW1lbnQgaXMgcmVhZHlcclxuICAgICAgICAgICAgJChmcmFtZURvYykucmVhZHkoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gTWF0aC5taW4oZnJhbWVEb2MuYm9keS5zY3JvbGxIZWlnaHQgKyAyMCwgbWF4aGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICQoZnJhbWUpLmhlaWdodChoZWlnaHQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkKCcjZ2lmdC1jZXJ0aWZpY2F0ZS1wcmV2aWV3Jykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgcHVyY2hhc2VWYWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXB1cmNoYXNlVmFsaWRhdG9yLmFyZUFsbCgndmFsaWQnKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBtb2RhbCA9IGRlZmF1bHRNb2RhbCgpO1xyXG4gICAgICAgICAgICBjb25zdCBwcmV2aWV3VXJsID0gYCR7JChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdwcmV2aWV3VXJsJyl9JiR7JHB1cmNoYXNlRm9ybS5zZXJpYWxpemUoKX1gO1xyXG5cclxuICAgICAgICAgICAgbW9kYWwub3BlbigpO1xyXG5cclxuICAgICAgICAgICAgYXBpLmdldFBhZ2UocHJldmlld1VybCwge30sIChlcnIsIGNvbnRlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbW9kYWwudXBkYXRlQ29udGVudCh0aGlzLmNvbnRleHQucHJldmlld0Vycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBtb2RhbC51cGRhdGVDb250ZW50KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gJCgnI21vZGFsLWNvbnRlbnQnKTtcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUZyYW1lKGNvbnRhaW5lciwgY29udGVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrQ2VydEJhbGFuY2VWYWxpZGF0b3IoJGJhbGFuY2VGb3JtKSB7XHJcbiAgICAgICAgY29uc3QgYmFsYW5jZVZhbGlkYXRvciA9IG5vZCh7XHJcbiAgICAgICAgICAgIHN1Ym1pdDogJGJhbGFuY2VGb3JtLmZpbmQoJ2lucHV0W3R5cGU9XCJzdWJtaXRcIl0nKSxcclxuICAgICAgICAgICAgdGFwOiBhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBiYWxhbmNlVmFsaWRhdG9yLmFkZCh7XHJcbiAgICAgICAgICAgIHNlbGVjdG9yOiAkYmFsYW5jZUZvcm0uZmluZCgnaW5wdXRbbmFtZT1cImdpZnRjZXJ0aWZpY2F0ZWNvZGVcIl0nKSxcclxuICAgICAgICAgICAgdmFsaWRhdGUoY2IsIHZhbCkge1xyXG4gICAgICAgICAgICAgICAgY2IoY2hlY2tJc0dpZnRDZXJ0VmFsaWQodmFsKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeS5pbnZhbGlkX2dpZnRfY2VydGlmaWNhdGUsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBiYWxhbmNlVmFsaWRhdG9yO1xyXG4gICAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJjZXJ0IiwibGVuZ3RoIiwiVFJBTlNMQVRJT05TIiwiaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSIsImRpY3Rpb25hcnkiLCJPYmplY3QiLCJrZXlzIiwiY2hvb3NlQWN0aXZlRGljdGlvbmFyeSIsImkiLCJhcmd1bWVudHMiLCJKU09OIiwicGFyc2UiLCJ1bmRlZmluZWQiLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCJjb250ZXh0IiwidmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIiwiYWN0aXZlRGljdGlvbmFyeSIsImxvY2FsaXphdGlvbnMiLCJ2YWx1ZXMiLCJ0cmFuc2xhdGlvbktleXMiLCJtYXAiLCJrZXkiLCJzcGxpdCIsInBvcCIsInJlZHVjZSIsImFjYyIsIlBhZ2VNYW5hZ2VyIiwibm9kIiwiY2hlY2tJc0dpZnRDZXJ0VmFsaWQiLCJmb3JtTW9kZWwiLCJhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlIiwiYXBpIiwiZGVmYXVsdE1vZGFsIiwiR2lmdENlcnRpZmljYXRlIiwiX1BhZ2VNYW5hZ2VyIiwiX3RoaXMiLCJjYWxsIiwidmFsaWRhdGlvbkRpY3Rpb25hcnkiLCIkY2VydEJhbGFuY2VGb3JtIiwiJCIsInB1cmNoYXNlTW9kZWwiLCJyZWNpcGllbnROYW1lIiwidmFsIiwicmVjaXBpZW50RW1haWwiLCJlbWFpbCIsImFwcGx5Iiwic2VuZGVyTmFtZSIsInNlbmRlckVtYWlsIiwiY3VzdG9tQW1vdW50IiwidmFsdWUiLCJtaW4iLCJtYXgiLCJzZXRBbW91bnQiLCJvcHRpb25zIiwiZm91bmQiLCJmb3JFYWNoIiwib3B0aW9uIiwiJHB1cmNoYXNlRm9ybSIsIiRjdXN0b21BbW91bnRzIiwiZmluZCIsInB1cmNoYXNlVmFsaWRhdG9yIiwic3VibWl0IiwiZGVsYXkiLCJ0YXAiLCIkZWxlbWVudCIsImRhdGEiLCJtaW5Gb3JtYXR0ZWQiLCJtYXhGb3JtYXR0ZWQiLCJpbnNlcnRGb3JtYXR0ZWRBbW91bnRzSW50b0Vycm9yTWVzc2FnZSIsIm1lc3NhZ2UiLCJfbGVuIiwiYW1vdW50UmFuZ2UiLCJBcnJheSIsIl9rZXkiLCJhbW91bnRQbGFjZWhvbGRlcnMiLCJ1cGRhdGVkRXJyb3JUZXh0IiwicGxhY2Vob2xkZXIiLCJpbmNsdWRlcyIsInJlcGxhY2UiLCJhZGQiLCJzZWxlY3RvciIsInZhbGlkYXRlIiwiY2IiLCJudW1iZXJWYWwiLCJOdW1iZXIiLCJlcnJvck1lc3NhZ2UiLCJjZXJ0aWZpY2F0ZV9hbW91bnRfcmFuZ2UiLCJyZXN1bHQiLCJ0b05hbWUiLCJ0b0VtYWlsIiwiZnJvbU5hbWUiLCJmcm9tRW1haWwiLCJ0cmlnZ2VyZWRCeSIsImNlcnRUaGVtZSIsImdldCIsImNoZWNrZWQiLCJhZ3JlZVRvVGVybXMiLCJiYWxhbmNlVmFsIiwiY2hlY2tDZXJ0QmFsYW5jZVZhbGlkYXRvciIsIm9uIiwicGVyZm9ybUNoZWNrIiwiYXJlQWxsIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImNyZWF0ZUZyYW1lIiwiY29udGFpbmVyIiwiaHRtbCIsImZyYW1lIiwid2lkdGgiLCJhdHRyIiwiYXBwZW5kVG8iLCJmcmFtZURvYyIsImNvbnRlbnRXaW5kb3ciLCJkb2N1bWVudCIsImNvbnRlbnREb2N1bWVudCIsIm9wZW4iLCJ3cml0ZSIsImNsb3NlIiwibWF4aGVpZ2h0IiwiTWF0aCIsIndpbmRvdyIsImhlaWdodCIsInJlYWR5IiwiYm9keSIsInNjcm9sbEhlaWdodCIsIm1vZGFsIiwicHJldmlld1VybCIsImN1cnJlbnRUYXJnZXQiLCJzZXJpYWxpemUiLCJnZXRQYWdlIiwiZXJyIiwiY29udGVudCIsInVwZGF0ZUNvbnRlbnQiLCJwcmV2aWV3RXJyb3IiLCJfaW5oZXJpdHNMb29zZSIsIl9wcm90byIsInByb3RvdHlwZSIsIiRiYWxhbmNlRm9ybSIsImJhbGFuY2VWYWxpZGF0b3IiLCJpbnZhbGlkX2dpZnRfY2VydGlmaWNhdGUiLCJkZWZhdWx0Il0sInNvdXJjZVJvb3QiOiIifQ==