(function($) {
    /* wrap text field with sugar */
    $.fn.sugar = function(opts) {
        var msgs = {
            blank: 'Enter a date like <code>1/1/2013 5:30 PM</code>, <code>today 3pm</code>, <code>tomorrow</code>',
            invalid: 'Please enter a valid date.'
        };

        this.each(function() {
            /* this extension works by hiding the original text input
               and using a sugar-wrapped input as a middleman. */
            var $proxy_input = $(
                    '<input type="text" id="' + this.id + '-sugar" data-target="#' + this.id + '" />'
                ),
                $display = $('<span class="sugar-display"> ' + msgs.blank + '</span>'),
                $target = $($proxy_input.attr('data-target'));

            /* attempt to read value from wrapped date input and present to user */
            if($target.val()) {
                var initial_date = Date.create($target.val());

                if(initial_date != 'Invalid Date') {
                    $proxy_input.val(initial_date.format('long'));
                }
            }

            /* listen for proxy input, respond with interpreted date */
            $proxy_input.keyup(function() {
                var val = Date.create(this.value);

                if(val != 'Invalid Date') {
                    var fmtd = val.format('{yyyy}-{MM}-{dd} {hh}:{mm}:{ss}');
                    $target.val(fmtd);
                    $display.html('Interpreted as: <strong>' + val.format('long') + '</strong>');
                } else {
                    $target.val('');

                    if(this.value)
                        $display.html(msgs.invalid);
                    else
                        $display.html(msgs.blank);
                }
            });

            /* insert proxy input and display */
            $(this).after($proxy_input, $display);
        });
    }
})(django.jQuery);
