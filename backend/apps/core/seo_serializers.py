from rest_framework import serializers


def t_seo(obj, field, lang):
    if lang and lang != "ka":
        val = getattr(obj, f"{field}_{lang}", None)
        if val:
            return val
    return getattr(obj, field, "") or ""


class SeoSerializerMixin:
    meta_title = serializers.SerializerMethodField()
    meta_description = serializers.SerializerMethodField()

    def _seo_lang(self):
        if hasattr(self, "_lang"):
            return self._lang()
        request = self.context.get("request")
        return request.query_params.get("lang", "ka") if request else "ka"

    def get_meta_title(self, obj):
        return t_seo(obj, "meta_title", self._seo_lang())

    def get_meta_description(self, obj):
        return t_seo(obj, "meta_description", self._seo_lang())
