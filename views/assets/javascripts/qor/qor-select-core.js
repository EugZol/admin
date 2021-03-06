(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as anonymous module.
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node / CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals.
    factory(jQuery);
  }
})(function ($) {

  'use strict';

  var FormData = window.FormData;
  var NAMESPACE = 'qor.selectcore';
  var EVENT_CLICK = 'click.' + NAMESPACE;
  var EVENT_SUBMIT = 'submit.' + NAMESPACE;
  var CLASS_CLICK_TABLE = '.qor-table-container tbody tr';

  function QorSelectCore(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, QorSelectCore.DEFAULTS, $.isPlainObject(options) && options);
    this.init();
  }

  QorSelectCore.prototype = {
    constructor: QorSelectCore,

    init: function () {
      this.bind();
    },

    bind: function () {
      this.$element.
        on(EVENT_CLICK, CLASS_CLICK_TABLE, this.processingData.bind(this)).
        on(EVENT_SUBMIT, 'form', this.submit.bind(this));
    },

    unbind: function () {
      this.$element.
        off(EVENT_CLICK, '.qor-table tbody tr', this.processingData.bind(this)).
        off(EVENT_SUBMIT, 'form', this.submit.bind(this));
    },

    processingData: function (e) {
      var $this = $(e.target).closest('tr'),
          data = {},
          url,
          options = this.options,
          onSelect = options.onSelect;

      data = $.extend({}, data, $this.data());
      data.$clickElement = $this;

      url = data.mediaLibraryUrl || data.url;

      if (url) {
        $.getJSON(url, function(json){
          json.MediaOption && (json.MediaOption = JSON.parse(json.MediaOption));
          data = $.extend({}, json, data);
          if (onSelect && $.isFunction(onSelect)) {
            onSelect(data, e);
          }
        });
      } else {
        if (onSelect && $.isFunction(onSelect)) {
          onSelect(data, e);
        }
      }
      return false;
    },

    submit: function (e) {
      var form = e.target,
          $form = $(form),
          _this = this,
          $submit = $form.find(':submit'),
          data,
          onSubmit = this.options.onSubmit;

      if (FormData) {
        e.preventDefault();

        $.ajax($form.prop('action'), {
          method: $form.prop('method'),
          data: new FormData(form),
          dataType: 'json',
          processData: false,
          contentType: false,
          beforeSend: function () {
            $submit.prop('disabled', true);
          },
          success: function (json) {
            data = json;
            data.primaryKey = data.ID;

            $('.qor-error').remove();
            if (data.status == 'error' && data.error) {
              var $flashMessage = window.Mustache.render(QorSelectCore.TEMPLATE_ERROR, data);
              $form.before($flashMessage);
              return;
            }

            if (onSubmit && $.isFunction(onSubmit)) {
              onSubmit(data, e);
            } else {
              _this.refresh();
            }

          },
          error: function (xhr, textStatus, errorThrown) {

            var $error;
            if (xhr.status === 422) {
              $form.find('.qor-error').remove();
              $form.find('.qor-field').removeClass('is-error').find('.qor-field__error').remove();

              $error = $(xhr.responseText).find('.qor-error');
              $form.before($error);

            } else {
              window.alert([textStatus, errorThrown].join(': '));
            }
          },
          complete: function () {
            $submit.prop('disabled', false);
          }
        });
      }
    },

    refresh: function () {
      setTimeout(function () {
        window.location.reload();
      }, 350);
    },

    destroy: function () {
      this.unbind();
    }

  };

  QorSelectCore.TEMPLATE_ERROR = '<ul class="qor-error"><li><label><i class="material-icons">error</i><span>[[error]]</span></label></li></ul>';

  QorSelectCore.plugin = function (options) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data(NAMESPACE);
      var fn;

      if (!data) {
        if (/destroy/.test(options)) {
          return;
        }
        $this.data(NAMESPACE, (data = new QorSelectCore(this, options)));
      }

      if (typeof options === 'string' && $.isFunction(fn = data[options])) {
        fn.apply(data);
      }
    });
  };

  $.fn.qorSelectCore = QorSelectCore.plugin;

  return QorSelectCore;

});
