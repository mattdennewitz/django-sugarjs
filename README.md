# sugar.js + Django

## Status

Production ready, needs docs.

## Usage

1. Add to `INSTALLED_APPS`:

```python
INSTALLED_APPS = (
    # ...

    'django_sugarjs',
)
```

2. Implement `SugarDateTimeWidget` in forms:

```python
from django import forms
from django.db import models

# if this is your model:
class BlogPost(models.Model):
    title = models.CharField(...)
    content = models.TextField(...)
    live_at = models.DateTimeField(...)


# then your form would use SugarDateTimeWidget
# for your "live_at" field
class BlogPostForm(forms.ModelForm):
    live_at = forms.DateTimeField(widget=SugarDateTimeWidget)

    class Meta:
        model = BlogPost
```

Sugar.js is packaged with this widget -- don't forget to run `./manage.py collectstatic`
if you're using `staticfiles`.