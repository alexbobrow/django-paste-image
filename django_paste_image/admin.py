from django.contrib import admin
from django.contrib.admin.widgets import AdminFileWidget
from django.forms import Media
from django.contrib.admin.templatetags.admin_static import static
from django.db import models


class PasteImageField(AdminFileWidget):

    def __init__(self, attrs=None):
        # mark target inputs with extra attribute
        past_image_attrs = {'data-past-image': 'on'}
        if attrs:
            past_image_attrs.update(attrs)
        super(PasteImageField, self).__init__(past_image_attrs)

class PasteImageMixin(object):
   
    def __init__(self, model, admin_site):
        # override all ImageFields with our widget
        super(PasteImageMixin, self).__init__(model, admin_site)
        override = {'widget': PasteImageField}       
        self.formfield_overrides[models.ImageField].update(override)

    @property
    def media(self):
        admin_media = super(PasteImageMixin, self).media
        js = ['django_paste_image/paste_image.js']
        return admin_media + Media(js=js)