from django.contrib import admin

from batches.models import Batch, MeasurementBLG


class MeasurementBLGInline(admin.TabularInline):
    model = MeasurementBLG
    extra = 1


class BatchAdmin(admin.ModelAdmin):
    inlines = [MeasurementBLGInline]


admin.site.register(Batch, BatchAdmin)
