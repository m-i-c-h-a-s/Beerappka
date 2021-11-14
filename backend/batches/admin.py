from django.contrib import admin

from batches.models import Batch, MeasurementBLG, Mashing


class MeasurementBLGInline(admin.TabularInline):
    model = MeasurementBLG
    extra = 1


class MashingInline(admin.TabularInline):
    model = Mashing
    extra = 1


class BatchAdmin(admin.ModelAdmin):
    inlines = [MeasurementBLGInline, MashingInline]


admin.site.register(Batch, BatchAdmin)
