from .widgets import SugarDateTimeWidget


__all__ = ('SugarDateTimeWidget', )


class SugarDateTimeWidget(forms.DateTimeInput):
    """Wraps an <input> field with Sugar date parsing
    """

    class Media:
        css = {'all': ('/static/admin/css/sugar.css', )}
        js = ('//cdnjs.cloudflare.com/ajax/libs/sugar/1.3.9/sugar.min.js',
              '/static/admin/js/sugar.js', )

    def render(self, *args, **kwargs):
        attrs = kwargs.get('attrs', {})
        attrs['style'] = 'display: none;'
        kwargs['attrs'] = attrs

        # render hidden input
        html = super(SugarDateTimeWidget, self).render(*args, **kwargs)

        # pour sugar on it
        sugar_field_id = attrs['id'] + '_sugar'
        html += (
            '<script type="text/javascript">django.jQuery("#%(id)s").sugar()</script>' %
            {'sugar_id': sugar_field_id, 'id': attrs['id']})

        return mark_safe(html)
