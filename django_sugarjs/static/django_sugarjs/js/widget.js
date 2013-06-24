(function($) {

    window.django_sugar = {};

    django_sugar.widget = function(opts) {
        this.init(opts);
    };

    django_sugar.widget.prototype = {
        msgs: {
            blank: 'Enter a date, e.g., <code>1/1/2013 5:30 PM</code>, <code>today 3pm</code>, <code>tomorrow</code>',
            invalid: 'Please enter a valid date.'
        },

        init: function(opts) {
            var opts = opts || {};
            var selector = opts.selector || '.sugar';

            var els = this.get_elements(selector);

            for(var i = 0; i < els.length; i++)
                this.render(els[i]);
        },

        /* returns an Array of elements */
        get_elements: function(selector) {
            if(document.getElementsByClassName) {
                /* find all by class */
                if(selector[0] == '.') {
                    var els;

                    if(document.getElementsByClassName) {
                        selector = selector.slice(1);
                        els = document.getElementsByClassName(selector);
                    } else {
                        els = document.querySelectorAll(selector);
                    }

                    return Array.prototype.slice.call(els);
                }

                /* find an element */
                else if(selector[0] = '#') {
                    var els = [];
                    selector = selector.slice(1);

                    var el = document.getElementById(selector);

                    if(el)
                        els.push(el);

                    return els;
                }
            }
        },

        /* converts a dom element to a sugar-enabled input */
        render: function(target_el) {
            var self = this;

            var proxy_input = document.createElement('input');
            proxy_input.id = target_el.id + '-sugar';
            proxy_input.setAttribute('data-target', '#' + target_el.id);

            var display = document.createElement('span');
            display.className = 'sugar-display';
            display.innerHTML = this.msgs.blank;

            /* attempt date interpretation on keyup */
            proxy_input.onkeyup = function() {
                var val = Date.create(this.value);

                if(val != 'Invalid Date') {
                    var fmtd = val.format('{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}');

                    /* update hidden input with formatted value */
                    target_el.value = fmtd;

                    /* update ui */
                    display.innerHTML = 'Interpreted as <strong>' + val.format('long') + '</strong>';
                } else {
                    /* reset hidden input */
                    target_el.value = '';

                    /* update ui */
                    display.innerHTML = (this.value) ? self.msgs.invalid : self.msgs.blank;
                }
            }

            /* hide original input */
            target_el.style.display = 'none';

            /* pre-fill proxy input with initial value */
            if(target_el.value) {
                var initial_date = Date.create(target_el.value);

                if(target_el != 'Invalid Date')
                    proxy_input.value = initial_date.format('long');
            }

            /* insert dom nodes */
            target_el.parentNode.insertBefore(proxy_input, target_el.nextSibling);
            proxy_input.parentNode.insertBefore(display, proxy_input.nextSibling);
        }
    };

})(django.jQuery);
