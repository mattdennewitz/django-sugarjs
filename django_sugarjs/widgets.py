from django import forms
from django.utils.safestring import mark_safe


class SugarDateTimeWidget(forms.DateTimeInput):
    """Wraps an <input> field with Sugar date parsing
    """

    class Media:
        css = {'all': ('/static/django_sugarjs/css/sugar.css', ), }
        js = (
            '/static/django_sugarjs/js/sugar.min.js',
            '/static/django_sugarjs/js/django-widget.js',
        )

    def render(self, name, value, attrs=None):
        attrs = attrs or {}
        attrs['style'] = 'display: none;'

        # render hidden input
        html = super(SugarDateTimeWidget, self).render(name, value, attrs)

        # pour sugar on it
        sugar_field_id = attrs['id'] + '_sugar'
        html += (
            '<script type="text/javascript">django.jQuery("#%(id)s").sugar()</script>' %
            {'sugar_id': sugar_field_id, 'id': attrs['id']})

        return mark_safe(html)
